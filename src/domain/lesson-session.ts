import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useSyncExternalStore } from 'react';

const storageKey = 'living-language-atlas/lesson-sessions/v1';

export type LessonSessionStorageState = 'loading' | 'ready' | 'unavailable';

export type LessonSessionRecord = {
  lessonId: string;
  stepIndex: number;
  completedStepIds: readonly string[];
  startedAt: number;
  lastSavedAt: number;
  status: 'active' | 'complete';
};

type LessonSessionStore = {
  sessions: readonly LessonSessionRecord[];
  storageState: LessonSessionStorageState;
};

export type LessonSessionProgress = LessonSessionStore & {
  session: LessonSessionRecord | null;
};

const emptyStore: LessonSessionStore = {
  sessions: [],
  storageState: 'loading',
};

let store: LessonSessionStore = emptyStore;
let hydration: Promise<void> | undefined;
let localMutationBeforeHydration = false;
let persistenceQueue: Promise<void> = Promise.resolve();
const subscribers = new Set<() => void>();

function publish(nextStore: LessonSessionStore) {
  store = nextStore;
  subscribers.forEach((subscriber) => subscriber());
}

function subscribe(subscriber: () => void) {
  subscribers.add(subscriber);
  return () => subscribers.delete(subscriber);
}

function snapshot() {
  return store;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isPositiveTimestamp(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value > 0;
}

function isNonNegativeInteger(value: unknown): value is number {
  return typeof value === 'number' && Number.isInteger(value) && value >= 0;
}

function normalizeSessions(value: unknown): LessonSessionRecord[] {
  if (!Array.isArray(value)) return [];

  const sessionsByLesson = new Map<string, LessonSessionRecord>();
  for (const candidate of value) {
    if (!isRecord(candidate) || typeof candidate.lessonId !== 'string' || !candidate.lessonId.trim()) continue;
    if (!isNonNegativeInteger(candidate.stepIndex)) continue;
    if (!Array.isArray(candidate.completedStepIds) || !candidate.completedStepIds.every((id) => typeof id === 'string')) continue;
    if (!isPositiveTimestamp(candidate.startedAt) || !isPositiveTimestamp(candidate.lastSavedAt)) continue;
    if (candidate.status !== 'active' && candidate.status !== 'complete') continue;

    sessionsByLesson.set(candidate.lessonId, {
      lessonId: candidate.lessonId,
      stepIndex: candidate.stepIndex,
      completedStepIds: [...new Set(candidate.completedStepIds)],
      startedAt: candidate.startedAt,
      lastSavedAt: candidate.lastSavedAt,
      status: candidate.status,
    });
  }

  return [...sessionsByLesson.values()];
}

function mergeSessions(localSessions: readonly LessonSessionRecord[], hydratedSessions: readonly LessonSessionRecord[]) {
  const sessionsByLesson = new Map<string, LessonSessionRecord>();

  for (const session of hydratedSessions) sessionsByLesson.set(session.lessonId, session);
  for (const session of localSessions) {
    const hydrated = sessionsByLesson.get(session.lessonId);
    if (!hydrated || session.lastSavedAt >= hydrated.lastSavedAt) sessionsByLesson.set(session.lessonId, session);
  }

  return [...sessionsByLesson.values()];
}

export function normalizeLessonSessionStore(serialized: string | null): LessonSessionStore {
  if (!serialized) return { ...emptyStore, storageState: 'ready' };

  try {
    const parsed: unknown = JSON.parse(serialized);
    if (!isRecord(parsed) || parsed.schemaVersion !== 1) return { ...emptyStore, storageState: 'ready' };
    return {
      sessions: normalizeSessions(parsed.sessions),
      storageState: 'ready',
    };
  } catch {
    return { ...emptyStore, storageState: 'ready' };
  }
}

function persist(nextStore: LessonSessionStore) {
  persistenceQueue = persistenceQueue
    .catch(() => undefined)
    .then(() =>
      AsyncStorage.setItem(
        storageKey,
        JSON.stringify({ schemaVersion: 1, sessions: nextStore.sessions }),
      ),
    )
    .catch(() => {
      publish({ ...store, storageState: 'unavailable' });
    });
}

function updateStore(nextSessions: readonly LessonSessionRecord[]) {
  localMutationBeforeHydration = true;
  const nextStore = { sessions: nextSessions, storageState: store.storageState } satisfies LessonSessionStore;
  publish(nextStore);
  persist(nextStore);
}

export function hydrateLessonSessions() {
  if (hydration) return hydration;

  hydration = AsyncStorage.getItem(storageKey)
    .then((serialized) => {
      const hydratedStore = normalizeLessonSessionStore(serialized);
      if (localMutationBeforeHydration) {
        const mergedSessions = mergeSessions(store.sessions, hydratedStore.sessions);
        const mergedStore = { sessions: mergedSessions, storageState: 'ready' } satisfies LessonSessionStore;
        publish(mergedStore);
        persist(mergedStore);
        return;
      }
      publish(hydratedStore);
    })
    .catch(() => {
      publish({ ...store, storageState: 'unavailable' });
    });

  return hydration;
}

export function useLessonSession(lessonId: string): LessonSessionProgress {
  const currentStore = useSyncExternalStore(subscribe, snapshot, snapshot);

  useEffect(() => {
    void hydrateLessonSessions();
  }, []);

  return {
    ...currentStore,
    session: currentStore.sessions.find((candidate) => candidate.lessonId === lessonId) ?? null,
  };
}

export function saveLessonSession(
  lessonId: string,
  input: Pick<LessonSessionRecord, 'stepIndex' | 'completedStepIds'> & { status?: LessonSessionRecord['status'] },
) {
  if (!lessonId.trim() || !isNonNegativeInteger(input.stepIndex)) return false;

  const current = store.sessions.find((session) => session.lessonId === lessonId);
  const now = Date.now();
  const nextSession: LessonSessionRecord = {
    lessonId,
    stepIndex: input.stepIndex,
    completedStepIds: [...new Set(input.completedStepIds)],
    startedAt: current?.startedAt ?? now,
    lastSavedAt: now,
    status: input.status ?? 'active',
  };

  updateStore([...store.sessions.filter((session) => session.lessonId !== lessonId), nextSession]);
  return true;
}

export function clearLessonSession(lessonId: string) {
  if (!lessonId.trim()) return false;
  updateStore(store.sessions.filter((session) => session.lessonId !== lessonId));
  return true;
}

export function getLessonSessionStep(session: LessonSessionRecord | null) {
  return session?.stepIndex ?? 0;
}

export function formatLessonSavedAt(timestamp: number | null) {
  if (!timestamp) return 'not saved yet';

  return new Intl.DateTimeFormat('en', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(timestamp));
}

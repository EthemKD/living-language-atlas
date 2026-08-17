import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useSyncExternalStore } from 'react';

import { firstEncounter } from '@/content/first-encounter';

const storageKey = 'living-language-atlas/first-encounter-progress/v1';
const returnDelayMs = firstEncounter.return_mission.available_after_hours * 60 * 60 * 1000;

export type FirstEncounterStorageState = 'loading' | 'ready' | 'unavailable';
export type FirstEncounterReturnStatus = 'locked' | 'waiting' | 'ready' | 'complete';

export type FirstEncounterProgress = {
  completedStageIds: readonly string[];
  missionRehearsed: boolean;
  missionRehearsedAt: number | null;
  returnMissionAvailableAt: number | null;
  returnMissionRehearsed: boolean;
  storageState: FirstEncounterStorageState;
};

let progress: FirstEncounterProgress = {
  completedStageIds: [],
  missionRehearsed: false,
  missionRehearsedAt: null,
  returnMissionAvailableAt: null,
  returnMissionRehearsed: false,
  storageState: 'loading',
};

const subscribers = new Set<() => void>();
let hydration: Promise<void> | undefined;
let localMutationBeforeHydration = false;

function publish(nextProgress: FirstEncounterProgress) {
  progress = nextProgress;
  subscribers.forEach((subscriber) => subscriber());
}

function subscribe(subscriber: () => void) {
  subscribers.add(subscriber);
  return () => subscribers.delete(subscriber);
}

function snapshot() {
  return progress;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function defaultProgress(storageState: FirstEncounterStorageState): FirstEncounterProgress {
  return {
    completedStageIds: [],
    missionRehearsed: false,
    missionRehearsedAt: null,
    returnMissionAvailableAt: null,
    returnMissionRehearsed: false,
    storageState,
  };
}

function isTimestamp(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value > 0;
}

function normalizeStoredProgress(serialized: string | null): Omit<FirstEncounterProgress, 'storageState'> {
  if (!serialized) return defaultProgress('ready');

  try {
    const parsed: unknown = JSON.parse(serialized);
    if (!isRecord(parsed) || !Array.isArray(parsed.completedStageIds)) return defaultProgress('ready');

    const requestedStageIds = new Set(parsed.completedStageIds.filter((id): id is string => typeof id === 'string'));
    const completedStageIds: string[] = [];
    for (const stage of firstEncounter.stages) {
      if (!requestedStageIds.has(stage.id)) break;
      completedStageIds.push(stage.id);
    }
    const hasEveryRequiredStage = firstEncounter.mission.required_stage_ids.every((stageId) => completedStageIds.includes(stageId));
    const missionRehearsed = parsed.missionRehearsed === true && hasEveryRequiredStage;
    const migratedCompletionTime = Date.now() - returnDelayMs;
    const missionRehearsedAt = missionRehearsed
      ? isTimestamp(parsed.missionRehearsedAt)
        ? parsed.missionRehearsedAt
        : migratedCompletionTime
      : null;
    const returnMissionAvailableAt =
      missionRehearsed && missionRehearsedAt
        ? isTimestamp(parsed.returnMissionAvailableAt)
          ? parsed.returnMissionAvailableAt
          : missionRehearsedAt + returnDelayMs
        : null;

    return {
      completedStageIds,
      missionRehearsed,
      missionRehearsedAt,
      returnMissionAvailableAt,
      returnMissionRehearsed: missionRehearsed && parsed.returnMissionRehearsed === true,
    };
  } catch {
    return defaultProgress('ready');
  }
}

function persist(nextProgress: FirstEncounterProgress) {
  const payload = {
    schemaVersion: 2,
    completedStageIds: nextProgress.completedStageIds,
    missionRehearsed: nextProgress.missionRehearsed,
    missionRehearsedAt: nextProgress.missionRehearsedAt,
    returnMissionAvailableAt: nextProgress.returnMissionAvailableAt,
    returnMissionRehearsed: nextProgress.returnMissionRehearsed,
  };

  void AsyncStorage.setItem(storageKey, JSON.stringify(payload)).catch(() => {
    publish({ ...progress, storageState: 'unavailable' });
  });
}

function updateProgress(nextProgress: Omit<FirstEncounterProgress, 'storageState'>) {
  localMutationBeforeHydration = true;
  const next = { ...nextProgress, storageState: progress.storageState };
  publish(next);
  persist(next);
}

export function hydrateFirstEncounterProgress() {
  if (hydration) return hydration;

  hydration = AsyncStorage.getItem(storageKey)
    .then((serialized) => {
      if (localMutationBeforeHydration) {
        publish({ ...progress, storageState: 'ready' });
        return;
      }

      publish({ ...normalizeStoredProgress(serialized), storageState: 'ready' });
    })
    .catch(() => {
      publish({ ...progress, storageState: 'unavailable' });
    });

  return hydration;
}

export function useFirstEncounterProgress() {
  const currentProgress = useSyncExternalStore(subscribe, snapshot, snapshot);

  useEffect(() => {
    void hydrateFirstEncounterProgress();
  }, []);

  useEffect(() => {
    const availableAt = currentProgress.returnMissionAvailableAt;
    if (!availableAt || currentProgress.returnMissionRehearsed) return;

    const delay = availableAt - Date.now();
    if (delay <= 0) return;

    const timer = setTimeout(() => publish({ ...progress }), delay);
    return () => clearTimeout(timer);
  }, [currentProgress.returnMissionAvailableAt, currentProgress.returnMissionRehearsed]);

  return currentProgress;
}

export function completeFirstEncounterStage(stageId: string) {
  if (!canOpenFirstEncounterStage(stageId)) return false;
  if (progress.completedStageIds.includes(stageId)) return true;

  updateProgress({
    completedStageIds: [...progress.completedStageIds, stageId],
    missionRehearsed: progress.missionRehearsed,
    missionRehearsedAt: progress.missionRehearsedAt,
    returnMissionAvailableAt: progress.returnMissionAvailableAt,
    returnMissionRehearsed: progress.returnMissionRehearsed,
  });
  return true;
}

export function completeFirstEncounterMission() {
  if (!canOpenFirstEncounterMission()) return false;
  if (progress.missionRehearsed && progress.returnMissionAvailableAt) return true;

  const missionRehearsedAt = progress.missionRehearsedAt ?? Date.now();

  updateProgress({
    completedStageIds: progress.completedStageIds,
    missionRehearsed: true,
    missionRehearsedAt,
    returnMissionAvailableAt: progress.returnMissionAvailableAt ?? missionRehearsedAt + returnDelayMs,
    returnMissionRehearsed: progress.returnMissionRehearsed,
  });
  return true;
}

export function getFirstEncounterReturnStatus(): FirstEncounterReturnStatus {
  if (!progress.missionRehearsed) return 'locked';
  if (progress.returnMissionRehearsed) return 'complete';
  if (!progress.returnMissionAvailableAt || Date.now() < progress.returnMissionAvailableAt) return 'waiting';
  return 'ready';
}

export function canOpenFirstEncounterReturnMission() {
  const status = getFirstEncounterReturnStatus();
  return status === 'ready' || status === 'complete';
}

export function completeFirstEncounterReturnMission() {
  if (!canOpenFirstEncounterReturnMission()) return false;
  if (progress.returnMissionRehearsed) return true;

  updateProgress({
    completedStageIds: progress.completedStageIds,
    missionRehearsed: progress.missionRehearsed,
    missionRehearsedAt: progress.missionRehearsedAt,
    returnMissionAvailableAt: progress.returnMissionAvailableAt,
    returnMissionRehearsed: true,
  });
  return true;
}

export function canOpenFirstEncounterStage(stageId: string) {
  const stageIndex = firstEncounter.stages.findIndex((stage) => stage.id === stageId);
  if (stageIndex < 0) return false;
  if (progress.completedStageIds.includes(stageId)) return true;
  if (stageIndex === 0) return true;
  const prerequisite = firstEncounter.stages[stageIndex - 1];
  return Boolean(prerequisite && progress.completedStageIds.includes(prerequisite.id));
}

export function canOpenFirstEncounterMission() {
  return firstEncounter.mission.required_stage_ids.every((stageId) => progress.completedStageIds.includes(stageId));
}

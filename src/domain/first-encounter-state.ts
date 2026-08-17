import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useSyncExternalStore } from 'react';

import { firstEncounter } from '@/content/first-encounter';

const storageKey = 'living-language-atlas/first-encounter-progress/v1';

export type FirstEncounterStorageState = 'loading' | 'ready' | 'unavailable';

export type FirstEncounterProgress = {
  completedStageIds: readonly string[];
  missionRehearsed: boolean;
  storageState: FirstEncounterStorageState;
};

let progress: FirstEncounterProgress = {
  completedStageIds: [],
  missionRehearsed: false,
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
    storageState,
  };
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

    return {
      completedStageIds,
      missionRehearsed: parsed.missionRehearsed === true && hasEveryRequiredStage,
    };
  } catch {
    return defaultProgress('ready');
  }
}

function persist(nextProgress: FirstEncounterProgress) {
  const payload = {
    schemaVersion: 1,
    completedStageIds: nextProgress.completedStageIds,
    missionRehearsed: nextProgress.missionRehearsed,
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

  return currentProgress;
}

export function completeFirstEncounterStage(stageId: string) {
  if (!canOpenFirstEncounterStage(stageId)) return false;
  if (progress.completedStageIds.includes(stageId)) return true;

  updateProgress({
    completedStageIds: [...progress.completedStageIds, stageId],
    missionRehearsed: progress.missionRehearsed,
  });
  return true;
}

export function completeFirstEncounterMission() {
  if (!canOpenFirstEncounterMission()) return false;
  if (progress.missionRehearsed) return true;

  updateProgress({
    completedStageIds: progress.completedStageIds,
    missionRehearsed: true,
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

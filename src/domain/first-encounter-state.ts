import { useSyncExternalStore } from 'react';

import { firstEncounter } from '@/content/first-encounter';

export type FirstEncounterProgress = {
  completedStageIds: readonly string[];
  missionRehearsed: boolean;
};

let progress: FirstEncounterProgress = {
  completedStageIds: [],
  missionRehearsed: false,
};

const subscribers = new Set<() => void>();

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

export function useFirstEncounterProgress() {
  return useSyncExternalStore(subscribe, snapshot, snapshot);
}

export function completeFirstEncounterStage(stageId: string) {
  if (progress.completedStageIds.includes(stageId)) return;
  publish({ ...progress, completedStageIds: [...progress.completedStageIds, stageId] });
}

export function completeFirstEncounterMission() {
  if (progress.missionRehearsed) return;
  publish({ ...progress, missionRehearsed: true });
}

export function canOpenFirstEncounterStage(stageId: string) {
  const stageIndex = firstEncounter.stages.findIndex((stage) => stage.id === stageId);
  if (stageIndex < 0) return false;
  if (stageIndex === 0) return true;
  const prerequisite = firstEncounter.stages[stageIndex - 1];
  return Boolean(prerequisite && progress.completedStageIds.includes(prerequisite.id));
}

export function canOpenFirstEncounterMission() {
  return firstEncounter.mission.required_stage_ids.every((stageId) => progress.completedStageIds.includes(stageId));
}

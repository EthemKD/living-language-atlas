import { findBundle, referenceTrack, type District, type EvidenceLevel } from '@/content/reference-track';

export type DistrictState = 'complete' | 'current' | 'available' | 'locked';

export const prototypeLearner = {
  currentDistrictId: 'D03',
  currentBundleId: 'D03-S02',
  currentMissionId: 'D03-M01',
  completedDistrictIds: ['D01', 'D02'] as readonly string[],
  practiceCredits: 120,
  habitDays: 6,
  evidence: [
    { bundleId: 'D01-S04', level: 'E3', lastObserved: '2 days ago' },
    { bundleId: 'D02-S03', level: 'E2', lastObserved: 'yesterday' },
    { bundleId: 'D03-S01', level: 'E1', lastObserved: 'today' },
    { bundleId: 'D03-S02', level: 'E1', lastObserved: 'today' },
  ] satisfies Array<{ bundleId: string; level: EvidenceLevel; lastObserved: string }>,
} as const;

export function getDistrictState(district: District): DistrictState {
  if (prototypeLearner.completedDistrictIds.includes(district.id)) return 'complete';
  if (district.id === prototypeLearner.currentDistrictId) return 'current';
  const currentIndex = referenceTrack.districts.findIndex((item) => item.id === prototypeLearner.currentDistrictId);
  const districtIndex = referenceTrack.districts.findIndex((item) => item.id === district.id);
  if (districtIndex === currentIndex + 1) return 'available';
  return 'locked';
}

export function getEvidenceRows() {
  return prototypeLearner.evidence.map((entry) => ({ ...entry, bundle: findBundle(entry.bundleId) }));
}

export function evidenceRank(level: EvidenceLevel) {
  return Number(level.slice(1));
}

export const practiceQueue = [
  {
    bundleId: 'D03-S02',
    mode: 'Speak',
    title: 'Ask where without reading',
    reason: 'Recognition is present; supported production is not yet observed.',
    duration: '3 min',
  },
  {
    bundleId: 'D03-S03',
    mode: 'Listen',
    title: 'Follow two linked directions',
    reason: 'New function in the current mission.',
    duration: '4 min',
  },
  {
    bundleId: 'D01-S04',
    mode: 'Repair',
    title: 'Recover when the reply is too fast',
    reason: 'Transferred once; due for a changed-context return.',
    duration: '3 min',
  },
] as const;

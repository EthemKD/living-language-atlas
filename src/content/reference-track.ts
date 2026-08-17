import missionData from '@/content/demo-missions.json';
import trackData from '@/content/russian-foundation-reference-track.json';

export type EvidenceLevel = 'E0' | 'E1' | 'E2' | 'E3' | 'E4';

export type SkillBundle = {
  id: string;
  title: string;
  original_can_do: string;
  primary_mode: string;
  function: string;
  form_focus_hypothesis: string;
  sound_focus_hypothesis: string;
  contexts: string;
  status: 'expert_review_required';
};

export type MissionSummary = {
  id: string;
  title: string;
  setting: string;
  changed_detail: string;
  status: 'expert_review_required';
};

export type District = {
  id: string;
  arc: string;
  title: string;
  promise: string;
  bundles: SkillBundle[];
  missions: MissionSummary[];
};

export type ReferenceTrack = {
  schema_version: string;
  status: string;
  interface_language: string;
  target_language: string;
  claim_boundary: string;
  evidence_ladder: {
    id: EvidenceLevel;
    label: string;
    observation_contract: string;
    promotion_boundary: string;
    traceability: string;
  }[];
  districts: District[];
  source_boundaries: {
    id: string;
    owner: string;
    resource: string;
    url: string;
    permitted_role: string;
    prohibited_use: string;
    status: string;
  }[];
};

export type DemoMissionStep = {
  id: string;
  kind: 'observe' | 'choose' | 'interpret' | 'produce' | 'adapt';
  title: string;
  prompt: string;
  source_line?: string;
  translation?: string;
  choices?: { id: string; label: string; correct: boolean }[];
  evidence_level: EvidenceLevel;
};

export type DemoMission = {
  id: string;
  district_id: string;
  bundle_ids: string[];
  title: string;
  setting: string;
  briefing: string;
  changed_detail: string;
  steps: DemoMissionStep[];
};

export const referenceTrack = trackData as ReferenceTrack;
export const demoMissions = missionData.missions as DemoMission[];

export function findDistrict(districtId: string) {
  return referenceTrack.districts.find((district) => district.id === districtId);
}

export function findBundle(bundleId: string) {
  return referenceTrack.districts.flatMap((district) => district.bundles).find((bundle) => bundle.id === bundleId);
}

export function findMission(missionId: string) {
  return demoMissions.find((mission) => mission.id === missionId);
}

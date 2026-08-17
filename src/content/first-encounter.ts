import firstEncounterData from '@/content/first-encounter.json';

export type Choice = {
  id: string;
  label: string;
  correct: boolean;
};

type TaskBase = {
  id: string;
  title: string;
  prompt: string;
  source_line: string;
  translation: string;
  target_skill_id: string;
  retry_hint?: string;
};

export type NoticeTask = TaskBase & {
  kind: 'notice';
  explanation: string;
};

export type ChoiceTask = TaskBase & {
  kind: 'choice';
  choices: Choice[];
};

export type BuildTask = TaskBase & {
  kind: 'build';
  tokens: string[];
  correct_token_order: string[];
};

export type EncounterTask = NoticeTask | ChoiceTask | BuildTask;

export type EncounterStage = {
  id: string;
  order: number;
  title: string;
  eyebrow: string;
  duration: string;
  target_skill_id: string;
  source_registry_ids: string[];
  can_do: string;
  evidence_boundary: string;
  tasks: EncounterTask[];
};

export type FirstEncounterMission = {
  id: string;
  title: string;
  eyebrow: string;
  setting: string;
  duration: string;
  changed_detail: string;
  required_stage_ids: string[];
  source_registry_ids: string[];
  evidence_boundary: string;
  steps: EncounterTask[];
};

export type FirstEncounterContent = {
  schema_version: string;
  status: 'reference_draft_language_review_required';
  interface_language: string;
  target_language: string;
  content_evidence_card: {
    content_version: string;
    target_skill_id: string;
    author: string;
    language_reviewer: string | null;
    audio_source: string | null;
    review_status: 'language_review_required';
    source_checked_on: string;
    source_registry_ids: string[];
    source_refs: string[];
    known_limits: string[];
  };
  stages: EncounterStage[];
  mission: FirstEncounterMission;
};

export const firstEncounter = firstEncounterData as FirstEncounterContent;

export function findFirstEncounterStage(stageId: string | undefined) {
  return firstEncounter.stages.find((stage) => stage.id === stageId);
}

export function firstEncounterStageAfter(stageId: string) {
  const currentIndex = firstEncounter.stages.findIndex((stage) => stage.id === stageId);
  return firstEncounter.stages[currentIndex + 1];
}

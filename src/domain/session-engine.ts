import type { DemoMission, DemoMissionStep } from '@/content/reference-track';

export type SessionState = {
  stepIndex: number;
  completedStepIds: string[];
  supportRevealed: boolean;
  selectedChoiceId?: string;
};

export const initialSessionState: SessionState = {
  stepIndex: 0,
  completedStepIds: [],
  supportRevealed: false,
};

export function currentStep(mission: DemoMission, state: SessionState): DemoMissionStep {
  return mission.steps[Math.min(state.stepIndex, mission.steps.length - 1)]!;
}

export function choiceIsCorrect(step: DemoMissionStep, choiceId: string) {
  return step.choices?.find((choice) => choice.id === choiceId)?.correct ?? false;
}

export function canAdvance(step: DemoMissionStep, state: SessionState) {
  if (!step.choices) return true;
  return Boolean(state.selectedChoiceId && choiceIsCorrect(step, state.selectedChoiceId));
}

export function advanceSession(mission: DemoMission, state: SessionState): SessionState {
  const step = currentStep(mission, state);
  if (!canAdvance(step, state)) return state;
  return {
    stepIndex: Math.min(state.stepIndex + 1, mission.steps.length),
    completedStepIds: [...new Set([...state.completedStepIds, step.id])],
    supportRevealed: false,
  };
}

export function sessionIsComplete(mission: DemoMission, state: SessionState) {
  return state.stepIndex >= mission.steps.length;
}

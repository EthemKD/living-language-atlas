import { firstEncounter, type EncounterTask } from '@/content/first-encounter';

export type FirstEncounterPhraseRoute =
  | { kind: 'stage'; stageId: string }
  | { kind: 'mission' }
  | { kind: 'return' };

export type FirstEncounterPhraseEntry = {
  id: string;
  sourceLine: string;
  translation: string;
  title: string;
  target: string;
  origin: string;
  route: FirstEncounterPhraseRoute;
};

function buildPhraseEntries() {
  const entries: FirstEncounterPhraseEntry[] = [];
  const seenSourceLines = new Set<string>();
  const addTasks = (tasks: EncounterTask[], origin: string, route: FirstEncounterPhraseRoute) => {
    for (const task of tasks) {
      if (seenSourceLines.has(task.source_line)) continue;
      seenSourceLines.add(task.source_line);
      entries.push({
        id: task.id,
        sourceLine: task.source_line,
        translation: task.translation,
        title: task.title,
        target: task.target_skill_id,
        origin,
        route,
      });
    }
  };

  for (const stage of firstEncounter.stages) {
    addTasks(stage.tasks, stage.title, { kind: 'stage', stageId: stage.id });
  }
  addTasks(firstEncounter.mission.steps, firstEncounter.mission.title, { kind: 'mission' });
  addTasks(firstEncounter.return_mission.steps, firstEncounter.return_mission.title, { kind: 'return' });

  return entries;
}

export const firstEncounterPhraseEntries = buildPhraseEntries();

export function firstEncounterPhrasesAvailableForRecall({
  completedStageIds,
  missionRehearsed,
}: {
  completedStageIds: readonly string[];
  missionRehearsed: boolean;
}) {
  const completed = new Set(completedStageIds);
  const currentStage = firstEncounter.stages.find((stage) => !completed.has(stage.id));
  const permittedStageIds = new Set(completedStageIds);
  if (currentStage) permittedStageIds.add(currentStage.id);

  return firstEncounterPhraseEntries.filter((entry) => {
    if (entry.route.kind === 'stage') return permittedStageIds.has(entry.route.stageId);
    return entry.route.kind === 'mission' ? missionRehearsed : false;
  });
}

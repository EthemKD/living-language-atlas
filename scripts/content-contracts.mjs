import { readFile } from 'node:fs/promises';

const projectUrl = new URL('../', import.meta.url);

async function readJson(relativePath) {
  return JSON.parse(await readFile(new URL(relativePath, projectUrl), 'utf8'));
}

export async function loadContent() {
  const [track, demo, encounter] = await Promise.all([
    readJson('src/content/russian-foundation-reference-track.json'),
    readJson('src/content/demo-missions.json'),
    readJson('src/content/first-encounter.json'),
  ]);
  return { track, demo, encounter };
}

export function validateContent({ track, demo, encounter }) {
  const errors = [];
  const bundles = track.districts.flatMap((district) => district.bundles);
  const missionSummaries = track.districts.flatMap((district) => district.missions);
  const allIds = [
    ...track.districts.map((district) => district.id),
    ...bundles.map((bundle) => bundle.id),
    ...missionSummaries.map((mission) => mission.id),
  ];

  if (track.districts.length !== 12) errors.push(`Expected 12 districts, found ${track.districts.length}.`);
  if (bundles.length !== 48) errors.push(`Expected 48 skill bundles, found ${bundles.length}.`);
  if (missionSummaries.length !== 36) errors.push(`Expected 36 mission summaries, found ${missionSummaries.length}.`);
  if (new Set(allIds).size !== allIds.length) errors.push('District, bundle and mission IDs must be globally unique.');

  for (const district of track.districts) {
    if (district.bundles.length !== 4) errors.push(`${district.id} must contain four skill bundles.`);
    if (district.missions.length !== 3) errors.push(`${district.id} must contain three missions.`);
  }

  for (const item of [...bundles, ...missionSummaries]) {
    if (item.status !== 'expert_review_required') errors.push(`${item.id} bypasses the expert-review gate.`);
  }

  const bundleIds = new Set(bundles.map((bundle) => bundle.id));
  const missionIds = new Set(missionSummaries.map((mission) => mission.id));
  for (const mission of demo.missions) {
    if (!missionIds.has(mission.id)) errors.push(`${mission.id} is not linked to a reference-track mission.`);
    for (const bundleId of mission.bundle_ids) {
      if (!bundleIds.has(bundleId)) errors.push(`${mission.id} references unknown bundle ${bundleId}.`);
    }
    for (const step of mission.steps) {
      if (step.choices) {
        const correctChoices = step.choices.filter((choice) => choice.correct);
        if (correctChoices.length !== 1) errors.push(`${mission.id}/${step.id} must have exactly one correct choice.`);
      }
    }
  }

  if (encounter.status !== 'reference_draft_language_review_required') {
    errors.push('First Encounter content bypasses the language-review gate.');
  }
  if (encounter.content_evidence_card.review_status !== 'language_review_required') {
    errors.push('First Encounter evidence card must retain the language-review requirement.');
  }
  if (encounter.content_evidence_card.language_reviewer !== null || encounter.content_evidence_card.audio_source !== null) {
    errors.push('First Encounter cannot imply reviewed language or traceable audio before those fields are supplied.');
  }

  const expectedStageIds = ['RUS-00', 'RUS-01', 'RUS-02', 'RUS-03'];
  if (encounter.stages.map((stage) => stage.id).join('|') !== expectedStageIds.join('|')) {
    errors.push('First Encounter stages must remain ordered RUS-00 through RUS-03.');
  }
  for (const stage of encounter.stages) {
    if (!stage.target_skill_id || !stage.can_do || !stage.evidence_boundary) {
      errors.push(`${stage.id} is missing a skill or evidence boundary.`);
    }
    if (stage.tasks.length < 3) errors.push(`${stage.id} needs at least three authored learning tasks.`);
  }

  const encounterTasks = [...encounter.stages.flatMap((stage) => stage.tasks), ...encounter.mission.steps];
  for (const task of encounterTasks) {
    if (!task.target_skill_id || !task.source_line || !task.translation) {
      errors.push(`${task.id} is missing source-bound learner content.`);
    }
    if (task.kind === 'choice' && task.choices.filter((choice) => choice.correct).length !== 1) {
      errors.push(`${task.id} must have exactly one deterministic choice answer.`);
    }
    if (task.kind === 'build') {
      if (task.tokens.length !== task.correct_token_order.length) {
        errors.push(`${task.id} build task must use every token exactly once.`);
      }
      if (new Set(task.tokens).size !== task.tokens.length) {
        errors.push(`${task.id} build tokens must be unique for deterministic selection.`);
      }
      if (task.correct_token_order.some((token) => !task.tokens.includes(token))) {
        errors.push(`${task.id} build order references an unavailable token.`);
      }
    }
  }

  if (encounter.mission.required_stage_ids.join('|') !== expectedStageIds.join('|')) {
    errors.push('The changed-context mission must remain gated by all four guided stages.');
  }
  if (!encounter.mission.steps.some((step) => step.target_skill_id.includes('repair'))) {
    errors.push('The changed-context mission must retain a repair event.');
  }

  return {
    errors,
    counts: {
      districts: track.districts.length,
      bundles: bundles.length,
      missionSummaries: missionSummaries.length,
      demoMissions: demo.missions.length,
      firstEncounterStages: encounter.stages.length,
      firstEncounterTasks: encounterTasks.length,
    },
  };
}

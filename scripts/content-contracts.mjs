import { readFile } from 'node:fs/promises';

const projectUrl = new URL('../', import.meta.url);

async function readJson(relativePath) {
  return JSON.parse(await readFile(new URL(relativePath, projectUrl), 'utf8'));
}

export async function loadContent() {
  const [track, demo, encounter, sourceRegistry, readingAssist] = await Promise.all([
    readJson('src/content/russian-foundation-reference-track.json'),
    readJson('src/content/demo-missions.json'),
    readJson('src/content/first-encounter.json'),
    readJson('src/content/source-registry.json'),
    readJson('src/content/reading-assist.json'),
  ]);
  return { track, demo, encounter, sourceRegistry, readingAssist };
}

export function validateContent({ track, demo, encounter, sourceRegistry, readingAssist }) {
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
  if (!/^20\d{2}-\d{2}-\d{2}$/.test(encounter.content_evidence_card.source_checked_on)) {
    errors.push('First Encounter needs a valid source-check date.');
  }
  if (!encounter.content_evidence_card.source_refs.includes('src/content/source-registry.json')) {
    errors.push('First Encounter evidence must point to the source registry.');
  }

  const sourceRecords = sourceRegistry.sources;
  const sourceIds = sourceRecords.map((source) => source.id);
  const sourceIdSet = new Set(sourceIds);
  const sourcesById = new Map(sourceRecords.map((source) => [source.id, source]));
  const curriculumScopeSources = sourceRecords.filter((source) => source.use_mode !== 'learning_design_only');
  const learningDesignSources = sourceRecords.filter((source) => source.use_mode === 'learning_design_only');
  if (curriculumScopeSources.length !== 4) errors.push(`Expected four registered curriculum-scope sources, found ${curriculumScopeSources.length}.`);
  if (learningDesignSources.length !== 2) errors.push(`Expected two registered learning-design sources, found ${learningDesignSources.length}.`);
  if (sourceIdSet.size !== sourceIds.length) errors.push('Source registry IDs must be unique.');
  for (const source of sourceRecords) {
    if (!source.publisher || !source.authority_type || !source.url?.startsWith('https://')) {
      errors.push(`${source.id || 'unknown source'} is missing traceable publisher metadata.`);
    }
    if (!Array.isArray(source.supports) || source.supports.length === 0 || !Array.isArray(source.does_not_support) || source.does_not_support.length === 0) {
      errors.push(`${source.id || 'unknown source'} must state both its scope and its limits.`);
    }
    if (!['scope_only', 'topic_scope_only', 'learning_design_only'].includes(source.use_mode)) {
      errors.push(`${source.id || 'unknown source'} has an unsupported source-use mode.`);
    }
  }

  function requireRegisteredSources(ownerId, registryIds, expectedUseModes) {
    if (!Array.isArray(registryIds) || registryIds.length === 0) {
      errors.push(`${ownerId} must name at least one registered source.`);
      return;
    }
    for (const sourceId of registryIds) {
      if (!sourceIdSet.has(sourceId)) errors.push(`${ownerId} references unknown source ${sourceId}.`);
      const source = sourcesById.get(sourceId);
      if (source && !expectedUseModes.includes(source.use_mode)) {
        errors.push(`${ownerId} uses ${sourceId} outside its declared source-use mode.`);
      }
    }
  }

  const curriculumUseModes = ['scope_only', 'topic_scope_only'];
  requireRegisteredSources('First Encounter evidence card', encounter.content_evidence_card.source_registry_ids, curriculumUseModes);

  const expectedStageIds = ['RUS-00', 'RUS-01', 'RUS-02', 'RUS-03'];
  if (encounter.stages.map((stage) => stage.id).join('|') !== expectedStageIds.join('|')) {
    errors.push('First Encounter stages must remain ordered RUS-00 through RUS-03.');
  }
  for (const stage of encounter.stages) {
    if (!stage.target_skill_id || !stage.can_do || !stage.evidence_boundary) {
      errors.push(`${stage.id} is missing a skill or evidence boundary.`);
    }
    if (stage.tasks.length < 3) errors.push(`${stage.id} needs at least three authored learning tasks.`);
    requireRegisteredSources(stage.id, stage.source_registry_ids, curriculumUseModes);
  }

  const firstEncounterTasks = [...encounter.stages.flatMap((stage) => stage.tasks), ...encounter.mission.steps];
  const returnTasks = encounter.return_mission.steps;
  const allEncounterTasks = [...firstEncounterTasks, ...returnTasks];
  for (const task of allEncounterTasks) {
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
  requireRegisteredSources(encounter.mission.id, encounter.mission.source_registry_ids, curriculumUseModes);

  if (encounter.return_mission.required_mission_id !== encounter.mission.id) {
    errors.push('The delayed return must remain gated by the changed-context mission.');
  }
  if (encounter.return_mission.available_after_hours !== 24) {
    errors.push('The delayed return must retain its explicit 24-hour product interval.');
  }
  if (returnTasks.length !== 4) errors.push(`The delayed return needs four authored tasks, found ${returnTasks.length}.`);
  if (!returnTasks.some((step) => step.target_skill_id.includes('repair'))) {
    errors.push('The delayed return must keep a changed repair event.');
  }
  requireRegisteredSources(encounter.return_mission.id, encounter.return_mission.source_registry_ids, curriculumUseModes);
  requireRegisteredSources(
    `${encounter.return_mission.id} learning design`,
    encounter.return_mission.learning_design_source_registry_ids,
    ['learning_design_only'],
  );

  if (readingAssist.status !== encounter.status) {
    errors.push('Reading assist must preserve the First Encounter language-review gate.');
  }
  const readingAssistLines = readingAssist.items.map((item) => item.source_line);
  const readingAssistLineSet = new Set(readingAssistLines);
  if (readingAssistLineSet.size !== readingAssistLines.length) errors.push('Reading-assist source lines must be unique.');
  for (const item of readingAssist.items) {
    if (!item.source_line || !item.reading_assist || item.reading_assist.trim() !== item.reading_assist) {
      errors.push('Every reading-assist entry must contain a clean source line and optional-reading value.');
    }
  }
  const encounterSourceLines = new Set(allEncounterTasks.map((task) => task.source_line));
  for (const sourceLine of encounterSourceLines) {
    if (!readingAssistLineSet.has(sourceLine)) errors.push(`Missing reading assist for ${sourceLine}.`);
  }
  for (const sourceLine of readingAssistLineSet) {
    if (!encounterSourceLines.has(sourceLine)) errors.push(`Reading assist is not attached to First Encounter content: ${sourceLine}.`);
  }

  return {
    errors,
    counts: {
      districts: track.districts.length,
      bundles: bundles.length,
      missionSummaries: missionSummaries.length,
      demoMissions: demo.missions.length,
      firstEncounterStages: encounter.stages.length,
      firstEncounterTasks: firstEncounterTasks.length,
      delayedReturnTasks: returnTasks.length,
      curriculumScopeSources: curriculumScopeSources.length,
      learningDesignSources: learningDesignSources.length,
      readingAssistItems: readingAssist.items.length,
    },
  };
}

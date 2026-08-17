import assert from 'node:assert/strict';
import test from 'node:test';

import { loadContent, validateContent } from '../scripts/content-contracts.mjs';

test('reference track retains its declared product counts and review gates', async () => {
  const result = validateContent(await loadContent());
  assert.deepEqual(result.errors, []);
  assert.deepEqual(result.counts, {
    districts: 12,
    bundles: 48,
    missionSummaries: 36,
    demoMissions: 1,
    firstEncounterStages: 4,
    firstEncounterTasks: 17,
    curriculumScopeSources: 4,
    readingAssistItems: 14,
  });
});

test('current demo mission moves from encounter to transfer without skipping support trace', async () => {
  const { demo } = await loadContent();
  const mission = demo.missions.find((item) => item.id === 'D03-M01');
  assert.ok(mission);
  assert.deepEqual(
    mission.steps.map((step) => step.evidence_level),
    ['E0', 'E1', 'E1', 'E2', 'E3'],
  );
  assert.equal(mission.changed_detail, 'The platform changes from three to five.');
});

test('choice interactions have one and only one deterministic answer', async () => {
  const { demo } = await loadContent();
  const choiceSteps = demo.missions.flatMap((mission) => mission.steps).filter((step) => step.choices);
  assert.ok(choiceSteps.length > 0);
  for (const step of choiceSteps) {
    assert.equal(step.choices.filter((choice) => choice.correct).length, 1, step.id);
  }
});

test('First Encounter keeps its reviewed-content boundary and changed-context repair path', async () => {
  const { encounter, sourceRegistry, readingAssist } = await loadContent();
  assert.equal(encounter.status, 'reference_draft_language_review_required');
  assert.equal(encounter.content_evidence_card.language_reviewer, null);
  assert.equal(encounter.content_evidence_card.audio_source, null);
  assert.deepEqual(
    encounter.stages.map((stage) => stage.id),
    ['RUS-00', 'RUS-01', 'RUS-02', 'RUS-03'],
  );
  assert.deepEqual(encounter.mission.required_stage_ids, ['RUS-00', 'RUS-01', 'RUS-02', 'RUS-03']);
  assert.ok(encounter.mission.steps.some((step) => step.target_skill_id.includes('repair')));
  assert.match(encounter.mission.changed_detail, /tea/i);
  assert.equal(encounter.content_evidence_card.source_checked_on, '2026-08-17');
  assert.equal(sourceRegistry.sources.length, 4);
  assert.equal(new Set(sourceRegistry.sources.map((source) => source.id)).size, 4);
  assert.ok(sourceRegistry.sources.every((source) => source.url.startsWith('https://')));
  assert.equal(readingAssist.status, encounter.status);

  const encounterLines = new Set([
    ...encounter.stages.flatMap((stage) => stage.tasks.map((task) => task.source_line)),
    ...encounter.mission.steps.map((step) => step.source_line),
  ]);
  assert.deepEqual(new Set(readingAssist.items.map((item) => item.source_line)), encounterLines);
});

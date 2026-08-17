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

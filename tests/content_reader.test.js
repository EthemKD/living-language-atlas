'use strict';

const assert = require('node:assert/strict');
const path = require('node:path');
const {
  CANONICAL_FIXTURE_IDS,
  CANONICAL_SHA256,
  CanonicalContentReader
} = require('../src/content_reader');

const canonicalPath = path.resolve(__dirname, '..', 'outputs', 'living_language_atlas_wp02_german_content_pack_v2_1_candidate.json');

function test(name, run) {
  run();
  console.log(`PASS ${name}`);
}

console.log('=== WP-03.1 CANONICAL CONTENT READER ACCEPTANCE GATE ===');

const reader = new CanonicalContentReader({ filePath: canonicalPath });
const pack = reader.load();

test('accepts the exact supplied candidate hash', () => {
  assert.equal(reader.fileSha256, CANONICAL_SHA256);
});

test('loads the actual top-level contract without transformation', () => {
  assert.equal(pack.content_pack_id, 'de-DE-counter-n1-n2-002-draft');
  assert.equal(pack.content_version, '2.1.0-candidate');
  assert.equal(pack.evidence_policy_version, '1.1');
  assert.equal(pack.evaluation_fixtures.length, 27);
  assert.equal(pack.provenance_sources.length, 7);
  assert.deepEqual(pack.evaluation_fixtures.map((fixture) => fixture.fixture_id), CANONICAL_FIXTURE_IDS);
});

test('preserves the ERR-F01 H4/E0 reclassification contract', () => {
  const fixture = reader.getFixture('ERR-F01');
  assert.equal(fixture.activity_id, 'ACT-DE-N1-E0-01');
  assert.equal(fixture.skill_id, 'GER-SVC-REQUEST-ONE-01');
  assert.equal(fixture.input_state.invalid_activity_declaration.declared_support_level, 'H0');
  assert.equal(fixture.input_state.classification_resolution.derived_support_level, 'H4');
  assert.equal(fixture.input_state.classification_resolution.derived_evidence_capability, 'E0');
  assert.equal(fixture.expected_evidence_decision.awarded_tier, 'E0');
  assert.deepEqual(fixture.expected_evidence_decision.reason_codes, ['MODEL_EXPOSURE_RECLASSIFIED_H4_E0']);
});

test('preserves reviewer-adjudicated critical register fixtures', () => {
  const expected = new Map([
    ['ERR-F16', ['NONCAN-DE-N1-02', 'REGISTER_TOO_DIRECT']],
    ['ERR-F17', ['NONCAN-DE-N2-02', 'REGISTER_COLLOQUIAL_ABRUPT']]
  ]);
  for (const [fixtureId, [variantId, errorCode]] of expected) {
    const fixture = reader.getFixture(fixtureId);
    assert.equal(fixture.input_state.matched_variant_id, variantId);
    assert.equal(fixture.expected_attempt_evaluation.evaluation_outcome, 'failed_critical');
    assert.equal(fixture.expected_attempt_evaluation.register_outcome, 'mismatch');
    assert.deepEqual(fixture.expected_attempt_evaluation.error_codes, [errorCode]);
    assert.equal(fixture.expected_evidence_decision.awarded_tier, 'NONE');
  }
});

test('preserves the real suffixed E4 fixture and its policy evidence', () => {
  const fixture = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const activity = reader.getActivity(fixture.activity_id);
  assert.equal(fixture.input_state.seconds_since_prior_e3, 93600);
  assert.equal(fixture.expected_evidence_decision.awarded_tier, 'E4');
  assert.equal(fixture.expected_evidence_decision.delay_qualified, true);
  assert.deepEqual(fixture.expected_evidence_decision.reason_codes, ['DELAYED_RETURN_E4_QUALIFIED']);
  assert.equal(activity.e4_eligibility_policy.minimum_clean_delay_seconds, 72000);
});

test('indexes actual IDs across all canonical entity kinds', () => {
  assert.equal(reader.getNode('NODE-N1').node_id, 'NODE-N1');
  assert.equal(reader.getSkill('GER-SVC-REQUEST-ONE-01').skill_id, 'GER-SVC-REQUEST-ONE-01');
  assert.equal(reader.getLexicalItem('LEX-DE-001').item_id, 'LEX-DE-001');
  assert.equal(reader.getRubric('RUBRIC-DE-N1-REQ-01').rubric_id, 'RUBRIC-DE-N1-REQ-01');
  assert.equal(reader.getActivity('ACT-DE-N2-E3-01').activity_id, 'ACT-DE-N2-E3-01');
  assert.equal(reader.getSource('SRC-DE-007').source_id, 'SRC-DE-007');
});

test('rejects a non-accepted content hash before parsing/indexing', () => {
  const wrongHashReader = new CanonicalContentReader({ filePath: canonicalPath, expectedSha256: '0'.repeat(64) });
  assert.throws(() => wrongHashReader.load(), /Canonical content hash mismatch/);
});

console.log('=== WP-03.1 CANONICAL ACCEPTANCE GATE PASSED ===');

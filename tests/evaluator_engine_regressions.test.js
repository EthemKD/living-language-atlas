'use strict';

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { CanonicalContentReader } = require('../src/content_reader');
const {
  DeterministicEvaluator,
  parseStrictUtcIsoTimestamp,
  hasExplicitNegativeMarker,
  validateEventMarkerFields,
  isPositivePriorLearning,
  isPositivePriorRecognition,
  isPositivePriorE3,
  getAuthoritativeAttemptTime,
  KNOWN_MARKER_FIELDS,
  ALLOWED_POSITIVE_LEARNING_MARKERS,
  ALLOWED_POSITIVE_RECOGNITION_MARKERS,
  ALLOWED_POSITIVE_PRIOR_E3_MARKERS
} = require('../src/evaluator_engine');

const reader = new CanonicalContentReader({
  filePath: path.resolve(__dirname, '..', 'outputs', 'living_language_atlas_wp02_german_content_pack_v2_1_candidate.json')
});
const pack = reader.load();
const standardTestLedger = [
  {
    event_id: 'EVT-FAMILIAR-LEX-DE-002',
    item_id: 'LEX-DE-002',
    status: 'PRETAUGHT_ACCEPTED',
    source_type: 'PRIOR_LEARNING_EVENT',
    occurred_at: '2026-09-01T09:00:00.000Z'
  },
  {
    event_id: 'EVT-FAMILIAR-LEX-DE-004',
    item_id: 'LEX-DE-004',
    status: 'PRETAUGHT_ACCEPTED',
    source_type: 'PRIOR_LEARNING_EVENT',
    occurred_at: '2026-09-01T09:00:00.000Z'
  },
  {
    event_id: 'EVT-FAMILIAR-LEX-DE-006',
    item_id: 'LEX-DE-006',
    status: 'PRETAUGHT_ACCEPTED',
    source_type: 'PRIOR_LEARNING_EVENT',
    occurred_at: '2026-09-01T09:00:00.000Z'
  },
  {
    event_id: 'EVT-ERR-F19-E4-CLEAN-26H-PRIOR-E3',
    activity_id: 'ACT-DE-N1-E3-01',
    skill_id: 'GER-SVC-REQUEST-ONE-01',
    evidence_lane: 'typed_production',
    awarded_tier: 'E3',
    occurred_at: '2026-09-01T10:00:00.000Z',
    versions: {
      content_version: '2.1.0-candidate',
      evidence_policy_version: '1.1',
      rubric_id: 'RUBRIC-DE-N1-REQ-01',
      rubric_version: '2.1.0'
    }
  }
];

const defaultAuthoritativeAttemptAt = '2026-09-02T12:00:00Z';

const evaluator = new DeterministicEvaluator(reader, {
  eventLedger: standardTestLedger,
  latestAnswerRevealingExposureEvent: null,
  authoritativeAttemptAt: defaultAuthoritativeAttemptAt
});
const evaluatorWithoutLedger = new DeterministicEvaluator(reader);

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function makeValidE3Input(f) {
  const inp = clone(f.input_state);
  inp.attempt_at = '2026-09-02T12:00:00Z';
  inp.current_versions = {
    content_version: '2.1.0-candidate',
    evidence_policy_version: '1.1',
    rubric_id: 'RUBRIC-DE-N1-REQ-01',
    rubric_version: '2.1.0'
  };
  inp.familiarity_evidence = [
    { item_id: 'LEX-DE-002', status: 'PRETAUGHT_ACCEPTED', source_type: 'PRIOR_LEARNING_EVENT', source_event_id: 'EVT-FAMILIAR-LEX-DE-002' },
    { item_id: 'LEX-DE-004', status: 'PRETAUGHT_ACCEPTED', source_type: 'PRIOR_LEARNING_EVENT', source_event_id: 'EVT-FAMILIAR-LEX-DE-004' },
    { item_id: 'LEX-DE-006', status: 'PRETAUGHT_ACCEPTED', source_type: 'PRIOR_LEARNING_EVENT', source_event_id: 'EVT-FAMILIAR-LEX-DE-006' }
  ];
  return inp;
}

function test(name, fn) {
  try {
    fn();
    console.log(`PASS ${name}`);
  } catch (err) {
    console.error(`FAIL ${name}:`, err.message);
    throw err;
  }
}

console.log('=== WP-03.2R DETERMINISTIC EVALUATOR REGRESSION PROBES ===');

// --- POSITIVE CONTROLS ---

test('Positive control E3: clean ERR-F06 with explicit valid familiarity evidence awards E3', () => {
  const f = reader.getFixture('ERR-F06');
  const input = makeValidE3Input(f);
  const result = evaluator.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: input
  });
  assert.equal(result.attempt_evaluation.evaluation_outcome, 'accepted_clean');
  assert.equal(result.evidence_decision.awarded_tier, 'E3');
  assert.equal(result.evidence_decision.contamination_status, 'NONE');
  assert.deepEqual(result.evidence_decision.reason_codes, ['INDEPENDENT_TRANSFER_QUALIFIED']);
});

test('Positive control Trust Boundary: evaluator with injected eventLedger resolves familiarity and awards E3', () => {
  const f = reader.getFixture('ERR-F06');
  const input = clone(f.input_state);
  input.attempt_at = '2026-09-02T12:00:00Z';
  input.current_versions = {
    content_version: '2.1.0-candidate',
    evidence_policy_version: '1.1',
    rubric_id: 'RUBRIC-DE-N1-REQ-01',
    rubric_version: '2.1.0'
  };
  delete input.familiarity_evidence;

  const ledger = [
    { event_id: 'EVT-LEDGER-002', item_id: 'LEX-DE-002', status: 'PRETAUGHT_ACCEPTED', occurred_at: '2026-09-01T09:00:00.000Z' },
    { event_id: 'EVT-LEDGER-004', item_id: 'LEX-DE-004', status: 'PRETAUGHT_ACCEPTED', occurred_at: '2026-09-01T09:00:00.000Z' },
    { event_id: 'EVT-LEDGER-006', item_id: 'LEX-DE-006', status: 'PRETAUGHT_ACCEPTED', occurred_at: '2026-09-01T09:00:00.000Z' }
  ];

  const ledgerEvaluator = new DeterministicEvaluator(reader, { eventLedger: ledger, authoritativeAttemptAt: defaultAuthoritativeAttemptAt });
  const result = ledgerEvaluator.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: input
  });
  assert.equal(result.evidence_decision.familiarity_qualified, true);
  assert.equal(result.evidence_decision.awarded_tier, 'E3');
  assert.deepEqual(result.evidence_decision.reason_codes, ['INDEPENDENT_TRANSFER_QUALIFIED']);
});

test('Positive control E4: clean ERR-F19-E4-CLEAN-26H awards E4', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const result = evaluator.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: clone(f.input_state)
  });
  assert.equal(result.attempt_evaluation.evaluation_outcome, 'accepted_clean');
  assert.equal(result.evidence_decision.awarded_tier, 'E4');
  assert.equal(result.evidence_decision.delay_qualified, true);
  assert.equal(result.evidence_decision.contamination_status, 'NONE');
  assert.deepEqual(result.evidence_decision.reason_codes, ['DELAYED_RETURN_E4_QUALIFIED']);
});

// --- DEFECT PROBES FROM SECTION 5 ---

test('Probe 1: Reveal during E3 caps at E0 practice, does NOT award E3', () => {
  const f = reader.getFixture('ERR-F06');
  const input = makeValidE3Input(f);
  input.answer_revealed = true;
  input.activity_support_level = 'H4';

  const result = evaluator.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: input
  });
  assert.equal(result.evidence_decision.contamination_status, 'CONTAMINATED');
  assert.notEqual(result.evidence_decision.awarded_tier, 'E3', 'Contaminated E3 retry must not award E3');
  assert.equal(result.evidence_decision.awarded_tier, 'E0', 'Contaminated retry caps at E0/practice');
  assert.ok(
    result.evidence_decision.reason_codes.includes('CONTAMINATED_RETRY_BLOCKED_FROM_E3') ||
    result.evidence_decision.reason_codes.includes('MODEL_EXPOSURE_RECLASSIFIED_H4_E0'),
    'Must include contaminated/reveal reason code'
  );
});

test('Probe 2: Reveal during E4 caps at E0 practice, does NOT award E4', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = clone(f.input_state);
  input.answer_revealed = true;
  input.activity_support_level = 'H4';

  const result = evaluator.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: input
  });
  assert.equal(result.evidence_decision.contamination_status, 'CONTAMINATED');
  assert.notEqual(result.evidence_decision.awarded_tier, 'E4', 'Contaminated E4 retry must not award E4');
  assert.notEqual(result.evidence_decision.awarded_tier, 'E3', 'Contaminated retry cannot award independent E3');
  assert.equal(result.evidence_decision.awarded_tier, 'E0', 'Contaminated retry caps at E0/practice');
  assert.ok(
    result.evidence_decision.reason_codes.includes('CONTAMINATED_RETRY_BLOCKED_FROM_E4'),
    'Must include CONTAMINATED_RETRY_BLOCKED_FROM_E4'
  );
});

test('Probe 3: Wrong prior skill in E4 does NOT award request-skill E4', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = clone(f.input_state);
  input.prior_e3_skill_id = 'GER-SVC-REPAIR-01';
  input.prior_e3_event.skill_id = 'GER-SVC-REPAIR-01';

  const result = evaluator.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: input
  });
  assert.notEqual(result.evidence_decision.awarded_tier, 'E4', 'Wrong prior skill must not award E4');
  assert.equal(result.evidence_decision.awarded_tier, 'E3', 'Downgrades to E3 since learner achieved changed-context transfer');
  assert.ok(
    result.evidence_decision.reason_codes.includes('CROSS_SKILL_PRIOR_E3_INVALID') ||
    result.evidence_decision.reason_codes.includes('MISSING_PRIOR_E3_RECORD'),
    'Must record cross-skill/missing prior E3 reason'
  );
});

test('Probe 4: Inconsistent elapsed time (occurred_at == attempt_at) fails delay qualification', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = clone(f.input_state);
  input.prior_e3_event.occurred_at = input.attempt_at; // 0 seconds actual elapsed
  input.seconds_since_prior_e3 = 93600; // stale cached seconds

  const result = evaluator.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: input
  });
  assert.equal(result.evidence_decision.delay_qualified, false, '0s elapsed time must fail delay qualification');
  assert.notEqual(result.evidence_decision.awarded_tier, 'E4', '0s elapsed time must not award E4');
  assert.equal(result.evidence_decision.awarded_tier, 'E3', 'Downgrades to E3 maintenance');
  assert.deepEqual(result.evidence_decision.reason_codes, ['DELAY_THRESHOLD_NOT_MET']);
});

test('Probe 5: Missing familiarity records (familiarity_evidence=[]) fails familiarity qualification', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = clone(f.input_state);
  input.familiarity_evidence = [];

  const result = evaluator.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: input
  });
  assert.equal(result.evidence_decision.familiarity_qualified, false, 'Empty familiarity evidence must fail qualification');
  assert.equal(result.evidence_decision.awarded_tier, 'NONE', 'Unfamiliar required items block evidence');
  assert.deepEqual(result.evidence_decision.reason_codes, ['UNSCORED_PREREQUISITE_MISSING']);
});

test('Probe 6: No actual context change (baseline == current vector) fails changed-context', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = clone(f.input_state);
  input.context_change_evidence.current_context_vector = clone(input.context_change_evidence.baseline_context_vector);
  input.context_change_evidence.qualified_changed_dimensions = [
    { dimension: 'delay', from: '0h', to: '26h', relevance: 'TEMPORAL' }
  ];

  const result = evaluator.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: input
  });
  assert.equal(result.evidence_decision.changed_context_qualified, false, 'Identical vectors cannot qualify changed context');
  assert.notEqual(result.evidence_decision.awarded_tier, 'E4', 'Must not award E4 without context change');
  assert.equal(result.evidence_decision.awarded_tier, 'E2', 'Caps at supported E2');
  assert.deepEqual(result.evidence_decision.reason_codes, ['INVALID_CHANGED_DIMENSIONS_DELAY_IS_NOT_CONTEXT']);
});

test('Probe 7: Wrong requested product (coffee instead of tea in E3) does NOT award E3', () => {
  const f = reader.getFixture('ERR-F06');
  const input = makeValidE3Input(f);
  input.raw_input = 'Einen Kaffee, bitte.';
  delete input.matched_variant_id;
  delete input.normalized_input;

  const result = evaluator.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: input
  });
  assert.notEqual(result.evidence_decision.awarded_tier, 'E3', 'Ordering coffee when tea is required must not award E3');
  assert.equal(result.evidence_decision.awarded_tier, 'NONE', 'Referent mismatch awards no transfer evidence');
  assert.ok(
    result.evidence_decision.reason_codes.includes('WRONG_REFERENT') ||
    result.evidence_decision.reason_codes.includes('TARGET_ITEM_MISMATCH'),
    'Must include WRONG_REFERENT or TARGET_ITEM_MISMATCH reason'
  );
});

test('Probe 8: Unsupported E1 recognition dispatch handles gracefully without throwing', () => {
  const input = {
    raw_input: 'Einen Kaffee, bitte.',
    runtime_activity_context_present: true
  };
  let result;
  assert.doesNotThrow(() => {
    result = evaluator.evaluateFixture({
      activity_id: 'ACT-DE-N1-E1-01',
      skill_id: 'GER-SVC-REQUEST-ONE-01',
      input_state: input
    });
  }, 'Must not throw TypeError or unhandled exception on E1 dispatch');
  assert.notEqual(result.evidence_decision.awarded_tier, 'E4', 'E1 cannot fall through to E4');
  assert.notEqual(result.evidence_decision.awarded_tier, 'E1', 'Malformed typed input on selection activity cannot award E1');
  assert.equal(result.evidence_decision.awarded_tier, 'NONE', 'Returns non-awarding result');
});

test('Probe 9: Minor-form policy boundary ("Ein Apfelsaft, bitte.") does not award unearned E4', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = clone(f.input_state);
  input.raw_input = 'Ein Apfelsaft, bitte.';
  delete input.matched_variant_id;
  delete input.normalized_input;

  const result = evaluator.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: input
  });
  // Communicative attempt preserves task success & minor classification
  assert.equal(result.attempt_evaluation.evaluation_outcome, 'accepted_minor');
  assert.equal(result.attempt_evaluation.intent_outcome, 'achieved');
  assert.equal(result.attempt_evaluation.evaluator_confidence_bucket, 'REVIEW_REQUIRED');

  // Evidence decision MUST NOT grant unearned form credit at E4
  assert.notEqual(result.evidence_decision.awarded_tier, 'E4', 'REVIEW_REQUIRED / form_evidence_allowed:false must not award E4');
  assert.equal(result.evidence_decision.awarded_tier, 'NONE', 'Cannot award automated evidence without qualified review');
  assert.ok(
    result.evidence_decision.reason_codes.includes('REVIEW_REQUIRED_FORM_EVIDENCE_DISALLOWED'),
    'Must explicitly state review required / form evidence disallowed'
  );
});

test('Probe 10a: Delay boundary at 71999s fails delay qualification, awards E3', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = clone(f.input_state);
  const attemptTime = new Date('2026-09-02T12:00:00Z').getTime();
  input.attempt_at = '2026-09-02T12:00:00Z';
  const boundary71999 = new Date(attemptTime - 71999 * 1000).toISOString();
  input.prior_e3_event.occurred_at = boundary71999;
  input.seconds_since_prior_e3 = 71999;

  const ledger71999 = standardTestLedger.map((e) => e.event_id === input.prior_e3_event.event_id ? { ...e, occurred_at: boundary71999 } : e);

  const result = evaluator.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: input
  }, { eventLedger: ledger71999 });
  assert.equal(result.evidence_decision.delay_qualified, false, '71999s must not meet 72000s threshold');
  assert.equal(result.evidence_decision.awarded_tier, 'E3');
  assert.deepEqual(result.evidence_decision.reason_codes, ['DELAY_THRESHOLD_NOT_MET']);
});

test('Probe 10b: Delay boundary at 72000s meets delay qualification, awards E4', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = clone(f.input_state);
  const attemptTime = new Date('2026-09-02T12:00:00Z').getTime();
  input.attempt_at = '2026-09-02T12:00:00Z';
  const boundary72000 = new Date(attemptTime - 72000 * 1000).toISOString();
  input.prior_e3_event.occurred_at = boundary72000;
  input.seconds_since_prior_e3 = 72000;

  const ledger72000 = standardTestLedger.map((e) => e.event_id === input.prior_e3_event.event_id ? { ...e, occurred_at: boundary72000 } : e);

  const result = evaluator.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: input
  }, { eventLedger: ledger72000 });
  assert.equal(result.evidence_decision.delay_qualified, true, '72000s must meet 72000s threshold');
  assert.equal(result.evidence_decision.awarded_tier, 'E4');
  assert.deepEqual(result.evidence_decision.reason_codes, ['DELAYED_RETURN_E4_QUALIFIED']);
});

test('Probe 11: Response immutability - input_state is not modified during evaluation', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = clone(f.input_state);
  const frozen = JSON.stringify(input);
  evaluator.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: input
  });
  assert.equal(JSON.stringify(input), frozen, 'Input state must remain unmodified');
});

console.log('\n=== WP-03.2R2 ACCEPTANCE DEFECT PROBES (R2-01 to R2-09) ===');

test('R2-01: ERR-F06 with activity_support_level=H3 caps at E2 supported production', () => {
  const f = reader.getFixture('ERR-F06');
  const input = makeValidE3Input(f);
  input.activity_support_level = 'H3';

  const result = evaluator.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: input
  });
  assert.notEqual(result.evidence_decision.awarded_tier, 'E3', 'H3 support level must not award independent E3');
  assert.equal(result.evidence_decision.awarded_tier, 'E2', 'H3 support level caps at supported E2');
  assert.deepEqual(result.evidence_decision.reason_codes, ['SUPPORTED_PRODUCTION_H3']);
});

test('R2-02: clean E4 with familiarity_evidence deleted blocks E4 award', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = clone(f.input_state);
  delete input.familiarity_evidence;

  const result = evaluator.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: input
  });
  assert.notEqual(result.evidence_decision.awarded_tier, 'E4', 'Missing familiarity evidence must not award E4');
  assert.equal(result.evidence_decision.familiarity_qualified, false);
  assert.equal(result.evidence_decision.awarded_tier, 'NONE');
  assert.deepEqual(result.evidence_decision.reason_codes, ['UNSCORED_PREREQUISITE_MISSING']);
});

test('R2-03: clean E4 with bare item_id only familiarity records fails validation', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = clone(f.input_state);
  input.familiarity_evidence = input.familiarity_evidence.map((e) => ({ item_id: e.item_id }));

  const result = evaluator.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: input
  });
  assert.notEqual(result.evidence_decision.awarded_tier, 'E4', 'Bare item_id metadata must not establish familiarity');
  assert.equal(result.evidence_decision.familiarity_qualified, false);
  assert.equal(result.evidence_decision.awarded_tier, 'NONE');
  assert.deepEqual(result.evidence_decision.reason_codes, ['UNSCORED_PREREQUISITE_MISSING']);
});

test('R2-04: clean E4 with absent timestamps cannot establish chronology or delay and awards NONE / UNSCORED_PREREQUISITE_MISSING', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = clone(f.input_state);
  delete input.attempt_at;
  delete input.prior_e3_event.occurred_at;
  // input.seconds_since_prior_e3 is retained as 93600

  const result = evaluator.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: input
  }, { authoritativeAttemptAt: undefined });
  assert.notEqual(result.evidence_decision.awarded_tier, 'E4', 'Cached seconds cannot substitute for absent timestamps');
  assert.equal(result.evidence_decision.delay_qualified, false);
  assert.equal(result.evidence_decision.familiarity_qualified, false, 'Missing attempt_at cannot verify historical familiarity chronology');
  assert.equal(result.evidence_decision.awarded_tier, 'NONE', 'Cannot fall back to E3 without establishing chronology');
  assert.deepEqual(result.evidence_decision.reason_codes, ['UNSCORED_PREREQUISITE_MISSING']);
});

test('R2-05: clean E4 with prior_e3_event rubric_version incompatible blocks E4', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = clone(f.input_state);
  input.prior_e3_event.versions.rubric_version = 'incompatible';

  const result = evaluator.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: input
  });
  assert.notEqual(result.evidence_decision.awarded_tier, 'E4', 'Incompatible prior rubric version must not award E4');
  assert.equal(result.evidence_decision.awarded_tier, 'E3');
  assert.deepEqual(result.evidence_decision.reason_codes, ['PRIOR_E3_RUBRIC_INCOMPATIBLE']);
});

test('R2-06: clean E4 with wrong product and null prior blocks task evidence (no E3 fallback)', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = clone(f.input_state);
  input.raw_input = 'Einen Kaffee, bitte.';
  delete input.matched_variant_id;
  delete input.normalized_input;
  input.prior_e3_event = null;
  input.prior_e3_event_id = null;

  const result = evaluator.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: input
  });
  assert.notEqual(result.evidence_decision.awarded_tier, 'E3', 'Wrong product must not fall back to E3');
  assert.notEqual(result.evidence_decision.awarded_tier, 'E4');
  assert.equal(result.evidence_decision.awarded_tier, 'NONE');
  assert.deepEqual(result.evidence_decision.reason_codes, ['WRONG_REFERENT']);
});

test('R2-07: ERR-F06 with runtime_activity_context_present=false returns NONE / MISSING_ACTIVITY_RUNTIME_CONTEXT', () => {
  const f = reader.getFixture('ERR-F06');
  const input = makeValidE3Input(f);
  input.runtime_activity_context_present = false;

  const result = evaluator.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: input
  });
  assert.notEqual(result.evidence_decision.awarded_tier, 'E3');
  assert.equal(result.evidence_decision.awarded_tier, 'NONE');
  assert.deepEqual(result.evidence_decision.reason_codes, ['MISSING_ACTIVITY_RUNTIME_CONTEXT']);
});

test('R2-08: ERR-F06 with current_evidence_lane=spoken_production blocks lane spoofing', () => {
  const f = reader.getFixture('ERR-F06');
  const input = makeValidE3Input(f);
  input.current_evidence_lane = 'spoken_production';

  const result = evaluator.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: input
  });
  assert.notEqual(result.evidence_decision.awarded_tier, 'E3', 'Supplied spoken lane must not relabel typed activity');
  assert.equal(result.evidence_decision.awarded_tier, 'NONE');
  assert.deepEqual(result.evidence_decision.reason_codes, ['UNSUPPORTED_EVALUATOR_IN_SPOKEN_LANE']);
});

test('R2-09: clean E4 with deleted context vectors cannot qualify changed context from declarations alone', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = clone(f.input_state);
  delete input.context_change_evidence.baseline_context_vector;
  delete input.context_change_evidence.current_context_vector;
  // declared qualified_changed_dimensions retained

  const result = evaluator.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: input
  });
  assert.notEqual(result.evidence_decision.awarded_tier, 'E4', 'Declarations without context vectors must not award E4');
  assert.equal(result.evidence_decision.changed_context_qualified, false);
  assert.equal(result.evidence_decision.awarded_tier, 'E2');
  assert.deepEqual(result.evidence_decision.reason_codes, ['INVALID_CHANGED_DIMENSIONS_DELAY_IS_NOT_CONTEXT']);
});

console.log('\n=== COMBINED FAILURE PROBES ===');

test('Combination 1: Wrong target with short delay yields NONE / WRONG_REFERENT', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = clone(f.input_state);
  input.raw_input = 'Einen Kaffee, bitte.';
  delete input.matched_variant_id;
  delete input.normalized_input;
  input.seconds_since_prior_e3 = 100;

  const result = evaluator.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: input
  });
  assert.equal(result.evidence_decision.awarded_tier, 'NONE');
  assert.deepEqual(result.evidence_decision.reason_codes, ['WRONG_REFERENT']);
});

test('Combination 2: Wrong target with invalid context change yields NONE / WRONG_REFERENT', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = clone(f.input_state);
  input.raw_input = 'Einen Kaffee, bitte.';
  delete input.matched_variant_id;
  delete input.normalized_input;
  input.context_change_evidence.current_context_vector = clone(input.context_change_evidence.baseline_context_vector);

  const result = evaluator.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: input
  });
  assert.equal(result.evidence_decision.awarded_tier, 'NONE');
  assert.deepEqual(result.evidence_decision.reason_codes, ['WRONG_REFERENT']);
});

test('Combination 3: Support level mismatch combined with modality mismatch blocks award', () => {
  const f = reader.getFixture('ERR-F06');
  const input = makeValidE3Input(f);
  input.activity_support_level = 'H3';
  input.current_evidence_lane = 'spoken_production';

  const result = evaluator.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: input
  });
  assert.equal(result.evidence_decision.awarded_tier, 'NONE');
  assert.deepEqual(result.evidence_decision.reason_codes, ['UNSUPPORTED_EVALUATOR_IN_SPOKEN_LANE']);
});

console.log('\n=== OMISSION, NULL & MALFORMED EVIDENCE PROBES ===');

test('Malformed 1: familiarity_evidence=null in E4 fails familiarity qualification', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = clone(f.input_state);
  input.familiarity_evidence = null;

  const result = evaluator.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: input
  });
  assert.equal(result.evidence_decision.familiarity_qualified, false);
  assert.equal(result.evidence_decision.awarded_tier, 'NONE');
  assert.deepEqual(result.evidence_decision.reason_codes, ['UNSCORED_PREREQUISITE_MISSING']);
});

test('Malformed 2: familiarity record with invalid status fails qualification', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = clone(f.input_state);
  input.familiarity_evidence[0].status = 'INVALID_STATUS_CODE';

  const result = evaluator.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: input
  });
  assert.equal(result.evidence_decision.familiarity_qualified, false);
  assert.equal(result.evidence_decision.awarded_tier, 'NONE');
  assert.deepEqual(result.evidence_decision.reason_codes, ['UNSCORED_PREREQUISITE_MISSING']);
});

test('Malformed 3: PRETAUGHT_ACCEPTED familiarity record with invalid source_event_id fails qualification', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = clone(f.input_state);
  // find PRETAUGHT_ACCEPTED item
  const pretaught = input.familiarity_evidence.find((e) => e.status === 'PRETAUGHT_ACCEPTED');
  pretaught.source_event_id = 'INVALID_PREFIX_123';

  const result = evaluator.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: input
  });
  assert.equal(result.evidence_decision.familiarity_qualified, false);
  assert.equal(result.evidence_decision.awarded_tier, 'NONE');
  assert.deepEqual(result.evidence_decision.reason_codes, ['UNSCORED_PREREQUISITE_MISSING']);
});

console.log('\n=== WP-03.2R3 REPRODUCED FAILURE PROBES (R3-01 to R3-06) ===');

test('R3-01: ERR-F06 with current_evidence_lane=listen_recognition rejects incompatible lane', () => {
  const f = reader.getFixture('ERR-F06');
  const input = makeValidE3Input(f);
  input.current_evidence_lane = 'listen_recognition';

  const result = evaluator.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: input
  });
  assert.notEqual(result.evidence_decision.awarded_tier, 'E3', 'Must not award E3 in listening lane from typed input');
  assert.equal(result.evidence_decision.awarded_tier, 'NONE');
  assert.deepEqual(result.evidence_decision.reason_codes, ['UNSUPPORTED_EVALUATOR_LANE']);
});

test('R3-02: Clean E4 with deleted prior_e3_event.versions blocks E4 award', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = clone(f.input_state);
  delete input.prior_e3_event.versions;

  const result = evaluator.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: input
  });
  assert.notEqual(result.evidence_decision.awarded_tier, 'E4', 'Missing required prior version data must not award E4');
  assert.equal(result.evidence_decision.awarded_tier, 'E3');
  assert.deepEqual(result.evidence_decision.reason_codes, ['PRIOR_E3_RUBRIC_INCOMPATIBLE']);
});

test('R3-03: Clean E4 with invalid occurred_at in exposure event blocks E4 award', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = clone(f.input_state);
  input.last_answer_revealing_exposure_event = {
    event_id: 'EVT-REVEAL-INVALID',
    occurred_at: 'invalid'
  };

  const result = evaluator.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: input
  });
  assert.notEqual(result.evidence_decision.awarded_tier, 'E4', 'Malformed reveal timestamp cannot qualify clean delay');
  assert.equal(result.evidence_decision.delay_qualified, false);
  assert.equal(result.evidence_decision.awarded_tier, 'E3');
  assert.deepEqual(result.evidence_decision.reason_codes, ['DELAY_RESET_BY_EXPOSURE']);
});

test('R3-04: Clean E4 with short delay (3600s) and cloned baseline context vector caps at E2, NOT E3', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = clone(f.input_state);
  const attemptTime = Date.parse(input.attempt_at);
  input.prior_e3_event.occurred_at = new Date(attemptTime - 3600 * 1000).toISOString();
  input.seconds_since_prior_e3 = 3600;
  input.context_change_evidence.current_context_vector = clone(input.context_change_evidence.baseline_context_vector);

  const result = evaluator.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: input
  });
  assert.notEqual(result.evidence_decision.awarded_tier, 'E4');
  assert.notEqual(result.evidence_decision.awarded_tier, 'E3', 'Fallback to E3 must independently qualify for E3 (context change failed)');
  assert.equal(result.evidence_decision.changed_context_qualified, false);
  assert.equal(result.evidence_decision.awarded_tier, 'E2');
  assert.deepEqual(result.evidence_decision.reason_codes, ['INVALID_CHANGED_DIMENSIONS_DELAY_IS_NOT_CONTEXT']);
});

test('R3-05: ERR-F06 with familiarity_evidence=null returns NONE / UNSCORED_PREREQUISITE_MISSING (no pack shortcut)', () => {
  const f = reader.getFixture('ERR-F06');
  const input = makeValidE3Input(f);
  input.familiarity_evidence = null;

  const result = evaluator.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: input
  });
  assert.notEqual(result.evidence_decision.awarded_tier, 'E3', 'Pack metadata must not manufacture learner history');
  assert.equal(result.evidence_decision.familiarity_qualified, false);
  assert.equal(result.evidence_decision.awarded_tier, 'NONE');
  assert.deepEqual(result.evidence_decision.reason_codes, ['UNSCORED_PREREQUISITE_MISSING']);
});

test('R3-06: Clean E4 with PREVIOUSLY_RECOGNIZED records lacking event ID fails familiarity qualification', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = clone(f.input_state);
  input.familiarity_evidence = input.familiarity_evidence.map((e) => ({
    item_id: e.item_id,
    status: 'PREVIOUSLY_RECOGNIZED',
    source_type: 'PRIOR_RECOGNITION_EVENT'
  }));

  const result = evaluator.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: input
  });
  assert.notEqual(result.evidence_decision.awarded_tier, 'E4', 'PREVIOUSLY_RECOGNIZED requires resolvable source event ID');
  assert.equal(result.evidence_decision.familiarity_qualified, false);
  assert.equal(result.evidence_decision.awarded_tier, 'NONE');
  assert.deepEqual(result.evidence_decision.reason_codes, ['UNSCORED_PREREQUISITE_MISSING']);
});

console.log('\n=== PARAMETERIZED PREREQUISITE MATRIX TESTS ===');

// Dimension 1: Runtime Context
const contextCases = [
  { desc: 'valid (true)', value: true, expectedTier: 'E3', expectedReason: 'INDEPENDENT_TRANSFER_QUALIFIED' },
  { desc: 'false', value: false, expectedTier: 'NONE', expectedReason: 'MISSING_ACTIVITY_RUNTIME_CONTEXT' }
];
for (const tc of contextCases) {
  test(`Matrix Context: ${tc.desc}`, () => {
    const f = reader.getFixture('ERR-F06');
    const input = makeValidE3Input(f);
    input.runtime_activity_context_present = tc.value;
    const res = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: input });
    assert.equal(res.evidence_decision.awarded_tier, tc.expectedTier);
    assert.deepEqual(res.evidence_decision.reason_codes, [tc.expectedReason]);
  });
}

// Dimension 2: Evidence Lane & Response Modality
const laneCases = [
  { desc: 'valid matching typed_production', lane: 'typed_production', mod: 'typed', expectedTier: 'E3', expectedReason: 'INDEPENDENT_TRANSFER_QUALIFIED' },
  { desc: 'incompatible listen_recognition', lane: 'listen_recognition', mod: 'typed', expectedTier: 'NONE', expectedReason: 'UNSUPPORTED_EVALUATOR_LANE' },
  { desc: 'incompatible read_comprehension', lane: 'read_comprehension', mod: 'typed', expectedTier: 'NONE', expectedReason: 'UNSUPPORTED_EVALUATOR_LANE' },
  { desc: 'unsupported spoken_production', lane: 'spoken_production', mod: 'typed', expectedTier: 'NONE', expectedReason: 'UNSUPPORTED_EVALUATOR_IN_SPOKEN_LANE' },
  { desc: 'modality mismatch spoken on typed activity', lane: 'typed_production', mod: 'spoken', expectedTier: 'NONE', expectedReason: 'UNSUPPORTED_EVALUATOR_IN_SPOKEN_LANE' }
];
for (const tc of laneCases) {
  test(`Matrix Lane/Modality: ${tc.desc}`, () => {
    const f = reader.getFixture('ERR-F06');
    const input = makeValidE3Input(f);
    input.current_evidence_lane = tc.lane;
    input.response_modality_attempted = tc.mod;
    const res = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: input });
    assert.equal(res.evidence_decision.awarded_tier, tc.expectedTier);
    assert.deepEqual(res.evidence_decision.reason_codes, [tc.expectedReason]);
  });
}

// Dimension 3: Support Level Enums
const supportCases = [
  { desc: 'H0 unassisted', level: 'H0', expectedTier: 'E3' },
  { desc: 'H1 minimal situational', level: 'H1', expectedTier: 'E3' },
  { desc: 'H2 target cue caps at E2', level: 'H2', expectedTier: 'E2' },
  { desc: 'H3 construction scaffold caps at E2', level: 'H3', expectedTier: 'E2' },
  { desc: 'H4 reveal exposure caps at E0', level: 'H4', expectedTier: 'E0' }
];
for (const tc of supportCases) {
  test(`Matrix Support: ${tc.desc}`, () => {
    const f = reader.getFixture('ERR-F06');
    const input = makeValidE3Input(f);
    input.activity_support_level = tc.level;
    const res = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: input });
    assert.equal(res.evidence_decision.awarded_tier, tc.expectedTier);
  });
}

// Dimension 4: Familiarity Record Integrity
const familiarityCases = [
  { desc: 'omitted (undefined)', mutate: (inp) => { delete inp.familiarity_evidence; } },
  { desc: 'null', mutate: (inp) => { inp.familiarity_evidence = null; } },
  { desc: 'empty array', mutate: (inp) => { inp.familiarity_evidence = []; } },
  { desc: 'malformed bare ID', mutate: (inp) => { inp.familiarity_evidence = inp.familiarity_evidence.map(e => ({ item_id: e.item_id })); } },
  { desc: 'malformed status', mutate: (inp) => { inp.familiarity_evidence[0].status = 'INVALID_STATUS'; } },
  { desc: 'malformed source type', mutate: (inp) => { inp.familiarity_evidence[0].source_type = 'INVALID_SOURCE'; } },
  { desc: 'malformed source_event_id for PRETAUGHT_ACCEPTED', mutate: (inp) => { inp.familiarity_evidence[1].source_event_id = 'INVALID_ID'; } },
  { desc: 'missing source_path for VISIBLE_IN_NATURAL_CONTEXT', mutate: (inp) => { delete inp.familiarity_evidence[0].source_path; } },
  { desc: 'invalid source_path pointing to non-existent property', mutate: (inp) => { inp.familiarity_evidence[0].source_path = 'non_existent_property'; } }
];
for (const tc of familiarityCases) {
  test(`Matrix Familiarity: ${tc.desc} blocks award`, () => {
    const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
    const input = clone(f.input_state);
    tc.mutate(input);
    const res = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: input });
    assert.equal(res.evidence_decision.familiarity_qualified, false);
    assert.equal(res.evidence_decision.awarded_tier, 'NONE');
    assert.deepEqual(res.evidence_decision.reason_codes, ['UNSCORED_PREREQUISITE_MISSING']);
  });
}

// Dimension 5: Timestamps, Ordering & Exposure Events
const timestampCases = [
  { desc: 'missing attempt_at', mutate: (inp) => { delete inp.attempt_at; }, expTier: 'NONE', expReason: 'UNSCORED_PREREQUISITE_MISSING', famQualified: false, runOptions: { authoritativeAttemptAt: undefined } },
  { desc: 'missing prior occurred_at', mutate: (inp) => { delete inp.prior_e3_event.occurred_at; }, expTier: 'E3', expReason: 'DELAY_THRESHOLD_NOT_MET', famQualified: true },
  { desc: 'unparseable attempt_at', mutate: (inp) => { inp.attempt_at = 'not-a-date'; }, expTier: 'NONE', expReason: 'UNSCORED_PREREQUISITE_MISSING', famQualified: false },
  { desc: 'unparseable prior occurred_at', mutate: (inp) => { inp.prior_e3_event.occurred_at = 'not-a-date'; }, expTier: 'E3', expReason: 'DELAY_THRESHOLD_NOT_MET', famQualified: true },
  { desc: 'future prior relative to attempt', mutate: (inp) => {
    const t = Date.parse(inp.attempt_at);
    inp.prior_e3_event.occurred_at = new Date(t + 3600000).toISOString();
  }, expTier: 'E3', expReason: 'DELAY_THRESHOLD_NOT_MET', famQualified: true },
  { desc: 'malformed exposure event occurred_at', mutate: (inp) => {
    inp.last_answer_revealing_exposure_event = { event_id: 'EVT-REV-1', occurred_at: 'bad-date' };
  }, expTier: 'E3', expReason: 'DELAY_RESET_BY_EXPOSURE', famQualified: true },
  { desc: 'future exposure event occurred_at', mutate: (inp) => {
    const t = Date.parse(inp.attempt_at);
    inp.last_answer_revealing_exposure_event = { event_id: 'EVT-REV-1', occurred_at: new Date(t + 10000).toISOString() };
  }, expTier: 'E3', expReason: 'DELAY_RESET_BY_EXPOSURE', famQualified: true }
];
for (const tc of timestampCases) {
  test(`Matrix Timestamp/Exposure: ${tc.desc}`, () => {
    const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
    const input = clone(f.input_state);
    tc.mutate(input);
    const res = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: input }, tc.runOptions || {});
    assert.equal(res.evidence_decision.delay_qualified, false);
    if (tc.famQualified !== undefined) {
      assert.equal(res.evidence_decision.familiarity_qualified, tc.famQualified);
    }
    assert.equal(res.evidence_decision.awarded_tier, tc.expTier);
    assert.deepEqual(res.evidence_decision.reason_codes, [tc.expReason]);
  });
}

// Dimension 6: Prior Versions Compatibility
const versionCases = [
  { desc: 'omitted prior versions', mutate: (inp) => { delete inp.prior_e3_event.versions; } },
  { desc: 'null prior versions', mutate: (inp) => { inp.prior_e3_event.versions = null; } },
  { desc: 'incompatible rubric_version', mutate: (inp) => { inp.prior_e3_event.versions.rubric_version = '999.0.0'; } }
];
for (const tc of versionCases) {
  test(`Matrix Prior Version: ${tc.desc} blocks E4`, () => {
    const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
    const input = clone(f.input_state);
    tc.mutate(input);
    const res = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: input });
    assert.notEqual(res.evidence_decision.awarded_tier, 'E4');
    assert.equal(res.evidence_decision.awarded_tier, 'E3');
    assert.deepEqual(res.evidence_decision.reason_codes, ['PRIOR_E3_RUBRIC_INCOMPATIBLE']);
  });
}

// Dimension 7: Context Change Vectors
const contextChangeCases = [
  { desc: 'missing baseline vector', mutate: (inp) => { delete inp.context_change_evidence.baseline_context_vector; } },
  { desc: 'missing current vector', mutate: (inp) => { delete inp.context_change_evidence.current_context_vector; } },
  { desc: 'identical vectors (0 changes)', mutate: (inp) => { inp.context_change_evidence.current_context_vector = clone(inp.context_change_evidence.baseline_context_vector); } },
  { desc: 'only 1 dimension difference (venue)', mutate: (inp) => {
    inp.context_change_evidence.current_context_vector = clone(inp.context_change_evidence.baseline_context_vector);
    inp.context_change_evidence.current_context_vector.venue = 'airport_lounge';
  } },
  { desc: '2 differences but neither is semantic/retrieval', mutate: (inp) => {
    inp.context_change_evidence.current_context_vector = clone(inp.context_change_evidence.baseline_context_vector);
    inp.context_change_evidence.current_context_vector.venue = 'airport_lounge';
    inp.context_change_evidence.current_context_vector.interlocutor = 'hostess';
  } }
];
for (const tc of contextChangeCases) {
  test(`Matrix Context Change: ${tc.desc} caps at E2`, () => {
    const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
    const input = clone(f.input_state);
    tc.mutate(input);
    const res = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: input });
    assert.equal(res.evidence_decision.changed_context_qualified, false);
    assert.equal(res.evidence_decision.awarded_tier, 'E2');
    assert.deepEqual(res.evidence_decision.reason_codes, ['INVALID_CHANGED_DIMENSIONS_DELAY_IS_NOT_CONTEXT']);
  });
}

// --- PAIRED FAILURES ACROSS EVERY E4 FALLBACK PATH ---

console.log('\n=== PAIRED FAILURES ACROSS E4 FALLBACKS ===');

const fallbacks = [
  { name: 'Short Delay', mutate: (inp) => { inp.seconds_since_prior_e3 = 1000; const t = Date.parse(inp.attempt_at); inp.prior_e3_event.occurred_at = new Date(t - 1000000).toISOString(); } },
  { name: 'Missing Prior', mutate: (inp) => { inp.prior_e3_event = null; } },
  { name: 'Cross-Skill Prior', mutate: (inp) => { inp.prior_e3_skill_id = 'GER-SVC-REPAIR-01'; inp.prior_e3_event.skill_id = 'GER-SVC-REPAIR-01'; } },
  { name: 'Cross-Modal Prior', mutate: (inp) => { inp.prior_e3_lane = 'spoken_production'; inp.prior_e3_event.evidence_lane = 'spoken_production'; } },
  { name: 'Incompatible Rubric', mutate: (inp) => { inp.prior_e3_event.versions.rubric_version = 'incompatible'; } }
];

for (const fb of fallbacks) {
  test(`Paired Fallback: ${fb.name} + Wrong Target yields NONE / WRONG_REFERENT`, () => {
    const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
    const input = clone(f.input_state);
    fb.mutate(input);
    input.raw_input = 'Einen Kaffee, bitte.';
    delete input.matched_variant_id;
    delete input.normalized_input;

    const res = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: input });
    assert.equal(res.evidence_decision.awarded_tier, 'NONE');
    assert.deepEqual(res.evidence_decision.reason_codes, ['WRONG_REFERENT']);
  });

  test(`Paired Fallback: ${fb.name} + Identical Context Vector caps at E2`, () => {
    const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
    const input = clone(f.input_state);
    fb.mutate(input);
    input.context_change_evidence.current_context_vector = clone(input.context_change_evidence.baseline_context_vector);

    const res = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: input });
    assert.equal(res.evidence_decision.changed_context_qualified, false);
    assert.equal(res.evidence_decision.awarded_tier, 'E2');
    assert.deepEqual(res.evidence_decision.reason_codes, ['INVALID_CHANGED_DIMENSIONS_DELAY_IS_NOT_CONTEXT']);
  });

  test(`Paired Fallback: ${fb.name} + H3 Support Level caps at E2 supported production`, () => {
    const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
    const input = clone(f.input_state);
    fb.mutate(input);
    input.activity_support_level = 'H3';

    const res = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: input });
    assert.equal(res.evidence_decision.awarded_tier, 'E2');
    assert.ok(
      res.evidence_decision.reason_codes.includes('SUPPORT_LEVEL_EXCEEDS_E4_ALLOWANCE') ||
      res.evidence_decision.reason_codes.includes('SUPPORTED_PRODUCTION_H3')
    );
  });

  test(`Paired Fallback: ${fb.name} + Omitted Familiarity blocks award`, () => {
    const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
    const input = clone(f.input_state);
    fb.mutate(input);
    delete input.familiarity_evidence;

    const res = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: input });
    assert.equal(res.evidence_decision.familiarity_qualified, false);
    assert.equal(res.evidence_decision.awarded_tier, 'NONE');
    assert.deepEqual(res.evidence_decision.reason_codes, ['UNSCORED_PREREQUISITE_MISSING']);
  });
}

// --- WP-03.2R4 ACCEPTANCE BLOCKER PROBES ---

console.log('\n=== WP-03.2R4 ACCEPTANCE BLOCKER 1 PROBES (TRUST BOUNDARY & HISTORY VALIDATION) ===');

test('R4-B1-01: Absent resolver fails historical familiarity validation and awards NONE / UNSCORED_PREREQUISITE_MISSING', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = clone(f.input_state);

  const res = evaluatorWithoutLedger.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: input
  });
  assert.equal(res.evidence_decision.familiarity_qualified, false);
  assert.equal(res.evidence_decision.awarded_tier, 'NONE');
  assert.deepEqual(res.evidence_decision.reason_codes, ['UNSCORED_PREREQUISITE_MISSING']);
});

test('R4-B1-02: Empty resolver ({ eventLedger: [] }) fails historical familiarity and awards NONE / UNSCORED_PREREQUISITE_MISSING', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = clone(f.input_state);

  const res = evaluator.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: input
  }, { eventLedger: [] });
  assert.equal(res.evidence_decision.familiarity_qualified, false);
  assert.equal(res.evidence_decision.awarded_tier, 'NONE');
  assert.deepEqual(res.evidence_decision.reason_codes, ['UNSCORED_PREREQUISITE_MISSING']);
});

test('R4-B1-03: Nonexistent ID in ledger fails historical familiarity (Blocker 1 reproduction)', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = clone(f.input_state);
  for (const item of input.familiarity_evidence) {
    if (item.source_event_id) {
      item.source_event_id = 'EVT-NONEXISTENT-' + item.item_id;
    }
  }

  // 1. Without ledger
  const resNoLedger = evaluatorWithoutLedger.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: input
  });
  assert.equal(resNoLedger.evidence_decision.familiarity_qualified, false);
  assert.equal(resNoLedger.evidence_decision.awarded_tier, 'NONE');
  assert.deepEqual(resNoLedger.evidence_decision.reason_codes, ['UNSCORED_PREREQUISITE_MISSING']);

  // 2. With empty ledger
  const resEmpty = evaluator.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: input
  }, { eventLedger: [] });
  assert.equal(resEmpty.evidence_decision.familiarity_qualified, false);
  assert.equal(resEmpty.evidence_decision.awarded_tier, 'NONE');
  assert.deepEqual(resEmpty.evidence_decision.reason_codes, ['UNSCORED_PREREQUISITE_MISSING']);

  // 3. With standard ledger (nonexistent ID not present)
  const resWithLedger = evaluator.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: input
  });
  assert.equal(resWithLedger.evidence_decision.familiarity_qualified, false);
  assert.equal(resWithLedger.evidence_decision.awarded_tier, 'NONE');
  assert.deepEqual(resWithLedger.evidence_decision.reason_codes, ['UNSCORED_PREREQUISITE_MISSING']);
});

test('R4-B1-04: Wrong resolved item in ledger fails historical familiarity', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = clone(f.input_state);
  const badLedger = [
    { event_id: 'EVT-FAMILIAR-LEX-DE-004', item_id: 'LEX-DE-999', status: 'PRETAUGHT_ACCEPTED', occurred_at: '2026-09-01T09:00:00Z' },
    { event_id: 'EVT-FAMILIAR-LEX-DE-006', item_id: 'LEX-DE-006', status: 'PRETAUGHT_ACCEPTED', occurred_at: '2026-09-01T09:00:00Z' },
    { event_id: 'EVT-ERR-F19-E4-CLEAN-26H-PRIOR-E3', activity_id: 'ACT-DE-N1-E3-01', skill_id: 'GER-SVC-REQUEST-ONE-01', evidence_lane: 'typed_production', awarded_tier: 'E3', occurred_at: '2026-09-01T10:00:00Z', versions: { content_version: '2.1.0-candidate', evidence_policy_version: '1.1', rubric_id: 'RUBRIC-DE-N1-REQ-01', rubric_version: '2.1.0' } }
  ];

  const res = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: input }, { eventLedger: badLedger });
  assert.equal(res.evidence_decision.familiarity_qualified, false);
  assert.equal(res.evidence_decision.awarded_tier, 'NONE');
  assert.deepEqual(res.evidence_decision.reason_codes, ['UNSCORED_PREREQUISITE_MISSING']);
});

test('R4-B1-05: Rejected or failed status in resolved ledger event fails historical familiarity', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = clone(f.input_state);
  const badLedger = [
    { event_id: 'EVT-FAMILIAR-LEX-DE-004', item_id: 'LEX-DE-004', status: 'REJECTED', occurred_at: '2026-09-01T09:00:00Z' },
    { event_id: 'EVT-FAMILIAR-LEX-DE-006', item_id: 'LEX-DE-006', status: 'PRETAUGHT_ACCEPTED', occurred_at: '2026-09-01T09:00:00Z' },
    { event_id: 'EVT-ERR-F19-E4-CLEAN-26H-PRIOR-E3', activity_id: 'ACT-DE-N1-E3-01', skill_id: 'GER-SVC-REQUEST-ONE-01', evidence_lane: 'typed_production', awarded_tier: 'E3', occurred_at: '2026-09-01T10:00:00Z', versions: { content_version: '2.1.0-candidate', evidence_policy_version: '1.1', rubric_id: 'RUBRIC-DE-N1-REQ-01', rubric_version: '2.1.0' } }
  ];

  const res = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: input }, { eventLedger: badLedger });
  assert.equal(res.evidence_decision.familiarity_qualified, false);
  assert.equal(res.evidence_decision.awarded_tier, 'NONE');
  assert.deepEqual(res.evidence_decision.reason_codes, ['UNSCORED_PREREQUISITE_MISSING']);
});

test('R4-B1-06: Future event chronology in ledger relative to attempt fails historical familiarity', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = clone(f.input_state);
  const badLedger = [
    { event_id: 'EVT-FAMILIAR-LEX-DE-004', item_id: 'LEX-DE-004', status: 'PRETAUGHT_ACCEPTED', occurred_at: '2026-09-03T00:00:00Z' },
    { event_id: 'EVT-FAMILIAR-LEX-DE-006', item_id: 'LEX-DE-006', status: 'PRETAUGHT_ACCEPTED', occurred_at: '2026-09-01T09:00:00Z' },
    { event_id: 'EVT-ERR-F19-E4-CLEAN-26H-PRIOR-E3', activity_id: 'ACT-DE-N1-E3-01', skill_id: 'GER-SVC-REQUEST-ONE-01', evidence_lane: 'typed_production', awarded_tier: 'E3', occurred_at: '2026-09-01T10:00:00Z', versions: { content_version: '2.1.0-candidate', evidence_policy_version: '1.1', rubric_id: 'RUBRIC-DE-N1-REQ-01', rubric_version: '2.1.0' } }
  ];

  const res = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: input }, { eventLedger: badLedger });
  assert.equal(res.evidence_decision.familiarity_qualified, false);
  assert.equal(res.evidence_decision.awarded_tier, 'NONE');
  assert.deepEqual(res.evidence_decision.reason_codes, ['UNSCORED_PREREQUISITE_MISSING']);
});

test('R4-B1-07: Valid resolution backed by legitimate test evidence awards clean E4', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = clone(f.input_state);

  const res = evaluator.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: input
  });
  assert.equal(res.evidence_decision.familiarity_qualified, true);
  assert.equal(res.evidence_decision.delay_qualified, true);
  assert.equal(res.evidence_decision.version_compatibility, true);
  assert.equal(res.evidence_decision.awarded_tier, 'E4');
  assert.deepEqual(res.evidence_decision.reason_codes, ['DELAYED_RETURN_E4_QUALIFIED']);
});

test('R4-B1-08: Prior E3 record missing from ledger triggers fallback to E3', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = clone(f.input_state);
  const ledgerWithoutPrior = [
    { event_id: 'EVT-FAMILIAR-LEX-DE-004', item_id: 'LEX-DE-004', status: 'PRETAUGHT_ACCEPTED', occurred_at: '2026-09-01T09:00:00Z' },
    { event_id: 'EVT-FAMILIAR-LEX-DE-006', item_id: 'LEX-DE-006', status: 'PRETAUGHT_ACCEPTED', occurred_at: '2026-09-01T09:00:00Z' }
  ];

  const res = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: input }, { eventLedger: ledgerWithoutPrior });
  assert.equal(res.evidence_decision.awarded_tier, 'E3');
  assert.deepEqual(res.evidence_decision.reason_codes, ['MISSING_PRIOR_E3_RECORD']);
});

console.log('\n=== WP-03.2R4 ACCEPTANCE BLOCKER 2 PROBES (COMPLETE VERSION COMPATIBILITY) ===');

test('R4-B2-01: Current evidence_policy_version incompatible produces NONE / RUBRIC_VERSION_MISMATCH', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = clone(f.input_state);
  input.current_versions.evidence_policy_version = 'incompatible';

  const res = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: input });
  assert.equal(res.evidence_decision.version_compatibility, false);
  assert.equal(res.evidence_decision.awarded_tier, 'NONE');
  assert.deepEqual(res.evidence_decision.reason_codes, ['RUBRIC_VERSION_MISMATCH']);
});

test('R4-B2-02: Current content_version incompatible produces NONE / RUBRIC_VERSION_MISMATCH', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = clone(f.input_state);
  input.current_versions.content_version = 'incompatible';

  const res = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: input });
  assert.equal(res.evidence_decision.version_compatibility, false);
  assert.equal(res.evidence_decision.awarded_tier, 'NONE');
  assert.deepEqual(res.evidence_decision.reason_codes, ['RUBRIC_VERSION_MISMATCH']);
});

test('R4-B2-03: Current rubric_id incompatible produces NONE / RUBRIC_VERSION_MISMATCH', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = clone(f.input_state);
  input.current_versions.rubric_id = 'RUBRIC-INCOMPATIBLE';

  const res = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: input });
  assert.equal(res.evidence_decision.version_compatibility, false);
  assert.equal(res.evidence_decision.awarded_tier, 'NONE');
  assert.deepEqual(res.evidence_decision.reason_codes, ['RUBRIC_VERSION_MISMATCH']);
});

test('R4-B2-04: Current rubric_version incompatible produces NONE / RUBRIC_VERSION_MISMATCH', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = clone(f.input_state);
  input.current_versions.rubric_version = 'incompatible';

  const res = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: input });
  assert.equal(res.evidence_decision.version_compatibility, false);
  assert.equal(res.evidence_decision.awarded_tier, 'NONE');
  assert.deepEqual(res.evidence_decision.reason_codes, ['RUBRIC_VERSION_MISMATCH']);
});

test('R4-B2-05: Current versions null produces NONE / RUBRIC_VERSION_MISMATCH', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = clone(f.input_state);
  input.current_versions = null;

  const res = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: input });
  assert.equal(res.evidence_decision.version_compatibility, false);
  assert.equal(res.evidence_decision.awarded_tier, 'NONE');
  assert.deepEqual(res.evidence_decision.reason_codes, ['RUBRIC_VERSION_MISMATCH']);
});

test('R4-B2-06: Prior E3 content_version incompatible blocks E4 and falls back to independently valid E3', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = clone(f.input_state);
  input.prior_e3_event.versions.content_version = 'incompatible';

  const res = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: input });
  assert.equal(res.evidence_decision.awarded_tier, 'E3');
  assert.deepEqual(res.evidence_decision.reason_codes, ['PRIOR_E3_RUBRIC_INCOMPATIBLE']);

  // Paired: If context change also fails, caps at E2
  const inputNoCtx = clone(input);
  inputNoCtx.context_change_evidence.current_context_vector = clone(inputNoCtx.context_change_evidence.baseline_context_vector);
  const resNoCtx = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: inputNoCtx });
  assert.equal(resNoCtx.evidence_decision.awarded_tier, 'E2');
  assert.deepEqual(resNoCtx.evidence_decision.reason_codes, ['INVALID_CHANGED_DIMENSIONS_DELAY_IS_NOT_CONTEXT']);
});

test('R4-B2-07: Prior E3 evidence_policy_version incompatible blocks E4 and falls back to E3', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = clone(f.input_state);
  input.prior_e3_event.versions.evidence_policy_version = 'incompatible';

  const res = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: input });
  assert.equal(res.evidence_decision.awarded_tier, 'E3');
  assert.deepEqual(res.evidence_decision.reason_codes, ['PRIOR_E3_RUBRIC_INCOMPATIBLE']);
});

test('R4-B2-08: Prior E3 rubric_id incompatible blocks E4 and falls back to E3', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = clone(f.input_state);
  input.prior_e3_event.versions.rubric_id = 'RUBRIC-INCOMPATIBLE';

  const res = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: input });
  assert.equal(res.evidence_decision.awarded_tier, 'E3');
  assert.deepEqual(res.evidence_decision.reason_codes, ['PRIOR_E3_RUBRIC_INCOMPATIBLE']);
});

test('R4-B2-09: Prior E3 rubric_version incompatible blocks E4 and falls back to E3', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = clone(f.input_state);
  input.prior_e3_event.versions.rubric_version = 'incompatible';

  const res = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: input });
  assert.equal(res.evidence_decision.awarded_tier, 'E3');
  assert.deepEqual(res.evidence_decision.reason_codes, ['PRIOR_E3_RUBRIC_INCOMPATIBLE']);
});

test('R4-B2-10: Prior E3 versions null/omitted blocks E4 and falls back to E3', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = clone(f.input_state);
  input.prior_e3_event.versions = null;

  const res = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: input });
  assert.equal(res.evidence_decision.awarded_tier, 'E3');
  assert.deepEqual(res.evidence_decision.reason_codes, ['PRIOR_E3_RUBRIC_INCOMPATIBLE']);
});

console.log('\n=== IMMUTABILITY & ENGINE SAFETY PROBES ===');

test('Returned array immutability: mutating returned reason_codes, error_codes, source_event_ids does not corrupt engine', () => {
  const f = reader.getFixture('ERR-F06');
  const input1 = makeValidE3Input(f);
  const result1 = evaluator.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: input1
  });

  // Mutate arrays on the result object
  result1.attempt_evaluation.error_codes.push('MUTATED_ATTEMPT_ERROR');
  result1.evidence_decision.reason_codes.push('MUTATED_EVIDENCE_REASON');
  result1.evidence_decision.source_event_ids.push('MUTATED_EVENT_ID');

  // Evaluate again
  const result2 = evaluator.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: makeValidE3Input(f)
  });

  assert.deepEqual(result2.attempt_evaluation.error_codes, [], 'error_codes must remain pristine');
  assert.deepEqual(result2.evidence_decision.reason_codes, ['INDEPENDENT_TRANSFER_QUALIFIED'], 'reason_codes must remain pristine');
  assert.deepEqual(result2.evidence_decision.source_event_ids, ['EVT-FAMILIAR-LEX-DE-002', 'EVT-FAMILIAR-LEX-DE-004', 'EVT-FAMILIAR-LEX-DE-006'], 'source_event_ids must remain pristine');
});

console.log('\n=== WP-03.2R5 EXPLOIT & AUTHORITATIVE HISTORY PROBES (R5-01 to R5-12) ===');

test('R5-01a: Valid-looking state.eventLedger is ignored; without externally injected history no award is possible', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = clone(f.input_state);
  input.eventLedger = clone(standardTestLedger);

  const result = evaluatorWithoutLedger.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: input
  });
  assert.equal(result.evidence_decision.familiarity_qualified, false);
  assert.equal(result.evidence_decision.awarded_tier, 'NONE');
  assert.deepEqual(result.evidence_decision.reason_codes, ['UNSCORED_PREREQUISITE_MISSING']);
});

test('R5-01b: Valid-looking state.eventResolver is ignored; without externally injected history no award is possible', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = clone(f.input_state);
  input.eventResolver = (id) => standardTestLedger.find((e) => e.event_id === id) || null;

  const result = evaluatorWithoutLedger.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: input
  });
  assert.equal(result.evidence_decision.familiarity_qualified, false);
  assert.equal(result.evidence_decision.awarded_tier, 'NONE');
  assert.deepEqual(result.evidence_decision.reason_codes, ['UNSCORED_PREREQUISITE_MISSING']);
});

test('R5-02a: Externally injected valid history enables intended E3 outcome', () => {
  const f = reader.getFixture('ERR-F06');
  const input = makeValidE3Input(f);
  const result = evaluator.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: input
  });
  assert.equal(result.evidence_decision.awarded_tier, 'E3');
  assert.deepEqual(result.evidence_decision.reason_codes, ['INDEPENDENT_TRANSFER_QUALIFIED']);
});

test('R5-02b: Externally injected valid history enables intended E4 outcome', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = clone(f.input_state);
  const result = evaluator.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: input
  });
  assert.equal(result.evidence_decision.awarded_tier, 'E4');
  assert.deepEqual(result.evidence_decision.reason_codes, ['DELAYED_RETURN_E4_QUALIFIED']);
});

test('R5-03: current_versions complete tuple validation: missing, null, malformed, mismatches and fully valid tuple', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');

  // Missing object
  const inpMissing = clone(f.input_state);
  delete inpMissing.current_versions;
  const resMissing = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: inpMissing });
  assert.equal(resMissing.evidence_decision.version_compatibility, false);
  assert.equal(resMissing.evidence_decision.awarded_tier, 'NONE');
  assert.deepEqual(resMissing.evidence_decision.reason_codes, ['RUBRIC_VERSION_MISMATCH']);

  // Null object
  const inpNull = clone(f.input_state);
  inpNull.current_versions = null;
  const resNull = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: inpNull });
  assert.equal(resNull.evidence_decision.version_compatibility, false);
  assert.equal(resNull.evidence_decision.awarded_tier, 'NONE');
  assert.deepEqual(resNull.evidence_decision.reason_codes, ['RUBRIC_VERSION_MISMATCH']);

  // Non-object malformed
  const inpString = clone(f.input_state);
  inpString.current_versions = '2.1.0';
  const resString = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: inpString });
  assert.equal(resString.evidence_decision.version_compatibility, false);
  assert.equal(resString.evidence_decision.awarded_tier, 'NONE');
  assert.deepEqual(resString.evidence_decision.reason_codes, ['RUBRIC_VERSION_MISMATCH']);

  // Each missing field
  for (const field of ['content_version', 'evidence_policy_version', 'rubric_id', 'rubric_version']) {
    const inpField = clone(f.input_state);
    delete inpField.current_versions[field];
    const resField = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: inpField });
    assert.equal(resField.evidence_decision.version_compatibility, false, `Missing field ${field} must fail compatibility`);
    assert.equal(resField.evidence_decision.awarded_tier, 'NONE');
    assert.deepEqual(resField.evidence_decision.reason_codes, ['RUBRIC_VERSION_MISMATCH']);
  }

  // Each mismatched field
  for (const field of ['content_version', 'evidence_policy_version', 'rubric_id', 'rubric_version']) {
    const inpMismatch = clone(f.input_state);
    inpMismatch.current_versions[field] = 'incompatible_value';
    const resMismatch = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: inpMismatch });
    assert.equal(resMismatch.evidence_decision.version_compatibility, false, `Mismatched field ${field} must fail compatibility`);
    assert.equal(resMismatch.evidence_decision.awarded_tier, 'NONE');
    assert.deepEqual(resMismatch.evidence_decision.reason_codes, ['RUBRIC_VERSION_MISMATCH']);
  }

  // Fully valid tuple
  const inpValid = clone(f.input_state);
  const resValid = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: inpValid });
  assert.equal(resValid.evidence_decision.version_compatibility, true);
  assert.equal(resValid.evidence_decision.awarded_tier, 'E4');
});

test('R5-04: Declared prior timestamp old (26h) + resolved prior timestamp too recent (1h): no E4', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = clone(f.input_state);
  input.prior_e3_event.occurred_at = '2026-09-01T10:00:00.000Z';
  const attemptTime = Date.parse(input.attempt_at);

  const recent1h = new Date(attemptTime - 3600 * 1000).toISOString();
  const ledgerRecent = standardTestLedger.map((e) =>
    e.event_id === input.prior_e3_event.event_id ? { ...e, occurred_at: recent1h } : e
  );

  const result = evaluator.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: input
  }, { eventLedger: ledgerRecent });

  assert.equal(result.evidence_decision.delay_qualified, false, 'Delay must be calculated from authoritative resolved timestamp');
  assert.notEqual(result.evidence_decision.awarded_tier, 'E4', '1 hour elapsed must not award E4');
  assert.equal(result.evidence_decision.awarded_tier, 'E3', 'Downgrades to E3 since transfer context is qualified');
  assert.deepEqual(result.evidence_decision.reason_codes, ['DELAY_THRESHOLD_NOT_MET']);
});

test('R5-05: Declared prior timestamp recent (1h) + resolved prior timestamp old (26h): uses resolved timestamp and awards E4', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = clone(f.input_state);
  const attemptTime = Date.parse(input.attempt_at);
  input.prior_e3_event.occurred_at = new Date(attemptTime - 3600 * 1000).toISOString();

  const result = evaluator.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: input
  });

  assert.equal(result.evidence_decision.delay_qualified, true, 'Authoritative resolved timestamp must govern delay calculation');
  assert.equal(result.evidence_decision.awarded_tier, 'E4');
  assert.deepEqual(result.evidence_decision.reason_codes, ['DELAYED_RETURN_E4_QUALIFIED']);
});

test('R5-06: Resolved prior missing, invalid, or future timestamp: no E4', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = clone(f.input_state);
  const attemptTime = Date.parse(input.attempt_at);

  const ledgerMissingTime = standardTestLedger.map((e) =>
    e.event_id === input.prior_e3_event.event_id ? { ...e, occurred_at: undefined } : e
  );
  const resMissingTime = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: input }, { eventLedger: ledgerMissingTime });
  assert.equal(resMissingTime.evidence_decision.delay_qualified, false);
  assert.equal(resMissingTime.evidence_decision.awarded_tier, 'E3');
  assert.deepEqual(resMissingTime.evidence_decision.reason_codes, ['DELAY_THRESHOLD_NOT_MET']);

  const ledgerInvalidTime = standardTestLedger.map((e) =>
    e.event_id === input.prior_e3_event.event_id ? { ...e, occurred_at: 'not-a-valid-date' } : e
  );
  const resInvalidTime = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: input }, { eventLedger: ledgerInvalidTime });
  assert.equal(resInvalidTime.evidence_decision.delay_qualified, false);
  assert.equal(resInvalidTime.evidence_decision.awarded_tier, 'E3');
  assert.deepEqual(resInvalidTime.evidence_decision.reason_codes, ['DELAY_THRESHOLD_NOT_MET']);

  const futureTime = new Date(attemptTime + 3600 * 1000).toISOString();
  const ledgerFutureTime = standardTestLedger.map((e) =>
    e.event_id === input.prior_e3_event.event_id ? { ...e, occurred_at: futureTime } : e
  );
  const resFutureTime = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: input }, { eventLedger: ledgerFutureTime });
  assert.equal(resFutureTime.evidence_decision.delay_qualified, false);
  assert.equal(resFutureTime.evidence_decision.awarded_tier, 'E3');
  assert.deepEqual(resFutureTime.evidence_decision.reason_codes, ['DELAY_THRESHOLD_NOT_MET']);
});

test('R5-07: Familiarity event missing/invalid/future timestamp or lacking positive qualifying result: prerequisite fails', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = clone(f.input_state);
  const attemptTime = Date.parse(input.attempt_at);

  const ledgerMissingTime = standardTestLedger.map((e) =>
    e.event_id === 'EVT-FAMILIAR-LEX-DE-004' ? { ...e, occurred_at: undefined } : e
  );
  const resMissing = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: input }, { eventLedger: ledgerMissingTime });
  assert.equal(resMissing.evidence_decision.familiarity_qualified, false);
  assert.equal(resMissing.evidence_decision.awarded_tier, 'NONE');
  assert.deepEqual(resMissing.evidence_decision.reason_codes, ['UNSCORED_PREREQUISITE_MISSING']);

  const ledgerInvalidTime = standardTestLedger.map((e) =>
    e.event_id === 'EVT-FAMILIAR-LEX-DE-004' ? { ...e, occurred_at: 'corrupted-timestamp' } : e
  );
  const resInvalid = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: input }, { eventLedger: ledgerInvalidTime });
  assert.equal(resInvalid.evidence_decision.familiarity_qualified, false);
  assert.equal(resInvalid.evidence_decision.awarded_tier, 'NONE');
  assert.deepEqual(resInvalid.evidence_decision.reason_codes, ['UNSCORED_PREREQUISITE_MISSING']);

  const ledgerFutureTime = standardTestLedger.map((e) =>
    e.event_id === 'EVT-FAMILIAR-LEX-DE-004' ? { ...e, occurred_at: new Date(attemptTime + 3600 * 1000).toISOString() } : e
  );
  const resFuture = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: input }, { eventLedger: ledgerFutureTime });
  assert.equal(resFuture.evidence_decision.familiarity_qualified, false);
  assert.equal(resFuture.evidence_decision.awarded_tier, 'NONE');
  assert.deepEqual(resFuture.evidence_decision.reason_codes, ['UNSCORED_PREREQUISITE_MISSING']);

  const ledgerFailed = standardTestLedger.map((e) =>
    e.event_id === 'EVT-FAMILIAR-LEX-DE-004' ? { ...e, status: 'REJECTED' } : e
  );
  const resFailed = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: input }, { eventLedger: ledgerFailed });
  assert.equal(resFailed.evidence_decision.familiarity_qualified, false);
  assert.equal(resFailed.evidence_decision.awarded_tier, 'NONE');
  assert.deepEqual(resFailed.evidence_decision.reason_codes, ['UNSCORED_PREREQUISITE_MISSING']);
});

test('R5-08: State claims no reveal but trusted history reports recent reveal (15m): resets clock, blocks E4', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = clone(f.input_state);
  input.last_answer_revealing_exposure_event = null;
  input.seconds_since_last_answer_reveal = null;

  const attemptTime = Date.parse(input.attempt_at);
  const recentReveal = {
    event_id: 'EVT-TRUSTED-REVEAL-RECENT',
    occurred_at: new Date(attemptTime - 900 * 1000).toISOString()
  };

  const result = evaluator.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: input
  }, { latestAnswerRevealingExposureEvent: recentReveal });

  assert.equal(result.evidence_decision.delay_qualified, false, 'Authoritative recent reveal must reset clean delay');
  assert.notEqual(result.evidence_decision.awarded_tier, 'E4');
  assert.equal(result.evidence_decision.awarded_tier, 'E3');
  assert.deepEqual(result.evidence_decision.reason_codes, ['DELAY_RESET_BY_EXPOSURE']);
});

test('R5-09: Trusted history explicitly reports no reveal (null) and other evidence valid: clean E4 positive control', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = clone(f.input_state);

  const result = evaluator.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: input
  }, { latestAnswerRevealingExposureEvent: null });

  assert.equal(result.evidence_decision.delay_qualified, true);
  assert.equal(result.evidence_decision.awarded_tier, 'E4');
  assert.deepEqual(result.evidence_decision.reason_codes, ['DELAYED_RETURN_E4_QUALIFIED']);
});

test('R5-10: Missing authoritative latest-reveal query result (undefined): no E4', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = clone(f.input_state);

  const evalWithoutReveal = new DeterministicEvaluator(reader, { eventLedger: standardTestLedger, authoritativeAttemptAt: defaultAuthoritativeAttemptAt });
  const result = evalWithoutReveal.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: input
  });

  assert.equal(result.evidence_decision.delay_qualified, false, 'Missing authoritative reveal check must not earn E4');
  assert.notEqual(result.evidence_decision.awarded_tier, 'E4');
  assert.equal(result.evidence_decision.awarded_tier, 'E3');
  assert.deepEqual(result.evidence_decision.reason_codes, ['DELAY_THRESHOLD_NOT_MET']);
});

test('R5-11: 71,999/72,000-second boundary tests using authoritative event times', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = clone(f.input_state);
  const attemptTime = Date.parse(input.attempt_at);

  const time71999 = new Date(attemptTime - 71999 * 1000).toISOString();
  input.prior_e3_event.occurred_at = time71999;
  const ledger71999 = standardTestLedger.map((e) =>
    e.event_id === input.prior_e3_event.event_id ? { ...e, occurred_at: time71999 } : e
  );
  const res71999 = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: input }, { eventLedger: ledger71999 });
  assert.equal(res71999.evidence_decision.delay_qualified, false);
  assert.equal(res71999.evidence_decision.awarded_tier, 'E3');
  assert.deepEqual(res71999.evidence_decision.reason_codes, ['DELAY_THRESHOLD_NOT_MET']);

  const time72000 = new Date(attemptTime - 72000 * 1000).toISOString();
  input.prior_e3_event.occurred_at = time72000;
  const ledger72000 = standardTestLedger.map((e) =>
    e.event_id === input.prior_e3_event.event_id ? { ...e, occurred_at: time72000 } : e
  );
  const res72000 = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: input }, { eventLedger: ledger72000 });
  assert.equal(res72000.evidence_decision.delay_qualified, true);
  assert.equal(res72000.evidence_decision.awarded_tier, 'E4');
  assert.deepEqual(res72000.evidence_decision.reason_codes, ['DELAYED_RETURN_E4_QUALIFIED']);
});

test('R5-12: Input objects, resolved event objects and the frozen pack remain unmutated', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const inputOrig = clone(f.input_state);
  const inputCopy = clone(f.input_state);
  const ledgerCopy = clone(standardTestLedger);

  evaluator.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: inputCopy
  }, { eventLedger: ledgerCopy });

  assert.deepEqual(inputCopy, inputOrig, 'input_state must remain completely unmutated');
  assert.deepEqual(ledgerCopy, standardTestLedger, 'event ledger objects must remain completely unmutated');

  const packPath = path.resolve(__dirname, '..', 'outputs', 'living_language_atlas_wp02_german_content_pack_v2_1_candidate.json');
  const buffer = fs.readFileSync(packPath);
  const actualHash = crypto.createHash('sha256').update(buffer).digest('hex').toUpperCase();
  assert.equal(actualHash, '4F80F1FE030D05EDA87F8948E2C95571E88FD2C83BA993F11C4B2523FF6CD300');
});

console.log('\n=== WP-03.2R6 STRICT EVENT VALIDITY & CHRONOLOGY PROBES (R6-01 to R6-13) ===');

test('R6-01: missing, null, malformed and localized attempt_at cannot earn history-dependent evidence', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');

  // 1. Missing attempt_at
  const inpMissing = clone(f.input_state);
  delete inpMissing.attempt_at;
  const resMissing = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: inpMissing }, { authoritativeAttemptAt: undefined });
  assert.equal(resMissing.evidence_decision.familiarity_qualified, false);
  assert.equal(resMissing.evidence_decision.awarded_tier, 'NONE');
  assert.deepEqual(resMissing.evidence_decision.reason_codes, ['UNSCORED_PREREQUISITE_MISSING']);

  // 2. Null attempt_at
  const inpNull = clone(f.input_state);
  inpNull.attempt_at = null;
  const resNull = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: inpNull });
  assert.equal(resNull.evidence_decision.familiarity_qualified, false);
  assert.equal(resNull.evidence_decision.awarded_tier, 'NONE');
  assert.deepEqual(resNull.evidence_decision.reason_codes, ['UNSCORED_PREREQUISITE_MISSING']);

  // 3. Malformed attempt_at ('not-a-date')
  const inpMalformed = clone(f.input_state);
  inpMalformed.attempt_at = 'not-a-date';
  const resMalformed = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: inpMalformed });
  assert.equal(resMalformed.evidence_decision.familiarity_qualified, false);
  assert.equal(resMalformed.evidence_decision.awarded_tier, 'NONE');
  assert.deepEqual(resMalformed.evidence_decision.reason_codes, ['UNSCORED_PREREQUISITE_MISSING']);

  // 4. Localized string ('September 2, 2026 12:00:00 UTC')
  const inpLocalized = clone(f.input_state);
  inpLocalized.attempt_at = 'September 2, 2026 12:00:00 UTC';
  const resLocalized = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: inpLocalized });
  assert.equal(resLocalized.evidence_decision.familiarity_qualified, false);
  assert.equal(resLocalized.evidence_decision.awarded_tier, 'NONE');
  assert.deepEqual(resLocalized.evidence_decision.reason_codes, ['UNSCORED_PREREQUISITE_MISSING']);
});

test('R6-02: non-ISO but Date.parse-accepted strings are rejected by timestamp validator', () => {
  assert.equal(parseStrictUtcIsoTimestamp('September 2, 2026 12:00:00 UTC'), null);
  assert.equal(parseStrictUtcIsoTimestamp('2026/09/02 12:00:00'), null);
  assert.equal(parseStrictUtcIsoTimestamp('Wed, 02 Sep 2026 12:00:00 GMT'), null);
  assert.equal(parseStrictUtcIsoTimestamp('2026-09-02T12:00:00+02:00'), null);
  assert.equal(parseStrictUtcIsoTimestamp('2026-09-02T12:00:00-05:00'), null);
  assert.equal(parseStrictUtcIsoTimestamp('2026-09-02T12:00:00.12Z'), null);
  assert.equal(parseStrictUtcIsoTimestamp('2026-09-02T12:00:00.1234Z'), null);
  assert.equal(parseStrictUtcIsoTimestamp(''), null);
  assert.equal(parseStrictUtcIsoTimestamp(null), null);
  assert.equal(parseStrictUtcIsoTimestamp(undefined), null);
  assert.equal(parseStrictUtcIsoTimestamp(12345678), null);
});

test('R6-03: impossible calendar dates and normalization rollover are rejected', () => {
  assert.equal(parseStrictUtcIsoTimestamp('2026-02-29T12:00:00Z'), null, '2026 is non-leap year; Feb 29 must fail');
  assert.equal(parseStrictUtcIsoTimestamp('2026-02-30T12:00:00Z'), null, 'Feb 30 must fail');
  assert.equal(parseStrictUtcIsoTimestamp('2026-04-31T12:00:00Z'), null, 'April 31 must fail');
  assert.equal(parseStrictUtcIsoTimestamp('2026-06-31T12:00:00Z'), null, 'June 31 must fail');
  assert.equal(parseStrictUtcIsoTimestamp('2026-09-31T12:00:00Z'), null, 'Sept 31 must fail');
  assert.equal(parseStrictUtcIsoTimestamp('2026-11-31T12:00:00Z'), null, 'Nov 31 must fail');
  assert.equal(parseStrictUtcIsoTimestamp('2026-13-01T12:00:00Z'), null, 'Month 13 must fail');
  assert.equal(parseStrictUtcIsoTimestamp('2026-00-01T12:00:00Z'), null, 'Month 00 must fail');
  assert.equal(parseStrictUtcIsoTimestamp('2026-01-32T12:00:00Z'), null, 'Day 32 must fail');
  assert.equal(parseStrictUtcIsoTimestamp('2026-01-00T12:00:00Z'), null, 'Day 00 must fail');
  assert.equal(parseStrictUtcIsoTimestamp('2026-01-01T24:00:00Z'), null, 'Hour 24 must fail');
  assert.equal(parseStrictUtcIsoTimestamp('2026-01-01T12:60:00Z'), null, 'Minute 60 must fail');
  assert.equal(parseStrictUtcIsoTimestamp('2026-01-01T12:00:60Z'), null, 'Second 60 must fail');
});

test('R6-04: exact supported ...ssZ and ...ss.sssZ timestamps pass', () => {
  const ts1 = parseStrictUtcIsoTimestamp('2024-02-29T12:00:00Z');
  assert.ok(typeof ts1 === 'number' && !isNaN(ts1), '2024 leap year Feb 29 must parse');

  const ts2 = parseStrictUtcIsoTimestamp('2026-09-02T12:00:00Z');
  assert.ok(typeof ts2 === 'number' && !isNaN(ts2), 'standard UTC Z must parse');

  const ts3 = parseStrictUtcIsoTimestamp('2026-09-02T12:00:00.000Z');
  assert.ok(typeof ts3 === 'number' && !isNaN(ts3), 'fractional UTC Z with 3 digits must parse');

  const ts4 = parseStrictUtcIsoTimestamp('2026-09-02T12:00:00.999Z');
  assert.ok(typeof ts4 === 'number' && !isNaN(ts4), 'fractional UTC Z 999 must parse');
});

test('R6-05: historical time equal to or later than attempt fails', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = clone(f.input_state);

  // 1. Familiarity event equal to attempt time
  const ledgerEqualFam = standardTestLedger.map((e) =>
    e.event_id === 'EVT-FAMILIAR-LEX-DE-004' ? { ...e, occurred_at: input.attempt_at } : e
  );
  const resEqualFam = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: input }, { eventLedger: ledgerEqualFam });
  assert.equal(resEqualFam.evidence_decision.familiarity_qualified, false);
  assert.equal(resEqualFam.evidence_decision.awarded_tier, 'NONE');
  assert.deepEqual(resEqualFam.evidence_decision.reason_codes, ['UNSCORED_PREREQUISITE_MISSING']);

  // 2. Familiarity event later than attempt time
  const futureFam = new Date(Date.parse(input.attempt_at) + 1000).toISOString();
  const ledgerFutureFam = standardTestLedger.map((e) =>
    e.event_id === 'EVT-FAMILIAR-LEX-DE-004' ? { ...e, occurred_at: futureFam } : e
  );
  const resFutureFam = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: input }, { eventLedger: ledgerFutureFam });
  assert.equal(resFutureFam.evidence_decision.familiarity_qualified, false);
  assert.equal(resFutureFam.evidence_decision.awarded_tier, 'NONE');

  // 3. Prior E3 equal to attempt time
  const ledgerEqualPrior = standardTestLedger.map((e) =>
    e.event_id === input.prior_e3_event.event_id ? { ...e, occurred_at: input.attempt_at } : e
  );
  const inputEqualPrior = clone(input);
  inputEqualPrior.prior_e3_event.occurred_at = input.attempt_at;
  const resEqualPrior = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: inputEqualPrior }, { eventLedger: ledgerEqualPrior });
  assert.equal(resEqualPrior.evidence_decision.delay_qualified, false);
  assert.notEqual(resEqualPrior.evidence_decision.awarded_tier, 'E4');
  assert.equal(resEqualPrior.evidence_decision.awarded_tier, 'E3');
});

test('R6-06: recognition record with only source_type or only evidence_capability fails', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = clone(f.input_state);

  const targetItem = input.familiarity_evidence.find((e) => e.item_id === 'LEX-DE-004');
  targetItem.status = 'PREVIOUSLY_RECOGNIZED';
  targetItem.source_type = 'PRIOR_RECOGNITION_EVENT';

  // 1. Resolved event has ONLY source_type without status, outcome, or awarded_tier
  const ledgerSourceOnly = standardTestLedger.map((e) =>
    e.event_id === 'EVT-FAMILIAR-LEX-DE-004'
      ? { event_id: e.event_id, item_id: e.item_id, occurred_at: '2026-09-01T09:00:00Z', source_type: 'PRIOR_RECOGNITION_EVENT' }
      : e
  );
  const resSourceOnly = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: input }, { eventLedger: ledgerSourceOnly });
  assert.equal(resSourceOnly.evidence_decision.familiarity_qualified, false);
  assert.equal(resSourceOnly.evidence_decision.awarded_tier, 'NONE');
  assert.deepEqual(resSourceOnly.evidence_decision.reason_codes, ['UNSCORED_PREREQUISITE_MISSING']);

  // 2. Resolved event has ONLY evidence_capability: 'E1' without positive status/outcome
  const ledgerCapOnly = standardTestLedger.map((e) =>
    e.event_id === 'EVT-FAMILIAR-LEX-DE-004'
      ? { event_id: e.event_id, item_id: e.item_id, occurred_at: '2026-09-01T09:00:00Z', evidence_capability: 'E1' }
      : e
  );
  const resCapOnly = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: input }, { eventLedger: ledgerCapOnly });
  assert.equal(resCapOnly.evidence_decision.familiarity_qualified, false);
  assert.equal(resCapOnly.evidence_decision.awarded_tier, 'NONE');
  assert.deepEqual(resCapOnly.evidence_decision.reason_codes, ['UNSCORED_PREREQUISITE_MISSING']);
});

test('R6-07: positive recognition status/outcome or awarded E1 passes', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = clone(f.input_state);
  const targetItem = input.familiarity_evidence.find((e) => e.item_id === 'LEX-DE-004');
  targetItem.status = 'PREVIOUSLY_RECOGNIZED';
  targetItem.source_type = 'PRIOR_RECOGNITION_EVENT';

  // 1. With awarded_tier: 'E1'
  const ledgerE1 = standardTestLedger.map((e) =>
    e.event_id === 'EVT-FAMILIAR-LEX-DE-004'
      ? { event_id: e.event_id, item_id: e.item_id, occurred_at: '2026-09-01T09:00:00Z', awarded_tier: 'E1' }
      : e
  );
  const resE1 = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: input }, { eventLedger: ledgerE1 });
  assert.equal(resE1.evidence_decision.familiarity_qualified, true);
  assert.equal(resE1.evidence_decision.awarded_tier, 'E4');

  // 2. With status: 'PREVIOUSLY_RECOGNIZED'
  const ledgerRecStatus = standardTestLedger.map((e) =>
    e.event_id === 'EVT-FAMILIAR-LEX-DE-004'
      ? { event_id: e.event_id, item_id: e.item_id, occurred_at: '2026-09-01T09:00:00Z', status: 'PREVIOUSLY_RECOGNIZED' }
      : e
  );
  const resRecStatus = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: input }, { eventLedger: ledgerRecStatus });
  assert.equal(resRecStatus.evidence_decision.familiarity_qualified, true);
  assert.equal(resRecStatus.evidence_decision.awarded_tier, 'E4');

  // 3. With outcome: 'recognized'
  const ledgerOutcome = standardTestLedger.map((e) =>
    e.event_id === 'EVT-FAMILIAR-LEX-DE-004'
      ? { event_id: e.event_id, item_id: e.item_id, occurred_at: '2026-09-01T09:00:00Z', outcome: 'recognized' }
      : e
  );
  const resOutcome = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: input }, { eventLedger: ledgerOutcome });
  assert.equal(resOutcome.evidence_decision.familiarity_qualified, true);
  assert.equal(resOutcome.evidence_decision.awarded_tier, 'E4');
});

test('R6-08: LESSON_COMPLETION + FAILED and every explicit failed/rejected/incorrect/revoked prior marker fail', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = clone(f.input_state);

  // 1. event_type: LESSON_COMPLETION + status: FAILED
  const ledgerLessonFailed = standardTestLedger.map((e) =>
    e.event_id === 'EVT-FAMILIAR-LEX-DE-004'
      ? { event_id: e.event_id, item_id: e.item_id, occurred_at: '2026-09-01T09:00:00Z', event_type: 'LESSON_COMPLETION', status: 'FAILED' }
      : e
  );
  const res1 = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: input }, { eventLedger: ledgerLessonFailed });
  assert.equal(res1.evidence_decision.familiarity_qualified, false);
  assert.equal(res1.evidence_decision.awarded_tier, 'NONE');

  // 2. evaluation_outcome: 'failed'
  const ledgerEvalFailed = standardTestLedger.map((e) =>
    e.event_id === 'EVT-FAMILIAR-LEX-DE-004'
      ? { event_id: e.event_id, item_id: e.item_id, occurred_at: '2026-09-01T09:00:00Z', status: 'PRETAUGHT_ACCEPTED', evaluation_outcome: 'failed' }
      : e
  );
  const res2 = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: input }, { eventLedger: ledgerEvalFailed });
  assert.equal(res2.evidence_decision.familiarity_qualified, false);

  // 3. outcome: 'incorrect'
  const ledgerOutcomeIncorrect = standardTestLedger.map((e) =>
    e.event_id === 'EVT-FAMILIAR-LEX-DE-004'
      ? { event_id: e.event_id, item_id: e.item_id, occurred_at: '2026-09-01T09:00:00Z', status: 'PRETAUGHT_ACCEPTED', outcome: 'incorrect' }
      : e
  );
  const res3 = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: input }, { eventLedger: ledgerOutcomeIncorrect });
  assert.equal(res3.evidence_decision.familiarity_qualified, false);

  // 4. verdict: 'revoked'
  const ledgerVerdictRevoked = standardTestLedger.map((e) =>
    e.event_id === 'EVT-FAMILIAR-LEX-DE-004'
      ? { event_id: e.event_id, item_id: e.item_id, occurred_at: '2026-09-01T09:00:00Z', status: 'PRETAUGHT_ACCEPTED', verdict: 'revoked' }
      : e
  );
  const res4 = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: input }, { eventLedger: ledgerVerdictRevoked });
  assert.equal(res4.evidence_decision.familiarity_qualified, false);

  // 5. result: 'invalid'
  const ledgerResultInvalid = standardTestLedger.map((e) =>
    e.event_id === 'EVT-FAMILIAR-LEX-DE-004'
      ? { event_id: e.event_id, item_id: e.item_id, occurred_at: '2026-09-01T09:00:00Z', status: 'PRETAUGHT_ACCEPTED', result: 'invalid' }
      : e
  );
  const res5 = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: input }, { eventLedger: ledgerResultInvalid });
  assert.equal(res5.evidence_decision.familiarity_qualified, false);
});

test('R6-09: resolved prior E3 with rejected/failed outcome cannot earn E4', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = clone(f.input_state);

  // 1. status: REJECTED on resolved prior E3
  const ledgerRejected = standardTestLedger.map((e) =>
    e.event_id === input.prior_e3_event.event_id ? { ...e, status: 'REJECTED' } : e
  );
  const resRejected = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: input }, { eventLedger: ledgerRejected });
  assert.notEqual(resRejected.evidence_decision.awarded_tier, 'E4');
  assert.equal(resRejected.evidence_decision.awarded_tier, 'E3');
  assert.deepEqual(resRejected.evidence_decision.reason_codes, ['MISSING_PRIOR_E3_RECORD']);

  // 2. evaluation_outcome: failed on resolved prior E3
  const ledgerFailed = standardTestLedger.map((e) =>
    e.event_id === input.prior_e3_event.event_id ? { ...e, evaluation_outcome: 'failed' } : e
  );
  const resFailed = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: input }, { eventLedger: ledgerFailed });
  assert.notEqual(resFailed.evidence_decision.awarded_tier, 'E4');
  assert.equal(resFailed.evidence_decision.awarded_tier, 'E3');
  assert.deepEqual(resFailed.evidence_decision.reason_codes, ['MISSING_PRIOR_E3_RECORD']);

  // 3. outcome: revoked on resolved prior E3
  const ledgerRevoked = standardTestLedger.map((e) =>
    e.event_id === input.prior_e3_event.event_id ? { ...e, outcome: 'revoked' } : e
  );
  const resRevoked = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: input }, { eventLedger: ledgerRevoked });
  assert.notEqual(resRevoked.evidence_decision.awarded_tier, 'E4');
  assert.equal(resRevoked.evidence_decision.awarded_tier, 'E3');
  assert.deepEqual(resRevoked.evidence_decision.reason_codes, ['MISSING_PRIOR_E3_RECORD']);
});

test('R6-10: resolver response with missing/different event_id fails', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = clone(f.input_state);

  // 1. Familiarity resolver returns different ID
  const resolverDiffFamId = (id) => {
    const found = standardTestLedger.find((e) => e.event_id === id);
    if (!found) return null;
    return { ...found, event_id: 'EVT-DIFF-ID' };
  };
  const resDiffFam = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: input }, { eventResolver: resolverDiffFamId });
  assert.equal(resDiffFam.evidence_decision.familiarity_qualified, false);
  assert.equal(resDiffFam.evidence_decision.awarded_tier, 'NONE');
  assert.deepEqual(resDiffFam.evidence_decision.reason_codes, ['UNSCORED_PREREQUISITE_MISSING']);

  // 2. Prior E3 resolver returns different ID
  const resolverDiffPriorId = (id) => {
    const found = standardTestLedger.find((e) => e.event_id === id);
    if (!found) return null;
    if (id === input.prior_e3_event.event_id) {
      return { ...found, event_id: 'EVT-DIFF-PRIOR-ID' };
    }
    return found;
  };
  const resDiffPrior = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: input }, { eventResolver: resolverDiffPriorId });
  assert.notEqual(resDiffPrior.evidence_decision.awarded_tier, 'E4');
  assert.equal(resDiffPrior.evidence_decision.awarded_tier, 'E3');
  assert.deepEqual(resDiffPrior.evidence_decision.reason_codes, ['MISSING_PRIOR_E3_RECORD']);

  // 3. Resolver returns object with missing event_id
  const resolverMissingId = (id) => {
    const found = standardTestLedger.find((e) => e.event_id === id);
    if (!found) return null;
    const copy = { ...found };
    delete copy.event_id;
    return copy;
  };
  const resMissingId = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: input }, { eventResolver: resolverMissingId });
  assert.equal(resMissingId.evidence_decision.familiarity_qualified, false);
  assert.equal(resMissingId.evidence_decision.awarded_tier, 'NONE');
});

test('R6-11: declared/resolved duplicate contradictions fail closed and pure reference ID works', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');

  // Contradiction 1: tier mismatch
  const inpTierMismatch = clone(f.input_state);
  inpTierMismatch.prior_e3_event.awarded_tier = 'E2';
  const resTierMismatch = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: inpTierMismatch });
  assert.notEqual(resTierMismatch.evidence_decision.awarded_tier, 'E4');
  assert.equal(resTierMismatch.evidence_decision.awarded_tier, 'E3');
  assert.deepEqual(resTierMismatch.evidence_decision.reason_codes, ['MISSING_PRIOR_E3_RECORD']);

  // Contradiction 2: skill mismatch
  const inpSkillMismatch = clone(f.input_state);
  inpSkillMismatch.prior_e3_event.skill_id = 'GER-SVC-REPAIR-01';
  const resSkillMismatch = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: inpSkillMismatch });
  assert.notEqual(resSkillMismatch.evidence_decision.awarded_tier, 'E4');
  assert.equal(resSkillMismatch.evidence_decision.awarded_tier, 'E3');
  assert.deepEqual(resSkillMismatch.evidence_decision.reason_codes, ['CROSS_SKILL_PRIOR_E3_INVALID']);

  // Contradiction 3: lane mismatch
  const inpLaneMismatch = clone(f.input_state);
  inpLaneMismatch.prior_e3_event.evidence_lane = 'spoken_production';
  const resLaneMismatch = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: inpLaneMismatch });
  assert.notEqual(resLaneMismatch.evidence_decision.awarded_tier, 'E4');
  assert.equal(resLaneMismatch.evidence_decision.awarded_tier, 'E3');
  assert.deepEqual(resLaneMismatch.evidence_decision.reason_codes, ['CROSS_MODAL_PRIOR_E3_INVALID']);

  // Contradiction 4: version mismatch
  const inpVersionMismatch = clone(f.input_state);
  inpVersionMismatch.prior_e3_event.versions.content_version = 'incompatible';
  const resVersionMismatch = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: inpVersionMismatch });
  assert.notEqual(resVersionMismatch.evidence_decision.awarded_tier, 'E4');
  assert.equal(resVersionMismatch.evidence_decision.awarded_tier, 'E3');
  assert.deepEqual(resVersionMismatch.evidence_decision.reason_codes, ['PRIOR_E3_RUBRIC_INCOMPATIBLE']);

  // Positive: Pure reference ID in state without duplicated metadata passes and awards clean E4
  const inpRefOnly = clone(f.input_state);
  inpRefOnly.prior_e3_event = { event_id: 'EVT-ERR-F19-E4-CLEAN-26H-PRIOR-E3' };
  const resRefOnly = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: inpRefOnly });
  assert.equal(resRefOnly.evidence_decision.awarded_tier, 'E4');
  assert.deepEqual(resRefOnly.evidence_decision.reason_codes, ['DELAYED_RETURN_E4_QUALIFIED']);
});

test('R6-12: all original R5 exploit probes and positive E3/E4 controls remain green', () => {
  // Positive control E3
  const f06 = reader.getFixture('ERR-F06');
  const resE3 = evaluator.evaluateFixture({ activity_id: f06.activity_id, skill_id: f06.skill_id, input_state: makeValidE3Input(f06) });
  assert.equal(resE3.evidence_decision.awarded_tier, 'E3');

  // Positive control E4
  const f19 = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const resE4 = evaluator.evaluateFixture({ activity_id: f19.activity_id, skill_id: f19.skill_id, input_state: clone(f19.input_state) });
  assert.equal(resE4.evidence_decision.awarded_tier, 'E4');
});

test('R6-13: evaluator, resolved events, inputs and frozen pack remain unmutated', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const inputOrig = clone(f.input_state);
  const inputCopy = clone(f.input_state);
  const ledgerCopy = clone(standardTestLedger);

  evaluator.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: inputCopy
  }, { eventLedger: ledgerCopy });

  assert.deepEqual(inputCopy, inputOrig, 'input_state must remain completely unmutated');
  assert.deepEqual(ledgerCopy, standardTestLedger, 'event ledger objects must remain completely unmutated');

  const packPath = path.resolve(__dirname, '..', 'outputs', 'living_language_atlas_wp02_german_content_pack_v2_1_candidate.json');
  const buffer = fs.readFileSync(packPath);
  const actualHash = crypto.createHash('sha256').update(buffer).digest('hex').toUpperCase();
  assert.equal(actualHash, '4F80F1FE030D05EDA87F8948E2C95571E88FD2C83BA993F11C4B2523FF6CD300');
});

console.log('\n=== WP-03.2R7 AUTHORITATIVE CURRENT TIME & CLOSED EVENT ENUMS PROBES (R7-01 to R7-12) ===');

test('R7-01: state claims a date far in the future while authoritative attempt time is only 1 hour after prior E3: no E4', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = clone(f.input_state);
  // Prior E3 in standardTestLedger occurred at 2026-09-01T10:00:00.000Z
  // State claims far in the future (2027)
  input.attempt_at = '2027-09-02T12:00:00Z';
  // Authoritative attempt time is only 1 hour after prior E3
  const authTime1h = '2026-09-01T11:00:00.000Z';

  const res = evaluator.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: input
  }, { authoritativeAttemptAt: authTime1h });

  assert.notEqual(res.evidence_decision.awarded_tier, 'E4', 'Future state time cannot manufacture elapsed time');
  assert.equal(res.evidence_decision.delay_qualified, false);
});

test('R7-02: state time and authoritative time match with only 71,999 seconds elapsed: no E4', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = clone(f.input_state);
  // Prior E3 occurred at 2026-09-01T10:00:00.000Z
  // 72000s = 20 hours -> 2026-09-02T06:00:00.000Z
  // 71999s -> 2026-09-02T05:59:59.000Z
  const boundary71999 = '2026-09-02T05:59:59.000Z';
  input.attempt_at = boundary71999;

  const res = evaluator.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: input
  }, { authoritativeAttemptAt: boundary71999 });

  assert.equal(res.evidence_decision.delay_qualified, false, '71,999 seconds does not meet 72,000 threshold');
  assert.notEqual(res.evidence_decision.awarded_tier, 'E4');
  assert.equal(res.evidence_decision.awarded_tier, 'E3');
  assert.deepEqual(res.evidence_decision.reason_codes, ['DELAY_THRESHOLD_NOT_MET']);
});

test('R7-03: exact 72,000-second authoritative boundary: E4 positive control', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = clone(f.input_state);
  // 72000s -> 2026-09-02T06:00:00.000Z
  const boundary72000 = '2026-09-02T06:00:00.000Z';
  input.attempt_at = boundary72000;

  const res = evaluator.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: input
  }, { authoritativeAttemptAt: boundary72000 });

  assert.equal(res.evidence_decision.delay_qualified, true, '72,000 seconds exactly meets delay threshold');
  assert.equal(res.evidence_decision.awarded_tier, 'E4');
  assert.deepEqual(res.evidence_decision.reason_codes, ['DELAYED_RETURN_E4_QUALIFIED']);
});

test('R7-04: missing/null/malformed authoritative time: no history-dependent award', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = clone(f.input_state);

  // 1. Missing / undefined authoritative time
  const resMissing = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: input }, { authoritativeAttemptAt: undefined });
  assert.equal(resMissing.evidence_decision.familiarity_qualified, false);
  assert.equal(resMissing.evidence_decision.awarded_tier, 'NONE');
  assert.deepEqual(resMissing.evidence_decision.reason_codes, ['UNSCORED_PREREQUISITE_MISSING']);

  // 2. Null authoritative time
  const resNull = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: input }, { authoritativeAttemptAt: null });
  assert.equal(resNull.evidence_decision.familiarity_qualified, false);
  assert.equal(resNull.evidence_decision.awarded_tier, 'NONE');
  assert.deepEqual(resNull.evidence_decision.reason_codes, ['UNSCORED_PREREQUISITE_MISSING']);

  // 3. Malformed string
  const resMalformed = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: input }, { authoritativeAttemptAt: 'not-a-valid-date' });
  assert.equal(resMalformed.evidence_decision.familiarity_qualified, false);
  assert.equal(resMalformed.evidence_decision.awarded_tier, 'NONE');
  assert.deepEqual(resMalformed.evidence_decision.reason_codes, ['UNSCORED_PREREQUISITE_MISSING']);

  // 4. Impossible calendar date (Feb 30)
  const resImpossible = evaluator.evaluateFixture({ activity_id: f.activity_id, skill_id: f.skill_id, input_state: input }, { authoritativeAttemptAt: '2026-02-30T10:00:00Z' });
  assert.equal(resImpossible.evidence_decision.familiarity_qualified, false);
  assert.equal(resImpossible.evidence_decision.awarded_tier, 'NONE');
  assert.deepEqual(resImpossible.evidence_decision.reason_codes, ['UNSCORED_PREREQUISITE_MISSING']);
});

test('R7-05: valid authoritative time plus missing state time: state omission allowed, host authority is sufficient', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = clone(f.input_state);
  delete input.attempt_at; // Caller omitted attempt_at

  const res = evaluator.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: input
  }, { authoritativeAttemptAt: '2026-09-02T12:00:00Z' });

  assert.equal(res.evidence_decision.familiarity_qualified, true, 'Host authority verifies familiarity chronology');
  assert.equal(res.evidence_decision.delay_qualified, true, 'Host authority verifies clean delay');
  assert.equal(res.evidence_decision.awarded_tier, 'E4', 'Awards clean E4 based on host authoritative attempt time');
  assert.deepEqual(res.evidence_decision.reason_codes, ['DELAYED_RETURN_E4_QUALIFIED']);
});

test('R7-06: state time present but different from authoritative time in either direction: fail closed', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');

  // Direction A: state time is in the future relative to authoritative time
  const inputFuture = clone(f.input_state);
  inputFuture.attempt_at = '2026-09-02T13:00:00Z';
  const resFuture = evaluator.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: inputFuture
  }, { authoritativeAttemptAt: '2026-09-02T12:00:00Z' });
  assert.equal(resFuture.evidence_decision.familiarity_qualified, false);
  assert.equal(resFuture.evidence_decision.awarded_tier, 'NONE');
  assert.deepEqual(resFuture.evidence_decision.reason_codes, ['UNSCORED_PREREQUISITE_MISSING']);

  // Direction B: state time is in the past relative to authoritative time
  const inputPast = clone(f.input_state);
  inputPast.attempt_at = '2026-09-02T11:00:00Z';
  const resPast = evaluator.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: inputPast
  }, { authoritativeAttemptAt: '2026-09-02T12:00:00Z' });
  assert.equal(resPast.evidence_decision.familiarity_qualified, false);
  assert.equal(resPast.evidence_decision.awarded_tier, 'NONE');
  assert.deepEqual(resPast.evidence_decision.reason_codes, ['UNSCORED_PREREQUISITE_MISSING']);
});

test('R7-07: latest reveal newer than prior E3 resets delay using authoritative current time', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = clone(f.input_state);
  // Authoritative attempt time: 2026-09-02T12:00:00.000Z (26h after prior E3 at 2026-09-01T10:00:00.000Z)
  const authAttemptAt = '2026-09-02T12:00:00.000Z';
  input.attempt_at = authAttemptAt;

  // Authoritative latest reveal at 2026-09-02T10:00:00.000Z (24h after prior E3, but only 2h before authoritative attempt)
  const latestRevealEvent = {
    event_id: 'EVT-REVEAL-RECENT-01',
    occurred_at: '2026-09-02T10:00:00.000Z'
  };

  const res = evaluator.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: input
  }, {
    authoritativeAttemptAt: authAttemptAt,
    latestAnswerRevealingExposureEvent: latestRevealEvent
  });

  assert.equal(res.evidence_decision.delay_qualified, false, 'Delay clock must be reset by recent exposure event');
  assert.notEqual(res.evidence_decision.awarded_tier, 'E4');
  assert.equal(res.evidence_decision.awarded_tier, 'E3', 'Downgrades to E3');
  assert.deepEqual(res.evidence_decision.reason_codes, ['DELAY_RESET_BY_EXPOSURE']);
});

test('R7-08: PENDING_REVIEW, PENDING, unknown/mystery values, wrong casing outside declared enums, and mixed positive+unknown fail', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = clone(f.input_state);

  // 1. Resolved prior E3 with awarded_tier: E3 plus status: PENDING_REVIEW (Reproduction 1)
  const ledgerPriorPending = standardTestLedger.map((e) =>
    e.event_id === input.prior_e3_event.event_id
      ? { ...e, status: 'PENDING_REVIEW' }
      : e
  );
  const resPriorPending = evaluator.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: input
  }, { eventLedger: ledgerPriorPending });
  assert.equal(resPriorPending.evidence_decision.delay_qualified, false);
  assert.equal(resPriorPending.evidence_decision.awarded_tier, 'E3');
  assert.deepEqual(resPriorPending.evidence_decision.reason_codes, ['MISSING_PRIOR_E3_RECORD']);

  // 2. Familiarity with status: COMPLETED plus outcome: MYSTERY (Reproduction 2)
  const ledgerMysteryOutcome = standardTestLedger.map((e) =>
    e.event_id === 'EVT-FAMILIAR-LEX-DE-004'
      ? { ...e, status: 'COMPLETED', outcome: 'MYSTERY' }
      : e
  );
  const resMysteryOutcome = evaluator.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: input
  }, { eventLedger: ledgerMysteryOutcome });
  assert.equal(resMysteryOutcome.evidence_decision.familiarity_qualified, false);
  assert.equal(resMysteryOutcome.evidence_decision.awarded_tier, 'NONE');
  assert.deepEqual(resMysteryOutcome.evidence_decision.reason_codes, ['UNSCORED_PREREQUISITE_MISSING']);

  // 3. Familiarity with status: PENDING
  const ledgerPending = standardTestLedger.map((e) =>
    e.event_id === 'EVT-FAMILIAR-LEX-DE-004'
      ? { ...e, status: 'PENDING' }
      : e
  );
  const resPending = evaluator.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: input
  }, { eventLedger: ledgerPending });
  assert.equal(resPending.evidence_decision.familiarity_qualified, false);
  assert.equal(resPending.evidence_decision.awarded_tier, 'NONE');

  // 4. Wrong casing outside declared enums: status: 'Completed'
  const ledgerCasing = standardTestLedger.map((e) =>
    e.event_id === 'EVT-FAMILIAR-LEX-DE-004'
      ? { ...e, status: 'Completed' }
      : e
  );
  const resCasing = evaluator.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: input
  }, { eventLedger: ledgerCasing });
  assert.equal(resCasing.evidence_decision.familiarity_qualified, false);
  assert.equal(resCasing.evidence_decision.awarded_tier, 'NONE');

  // 5. Mixed positive + unknown marker field: status: PRETAUGHT_ACCEPTED plus verdict: UNKNOWN_VERDICT
  const ledgerMixed = standardTestLedger.map((e) =>
    e.event_id === 'EVT-FAMILIAR-LEX-DE-004'
      ? { ...e, status: 'PRETAUGHT_ACCEPTED', verdict: 'UNKNOWN_VERDICT' }
      : e
  );
  const resMixed = evaluator.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: input
  }, { eventLedger: ledgerMixed });
  assert.equal(resMixed.evidence_decision.familiarity_qualified, false);
  assert.equal(resMixed.evidence_decision.awarded_tier, 'NONE');
});

test('R7-09: known allowed positive values pass for prior learning, recognition and prior E3', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');

  // 1. Prior learning: status PRETAUGHT_ACCEPTED and outcome accepted_clean
  const inputLearning = clone(f.input_state);
  const ledgerLearning = standardTestLedger.map((e) =>
    e.event_id === 'EVT-FAMILIAR-LEX-DE-004'
      ? { ...e, status: 'PRETAUGHT_ACCEPTED', outcome: 'accepted_clean' }
      : e
  );
  const resLearning = evaluator.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: inputLearning
  }, { eventLedger: ledgerLearning });
  assert.equal(resLearning.evidence_decision.familiarity_qualified, true);
  assert.equal(resLearning.evidence_decision.awarded_tier, 'E4');

  // 2. Prior recognition: status PREVIOUSLY_RECOGNIZED and outcome recognized
  const inputRec = clone(f.input_state);
  const targetItem = inputRec.familiarity_evidence.find((e) => e.item_id === 'LEX-DE-004');
  targetItem.status = 'PREVIOUSLY_RECOGNIZED';
  targetItem.source_type = 'PRIOR_RECOGNITION_EVENT';
  const ledgerRec = standardTestLedger.map((e) =>
    e.event_id === 'EVT-FAMILIAR-LEX-DE-004'
      ? { event_id: e.event_id, item_id: e.item_id, occurred_at: '2026-09-01T09:00:00Z', status: 'PREVIOUSLY_RECOGNIZED', outcome: 'recognized' }
      : e
  );
  const resRec = evaluator.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: inputRec
  }, { eventLedger: ledgerRec });
  assert.equal(resRec.evidence_decision.familiarity_qualified, true);
  assert.equal(resRec.evidence_decision.awarded_tier, 'E4');

  // 3. Prior E3: awarded_tier: E3 with status: COMPLETED
  const inputE3Status = clone(f.input_state);
  const ledgerPriorE3Status = standardTestLedger.map((e) =>
    e.event_id === inputE3Status.prior_e3_event.event_id
      ? { ...e, status: 'COMPLETED' }
      : e
  );
  const resPriorE3Status = evaluator.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: inputE3Status
  }, { eventLedger: ledgerPriorE3Status });
  assert.equal(resPriorE3Status.evidence_decision.delay_qualified, true);
  assert.equal(resPriorE3Status.evidence_decision.awarded_tier, 'E4');

  // 4. Prior E3: awarded_tier: E3 with all marker fields absent
  const inputE3Absent = clone(f.input_state);
  const resPriorE3Absent = evaluator.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: inputE3Absent
  });
  assert.equal(resPriorE3Absent.evidence_decision.delay_qualified, true);
  assert.equal(resPriorE3Absent.evidence_decision.awarded_tier, 'E4');
});

test('R7-10: known negative values continue to fail', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = clone(f.input_state);

  const negativeMarkers = [
    { status: 'failed' },
    { outcome: 'rejected' },
    { evaluation_outcome: 'incorrect' },
    { result: 'invalid' },
    { verdict: 'revoked' },
    { evaluation_outcome: 'failed_critical' },
    { status: 'unscored' },
    { outcome: 'contaminated' }
  ];

  for (const neg of negativeMarkers) {
    const ledgerNeg = standardTestLedger.map((e) =>
      e.event_id === 'EVT-FAMILIAR-LEX-DE-004'
        ? { ...e, ...neg }
        : e
    );
    const res = evaluator.evaluateFixture({
      activity_id: f.activity_id,
      skill_id: f.skill_id,
      input_state: input
    }, { eventLedger: ledgerNeg });
    assert.equal(res.evidence_decision.familiarity_qualified, false, `Negative marker ${JSON.stringify(neg)} must fail`);
    assert.equal(res.evidence_decision.awarded_tier, 'NONE');
  }
});

test('R7-11: R1–R6 regressions remain green after positive fixtures receive explicit authoritative attempt time', () => {
  // Positive control E3
  const f06 = reader.getFixture('ERR-F06');
  const resE3 = evaluator.evaluateFixture({ activity_id: f06.activity_id, skill_id: f06.skill_id, input_state: makeValidE3Input(f06) });
  assert.equal(resE3.evidence_decision.awarded_tier, 'E3');

  // Positive control E4
  const f19 = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const resE4 = evaluator.evaluateFixture({ activity_id: f19.activity_id, skill_id: f19.skill_id, input_state: clone(f19.input_state) });
  assert.equal(resE4.evidence_decision.awarded_tier, 'E4');
});

test('R7-12: all inputs/options/resolved objects and the frozen pack remain unmutated', () => {
  const f = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const inputOrig = clone(f.input_state);
  const inputCopy = clone(f.input_state);
  const ledgerCopy = clone(standardTestLedger);
  const options = {
    eventLedger: ledgerCopy,
    authoritativeAttemptAt: defaultAuthoritativeAttemptAt,
    latestAnswerRevealingExposureEvent: null
  };
  const optionsCopy = clone(options);

  evaluator.evaluateFixture({
    activity_id: f.activity_id,
    skill_id: f.skill_id,
    input_state: inputCopy
  }, options);

  assert.deepEqual(inputCopy, inputOrig, 'input_state must remain completely unmutated');
  assert.deepEqual(ledgerCopy, standardTestLedger, 'event ledger objects must remain completely unmutated');
  assert.deepEqual(options, optionsCopy, 'options object must remain completely unmutated');

  const packPath = path.resolve(__dirname, '..', 'outputs', 'living_language_atlas_wp02_german_content_pack_v2_1_candidate.json');
  const buffer = fs.readFileSync(packPath);
  const actualHash = crypto.createHash('sha256').update(buffer).digest('hex').toUpperCase();
  assert.equal(actualHash, '4F80F1FE030D05EDA87F8948E2C95571E88FD2C83BA993F11C4B2523FF6CD300');
});

console.log('\n=== CANONICAL ASSET INTEGRITY PROBE ===');

test('Candidate pack SHA-256 remains byte-for-byte frozen', () => {
  const packPath = path.resolve(__dirname, '..', 'outputs', 'living_language_atlas_wp02_german_content_pack_v2_1_candidate.json');
  const buffer = fs.readFileSync(packPath);
  const actualHash = crypto.createHash('sha256').update(buffer).digest('hex').toUpperCase();
  const expectedHash = '4F80F1FE030D05EDA87F8948E2C95571E88FD2C83BA993F11C4B2523FF6CD300';
  assert.equal(actualHash, expectedHash, 'Canonical candidate pack must not be modified');
});

console.log('\n=== ALL REGRESSION & ACCEPTANCE PROBES PASSED ===');

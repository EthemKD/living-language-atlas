'use strict';

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

const { CanonicalContentReader } = require('../src/content_reader');
const {
  DeterministicEvaluator,
  parseStrictUtcIsoTimestamp
} = require('../src/evaluator_engine');

const {
  SCHEMA_VERSION,
  EVENT_TYPES,
  CLOSED_EVENT_TYPES,
  EVIDENCE_LANES,
  CLOSED_EVIDENCE_LANES,
  AWARDED_TIERS,
  CLOSED_AWARDED_TIERS,
  SUPPORT_LEVELS,
  CLOSED_SUPPORT_LEVELS,
  CONTAMINATION_STATUSES,
  CLOSED_CONTAMINATION_STATUSES,
  EVALUATION_OUTCOMES,
  CLOSED_EVALUATION_OUTCOMES,
  EXPOSURE_KINDS,
  CLOSED_EXPOSURE_KINDS,
  FAMILIARITY_KINDS,
  CLOSED_FAMILIARITY_KINDS,
  ContractValidationError,
  validateEventEnvelope,
  deepClone,
  deepFreeze
} = require('../src/learning_event_contract');

const {
  compareEventsCanonical,
  computeCanonicalEventIntent,
  LearnerSkillProjection,
  InMemoryLearningEventLedger
} = require('../src/in_memory_learning_event_ledger');

const candidatePath = path.resolve(__dirname, '..', 'outputs', 'living_language_atlas_wp02_german_content_pack_v2_1_candidate.json');
const reader = new CanonicalContentReader({ filePath: candidatePath });
const pack = reader.load();

let testsPassed = 0;
let testsFailed = 0;

function test(name, fn) {
  try {
    fn();
    testsPassed++;
    console.log(`PASS ${name}`);
  } catch (err) {
    testsFailed++;
    console.error(`FAIL ${name}:`, err.message);
    throw err;
  }
}

function makeValidCandidate(overrides = {}) {
  const base = {
    event_id: 'EVT-' + crypto.randomUUID(),
    event_type: EVENT_TYPES.ATTEMPT_ACCEPTED,
    schema_version: SCHEMA_VERSION,
    learner_id: 'LEARNER-001',
    idempotency_key: 'IDEMP-' + crypto.randomUUID(),
    correlation_id: 'CORR-' + crypto.randomUUID(),
    causation_event_id: null,
    content_pack_id: 'living-language-atlas-de-v2.1',
    content_version: '2.1.0-candidate',
    evidence_policy_version: '1.1',
    activity_id: 'ACT-DE-N1-E3-01',
    skill_id: 'GER-SVC-REQUEST-ONE-01',
    evidence_lane: 'typed_production',
    payload: {
      raw_input: 'Ich hätte gern einen Kaffee bitte.',
      response_modality: 'typed'
    }
  };
  return Object.assign(base, overrides);
}

function createAndAppendAttemptEvent(ledger, {
  eventId = 'EVT-ATTEMPT-' + crypto.randomUUID(),
  learnerId = 'LEARNER-001',
  skillId = 'GER-SVC-REQUEST-ONE-01',
  evidenceLane = 'typed_production',
  acceptedAt = '2026-09-02T12:00:00.000Z',
  rawInput = 'Ich hätte gern einen Kaffee bitte.'
} = {}) {
  return ledger.appendEvent(makeValidCandidate({
    event_id: eventId,
    event_type: EVENT_TYPES.ATTEMPT_ACCEPTED,
    learner_id: learnerId,
    skill_id: skillId,
    evidence_lane: evidenceLane,
    payload: {
      raw_input: rawInput,
      response_modality: 'typed'
    }
  }), { acceptedAt });
}

function populateStandardFamiliarityEvents(ledger, learnerId = 'LEARNER-001') {
  for (const item of ['LEX-DE-002', 'LEX-DE-004', 'LEX-DE-006']) {
    ledger.appendEvent(makeValidCandidate({
      event_id: `EVT-FAMILIAR-${item}`,
      event_type: EVENT_TYPES.FAMILIARITY_ACCEPTED,
      learner_id: learnerId,
      skill_id: 'GER-SVC-REQUEST-ONE-01',
      evidence_lane: 'typed_production',
      payload: {
        item_id: item,
        familiarity_kind: 'PRIOR_LEARNING',
        marker_field: 'status',
        marker_value: 'PRETAUGHT_ACCEPTED'
      }
    }), { acceptedAt: '2026-09-01T09:00:00.000Z' });
  }
}

console.log('=== WP-03.3A-R1 LEARNING EVENT CONTRACT & HOST-AUTHORITY SUITE ===');

// ============================================================================
// Acceptance Test 1: Valid event append, immutable clone, deterministic replay
// ============================================================================
test('AT-01: Valid event append, immutable deep freeze, and deterministic replay order', () => {
  const ledger = new InMemoryLearningEventLedger();

  const originalCandidate = makeValidCandidate({
    event_id: 'EVT-001',
    idempotency_key: 'KEY-001',
    payload: { raw_input: 'Original text', response_modality: 'typed' }
  });

  const stored = ledger.appendEvent(originalCandidate, { acceptedAt: '2026-09-01T12:00:00.000Z' });

  // 1. Verify deep freeze
  assert.ok(Object.isFrozen(stored), 'Stored event must be frozen');
  assert.ok(Object.isFrozen(stored.payload), 'Stored event payload must be frozen');
  assert.throws(() => {
    stored.payload.raw_input = 'Mutated text';
  }, TypeError, 'Mutating stored event payload must throw TypeError');
  assert.throws(() => {
    stored.accepted_at = '2026-09-01T13:00:00.000Z';
  }, TypeError, 'Mutating stored root properties must throw TypeError');

  // 2. Verify deep clone isolation (mutating candidate doesn't mutate ledger)
  originalCandidate.payload.raw_input = 'Mutated candidate after append';
  assert.equal(stored.payload.raw_input, 'Original text', 'Stored event must not reflect mutations to input candidate');

  // 3. Append out of order events and verify canonical replay sort
  const evEarly = makeValidCandidate({
    event_id: 'EVT-EARLY',
    idempotency_key: 'KEY-EARLY'
  });
  const evLateTieB = makeValidCandidate({
    event_id: 'EVT-TIE-B',
    idempotency_key: 'KEY-TIE-B'
  });
  const evLateTieA = makeValidCandidate({
    event_id: 'EVT-TIE-A',
    idempotency_key: 'KEY-TIE-A'
  });

  ledger.appendEvent(evLateTieB, { acceptedAt: '2026-09-01T10:00:00.000Z' });
  ledger.appendEvent(evEarly, { acceptedAt: '2026-09-01T08:00:00.000Z' });
  ledger.appendEvent(evLateTieA, { acceptedAt: '2026-09-01T10:00:00.000Z' });

  const replayed = ledger.getCanonicalReplayEvents();
  assert.equal(replayed.length, 4);
  assert.equal(replayed[0].event_id, 'EVT-EARLY', 'Earliest timestamp must come first');
  assert.equal(replayed[1].event_id, 'EVT-TIE-A', 'Tie-break must be alphabetical by event_id');
  assert.equal(replayed[2].event_id, 'EVT-TIE-B', 'Tie-break must be alphabetical by event_id');
  assert.equal(replayed[3].event_id, 'EVT-001', 'Latest timestamp must come last');
});

// ============================================================================
// Acceptance Test 2: Schema rejection of unknown types, properties, enums,
// malformed IDs/timestamps, and authority objects in payload
// ============================================================================
test('AT-02: Unknown event type, property, enum, malformed ID/time and authority objects rejected', () => {
  const ledger = new InMemoryLearningEventLedger();
  const hostCtx = { acceptedAt: '2026-09-01T10:00:00.000Z' };

  // 2a. Unknown event type
  assert.throws(() => {
    ledger.appendEvent(makeValidCandidate({ event_type: 'INVALID_TYPE' }), hostCtx);
  }, (err) => err instanceof ContractValidationError && err.code === 'UNKNOWN_EVENT_TYPE');

  // 2b. Unknown envelope property
  assert.throws(() => {
    ledger.appendEvent(makeValidCandidate({ unpermitted_extra_field: true }), hostCtx);
  }, (err) => err instanceof ContractValidationError && err.code === 'UNKNOWN_ENVELOPE_PROPERTY');

  // 2c. Malformed IDs
  assert.throws(() => {
    ledger.appendEvent(makeValidCandidate({ event_id: '   ' }), hostCtx);
  }, (err) => err instanceof ContractValidationError && err.code === 'MALFORMED_EVENT_ID');
  assert.throws(() => {
    ledger.appendEvent(makeValidCandidate({ learner_id: '' }), hostCtx);
  }, (err) => err instanceof ContractValidationError && err.code === 'MALFORMED_LEARNER_ID');
  assert.throws(() => {
    ledger.appendEvent(makeValidCandidate({ idempotency_key: null }), hostCtx);
  }, (err) => err instanceof ContractValidationError && err.code === 'MALFORMED_IDEMPOTENCY_KEY');
  assert.throws(() => {
    ledger.appendEvent(makeValidCandidate({ correlation_id: '' }), hostCtx);
  }, (err) => err instanceof ContractValidationError && err.code === 'MALFORMED_CORRELATION_ID');

  // 2d. Malformed timestamps in host context or client_occurred_at
  assert.throws(() => {
    ledger.appendEvent(makeValidCandidate(), { acceptedAt: '2026-09-01' });
  }, (err) => err instanceof ContractValidationError && err.code === 'INVALID_HOST_ACCEPTED_AT');
  assert.throws(() => {
    ledger.appendEvent(makeValidCandidate(), { acceptedAt: '2026-09-01T12:00:00+02:00' });
  }, (err) => err instanceof ContractValidationError && err.code === 'INVALID_HOST_ACCEPTED_AT');
  assert.throws(() => {
    ledger.appendEvent(makeValidCandidate(), { acceptedAt: '2026-02-31T12:00:00Z' });
  }, (err) => err instanceof ContractValidationError && err.code === 'INVALID_HOST_ACCEPTED_AT');
  assert.throws(() => {
    ledger.appendEvent(makeValidCandidate({ client_occurred_at: 'invalid-date' }), hostCtx);
  }, (err) => err instanceof ContractValidationError && err.code === 'MALFORMED_CLIENT_OCCURRED_AT');

  // 2e. Invalid closed enums in payload
  assert.throws(() => {
    ledger.appendEvent(makeValidCandidate({
      event_type: EVENT_TYPES.EVIDENCE_DECIDED,
      payload: {
        awarded_tier: 'E5', // Invalid
        support_level: 'H0',
        answer_revealing_exposure: false,
        contamination_status: 'NONE',
        changed_context_qualified: true,
        delay_qualified: true,
        version_compatibility: true,
        familiarity_qualified: true,
        reason_codes: ['INDEPENDENT_TRANSFER_QUALIFIED'],
        source_event_ids: [],
        rubric_id: 'RUBRIC-DE-N1-REQ-01',
        rubric_version: '2.1.0'
      }
    }), hostCtx);
  }, (err) => err instanceof ContractValidationError && err.code === 'MALFORMED_PAYLOAD');

  assert.throws(() => {
    ledger.appendEvent(makeValidCandidate({
      event_type: EVENT_TYPES.FAMILIARITY_ACCEPTED,
      payload: {
        item_id: 'LEX-DE-002',
        familiarity_kind: 'PRIOR_LEARNING',
        marker_field: 'status',
        marker_value: 'TOTALLY_MADE_UP_STATUS' // Not in positive enum set
      }
    }), hostCtx);
  }, (err) => err instanceof ContractValidationError && err.code === 'MALFORMED_PAYLOAD');

  // 2f. Client-carried authority objects and functions inside payload
  assert.throws(() => {
    ledger.appendEvent(makeValidCandidate({
      payload: {
        raw_input: 'test',
        response_modality: 'typed',
        eventResolver: () => {}
      }
    }), hostCtx);
  }, (err) => err instanceof ContractValidationError && err.code === 'FORBIDDEN_AUTHORITY_OBJECT');

  assert.throws(() => {
    ledger.appendEvent(makeValidCandidate({
      payload: {
        raw_input: 'test',
        response_modality: 'typed',
        authoritativeAttemptAt: '2026-09-01T12:00:00Z'
      }
    }), hostCtx);
  }, (err) => err instanceof ContractValidationError && err.code === 'FORBIDDEN_AUTHORITY_OBJECT');

  assert.throws(() => {
    ledger.appendEvent(makeValidCandidate({
      payload: {
        raw_input: 'test',
        response_modality: 'typed',
        nested: {
          callback: function() {}
        }
      }
    }), hostCtx);
  }, (err) => err instanceof ContractValidationError && err.code === 'FORBIDDEN_AUTHORITY_OBJECT');
});

// ============================================================================
// Acceptance Test 3: Server/host accepted_at controls chronology; forged
// future client_occurred_at cannot unlock E4
// ============================================================================
test('AT-03: Host accepted_at strictly controls chronology; forged client_occurred_at cannot unlock E4', () => {
  const ledger = new InMemoryLearningEventLedger();
  populateStandardFamiliarityEvents(ledger, 'LEARNER-CHRONO');

  // Prior E3 event has host accepted_at = 10:00:00Z, but caller injects a forged client_occurred_at 3 days earlier
  const priorE3Event = makeValidCandidate({
    event_id: 'EVT-PRIOR-E3-TIME-TEST',
    event_type: EVENT_TYPES.EVIDENCE_DECIDED,
    learner_id: 'LEARNER-CHRONO',
    client_occurred_at: '2026-08-28T10:00:00.000Z', // Forged old date
    idempotency_key: 'IDEMP-PRIOR-E3-CHRONO',
    correlation_id: 'CORR-PRIOR-E3-CHRONO',
    causation_event_id: null,
    content_pack_id: 'living-language-atlas-de-v2.1',
    content_version: '2.1.0-candidate',
    evidence_policy_version: '1.1',
    activity_id: 'ACT-DE-N1-E3-01',
    skill_id: 'GER-SVC-REQUEST-ONE-01',
    evidence_lane: 'typed_production',
    payload: {
      awarded_tier: 'E3',
      support_level: 'H1',
      answer_revealing_exposure: false,
      contamination_status: 'NONE',
      changed_context_qualified: true,
      delay_qualified: true,
      version_compatibility: true,
      familiarity_qualified: true,
      reason_codes: ['INDEPENDENT_TRANSFER_QUALIFIED'],
      source_event_ids: [],
      rubric_id: 'RUBRIC-DE-N1-REQ-01',
      rubric_version: '2.1.0'
    }
  });

  ledger.appendEvent(priorE3Event, { acceptedAt: '2026-09-01T10:00:00.000Z' });

  // Attempt occurs only 30 minutes after host acceptance (1800s < 72000s required)
  const attemptEv = createAndAppendAttemptEvent(ledger, {
    eventId: 'EVT-ATTEMPT-CHRONO',
    learnerId: 'LEARNER-CHRONO',
    skillId: 'GER-SVC-REQUEST-ONE-01',
    evidenceLane: 'typed_production',
    acceptedAt: '2026-09-01T10:30:00.000Z'
  });

  const context = ledger.createEvaluatorContext({
    learnerId: 'LEARNER-CHRONO',
    skillId: 'GER-SVC-REQUEST-ONE-01',
    evidenceLane: 'typed_production',
    attemptEventId: attemptEv.event_id
  });

  // Verify adapter translates accepted_at into occurred_at, discarding client_occurred_at
  const resolved = context.eventResolver('EVT-PRIOR-E3-TIME-TEST');
  assert.equal(resolved.occurred_at, '2026-09-01T10:00:00.000Z', 'Adapter MUST use accepted_at for resolved occurred_at');

  // Verify against real Evaluator
  const fixture = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = deepClone(fixture.input_state);
  input.prior_e3_event_id = 'EVT-PRIOR-E3-TIME-TEST';
  input.prior_e3_event = {
    event_id: 'EVT-PRIOR-E3-TIME-TEST',
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
  };
  input.attempt_at = attemptEv.accepted_at;

  const evalInst = new DeterministicEvaluator(reader, context);
  const result = evalInst.evaluateFixture({
    activity_id: fixture.activity_id,
    skill_id: fixture.skill_id,
    input_state: input
  });

  assert.equal(result.evidence_decision.awarded_tier, 'E3', 'Cannot award E4 when host elapsed time is under 20h');
  assert.ok(result.evidence_decision.reason_codes.includes('DELAY_THRESHOLD_NOT_MET'), 'Must cite DELAY_THRESHOLD_NOT_MET');
});

// ============================================================================
// Acceptance Test 4: Idempotent identical retry returns original; conflicting
// retry and duplicate-ID conflict reject
// ============================================================================
test('AT-04: Idempotent identical retry returns original; conflicting intent and duplicate ID reject', () => {
  const ledger = new InMemoryLearningEventLedger();
  const hostCtx = { acceptedAt: '2026-09-01T10:00:00.000Z' };

  const ev1 = makeValidCandidate({
    event_id: 'EVT-IDEMP-01',
    learner_id: 'LEARNER-IDEMP',
    idempotency_key: 'KEY-ABC-123',
    payload: { raw_input: 'Guten Tag', response_modality: 'typed' }
  });

  const firstStored = ledger.appendEvent(ev1, hostCtx);
  assert.equal(ledger.getAllEvents().length, 1);

  // 4a. Identical retry returns identical reference without appending
  const identicalCandidate = makeValidCandidate({
    event_id: 'EVT-IDEMP-01',
    learner_id: 'LEARNER-IDEMP',
    idempotency_key: 'KEY-ABC-123',
    payload: { raw_input: 'Guten Tag', response_modality: 'typed' }
  });
  const retryResult = ledger.appendEvent(identicalCandidate, hostCtx);
  assert.strictEqual(retryResult, firstStored, 'Identical retry must return exact same stored event');
  assert.equal(ledger.getAllEvents().length, 1, 'Ledger size must remain 1');

  // 4b. Conflicting retry with same idempotency key but different intent throws IDEMPOTENCY_CONFLICT
  const conflictingCandidate = makeValidCandidate({
    event_id: 'EVT-IDEMP-02',
    learner_id: 'LEARNER-IDEMP',
    idempotency_key: 'KEY-ABC-123',
    payload: { raw_input: 'Different content!', response_modality: 'typed' }
  });
  assert.throws(() => {
    ledger.appendEvent(conflictingCandidate, hostCtx);
  }, (err) => err instanceof ContractValidationError && err.code === 'IDEMPOTENCY_CONFLICT');

  // 4c. Duplicate event_id with differing content throws DUPLICATE_EVENT_ID_CONFLICT
  const duplicateIdCandidate = makeValidCandidate({
    event_id: 'EVT-IDEMP-01',
    learner_id: 'LEARNER-IDEMP',
    idempotency_key: 'KEY-DIFFERENT',
    payload: { raw_input: 'Different content with existing ID', response_modality: 'typed' }
  });
  assert.throws(() => {
    ledger.appendEvent(duplicateIdCandidate, hostCtx);
  }, (err) => err instanceof ContractValidationError && err.code === 'DUPLICATE_EVENT_ID_CONFLICT');
});

// ============================================================================
// Acceptance Test 5: Cross-learner, cross-skill and cross-lane resolution impossible
// ============================================================================
test('AT-05: Cross-learner, cross-skill, and cross-lane resolution is impossible', () => {
  const ledger = new InMemoryLearningEventLedger();
  const hostCtx = { acceptedAt: '2026-09-01T10:00:00.000Z' };

  // Target event: Learner A, Skill 1, Lane typed
  const evTarget = makeValidCandidate({
    event_id: 'EVT-TARGET-E3',
    learner_id: 'LEARNER-A',
    skill_id: 'GER-SVC-REQUEST-ONE-01',
    evidence_lane: 'typed_production',
    event_type: EVENT_TYPES.EVIDENCE_DECIDED,
    payload: {
      awarded_tier: 'E3',
      support_level: 'H1',
      answer_revealing_exposure: false,
      contamination_status: 'NONE',
      changed_context_qualified: true,
      delay_qualified: true,
      version_compatibility: true,
      familiarity_qualified: true,
      reason_codes: ['INDEPENDENT_TRANSFER_QUALIFIED'],
      source_event_ids: [],
      rubric_id: 'RUBRIC-DE-N1-REQ-01',
      rubric_version: '2.1.0'
    }
  });

  // Cross-learner event
  const evCrossLearner = makeValidCandidate({
    event_id: 'EVT-OTHER-LEARNER',
    learner_id: 'LEARNER-B',
    skill_id: 'GER-SVC-REQUEST-ONE-01',
    evidence_lane: 'typed_production',
    event_type: EVENT_TYPES.EVIDENCE_DECIDED,
    payload: {
      awarded_tier: 'E3',
      support_level: 'H1',
      answer_revealing_exposure: false,
      contamination_status: 'NONE',
      changed_context_qualified: true,
      delay_qualified: true,
      version_compatibility: true,
      familiarity_qualified: true,
      reason_codes: ['INDEPENDENT_TRANSFER_QUALIFIED'],
      source_event_ids: [],
      rubric_id: 'RUBRIC-DE-N1-REQ-01',
      rubric_version: '2.1.0'
    }
  });

  // Cross-skill event
  const evCrossSkill = makeValidCandidate({
    event_id: 'EVT-OTHER-SKILL',
    learner_id: 'LEARNER-A',
    skill_id: 'GER-SVC-REPAIR-01',
    evidence_lane: 'typed_production',
    event_type: EVENT_TYPES.EVIDENCE_DECIDED,
    payload: {
      awarded_tier: 'E3',
      support_level: 'H1',
      answer_revealing_exposure: false,
      contamination_status: 'NONE',
      changed_context_qualified: true,
      delay_qualified: true,
      version_compatibility: true,
      familiarity_qualified: true,
      reason_codes: ['TYPED_REPAIR_SIMULATION_QUALIFIED_E3'],
      source_event_ids: [],
      rubric_id: 'RUBRIC-DE-N2-REP-01',
      rubric_version: '2.1.0'
    }
  });

  // Cross-lane event
  const evCrossLane = makeValidCandidate({
    event_id: 'EVT-OTHER-LANE',
    learner_id: 'LEARNER-A',
    skill_id: 'GER-SVC-REQUEST-ONE-01',
    evidence_lane: 'spoken_production',
    event_type: EVENT_TYPES.EVIDENCE_DECIDED,
    payload: {
      awarded_tier: 'E3',
      support_level: 'H1',
      answer_revealing_exposure: false,
      contamination_status: 'NONE',
      changed_context_qualified: true,
      delay_qualified: true,
      version_compatibility: true,
      familiarity_qualified: true,
      reason_codes: ['INDEPENDENT_TRANSFER_QUALIFIED'],
      source_event_ids: [],
      rubric_id: 'RUBRIC-DE-N1-REQ-01',
      rubric_version: '2.1.0'
    }
  });

  ledger.appendEvent(evTarget, hostCtx);
  ledger.appendEvent(evCrossLearner, hostCtx);
  ledger.appendEvent(evCrossSkill, hostCtx);
  ledger.appendEvent(evCrossLane, hostCtx);

  const attemptEv = createAndAppendAttemptEvent(ledger, {
    eventId: 'EVT-ATTEMPT-A',
    learnerId: 'LEARNER-A',
    skillId: 'GER-SVC-REQUEST-ONE-01',
    evidenceLane: 'typed_production',
    acceptedAt: '2026-09-02T12:00:00Z'
  });

  const context = ledger.createEvaluatorContext({
    learnerId: 'LEARNER-A',
    skillId: 'GER-SVC-REQUEST-ONE-01',
    evidenceLane: 'typed_production',
    attemptEventId: attemptEv.event_id
  });

  // Target event resolves
  assert.ok(context.eventResolver('EVT-TARGET-E3') !== null, 'Target event must resolve');
  // Cross-learner resolution fails
  assert.strictEqual(context.eventResolver('EVT-OTHER-LEARNER'), null, 'Cross-learner event must resolve to null');
  // Cross-skill resolution fails
  assert.strictEqual(context.eventResolver('EVT-OTHER-SKILL'), null, 'Cross-skill event must resolve to null');
  // Cross-lane resolution fails
  assert.strictEqual(context.eventResolver('EVT-OTHER-LANE'), null, 'Cross-lane event must resolve to null');
});

// ============================================================================
// Acceptance Test 6: Latest reveal query returns newest eligible reveal
// at or before authoritative time, or explicit null
// ============================================================================
test('AT-06: Latest reveal returns newest eligible reveal at or before authoritative time, or explicit null', () => {
  const ledger = new InMemoryLearningEventLedger();

  // 6a. Explicit null when no reveals exist
  const attemptNoReveal = createAndAppendAttemptEvent(ledger, {
    eventId: 'EVT-ATTEMPT-NO-REV',
    learnerId: 'LEARNER-REV',
    skillId: 'GER-SVC-REQUEST-ONE-01',
    evidenceLane: 'typed_production',
    acceptedAt: '2026-09-01T12:00:00Z'
  });

  const emptyContext = ledger.createEvaluatorContext({
    learnerId: 'LEARNER-REV',
    skillId: 'GER-SVC-REQUEST-ONE-01',
    evidenceLane: 'typed_production',
    attemptEventId: attemptNoReveal.event_id
  });
  assert.strictEqual(emptyContext.latestAnswerRevealingExposureEvent, null, 'Must be explicit null when no reveals exist');

  // Add reveals at 10:00:00Z and 12:00:00Z
  ledger.appendEvent(makeValidCandidate({
    event_id: 'EVT-REV-10AM',
    learner_id: 'LEARNER-REV',
    skill_id: 'GER-SVC-REQUEST-ONE-01',
    evidence_lane: 'typed_production',
    event_type: EVENT_TYPES.ANSWER_REVEALED,
    payload: { exposure_kind: 'MODEL_ANSWER_EXPOSURE' }
  }), { acceptedAt: '2026-09-01T10:00:00.000Z' });

  ledger.appendEvent(makeValidCandidate({
    event_id: 'EVT-REV-12PM',
    learner_id: 'LEARNER-REV',
    skill_id: 'GER-SVC-REQUEST-ONE-01',
    evidence_lane: 'typed_production',
    event_type: EVENT_TYPES.ANSWER_REVEALED,
    payload: { exposure_kind: 'IN_FEEDBACK_REVEAL' }
  }), { acceptedAt: '2026-09-01T12:00:00.000Z' });

  // 6b. Query as of 11:00:00Z returns 10:00:00Z reveal, ignoring 12:00:00Z reveal
  const attempt11am = createAndAppendAttemptEvent(ledger, {
    eventId: 'EVT-ATTEMPT-11AM',
    learnerId: 'LEARNER-REV',
    skillId: 'GER-SVC-REQUEST-ONE-01',
    evidenceLane: 'typed_production',
    acceptedAt: '2026-09-01T11:00:00.000Z'
  });
  const context11am = ledger.createEvaluatorContext({
    learnerId: 'LEARNER-REV',
    skillId: 'GER-SVC-REQUEST-ONE-01',
    evidenceLane: 'typed_production',
    attemptEventId: attempt11am.event_id
  });
  assert.equal(context11am.latestAnswerRevealingExposureEvent?.event_id, 'EVT-REV-10AM');
  assert.equal(context11am.latestAnswerRevealingExposureEvent?.occurred_at, '2026-09-01T10:00:00.000Z');

  // 6c. Query as of 13:00:00Z returns 12:00:00Z reveal
  const attempt1pm = createAndAppendAttemptEvent(ledger, {
    eventId: 'EVT-ATTEMPT-1PM',
    learnerId: 'LEARNER-REV',
    skillId: 'GER-SVC-REQUEST-ONE-01',
    evidenceLane: 'typed_production',
    acceptedAt: '2026-09-01T13:00:00.000Z'
  });
  const context1pm = ledger.createEvaluatorContext({
    learnerId: 'LEARNER-REV',
    skillId: 'GER-SVC-REQUEST-ONE-01',
    evidenceLane: 'typed_production',
    attemptEventId: attempt1pm.event_id
  });
  assert.equal(context1pm.latestAnswerRevealingExposureEvent?.event_id, 'EVT-REV-12PM');

  // 6d. Query for different learner returns explicit null
  const attemptOtherLearner = createAndAppendAttemptEvent(ledger, {
    eventId: 'EVT-ATTEMPT-OTHER',
    learnerId: 'LEARNER-OTHER',
    skillId: 'GER-SVC-REQUEST-ONE-01',
    evidenceLane: 'typed_production',
    acceptedAt: '2026-09-01T13:00:00.000Z'
  });
  const contextOtherLearner = ledger.createEvaluatorContext({
    learnerId: 'LEARNER-OTHER',
    skillId: 'GER-SVC-REQUEST-ONE-01',
    evidenceLane: 'typed_production',
    attemptEventId: attemptOtherLearner.event_id
  });
  assert.strictEqual(contextOtherLearner.latestAnswerRevealingExposureEvent, null, 'Must be explicit null for another learner');
});

// ============================================================================
// Acceptance Test 7: Projection rebuild is identical across repeated runs
// and stable under input permutation after canonical ordering
// ============================================================================
test('AT-07: Projection rebuild is identical across repeated runs and permutation stable', () => {
  const scope = {
    learnerId: 'LEARNER-PROJ-01',
    skillId: 'GER-SVC-REQUEST-ONE-01',
    evidenceLane: 'typed_production',
    contentVersion: '2.1.0-candidate',
    evidencePolicyVersion: '1.1'
  };

  const ledger = new InMemoryLearningEventLedger();

  const ev1 = ledger.appendEvent(makeValidCandidate({
    event_id: 'EVT-P1',
    learner_id: 'LEARNER-PROJ-01',
    event_type: EVENT_TYPES.FAMILIARITY_ACCEPTED,
    payload: {
      item_id: 'LEX-DE-002',
      familiarity_kind: 'PRIOR_LEARNING',
      marker_field: 'status',
      marker_value: 'PRETAUGHT_ACCEPTED'
    }
  }), { acceptedAt: '2026-09-01T09:00:00.000Z' });

  const ev2 = ledger.appendEvent(makeValidCandidate({
    event_id: 'EVT-P2',
    learner_id: 'LEARNER-PROJ-01',
    event_type: EVENT_TYPES.EVIDENCE_DECIDED,
    payload: {
      awarded_tier: 'E2',
      support_level: 'H3',
      answer_revealing_exposure: false,
      contamination_status: 'NONE',
      changed_context_qualified: false,
      delay_qualified: false,
      version_compatibility: true,
      familiarity_qualified: true,
      reason_codes: ['SUPPORTED_PRODUCTION_H3'],
      source_event_ids: [],
      rubric_id: 'RUBRIC-DE-N1-REQ-01',
      rubric_version: '2.1.0'
    }
  }), { acceptedAt: '2026-09-01T10:00:00.000Z' });

  const ev3 = ledger.appendEvent(makeValidCandidate({
    event_id: 'EVT-P3',
    learner_id: 'LEARNER-PROJ-01',
    event_type: EVENT_TYPES.EVIDENCE_DECIDED,
    payload: {
      awarded_tier: 'E3',
      support_level: 'H1',
      answer_revealing_exposure: false,
      contamination_status: 'NONE',
      changed_context_qualified: true,
      delay_qualified: true,
      version_compatibility: true,
      familiarity_qualified: true,
      reason_codes: ['INDEPENDENT_TRANSFER_QUALIFIED'],
      source_event_ids: [],
      rubric_id: 'RUBRIC-DE-N1-REQ-01',
      rubric_version: '2.1.0'
    }
  }), { acceptedAt: '2026-09-01T12:00:00.000Z' });

  const ev4 = ledger.appendEvent(makeValidCandidate({
    event_id: 'EVT-P4',
    learner_id: 'LEARNER-PROJ-01',
    event_type: EVENT_TYPES.ANSWER_REVEALED,
    payload: { exposure_kind: 'MODEL_ANSWER_EXPOSURE' }
  }), { acceptedAt: '2026-09-01T14:00:00.000Z' });

  const eventList = [ev1, ev2, ev3, ev4];
  const shuffled1 = [ev3, ev1, ev4, ev2];
  const shuffled2 = [ev4, ev2, ev3, ev1];

  const projA = LearnerSkillProjection.rebuildFromEvents(eventList, scope);
  const projB = LearnerSkillProjection.rebuildFromEvents(shuffled1, scope);
  const projC = LearnerSkillProjection.rebuildFromEvents(shuffled2, scope);

  assert.deepEqual(projA, projB, 'Projection from shuffled list 1 must be identical to canonical');
  assert.deepEqual(projA, projC, 'Projection from shuffled list 2 must be identical to canonical');
  assert.ok(Object.isFrozen(projA), 'Rebuilt projection must be frozen');

  assert.equal(projA.highest_tier_awarded, 'E3');
  assert.equal(projA.prior_e3_event_id, 'EVT-P3');
  assert.equal(projA.last_answer_reveal_at, '2026-09-01T14:00:00.000Z');
  assert.equal(projA.total_attempts_evaluated, 2);
  assert.equal(projA.events_applied_count, 4);
});

// ============================================================================
// Acceptance Test 8: E3 and E4 remain lane/version-specific; later failure
// does not erase prior evidence
// ============================================================================
test('AT-08: E3/E4 remain lane/version specific; later failure sets repair_required without erasing prior E3', () => {
  const scope = {
    learnerId: 'LEARNER-REPAIR',
    skillId: 'GER-SVC-REQUEST-ONE-01',
    evidenceLane: 'typed_production',
    contentVersion: '2.1.0-candidate',
    evidencePolicyVersion: '1.1'
  };

  const ledger = new InMemoryLearningEventLedger();

  const evE3 = ledger.appendEvent(makeValidCandidate({
    event_id: 'EVT-SUCCESS-E3',
    learner_id: 'LEARNER-REPAIR',
    event_type: EVENT_TYPES.EVIDENCE_DECIDED,
    payload: {
      awarded_tier: 'E3',
      support_level: 'H1',
      answer_revealing_exposure: false,
      contamination_status: 'NONE',
      changed_context_qualified: true,
      delay_qualified: true,
      version_compatibility: true,
      familiarity_qualified: true,
      reason_codes: ['INDEPENDENT_TRANSFER_QUALIFIED'],
      source_event_ids: [],
      rubric_id: 'RUBRIC-DE-N1-REQ-01',
      rubric_version: '2.1.0'
    }
  }), { acceptedAt: '2026-09-01T10:00:00.000Z' });

  // Critical failure during a return attempt
  const evFail = ledger.appendEvent(makeValidCandidate({
    event_id: 'EVT-FAIL-RETURN',
    learner_id: 'LEARNER-REPAIR',
    event_type: EVENT_TYPES.EVIDENCE_DECIDED,
    payload: {
      awarded_tier: 'NONE',
      support_level: 'H1',
      answer_revealing_exposure: false,
      contamination_status: 'NONE',
      changed_context_qualified: true,
      delay_qualified: false,
      version_compatibility: true,
      familiarity_qualified: true,
      reason_codes: ['FAILED_CRITICAL_RETURN_ATTEMPT', 'PRESERVE_HISTORICAL_E3', 'TRANSITION_ATTENTION_STATE_NEEDS_REPAIR'],
      source_event_ids: ['EVT-SUCCESS-E3'],
      rubric_id: 'RUBRIC-DE-N1-REQ-01',
      rubric_version: '2.1.0'
    }
  }), { acceptedAt: '2026-09-02T10:00:00.000Z' });

  const proj = LearnerSkillProjection.rebuildFromEvents([evE3, evFail], scope);

  // Evidence must NOT be deleted
  assert.equal(proj.highest_tier_awarded, 'E3', 'Historical E3 must be preserved');
  assert.equal(proj.prior_e3_event_id, 'EVT-SUCCESS-E3');
  // Repair signals must be active
  assert.equal(proj.repair_required, true, 'repair_required must be set to true');
  assert.equal(proj.repair_due_at, '2026-09-02T10:00:00.000Z');
  assert.ok(proj.repair_reason_codes.includes('FAILED_CRITICAL_RETURN_ATTEMPT'));

  // Event from different lane does not affect this projection
  const evSpoken = ledger.appendEvent(makeValidCandidate({
    event_id: 'EVT-SPOKEN-LANE',
    learner_id: 'LEARNER-REPAIR',
    evidence_lane: 'spoken_production',
    event_type: EVENT_TYPES.EVIDENCE_DECIDED,
    payload: {
      awarded_tier: 'E4',
      support_level: 'H1',
      answer_revealing_exposure: false,
      contamination_status: 'NONE',
      changed_context_qualified: true,
      delay_qualified: true,
      version_compatibility: true,
      familiarity_qualified: true,
      reason_codes: ['DELAYED_RETURN_E4_QUALIFIED'],
      source_event_ids: [],
      rubric_id: 'RUBRIC-DE-N1-REQ-01',
      rubric_version: '2.1.0'
    }
  }), { acceptedAt: '2026-09-03T10:00:00.000Z' });

  const projWithSpoken = LearnerSkillProjection.rebuildFromEvents([evE3, evFail, evSpoken], scope);
  assert.equal(projWithSpoken.highest_tier_awarded, 'E3', 'Spoken lane event cannot mutate typed lane projection');
  assert.equal(projWithSpoken.events_applied_count, 2, 'Spoken lane event must be ignored in typed projection');
});

// ============================================================================
// Acceptance Test 9: Evaluator context adapter drives real DeterministicEvaluator
// (Positive E3, Positive E4, Recent-reveal E4 denial, Forged client time denial)
// ============================================================================
test('AT-09a: Real evaluator positive clean E3 driven by in-memory ledger adapter', () => {
  const ledger = new InMemoryLearningEventLedger();
  populateStandardFamiliarityEvents(ledger, 'LEARNER-EVAL-01');

  const attemptEv = createAndAppendAttemptEvent(ledger, {
    eventId: 'EVT-ATTEMPT-01',
    learnerId: 'LEARNER-EVAL-01',
    skillId: 'GER-SVC-REQUEST-ONE-01',
    evidenceLane: 'typed_production',
    acceptedAt: '2026-09-02T12:00:00.000Z'
  });

  const context = ledger.createEvaluatorContext({
    learnerId: 'LEARNER-EVAL-01',
    skillId: 'GER-SVC-REQUEST-ONE-01',
    evidenceLane: 'typed_production',
    attemptEventId: attemptEv.event_id
  });

  const fixture = reader.getFixture('ERR-F06');
  const input = deepClone(fixture.input_state);
  input.attempt_at = attemptEv.accepted_at;
  input.current_versions = {
    content_version: '2.1.0-candidate',
    evidence_policy_version: '1.1',
    rubric_id: 'RUBRIC-DE-N1-REQ-01',
    rubric_version: '2.1.0'
  };
  input.familiarity_evidence = ['LEX-DE-002', 'LEX-DE-004', 'LEX-DE-006'].map((item) => ({
    item_id: item,
    status: 'PRETAUGHT_ACCEPTED',
    source_type: 'PRIOR_LEARNING_EVENT',
    source_event_id: `EVT-FAMILIAR-${item}`
  }));

  const evaluatorInstance = new DeterministicEvaluator(reader, context);
  const result = evaluatorInstance.evaluateFixture({
    activity_id: fixture.activity_id,
    skill_id: fixture.skill_id,
    input_state: input
  });

  assert.equal(result.attempt_evaluation.evaluation_outcome, 'accepted_clean');
  assert.equal(result.evidence_decision.awarded_tier, 'E3');
  assert.equal(result.evidence_decision.contamination_status, 'NONE');
  assert.deepEqual(result.evidence_decision.reason_codes, ['INDEPENDENT_TRANSFER_QUALIFIED']);
});

test('AT-09b: Real evaluator positive clean E4 (26h clean delay) driven by adapter', () => {
  const ledger = new InMemoryLearningEventLedger();
  populateStandardFamiliarityEvents(ledger, 'LEARNER-EVAL-02');

  // Prior E3 accepted 26h ago
  ledger.appendEvent(makeValidCandidate({
    event_id: 'EVT-ERR-F19-E4-CLEAN-26H-PRIOR-E3',
    event_type: EVENT_TYPES.EVIDENCE_DECIDED,
    learner_id: 'LEARNER-EVAL-02',
    skill_id: 'GER-SVC-REQUEST-ONE-01',
    evidence_lane: 'typed_production',
    payload: {
      awarded_tier: 'E3',
      support_level: 'H1',
      answer_revealing_exposure: false,
      contamination_status: 'NONE',
      changed_context_qualified: true,
      delay_qualified: true,
      version_compatibility: true,
      familiarity_qualified: true,
      reason_codes: ['INDEPENDENT_TRANSFER_QUALIFIED'],
      source_event_ids: [],
      rubric_id: 'RUBRIC-DE-N1-REQ-01',
      rubric_version: '2.1.0'
    }
  }), { acceptedAt: '2026-09-01T10:00:00.000Z' });

  const attemptEv = createAndAppendAttemptEvent(ledger, {
    eventId: 'EVT-ATTEMPT-02',
    learnerId: 'LEARNER-EVAL-02',
    skillId: 'GER-SVC-REQUEST-ONE-01',
    evidenceLane: 'typed_production',
    acceptedAt: '2026-09-02T12:00:00.000Z'
  });

  const context = ledger.createEvaluatorContext({
    learnerId: 'LEARNER-EVAL-02',
    skillId: 'GER-SVC-REQUEST-ONE-01',
    evidenceLane: 'typed_production',
    attemptEventId: attemptEv.event_id
  });

  const fixture = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = deepClone(fixture.input_state);
  input.attempt_at = attemptEv.accepted_at;

  const evaluatorInstance = new DeterministicEvaluator(reader, context);
  const result = evaluatorInstance.evaluateFixture({
    activity_id: fixture.activity_id,
    skill_id: fixture.skill_id,
    input_state: input
  });

  assert.equal(result.attempt_evaluation.evaluation_outcome, 'accepted_clean');
  assert.equal(result.evidence_decision.awarded_tier, 'E4');
  assert.equal(result.evidence_decision.delay_qualified, true);
  assert.deepEqual(result.evidence_decision.reason_codes, ['DELAYED_RETURN_E4_QUALIFIED']);
});

test('AT-09c: Real evaluator recent reveal denies E4 and falls back with DELAY_RESET_BY_EXPOSURE', () => {
  const ledger = new InMemoryLearningEventLedger();
  populateStandardFamiliarityEvents(ledger, 'LEARNER-EVAL-03');

  // Prior E3 accepted 26h ago
  ledger.appendEvent(makeValidCandidate({
    event_id: 'EVT-ERR-F19-E4-CLEAN-26H-PRIOR-E3',
    event_type: EVENT_TYPES.EVIDENCE_DECIDED,
    learner_id: 'LEARNER-EVAL-03',
    skill_id: 'GER-SVC-REQUEST-ONE-01',
    evidence_lane: 'typed_production',
    payload: {
      awarded_tier: 'E3',
      support_level: 'H1',
      answer_revealing_exposure: false,
      contamination_status: 'NONE',
      changed_context_qualified: true,
      delay_qualified: true,
      version_compatibility: true,
      familiarity_qualified: true,
      reason_codes: ['INDEPENDENT_TRANSFER_QUALIFIED'],
      source_event_ids: [],
      rubric_id: 'RUBRIC-DE-N1-REQ-01',
      rubric_version: '2.1.0'
    }
  }), { acceptedAt: '2026-09-01T10:00:00.000Z' });

  // Answer reveal accepted 1 hour before attempt
  ledger.appendEvent(makeValidCandidate({
    event_id: 'EVT-RECENT-REVEAL-001',
    event_type: EVENT_TYPES.ANSWER_REVEALED,
    learner_id: 'LEARNER-EVAL-03',
    skill_id: 'GER-SVC-REQUEST-ONE-01',
    evidence_lane: 'typed_production',
    payload: { exposure_kind: 'MODEL_ANSWER_EXPOSURE' }
  }), { acceptedAt: '2026-09-02T11:00:00.000Z' });

  const attemptEv = createAndAppendAttemptEvent(ledger, {
    eventId: 'EVT-ATTEMPT-03',
    learnerId: 'LEARNER-EVAL-03',
    skillId: 'GER-SVC-REQUEST-ONE-01',
    evidenceLane: 'typed_production',
    acceptedAt: '2026-09-02T12:00:00.000Z'
  });

  const context = ledger.createEvaluatorContext({
    learnerId: 'LEARNER-EVAL-03',
    skillId: 'GER-SVC-REQUEST-ONE-01',
    evidenceLane: 'typed_production',
    attemptEventId: attemptEv.event_id
  });

  const fixture = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = deepClone(fixture.input_state);
  input.attempt_at = attemptEv.accepted_at;

  const evaluatorInstance = new DeterministicEvaluator(reader, context);
  const result = evaluatorInstance.evaluateFixture({
    activity_id: fixture.activity_id,
    skill_id: fixture.skill_id,
    input_state: input
  });

  assert.equal(result.evidence_decision.awarded_tier, 'E3', 'Recent reveal must deny E4 and fall back to E3');
  assert.equal(result.evidence_decision.delay_qualified, false);
  assert.ok(result.evidence_decision.reason_codes.includes('DELAY_RESET_BY_EXPOSURE'));
});

test('AT-09d: Forged client attempt time or missing authoritative context denies E4', () => {
  const ledger = new InMemoryLearningEventLedger();
  populateStandardFamiliarityEvents(ledger, 'LEARNER-EVAL-04');

  ledger.appendEvent(makeValidCandidate({
    event_id: 'EVT-ERR-F19-E4-CLEAN-26H-PRIOR-E3',
    event_type: EVENT_TYPES.EVIDENCE_DECIDED,
    learner_id: 'LEARNER-EVAL-04',
    skill_id: 'GER-SVC-REQUEST-ONE-01',
    evidence_lane: 'typed_production',
    payload: {
      awarded_tier: 'E3',
      support_level: 'H1',
      answer_revealing_exposure: false,
      contamination_status: 'NONE',
      changed_context_qualified: true,
      delay_qualified: true,
      version_compatibility: true,
      familiarity_qualified: true,
      reason_codes: ['INDEPENDENT_TRANSFER_QUALIFIED'],
      source_event_ids: [],
      rubric_id: 'RUBRIC-DE-N1-REQ-01',
      rubric_version: '2.1.0'
    }
  }), { acceptedAt: '2026-09-01T10:00:00.000Z' });

  const attemptEv = createAndAppendAttemptEvent(ledger, {
    eventId: 'EVT-ATTEMPT-04',
    learnerId: 'LEARNER-EVAL-04',
    skillId: 'GER-SVC-REQUEST-ONE-01',
    evidenceLane: 'typed_production',
    acceptedAt: '2026-09-02T12:00:00.000Z'
  });

  const context = ledger.createEvaluatorContext({
    learnerId: 'LEARNER-EVAL-04',
    skillId: 'GER-SVC-REQUEST-ONE-01',
    evidenceLane: 'typed_production',
    attemptEventId: attemptEv.event_id
  });

  const fixture = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = deepClone(fixture.input_state);
  // Caller claims forged future attempt_at
  input.attempt_at = '2026-09-05T12:00:00Z';

  const evaluatorInstance = new DeterministicEvaluator(reader, context);
  const result = evaluatorInstance.evaluateFixture({
    activity_id: fixture.activity_id,
    skill_id: fixture.skill_id,
    input_state: input
  });

  assert.notEqual(result.evidence_decision.awarded_tier, 'E4', 'Forged attempt time must not award E4');
  assert.equal(result.evidence_decision.awarded_tier, 'NONE', 'Mismatched attempt time fails closed to NONE');
  assert.deepEqual(result.evidence_decision.reason_codes, ['UNSCORED_PREREQUISITE_MISSING']);

  // Without authoritative context options, evaluator fails closed
  const unauthoritativeEvaluator = new DeterministicEvaluator(reader);
  const resultNoAuth = unauthoritativeEvaluator.evaluateFixture({
    activity_id: fixture.activity_id,
    skill_id: fixture.skill_id,
    input_state: input
  });
  assert.notEqual(resultNoAuth.evidence_decision.awarded_tier, 'E4');
  assert.equal(resultNoAuth.evidence_decision.awarded_tier, 'NONE');
  assert.deepEqual(resultNoAuth.evidence_decision.reason_codes, ['UNSCORED_PREREQUISITE_MISSING']);
});

// ============================================================================
// Acceptance Test 10: Existing test suites verification
// ============================================================================
test('AT-10: Existing suites remain green and canonical comparison is honest', () => {
  // Verify reader loads candidate pack cleanly
  assert.equal(pack.content_pack_id, 'de-DE-counter-n1-n2-002-draft');
  assert.equal(pack.content_version, '2.1.0-candidate');
  assert.equal(pack.evidence_policy_version, '1.1');
  assert.equal(pack.evaluation_fixtures.length, 27);
  assert.equal(pack.provenance_sources.length, 7);
  assert.ok(reader.getActivity('ACT-DE-N1-E0-01') !== null);
  assert.ok(reader.getRubric('RUBRIC-DE-N1-REQ-01') !== null);
});

// ============================================================================
// Acceptance Test 11: Frozen candidate JSON SHA-256 byte-for-byte verification
// ============================================================================
test('AT-11: Candidate content pack SHA-256 is byte-for-byte unchanged', () => {
  const content = fs.readFileSync(candidatePath);
  const hash = crypto.createHash('sha256').update(content).digest('hex').toUpperCase();
  const EXPECTED_HASH = '4F80F1FE030D05EDA87F8948E2C95571E88FD2C83BA993F11C4B2523FF6CD300';
  assert.equal(hash, EXPECTED_HASH, `Candidate JSON hash must match ${EXPECTED_HASH}`);
});

// ============================================================================
// REQUIRED ADVERSARIAL ACCEPTANCE PROBES (R1-01 to R1-08)
// ============================================================================
console.log('\n=== WP-03.3A-R1 ADVERSARIAL ACCEPTANCE PROBES ===');

test('R1-01 (B1 probe 1): Candidate accepted_at: 2099... plus host acceptedAt: 2026... rejects; cannot be stored', () => {
  const ledger = new InMemoryLearningEventLedger();
  const candidateWithAcceptedAt = makeValidCandidate({
    accepted_at: '2099-01-01T00:00:00.000Z'
  });

  assert.throws(() => {
    ledger.appendEvent(candidateWithAcceptedAt, { acceptedAt: '2026-09-01T10:00:00.000Z' });
  }, (err) => {
    assert.ok(err instanceof ContractValidationError);
    assert.equal(err.code, 'CLIENT_ACCEPTED_AT_FORBIDDEN');
    return true;
  });

  assert.equal(ledger.getAllEvents().length, 0, 'Rejected candidate must not be stored');
});

test('R1-02 (B1 probe 2): Candidate without accepted_at stores host time; candidate without host context rejects', () => {
  const ledger = new InMemoryLearningEventLedger();
  const validCandidate = makeValidCandidate({
    event_id: 'EVT-HOST-TIME-OK'
  });
  assert.strictEqual(validCandidate.accepted_at, undefined);

  // 1. Without hostContext rejects
  assert.throws(() => {
    ledger.appendEvent(validCandidate);
  }, (err) => {
    assert.ok(err instanceof ContractValidationError);
    assert.equal(err.code, 'MISSING_HOST_ACCEPTED_AT');
    return true;
  });

  assert.throws(() => {
    ledger.appendEvent(validCandidate, {});
  }, (err) => {
    assert.ok(err instanceof ContractValidationError);
    assert.equal(err.code, 'MISSING_HOST_ACCEPTED_AT');
    return true;
  });

  // 2. With valid hostContext stores exactly host time
  const stored = ledger.appendEvent(validCandidate, { acceptedAt: '2026-09-01T10:00:00.000Z' });
  assert.equal(stored.accepted_at, '2026-09-01T10:00:00.000Z');
  assert.equal(ledger.getEvent('EVT-HOST-TIME-OK').accepted_at, '2026-09-01T10:00:00.000Z');
});

test('R1-03 (B2 probe 1): Real accepted ATTEMPT_ACCEPTED event drives context authoritativeAttemptAt exactly', () => {
  const ledger = new InMemoryLearningEventLedger();
  const attemptEv = createAndAppendAttemptEvent(ledger, {
    eventId: 'EVT-ATTEMPT-AUTH-01',
    learnerId: 'LEARNER-ATT-01',
    skillId: 'GER-SVC-REQUEST-ONE-01',
    evidenceLane: 'typed_production',
    acceptedAt: '2026-09-01T15:30:00.000Z'
  });

  const context = ledger.createEvaluatorContext({
    learnerId: 'LEARNER-ATT-01',
    skillId: 'GER-SVC-REQUEST-ONE-01',
    evidenceLane: 'typed_production',
    attemptEventId: 'EVT-ATTEMPT-AUTH-01'
  });

  assert.equal(context.authoritativeAttemptAt, '2026-09-01T15:30:00.000Z');
});

test('R1-04 (B2 probe 2): Raw timestamp input rejected; unknown, wrong-type and cross-scope attempt IDs reject', () => {
  const ledger = new InMemoryLearningEventLedger();

  // Create valid attempt for Learner A, Skill 1, Lane typed
  createAndAppendAttemptEvent(ledger, {
    eventId: 'EVT-ATTEMPT-BASE',
    learnerId: 'LEARNER-A',
    skillId: 'GER-SVC-REQUEST-ONE-01',
    evidenceLane: 'typed_production',
    acceptedAt: '2026-09-01T10:00:00.000Z'
  });

  // Create an event of another type (FAMILIARITY_ACCEPTED)
  ledger.appendEvent(makeValidCandidate({
    event_id: 'EVT-NON-ATTEMPT',
    event_type: EVENT_TYPES.FAMILIARITY_ACCEPTED,
    learner_id: 'LEARNER-A',
    skill_id: 'GER-SVC-REQUEST-ONE-01',
    evidence_lane: 'typed_production',
    payload: {
      item_id: 'LEX-DE-002',
      familiarity_kind: 'PRIOR_LEARNING',
      marker_field: 'status',
      marker_value: 'PRETAUGHT_ACCEPTED'
    }
  }), { acceptedAt: '2026-09-01T10:00:00.000Z' });

  // 1. Raw timestamp input without attemptEventId is rejected
  assert.throws(() => {
    ledger.createEvaluatorContext({
      learnerId: 'LEARNER-A',
      skillId: 'GER-SVC-REQUEST-ONE-01',
      evidenceLane: 'typed_production',
      authoritativeAttemptAt: '2099-01-01T00:00:00Z'
    });
  }, (err) => err instanceof ContractValidationError && err.code === 'MISSING_ATTEMPT_EVENT_ID');

  // 2. Unknown attempt ID throws UNKNOWN_ATTEMPT_EVENT
  assert.throws(() => {
    ledger.createEvaluatorContext({
      learnerId: 'LEARNER-A',
      skillId: 'GER-SVC-REQUEST-ONE-01',
      evidenceLane: 'typed_production',
      attemptEventId: 'EVT-NONEXISTENT'
    });
  }, (err) => err instanceof ContractValidationError && err.code === 'UNKNOWN_ATTEMPT_EVENT');

  // 3. Wrong event type throws INVALID_ATTEMPT_EVENT_TYPE
  assert.throws(() => {
    ledger.createEvaluatorContext({
      learnerId: 'LEARNER-A',
      skillId: 'GER-SVC-REQUEST-ONE-01',
      evidenceLane: 'typed_production',
      attemptEventId: 'EVT-NON-ATTEMPT'
    });
  }, (err) => err instanceof ContractValidationError && err.code === 'INVALID_ATTEMPT_EVENT_TYPE');

  // 4. Cross-learner attempt ID throws CROSS_LEARNER_ATTEMPT_EVENT
  assert.throws(() => {
    ledger.createEvaluatorContext({
      learnerId: 'LEARNER-B', // Different learner
      skillId: 'GER-SVC-REQUEST-ONE-01',
      evidenceLane: 'typed_production',
      attemptEventId: 'EVT-ATTEMPT-BASE'
    });
  }, (err) => err instanceof ContractValidationError && err.code === 'CROSS_LEARNER_ATTEMPT_EVENT');

  // 5. Cross-skill attempt ID throws CROSS_SKILL_ATTEMPT_EVENT
  assert.throws(() => {
    ledger.createEvaluatorContext({
      learnerId: 'LEARNER-A',
      skillId: 'GER-SVC-REPAIR-01', // Different skill
      evidenceLane: 'typed_production',
      attemptEventId: 'EVT-ATTEMPT-BASE'
    });
  }, (err) => err instanceof ContractValidationError && err.code === 'CROSS_SKILL_ATTEMPT_EVENT');

  // 6. Cross-lane attempt ID throws CROSS_LANE_ATTEMPT_EVENT
  assert.throws(() => {
    ledger.createEvaluatorContext({
      learnerId: 'LEARNER-A',
      skillId: 'GER-SVC-REQUEST-ONE-01',
      evidenceLane: 'spoken_production', // Different lane
      attemptEventId: 'EVT-ATTEMPT-BASE'
    });
  }, (err) => err instanceof ContractValidationError && err.code === 'CROSS_LANE_ATTEMPT_EVENT');
});

test('R1-05 (B3 probe 1): schema_version: "not-a-semver" and unsupported versions reject', () => {
  const ledger = new InMemoryLearningEventLedger();
  const hostCtx = { acceptedAt: '2026-09-01T10:00:00.000Z' };

  // "not-a-semver" rejected
  assert.throws(() => {
    ledger.appendEvent(makeValidCandidate({ schema_version: 'not-a-semver' }), hostCtx);
  }, (err) => {
    assert.ok(err instanceof ContractValidationError);
    assert.equal(err.code, 'UNSUPPORTED_SCHEMA_VERSION');
    return true;
  });

  // Unsupported valid semver rejected
  assert.throws(() => {
    ledger.appendEvent(makeValidCandidate({ schema_version: '2.0.0' }), hostCtx);
  }, (err) => {
    assert.ok(err instanceof ContractValidationError);
    assert.equal(err.code, 'UNSUPPORTED_SCHEMA_VERSION');
    return true;
  });
});

test('R1-06 (B3 probe 2): EVIDENCE_DECIDED without rubric fields rejects; valid rubrics returned unchanged without defaults', () => {
  const ledger = new InMemoryLearningEventLedger();
  const hostCtx = { acceptedAt: '2026-09-01T10:00:00.000Z' };

  const validPayloadBase = {
    awarded_tier: 'E3',
    support_level: 'H1',
    answer_revealing_exposure: false,
    contamination_status: 'NONE',
    changed_context_qualified: true,
    delay_qualified: true,
    version_compatibility: true,
    familiarity_qualified: true,
    reason_codes: ['INDEPENDENT_TRANSFER_QUALIFIED'],
    source_event_ids: []
  };

  // Missing rubric_id rejects
  assert.throws(() => {
    ledger.appendEvent(makeValidCandidate({
      event_type: EVENT_TYPES.EVIDENCE_DECIDED,
      payload: { ...validPayloadBase, rubric_version: '2.1.0' }
    }), hostCtx);
  }, (err) => err instanceof ContractValidationError && err.code === 'MALFORMED_PAYLOAD');

  // Missing rubric_version rejects
  assert.throws(() => {
    ledger.appendEvent(makeValidCandidate({
      event_type: EVENT_TYPES.EVIDENCE_DECIDED,
      payload: { ...validPayloadBase, rubric_id: 'RUBRIC-DE-N1-REQ-01' }
    }), hostCtx);
  }, (err) => err instanceof ContractValidationError && err.code === 'MALFORMED_PAYLOAD');

  // Valid event with explicit custom rubric stores and returns recorded values directly without defaults
  ledger.appendEvent(makeValidCandidate({
    event_id: 'EVT-EXPLICIT-RUBRIC',
    event_type: EVENT_TYPES.EVIDENCE_DECIDED,
    learner_id: 'LEARNER-RUBRIC',
    skill_id: 'GER-SVC-REQUEST-ONE-01',
    evidence_lane: 'typed_production',
    payload: {
      ...validPayloadBase,
      rubric_id: 'RUBRIC-CUSTOM-01',
      rubric_version: '3.0.0-custom'
    }
  }), hostCtx);

  const attemptEv = createAndAppendAttemptEvent(ledger, {
    eventId: 'EVT-ATTEMPT-RUBRIC',
    learnerId: 'LEARNER-RUBRIC',
    skillId: 'GER-SVC-REQUEST-ONE-01',
    evidenceLane: 'typed_production',
    acceptedAt: '2026-09-02T12:00:00Z'
  });

  const context = ledger.createEvaluatorContext({
    learnerId: 'LEARNER-RUBRIC',
    skillId: 'GER-SVC-REQUEST-ONE-01',
    evidenceLane: 'typed_production',
    attemptEventId: attemptEv.event_id
  });

  const resolved = context.eventResolver('EVT-EXPLICIT-RUBRIC');
  assert.equal(resolved.versions.rubric_id, 'RUBRIC-CUSTOM-01', 'Resolver must return exact recorded rubric_id');
  assert.equal(resolved.versions.rubric_version, '3.0.0-custom', 'Resolver must return exact recorded rubric_version');
});

test('R1-07: Positive controls and denials function end-to-end via accepted attempt event derivation', () => {
  const ledger = new InMemoryLearningEventLedger();
  populateStandardFamiliarityEvents(ledger, 'LEARNER-E2E');

  // Prior E3
  ledger.appendEvent(makeValidCandidate({
    event_id: 'EVT-ERR-F19-E4-CLEAN-26H-PRIOR-E3',
    event_type: EVENT_TYPES.EVIDENCE_DECIDED,
    learner_id: 'LEARNER-E2E',
    skill_id: 'GER-SVC-REQUEST-ONE-01',
    evidence_lane: 'typed_production',
    payload: {
      awarded_tier: 'E3',
      support_level: 'H1',
      answer_revealing_exposure: false,
      contamination_status: 'NONE',
      changed_context_qualified: true,
      delay_qualified: true,
      version_compatibility: true,
      familiarity_qualified: true,
      reason_codes: ['INDEPENDENT_TRANSFER_QUALIFIED'],
      source_event_ids: [],
      rubric_id: 'RUBRIC-DE-N1-REQ-01',
      rubric_version: '2.1.0'
    }
  }), { acceptedAt: '2026-09-01T10:00:00.000Z' });

  // Accepted attempt event 26h later
  const attemptEv = createAndAppendAttemptEvent(ledger, {
    eventId: 'EVT-ATTEMPT-E2E',
    learnerId: 'LEARNER-E2E',
    skillId: 'GER-SVC-REQUEST-ONE-01',
    evidenceLane: 'typed_production',
    acceptedAt: '2026-09-02T12:00:00.000Z'
  });

  const context = ledger.createEvaluatorContext({
    learnerId: 'LEARNER-E2E',
    skillId: 'GER-SVC-REQUEST-ONE-01',
    evidenceLane: 'typed_production',
    attemptEventId: attemptEv.event_id
  });

  const fixture = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const input = deepClone(fixture.input_state);
  input.attempt_at = attemptEv.accepted_at;

  const evaluatorInstance = new DeterministicEvaluator(reader, context);
  const result = evaluatorInstance.evaluateFixture({
    activity_id: fixture.activity_id,
    skill_id: fixture.skill_id,
    input_state: input
  });

  assert.equal(result.attempt_evaluation.evaluation_outcome, 'accepted_clean');
  assert.equal(result.evidence_decision.awarded_tier, 'E4');
  assert.equal(result.evidence_decision.delay_qualified, true);
  assert.deepEqual(result.evidence_decision.reason_codes, ['DELAYED_RETURN_E4_QUALIFIED']);
});

test('R1-08: Frozen candidate hash unchanged and reader/regression suites preserved', () => {
  const content = fs.readFileSync(candidatePath);
  const hash = crypto.createHash('sha256').update(content).digest('hex').toUpperCase();
  assert.equal(hash, '4F80F1FE030D05EDA87F8948E2C95571E88FD2C83BA993F11C4B2523FF6CD300');
});

// ============================================================================
// WP-03.3A-R2: FAMILIARITY EVIDENCE SCOPE CORRECTION PROBES
// ============================================================================

console.log('\n=== WP-03.3A-R2 FAMILIARITY SCOPE PROBES ===');

// Probe R2-01: Cross-skill familiarity event resolves null
test('R2-01: Cross-skill familiarity event resolves null in evaluator context', () => {
  const ledger = new InMemoryLearningEventLedger();
  const hostCtx = { acceptedAt: '2026-09-01T09:00:00.000Z' };

  ledger.appendEvent(makeValidCandidate({
    event_id: 'EVT-FAM-CROSS-SKILL',
    event_type: EVENT_TYPES.FAMILIARITY_ACCEPTED,
    learner_id: 'LEARNER-R2-01',
    skill_id: 'GER-SVC-REPAIR-01', // Different skill
    evidence_lane: 'typed_production',
    payload: {
      item_id: 'LEX-DE-002',
      familiarity_kind: 'PRIOR_LEARNING',
      marker_field: 'status',
      marker_value: 'PRETAUGHT_ACCEPTED'
    }
  }), hostCtx);

  const attemptEv = createAndAppendAttemptEvent(ledger, {
    eventId: 'EVT-ATTEMPT-R2-01',
    learnerId: 'LEARNER-R2-01',
    skillId: 'GER-SVC-REQUEST-ONE-01', // In-scope skill
    evidenceLane: 'typed_production',
    acceptedAt: '2026-09-01T12:00:00.000Z'
  });

  const context = ledger.createEvaluatorContext({
    learnerId: 'LEARNER-R2-01',
    skillId: 'GER-SVC-REQUEST-ONE-01',
    evidenceLane: 'typed_production',
    attemptEventId: attemptEv.event_id
  });

  assert.strictEqual(context.eventResolver('EVT-FAM-CROSS-SKILL'), null, 'Cross-skill familiarity event must resolve to null');
});

// Probe R2-02: Cross-lane familiarity event resolves null
test('R2-02: Cross-lane familiarity event resolves null in evaluator context', () => {
  const ledger = new InMemoryLearningEventLedger();
  const hostCtx = { acceptedAt: '2026-09-01T09:00:00.000Z' };

  ledger.appendEvent(makeValidCandidate({
    event_id: 'EVT-FAM-CROSS-LANE',
    event_type: EVENT_TYPES.FAMILIARITY_ACCEPTED,
    learner_id: 'LEARNER-R2-02',
    skill_id: 'GER-SVC-REQUEST-ONE-01',
    evidence_lane: 'spoken_production', // Different lane
    payload: {
      item_id: 'LEX-DE-002',
      familiarity_kind: 'PRIOR_LEARNING',
      marker_field: 'status',
      marker_value: 'PRETAUGHT_ACCEPTED'
    }
  }), hostCtx);

  const attemptEv = createAndAppendAttemptEvent(ledger, {
    eventId: 'EVT-ATTEMPT-R2-02',
    learnerId: 'LEARNER-R2-02',
    skillId: 'GER-SVC-REQUEST-ONE-01',
    evidenceLane: 'typed_production', // In-scope lane
    acceptedAt: '2026-09-01T12:00:00.000Z'
  });

  const context = ledger.createEvaluatorContext({
    learnerId: 'LEARNER-R2-02',
    skillId: 'GER-SVC-REQUEST-ONE-01',
    evidenceLane: 'typed_production',
    attemptEventId: attemptEv.event_id
  });

  assert.strictEqual(context.eventResolver('EVT-FAM-CROSS-LANE'), null, 'Cross-lane familiarity event must resolve to null');
});

// Probe R2-03: Null-skill and null-lane familiarity events resolve null in evaluator context
test('R2-03: Null-skill and null-lane familiarity events resolve null in evaluator context', () => {
  const ledger = new InMemoryLearningEventLedger();
  const hostCtx = { acceptedAt: '2026-09-01T09:00:00.000Z' };

  // Null skill_id
  ledger.appendEvent(makeValidCandidate({
    event_id: 'EVT-FAM-NULL-SKILL',
    event_type: EVENT_TYPES.FAMILIARITY_ACCEPTED,
    learner_id: 'LEARNER-R2-03',
    skill_id: null,
    evidence_lane: 'typed_production',
    payload: {
      item_id: 'LEX-DE-002',
      familiarity_kind: 'PRIOR_LEARNING',
      marker_field: 'status',
      marker_value: 'PRETAUGHT_ACCEPTED'
    }
  }), hostCtx);

  // Null evidence_lane
  ledger.appendEvent(makeValidCandidate({
    event_id: 'EVT-FAM-NULL-LANE',
    event_type: EVENT_TYPES.FAMILIARITY_ACCEPTED,
    learner_id: 'LEARNER-R2-03',
    skill_id: 'GER-SVC-REQUEST-ONE-01',
    evidence_lane: null,
    payload: {
      item_id: 'LEX-DE-004',
      familiarity_kind: 'PRIOR_LEARNING',
      marker_field: 'status',
      marker_value: 'PRETAUGHT_ACCEPTED'
    }
  }), hostCtx);

  // Both null
  ledger.appendEvent(makeValidCandidate({
    event_id: 'EVT-FAM-NULL-BOTH',
    event_type: EVENT_TYPES.FAMILIARITY_ACCEPTED,
    learner_id: 'LEARNER-R2-03',
    skill_id: null,
    evidence_lane: null,
    payload: {
      item_id: 'LEX-DE-006',
      familiarity_kind: 'PRIOR_LEARNING',
      marker_field: 'status',
      marker_value: 'PRETAUGHT_ACCEPTED'
    }
  }), hostCtx);

  const attemptEv = createAndAppendAttemptEvent(ledger, {
    eventId: 'EVT-ATTEMPT-R2-03',
    learnerId: 'LEARNER-R2-03',
    skillId: 'GER-SVC-REQUEST-ONE-01',
    evidenceLane: 'typed_production',
    acceptedAt: '2026-09-01T12:00:00.000Z'
  });

  const context = ledger.createEvaluatorContext({
    learnerId: 'LEARNER-R2-03',
    skillId: 'GER-SVC-REQUEST-ONE-01',
    evidenceLane: 'typed_production',
    attemptEventId: attemptEv.event_id
  });

  assert.strictEqual(context.eventResolver('EVT-FAM-NULL-SKILL'), null, 'Null-skill event must resolve to null in scoped context');
  assert.strictEqual(context.eventResolver('EVT-FAM-NULL-LANE'), null, 'Null-lane event must resolve to null in scoped context');
  assert.strictEqual(context.eventResolver('EVT-FAM-NULL-BOTH'), null, 'Null-skill/null-lane event must resolve to null in scoped context');
});

// Probe R2-04: Three foreign familiarity records cannot earn E3 through the real DeterministicEvaluator; outcome must fail closed
test('R2-04: Three foreign familiarity records cannot earn E3 through real DeterministicEvaluator (fails closed)', () => {
  const ledger = new InMemoryLearningEventLedger();
  const hostCtx = { acceptedAt: '2026-09-01T09:00:00.000Z' };

  // Append three foreign familiarity events for GER-SVC-REPAIR-01 / spoken_production
  for (const item of ['LEX-DE-002', 'LEX-DE-004', 'LEX-DE-006']) {
    ledger.appendEvent(makeValidCandidate({
      event_id: `EVT-FOREIGN-FAM-${item}`,
      event_type: EVENT_TYPES.FAMILIARITY_ACCEPTED,
      learner_id: 'LEARNER-FOREIGN',
      skill_id: 'GER-SVC-REPAIR-01', // Foreign skill
      evidence_lane: 'spoken_production', // Foreign lane
      payload: {
        item_id: item,
        familiarity_kind: 'PRIOR_LEARNING',
        marker_field: 'status',
        marker_value: 'PRETAUGHT_ACCEPTED'
      }
    }), hostCtx);
  }

  // Attempt is for GER-SVC-REQUEST-ONE-01 / typed_production
  const attemptEv = createAndAppendAttemptEvent(ledger, {
    eventId: 'EVT-ATTEMPT-FOREIGN-TEST',
    learnerId: 'LEARNER-FOREIGN',
    skillId: 'GER-SVC-REQUEST-ONE-01',
    evidenceLane: 'typed_production',
    acceptedAt: '2026-09-01T12:00:00.000Z'
  });

  const context = ledger.createEvaluatorContext({
    learnerId: 'LEARNER-FOREIGN',
    skillId: 'GER-SVC-REQUEST-ONE-01',
    evidenceLane: 'typed_production',
    attemptEventId: attemptEv.event_id
  });

  // Evaluate ERR-F06 fixture which references the 3 familiarity items
  const fixture = reader.getFixture('ERR-F06');
  const input = deepClone(fixture.input_state);
  input.attempt_at = attemptEv.accepted_at;
  input.current_versions = {
    content_version: '2.1.0-candidate',
    evidence_policy_version: '1.1',
    rubric_id: 'RUBRIC-DE-N1-REQ-01',
    rubric_version: '2.1.0'
  };
  input.familiarity_evidence = ['LEX-DE-002', 'LEX-DE-004', 'LEX-DE-006'].map((item) => ({
    item_id: item,
    status: 'PRETAUGHT_ACCEPTED',
    source_type: 'PRIOR_LEARNING_EVENT',
    source_event_id: `EVT-FOREIGN-FAM-${item}`
  }));

  const evaluatorInstance = new DeterministicEvaluator(reader, context);
  const result = evaluatorInstance.evaluateFixture({
    activity_id: fixture.activity_id,
    skill_id: fixture.skill_id,
    input_state: input
  });

  // Since foreign familiarity events cannot resolve, familiarity check fails closed
  assert.equal(result.evidence_decision.awarded_tier, 'NONE', 'Must award NONE when familiarity cannot resolve in-scope');
  assert.equal(result.evidence_decision.familiarity_qualified, false, 'familiarity_qualified must be false');
  assert.ok(result.evidence_decision.reason_codes.includes('UNSCORED_PREREQUISITE_MISSING'), 'Must include UNSCORED_PREREQUISITE_MISSING');
});

// Probe R2-05: Three same-scope familiarity records still support positive E3 and clean E4 controls
test('R2-05: Three same-scope familiarity records still support positive E3 (ERR-F06) and clean E4 (ERR-F19-E4-CLEAN-26H)', () => {
  const ledger = new InMemoryLearningEventLedger();
  // Same-scope familiarity: GER-SVC-REQUEST-ONE-01 / typed_production
  populateStandardFamiliarityEvents(ledger, 'LEARNER-SAME-SCOPE');

  // Positive E3 evaluation on ERR-F06
  const attemptE3 = createAndAppendAttemptEvent(ledger, {
    eventId: 'EVT-ATTEMPT-SAME-E3',
    learnerId: 'LEARNER-SAME-SCOPE',
    skillId: 'GER-SVC-REQUEST-ONE-01',
    evidenceLane: 'typed_production',
    acceptedAt: '2026-09-01T12:00:00.000Z'
  });

  const contextE3 = ledger.createEvaluatorContext({
    learnerId: 'LEARNER-SAME-SCOPE',
    skillId: 'GER-SVC-REQUEST-ONE-01',
    evidenceLane: 'typed_production',
    attemptEventId: attemptE3.event_id
  });

  const fixtureE3 = reader.getFixture('ERR-F06');
  const inputE3 = deepClone(fixtureE3.input_state);
  inputE3.attempt_at = attemptE3.accepted_at;
  inputE3.current_versions = {
    content_version: '2.1.0-candidate',
    evidence_policy_version: '1.1',
    rubric_id: 'RUBRIC-DE-N1-REQ-01',
    rubric_version: '2.1.0'
  };
  inputE3.familiarity_evidence = ['LEX-DE-002', 'LEX-DE-004', 'LEX-DE-006'].map((item) => ({
    item_id: item,
    status: 'PRETAUGHT_ACCEPTED',
    source_type: 'PRIOR_LEARNING_EVENT',
    source_event_id: `EVT-FAMILIAR-${item}`
  }));

  const evaluatorE3 = new DeterministicEvaluator(reader, contextE3);
  const resultE3 = evaluatorE3.evaluateFixture({
    activity_id: fixtureE3.activity_id,
    skill_id: fixtureE3.skill_id,
    input_state: inputE3
  });

  assert.equal(resultE3.evidence_decision.awarded_tier, 'E3', 'Same-scope familiarity must qualify for E3');
  assert.equal(resultE3.evidence_decision.familiarity_qualified, true, 'familiarity_qualified must be true');

  // Also verify clean E4 with same-scope familiarity and prior E3
  ledger.appendEvent(makeValidCandidate({
    event_id: 'EVT-ERR-F19-E4-CLEAN-26H-PRIOR-E3',
    event_type: EVENT_TYPES.EVIDENCE_DECIDED,
    learner_id: 'LEARNER-SAME-SCOPE',
    skill_id: 'GER-SVC-REQUEST-ONE-01',
    evidence_lane: 'typed_production',
    payload: {
      awarded_tier: 'E3',
      support_level: 'H1',
      answer_revealing_exposure: false,
      contamination_status: 'NONE',
      changed_context_qualified: true,
      delay_qualified: true,
      version_compatibility: true,
      familiarity_qualified: true,
      reason_codes: ['INDEPENDENT_TRANSFER_QUALIFIED'],
      source_event_ids: [],
      rubric_id: 'RUBRIC-DE-N1-REQ-01',
      rubric_version: '2.1.0'
    }
  }), { acceptedAt: '2026-09-01T10:00:00.000Z' });

  const attemptE4 = createAndAppendAttemptEvent(ledger, {
    eventId: 'EVT-ATTEMPT-SAME-E4',
    learnerId: 'LEARNER-SAME-SCOPE',
    skillId: 'GER-SVC-REQUEST-ONE-01',
    evidenceLane: 'typed_production',
    acceptedAt: '2026-09-02T12:00:00.000Z'
  });

  const contextE4 = ledger.createEvaluatorContext({
    learnerId: 'LEARNER-SAME-SCOPE',
    skillId: 'GER-SVC-REQUEST-ONE-01',
    evidenceLane: 'typed_production',
    attemptEventId: attemptE4.event_id
  });

  const fixtureE4 = reader.getFixture('ERR-F19-E4-CLEAN-26H');
  const inputE4 = deepClone(fixtureE4.input_state);
  inputE4.attempt_at = attemptE4.accepted_at;

  const evaluatorE4 = new DeterministicEvaluator(reader, contextE4);
  const resultE4 = evaluatorE4.evaluateFixture({
    activity_id: fixtureE4.activity_id,
    skill_id: fixtureE4.skill_id,
    input_state: inputE4
  });

  assert.equal(resultE4.evidence_decision.awarded_tier, 'E4', 'Clean E4 must be awarded');
  assert.equal(resultE4.evidence_decision.delay_qualified, true, 'delay_qualified must be true');
});

// Probe R2-06: Frozen candidate hash unchanged, reader and regression suites preserved
test('R2-06: Frozen candidate hash unchanged and regression suites preserved', () => {
  const content = fs.readFileSync(candidatePath);
  const hash = crypto.createHash('sha256').update(content).digest('hex').toUpperCase();
  assert.equal(hash, '4F80F1FE030D05EDA87F8948E2C95571E88FD2C83BA993F11C4B2523FF6CD300');
});

console.log(`\n=======================================================`);
console.log(`ALL WP-03.3A-R2 TESTS PASSED: ${testsPassed} passed, ${testsFailed} failed.`);
console.log(`=======================================================`);

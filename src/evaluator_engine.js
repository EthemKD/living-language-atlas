'use strict';

/**
 * Deterministic, rubric-led evaluator for the canonical German content pack.
 * WP-03.2R2 hardened implementation adhering strictly to normative evidence policy.
 */
class DeterministicEvaluator {
  constructor(reader, options = {}) {
    if (!reader || !reader.pack) throw new Error('A loaded CanonicalContentReader is required');
    this.reader = reader;
    this.options = options;
  }

  evaluateFixture(fixture, runOptions = {}) {
    const state = fixture.input_state || {};
    const activity = fixture.activity_id ? this.reader.getActivity(fixture.activity_id) : null;
    const attempt = this.evaluateAttempt({ activity, skillId: fixture.skill_id, state });
    const mergedOptions = { ...this.options, ...runOptions };
    return {
      attempt_evaluation: attempt,
      evidence_decision: this.evaluateEvidence({ activity, skillId: fixture.skill_id, state, attempt, options: mergedOptions })
    };
  }

  evaluateAttempt({ activity, skillId, state = {} }) {
    const raw = state.raw_input;
    if (typeof raw !== 'string' || raw.includes('\u0000')) {
      return unscored(['TECHNICAL_UNCERTAINTY'], 'TECHNICAL_UNCERTAINTY', raw);
    }
    if (state.applied_normalization) {
      return unscored(['INVALID_NORMALIZATION_RULE'], 'TECHNICAL_UNCERTAINTY', raw);
    }
    const normalized = normalize(raw);
    const rubric = rubricFor(this.reader, activity, skillId);
    if (!rubric) {
      return unscored(['RUBRIC_MISSING'], 'TECHNICAL_UNCERTAINTY', raw, normalized);
    }
    const accepted = rubric.accepted_variants.find((form) => normalize(form.surface_form) === normalized);
    if (accepted) {
      if (activity?.evaluator_rule && state.rubric_version_used && state.rubric_version_used !== activity.evaluator_rule.rubric_version) {
        return { ...unscored([], 'TECHNICAL_UNCERTAINTY', raw, normalized), matched_variant_id: accepted.variant_id };
      }
      if (state.response_modality_attempted === 'spoken') {
        return { ...unscored([], 'UNSUPPORTED_EVALUATOR', raw, normalized), matched_variant_id: accepted.variant_id };
      }
      return formOutcome(accepted, 'variant_id', raw, normalized);
    }
    const rejected = rubric.noncanonical_forms.find((form) => normalize(form.form) === normalized);
    if (rejected) {
      return formOutcome(rejected, 'noncanonical_id', raw, normalized);
    }
    return unscored([], 'REVIEW_REQUIRED', raw, normalized);
  }

  evaluateEvidence({ activity, skillId, state = {}, attempt, options = {} }) {
    // 1. Runtime Activity Context validation (R2-07, ERR-F05)
    if (!activity || state.runtime_activity_context_present === false) {
      const base = createBaseDecision({
        activityId: null,
        skillId,
        lane: state.current_evidence_lane || 'typed_production',
        capability: 'E0',
        support: 'H0',
        exposure: false,
        contamination: 'NONE',
        changed: false,
        delayQualified: false,
        versionOK: false,
        familiarityQualified: false,
        sourceEventIds: sourceEventIds(state)
      });
      return decide(base, 'NONE', ['MISSING_ACTIVITY_RUNTIME_CONTEXT']);
    }

    // 2. Activity-Skill Binding validation
    if (skillId && activity.skill_id !== skillId) {
      const base = createBaseDecision({
        activityId: activity.activity_id,
        skillId,
        lane: state.current_evidence_lane || activity.evidence_lane || 'typed_production',
        capability: activity.evidence_capability || 'E0',
        support: activity.support_level || 'H0',
        exposure: false,
        contamination: 'NONE',
        changed: false,
        delayQualified: false,
        versionOK: false,
        familiarityQualified: false,
        sourceEventIds: sourceEventIds(state)
      });
      return decide(base, 'NONE', ['ACTIVITY_SKILL_MISMATCH']);
    }

    const declaredSupport = state.activity_support_level;
    const effectiveSupport = state.effective_support_level;
    const resolvedSupport = state.classification_resolution?.derived_support_level;
    const rawSupport = resolvedSupport || effectiveSupport || declaredSupport || activity.support_level || 'H0';
    // Lower support declaration cannot override visible assistance (max support level rule)
    const support = maxSupportLevel(rawSupport, activity.support_level, effectiveSupport, declaredSupport);

    const capability = state.classification_resolution?.derived_evidence_capability || activity.evidence_capability || 'E0';
    const activityLane = activity.evidence_lane || 'typed_production';
    const attemptedLane = state.current_evidence_lane || activityLane;

    const exposure = Boolean(state.answer_revealed || state.invalid_activity_declaration?.declared_answer_revealing_exposure);
    const contamination = (exposure && capability !== 'E0') ? 'CONTAMINATED' : 'NONE';

    const changed = evaluateChangedContext(activity, capability, state, this.reader);
    const familiar = evaluateFamiliarity(activity, state, capability, this.reader, options);
    const preflightDelay = e4DelayQualification(activity, state, attempt, skillId, options);

    const versionCheck = checkCurrentVersionCompatibility(activity, state, attempt, this.reader);
    const versionOK = versionCheck.ok;

    const base = createBaseDecision({
      activityId: activity.activity_id,
      skillId,
      lane: attemptedLane,
      capability,
      support,
      exposure,
      contamination,
      changed,
      delayQualified: preflightDelay,
      versionOK,
      familiarityQualified: familiar,
      sourceEventIds: sourceEventIds(state)
    });

    // 3. Lane & Modality spoofing and compatibility protection (R2-08, R3-01)
    if (state.current_evidence_lane && state.current_evidence_lane !== activityLane) {
      return decide(base, 'NONE', state.current_evidence_lane === 'spoken_production'
        ? ['UNSUPPORTED_EVALUATOR_IN_SPOKEN_LANE']
        : ['UNSUPPORTED_EVALUATOR_LANE']);
    }
    if (activityLane !== 'typed_production') {
      return decide(base, 'NONE', activityLane === 'spoken_production'
        ? ['UNSUPPORTED_EVALUATOR_IN_SPOKEN_LANE']
        : ['UNSUPPORTED_EVALUATOR_LANE']);
    }
    if (state.response_modality_attempted && state.response_modality_attempted !== (activity.response_modality || 'typed')) {
      return decide(base, 'NONE', state.response_modality_attempted === 'spoken'
        ? ['UNSUPPORTED_EVALUATOR_IN_SPOKEN_LANE']
        : ['LANE_MODALITY_MISMATCH']);
    }
    if (attemptedLane === 'spoken_production' || state.response_modality_attempted === 'spoken') {
      return decide(base, 'NONE', ['UNSUPPORTED_EVALUATOR_IN_SPOKEN_LANE']);
    }

    // 4. Version compatibility
    if (!versionOK) {
      return decide(base, 'NONE', [versionCheck.reason || 'RUBRIC_VERSION_MISMATCH']);
    }

    // 5. Attempt evaluation failures
    if (attempt.evaluation_outcome === 'unscored') {
      return decide(base, 'NONE', [attempt.evaluator_confidence_bucket === 'UNSUPPORTED_EVALUATOR' ? 'UNSUPPORTED_EVALUATOR_IN_SPOKEN_LANE' : 'UNSCORED_PREREQUISITE_MISSING']);
    }
    if (attempt.evaluation_outcome === 'failed_critical') {
      return decide(base, 'NONE', capability === 'E4'
        ? ['FAILED_CRITICAL_RETURN_ATTEMPT', 'PRESERVE_HISTORICAL_E3', 'TRANSITION_ATTENTION_STATE_NEEDS_REPAIR']
        : ['FAILED_CRITICAL_REGISTER_MISMATCH']);
    }

    // 6. Universal Target Referent Check (R2-06, ERR-F14, Probe 7)
    // Wrong required referent blocks task-evidence awards even when context/delay is also invalid.
    const rubric = rubricFor(this.reader, activity, skillId);
    const matchedVariant = attempt.matched_variant_id && rubric ? rubric.accepted_variants.find((v) => v.variant_id === attempt.matched_variant_id) : null;
    if (activity.evaluator_rule?.exact_target_item_required && matchedVariant) {
      if (matchedVariant.intended_item_id && matchedVariant.intended_item_id !== activity.evaluator_rule.target_item_id) {
        return decide(base, 'NONE', ['WRONG_REFERENT']);
      }
    }

    // 7. Minor-form and review confidence boundary (Probe 9)
    if (attempt.evaluator_confidence_bucket === 'REVIEW_REQUIRED' || (matchedVariant && matchedVariant.form_evidence_allowed === false)) {
      return decide(base, 'NONE', ['REVIEW_REQUIRED_FORM_EVIDENCE_DISALLOWED']);
    }

    // 8. Familiarity requirement (R3-05, R3-06)
    if (!familiar) {
      return decide(base, 'NONE', ['UNSCORED_PREREQUISITE_MISSING']);
    }

    // 9. Capability dispatch
    if (capability === 'E0') {
      return decide(base, 'E0', ['MODEL_EXPOSURE_RECLASSIFIED_H4_E0']);
    }

    if (capability === 'E1') {
      return decide(base, 'NONE', ['UNSUPPORTED_E1_RECOGNITION_DISPATCH']);
    }

    if (capability === 'E2') {
      return base.contamination_status === 'CONTAMINATED'
        ? decide(base, 'E0', ['CONTAMINATED_RETRY_BLOCKED_FROM_E2'])
        : decide(base, 'E2', ['SUPPORTED_PRODUCTION_H3']);
    }

    if (capability === 'E3') {
      if (base.contamination_status === 'CONTAMINATED' || support === 'H4') {
        return decide(base, 'E0', ['CONTAMINATED_RETRY_BLOCKED_FROM_E3']);
      }
      if (!changed) {
        return decide(base, 'E2', ['INVALID_CHANGED_DIMENSIONS_DELAY_IS_NOT_CONTEXT']);
      }
      // H2 and H3 cannot grant independent E3 (R2-01)
      if (support === 'H2') {
        return decide(base, 'E2', [skillId === 'GER-SVC-REPAIR-01' ? 'EXPLICIT_STRATEGY_INSTRUCTION_CAPS_AT_E2' : 'TARGET_BEARING_CUE_CAPS_AT_E2']);
      }
      if (support === 'H3') {
        return decide(base, 'E2', ['SUPPORTED_PRODUCTION_H3']);
      }
      if (state.classification_resolution) {
        return decide(base, 'E3', ['SEMANTIC_GOAL_PROMPT_RECLASSIFIED_H1']);
      }
      return decide(base, 'E3', [skillId === 'GER-SVC-REPAIR-01' ? 'TYPED_REPAIR_SIMULATION_QUALIFIED_E3' : 'INDEPENDENT_TRANSFER_QUALIFIED']);
    }

    return evaluateE4(base, activity, state, attempt, rubric, skillId, this.reader, options);
  }
}

function evaluateChangedContext(activity, capability, state, reader) {
  // If explicitly declared claims contain delay, reject delay
  if (state.changed_dimensions_claimed) {
    const validDims = state.changed_dimensions_claimed.filter((d) => typeof d === 'string' && !d.toLowerCase().includes('delay'));
    if (validDims.length < 2) return false;
  }

  // If context_change_evidence is provided in state (R2-09)
  if (state.context_change_evidence) {
    const cce = state.context_change_evidence;
    const baseVec = cce.baseline_context_vector;
    const currVec = cce.current_context_vector;

    // Declarations alone without complete vectors are insufficient (R2-09, R3-04)
    if (!baseVec || !currVec) {
      return false;
    }

    // Stable intent requirement
    if (baseVec.intent_code !== currVec.intent_code) return false;

    // Count real, defined dimension differences
    const dims = ['venue', 'referent_or_information_slot', 'interlocutor', 'dialogue_position', 'prompt_surface', 'stimulus_modality', 'distractor_set'];
    let diffCount = 0;
    let semanticDiff = false;

    for (const dim of dims) {
      const bVal = baseVec[dim];
      const cVal = currVec[dim];
      // Missing values must not count as changes
      if (bVal !== undefined && bVal !== null && bVal !== '' && cVal !== undefined && cVal !== null && cVal !== '' && bVal !== cVal) {
        diffCount++;
        if (dim === 'referent_or_information_slot') {
          semanticDiff = true;
        }
      }
    }

    return diffCount >= 2 && semanticDiff;
  }

  // If not provided in state, resolve from genuine canonical activities if baseline exists
  if (activity && activity.baseline_activity_id && reader) {
    const baselineAct = reader.getActivity(activity.baseline_activity_id);
    if (baselineAct && baselineAct.context_vector && activity.context_vector) {
      const bVec = baselineAct.context_vector;
      const cVec = activity.context_vector;
      if (bVec.intent_code !== cVec.intent_code) return false;

      const dims = ['venue', 'referent_or_information_slot', 'interlocutor', 'dialogue_position', 'prompt_surface', 'stimulus_modality', 'distractor_set'];
      let diffCount = 0;
      let semanticDiff = false;
      for (const dim of dims) {
        const bVal = bVec[dim];
        const cVal = cVec[dim];
        if (bVal !== undefined && bVal !== null && bVal !== '' && cVal !== undefined && cVal !== null && cVal !== '' && bVal !== cVal) {
          diffCount++;
          if (dim === 'referent_or_information_slot') semanticDiff = true;
        }
      }
      return diffCount >= 2 && semanticDiff;
    }
  }

  return false;
}

function getEventResolver(options = {}) {
  if (typeof options.eventResolver === 'function') {
    return options.eventResolver;
  }
  if (options.eventResolver && typeof options.eventResolver.resolveEvent === 'function') {
    return (id) => options.eventResolver.resolveEvent(id);
  }
  if (Array.isArray(options.eventLedger)) {
    return (eventId) => options.eventLedger.find((e) => e && e.event_id === eventId) || null;
  }
  return null;
}

function getAuthoritativeLatestReveal(options = {}, skillId, activityId, attemptTime) {
  if (options.latestAnswerRevealingExposureEvent !== undefined) {
    return options.latestAnswerRevealingExposureEvent;
  }
  if (options.latestRevealEvent !== undefined) {
    return options.latestRevealEvent;
  }
  if (options.eventResolver) {
    if (typeof options.eventResolver.getLatestAnswerRevealingExposure === 'function') {
      return options.eventResolver.getLatestAnswerRevealingExposure(skillId, activityId, attemptTime);
    }
    if (options.eventResolver.latestAnswerRevealingExposureEvent !== undefined) {
      return options.eventResolver.latestAnswerRevealingExposureEvent;
    }
  }
  return undefined;
}

function parseStrictUtcIsoTimestamp(value) {
  if (typeof value !== 'string') return null;
  // Accept canonical UTC ISO-8601/RFC3339 strings only:
  // YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.sssZ
  const match = /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])T([01]\d|2[0-3]):([0-5]\d):([0-5]\d)(?:\.(\d{3}))?Z$/.exec(value);
  if (!match) return null;

  const year = parseInt(match[1], 10);
  const month = parseInt(match[2], 10);
  const day = parseInt(match[3], 10);
  const hour = parseInt(match[4], 10);
  const minute = parseInt(match[5], 10);
  const second = parseInt(match[6], 10);
  const ms = match[7] ? parseInt(match[7], 10) : 0;

  // Calendar day validation (handling leap years and month lengths)
  const isLeap = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  const maxDays = [0, 31, isLeap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (day > maxDays[month]) return null;

  const epochMs = Date.UTC(year, month - 1, day, hour, minute, second, ms);
  if (isNaN(epochMs)) return null;

  return epochMs;
}

const KNOWN_MARKER_FIELDS = ['status', 'outcome', 'evaluation_outcome', 'result', 'verdict'];

const ALLOWED_POSITIVE_LEARNING_MARKERS = new Set([
  'PRETAUGHT_ACCEPTED',
  'ACCEPTED',
  'COMPLETED',
  'PASSED',
  'SUCCESS',
  'MASTERED',
  'accepted_clean',
  'accepted',
  'completed',
  'passed',
  'success',
  'mastered',
  'pass',
  'PASS'
]);

const ALLOWED_POSITIVE_RECOGNITION_MARKERS = new Set([
  'PREVIOUSLY_RECOGNIZED',
  'ACCEPTED',
  'COMPLETED',
  'PASSED',
  'SUCCESS',
  'RECOGNIZED',
  'accepted_clean',
  'accepted',
  'completed',
  'passed',
  'recognized',
  'success',
  'pass',
  'PASS'
]);

const ALLOWED_POSITIVE_PRIOR_E3_MARKERS = new Set([
  'COMPLETED',
  'ACCEPTED',
  'PASSED',
  'SUCCESS',
  'QUALIFIED',
  'VERIFIED',
  'AWARDED',
  'accepted_clean',
  'accepted',
  'completed',
  'passed',
  'success',
  'qualified',
  'verified',
  'awarded',
  'pass',
  'PASS'
]);

const EXPLICIT_NEGATIVE_MARKERS = new Set([
  'failed',
  'rejected',
  'incorrect',
  'revoked',
  'invalid',
  'error',
  'failed_critical',
  'unscored',
  'contaminated'
]);

function hasExplicitNegativeMarker(ev) {
  if (!ev || typeof ev !== 'object') return false;
  const fields = [
    ev.status,
    ev.outcome,
    ev.evaluation_outcome,
    ev.result,
    ev.verdict
  ];
  for (const f of fields) {
    if (typeof f === 'string') {
      const lower = f.toLowerCase().trim();
      if (EXPLICIT_NEGATIVE_MARKERS.has(lower)) {
        return true;
      }
    }
  }
  return false;
}

function validateEventMarkerFields(ev, allowedSet) {
  if (!ev || typeof ev !== 'object') return null;
  let presentCount = 0;
  for (const field of KNOWN_MARKER_FIELDS) {
    if (ev[field] !== undefined && ev[field] !== null) {
      presentCount++;
      if (typeof ev[field] !== 'string') return null;
      // Strict case-sensitive match against declared allowed positive set
      if (!allowedSet.has(ev[field])) {
        return null;
      }
    }
  }
  return { valid: true, presentCount };
}

function isPositivePriorLearning(ev) {
  if (!ev || typeof ev !== 'object') return false;
  if (hasExplicitNegativeMarker(ev)) return false;
  const check = validateEventMarkerFields(ev, ALLOWED_POSITIVE_LEARNING_MARKERS);
  if (!check || !check.valid) return false;
  // Must carry at least one explicit allowed positive marker field
  return check.presentCount > 0;
}

function isPositivePriorRecognition(ev) {
  if (!ev || typeof ev !== 'object') return false;
  if (hasExplicitNegativeMarker(ev)) return false;
  const check = validateEventMarkerFields(ev, ALLOWED_POSITIVE_RECOGNITION_MARKERS);
  if (!check || !check.valid) return false;
  // Recognition requires an explicit accepted status/outcome or awarded_tier: E1
  const hasAwardedE1 = ev.awarded_tier === 'E1' || ev.tier === 'E1';
  return check.presentCount > 0 || hasAwardedE1;
}

function isPositivePriorE3(ev) {
  if (!ev || typeof ev !== 'object') return false;
  if (hasExplicitNegativeMarker(ev)) return false;
  const tier = ev.awarded_tier || ev.tier;
  if (tier !== 'E3') return false;
  // All present marker fields must belong to the allowed positive set for prior E3
  const check = validateEventMarkerFields(ev, ALLOWED_POSITIVE_PRIOR_E3_MARKERS);
  return Boolean(check && check.valid);
}

function getAuthoritativeAttemptTime(state, options = {}) {
  const authVal = options.authoritativeAttemptAt;
  if (typeof authVal !== 'string') {
    return { valid: false, reason: 'MISSING_AUTHORITATIVE_ATTEMPT_TIME' };
  }
  const authMs = parseStrictUtcIsoTimestamp(authVal);
  if (authMs === null) {
    return { valid: false, reason: 'INVALID_AUTHORITATIVE_ATTEMPT_TIME' };
  }

  // state.attempt_at is an untrusted claim: if present it must be strict and exactly equal to authoritative value
  if (state && state.attempt_at !== undefined) {
    if (typeof state.attempt_at !== 'string') {
      return { valid: false, reason: 'ATTEMPT_TIME_MISMATCH' };
    }
    const stateMs = parseStrictUtcIsoTimestamp(state.attempt_at);
    if (stateMs === null) {
      return { valid: false, reason: 'ATTEMPT_TIME_MISMATCH' };
    }
    if (stateMs !== authMs || state.attempt_at !== authVal) {
      return { valid: false, reason: 'ATTEMPT_TIME_MISMATCH' };
    }
  }

  // State omission allowed because host authority is sufficient
  return { valid: true, timeMs: authMs, isoString: authVal };
}

function checkCurrentVersionCompatibility(activity, state, attempt, reader) {
  if (state.applied_normalization) {
    return { ok: false, reason: 'INVALID_NORMALIZATION_APPLIED' };
  }
  if (attempt.error_codes.includes('TECHNICAL_UNCERTAINTY')) {
    return { ok: false, reason: 'TECHNICAL_PAYLOAD_CORRUPTED' };
  }
  if (activity.evaluator_rule && state.rubric_version_used && state.rubric_version_used !== activity.evaluator_rule.rubric_version) {
    return { ok: false, reason: 'RUBRIC_VERSION_MISMATCH' };
  }

  const expectedContentVersion = reader?.pack?.content_version || '2.1.0-candidate';
  const expectedPolicyVersion = reader?.pack?.evidence_policy_version || '1.1';
  const expectedRubricId = activity.evaluator_rule?.rubric_id || (activity.skill_id === 'GER-SVC-REPAIR-01' ? 'RUBRIC-DE-N2-REP-01' : 'RUBRIC-DE-N1-REQ-01');
  const expectedRubricVersion = activity.evaluator_rule?.rubric_version || '2.1.0';

  // current_versions is a required complete tuple for award-bearing attempts (R5 Blocker 2)
  const cv = state.current_versions;
  if (!cv || typeof cv !== 'object') {
    return { ok: false, reason: 'RUBRIC_VERSION_MISMATCH' };
  }
  if (typeof cv.content_version !== 'string' || cv.content_version !== expectedContentVersion) {
    return { ok: false, reason: 'RUBRIC_VERSION_MISMATCH' };
  }
  if (typeof cv.evidence_policy_version !== 'string' || cv.evidence_policy_version !== expectedPolicyVersion) {
    return { ok: false, reason: 'RUBRIC_VERSION_MISMATCH' };
  }
  if (typeof cv.rubric_id !== 'string' || (expectedRubricId && cv.rubric_id !== expectedRubricId)) {
    return { ok: false, reason: 'RUBRIC_VERSION_MISMATCH' };
  }
  if (typeof cv.rubric_version !== 'string' || (expectedRubricVersion && cv.rubric_version !== expectedRubricVersion)) {
    return { ok: false, reason: 'RUBRIC_VERSION_MISMATCH' };
  }

  // Validate current activity/skill/lane bindings if present in state
  if (state.current_activity_id && state.current_activity_id !== activity.activity_id) {
    return { ok: false, reason: 'RUBRIC_VERSION_MISMATCH' };
  }
  if (state.current_skill_id && state.current_skill_id !== activity.skill_id) {
    return { ok: false, reason: 'RUBRIC_VERSION_MISMATCH' };
  }

  return { ok: true };
}

function evaluateFamiliarity(activity, state, capability, reader, options = {}) {
  if (!activity) return false;
  if (state.item_familiarity === 'UNTAUGHT_NO_RECORD') return false;

  const required = activity.required_familiarity_items || [];
  if (required.length === 0) return true;

  const resolver = getEventResolver(options);

  // Runtime evidence MUST be supplied in state or resolved via injected trust ledger.
  // Pack metadata shortcut is removed per WP-03.2R3 instructions.
  let famEvidence = state.familiarity_evidence;
  if (famEvidence === undefined && resolver && Array.isArray(options.eventLedger)) {
    famEvidence = resolveFamiliarityFromLedger(required, options.eventLedger);
  }
  if (!Array.isArray(famEvidence) || famEvidence.length === 0) {
    return false;
  }

  // Validate every required item's permitted status, source and proof (R2-03, R3-06, R4 Blocker 1, R5 Blocker 5, R6 Blocker 1-4)
  for (const req of required) {
    const rec = famEvidence.find((e) => e && e.item_id === req.item_id);
    if (!rec) return false;

    // Bare IDs without status/source are malformed and insufficient (R2-03)
    if (typeof rec.status !== 'string' || typeof rec.source_type !== 'string') {
      return false;
    }

    const permittedStatuses = ['PRETAUGHT_ACCEPTED', 'VISIBLE_IN_NATURAL_CONTEXT', 'PREVIOUSLY_RECOGNIZED'];
    if (!permittedStatuses.includes(rec.status)) return false;

    const permittedSources = ['PRIOR_LEARNING_EVENT', 'CURRENT_ACTIVITY_VISIBLE_CONTENT', 'PRIOR_RECOGNITION_EVENT'];
    if (!permittedSources.includes(rec.source_type)) return false;

    if (rec.status === 'PRETAUGHT_ACCEPTED') {
      if (rec.source_type !== 'PRIOR_LEARNING_EVENT') return false;
      if (typeof rec.source_event_id !== 'string' || !/^EVT-[A-Za-z0-9_-]+$/.test(rec.source_event_id)) {
        return false;
      }
      // Resolver omission or unresolvable event fails to establish historical evidence
      if (!resolver) {
        return false;
      }
      const ev = resolver(rec.source_event_id);
      if (!ev || typeof ev !== 'object') return false;

      // Exact requested event_id check (R6 Blocker 5)
      if (ev.event_id !== rec.source_event_id) {
        return false;
      }

      const evItemId = ev.item_id || ev.target_item_id;
      if (evItemId !== req.item_id) return false;

      // Centralized success validation (R6 Blocker 3 & 4)
      if (!isPositivePriorLearning(ev)) {
        return false;
      }

      // Mandatory valid attempt_at for history-dependent decisions (WP-03.2R7)
      const authTime = getAuthoritativeAttemptTime(state, options);
      if (!authTime.valid) {
        return false;
      }
      const attemptTime = authTime.timeMs;

      // Mandatory valid occurred_at on resolved event (R6 Blocker 2)
      const evTime = parseStrictUtcIsoTimestamp(ev.occurred_at);
      if (evTime === null) {
        return false;
      }

      // Chronology: historical time strictly before attempt (equal or future fails)
      if (evTime >= attemptTime) {
        return false;
      }
    } else if (rec.status === 'PREVIOUSLY_RECOGNIZED') {
      if (rec.source_type !== 'PRIOR_RECOGNITION_EVENT') return false;
      if (typeof rec.source_event_id !== 'string' || !/^EVT-[A-Za-z0-9_-]+$/.test(rec.source_event_id)) {
        return false;
      }
      // Resolver omission or unresolvable event fails to establish historical evidence
      if (!resolver) {
        return false;
      }
      const ev = resolver(rec.source_event_id);
      if (!ev || typeof ev !== 'object') return false;

      // Exact requested event_id check (R6 Blocker 5)
      if (ev.event_id !== rec.source_event_id) {
        return false;
      }

      const evItemId = ev.item_id || ev.target_item_id;
      if (evItemId !== req.item_id) return false;

      // Centralized success validation (R6 Blocker 3 & 4)
      if (!isPositivePriorRecognition(ev)) {
        return false;
      }

      // Mandatory valid attempt_at for history-dependent decisions (WP-03.2R7)
      const authTime = getAuthoritativeAttemptTime(state, options);
      if (!authTime.valid) {
        return false;
      }
      const attemptTime = authTime.timeMs;

      // Mandatory valid occurred_at on resolved event (R6 Blocker 2)
      const evTime = parseStrictUtcIsoTimestamp(ev.occurred_at);
      if (evTime === null) {
        return false;
      }

      // Chronology: historical time strictly before attempt (equal or future fails)
      if (evTime >= attemptTime) {
        return false;
      }
    } else if (rec.status === 'VISIBLE_IN_NATURAL_CONTEXT') {
      // Current-activity visibility is resolved locally where permitted (does not require historical event)
      if (rec.source_type !== 'CURRENT_ACTIVITY_VISIBLE_CONTENT') return false;
      if (typeof rec.source_path !== 'string' || !rec.source_path) return false;
      const fieldName = rec.source_path.includes('/') ? rec.source_path.split('/').pop() : rec.source_path;
      const targetContent = activity[fieldName] || activity[rec.source_path];
      if (typeof targetContent !== 'string') return false;
      const lemma = reader?.getLexicalItem(req.item_id)?.lemma;
      const matchesContent = targetContent.includes(req.item_id) || (lemma && targetContent.includes(lemma));
      if (!matchesContent) return false;
    }
  }
  return true;
}

function resolveFamiliarityFromLedger(requiredItems, ledger) {
  if (!Array.isArray(ledger)) return null;
  const records = [];
  for (const req of requiredItems) {
    const event = ledger.find((e) => e && (e.item_id === req.item_id || e.target_item_id === req.item_id) && (e.status === 'PRETAUGHT_ACCEPTED' || e.status === 'PREVIOUSLY_RECOGNIZED'));
    if (event) {
      records.push({
        item_id: event.item_id || event.target_item_id,
        status: event.status,
        source_type: event.status === 'PRETAUGHT_ACCEPTED' ? 'PRIOR_LEARNING_EVENT' : 'PRIOR_RECOGNITION_EVENT',
        source_event_id: event.event_id
      });
    }
  }
  return records;
}

function checkAuthoritativeCleanDelay(activity, state, attempt, skillId, options = {}) {
  const policy = activity?.e4_eligibility_policy;
  if (!policy) return { qualified: false, reason: 'MISSING_E4_POLICY' };

  const resolver = getEventResolver(options);
  if (!resolver) return { qualified: false, reason: 'MISSING_PRIOR_E3_RECORD' };

  const prior = state?.prior_e3_event;
  const priorEventId = (prior && prior.event_id) || state?.prior_e3_event_id;
  if (!priorEventId || typeof priorEventId !== 'string') return { qualified: false, reason: 'MISSING_PRIOR_E3_RECORD' };

  const resolvedPrior = resolver(priorEventId);
  if (!resolvedPrior || typeof resolvedPrior !== 'object' || resolvedPrior.event_id !== priorEventId) {
    return { qualified: false, reason: 'MISSING_PRIOR_E3_RECORD' };
  }

  // Centralized success validation on resolved prior E3 (R6 Blocker 3 & 4)
  if (!isPositivePriorE3(resolvedPrior)) {
    return { qualified: false, reason: 'MISSING_PRIOR_E3_RECORD' };
  }
  if (hasExplicitNegativeMarker(prior)) {
    return { qualified: false, reason: 'MISSING_PRIOR_E3_RECORD' };
  }

  // Contradiction checks between declared state and authoritative resolved object (R6 Requirement 5)
  if (prior && prior.event_id && prior.event_id !== resolvedPrior.event_id) {
    return { qualified: false, reason: 'MISSING_PRIOR_E3_RECORD' };
  }
  if (state.prior_e3_event_id && state.prior_e3_event_id !== resolvedPrior.event_id) {
    return { qualified: false, reason: 'MISSING_PRIOR_E3_RECORD' };
  }

  const resolvedTier = resolvedPrior.awarded_tier || resolvedPrior.tier;
  if (resolvedTier !== policy.prior_tier) return { qualified: false, reason: 'MISSING_PRIOR_E3_RECORD' };
  if (prior && prior.awarded_tier && prior.awarded_tier !== resolvedTier) {
    return { qualified: false, reason: 'MISSING_PRIOR_E3_RECORD' };
  }

  const priorSkill = resolvedPrior.skill_id;
  if (policy.prior_same_skill && priorSkill !== (skillId || activity.skill_id)) {
    return { qualified: false, reason: 'CROSS_SKILL_PRIOR_E3_INVALID' };
  }
  if (prior && prior.skill_id && prior.skill_id !== priorSkill) {
    return { qualified: false, reason: 'CROSS_SKILL_PRIOR_E3_INVALID' };
  }
  if (state.prior_e3_skill_id && state.prior_e3_skill_id !== priorSkill) {
    return { qualified: false, reason: 'CROSS_SKILL_PRIOR_E3_INVALID' };
  }

  const priorLane = resolvedPrior.evidence_lane;
  if (policy.prior_same_lane && priorLane !== state.current_evidence_lane) {
    return { qualified: false, reason: 'CROSS_MODAL_PRIOR_E3_INVALID' };
  }
  if (prior && prior.evidence_lane && prior.evidence_lane !== priorLane) {
    return { qualified: false, reason: 'CROSS_MODAL_PRIOR_E3_INVALID' };
  }
  if (state.prior_e3_lane && state.prior_e3_lane !== priorLane) {
    return { qualified: false, reason: 'CROSS_MODAL_PRIOR_E3_INVALID' };
  }

  // Attempt timestamp (must be host-authoritative UTC ISO-8601, WP-03.2R7)
  const authTime = getAuthoritativeAttemptTime(state, options);
  if (!authTime.valid) {
    return { qualified: false, reason: 'DELAY_THRESHOLD_NOT_MET' };
  }
  const attemptTime = authTime.timeMs;

  // Declared prior timestamp validation: if present in state, must be strict ISO and past
  if (prior && prior.occurred_at !== undefined) {
    const declPriorTime = parseStrictUtcIsoTimestamp(prior.occurred_at);
    if (declPriorTime === null || declPriorTime >= attemptTime) {
      return { qualified: false, reason: 'DELAY_THRESHOLD_NOT_MET' };
    }
  } else if (prior && Object.keys(prior).length > 1) {
    return { qualified: false, reason: 'DELAY_THRESHOLD_NOT_MET' };
  }

  // Resolved prior timestamp validation (authoritative for time calculation)
  const resolvedPriorTime = parseStrictUtcIsoTimestamp(resolvedPrior.occurred_at);
  if (resolvedPriorTime === null || resolvedPriorTime >= attemptTime) {
    return { qualified: false, reason: 'DELAY_THRESHOLD_NOT_MET' };
  }

  // Authoritative latest answer-revealing exposure result (evaluated as of authoritative attempt time)
  const latestReveal = getAuthoritativeLatestReveal(options, skillId, activity.activity_id, attemptTime);
  if (latestReveal === undefined) {
    return { qualified: false, reason: 'DELAY_THRESHOLD_NOT_MET' }; // Missing query result: no E4 (Probe 10)
  }

  let revealTime = -Infinity;
  if (latestReveal !== null) {
    const parsedLatestReveal = parseStrictUtcIsoTimestamp(latestReveal.occurred_at);
    if (parsedLatestReveal === null || parsedLatestReveal >= attemptTime) {
      return { qualified: false, reason: 'DELAY_RESET_BY_EXPOSURE' };
    }
    revealTime = parsedLatestReveal;
  }

  // Also check declared state exposure event
  if (state.last_answer_revealing_exposure_event) {
    const exp = state.last_answer_revealing_exposure_event;
    if (!exp.event_id || typeof exp.event_id !== 'string') {
      return { qualified: false, reason: 'DELAY_RESET_BY_EXPOSURE' };
    }
    const declRevealTime = parseStrictUtcIsoTimestamp(exp.occurred_at);
    if (declRevealTime === null || declRevealTime >= attemptTime) {
      return { qualified: false, reason: 'DELAY_RESET_BY_EXPOSURE' };
    }
    revealTime = Math.max(revealTime, declRevealTime);
  } else if (state.seconds_since_last_answer_reveal != null) {
    const declSec = Number(state.seconds_since_last_answer_reveal);
    if (!isNaN(declSec) && declSec >= 0) {
      const declRevealTime = attemptTime - declSec * 1000;
      revealTime = Math.max(revealTime, declRevealTime);
    }
  }

  // Clean delay calculation: attempt - max(priorE3, latestReveal)
  const maxAnchor = Math.max(resolvedPriorTime, revealTime);
  const cleanDelaySeconds = (attemptTime - maxAnchor) / 1000;

  if (cleanDelaySeconds < policy.minimum_clean_delay_seconds) {
    const isReset = revealTime >= resolvedPriorTime || (attemptTime - revealTime) / 1000 < policy.minimum_clean_delay_seconds;
    return { qualified: false, reason: isReset ? 'DELAY_RESET_BY_EXPOSURE' : 'DELAY_THRESHOLD_NOT_MET', cleanDelaySeconds };
  }

  return { qualified: true, cleanDelaySeconds };
}

function e4DelayQualification(activity, state, attempt, skillId, options = {}) {
  const result = checkAuthoritativeCleanDelay(activity, state, attempt, skillId, options);
  return result.qualified;
}

function fallbackFromE4(base, fallbackReason) {
  // An E4 attempt that does not qualify for E4 can only be awarded E3 if it independently qualifies for E3!
  // 1. Support level check: H2 or H3 caps at E2
  if (base.support_level === 'H2') {
    return decide(base, 'E2', ['TARGET_BEARING_CUE_CAPS_AT_E2']);
  }
  if (base.support_level === 'H3') {
    return decide(base, 'E2', ['SUPPORTED_PRODUCTION_H3']);
  }
  // 2. Changed context check: without changed context, cannot award E3! Caps at E2 (R3-04)
  if (!base.changed_context_qualified) {
    return decide(base, 'E2', ['INVALID_CHANGED_DIMENSIONS_DELAY_IS_NOT_CONTEXT']);
  }
  // 3. Current attempt meets all E3 prerequisites (target, support, context, familiarity, lane).
  // Awards E3 maintenance/transfer with the specific reason why E4 was denied.
  return decide(base, 'E3', [fallbackReason]);
}

function evaluateE4(base, activity, state, attempt, rubric, skillId, reader, options = {}) {
  const policy = activity.e4_eligibility_policy;
  if (!policy) return decide(base, 'NONE', ['MISSING_E4_POLICY']);

  if (base.contamination_status === 'CONTAMINATED' || base.support_level === 'H4') {
    return decide(base, 'E0', ['CONTAMINATED_RETRY_BLOCKED_FROM_E4']);
  }

  if (policy.allowed_support_levels && !policy.allowed_support_levels.includes(base.support_level)) {
    return decide(base, 'E2', ['SUPPORT_LEVEL_EXCEEDS_E4_ALLOWANCE']);
  }

  const resolver = getEventResolver(options);
  const prior = state.prior_e3_event;
  if (!prior && !state.prior_e3_event_id) {
    return fallbackFromE4(base, 'MISSING_PRIOR_E3_RECORD');
  }
  if (prior && typeof prior !== 'object') {
    return fallbackFromE4(base, 'MISSING_PRIOR_E3_RECORD');
  }

  // R4 Blocker 1: Historical prior E3 record must resolve against trusted resolver
  if (!resolver) {
    return fallbackFromE4(base, 'MISSING_PRIOR_E3_RECORD');
  }
  const priorEventId = (prior && prior.event_id) || state.prior_e3_event_id;
  if (!priorEventId || typeof priorEventId !== 'string') {
    return fallbackFromE4(base, 'MISSING_PRIOR_E3_RECORD');
  }
  const resolvedPrior = resolver(priorEventId);
  if (!resolvedPrior || typeof resolvedPrior !== 'object' || resolvedPrior.event_id !== priorEventId) {
    return fallbackFromE4(base, 'MISSING_PRIOR_E3_RECORD');
  }

  // Centralized success validation on resolved prior E3 (R6 Blocker 3 & 4)
  if (!isPositivePriorE3(resolvedPrior)) {
    return fallbackFromE4(base, 'MISSING_PRIOR_E3_RECORD');
  }
  if (hasExplicitNegativeMarker(prior)) {
    return fallbackFromE4(base, 'MISSING_PRIOR_E3_RECORD');
  }

  // Contradiction checks (R6 Requirement 5)
  if (prior && prior.event_id && prior.event_id !== resolvedPrior.event_id) {
    return fallbackFromE4(base, 'MISSING_PRIOR_E3_RECORD');
  }
  if (state.prior_e3_event_id && state.prior_e3_event_id !== resolvedPrior.event_id) {
    return fallbackFromE4(base, 'MISSING_PRIOR_E3_RECORD');
  }

  const effectivePriorTier = resolvedPrior.awarded_tier || resolvedPrior.tier;
  if (effectivePriorTier !== policy.prior_tier) {
    return fallbackFromE4(base, 'MISSING_PRIOR_E3_RECORD');
  }
  if (prior && prior.awarded_tier && prior.awarded_tier !== effectivePriorTier) {
    return fallbackFromE4(base, 'MISSING_PRIOR_E3_RECORD');
  }

  const priorSkill = resolvedPrior.skill_id;
  if (policy.prior_same_skill && priorSkill !== (skillId || activity.skill_id)) {
    return fallbackFromE4(base, 'CROSS_SKILL_PRIOR_E3_INVALID');
  }
  if (prior && prior.skill_id && prior.skill_id !== priorSkill) {
    return fallbackFromE4(base, 'CROSS_SKILL_PRIOR_E3_INVALID');
  }
  if (state.prior_e3_skill_id && state.prior_e3_skill_id !== priorSkill) {
    return fallbackFromE4(base, 'CROSS_SKILL_PRIOR_E3_INVALID');
  }

  const priorLane = resolvedPrior.evidence_lane;
  if (policy.prior_same_lane && priorLane !== state.current_evidence_lane) {
    return fallbackFromE4(base, 'CROSS_MODAL_PRIOR_E3_INVALID');
  }
  if (prior && prior.evidence_lane && prior.evidence_lane !== priorLane) {
    return fallbackFromE4(base, 'CROSS_MODAL_PRIOR_E3_INVALID');
  }
  if (state.prior_e3_lane && state.prior_e3_lane !== priorLane) {
    return fallbackFromE4(base, 'CROSS_MODAL_PRIOR_E3_INVALID');
  }

  if (prior && prior.occurred_at === undefined && Object.keys(prior).length > 1) {
    return fallbackFromE4(base, 'DELAY_THRESHOLD_NOT_MET');
  }

  // Validate prior E3 versions compatibility (R2-05, R3-02, R4 Blocker 2, R5 Blocker 2, R6 Requirement 5)
  const expectedContentVersion = reader?.pack?.content_version || '2.1.0-candidate';
  const expectedPolicyVersion = reader?.pack?.evidence_policy_version || '1.1';
  const expectedRubricId = activity.evaluator_rule?.rubric_id || (activity.skill_id === 'GER-SVC-REPAIR-01' ? 'RUBRIC-DE-N2-REP-01' : 'RUBRIC-DE-N1-REQ-01');
  const expectedRubricVersion = activity.evaluator_rule?.rubric_version || '2.1.0';

  if (!resolvedPrior.versions || typeof resolvedPrior.versions !== 'object') {
    return fallbackFromE4(base, 'PRIOR_E3_RUBRIC_INCOMPATIBLE');
  }
  const rpv = resolvedPrior.versions;
  if (typeof rpv.content_version !== 'string' || rpv.content_version !== expectedContentVersion ||
      typeof rpv.evidence_policy_version !== 'string' || rpv.evidence_policy_version !== expectedPolicyVersion ||
      (expectedRubricId && (typeof rpv.rubric_id !== 'string' || rpv.rubric_id !== expectedRubricId)) ||
      (expectedRubricVersion && (typeof rpv.rubric_version !== 'string' || rpv.rubric_version !== expectedRubricVersion))) {
    return fallbackFromE4(base, 'PRIOR_E3_RUBRIC_INCOMPATIBLE');
  }

  if (prior && prior.versions !== undefined) {
    if (!prior.versions || typeof prior.versions !== 'object') {
      return fallbackFromE4(base, 'PRIOR_E3_RUBRIC_INCOMPATIBLE');
    }
    const dpv = prior.versions;
    if (typeof dpv.content_version !== 'string' || dpv.content_version !== expectedContentVersion ||
        typeof dpv.evidence_policy_version !== 'string' || dpv.evidence_policy_version !== expectedPolicyVersion ||
        (expectedRubricId && (typeof dpv.rubric_id !== 'string' || dpv.rubric_id !== expectedRubricId)) ||
        (expectedRubricVersion && (typeof dpv.rubric_version !== 'string' || dpv.rubric_version !== expectedRubricVersion))) {
      return fallbackFromE4(base, 'PRIOR_E3_RUBRIC_INCOMPATIBLE');
    }
  } else if (prior && Object.keys(prior).length > 1) {
    // If state duplicates other metadata but omits versions, fail closed
    return fallbackFromE4(base, 'PRIOR_E3_RUBRIC_INCOMPATIBLE');
  }

  // Authoritative clean delay check (R5 Blocker 3 & 4, R6 strict timestamps)
  const delayCheck = checkAuthoritativeCleanDelay(activity, state, attempt, skillId, options);
  if (!delayCheck.qualified) {
    return fallbackFromE4(base, delayCheck.reason || 'DELAY_THRESHOLD_NOT_MET');
  }

  if (!base.changed_context_qualified) {
    return decide(base, 'E2', ['INVALID_CHANGED_DIMENSIONS_DELAY_IS_NOT_CONTEXT']);
  }

  return decide(base, 'E4', ['DELAYED_RETURN_E4_QUALIFIED']);
}

function maxSupportLevel(...levels) {
  const rank = { H0: 0, H1: 1, H2: 2, H3: 3, H4: 4 };
  let max = 'H0';
  for (const lvl of levels) {
    if (lvl && rank[lvl] !== undefined && rank[lvl] > rank[max]) {
      max = lvl;
    }
  }
  return max;
}

function rubricFor(reader, activity, skillId) {
  const id = activity?.evaluator_rule?.rubric_id || (skillId === 'GER-SVC-REPAIR-01' ? 'RUBRIC-DE-N2-REP-01' : 'RUBRIC-DE-N1-REQ-01');
  return reader.getRubric(id);
}

function normalize(value) {
  return value.normalize('NFC').trim().replace(/\s+/g, ' ');
}

function sourceEventIds(state) {
  const ids = [];
  if (state?.prior_e3_event?.event_id) ids.push(state.prior_e3_event.event_id);
  if (state?.last_answer_revealing_exposure_event?.event_id) ids.push(state.last_answer_revealing_exposure_event.event_id);
  for (const item of state?.familiarity_evidence || []) {
    if (item && item.source_event_id) ids.push(item.source_event_id);
  }
  return ids;
}

function formOutcome(form, idField, raw, normalized) {
  return {
    raw_input: raw,
    normalized_input: normalized,
    matched_variant_id: form[idField],
    evaluation_outcome: form.evaluation_outcome,
    intent_outcome: form.intent_outcome,
    form_outcome: form.form_outcome,
    register_outcome: form.register_outcome,
    error_codes: [...(form.error_codes || [])],
    evaluator_confidence_bucket: form.evaluator_confidence_bucket || (form.evaluation_outcome === 'failed_critical' ? 'HIGH_DETERMINISTIC' : 'REVIEW_REQUIRED')
  };
}

function unscored(errorCodes, confidence, raw, normalized = raw) {
  return {
    raw_input: raw,
    normalized_input: normalized,
    matched_variant_id: null,
    evaluation_outcome: 'unscored',
    intent_outcome: 'uncertain',
    form_outcome: 'uncertain',
    register_outcome: 'uncertain',
    error_codes: [...errorCodes],
    evaluator_confidence_bucket: confidence
  };
}

function createBaseDecision(p) {
  return {
    activity_id: p.activityId,
    skill_id: p.skillId,
    evidence_lane: p.lane,
    evidence_capability: p.capability,
    support_level: p.support,
    answer_revealing_exposure: p.exposure,
    contamination_status: p.contamination,
    changed_context_qualified: p.changed,
    delay_qualified: p.delayQualified,
    version_compatibility: p.versionOK,
    familiarity_qualified: p.familiarityQualified,
    reason_codes: [],
    source_event_ids: [...p.sourceEventIds],
    awarded_tier: 'NONE'
  };
}

function decide(base, tier, reasons) {
  return {
    ...base,
    source_event_ids: [...base.source_event_ids],
    awarded_tier: tier,
    reason_codes: [...reasons]
  };
}

module.exports = {
  DeterministicEvaluator,
  normalize,
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
};

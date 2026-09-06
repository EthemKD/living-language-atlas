'use strict';

/**
 * WP-03.3A In-Memory Learning Event Ledger, Evaluator-Context Adapter & LearnerSkillProjection.
 * Zero-dependency, immutable append-only ledger providing trusted evaluator inputs.
 */

const {
  parseStrictUtcIsoTimestamp
} = require('./evaluator_engine');

const {
  EVENT_TYPES,
  CLOSED_EVENT_TYPES,
  CLOSED_EVIDENCE_LANES,
  ContractValidationError,
  validateEventEnvelope,
  deepClone,
  deepFreeze,
  isNonBlankString
} = require('./learning_event_contract');

function compareEventsCanonical(a, b) {
  const timeA = parseStrictUtcIsoTimestamp(a.accepted_at);
  const timeB = parseStrictUtcIsoTimestamp(b.accepted_at);
  if (timeA !== timeB) {
    return timeA - timeB;
  }
  return a.event_id.localeCompare(b.event_id);
}

function computeCanonicalEventIntent(event) {
  return JSON.stringify({
    event_type: event.event_type,
    learner_id: event.learner_id,
    content_pack_id: event.content_pack_id,
    content_version: event.content_version,
    evidence_policy_version: event.evidence_policy_version,
    activity_id: event.activity_id,
    skill_id: event.skill_id,
    evidence_lane: event.evidence_lane,
    payload: event.payload
  });
}

const TIER_RANKS = Object.freeze({
  NONE: 0,
  E0: 0,
  E1: 1,
  E2: 2,
  E3: 3,
  E4: 4
});

class LearnerSkillProjection {
  constructor({
    learnerId,
    skillId,
    evidenceLane,
    contentVersion,
    evidencePolicyVersion
  }) {
    if (!isNonBlankString(learnerId)) throw new ContractValidationError('learnerId required for projection');
    if (!isNonBlankString(skillId)) throw new ContractValidationError('skillId required for projection');
    if (!CLOSED_EVIDENCE_LANES.has(evidenceLane)) throw new ContractValidationError('valid evidenceLane required for projection');
    if (!isNonBlankString(contentVersion)) throw new ContractValidationError('contentVersion required for projection');
    if (!isNonBlankString(evidencePolicyVersion)) throw new ContractValidationError('evidencePolicyVersion required for projection');

    this.projection_key = `${learnerId}::${skillId}::${evidenceLane}::${contentVersion}::${evidencePolicyVersion}`;
    this.learner_id = learnerId;
    this.skill_id = skillId;
    this.evidence_lane = evidenceLane;
    this.content_version = contentVersion;
    this.evidence_policy_version = evidencePolicyVersion;

    this.highest_tier_awarded = 'NONE';
    this.last_evidence_at = null;
    this.last_attempt_at = null;
    this.last_answer_reveal_at = null;
    this.prior_e3_event_id = null;
    this.e4_qualified = false;
    this.repair_required = false;
    this.repair_due_at = null;
    this.repair_reason_codes = [];
    this.total_attempts_evaluated = 0;
    this.last_evaluation_outcome = null;
    this.events_applied_count = 0;
    this.familiar_items = [];
  }

  applyEvent(event) {
    if (!event || typeof event !== 'object') return;

    // Verify projection scoping
    if (event.learner_id !== this.learner_id) return;
    if (event.content_version !== this.content_version) return;
    if (event.evidence_policy_version !== this.evidence_policy_version) return;

    // Skill & Lane matching (if event carries skill/lane)
    if (event.skill_id !== null && event.skill_id !== this.skill_id) return;
    if (event.evidence_lane !== null && event.evidence_lane !== this.evidence_lane) return;

    switch (event.event_type) {
      case EVENT_TYPES.EVIDENCE_DECIDED: {
        this.events_applied_count++;
        this.total_attempts_evaluated++;
        this.last_attempt_at = event.accepted_at;

        const payload = event.payload || {};
        const tier = payload.awarded_tier || 'NONE';
        const currentRank = TIER_RANKS[this.highest_tier_awarded] || 0;
        const newRank = TIER_RANKS[tier] || 0;

        if (newRank > currentRank) {
          this.highest_tier_awarded = tier;
          this.last_evidence_at = event.accepted_at;
        }

        if (tier === 'E3') {
          this.prior_e3_event_id = event.event_id;
          this.repair_required = false;
          this.repair_due_at = null;
          this.repair_reason_codes = [];
        }

        if (tier === 'E4') {
          this.e4_qualified = true;
          this.repair_required = false;
          this.repair_due_at = null;
          this.repair_reason_codes = [];
        }

        // Return attempt failure does not erase prior evidence; updates repair signal
        const reasonCodes = Array.isArray(payload.reason_codes) ? payload.reason_codes : [];
        if (reasonCodes.includes('FAILED_CRITICAL_RETURN_ATTEMPT') || reasonCodes.includes('TRANSITION_ATTENTION_STATE_NEEDS_REPAIR')) {
          this.repair_required = true;
          this.repair_due_at = event.accepted_at;
          this.repair_reason_codes = deepClone(reasonCodes);
        }
        break;
      }
      case EVENT_TYPES.ANSWER_REVEALED: {
        this.events_applied_count++;
        this.last_answer_reveal_at = event.accepted_at;
        break;
      }
      case EVENT_TYPES.FAMILIARITY_ACCEPTED: {
        this.events_applied_count++;
        const itemId = event.payload?.item_id;
        if (itemId && !this.familiar_items.includes(itemId)) {
          this.familiar_items.push(itemId);
        }
        break;
      }
      default:
        // ATTEMPT_ACCEPTED or ATTEMPT_EVALUATED don't alter evidence projection
        break;
    }
  }

  static rebuildFromEvents(events, projectionScope) {
    const proj = new LearnerSkillProjection(projectionScope);
    // Sort events into deterministic canonical order
    const sorted = [...events].sort(compareEventsCanonical);
    for (const ev of sorted) {
      proj.applyEvent(ev);
    }
    return deepFreeze(proj);
  }
}

class InMemoryLearningEventLedger {
  constructor(options = {}) {
    this.options = options;
    this.events = [];
    this.idempotencyIndex = new Map(); // key -> event
    this.eventMap = new Map(); // event_id -> event
  }

  appendEvent(eventCandidate, hostContext = {}) {
    if (!eventCandidate || typeof eventCandidate !== 'object') {
      throw new ContractValidationError('Event candidate must be an object', 'MALFORMED_CANDIDATE');
    }

    // Blocker 1: Candidate cannot include its own accepted_at
    if (eventCandidate.accepted_at !== undefined) {
      throw new ContractValidationError(
        'Candidate cannot supply accepted_at; accepted_at must be host-assigned only',
        'CLIENT_ACCEPTED_AT_FORBIDDEN'
      );
    }

    // Blocker 1: Require strict UTC hostContext.acceptedAt
    if (!hostContext || typeof hostContext !== 'object' || !hostContext.acceptedAt) {
      throw new ContractValidationError(
        'hostContext.acceptedAt is required to accept event into ledger',
        'MISSING_HOST_ACCEPTED_AT'
      );
    }
    if (typeof hostContext.acceptedAt !== 'string' || parseStrictUtcIsoTimestamp(hostContext.acceptedAt) === null) {
      throw new ContractValidationError(
        `hostContext.acceptedAt must be a valid strict UTC ISO-8601 string, received: '${hostContext.acceptedAt}'`,
        'INVALID_HOST_ACCEPTED_AT'
      );
    }

    const candidate = deepClone(eventCandidate);
    // Enrich cloned candidate with host timestamp before validating envelope
    candidate.accepted_at = hostContext.acceptedAt;

    // Validate complete envelope & payload
    validateEventEnvelope(candidate);

    const idempotencyKey = `${candidate.learner_id}::${candidate.idempotency_key}`;
    const intent = computeCanonicalEventIntent(candidate);

    // 1. Idempotency Check
    if (this.idempotencyIndex.has(idempotencyKey)) {
      const existing = this.idempotencyIndex.get(idempotencyKey);
      const existingIntent = computeCanonicalEventIntent(existing);
      if (existingIntent === intent) {
        // Identical retry returns original accepted event
        return existing;
      }
      // Conflicting retry rejected
      throw new ContractValidationError(
        `Idempotency key '${candidate.idempotency_key}' already used with different event intent for learner '${candidate.learner_id}'`,
        'IDEMPOTENCY_CONFLICT'
      );
    }

    // 2. Event ID Conflict Check
    if (this.eventMap.has(candidate.event_id)) {
      const existing = this.eventMap.get(candidate.event_id);
      if (computeCanonicalEventIntent(existing) === intent) {
        return existing;
      }
      throw new ContractValidationError(
        `Duplicate event_id '${candidate.event_id}' with conflicting content`,
        'DUPLICATE_EVENT_ID_CONFLICT'
      );
    }

    // 3. Store Immutable Cloned Event
    const frozenEvent = deepFreeze(candidate);
    this.events.push(frozenEvent);
    this.idempotencyIndex.set(idempotencyKey, frozenEvent);
    this.eventMap.set(frozenEvent.event_id, frozenEvent);

    return frozenEvent;
  }

  getEvent(eventId) {
    return this.eventMap.get(eventId) || null;
  }

  getAllEvents() {
    return [...this.events];
  }

  getCanonicalReplayEvents(filterFn) {
    const subset = typeof filterFn === 'function' ? this.events.filter(filterFn) : [...this.events];
    return subset.sort(compareEventsCanonical);
  }

  createEvaluatorContext({
    learnerId,
    skillId,
    evidenceLane,
    attemptEventId
  } = {}) {
    if (!isNonBlankString(learnerId)) {
      throw new ContractValidationError('learnerId required for evaluator context', 'MISSING_LEARNER_ID');
    }
    if (!isNonBlankString(skillId)) {
      throw new ContractValidationError('skillId required for evaluator context', 'MISSING_SKILL_ID');
    }
    if (!CLOSED_EVIDENCE_LANES.has(evidenceLane)) {
      throw new ContractValidationError(`valid evidenceLane required for evaluator context, got: '${evidenceLane}'`, 'INVALID_EVIDENCE_LANE');
    }
    if (!isNonBlankString(attemptEventId)) {
      throw new ContractValidationError('attemptEventId required for evaluator context; raw timestamps not accepted', 'MISSING_ATTEMPT_EVENT_ID');
    }

    // Blocker 2: Resolve scoped ATTEMPT_ACCEPTED event from ledger
    const attemptEvent = this.eventMap.get(attemptEventId);
    if (!attemptEvent) {
      throw new ContractValidationError(`Attempt event '${attemptEventId}' not found in ledger`, 'UNKNOWN_ATTEMPT_EVENT');
    }
    if (attemptEvent.event_type !== EVENT_TYPES.ATTEMPT_ACCEPTED) {
      throw new ContractValidationError(
        `Attempt event '${attemptEventId}' must be of type ATTEMPT_ACCEPTED, got '${attemptEvent.event_type}'`,
        'INVALID_ATTEMPT_EVENT_TYPE'
      );
    }
    if (attemptEvent.learner_id !== learnerId) {
      throw new ContractValidationError(
        `Attempt event '${attemptEventId}' belongs to learner '${attemptEvent.learner_id}', expected '${learnerId}'`,
        'CROSS_LEARNER_ATTEMPT_EVENT'
      );
    }
    if (attemptEvent.skill_id !== skillId) {
      throw new ContractValidationError(
        `Attempt event '${attemptEventId}' belongs to skill '${attemptEvent.skill_id}', expected '${skillId}'`,
        'CROSS_SKILL_ATTEMPT_EVENT'
      );
    }
    if (attemptEvent.evidence_lane !== evidenceLane) {
      throw new ContractValidationError(
        `Attempt event '${attemptEventId}' belongs to evidence lane '${attemptEvent.evidence_lane}', expected '${evidenceLane}'`,
        'CROSS_LANE_ATTEMPT_EVENT'
      );
    }

    const authoritativeAttemptAt = attemptEvent.accepted_at;
    const authAttemptMs = parseStrictUtcIsoTimestamp(authoritativeAttemptAt);

    // Latest Answer-Revealing Exposure Event query as-of authoritative attempt time
    // Finds events for this learner and skill/lane with accepted_at <= authoritativeAttemptAt
    const eligibleReveals = this.events.filter((ev) => {
      if (ev.learner_id !== learnerId) return false;
      if (ev.skill_id !== null && ev.skill_id !== skillId) return false;
      if (ev.evidence_lane !== null && ev.evidence_lane !== evidenceLane) return false;

      const isReveal = ev.event_type === EVENT_TYPES.ANSWER_REVEALED ||
        (ev.event_type === EVENT_TYPES.EVIDENCE_DECIDED && ev.payload?.answer_revealing_exposure === true);
      if (!isReveal) return false;

      const evMs = parseStrictUtcIsoTimestamp(ev.accepted_at);
      return evMs !== null && evMs <= authAttemptMs;
    });

    let latestReveal = null;
    if (eligibleReveals.length > 0) {
      eligibleReveals.sort(compareEventsCanonical);
      const newest = eligibleReveals[eligibleReveals.length - 1];
      latestReveal = deepFreeze({
        event_id: newest.event_id,
        occurred_at: newest.accepted_at,
        exposure_kind: newest.payload?.exposure_kind || 'ANSWER_REVEALED'
      });
    }

    // Event Resolver scoped strictly to learnerId, skillId, and evidenceLane
    const eventResolver = (eventId) => {
      if (typeof eventId !== 'string') return null;
      const ev = this.eventMap.get(eventId);
      if (!ev) return null;

      // Scoping: never resolve another learner's event!
      if (ev.learner_id !== learnerId) {
        return null;
      }

      // If resolving an EVIDENCE_DECIDED event (e.g. prior E3):
      if (ev.event_type === EVENT_TYPES.EVIDENCE_DECIDED) {
        // Scoping: cannot resolve prior decision from a different skill or lane
        if (ev.skill_id !== skillId || ev.evidence_lane !== evidenceLane) {
          return null;
        }

        const payload = ev.payload || {};
        const translated = {
          event_id: ev.event_id,
          skill_id: ev.skill_id,
          evidence_lane: ev.evidence_lane,
          awarded_tier: payload.awarded_tier,
          tier: payload.awarded_tier,
          occurred_at: ev.accepted_at, // Translated from accepted_at
          versions: {
            content_version: ev.content_version,
            evidence_policy_version: ev.evidence_policy_version,
            rubric_id: payload.rubric_id,
            rubric_version: payload.rubric_version
          }
        };

        if (payload.status) translated.status = payload.status;
        if (payload.outcome) translated.outcome = payload.outcome;
        if (payload.evaluation_outcome) translated.evaluation_outcome = payload.evaluation_outcome;
        if (payload.result) translated.result = payload.result;
        if (payload.verdict) translated.verdict = payload.verdict;

        return deepFreeze(translated);
      }

      // If resolving a FAMILIARITY_ACCEPTED event:
      if (ev.event_type === EVENT_TYPES.FAMILIARITY_ACCEPTED) {
        // Scoping: cannot resolve familiarity from a different skill or lane
        // Null skill_id or null evidence_lane are NOT eligible for a scoped context
        if (ev.skill_id !== skillId || ev.evidence_lane !== evidenceLane) {
          return null;
        }

        const payload = ev.payload || {};
        const translated = {
          event_id: ev.event_id,
          item_id: payload.item_id,
          target_item_id: payload.item_id,
          occurred_at: ev.accepted_at, // Translated from accepted_at
          source_type: payload.familiarity_kind === 'PRIOR_LEARNING' ? 'PRIOR_LEARNING_EVENT' : 'PRIOR_RECOGNITION_EVENT',
          status: payload.marker_field === 'status' ? payload.marker_value : (payload.familiarity_kind === 'PRIOR_LEARNING' ? 'PRETAUGHT_ACCEPTED' : 'PREVIOUSLY_RECOGNIZED')
        };

        if (payload.marker_field && payload.marker_field !== 'status') {
          translated[payload.marker_field] = payload.marker_value;
        }
        if (payload.awarded_tier) {
          translated.awarded_tier = payload.awarded_tier;
        }

        return deepFreeze(translated);
      }

      return null;
    };

    return Object.freeze({
      authoritativeAttemptAt,
      eventResolver,
      latestAnswerRevealingExposureEvent: latestReveal // explicit object or explicit null
    });
  }

  getProjection(projectionScope) {
    return LearnerSkillProjection.rebuildFromEvents(this.events, projectionScope);
  }
}

module.exports = {
  compareEventsCanonical,
  computeCanonicalEventIntent,
  LearnerSkillProjection,
  InMemoryLearningEventLedger
};

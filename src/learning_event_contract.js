'use strict';

/**
 * WP-03.3A Learning Event Contract
 * Normative definitions, closed enums, schema validation, and immutability helpers.
 */

const {
  parseStrictUtcIsoTimestamp,
  ALLOWED_POSITIVE_LEARNING_MARKERS,
  ALLOWED_POSITIVE_RECOGNITION_MARKERS,
  ALLOWED_POSITIVE_PRIOR_E3_MARKERS
} = require('./evaluator_engine');

const SCHEMA_VERSION = '1.0.0';

const EVENT_TYPES = Object.freeze({
  ATTEMPT_ACCEPTED: 'ATTEMPT_ACCEPTED',
  ATTEMPT_EVALUATED: 'ATTEMPT_EVALUATED',
  EVIDENCE_DECIDED: 'EVIDENCE_DECIDED',
  ANSWER_REVEALED: 'ANSWER_REVEALED',
  FAMILIARITY_ACCEPTED: 'FAMILIARITY_ACCEPTED'
});

const CLOSED_EVENT_TYPES = new Set(Object.values(EVENT_TYPES));

const EVIDENCE_LANES = Object.freeze([
  'read_recognition',
  'listen_recognition',
  'typed_production',
  'spoken_production'
]);

const CLOSED_EVIDENCE_LANES = new Set(EVIDENCE_LANES);

const AWARDED_TIERS = Object.freeze([
  'NONE',
  'E0',
  'E1',
  'E2',
  'E3',
  'E4'
]);

const CLOSED_AWARDED_TIERS = new Set(AWARDED_TIERS);

const SUPPORT_LEVELS = Object.freeze([
  'H0',
  'H1',
  'H2',
  'H3',
  'H4'
]);

const CLOSED_SUPPORT_LEVELS = new Set(SUPPORT_LEVELS);

const CONTAMINATION_STATUSES = Object.freeze([
  'NONE',
  'CONTAMINATED'
]);

const CLOSED_CONTAMINATION_STATUSES = new Set(CONTAMINATION_STATUSES);

const EVALUATION_OUTCOMES = Object.freeze([
  'accepted_clean',
  'accepted_minor',
  'failed_critical',
  'unscored'
]);

const CLOSED_EVALUATION_OUTCOMES = new Set(EVALUATION_OUTCOMES);

const EXPOSURE_KINDS = Object.freeze([
  'MODEL_ANSWER_EXPOSURE',
  'IN_FEEDBACK_REVEAL',
  'H4_MODEL_EXPOSURE'
]);

const CLOSED_EXPOSURE_KINDS = new Set(EXPOSURE_KINDS);

const FAMILIARITY_KINDS = Object.freeze([
  'PRIOR_LEARNING',
  'PRIOR_RECOGNITION'
]);

const CLOSED_FAMILIARITY_KINDS = new Set(FAMILIARITY_KINDS);

const ENVELOPE_KNOWN_PROPERTIES = new Set([
  'event_id',
  'event_type',
  'schema_version',
  'learner_id',
  'accepted_at',
  'idempotency_key',
  'correlation_id',
  'causation_event_id',
  'content_pack_id',
  'content_version',
  'evidence_policy_version',
  'activity_id',
  'skill_id',
  'evidence_lane',
  'payload',
  'client_occurred_at'
]);

const FORBIDDEN_AUTHORITY_KEYS = new Set([
  'eventResolver',
  'eventLedger',
  'authoritativeAttemptAt',
  'resolver',
  'ledger',
  'authority'
]);

class ContractValidationError extends Error {
  constructor(message, code = 'CONTRACT_VALIDATION_ERROR') {
    super(message);
    this.name = 'ContractValidationError';
    this.code = code;
  }
}

function isPlainObject(val) {
  return val !== null && typeof val === 'object' && !Array.isArray(val) && Object.getPrototypeOf(val) === Object.prototype;
}

function isNonBlankString(val) {
  return typeof val === 'string' && val.trim().length > 0;
}

function deepClone(val) {
  if (val === null || typeof val !== 'object') {
    return val;
  }
  if (Array.isArray(val)) {
    return val.map(deepClone);
  }
  const copy = {};
  for (const k of Object.keys(val)) {
    copy[k] = deepClone(val[k]);
  }
  return copy;
}

function deepFreeze(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  Object.freeze(obj);
  for (const key of Object.getOwnPropertyNames(obj)) {
    const val = obj[key];
    if (val !== null && (typeof val === 'object' || typeof val === 'function') && !Object.isFrozen(val)) {
      deepFreeze(val);
    }
  }
  return obj;
}

function checkNoAuthorityOrFunctions(val, path = 'payload') {
  if (val === null || typeof val !== 'object') {
    if (typeof val === 'function') {
      throw new ContractValidationError(`Payload contains forbidden function at ${path}`, 'FORBIDDEN_AUTHORITY_OBJECT');
    }
    return;
  }
  if (Array.isArray(val)) {
    for (let i = 0; i < val.length; i++) {
      checkNoAuthorityOrFunctions(val[i], `${path}[${i}]`);
    }
    return;
  }
  for (const key of Object.keys(val)) {
    if (FORBIDDEN_AUTHORITY_KEYS.has(key)) {
      throw new ContractValidationError(`Payload contains forbidden authority property '${key}' at ${path}`, 'FORBIDDEN_AUTHORITY_OBJECT');
    }
    const propVal = val[key];
    if (typeof propVal === 'function') {
      throw new ContractValidationError(`Payload contains forbidden function at ${path}.${key}`, 'FORBIDDEN_AUTHORITY_OBJECT');
    }
    checkNoAuthorityOrFunctions(propVal, `${path}.${key}`);
  }
}

function validatePayloadForType(eventType, payload) {
  if (!isPlainObject(payload)) {
    throw new ContractValidationError(`Payload for ${eventType} must be a plain object`, 'MALFORMED_PAYLOAD');
  }
  checkNoAuthorityOrFunctions(payload);

  switch (eventType) {
    case EVENT_TYPES.ATTEMPT_ACCEPTED: {
      if (!isNonBlankString(payload.raw_input)) {
        throw new ContractValidationError('ATTEMPT_ACCEPTED requires non-blank raw_input', 'MALFORMED_PAYLOAD');
      }
      if (!['typed', 'spoken'].includes(payload.response_modality)) {
        throw new ContractValidationError(`ATTEMPT_ACCEPTED requires valid response_modality ('typed' | 'spoken')`, 'MALFORMED_PAYLOAD');
      }
      break;
    }
    case EVENT_TYPES.ATTEMPT_EVALUATED: {
      if (!CLOSED_EVALUATION_OUTCOMES.has(payload.evaluation_outcome)) {
        throw new ContractValidationError(`ATTEMPT_EVALUATED outcome '${payload.evaluation_outcome}' is invalid`, 'MALFORMED_PAYLOAD');
      }
      if (!isNonBlankString(payload.intent_outcome)) {
        throw new ContractValidationError('ATTEMPT_EVALUATED requires non-blank intent_outcome', 'MALFORMED_PAYLOAD');
      }
      if (!isNonBlankString(payload.form_outcome)) {
        throw new ContractValidationError('ATTEMPT_EVALUATED requires non-blank form_outcome', 'MALFORMED_PAYLOAD');
      }
      if (!isNonBlankString(payload.register_outcome)) {
        throw new ContractValidationError('ATTEMPT_EVALUATED requires non-blank register_outcome', 'MALFORMED_PAYLOAD');
      }
      if (!Array.isArray(payload.error_codes) || !payload.error_codes.every((c) => typeof c === 'string')) {
        throw new ContractValidationError('ATTEMPT_EVALUATED requires array of string error_codes', 'MALFORMED_PAYLOAD');
      }
      if (!isNonBlankString(payload.evaluator_confidence_bucket)) {
        throw new ContractValidationError('ATTEMPT_EVALUATED requires non-blank evaluator_confidence_bucket', 'MALFORMED_PAYLOAD');
      }
      break;
    }
    case EVENT_TYPES.EVIDENCE_DECIDED: {
      if (!CLOSED_AWARDED_TIERS.has(payload.awarded_tier)) {
        throw new ContractValidationError(`EVIDENCE_DECIDED awarded_tier '${payload.awarded_tier}' is invalid`, 'MALFORMED_PAYLOAD');
      }
      if (!CLOSED_SUPPORT_LEVELS.has(payload.support_level)) {
        throw new ContractValidationError(`EVIDENCE_DECIDED support_level '${payload.support_level}' is invalid`, 'MALFORMED_PAYLOAD');
      }
      if (typeof payload.answer_revealing_exposure !== 'boolean') {
        throw new ContractValidationError('EVIDENCE_DECIDED requires boolean answer_revealing_exposure', 'MALFORMED_PAYLOAD');
      }
      if (!CLOSED_CONTAMINATION_STATUSES.has(payload.contamination_status)) {
        throw new ContractValidationError(`EVIDENCE_DECIDED contamination_status '${payload.contamination_status}' is invalid`, 'MALFORMED_PAYLOAD');
      }
      if (typeof payload.changed_context_qualified !== 'boolean') {
        throw new ContractValidationError('EVIDENCE_DECIDED requires boolean changed_context_qualified', 'MALFORMED_PAYLOAD');
      }
      if (typeof payload.delay_qualified !== 'boolean') {
        throw new ContractValidationError('EVIDENCE_DECIDED requires boolean delay_qualified', 'MALFORMED_PAYLOAD');
      }
      if (typeof payload.version_compatibility !== 'boolean') {
        throw new ContractValidationError('EVIDENCE_DECIDED requires boolean version_compatibility', 'MALFORMED_PAYLOAD');
      }
      if (typeof payload.familiarity_qualified !== 'boolean') {
        throw new ContractValidationError('EVIDENCE_DECIDED requires boolean familiarity_qualified', 'MALFORMED_PAYLOAD');
      }
      if (!Array.isArray(payload.reason_codes) || !payload.reason_codes.every((c) => typeof c === 'string')) {
        throw new ContractValidationError('EVIDENCE_DECIDED requires array of string reason_codes', 'MALFORMED_PAYLOAD');
      }
      if (!Array.isArray(payload.source_event_ids) || !payload.source_event_ids.every((c) => typeof c === 'string')) {
        throw new ContractValidationError('EVIDENCE_DECIDED requires array of string source_event_ids', 'MALFORMED_PAYLOAD');
      }
      if (!isNonBlankString(payload.rubric_id)) {
        throw new ContractValidationError('EVIDENCE_DECIDED requires non-blank rubric_id', 'MALFORMED_PAYLOAD');
      }
      if (!isNonBlankString(payload.rubric_version)) {
        throw new ContractValidationError('EVIDENCE_DECIDED requires non-blank rubric_version', 'MALFORMED_PAYLOAD');
      }
      break;
    }
    case EVENT_TYPES.ANSWER_REVEALED: {
      if (!CLOSED_EXPOSURE_KINDS.has(payload.exposure_kind)) {
        throw new ContractValidationError(`ANSWER_REVEALED exposure_kind '${payload.exposure_kind}' is invalid`, 'MALFORMED_PAYLOAD');
      }
      break;
    }
    case EVENT_TYPES.FAMILIARITY_ACCEPTED: {
      if (!isNonBlankString(payload.item_id)) {
        throw new ContractValidationError('FAMILIARITY_ACCEPTED requires non-blank item_id', 'MALFORMED_PAYLOAD');
      }
      if (!CLOSED_FAMILIARITY_KINDS.has(payload.familiarity_kind)) {
        throw new ContractValidationError(`FAMILIARITY_ACCEPTED familiarity_kind '${payload.familiarity_kind}' is invalid`, 'MALFORMED_PAYLOAD');
      }
      const allowedMarkerFields = ['status', 'outcome', 'evaluation_outcome', 'result', 'verdict'];
      if (!allowedMarkerFields.includes(payload.marker_field)) {
        throw new ContractValidationError(`FAMILIARITY_ACCEPTED marker_field '${payload.marker_field}' is invalid`, 'MALFORMED_PAYLOAD');
      }
      if (!isNonBlankString(payload.marker_value)) {
        throw new ContractValidationError('FAMILIARITY_ACCEPTED requires non-blank marker_value', 'MALFORMED_PAYLOAD');
      }
      const allowedPositiveSet = payload.familiarity_kind === 'PRIOR_LEARNING'
        ? ALLOWED_POSITIVE_LEARNING_MARKERS
        : ALLOWED_POSITIVE_RECOGNITION_MARKERS;
      if (!allowedPositiveSet.has(payload.marker_value)) {
        throw new ContractValidationError(`FAMILIARITY_ACCEPTED marker_value '${payload.marker_value}' is not in allowed positive enum set`, 'MALFORMED_PAYLOAD');
      }
      break;
    }
    default:
      throw new ContractValidationError(`Unknown event_type: ${eventType}`, 'UNKNOWN_EVENT_TYPE');
  }
}

function validateEventEnvelope(event) {
  if (!isPlainObject(event)) {
    throw new ContractValidationError('Event envelope must be a plain object', 'MALFORMED_ENVELOPE');
  }

  // Strict known-property validation
  for (const key of Object.keys(event)) {
    if (!ENVELOPE_KNOWN_PROPERTIES.has(key)) {
      throw new ContractValidationError(`Unknown property '${key}' in event envelope`, 'UNKNOWN_ENVELOPE_PROPERTY');
    }
  }

  // Mandatory non-blank string IDs
  if (!isNonBlankString(event.event_id)) {
    throw new ContractValidationError('event_id must be a non-blank string', 'MALFORMED_EVENT_ID');
  }
  if (!isNonBlankString(event.learner_id)) {
    throw new ContractValidationError('learner_id must be a non-blank string', 'MALFORMED_LEARNER_ID');
  }
  if (!isNonBlankString(event.idempotency_key)) {
    throw new ContractValidationError('idempotency_key must be a non-blank string', 'MALFORMED_IDEMPOTENCY_KEY');
  }
  if (!isNonBlankString(event.correlation_id)) {
    throw new ContractValidationError('correlation_id must be a non-blank string', 'MALFORMED_CORRELATION_ID');
  }

  // causation_event_id: non-blank string or null
  if (event.causation_event_id !== null && !isNonBlankString(event.causation_event_id)) {
    throw new ContractValidationError('causation_event_id must be null or a non-blank string', 'MALFORMED_CAUSATION_ID');
  }

  // Closed event type check
  if (!CLOSED_EVENT_TYPES.has(event.event_type)) {
    throw new ContractValidationError(`Invalid event_type: '${event.event_type}'`, 'UNKNOWN_EVENT_TYPE');
  }

  // schema_version: must match SCHEMA_VERSION ('1.0.0') exactly
  if (event.schema_version !== SCHEMA_VERSION) {
    throw new ContractValidationError(
      `Unsupported schema_version '${event.schema_version}', expected '${SCHEMA_VERSION}'`,
      'UNSUPPORTED_SCHEMA_VERSION'
    );
  }

  // Host authoritative timestamp: accepted_at
  if (!isNonBlankString(event.accepted_at) || parseStrictUtcIsoTimestamp(event.accepted_at) === null) {
    throw new ContractValidationError(`accepted_at must be a valid strict UTC ISO-8601 string, received: '${event.accepted_at}'`, 'MALFORMED_ACCEPTED_AT');
  }

  // Optional client timestamp: client_occurred_at
  if (event.client_occurred_at !== undefined && event.client_occurred_at !== null) {
    if (typeof event.client_occurred_at !== 'string' || parseStrictUtcIsoTimestamp(event.client_occurred_at) === null) {
      throw new ContractValidationError(`client_occurred_at if present must be a valid strict UTC ISO-8601 string, received: '${event.client_occurred_at}'`, 'MALFORMED_CLIENT_OCCURRED_AT');
    }
  }

  // Version bindings
  if (!isNonBlankString(event.content_pack_id)) {
    throw new ContractValidationError('content_pack_id must be a non-blank string', 'MALFORMED_CONTENT_PACK_ID');
  }
  if (!isNonBlankString(event.content_version)) {
    throw new ContractValidationError('content_version must be a non-blank string', 'MALFORMED_CONTENT_VERSION');
  }
  if (!isNonBlankString(event.evidence_policy_version)) {
    throw new ContractValidationError('evidence_policy_version must be a non-blank string', 'MALFORMED_EVIDENCE_POLICY_VERSION');
  }

  // activity_id: non-blank string or null
  if (event.activity_id !== null && !isNonBlankString(event.activity_id)) {
    throw new ContractValidationError('activity_id must be null or a non-blank string', 'MALFORMED_ACTIVITY_ID');
  }

  // skill_id: non-blank string or null
  if (event.skill_id !== null && !isNonBlankString(event.skill_id)) {
    throw new ContractValidationError('skill_id must be null or a non-blank string', 'MALFORMED_SKILL_ID');
  }

  // evidence_lane: null or one of 4 closed lanes
  if (event.evidence_lane !== null && !CLOSED_EVIDENCE_LANES.has(event.evidence_lane)) {
    throw new ContractValidationError(`evidence_lane must be null or one of closed lanes, received: '${event.evidence_lane}'`, 'MALFORMED_EVIDENCE_LANE');
  }

  // Validate payload
  validatePayloadForType(event.event_type, event.payload);

  return true;
}

module.exports = {
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
  ENVELOPE_KNOWN_PROPERTIES,
  ContractValidationError,
  isPlainObject,
  isNonBlankString,
  deepClone,
  deepFreeze,
  validatePayloadForType,
  validateEventEnvelope
};

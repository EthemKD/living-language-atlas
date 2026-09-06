'use strict';

const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

const CANONICAL_CONTENT_PACK_ID = 'de-DE-counter-n1-n2-002-draft';
const CANONICAL_CONTENT_VERSION = '2.1.0-candidate';
const CANONICAL_EVIDENCE_POLICY_VERSION = '1.1';
const CANONICAL_SHA256 = '4F80F1FE030D05EDA87F8948E2C95571E88FD2C83BA993F11C4B2523FF6CD300';

const CANONICAL_FIXTURE_IDS = Object.freeze([
  'ERR-F01', 'ERR-F02', 'ERR-F03', 'ERR-F04', 'ERR-F05', 'ERR-F06',
  'ERR-F07', 'ERR-F08', 'ERR-F09', 'ERR-F10', 'ERR-F11', 'ERR-F12',
  'ERR-F13', 'ERR-F14', 'ERR-F15', 'ERR-F16', 'ERR-F17', 'ERR-F18',
  'ERR-F19-E4-CLEAN-26H', 'ERR-F20-E4-TOO-EARLY',
  'ERR-F21-E4-PRIOR-E3-MISSING', 'ERR-F22-E4-CROSS-MODAL',
  'ERR-F23-E4-ANSWER-REVEAL-RESET', 'ERR-F24-E4-INCOMPATIBLE-RUBRIC',
  'ERR-F25-E4-MISSING-FAMILIARITY', 'ERR-F26-E4-FAILED-RETURN',
  'ERR-F27-TECH-UNCERTAINTY'
]);

function sha256(buffer) {
  return crypto.createHash('sha256').update(buffer).digest('hex').toUpperCase();
}

function requireArray(value, fieldName) {
  if (!Array.isArray(value)) throw new Error(`Missing or invalid array: ${fieldName}`);
  return value;
}

function requireUniqueIds(rows, idField, label) {
  const ids = rows.map((row) => row && row[idField]);
  if (ids.some((id) => typeof id !== 'string' || id.length === 0)) {
    throw new Error(`${label} contains a missing ${idField}`);
  }
  if (new Set(ids).size !== ids.length) throw new Error(`${label} contains duplicate ${idField} values`);
}

function assertSameSet(actual, expected, label) {
  if (actual.length !== expected.length || actual.some((id) => !expected.includes(id))) {
    throw new Error(`${label} does not match the accepted canonical ID set`);
  }
}

/**
 * Loads the accepted WP-02 German candidate without copying, migrating, or
 * transforming it. It intentionally indexes the document only after its bytes
 * and real field contract have been accepted.
 */
class CanonicalContentReader {
  constructor(options = {}) {
    this.filePath = options.filePath || path.resolve(__dirname, '..', 'outputs', 'living_language_atlas_wp02_german_content_pack_v2_1_candidate.json');
    this.expectedSha256 = (options.expectedSha256 || CANONICAL_SHA256).toUpperCase();
    this.pack = null;
    this.fileSha256 = null;
    this.nodeById = new Map();
    this.skillById = new Map();
    this.lexicalItemById = new Map();
    this.rubricById = new Map();
    this.activityById = new Map();
    this.fixtureById = new Map();
    this.sourceById = new Map();
  }

  load() {
    if (!fs.existsSync(this.filePath)) throw new Error(`Canonical content pack not found: ${this.filePath}`);

    const bytes = fs.readFileSync(this.filePath);
    this.fileSha256 = sha256(bytes);
    if (this.fileSha256 !== this.expectedSha256) {
      throw new Error(`Canonical content hash mismatch: expected ${this.expectedSha256}, received ${this.fileSha256}`);
    }

    let pack;
    try {
      pack = JSON.parse(bytes.toString('utf8'));
    } catch (error) {
      throw new Error(`Canonical content is not valid JSON: ${error.message}`);
    }

    this.#validateRealContract(pack);
    this.pack = pack;
    this.#buildIndexes();
    return pack;
  }

  #validateRealContract(pack) {
    if (!pack || typeof pack !== 'object') throw new Error('Canonical content pack must be an object');
    if (pack.content_pack_id !== CANONICAL_CONTENT_PACK_ID) throw new Error(`Unexpected content_pack_id: ${pack.content_pack_id}`);
    if (pack.content_version !== CANONICAL_CONTENT_VERSION) throw new Error(`Unexpected content_version: ${pack.content_version}`);
    if (pack.evidence_policy_version !== CANONICAL_EVIDENCE_POLICY_VERSION) throw new Error(`Unexpected evidence_policy_version: ${pack.evidence_policy_version}`);

    const nodes = requireArray(pack.nodes, 'nodes');
    const skills = requireArray(pack.skills, 'skills');
    const lexicalItems = requireArray(pack.lexical_items, 'lexical_items');
    const rubrics = requireArray(pack.phrase_rubrics, 'phrase_rubrics');
    const activities = requireArray(pack.activities, 'activities');
    const fixtures = requireArray(pack.evaluation_fixtures, 'evaluation_fixtures');
    const sources = requireArray(pack.provenance_sources, 'provenance_sources');

    requireUniqueIds(nodes, 'node_id', 'nodes');
    requireUniqueIds(skills, 'skill_id', 'skills');
    requireUniqueIds(lexicalItems, 'item_id', 'lexical_items');
    requireUniqueIds(rubrics, 'rubric_id', 'phrase_rubrics');
    requireUniqueIds(activities, 'activity_id', 'activities');
    requireUniqueIds(fixtures, 'fixture_id', 'evaluation_fixtures');
    requireUniqueIds(sources, 'source_id', 'provenance_sources');

    assertSameSet(fixtures.map((fixture) => fixture.fixture_id), CANONICAL_FIXTURE_IDS, 'evaluation_fixtures');

    for (const activity of activities) {
      if (typeof activity.skill_id !== 'string') throw new Error(`Activity ${activity.activity_id} is missing skill_id`);
      if (!skills.some((skill) => skill.skill_id === activity.skill_id)) throw new Error(`Activity ${activity.activity_id} references unknown skill ${activity.skill_id}`);
    }

    for (const fixture of fixtures) {
      if (typeof fixture.skill_id !== 'string') throw new Error(`Fixture ${fixture.fixture_id} is missing skill_id`);
      const hasRuntimeActivityContext = fixture.input_state && fixture.input_state.runtime_activity_context_present === true;
      if (hasRuntimeActivityContext && typeof fixture.activity_id !== 'string') {
        throw new Error(`Fixture ${fixture.fixture_id} has runtime activity context but no activity_id`);
      }
      if (!hasRuntimeActivityContext && fixture.activity_id !== null) {
        throw new Error(`Fixture ${fixture.fixture_id} without runtime activity context must use activity_id null`);
      }
      if (!fixture.input_state || typeof fixture.input_state !== 'object') throw new Error(`Fixture ${fixture.fixture_id} is missing input_state`);
      if (!fixture.expected_attempt_evaluation || typeof fixture.expected_attempt_evaluation.evaluation_outcome !== 'string') {
        throw new Error(`Fixture ${fixture.fixture_id} is missing expected_attempt_evaluation.evaluation_outcome`);
      }
      if (!fixture.expected_evidence_decision || typeof fixture.expected_evidence_decision.awarded_tier !== 'string') {
        throw new Error(`Fixture ${fixture.fixture_id} is missing expected_evidence_decision.awarded_tier`);
      }
    }
  }

  #buildIndexes() {
    const index = (rows, field) => new Map(rows.map((row) => [row[field], row]));
    this.nodeById = index(this.pack.nodes, 'node_id');
    this.skillById = index(this.pack.skills, 'skill_id');
    this.lexicalItemById = index(this.pack.lexical_items, 'item_id');
    this.rubricById = index(this.pack.phrase_rubrics, 'rubric_id');
    this.activityById = index(this.pack.activities, 'activity_id');
    this.fixtureById = index(this.pack.evaluation_fixtures, 'fixture_id');
    this.sourceById = index(this.pack.provenance_sources, 'source_id');
  }

  #requireLoaded() {
    if (!this.pack) throw new Error('Call load() before using reader indexes');
  }

  getNode(nodeId) { this.#requireLoaded(); return this.nodeById.get(nodeId); }
  getSkill(skillId) { this.#requireLoaded(); return this.skillById.get(skillId); }
  getLexicalItem(itemId) { this.#requireLoaded(); return this.lexicalItemById.get(itemId); }
  getRubric(rubricId) { this.#requireLoaded(); return this.rubricById.get(rubricId); }
  getActivity(activityId) { this.#requireLoaded(); return this.activityById.get(activityId); }
  getFixture(fixtureId) { this.#requireLoaded(); return this.fixtureById.get(fixtureId); }
  getSource(sourceId) { this.#requireLoaded(); return this.sourceById.get(sourceId); }
}

module.exports = {
  CANONICAL_CONTENT_PACK_ID,
  CANONICAL_CONTENT_VERSION,
  CANONICAL_EVIDENCE_POLICY_VERSION,
  CANONICAL_FIXTURE_IDS,
  CANONICAL_SHA256,
  CanonicalContentReader,
  sha256
};

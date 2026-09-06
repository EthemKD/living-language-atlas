'use strict';

const assert = require('node:assert/strict');
const path = require('node:path');
const { CanonicalContentReader } = require('../src/content_reader');
const { DeterministicEvaluator } = require('../src/evaluator_engine');

const reader = new CanonicalContentReader({ filePath: path.resolve(__dirname, '..', 'outputs', 'living_language_atlas_wp02_german_content_pack_v2_1_candidate.json') });
const pack = reader.load();
const evaluator = new DeterministicEvaluator(reader);

console.log('=== WP-03.2 DETERMINISTIC EVALUATOR CANONICAL COMPARISON GATE ===');

let passedCount = 0;
let mismatchCount = 0;
const mismatches = [];

for (const fixture of pack.evaluation_fixtures) {
  const result = evaluator.evaluateFixture(fixture);
  let attemptMatch = true;
  let evidenceMatch = true;
  let attemptDiff = null;
  let evidenceDiff = null;

  try {
    assert.deepEqual(result.attempt_evaluation, fixture.expected_attempt_evaluation);
  } catch (err) {
    attemptMatch = false;
    attemptDiff = {
      actual: result.attempt_evaluation,
      expected: fixture.expected_attempt_evaluation
    };
  }

  try {
    assert.deepEqual(result.evidence_decision, fixture.expected_evidence_decision);
  } catch (err) {
    evidenceMatch = false;
    evidenceDiff = {
      actual: result.evidence_decision,
      expected: fixture.expected_evidence_decision
    };
  }

  if (attemptMatch && evidenceMatch) {
    passedCount++;
    console.log(`PASS ${fixture.fixture_id}: matches canonical fixture contract`);
  } else {
    mismatchCount++;
    mismatches.push({
      fixture_id: fixture.fixture_id,
      attemptMatch,
      evidenceMatch,
      attemptDiff,
      evidenceDiff
    });
    console.log(`CANONICAL MISMATCH ${fixture.fixture_id}:`);
    if (!attemptMatch) {
      console.log(`  Attempt evaluation mismatch:`);
      console.log(`    Actual:  `, JSON.stringify(result.attempt_evaluation));
      console.log(`    Expected:`, JSON.stringify(fixture.expected_attempt_evaluation));
    }
    if (!evidenceMatch) {
      console.log(`  Evidence decision mismatch:`);
      console.log(`    Actual:  `, JSON.stringify(result.evidence_decision));
      console.log(`    Expected:`, JSON.stringify(fixture.expected_evidence_decision));
    }
  }
}

console.log('\n=== CANONICAL COMPARISON SUMMARY ===');
console.log(`Total fixtures evaluated: ${pack.evaluation_fixtures.length}`);
console.log(`Matches canonical contract: ${passedCount}`);
console.log(`Canonical mismatches: ${mismatchCount}`);

if (mismatchCount > 0) {
  console.log(`\nIdentified canonical mismatches (${mismatchCount}):`);
  for (const m of mismatches) {
    console.log(`  - ${m.fixture_id}: attemptMatch=${m.attemptMatch}, evidenceMatch=${m.evidenceMatch}`);
  }
  console.log('\n[GATE STATUS] NONZERO EXIT: Canonical mismatches present (frozen pack candidate retained).');
  process.exit(1);
} else {
  console.log('\n[GATE STATUS] PASS: All 27 canonical fixtures matched.');
}

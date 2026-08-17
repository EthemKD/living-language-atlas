import { readFile } from 'node:fs/promises';

const projectUrl = new URL('../', import.meta.url);

async function readJson(relativePath) {
  return JSON.parse(await readFile(new URL(relativePath, projectUrl), 'utf8'));
}

export async function loadContent() {
  const [track, demo] = await Promise.all([
    readJson('src/content/russian-foundation-reference-track.json'),
    readJson('src/content/demo-missions.json'),
  ]);
  return { track, demo };
}

export function validateContent({ track, demo }) {
  const errors = [];
  const bundles = track.districts.flatMap((district) => district.bundles);
  const missionSummaries = track.districts.flatMap((district) => district.missions);
  const allIds = [
    ...track.districts.map((district) => district.id),
    ...bundles.map((bundle) => bundle.id),
    ...missionSummaries.map((mission) => mission.id),
  ];

  if (track.districts.length !== 12) errors.push(`Expected 12 districts, found ${track.districts.length}.`);
  if (bundles.length !== 48) errors.push(`Expected 48 skill bundles, found ${bundles.length}.`);
  if (missionSummaries.length !== 36) errors.push(`Expected 36 mission summaries, found ${missionSummaries.length}.`);
  if (new Set(allIds).size !== allIds.length) errors.push('District, bundle and mission IDs must be globally unique.');

  for (const district of track.districts) {
    if (district.bundles.length !== 4) errors.push(`${district.id} must contain four skill bundles.`);
    if (district.missions.length !== 3) errors.push(`${district.id} must contain three missions.`);
  }

  for (const item of [...bundles, ...missionSummaries]) {
    if (item.status !== 'expert_review_required') errors.push(`${item.id} bypasses the expert-review gate.`);
  }

  const bundleIds = new Set(bundles.map((bundle) => bundle.id));
  const missionIds = new Set(missionSummaries.map((mission) => mission.id));
  for (const mission of demo.missions) {
    if (!missionIds.has(mission.id)) errors.push(`${mission.id} is not linked to a reference-track mission.`);
    for (const bundleId of mission.bundle_ids) {
      if (!bundleIds.has(bundleId)) errors.push(`${mission.id} references unknown bundle ${bundleId}.`);
    }
    for (const step of mission.steps) {
      if (step.choices) {
        const correctChoices = step.choices.filter((choice) => choice.correct);
        if (correctChoices.length !== 1) errors.push(`${mission.id}/${step.id} must have exactly one correct choice.`);
      }
    }
  }

  return {
    errors,
    counts: {
      districts: track.districts.length,
      bundles: bundles.length,
      missionSummaries: missionSummaries.length,
      demoMissions: demo.missions.length,
    },
  };
}

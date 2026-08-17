import evidenceLedger from '@/content/first-encounter-evidence.json';
import { firstEncounterTasks } from '@/content/first-encounter';
import type { FirstEncounterTaskTrace } from '@/domain/first-encounter-state';

export type SkillEvidenceStatus = 'unknown' | 'emerging' | 'functional' | 'stable';

export type SkillEvidence = {
  id: string;
  title: string;
  canDo: string;
  status: SkillEvidenceStatus;
  observation: string;
  observedAt: number | null;
  gap: string;
  nextAction: string;
  confidence: string;
};

type EvidenceLevel = 'E0' | 'E1' | 'E2' | 'E3' | 'E4';

const evidenceRank: Record<EvidenceLevel, number> = {
  E0: 0,
  E1: 1,
  E2: 2,
  E3: 3,
  E4: 4,
};

const definitions = [
  {
    id: 'rus.a0.read.mission-signs',
    title: 'Read selected mission signs',
    canDo: 'Recognise selected Cyrillic signals and one café word in the route.',
    nextGap: 'A reviewed novel-word reading check is still needed; recognition is not full Cyrillic fluency.',
    emergingAction: 'Wait for a reviewed novel-word check; this route does not claim full Cyrillic fluency.',
    matches: (targetSkillId: string) => targetSkillId.startsWith('rus.a0.read.'),
  },
  {
    id: 'rus.a0.first-contact',
    title: 'Handle a formal first contact',
    canDo: 'Greet, exchange a name and answer a simple personal-detail question.',
    nextGap: 'Use the same first-contact function in a changed context without the phrase being revealed.',
    emergingAction: 'Try the changed-context mission without revealing the phrase.',
    matches: (targetSkillId: string) =>
      targetSkillId.includes('greet') || targetSkillId.includes('ask-name') || targetSkillId.includes('state-name'),
  },
  {
    id: 'rus.a0.cafe-request',
    title: 'Make a polite café request',
    canDo: 'Ask for a menu, request a drink and recognise the route’s price question.',
    nextGap: 'Retrieve the request with a changed drink or context without phrase support.',
    emergingAction: 'Try the changed-context café mission without revealing the phrase.',
    matches: (targetSkillId: string) =>
      targetSkillId.includes('request-menu') || targetSkillId.includes('order-drink') || targetSkillId.includes('ask-price'),
  },
  {
    id: 'rus.a0.repair-interaction',
    title: 'Repair a missed reply',
    canDo: 'Ask for repetition, slower speech or state non-understanding when the exchange breaks.',
    nextGap: 'Use a repair phrase in a changed-context event, then retrieve it after the interval.',
    emergingAction: 'Try the changed-context repair event without revealing the phrase.',
    matches: (targetSkillId: string) => targetSkillId.includes('repair'),
  },
] as const;

function isEvidenceLevel(value: string): value is EvidenceLevel {
  return value in evidenceRank;
}

function levelsForTask(taskId: string): readonly EvidenceLevel[] {
  const card = evidenceLedger.cards.find((candidate) => candidate.content_id === taskId);
  return card?.evidence_levels.filter(isEvidenceLevel) ?? [];
}

function highestLevel(levels: readonly EvidenceLevel[]) {
  return levels.reduce((highest, level) => Math.max(highest, evidenceRank[level]), -1);
}

function observationForLevel(level: number) {
  if (level >= evidenceRank.E4) return 'Delayed return';
  if (level >= evidenceRank.E2) return 'Changed-context mission';
  if (level >= evidenceRank.E1) return 'Guided production';
  return 'Guided recognition';
}

function formatRetryDetail(trace: FirstEncounterTaskTrace) {
  if (trace.incorrectCheckCount === 0) return '';
  return ` The latest passage needed ${trace.incorrectCheckCount} deterministic recheck${trace.incorrectCheckCount === 1 ? '' : 's'}.`;
}

export function deriveSkillEvidence(taskTraces: readonly FirstEncounterTaskTrace[]): readonly SkillEvidence[] {
  return definitions.map((definition) => {
    const entries = firstEncounterTasks
      .filter((task) => definition.matches(task.target_skill_id))
      .map((task) => ({ task, trace: taskTraces.find((trace) => trace.taskId === task.id), level: highestLevel(levelsForTask(task.id)) }));
    const acceptedEntries = entries.filter((entry) => entry.trace?.outcome === 'accepted');
    const independentEntries = acceptedEntries.filter((entry) => !entry.trace?.retrievalPhraseRevealed);
    const hasIndependentTransfer = independentEntries.some((entry) => entry.level >= evidenceRank.E2 && entry.level < evidenceRank.E4);
    const hasIndependentReturn = independentEntries.some((entry) => entry.level >= evidenceRank.E4);
    const latestEntry = entries
      .filter((entry) => entry.trace)
      .sort((left, right) => (right.trace?.lastObservedAt ?? 0) - (left.trace?.lastObservedAt ?? 0))[0];
    const latestTrace = latestEntry?.trace;
    const status: SkillEvidenceStatus =
      hasIndependentTransfer && hasIndependentReturn
        ? 'stable'
        : hasIndependentTransfer
          ? 'functional'
          : acceptedEntries.length > 0
            ? 'emerging'
            : 'unknown';

    let gap: string = definition.nextGap;
    if (!latestTrace) {
      gap = 'No accepted passage has been observed on this device yet.';
    } else if (latestTrace.outcome === 'unscored') {
      gap = `The latest passage used ${latestTrace.unscoredReason === 'typed_fallback' ? 'typed fallback' : 'support'} and added no skill evidence.${formatRetryDetail(latestTrace)}`;
    } else if (latestTrace.retrievalPhraseRevealed && status !== 'stable') {
      gap = `The latest accepted passage used phrase support, so independent transfer is not yet observed.${formatRetryDetail(latestTrace)}`;
    } else if (status === 'stable') {
      gap = 'This bounded route has a delayed-return trace. It is not a CEFR, fluency or pronunciation result.';
    } else if (status === 'functional') {
      gap = 'Changed-context evidence exists; a delayed return without phrase support is still missing.';
    }

    const latestLevel = latestEntry?.level ?? -1;
    return {
      id: definition.id,
      title: definition.title,
      canDo: definition.canDo,
      status,
      observation: latestEntry ? observationForLevel(latestLevel) : 'Not observed',
      observedAt: latestTrace?.lastObservedAt ?? null,
      gap,
      nextAction:
        status === 'unknown'
          ? 'Start the guided support route.'
          : status === 'emerging'
            ? definition.emergingAction
            : status === 'functional'
              ? 'Complete the delayed return without phrase support.'
              : 'Replay when useful; do not convert this trace into a level score.',
      confidence: 'Bounded deterministic route trace; not a proficiency estimate.',
    };
  });
}

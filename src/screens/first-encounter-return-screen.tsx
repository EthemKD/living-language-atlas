import { useRouter } from 'expo-router';

import { firstEncounter } from '@/content/first-encounter';
import {
  completeFirstEncounterReturnMission,
  getFirstEncounterReturnStatus,
  recordFirstEncounterTaskTrace,
  useFirstEncounterProgress,
} from '@/domain/first-encounter-state';
import { FirstEncounterRehearsalFlow } from '@/screens/first-encounter-rehearsal-flow';

function formatAvailableAt(timestamp: number | null) {
  if (!timestamp) return 'after the first rehearsal is recorded';

  return new Intl.DateTimeFormat('en', {
    weekday: 'short',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(timestamp));
}

export function FirstEncounterReturnScreen() {
  const router = useRouter();
  const progress = useFirstEncounterProgress();
  const returnMission = firstEncounter.return_mission;
  const returnStatus = getFirstEncounterReturnStatus();
  const unavailable =
    progress.storageState === 'loading'
      ? {
          eyebrow: 'RESTORING DEVICE PROGRESS',
          title: 'Checking your last rehearsal.',
          detail: 'This return is scheduled from the first café rehearsal saved on this device.',
          actionLabel: 'Return to Atlas',
          onAction: () => router.replace('/atlas'),
        }
      : returnStatus === 'locked'
        ? {
            eyebrow: 'FIRST REHEARSAL REQUIRED',
            title: 'Finish the changed-context café scene first.',
            detail: 'A later retrieval only makes sense after the first guided supports and initial rehearsal are complete.',
            actionLabel: 'Return to First Encounter',
            onAction: () => router.replace('/atlas'),
          }
        : returnStatus === 'waiting'
          ? {
              eyebrow: 'RETURN LATER',
              title: 'Give this rehearsal a real interval.',
              detail: `This on-device return opens at ${formatAvailableAt(progress.returnMissionAvailableAt)}. The 24-hour interval is a deliberate product choice, not a claim of universal optimal timing.`,
              actionLabel: 'Return to Atlas',
              onAction: () => router.replace('/atlas'),
            }
          : undefined;

  return (
    <FirstEncounterRehearsalFlow
      rehearsal={returnMission}
      unavailable={unavailable}
      persistedComplete={progress.returnMissionRehearsed}
      taskTraces={progress.taskTraces}
      summary={{
        eyebrow: 'DELAYED TRACE COMPLETE',
        title: 'You retrieved the café route after a real interval.',
        detail: returnMission.evidence_boundary,
        trace: 'One later retrieval of a formal greeting, changed drink order, direct repair and polite closing. It is not proof of permanent retention.',
        nextStep: 'Continue on Atlas. This trace adds one delayed observation; it does not unlock a level or certify fluency.',
      }}
      exitLabel="Return to Atlas"
      onTaskComplete={(task, completion) => {
        recordFirstEncounterTaskTrace({
          taskId: task.id,
          retrievalPhraseRevealed: completion.retrievalPhraseRevealed,
          incorrectCheckCount: completion.incorrectCheckCount,
          outcome: completion.outcome,
        });
      }}
      onSequenceComplete={() => {
        completeFirstEncounterReturnMission();
      }}
      onExit={() => router.replace('/atlas')}
    />
  );
}

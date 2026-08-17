import { useRouter } from 'expo-router';

import { firstEncounter } from '@/content/first-encounter';
import { canOpenFirstEncounterMission, completeFirstEncounterMission, useFirstEncounterProgress } from '@/domain/first-encounter-state';
import { FirstEncounterRehearsalFlow } from '@/screens/first-encounter-rehearsal-flow';

export function FirstEncounterMissionScreen() {
  const router = useRouter();
  const progress = useFirstEncounterProgress();
  const mission = firstEncounter.mission;
  const unavailable = canOpenFirstEncounterMission()
    ? undefined
    : {
        eyebrow: 'NOT READY YET',
        title: 'Build the four supports first.',
        detail: 'This rehearsal is intentionally locked until its script, greeting, request and repair steps are available.',
        actionLabel: 'Return to First Encounter',
        onAction: () => router.replace('/atlas'),
      };

  return (
    <FirstEncounterRehearsalFlow
      rehearsal={mission}
      unavailable={unavailable}
      persistedComplete={progress.missionRehearsed}
      summary={{
        eyebrow: 'REHEARSAL TRACE COMPLETE',
        title: 'You handled a changed café detail and a repair event.',
        detail: mission.evidence_boundary,
        trace: 'Guided retrieval of a formal greeting, name, changed drink order, slower-speech repair and polite closing.',
      }}
      exitLabel="Return to Atlas"
      onSequenceComplete={() => {
        completeFirstEncounterMission();
      }}
      onExit={() => router.replace('/atlas')}
    />
  );
}

import { useRouter } from 'expo-router';
import Stack from 'expo-router/stack';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';

import { GuidedTask } from '@/components/guided-task';
import { PrimaryAction } from '@/components/primary-action';
import { ProgressLine } from '@/components/progress-line';
import { ThemedText } from '@/components/themed-text';
import { firstEncounter } from '@/content/first-encounter';
import { canOpenFirstEncounterMission, completeFirstEncounterMission, useFirstEncounterProgress } from '@/domain/first-encounter-state';
import { useTheme } from '@/theme';

export function FirstEncounterMissionScreen() {
  const router = useRouter();
  const progress = useFirstEncounterProgress();
  const [stepIndex, setStepIndex] = useState(0);
  const { colors, spacing, layout } = useTheme();
  const mission = firstEncounter.mission;
  const unlocked = canOpenFirstEncounterMission();
  const complete = progress.missionRehearsed || stepIndex >= mission.steps.length;
  const step = mission.steps[stepIndex];

  function advanceMission() {
    setStepIndex((current) => Math.min(current + 1, mission.steps.length));
  }

  function finishMission() {
    completeFirstEncounterMission();
    router.replace('/atlas');
  }

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      keyboardShouldPersistTaps="handled"
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={{ alignItems: 'center', paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl }}>
      <Stack.Title>{mission.title}</Stack.Title>
      <View style={{ width: '100%', maxWidth: layout.readingWidth, gap: spacing.lg }}>
        <View style={{ gap: spacing.sm }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: spacing.md }}>
            <ThemedText variant="caption" tone="current">
              {mission.eyebrow}
            </ThemedText>
            <ThemedText variant="caption" tone="faint">
              {mission.duration}
            </ThemedText>
          </View>
          <ThemedText variant="heading">{mission.setting}</ThemedText>
          <ThemedText variant="callout" tone="muted">
            {mission.changed_detail}
          </ThemedText>
          <ProgressLine value={stepIndex / mission.steps.length} tone="current" />
        </View>

        {!unlocked ? (
          <View style={{ gap: spacing.lg }}>
            <View style={{ gap: spacing.xs }}>
              <ThemedText variant="caption" tone="current">
                NOT READY YET
              </ThemedText>
              <ThemedText variant="title">Build the four supports first.</ThemedText>
              <ThemedText tone="muted">
                This rehearsal is intentionally locked until its script, greeting, request and repair steps are available.
              </ThemedText>
            </View>
            <PrimaryAction label="Return to First Encounter" onPress={() => router.replace('/atlas')} />
          </View>
        ) : complete ? (
          <View style={{ gap: spacing.lg }}>
            <View style={{ gap: spacing.xs }}>
              <ThemedText variant="caption" tone="accent">
                REHEARSAL TRACE COMPLETE
              </ThemedText>
              <ThemedText variant="title">You handled a changed café detail and a repair event.</ThemedText>
              <ThemedText tone="muted">{mission.evidence_boundary}</ThemedText>
            </View>
            <View style={{ gap: spacing.xxs, borderLeftWidth: 3, borderLeftColor: colors.success, paddingLeft: spacing.md }}>
              <ThemedText variant="caption" tone="accent">
                WHAT THE TRACE SHOWS
              </ThemedText>
              <ThemedText variant="callout" tone="muted">
                Guided retrieval of a formal greeting, name, changed drink order, slower-speech repair and polite closing.
              </ThemedText>
            </View>
            <PrimaryAction label="Return to Atlas" onPress={finishMission} />
          </View>
        ) : step ? (
          <GuidedTask task={step} onComplete={advanceMission} actionLabel={stepIndex + 1 === mission.steps.length ? 'Finish rehearsal' : 'Continue scene'} />
        ) : null}
      </View>
    </ScrollView>
  );
}

import { useLocalSearchParams, useRouter } from 'expo-router';
import Stack from 'expo-router/stack';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';

import { GuidedTask } from '@/components/guided-task';
import { PrimaryAction } from '@/components/primary-action';
import { ProgressLine } from '@/components/progress-line';
import { ThemedText } from '@/components/themed-text';
import { findFirstEncounterStage, firstEncounterStageAfter } from '@/content/first-encounter';
import { completeFirstEncounterStage, useFirstEncounterProgress } from '@/domain/first-encounter-state';
import { useTheme } from '@/theme';

export function FirstEncounterStageScreen() {
  const params = useLocalSearchParams<{ 'stage-id': string }>();
  const router = useRouter();
  const progress = useFirstEncounterProgress();
  const stage = findFirstEncounterStage(params['stage-id']);
  const [taskIndex, setTaskIndex] = useState(0);
  const { colors, spacing, layout } = useTheme();

  if (!stage) {
    return (
      <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ padding: spacing.lg }}>
        <Stack.Title>Skill unavailable</Stack.Title>
        <ThemedText variant="heading">This learning step is not in the reference build.</ThemedText>
      </ScrollView>
    );
  }

  const alreadyComplete = progress.completedStageIds.includes(stage.id);
  const complete = taskIndex >= stage.tasks.length;
  const task = stage.tasks[taskIndex];
  const nextStage = firstEncounterStageAfter(stage.id);

  function advanceTask() {
    setTaskIndex((current) => Math.min(current + 1, stage.tasks.length));
  }

  function finishStage() {
    completeFirstEncounterStage(stage.id);
    if (nextStage) {
      router.replace({ pathname: '/atlas/encounter/[stage-id]', params: { 'stage-id': nextStage.id } });
      return;
    }
    router.replace('/atlas/encounter/mission');
  }

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      keyboardShouldPersistTaps="handled"
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={{ alignItems: 'center', paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl }}>
      <Stack.Title>{stage.title}</Stack.Title>
      <View style={{ width: '100%', maxWidth: layout.readingWidth, gap: spacing.lg }}>
        <View style={{ gap: spacing.sm }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: spacing.md }}>
            <ThemedText variant="caption" tone="accent">
              {stage.eyebrow}
            </ThemedText>
            <ThemedText variant="caption" tone="faint" style={{ fontVariant: ['tabular-nums'] }}>
              {complete ? stage.tasks.length : taskIndex + 1} / {stage.tasks.length}
            </ThemedText>
          </View>
          <ProgressLine value={taskIndex / stage.tasks.length} />
          <ThemedText variant="callout" tone="muted">
            {stage.can_do}
          </ThemedText>
        </View>

        {complete || alreadyComplete ? (
          <View style={{ gap: spacing.lg }}>
            <View style={{ gap: spacing.xs }}>
              <ThemedText variant="caption" tone="accent">
                GUIDED STEP COMPLETE
              </ThemedText>
              <ThemedText variant="title">You rehearsed one small function.</ThemedText>
              <ThemedText tone="muted">{stage.evidence_boundary}</ThemedText>
            </View>
            <View style={{ gap: spacing.xxs, borderLeftWidth: 3, borderLeftColor: colors.current, paddingLeft: spacing.md }}>
              <ThemedText variant="caption" tone="current">
                NEXT
              </ThemedText>
              <ThemedText variant="bodyStrong">
                {nextStage ? `${nextStage.title} · ${nextStage.duration}` : 'First encounter at the café · 7 min'}
              </ThemedText>
            </View>
            <PrimaryAction label={nextStage ? `Continue to ${nextStage.title}` : 'Start changed-context rehearsal'} onPress={finishStage} />
          </View>
        ) : task ? (
          <GuidedTask task={task} onComplete={advanceTask} actionLabel={taskIndex + 1 === stage.tasks.length ? 'Finish guided step' : 'Continue'} />
        ) : null}
      </View>
    </ScrollView>
  );
}

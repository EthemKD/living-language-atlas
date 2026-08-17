import { useLocalSearchParams, useRouter } from 'expo-router';
import Stack from 'expo-router/stack';
import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';

import { GuidedTask } from '@/components/guided-task';
import { PrimaryAction } from '@/components/primary-action';
import { ProgressLine } from '@/components/progress-line';
import { ThemedText } from '@/components/themed-text';
import { findFirstEncounterStage, firstEncounterStageAfter } from '@/content/first-encounter';
import {
  canOpenFirstEncounterStage,
  completeFirstEncounterStage,
  useFirstEncounterProgress,
} from '@/domain/first-encounter-state';
import { useTheme } from '@/theme';

export function FirstEncounterStageScreen() {
  const params = useLocalSearchParams<{ 'stage-id': string }>();
  const router = useRouter();
  const progress = useFirstEncounterProgress();
  const stage = findFirstEncounterStage(params['stage-id']);
  const [taskIndex, setTaskIndex] = useState(0);
  const [isRehearsingAgain, setIsRehearsingAgain] = useState(false);
  const { colors, spacing, layout } = useTheme();

  useEffect(() => {
    setTaskIndex(0);
    setIsRehearsingAgain(false);
  }, [stage?.id]);

  if (!stage) {
    return (
      <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ padding: spacing.lg }}>
        <Stack.Title>Skill unavailable</Stack.Title>
        <ThemedText variant="heading">This learning step is not in the reference build.</ThemedText>
      </ScrollView>
    );
  }

  const alreadyComplete = progress.completedStageIds.includes(stage.id);
  const unlocked = canOpenFirstEncounterStage(stage.id);
  const complete = taskIndex >= stage.tasks.length;
  const showSummary = complete || (alreadyComplete && !isRehearsingAgain);
  const task = stage.tasks[taskIndex];
  const nextStage = firstEncounterStageAfter(stage.id);
  const progressLabel = showSummary
    ? `${stage.tasks.length} / ${stage.tasks.length}`
    : unlocked
      ? `${taskIndex + 1} / ${stage.tasks.length}`
      : 'LOCKED';
  const progressValue = showSummary ? 1 : unlocked ? taskIndex / stage.tasks.length : 0;

  function advanceTask() {
    const nextTaskIndex = Math.min(taskIndex + 1, stage.tasks.length);
    if (nextTaskIndex >= stage.tasks.length) completeFirstEncounterStage(stage.id);
    setTaskIndex(nextTaskIndex);
  }

  function finishStage() {
    completeFirstEncounterStage(stage.id);
    setIsRehearsingAgain(false);
    if (nextStage) {
      router.replace({ pathname: '/atlas/encounter/[stage-id]', params: { 'stage-id': nextStage.id } });
      return;
    }
    router.replace('/atlas/encounter/mission');
  }

  function startRehearsalAgain() {
    setTaskIndex(0);
    setIsRehearsingAgain(true);
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
              {progressLabel}
            </ThemedText>
          </View>
          <ProgressLine value={progressValue} />
          <ThemedText variant="callout" tone="muted">
            {stage.can_do}
          </ThemedText>
        </View>

        {!unlocked ? (
          <View style={{ gap: spacing.lg }}>
            <View style={{ gap: spacing.xs }}>
              <ThemedText variant="caption" tone="current">
                SUPPORT REQUIRED
              </ThemedText>
              <ThemedText variant="title">Build the preceding step first.</ThemedText>
              <ThemedText tone="muted">
                This route stays ordered so the mission never asks you to retrieve language before its support has appeared.
              </ThemedText>
            </View>
            <PrimaryAction label="Return to First Encounter" onPress={() => router.replace('/atlas')} />
          </View>
        ) : showSummary ? (
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
            {alreadyComplete ? <PrimaryAction label="Rehearse this step again" variant="quiet" onPress={startRehearsalAgain} /> : null}
          </View>
        ) : task ? (
          <GuidedTask
            key={task.id}
            task={task}
            onComplete={advanceTask}
            actionLabel={taskIndex + 1 === stage.tasks.length ? 'Finish guided step' : 'Continue'}
          />
        ) : null}
      </View>
    </ScrollView>
  );
}

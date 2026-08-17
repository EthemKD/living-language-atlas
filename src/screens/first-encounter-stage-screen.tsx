import { useLocalSearchParams, useRouter } from 'expo-router';
import Stack from 'expo-router/stack';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';

import { GuidedTask, type GuidedTaskCompletion } from '@/components/guided-task';
import { EvidenceDebrief } from '@/components/evidence-debrief';
import { PrimaryAction } from '@/components/primary-action';
import { ProgressLine } from '@/components/progress-line';
import { ThemedText } from '@/components/themed-text';
import { findFirstEncounterStage, firstEncounterStageAfter } from '@/content/first-encounter';
import {
  canOpenFirstEncounterStage,
  completeFirstEncounterStage,
  recordFirstEncounterTaskTrace,
  useFirstEncounterProgress,
} from '@/domain/first-encounter-state';
import {
  clearLessonSession,
  formatLessonSavedAt,
  getLessonSessionStep,
  saveLessonSession,
  useLessonSession,
} from '@/domain/lesson-session';
import { useTheme } from '@/theme';

export function FirstEncounterStageScreen() {
  const params = useLocalSearchParams<{ 'stage-id': string }>();
  const stage = findFirstEncounterStage(params['stage-id']);

  if (!stage) {
    return (
      <UnknownStage />
    );
  }

  return <FirstEncounterStageContent key={stage.id} stageId={stage.id} />;
}

function UnknownStage() {
  const { spacing } = useTheme();

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ padding: spacing.lg }}>
        <Stack.Title>Skill unavailable</Stack.Title>
        <ThemedText variant="heading">This learning step is not in the reference build.</ThemedText>
    </ScrollView>
  );
}

function FirstEncounterStageContent({ stageId }: { stageId: string }) {
  const router = useRouter();
  const progress = useFirstEncounterProgress();
  const lessonSession = useLessonSession(stageId);
  const stage = findFirstEncounterStage(stageId);
  const [taskIndex, setTaskIndex] = useState(0);
  const [isRehearsingAgain, setIsRehearsingAgain] = useState(false);
  const [resumeNoticeDismissed, setResumeNoticeDismissed] = useState(false);
  const { colors, spacing, layout } = useTheme();

  if (!stage) {
    return null;
  }

  const currentStage = stage;
  const alreadyComplete = progress.completedStageIds.includes(currentStage.id);
  const unlocked = canOpenFirstEncounterStage(currentStage.id);
  const complete = taskIndex >= currentStage.tasks.length;
  const showSummary = complete || (alreadyComplete && !isRehearsingAgain);
  const savedStepIndex = Math.min(getLessonSessionStep(lessonSession.session), currentStage.tasks.length - 1);
  const canResume =
    lessonSession.storageState === 'ready' &&
    unlocked &&
    !alreadyComplete &&
    lessonSession.session?.status === 'active' &&
    savedStepIndex > 0 &&
    !resumeNoticeDismissed;
  const task = currentStage.tasks[taskIndex];
  const nextStage = firstEncounterStageAfter(currentStage.id);
  const progressLabel = showSummary
    ? `${currentStage.tasks.length} / ${currentStage.tasks.length}`
    : unlocked
      ? `${taskIndex + 1} / ${currentStage.tasks.length}`
      : 'LOCKED';
  const progressValue = showSummary ? 1 : unlocked ? taskIndex / currentStage.tasks.length : 0;

  function advanceTask(completion: GuidedTaskCompletion) {
    if (task) {
      recordFirstEncounterTaskTrace({
        taskId: task.id,
        retrievalPhraseRevealed: completion.retrievalPhraseRevealed,
        incorrectCheckCount: completion.incorrectCheckCount,
        outcome: completion.outcome,
        unscoredReason: completion.unscoredReason,
      });
    }

    const nextTaskIndex = Math.min(taskIndex + 1, currentStage.tasks.length);
    const completedStepIds = currentStage.tasks.slice(0, nextTaskIndex).map((currentTask) => currentTask.id);
    if (nextTaskIndex >= currentStage.tasks.length) {
      completeFirstEncounterStage(currentStage.id);
      saveLessonSession(currentStage.id, {
        stepIndex: nextTaskIndex,
        completedStepIds,
        status: 'complete',
      });
    } else {
      saveLessonSession(currentStage.id, { stepIndex: nextTaskIndex, completedStepIds });
    }
    setTaskIndex(nextTaskIndex);
  }

  function finishStage() {
    completeFirstEncounterStage(currentStage.id);
    setIsRehearsingAgain(false);
    if (nextStage) {
      router.replace({ pathname: '/atlas/encounter/[stage-id]', params: { 'stage-id': nextStage.id } });
      return;
    }
    router.replace('/atlas/encounter/mission');
  }

  function startRehearsalAgain() {
    clearLessonSession(currentStage.id);
    setTaskIndex(0);
    setIsRehearsingAgain(true);
    setResumeNoticeDismissed(true);
  }

  function resumeSavedLesson() {
    setTaskIndex(savedStepIndex);
    setResumeNoticeDismissed(true);
  }

  function restartSavedLesson() {
    clearLessonSession(currentStage.id);
    setTaskIndex(0);
    setResumeNoticeDismissed(true);
  }

  const saveStatus =
    lessonSession.storageState === 'loading'
      ? 'CHECKING LOCAL SAVE'
      : lessonSession.storageState === 'unavailable'
        ? 'LOCAL SAVE UNAVAILABLE'
        : lessonSession.session?.status === 'active'
          ? `SAVED ON DEVICE  -  ${formatLessonSavedAt(lessonSession.session.lastSavedAt).toUpperCase()}`
          : 'OFFLINE-SAFE LESSON';

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      keyboardShouldPersistTaps="handled"
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={{ alignItems: 'center', paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl }}>
      <Stack.Title>{currentStage.title}</Stack.Title>
      <View style={{ width: '100%', maxWidth: layout.readingWidth, gap: spacing.lg }}>
        <View style={{ gap: spacing.sm }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: spacing.md }}>
            <ThemedText variant="caption" tone="accent">
              {currentStage.eyebrow}
            </ThemedText>
            <ThemedText variant="caption" tone="faint" style={{ fontVariant: ['tabular-nums'] }}>
              {progressLabel}
            </ThemedText>
          </View>
          <ProgressLine value={progressValue} />
          <ThemedText variant="callout" tone="muted">
            {currentStage.can_do}
          </ThemedText>
          <ThemedText variant="caption" tone={lessonSession.storageState === 'unavailable' ? 'danger' : 'faint'}>
            {saveStatus}
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
        ) : canResume ? (
          <View style={{ gap: spacing.lg }}>
            <View style={{ gap: spacing.xs }}>
              <ThemedText variant="caption" tone="current">
                SAFE RESUME
              </ThemedText>
              <ThemedText variant="title">This lesson was saved on this device.</ThemedText>
              <ThemedText tone="muted">
                The last completed task is preserved locally. Resume at step {savedStepIndex + 1} of {currentStage.tasks.length},
                or restart this reference lesson from the beginning.
              </ThemedText>
            </View>
            <PrimaryAction label={`Resume  -  ${savedStepIndex + 1} / ${currentStage.tasks.length}`} onPress={resumeSavedLesson} />
            <PrimaryAction label="Start from the beginning" variant="quiet" onPress={restartSavedLesson} />
          </View>
        ) : showSummary ? (
          <View style={{ gap: spacing.lg }}>
            <View style={{ gap: spacing.xs }}>
              <ThemedText variant="caption" tone="accent">
                GUIDED STEP COMPLETE
              </ThemedText>
              <ThemedText variant="title">You rehearsed one small function.</ThemedText>
              <ThemedText tone="muted">{currentStage.evidence_boundary}</ThemedText>
            </View>
            <View style={{ gap: spacing.xxs, borderLeftWidth: 3, borderLeftColor: colors.current, paddingLeft: spacing.md }}>
              <ThemedText variant="caption" tone="current">
                NEXT
              </ThemedText>
              <ThemedText variant="bodyStrong">
                {nextStage ? `${nextStage.title}  -  ${nextStage.duration}` : 'First encounter at the cafe  -  7 min'}
              </ThemedText>
            </View>
            <EvidenceDebrief tasks={currentStage.tasks} taskTraces={progress.taskTraces} />
            <PrimaryAction label={nextStage ? `Continue to ${nextStage.title}` : 'Start changed-context rehearsal'} onPress={finishStage} />
            {alreadyComplete ? <PrimaryAction label="Rehearse this step again" variant="quiet" onPress={startRehearsalAgain} /> : null}
          </View>
        ) : task ? (
          <GuidedTask
            key={task.id}
            task={task}
            onComplete={advanceTask}
            actionLabel={taskIndex + 1 === currentStage.tasks.length ? 'Finish guided step' : 'Continue'}
          />
        ) : null}
      </View>
    </ScrollView>
  );
}

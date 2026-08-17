import Stack from 'expo-router/stack';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';

import { GuidedTask, type GuidedTaskCompletion } from '@/components/guided-task';
import { PrimaryAction } from '@/components/primary-action';
import { ProgressLine } from '@/components/progress-line';
import { ThemedText } from '@/components/themed-text';
import type { EncounterTask } from '@/content/first-encounter';
import evidenceLedger from '@/content/first-encounter-evidence.json';
import type { FirstEncounterTaskTrace } from '@/domain/first-encounter-state';
import { useTheme } from '@/theme';

type RehearsalSequence = {
  title: string;
  eyebrow: string;
  setting: string;
  duration: string;
  changed_detail: string;
  evidence_boundary: string;
  steps: EncounterTask[];
};

type UnavailableState = {
  eyebrow: string;
  title: string;
  detail: string;
  actionLabel: string;
  onAction: () => void;
};

type RehearsalSummary = {
  eyebrow: string;
  title: string;
  detail: string;
  trace: string;
  nextStep: string;
};

type FirstEncounterRehearsalFlowProps = {
  rehearsal: RehearsalSequence;
  unavailable?: UnavailableState;
  persistedComplete: boolean;
  taskTraces: readonly FirstEncounterTaskTrace[];
  summary: RehearsalSummary;
  exitLabel: string;
  onTaskComplete: (task: EncounterTask, completion: GuidedTaskCompletion) => void;
  onSequenceComplete: () => void;
  onExit: () => void;
};

export function FirstEncounterRehearsalFlow({
  rehearsal,
  unavailable,
  persistedComplete,
  taskTraces,
  summary,
  exitLabel,
  onTaskComplete,
  onSequenceComplete,
  onExit,
}: FirstEncounterRehearsalFlowProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [isRehearsingAgain, setIsRehearsingAgain] = useState(false);
  const [sceneStarted, setSceneStarted] = useState(false);
  const { colors, spacing, layout } = useTheme();
  const sequenceComplete = stepIndex >= rehearsal.steps.length;
  const showSummary = sequenceComplete || (persistedComplete && !isRehearsingAgain);
  const available = !unavailable;
  const showSceneBrief = available && !showSummary && !sceneStarted;
  const step = rehearsal.steps[stepIndex];
  const progressLabel = showSummary
    ? `${rehearsal.steps.length} / ${rehearsal.steps.length}`
    : showSceneBrief
      ? 'SCENE BRIEF'
    : available
      ? `${stepIndex + 1} / ${rehearsal.steps.length}`
      : 'LOCKED';
  const progressValue = showSummary ? 1 : showSceneBrief ? 0 : available ? stepIndex / rehearsal.steps.length : 0;
  const traceByTaskId = new Map(taskTraces.map((trace) => [trace.taskId, trace]));

  function advance() {
    const nextStepIndex = Math.min(stepIndex + 1, rehearsal.steps.length);
    if (nextStepIndex >= rehearsal.steps.length) onSequenceComplete();
    setStepIndex(nextStepIndex);
  }

  function rehearseAgain() {
    setStepIndex(0);
    setIsRehearsingAgain(true);
    setSceneStarted(false);
  }

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      keyboardShouldPersistTaps="handled"
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={{ alignItems: 'center', paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl }}>
      <Stack.Title>{rehearsal.title}</Stack.Title>
      <View style={{ width: '100%', maxWidth: layout.readingWidth, gap: spacing.lg }}>
        <View style={{ gap: spacing.sm }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: spacing.md }}>
            <ThemedText variant="caption" tone="current">
              {rehearsal.eyebrow}
            </ThemedText>
            <ThemedText variant="caption" tone="faint" style={{ fontVariant: ['tabular-nums'] }}>
              {progressLabel}
            </ThemedText>
          </View>
          <ThemedText variant="heading">{rehearsal.setting}</ThemedText>
          <ThemedText variant="callout" tone="muted">
            {rehearsal.changed_detail}
          </ThemedText>
          <ThemedText variant="caption" tone="faint">
            {rehearsal.duration} · phrase support stays optional in this scene
          </ThemedText>
          <ProgressLine value={progressValue} tone="current" />
        </View>

        {unavailable ? (
          <View style={{ gap: spacing.lg }}>
            <View style={{ gap: spacing.xs }}>
              <ThemedText variant="caption" tone="current">
                {unavailable.eyebrow}
              </ThemedText>
              <ThemedText variant="title">{unavailable.title}</ThemedText>
              <ThemedText tone="muted">{unavailable.detail}</ThemedText>
            </View>
            <PrimaryAction label={unavailable.actionLabel} onPress={unavailable.onAction} />
          </View>
        ) : showSceneBrief ? (
          <View style={{ gap: spacing.lg }}>
            <View style={{ gap: spacing.xs }}>
              <ThemedText variant="caption" tone="current">
                SCENE CONTRACT
              </ThemedText>
              <ThemedText variant="title">One bounded interaction. One changed detail.</ThemedText>
              <ThemedText tone="muted">
                Move through the counter exchange one turn at a time. You can reveal phrase support when you need it;
                that choice stays visible in this device’s rehearsal trace.
              </ThemedText>
            </View>
            <View style={{ gap: spacing.sm, borderTopWidth: 1, borderTopColor: colors.separator, paddingTop: spacing.md }}>
              <SceneBriefRow label="YOUR JOB" detail="Keep the interaction moving with the supported functions already introduced." />
              <SceneBriefRow label="WHAT CHANGES" detail={rehearsal.changed_detail} />
              <SceneBriefRow label="WHAT THIS CAN SHOW" detail={rehearsal.evidence_boundary} />
            </View>
            <PrimaryAction label={`Enter scene · ${rehearsal.steps.length} turns`} onPress={() => setSceneStarted(true)} />
          </View>
        ) : showSummary ? (
          <View style={{ gap: spacing.lg }}>
            <View style={{ gap: spacing.xs }}>
              <ThemedText variant="caption" tone="accent">
                {summary.eyebrow}
              </ThemedText>
              <ThemedText variant="title">{summary.title}</ThemedText>
              <ThemedText tone="muted">{summary.detail}</ThemedText>
            </View>
            <View style={{ gap: spacing.xxs, borderLeftWidth: 3, borderLeftColor: colors.success, paddingLeft: spacing.md }}>
              <ThemedText variant="caption" tone="accent">
                WHAT THE TRACE SHOWS
              </ThemedText>
              <ThemedText variant="callout" tone="muted">
                {summary.trace}
              </ThemedText>
            </View>
            <View style={{ gap: spacing.sm, borderTopWidth: 1, borderTopColor: colors.separator, paddingTop: spacing.md }}>
              <ThemedText variant="caption" tone="current">
                EVIDENCE SNAPSHOT
              </ThemedText>
              <ThemedText variant="callout" tone="muted">
                These rows describe this device&apos;s fixed rehearsal trace. They are not a level, accent, fluency, or
                Russian-quality score.
              </ThemedText>
              {rehearsal.steps.map((task) => {
                const card = evidenceLedger.cards.find((candidate) => candidate.content_id === task.id);
                const trace = traceByTaskId.get(task.id);

                return (
                  <EvidenceDebriefRow
                    key={task.id}
                    level={card?.evidence_levels.join(' · ') ?? 'UNMAPPED'}
                    detail={card?.function ?? task.title}
                    status={trace ? 'RECORDED' : 'NOT RECORDED'}
                    traceDetail={
                      trace
                        ? `${trace.completions} logged · latest attempt ${trace.incorrectCheckCount} retry check${
                            trace.incorrectCheckCount === 1 ? '' : 's'
                          } · ${trace.retrievalPhraseRevealed ? 'support revealed' : 'support not revealed'}`
                        : 'No device trace yet.'
                    }
                  />
                );
              })}
            </View>
            <View style={{ gap: spacing.xxs, borderLeftWidth: 3, borderLeftColor: colors.current, paddingLeft: spacing.md }}>
              <ThemedText variant="caption" tone="current">
                NEXT STEP
              </ThemedText>
              <ThemedText variant="callout" tone="muted">
                {summary.nextStep}
              </ThemedText>
            </View>
            <PrimaryAction label={exitLabel} onPress={onExit} />
            {persistedComplete ? <PrimaryAction label="Rehearse this scene again" variant="quiet" onPress={rehearseAgain} /> : null}
          </View>
        ) : step ? (
          <GuidedTask
            key={step.id}
            task={step}
            onComplete={(completion) => {
              onTaskComplete(step, completion);
              advance();
            }}
            actionLabel={stepIndex + 1 === rehearsal.steps.length ? 'Finish rehearsal' : 'Continue scene'}
            phrasePresentation="retrieve"
          />
        ) : null}
      </View>
    </ScrollView>
  );
}

function SceneBriefRow({ label, detail }: { label: string; detail: string }) {
  const { colors, spacing } = useTheme();

  return (
    <View style={{ gap: spacing.xxs, paddingVertical: spacing.xs, borderBottomWidth: 1, borderBottomColor: colors.separator }}>
      <ThemedText variant="caption" tone="accent">
        {label}
      </ThemedText>
      <ThemedText variant="callout" tone="muted">
        {detail}
      </ThemedText>
    </View>
  );
}

function EvidenceDebriefRow({
  level,
  detail,
  status,
  traceDetail,
}: {
  level: string;
  detail: string;
  status: 'RECORDED' | 'NOT RECORDED';
  traceDetail: string;
}) {
  const { colors, spacing } = useTheme();

  return (
    <View style={{ gap: spacing.xxs, paddingVertical: spacing.xs, borderBottomWidth: 1, borderBottomColor: colors.separator }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: spacing.sm }}>
        <ThemedText variant="caption" tone="accent">
          {level}
        </ThemedText>
        <ThemedText variant="caption" tone={status === 'RECORDED' ? 'accent' : 'faint'}>
          {status}
        </ThemedText>
      </View>
      <ThemedText variant="callout" tone="muted">
        {detail}
      </ThemedText>
      <ThemedText variant="caption" tone="faint">
        {traceDetail}
      </ThemedText>
    </View>
  );
}

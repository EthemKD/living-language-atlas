import { useRouter } from 'expo-router';
import Stack from 'expo-router/stack';
import { ScrollView, View } from 'react-native';

import { PrimaryAction } from '@/components/primary-action';
import { ProgressLine } from '@/components/progress-line';
import { ThemedText } from '@/components/themed-text';
import { firstEncounter, firstEncounterTasks, type EncounterTask } from '@/content/first-encounter';
import { type FirstEncounterTaskTrace, useFirstEncounterProgress } from '@/domain/first-encounter-state';
import { useTheme } from '@/theme';

type TraceGroup = {
  id: string;
  eyebrow: string;
  title: string;
  complete: boolean;
  tasks: readonly EncounterTask[];
};

function traceDetail(trace: FirstEncounterTaskTrace | undefined, routeComplete: boolean) {
  if (!trace) {
    return routeComplete
      ? 'This route was completed before detailed task trace was available on this device. Replay it to create an item trace.'
      : 'No item trace has been logged on this device yet.';
  }

  const completionLabel = trace.completions === 1 ? '1 passage' : `${trace.completions} passages`;
  const supportLabel = trace.retrievalPhraseRevealed ? 'phrase support revealed' : 'no retrieval reveal';
  const recheckLabel = trace.incorrectCheckCount === 0 ? 'no deterministic recheck' : `${trace.incorrectCheckCount} deterministic recheck${trace.incorrectCheckCount === 1 ? '' : 's'}`;
  const outcomeLabel =
    trace.outcome === 'unscored'
      ? `latest passage unscored${trace.unscoredReason === 'typed_fallback' ? ' · typed fallback' : ''}`
      : 'latest passage accepted';
  return `${completionLabel} · ${outcomeLabel} · ${supportLabel} · ${recheckLabel}`;
}

function TraceItem({ task, trace, routeComplete }: { task: EncounterTask; trace: FirstEncounterTaskTrace | undefined; routeComplete: boolean }) {
  const { colors, spacing, radii } = useTheme();
  const status = trace ? (trace.outcome === 'unscored' ? 'UNSCORED' : 'LOGGED') : routeComplete ? 'ROUTE ONLY' : 'NOT YET';
  const statusTone = trace?.outcome === 'unscored' ? 'current' : trace ? 'accent' : routeComplete ? 'current' : 'faint';
  const markerColor = trace?.outcome === 'unscored' ? colors.current : trace ? colors.success : routeComplete ? colors.current : colors.routeDormant;

  return (
    <View style={{ flexDirection: 'row', gap: spacing.sm, paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.separator }}>
      <View
        accessibilityElementsHidden
        style={{
          width: spacing.xs,
          height: spacing.xs,
          marginTop: spacing.xs,
          borderRadius: radii.pill,
          backgroundColor: markerColor,
        }}
      />
      <View style={{ flex: 1, gap: spacing.xxs }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: spacing.md }}>
          <ThemedText variant="bodyStrong" style={{ flex: 1 }}>
            {task.title}
          </ThemedText>
          <ThemedText variant="caption" tone={statusTone}>
            {status}
          </ThemedText>
        </View>
        <ThemedText variant="caption" tone="faint">
          {task.target_skill_id.toUpperCase()}
        </ThemedText>
        <ThemedText variant="callout" tone="muted">
          {traceDetail(trace, routeComplete)}
        </ThemedText>
      </View>
    </View>
  );
}

function TraceSection({ group, tracesByTaskId }: { group: TraceGroup; tracesByTaskId: ReadonlyMap<string, FirstEncounterTaskTrace> }) {
  const { spacing } = useTheme();
  const loggedCount = group.tasks.filter((task) => tracesByTaskId.has(task.id)).length;

  return (
    <View style={{ gap: spacing.xs }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: spacing.md }}>
        <View style={{ flex: 1, gap: spacing.xxs }}>
          <ThemedText variant="caption" tone="faint">
            {group.eyebrow}
          </ThemedText>
          <ThemedText variant="heading">{group.title}</ThemedText>
        </View>
        <ThemedText variant="caption" tone="accent" style={{ fontVariant: ['tabular-nums'] }}>
          {loggedCount} / {group.tasks.length}
        </ThemedText>
      </View>
      <View>
        {group.tasks.map((task) => (
          <TraceItem key={task.id} task={task} trace={tracesByTaskId.get(task.id)} routeComplete={group.complete} />
        ))}
      </View>
    </View>
  );
}

export function LearningTraceScreen() {
  const router = useRouter();
  const progress = useFirstEncounterProgress();
  const { colors, spacing, layout } = useTheme();
  const tracesByTaskId = new Map(progress.taskTraces.map((trace) => [trace.taskId, trace]));
  const loggedTaskCount = progress.taskTraces.length;
  const unscoredTaskCount = progress.taskTraces.filter((trace) => trace.outcome === 'unscored').length;
  const completedRouteCount =
    progress.completedStageIds.length + Number(progress.missionRehearsed) + Number(progress.returnMissionRehearsed);
  const groups: readonly TraceGroup[] = [
    ...firstEncounter.stages.map((stage) => ({
      id: stage.id,
      eyebrow: stage.eyebrow,
      title: stage.title,
      complete: progress.completedStageIds.includes(stage.id),
      tasks: stage.tasks,
    })),
    {
      id: firstEncounter.mission.id,
      eyebrow: firstEncounter.mission.eyebrow,
      title: firstEncounter.mission.title,
      complete: progress.missionRehearsed,
      tasks: firstEncounter.mission.steps,
    },
    {
      id: firstEncounter.return_mission.id,
      eyebrow: firstEncounter.return_mission.eyebrow,
      title: firstEncounter.return_mission.title,
      complete: progress.returnMissionRehearsed,
      tasks: firstEncounter.return_mission.steps,
    },
  ];

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={{ alignItems: 'center', paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl }}>
      <Stack.Title>Learning trace</Stack.Title>
      <View style={{ width: '100%', maxWidth: layout.readingWidth, gap: spacing.xl }}>
        <View style={{ gap: spacing.sm }}>
          <ThemedText variant="caption" tone="accent">
            ON-DEVICE REHEARSAL RECORD
          </ThemedText>
          <ThemedText variant="heading">Observe the route; do not turn it into a language score.</ThemedText>
          <ThemedText tone="muted">
            This reference build saves only fixed task passages, phrase-support reveals, and deterministic rechecks for this
            route. It does not store what you say, type, sound like, or who you are.
          </ThemedText>
        </View>

        <View style={{ gap: spacing.sm }}>
          <View style={{ flexDirection: 'row', gap: spacing.xl, flexWrap: 'wrap' }}>
            <View style={{ minWidth: layout.metricMinWidth, gap: spacing.xxs }}>
              <ThemedText variant="display" style={{ fontVariant: ['tabular-nums'] }}>
                {loggedTaskCount}
              </ThemedText>
              <ThemedText variant="caption" tone="muted">
                OF {firstEncounterTasks.length} TASKS LOGGED
              </ThemedText>
            </View>
            <View style={{ minWidth: layout.metricMinWidth, gap: spacing.xxs }}>
              <ThemedText variant="display" tone="current" style={{ fontVariant: ['tabular-nums'] }}>
                {completedRouteCount}
              </ThemedText>
              <ThemedText variant="caption" tone="muted">
                OF 6 ROUTE EVENTS
              </ThemedText>
            </View>
          </View>
          <ProgressLine value={loggedTaskCount / firstEncounterTasks.length} tone="current" />
        </View>

        <View style={{ gap: spacing.xs, borderLeftWidth: 3, borderLeftColor: colors.current, paddingLeft: spacing.md }}>
          <ThemedText variant="caption" tone="current">
            RECORDING BOUNDARY
          </ThemedText>
          <ThemedText variant="callout" tone="muted">
            A logged item is a fixed activity trace on this device. Accepted and support-only passages are separated;
            an unscored passage is not skill evidence, a CEFR result, proficiency estimate, pronunciation judgement, or
            proof of lasting retention.
          </ThemedText>
          {unscoredTaskCount > 0 ? (
            <ThemedText variant="caption" tone="current">
              {unscoredTaskCount} task{unscoredTaskCount === 1 ? '' : 's'} continued through the support path and remain unscored.
            </ThemedText>
          ) : null}
        </View>

        <View style={{ gap: spacing.xl }}>
          {groups.map((group) => (
            <TraceSection key={group.id} group={group} tracesByTaskId={tracesByTaskId} />
          ))}
        </View>

        <PrimaryAction label="Return to Atlas" onPress={() => router.replace('/atlas')} />
      </View>
    </ScrollView>
  );
}

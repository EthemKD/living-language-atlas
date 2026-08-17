import { useRouter } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';

import { ProgressLine } from '@/components/progress-line';
import { ThemedText } from '@/components/themed-text';
import { firstEncounter, type EncounterStage } from '@/content/first-encounter';
import { canOpenFirstEncounterMission, canOpenFirstEncounterStage, useFirstEncounterProgress } from '@/domain/first-encounter-state';
import { useTheme } from '@/theme';

type RouteState = 'complete' | 'current' | 'locked';

function StageRow({ stage, state, onPress }: { stage: EncounterStage; state: RouteState; onPress: () => void }) {
  const { colors, spacing, radii, layout } = useTheme();
  const isLocked = state === 'locked';
  const isComplete = state === 'complete';
  const markerColor = isComplete ? colors.success : isLocked ? colors.routeDormant : colors.current;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isLocked }}
      disabled={isLocked}
      onPress={onPress}
      style={({ pressed }) => ({
        minHeight: layout.touchTarget,
        flexDirection: 'row',
        gap: spacing.md,
        paddingVertical: spacing.md,
        opacity: isLocked ? 0.46 : pressed ? 0.72 : 1,
      })}>
      <View
        style={{
          width: spacing.lg,
          height: spacing.lg,
          borderRadius: radii.pill,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: markerColor,
        }}>
        <ThemedText variant="caption" tone="inverse">
          {isComplete ? '✓' : stage.order + 1}
        </ThemedText>
      </View>
      <View style={{ flex: 1, gap: spacing.xxs }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: spacing.md }}>
          <ThemedText variant="bodyStrong">{stage.title}</ThemedText>
          <ThemedText variant="caption" tone={isComplete ? 'accent' : isLocked ? 'faint' : 'current'}>
            {isComplete ? 'GUIDED' : isLocked ? 'LATER' : 'NOW'}
          </ThemedText>
        </View>
        <ThemedText variant="callout" tone="muted">
          {stage.can_do}
        </ThemedText>
        <ThemedText variant="caption" tone="faint">
          {stage.duration} · {stage.eyebrow}
        </ThemedText>
      </View>
    </Pressable>
  );
}

export function AtlasScreen() {
  const router = useRouter();
  const progress = useFirstEncounterProgress();
  const { colors, spacing, radii, layout } = useTheme();
  const completedCount = progress.completedStageIds.length + Number(progress.missionRehearsed);
  const missionOpen = canOpenFirstEncounterMission();
  const storageStatus = {
    loading: {
      label: 'RESTORING DEVICE PROGRESS',
      detail: 'Checking this device for the last saved rehearsal state.',
    },
    ready: {
      label: 'PROGRESS SAVES ON THIS DEVICE',
      detail: 'Only the current guided-stage IDs and rehearsal state are stored; no voice or personal conversation is collected.',
    },
    unavailable: {
      label: 'DEVICE STORAGE UNAVAILABLE',
      detail: 'You can keep rehearsing now, but this device cannot currently retain the route after the app closes.',
    },
  }[progress.storageState];

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={{ alignItems: 'center', paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl }}>
      <View style={{ width: '100%', maxWidth: layout.maxContentWidth, gap: spacing.xl }}>
        <View style={{ gap: spacing.sm }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: spacing.md }}>
            <View style={{ flex: 1, gap: spacing.xxs }}>
              <ThemedText variant="caption" tone="accent">
                RUSSIAN · FIRST ENCOUNTER
              </ThemedText>
              <ThemedText variant="heading">Read the signs. Make one request. Repair the moment.</ThemedText>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <ThemedText variant="title" tone="current" style={{ fontVariant: ['tabular-nums'] }}>
                {completedCount}
              </ThemedText>
              <ThemedText variant="caption" tone="faint">
                OF 5
              </ThemedText>
            </View>
          </View>
          <ProgressLine value={completedCount / 5} tone="current" />
          <ThemedText variant="caption" tone="muted">
            English interface · about 20–30 minutes · no level score attached
          </ThemedText>
        </View>

        <View style={{ gap: spacing.xs, borderLeftWidth: 3, borderLeftColor: colors.current, paddingLeft: spacing.md }}>
          <ThemedText variant="caption" tone="current">
            THE ACTUAL JOB
          </ThemedText>
          <ThemedText variant="bodyStrong">Introduce yourself, order one drink, then recover if you lose the thread.</ThemedText>
          <ThemedText variant="callout" tone="muted">
            This path tests a small, changed-context rehearsal. It does not promise fluency, a native accent, or a CEFR level.
          </ThemedText>
        </View>

        <View style={{ gap: spacing.xs }}>
          <ThemedText variant="caption" tone="faint">
            BUILD THE SUPPORTS
          </ThemedText>
          <View style={{ borderTopWidth: 1, borderTopColor: colors.separator }}>
            {firstEncounter.stages.map((stage) => {
              const complete = progress.completedStageIds.includes(stage.id);
              const available = canOpenFirstEncounterStage(stage.id);
              return (
                <StageRow
                  key={stage.id}
                  stage={stage}
                  state={complete ? 'complete' : available ? 'current' : 'locked'}
                  onPress={() => router.push({ pathname: '/atlas/encounter/[stage-id]', params: { 'stage-id': stage.id } })}
                />
              );
            })}
          </View>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityState={{ disabled: !missionOpen }}
          disabled={!missionOpen}
          onPress={() => router.push('/atlas/encounter/mission')}
          style={({ pressed }) => ({
            gap: spacing.xs,
            padding: spacing.lg,
            borderWidth: 1,
            borderColor: missionOpen ? colors.current : colors.separator,
            borderRadius: radii.large,
            borderCurve: 'continuous',
            backgroundColor: missionOpen ? colors.accentSoft : colors.surface,
            opacity: missionOpen ? (pressed ? 0.72 : 1) : 0.52,
          })}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: spacing.md }}>
            <ThemedText variant="caption" tone={missionOpen ? 'current' : 'faint'}>
              CHANGED-CONTEXT REHEARSAL
            </ThemedText>
            <ThemedText variant="caption" tone="faint">
              7 MIN
            </ThemedText>
          </View>
          <ThemedText variant="heading">First encounter at the café</ThemedText>
          <ThemedText variant="callout" tone="muted">
            Coffee becomes tea; the server speaks too quickly. The task is to keep the interaction alive.
          </ThemedText>
          <ThemedText variant="caption" tone={missionOpen ? 'accent' : 'faint'}>
            {progress.missionRehearsed ? 'REHEARSED' : missionOpen ? 'READY WHEN YOU ARE' : 'UNLOCKS AFTER FOUR GUIDED STEPS'}
          </ThemedText>
        </Pressable>

        <View style={{ gap: spacing.xs, borderTopWidth: 1, borderTopColor: colors.separator, paddingTop: spacing.md }}>
          <ThemedText variant="caption" tone="faint">
            CONTENT STATUS
          </ThemedText>
          <ThemedText variant="callout" tone="muted">
            Reference content only. A qualified Russian-language review and traceable audio are still required before learner publication.
          </ThemedText>
          <ThemedText variant="caption" tone={progress.storageState === 'unavailable' ? 'danger' : 'faint'}>
            {storageStatus.label}
          </ThemedText>
          <ThemedText variant="callout" tone="muted">
            {storageStatus.detail}
          </ThemedText>
        </View>
      </View>
    </ScrollView>
  );
}

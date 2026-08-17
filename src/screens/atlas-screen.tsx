import { useRouter } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';

import { PrimaryAction } from '@/components/primary-action';
import { ProgressLine } from '@/components/progress-line';
import { ThemedText } from '@/components/themed-text';
import { CurriculumHorizon } from '@/components/curriculum-horizon';
import { firstEncounter, type EncounterStage } from '@/content/first-encounter';
import { referenceTrack } from '@/content/reference-track';
import {
  canOpenFirstEncounterMission,
  canOpenFirstEncounterStage,
  getFirstEncounterReturnStatus,
  useFirstEncounterProgress,
} from '@/domain/first-encounter-state';
import { useTheme } from '@/theme';

type RouteState = 'complete' | 'current' | 'locked';

type NextRouteAction = {
  eyebrow: string;
  title: string;
  detail: string;
  label?: string;
  onPress?: () => void;
};

type EvidenceRowProps = {
  label: string;
  detail: string;
  status: string;
  statusTone: 'accent' | 'current' | 'faint';
};

function EvidenceRow({ label, detail, status, statusTone }: EvidenceRowProps) {
  const { colors, spacing } = useTheme();

  return (
    <View
      style={{
        gap: spacing.xxs,
        paddingVertical: spacing.sm,
        borderTopWidth: 1,
        borderTopColor: colors.separator,
      }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: spacing.md }}>
        <ThemedText variant="caption" tone="muted">
          {label}
        </ThemedText>
        <ThemedText variant="caption" tone={statusTone}>
          {status}
        </ThemedText>
      </View>
      <ThemedText variant="callout" tone="muted">
        {detail}
      </ThemedText>
    </View>
  );
}

function formatAvailableAt(timestamp: number | null) {
  if (!timestamp) return 'after the first rehearsal';

  return new Intl.DateTimeFormat('en', {
    weekday: 'short',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(timestamp));
}

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
  const completedCount = progress.completedStageIds.length + Number(progress.missionRehearsed) + Number(progress.returnMissionRehearsed);
  const missionOpen = canOpenFirstEncounterMission();
  const returnStatus = getFirstEncounterReturnStatus();
  const returnOpen = returnStatus === 'ready' || returnStatus === 'complete';
  const returnMission = firstEncounter.return_mission;
  const completedSupportCount = progress.completedStageIds.length;
  const supportStatus =
    completedSupportCount === firstEncounter.stages.length
      ? 'SUPPORT REHEARSAL LOGGED'
      : `${completedSupportCount} / ${firstEncounter.stages.length} SUPPORTS`;
  const supportTone = completedSupportCount === firstEncounter.stages.length ? 'accent' : 'current';
  const transferStatus = progress.missionRehearsed
    ? 'TRANSFER TRACE LOGGED'
    : missionOpen
      ? 'READY AFTER SUPPORT'
      : 'LOCKED UNTIL SUPPORTS';
  const transferTone = progress.missionRehearsed ? 'accent' : missionOpen ? 'current' : 'faint';
  const returnEvidenceStatus = progress.returnMissionRehearsed
    ? 'DELAYED RETURN LOGGED'
    : returnStatus === 'ready'
      ? 'READY NOW'
      : returnStatus === 'waiting'
        ? 'SCHEDULED'
        : 'LOCKED UNTIL TRANSFER';
  const returnEvidenceTone = progress.returnMissionRehearsed || returnStatus === 'ready' ? 'accent' : returnStatus === 'waiting' ? 'current' : 'faint';
  const nextStage = firstEncounter.stages.find(
    (stage) => !progress.completedStageIds.includes(stage.id) && canOpenFirstEncounterStage(stage.id),
  );
  const returnState =
    progress.storageState === 'loading'
      ? {
          label: 'RESTORING DEVICE PROGRESS',
          detail: 'Checking whether a later retrieval has been scheduled on this device.',
        }
      : returnStatus === 'locked'
        ? {
            label: 'UNLOCKS AFTER FIRST REHEARSAL',
            detail: 'Finish the changed-context café scene before a later retrieval can be scheduled.',
          }
        : returnStatus === 'waiting'
          ? {
              label: `RETURN AT ${formatAvailableAt(progress.returnMissionAvailableAt).toUpperCase()}`,
              detail: 'A real interval separates this retrieval from the first rehearsal. The schedule is visible and stored on this device.',
            }
          : returnStatus === 'complete'
            ? {
                label: 'LATER RETRIEVAL LOGGED',
                detail: 'You can replay this later scene whenever you want; it does not add a language level or fluency score.',
              }
            : {
                label: 'READY FOR A LATER RETRIEVAL',
                detail: 'The return is open: retrieve the same functions after an actual interval, with optional phrase support.',
              };
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
  const nextAction: NextRouteAction =
    progress.storageState === 'loading'
      ? {
          eyebrow: 'ROUTE RESTORING',
          title: 'Checking this device’s saved First Encounter state.',
          detail: 'The next action will appear once the on-device route record has been restored.',
        }
      : nextStage
        ? {
            eyebrow: 'NEXT ROUTE ACTION',
            title: nextStage.title,
            detail: nextStage.can_do,
            label: `Continue · ${nextStage.duration}`,
            onPress: () =>
              router.push({ pathname: '/atlas/encounter/[stage-id]', params: { 'stage-id': nextStage.id } }),
          }
        : !progress.missionRehearsed
          ? {
              eyebrow: 'NEXT ROUTE ACTION',
              title: firstEncounter.mission.title,
              detail: 'Use the four supports inside one changed café scene before the later retrieval is scheduled.',
              label: 'Enter changed-context rehearsal',
              onPress: () => router.push('/atlas/encounter/mission'),
            }
          : returnStatus === 'ready'
            ? {
                eyebrow: 'NEXT ROUTE ACTION',
                title: returnMission.title,
                detail: 'The delayed scene is ready. Retrieve the same functions after the real interval.',
                label: 'Start later retrieval',
                onPress: () => router.push('/atlas/encounter/return'),
              }
            : returnStatus === 'waiting'
              ? {
                  eyebrow: 'ROUTE HOLD',
                  title: 'The later retrieval is scheduled.',
                  detail: returnState.detail,
                }
              : {
                  eyebrow: 'ROUTE COMPLETE',
                  title: 'Review what this device actually logged.',
                  detail: 'The route is complete; inspect the task-level trace instead of treating completion as a language score.',
                  label: 'Inspect learning trace',
                  onPress: () => router.push('/you/trace'),
                };

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
                OF 6
              </ThemedText>
            </View>
          </View>
          <ProgressLine value={completedCount / 6} tone="current" />
          <ThemedText variant="caption" tone="muted">
            English interface · two rehearsals with a 24-hour return · no level score attached
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

        <View style={{ gap: spacing.xs }} accessibilityLabel="Evidence path">
          <ThemedText variant="caption" tone="faint">
            EVIDENCE PATH
          </ThemedText>
          <EvidenceRow
            label="SUPPORT · RUS-00—03"
            detail="Script, first contact, café request and repair are logged as guided rehearsals — not as a level score."
            status={supportStatus}
            statusTone={supportTone}
          />
          <EvidenceRow
            label="TRANSFER · RUS-M01"
            detail="The café detail changes before the route can record a transfer trace."
            status={transferStatus}
            statusTone={transferTone}
          />
          <EvidenceRow
            label="RETURN · RUS-M02"
            detail="A separate delayed retrieval is scheduled after the first changed-context rehearsal."
            status={returnEvidenceStatus}
            statusTone={returnEvidenceTone}
          />
        </View>

        <View style={{ gap: spacing.sm, borderTopWidth: 1, borderTopColor: colors.separator, paddingTop: spacing.md }}>
          <ThemedText variant="caption" tone="current">
            {nextAction.eyebrow}
          </ThemedText>
          <ThemedText variant="heading">{nextAction.title}</ThemedText>
          <ThemedText variant="callout" tone="muted">
            {nextAction.detail}
          </ThemedText>
          {nextAction.label && nextAction.onPress ? <PrimaryAction label={nextAction.label} onPress={nextAction.onPress} /> : null}
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

        <Pressable
          accessibilityRole="button"
          accessibilityState={{ disabled: !returnOpen }}
          disabled={!returnOpen}
          onPress={() => router.push('/atlas/encounter/return')}
          style={({ pressed }) => ({
            gap: spacing.xs,
            padding: spacing.lg,
            borderWidth: 1,
            borderColor: returnOpen ? colors.success : colors.separator,
            borderRadius: radii.large,
            borderCurve: 'continuous',
            backgroundColor: returnOpen ? colors.surfaceRaised : colors.surface,
            opacity: returnOpen ? (pressed ? 0.72 : 1) : 0.52,
          })}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: spacing.md }}>
            <ThemedText variant="caption" tone={returnOpen ? 'accent' : 'faint'}>
              {returnMission.eyebrow}
            </ThemedText>
            <ThemedText variant="caption" tone="faint">
              {returnMission.duration}
            </ThemedText>
          </View>
          <ThemedText variant="heading">{returnMission.title}</ThemedText>
          <ThemedText variant="callout" tone="muted">
            {returnMission.changed_detail}
          </ThemedText>
          <ThemedText variant="caption" tone={returnOpen ? 'accent' : 'faint'}>
            {returnState.label}
          </ThemedText>
          <ThemedText variant="callout" tone="muted">
            {returnState.detail}
          </ThemedText>
        </Pressable>

        <CurriculumHorizon
          districts={referenceTrack.districts}
          onOpenDistrict={(districtId) =>
            router.push({ pathname: '/atlas/district/[district-id]', params: { 'district-id': districtId } })
          }
        />

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

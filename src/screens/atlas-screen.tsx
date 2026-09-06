import { useRouter } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';

import { PrimaryAction } from '@/components/primary-action';
import { ProgressLine } from '@/components/progress-line';
import { ThemedText } from '@/components/themed-text';
import { CurriculumHorizon } from '@/components/curriculum-horizon';
import { firstEncounter } from '@/content/first-encounter';
import { referenceTrack } from '@/content/reference-track';
import {
  canOpenFirstEncounterMission,
  canOpenFirstEncounterStage,
  getFirstEncounterReturnStatus,
  useFirstEncounterProgress,
} from '@/domain/first-encounter-state';
import { useTheme } from '@/theme';

type RouteNodeState = 'complete' | 'current' | 'locked' | 'scheduled';

type RouteNodeData = {
  id: string;
  eyebrow: string;
  title: string;
  detail: string;
  meta: string;
  state: RouteNodeState;
  marker: string;
  onPress?: () => void;
};

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

function MissionRoute({ nodes }: { nodes: readonly RouteNodeData[] }) {
  const { colors, spacing, radii, layout } = useTheme();

  return (
    <View style={{ gap: spacing.sm }} accessibilityLabel="First Encounter route">
      <View style={{ gap: spacing.xxs }}>
        <ThemedText variant="caption" tone="faint">
          LIVING MISSION ROUTE  -  {nodes.length} NODES
        </ThemedText>
        <ThemedText variant="heading">Support becomes transfer, then return.</ThemedText>
        <ThemedText variant="callout" tone="muted">
          Each node has a different job. A completed rehearsal is evidence for that node, not a language-level score.
        </ThemedText>
      </View>
      <View>
        {nodes.map((node, index) => {
          const isComplete = node.state === 'complete';
          const isCurrent = node.state === 'current';
          const isScheduled = node.state === 'scheduled';
          const isLocked = node.state === 'locked';
          const markerColor = isComplete ? colors.success : isCurrent ? colors.current : isScheduled ? colors.accent : colors.routeDormant;
          const status = isComplete ? 'LOGGED' : isCurrent ? 'NEXT' : isScheduled ? 'SCHEDULED' : 'LATER';
          const statusTone = isComplete ? 'accent' : isCurrent || isScheduled ? 'current' : 'faint';

          return (
            <View key={node.id} style={{ flexDirection: 'row', gap: spacing.md }}>
              <View style={{ width: spacing.lg, alignItems: 'center' }}>
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
                    {isComplete ? '✓' : node.marker}
                  </ThemedText>
                </View>
                {index < nodes.length - 1 ? (
                  <View style={{ flex: 1, width: 2, backgroundColor: isComplete ? colors.success : colors.separator }} />
                ) : null}
              </View>
              <Pressable
                accessibilityRole={node.onPress ? 'button' : undefined}
                accessibilityState={{ disabled: !node.onPress }}
                disabled={!node.onPress}
                onPress={node.onPress}
                style={({ pressed }) => ({
                  flex: 1,
                  minHeight: layout.touchTarget,
                  gap: spacing.xxs,
                  marginBottom: spacing.sm,
                  padding: isCurrent ? spacing.md : spacing.xs,
                  borderWidth: isCurrent ? 1 : 0,
                  borderColor: isCurrent ? colors.current : 'transparent',
                  borderRadius: radii.medium,
                  borderCurve: 'continuous',
                  backgroundColor: isCurrent ? colors.accentSoft : pressed ? colors.surface : 'transparent',
                  opacity: isLocked ? 0.48 : pressed ? 0.72 : 1,
                })}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: spacing.md }}>
                  <ThemedText variant="caption" tone={isCurrent ? 'current' : 'accent'}>
                    {node.eyebrow}
                  </ThemedText>
                  <ThemedText variant="caption" tone={statusTone}>
                    {status}
                  </ThemedText>
                </View>
                <ThemedText variant="bodyStrong">{node.title}</ThemedText>
                <ThemedText variant="callout" tone="muted">
                  {node.detail}
                </ThemedText>
                <ThemedText variant="caption" tone="faint">
                  {node.meta}
                </ThemedText>
              </Pressable>
            </View>
          );
        })}
      </View>
    </View>
  );
}

export function AtlasScreen() {
  const router = useRouter();
  const progress = useFirstEncounterProgress();
  const { colors, spacing, layout } = useTheme();
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
            detail: 'Finish the changed-context cafe scene before a later retrieval can be scheduled.',
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
  const routeNodes: RouteNodeData[] = [
    ...firstEncounter.stages.map((stage) => {
      const complete = progress.completedStageIds.includes(stage.id);
      const available = canOpenFirstEncounterStage(stage.id);
      return {
        id: stage.id,
        eyebrow: `${stage.id}  -  ${stage.eyebrow}`,
        title: stage.title,
        detail: stage.can_do,
        meta: `${stage.duration}  -  support rehearsal`,
        state: complete ? 'complete' : available ? 'current' : 'locked',
        marker: String(stage.order + 1),
        onPress: available
          ? () => router.push({ pathname: '/atlas/encounter/[stage-id]', params: { 'stage-id': stage.id } })
          : undefined,
      } satisfies RouteNodeData;
    }),
    {
      id: firstEncounter.mission.id,
      eyebrow: `${firstEncounter.mission.id}  -  ${firstEncounter.mission.eyebrow}`,
      title: firstEncounter.mission.title,
      detail: `${firstEncounter.mission.changed_detail} Keep the interaction moving.`,
      meta: `${firstEncounter.mission.duration}  -  changed-context transfer`,
      state: progress.missionRehearsed ? 'complete' : missionOpen ? 'current' : 'locked',
      marker: '→',
      onPress: missionOpen ? () => router.push('/atlas/encounter/mission') : undefined,
    },
    {
      id: firstEncounter.return_mission.id,
      eyebrow: `${firstEncounter.return_mission.id}  -  ${firstEncounter.return_mission.eyebrow}`,
      title: firstEncounter.return_mission.title,
      detail: firstEncounter.return_mission.changed_detail,
      meta: `${firstEncounter.return_mission.duration}  -  delayed retrieval`,
      state: progress.returnMissionRehearsed ? 'complete' : returnStatus === 'ready' ? 'current' : returnStatus === 'waiting' ? 'scheduled' : 'locked',
      marker: '↻',
      onPress: returnOpen ? () => router.push('/atlas/encounter/return') : undefined,
    },
  ];
  const nextAction: NextRouteAction =
    progress.storageState === 'loading'
      ? {
          eyebrow: 'ROUTE RESTORING',
          title: "Checking this device's saved First Encounter state.",
          detail: 'The next action will appear once the on-device route record has been restored.',
        }
      : nextStage
        ? {
            eyebrow: 'NEXT ROUTE ACTION',
            title: nextStage.title,
            detail: nextStage.can_do,
            label: `Continue  -  ${nextStage.duration}`,
            onPress: () =>
              router.push({ pathname: '/atlas/encounter/[stage-id]', params: { 'stage-id': nextStage.id } }),
          }
        : !progress.missionRehearsed
          ? {
              eyebrow: 'NEXT ROUTE ACTION',
              title: firstEncounter.mission.title,
              detail: 'Use the four supports inside one changed cafe scene before the later retrieval is scheduled.',
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
                RUSSIAN  -  FIRST ENCOUNTER
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
            English interface  -  two rehearsals with a 24-hour return  -  no level score attached
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
            label="SUPPORT  -  RUS-00-03"
            detail="Script, first contact, cafe request and repair are logged as guided rehearsals - not as a level score."
            status={supportStatus}
            statusTone={supportTone}
          />
          <EvidenceRow
            label="TRANSFER  -  RUS-M01"
            detail="The cafe detail changes before the route can record a transfer trace."
            status={transferStatus}
            statusTone={transferTone}
          />
          <EvidenceRow
            label="RETURN  -  RUS-M02"
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

        <MissionRoute nodes={routeNodes} />

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

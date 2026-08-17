import { useRouter } from 'expo-router';
import { ScrollView, View } from 'react-native';

import { ActionRow } from '@/components/action-row';
import { PrimaryAction } from '@/components/primary-action';
import { ProgressLine } from '@/components/progress-line';
import { ThemedText } from '@/components/themed-text';
import { firstEncounter } from '@/content/first-encounter';
import { firstEncounterPhrasesAvailableForRecall } from '@/content/first-encounter-phrases';
import {
  canOpenFirstEncounterMission,
  canOpenFirstEncounterStage,
  getFirstEncounterReturnStatus,
  useFirstEncounterProgress,
} from '@/domain/first-encounter-state';
import { deriveSkillEvidence, skillEvidenceIdForTarget } from '@/domain/skill-evidence';
import { useTheme } from '@/theme';

function returnMeta(status: ReturnType<typeof getFirstEncounterReturnStatus>) {
  switch (status) {
    case 'complete':
      return {
        title: 'Later retrieval logged',
        detail: 'Replay the later café scene when you want more supported practice.',
        meta: 'REPLAY',
      };
    case 'ready':
      return {
        title: 'Return to the counter',
        detail: 'The delayed retrieval is ready. Retrieve the same functions with one changed detail.',
        meta: 'READY',
      };
    case 'waiting':
      return {
        title: 'Later retrieval is scheduled',
        detail: 'This return stays separate from the first rehearsal. The exact device schedule appears in Atlas.',
        meta: 'WAITING',
      };
    default:
      return {
        title: 'Later retrieval comes after the scene',
        detail: 'Finish the changed-context rehearsal before a later return can be scheduled.',
        meta: 'LATER',
      };
  }
}

export function PracticeScreen() {
  const router = useRouter();
  const progress = useFirstEncounterProgress();
  const { colors, spacing, layout } = useTheme();
  const firstOpenStage = firstEncounter.stages.find(
    (stage) => !progress.completedStageIds.includes(stage.id) && canOpenFirstEncounterStage(stage.id),
  );
  const missionOpen = canOpenFirstEncounterMission();
  const returnStatus = getFirstEncounterReturnStatus();
  const returnOpen = returnStatus === 'ready' || returnStatus === 'complete';
  const completedSupportCount = progress.completedStageIds.length;
  const completedCount = completedSupportCount + Number(progress.missionRehearsed) + Number(progress.returnMissionRehearsed);
  const returnCopy = returnMeta(returnStatus);
  const recallCount = Math.min(firstEncounterPhrasesAvailableForRecall(progress).length, 5);
  const skillEvidence = deriveSkillEvidence(progress.taskTraces);
  const activeStageEvidence = firstOpenStage
    ? skillEvidence.find((item) => item.id === skillEvidenceIdForTarget(firstOpenStage.target_skill_id))
    : undefined;
  const nextEvidence = firstOpenStage
    ? {
        eyebrow: 'NEXT EVIDENCE',
        title: firstOpenStage.title,
        detail: firstOpenStage.can_do,
        note: activeStageEvidence?.gap ?? 'This guided support creates the next bounded rehearsal trace.',
        label: `Continue · ${firstOpenStage.duration}`,
        onPress: () => router.push({ pathname: '/atlas/encounter/[stage-id]', params: { 'stage-id': firstOpenStage.id } }),
      }
    : !progress.missionRehearsed
      ? {
          eyebrow: 'NEXT EVIDENCE',
          title: 'Changed-context transfer',
          detail: firstEncounter.mission.changed_detail,
          note: missionOpen
            ? 'The four guided supports are complete; this is the next independent rehearsal.'
            : 'Finish the four guided supports before this transfer can open.',
          label: 'Enter changed-context rehearsal',
          onPress: missionOpen ? () => router.push('/atlas/encounter/mission') : undefined,
        }
      : returnStatus === 'ready'
        ? {
            eyebrow: 'NEXT EVIDENCE',
            title: 'Delayed return',
            detail: firstEncounter.return_mission.changed_detail,
            note: 'The interval has elapsed; retrieve the same functions without turning this into a level score.',
            label: 'Start later retrieval',
            onPress: () => router.push('/atlas/encounter/return'),
          }
        : returnStatus === 'waiting'
          ? {
              eyebrow: 'EVIDENCE HOLD',
              title: 'Delayed return is scheduled',
              detail: returnCopy.detail,
              note: 'The interval is part of the trace. Nothing needs to be forced early.',
              label: undefined,
              onPress: undefined,
            }
          : {
              eyebrow: 'EVIDENCE REVIEW',
              title: 'Review the route’s observable gaps',
              detail: 'The route is complete. Open the evidence map to see what was observed and what was not.',
              note: 'Completion stays separate from language level, fluency and accent claims.',
              label: 'Open Evidence Map',
              onPress: () => router.push('/you'),
            };

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={{ alignItems: 'center', paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl }}>
      <View style={{ width: '100%', maxWidth: layout.maxContentWidth, gap: spacing.xl }}>
        <View style={{ gap: spacing.sm }}>
          <ThemedText variant="caption" tone="accent">
            TODAY · SOURCE-BOUND PRACTICE
          </ThemedText>
          <ThemedText variant="heading">One useful return, not a pile of pretend games.</ThemedText>
          <ThemedText tone="muted">
            This queue only offers actions the current reference build can actually trace on this device. It does not
            award a streak, language level, or fluency score.
          </ThemedText>
          <ProgressLine value={completedCount / 6} tone="current" />
        </View>

        <View style={{ gap: spacing.sm, borderLeftWidth: 3, borderLeftColor: colors.current, paddingLeft: spacing.md }}>
          <ThemedText variant="caption" tone="current">
            {nextEvidence.eyebrow}
          </ThemedText>
          <ThemedText variant="heading">{nextEvidence.title}</ThemedText>
          <ThemedText variant="callout" tone="muted">
            {nextEvidence.detail}
          </ThemedText>
          <ThemedText variant="caption" tone="faint">
            {nextEvidence.note}
          </ThemedText>
          {nextEvidence.label && nextEvidence.onPress ? <PrimaryAction label={nextEvidence.label} onPress={nextEvidence.onPress} /> : null}
        </View>

        <View>
          <ThemedText variant="caption" tone="faint" style={{ paddingBottom: spacing.xs }}>
            FIRST ENCOUNTER · {completedCount} OF 6 TRACE EVENTS
          </ThemedText>
          <ActionRow
            eyebrow="Recall Lens"
            title="Recognize the latest source phrases"
            detail="A short English-meaning check built only from the phrases currently open in your route."
            meta={`${recallCount} ITEMS`}
            onPress={() => router.push('/practice/recall')}
          />
          <ActionRow
            eyebrow="Guided support"
            title={firstOpenStage ? firstOpenStage.title : 'All four supports rehearsed'}
            detail={
              firstOpenStage
                ? firstOpenStage.can_do
                : 'The script, first-contact, café-request and repair supports are available for replay in Atlas.'
            }
            meta={firstOpenStage ? `${firstOpenStage.order + 1} / 4` : '4 / 4'}
            onPress={() =>
              firstOpenStage
                ? router.push({ pathname: '/atlas/encounter/[stage-id]', params: { 'stage-id': firstOpenStage.id } })
                : router.push('/atlas')
            }
          />
          <ActionRow
            eyebrow="Changed context"
            title={firstEncounter.mission.title}
            detail={
              progress.missionRehearsed
                ? 'The tea-for-coffee change and repair moment were rehearsed once. Replay remains available.'
                : 'Build the four supports first, then retrieve them inside one changed café scene.'
            }
            meta={progress.missionRehearsed ? 'REPLAY' : missionOpen ? 'READY' : 'LOCKED'}
            disabled={!missionOpen}
            onPress={missionOpen ? () => router.push('/atlas/encounter/mission') : undefined}
          />
          <ActionRow
            eyebrow="Delayed retrieval"
            title={returnCopy.title}
            detail={returnCopy.detail}
            meta={returnCopy.meta}
            disabled={!returnOpen}
            onPress={returnOpen ? () => router.push('/atlas/encounter/return') : undefined}
          />
        </View>

        <View style={{ gap: spacing.xs, borderLeftWidth: 3, borderLeftColor: colors.current, paddingLeft: spacing.md }}>
          <ThemedText variant="caption" tone="current">
            WHY THIS QUEUE IS SMALL
          </ThemedText>
          <ThemedText variant="bodyStrong">Every visible action is connected to an existing phrase, scene, and state transition.</ThemedText>
          <ThemedText variant="callout" tone="muted">
            Listening, scoring, open-ended writing, social matching and AI generation stay out of this tab until their
            content, evaluator, privacy and safety contracts exist.
          </ThemedText>
        </View>
      </View>
    </ScrollView>
  );
}

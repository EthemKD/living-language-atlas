import { useRouter } from 'expo-router';
import { Alert, ScrollView, View } from 'react-native';

import { PrimaryAction } from '@/components/primary-action';
import { ProgressLine } from '@/components/progress-line';
import { ThemedText } from '@/components/themed-text';
import { firstEncounter } from '@/content/first-encounter';
import {
  getFirstEncounterReturnStatus,
  resetFirstEncounterProgress,
  useFirstEncounterProgress,
} from '@/domain/first-encounter-state';
import { useTheme } from '@/theme';

function laterReturnLabel(status: ReturnType<typeof getFirstEncounterReturnStatus>) {
  switch (status) {
    case 'complete':
      return 'Later retrieval logged';
    case 'ready':
      return 'Later retrieval ready';
    case 'waiting':
      return 'Later retrieval scheduled';
    default:
      return 'Later retrieval not scheduled';
  }
}

export function YouScreen() {
  const router = useRouter();
  const progress = useFirstEncounterProgress();
  const { colors, spacing, layout } = useTheme();
  const laterReturn = getFirstEncounterReturnStatus();
  const completedCount =
    progress.completedStageIds.length + Number(progress.missionRehearsed) + Number(progress.returnMissionRehearsed);
  const storageCopy = {
    loading: 'Restoring this device’s saved rehearsal state.',
    ready: 'This device stores route completion, fixed task trace, and the later-retrieval schedule.',
    unavailable: 'Device storage is currently unavailable, so the route may not survive an app restart.',
  }[progress.storageState];

  function confirmReset() {
    Alert.alert(
      'Reset this device’s First Encounter route?',
      'This clears only the local guided-stage, task trace and retrieval schedule for this reference build. It does not affect any account because this build has none.',
      [
        { text: 'Keep progress', style: 'cancel' },
        { text: 'Reset route', style: 'destructive', onPress: resetFirstEncounterProgress },
      ],
    );
  }

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={{ alignItems: 'center', paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl }}>
      <View style={{ width: '100%', maxWidth: layout.maxContentWidth, gap: spacing.xl }}>
        <View style={{ gap: spacing.xs }}>
          <ThemedText variant="caption" tone="accent">
            YOUR LOCAL RECORD
          </ThemedText>
          <ThemedText variant="heading">First Encounter · Russian</ThemedText>
          <ThemedText tone="muted">
            English interface. This profile is a transparent route record, not a gamified portrait of you.
          </ThemedText>
        </View>

        <View style={{ flexDirection: 'row', gap: spacing.xl, flexWrap: 'wrap' }}>
          <View style={{ minWidth: layout.metricMinWidth, gap: spacing.xxs }}>
            <ThemedText variant="display" style={{ fontVariant: ['tabular-nums'] }}>
              {completedCount}
            </ThemedText>
            <ThemedText variant="caption" tone="muted">
              TRACE EVENTS OF 6
            </ThemedText>
          </View>
          <View style={{ minWidth: layout.metricMinWidth, gap: spacing.xxs }}>
            <ThemedText variant="display" style={{ fontVariant: ['tabular-nums'] }}>
              {progress.completedStageIds.length}
            </ThemedText>
            <ThemedText variant="caption" tone="muted">
              GUIDED SUPPORTS OF 4
            </ThemedText>
          </View>
        </View>
        <ProgressLine value={completedCount / 6} tone="current" />

        <View style={{ gap: spacing.sm }}>
          <ThemedText variant="caption" tone="faint">
            WHAT THIS DEVICE HAS ACTUALLY SEEN
          </ThemedText>
          <RecordRow
            label="Guided support"
            value={`${progress.completedStageIds.length} of 4 rehearsed`}
            detail="Script cues, formal first contact, a café request and an interaction-repair phrase stay separate."
          />
          <RecordRow
            label="Changed-context rehearsal"
            value={progress.missionRehearsed ? 'Logged once' : 'Not yet logged'}
            detail="This event only appears after the guided supports; it does not turn into a proficiency score."
          />
          <RecordRow
            label="Delayed retrieval"
            value={laterReturnLabel(laterReturn)}
            detail="The later scene is intentionally a distinct trace event rather than a hidden bonus point."
          />
          <RecordRow
            label="Task trace"
            value={`${progress.taskTraces.length} fixed tasks logged`}
            detail="A task record separates accepted passages from support-only or typed-fallback unscored passages, plus reveals and deterministic rechecks."
          />
          <PrimaryAction label="Inspect rehearsal trace" variant="quiet" onPress={() => router.push('/you/trace')} />
        </View>

        <View style={{ gap: spacing.xs, borderLeftWidth: 3, borderLeftColor: colors.current, paddingLeft: spacing.md }}>
          <ThemedText variant="caption" tone="current">
            DATA BOUNDARY
          </ThemedText>
          <ThemedText variant="callout" tone="muted">{storageCopy}</ThemedText>
          <ThemedText variant="caption" tone={progress.storageState === 'unavailable' ? 'danger' : 'faint'}>
            No account, voice recording, conversation transcript, location, payment or social graph is part of this build.
          </ThemedText>
        </View>

        <View style={{ gap: spacing.xs, borderTopWidth: 1, borderTopColor: colors.separator, paddingTop: spacing.md }}>
          <ThemedText variant="caption" tone="faint">
            CONTENT TRANSPARENCY
          </ThemedText>
          <ThemedText variant="bodyStrong">
            Reference content v{firstEncounter.content_evidence_card.content_version} · language review pending
          </ThemedText>
          <ThemedText variant="callout" tone="muted">
            This path is scoped against four public curriculum sources and its later-return design names two learning
            research sources. Those links constrain scope; they do not approve individual Russian strings or certify a
            learner.
          </ThemedText>
          <ThemedText variant="caption" tone="faint">
            {firstEncounter.content_evidence_card.known_limits[0]}
          </ThemedText>
          <PrimaryAction label="Inspect source notes" variant="quiet" onPress={() => router.push('/you/sources')} />
        </View>

        <View style={{ gap: spacing.xs, borderTopWidth: 1, borderTopColor: colors.separator, paddingTop: spacing.md }}>
          <ThemedText variant="caption" tone="faint">
            REFERENCE BUILD CONTROL
          </ThemedText>
          <ThemedText variant="callout" tone="muted">
            Reset the route when you want to test the complete learner flow from its first support again.
          </ThemedText>
          <PrimaryAction label="Reset this device’s route" variant="quiet" onPress={confirmReset} />
        </View>
      </View>
    </ScrollView>
  );
}

function RecordRow({ label, value, detail }: { label: string; value: string; detail: string }) {
  const { colors, spacing } = useTheme();

  return (
    <View style={{ gap: spacing.xxs, paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.separator }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: spacing.md }}>
        <ThemedText variant="bodyStrong">{label}</ThemedText>
        <ThemedText variant="caption" tone="accent">
          {value.toUpperCase()}
        </ThemedText>
      </View>
      <ThemedText variant="callout" tone="muted">
        {detail}
      </ThemedText>
    </View>
  );
}

import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';

import { ActionRow } from '@/components/action-row';
import { PhraseLens } from '@/components/phrase-lens';
import { PrimaryAction } from '@/components/primary-action';
import { ThemedText } from '@/components/themed-text';
import {
  firstEncounterPhraseEntries,
  firstEncounterPhrasesAvailableForRecall,
  type FirstEncounterPhraseEntry,
} from '@/content/first-encounter-phrases';
import { useFirstEncounterProgress } from '@/domain/first-encounter-state';
import { useTheme } from '@/theme';

export function StudioScreen() {
  const router = useRouter();
  const progress = useFirstEncounterProgress();
  const [selectedId, setSelectedId] = useState(firstEncounterPhraseEntries[0]?.id ?? '');
  const availableEntries = firstEncounterPhrasesAvailableForRecall(progress);
  const selected = availableEntries.find((entry) => entry.id === selectedId) ?? availableEntries[0];
  const { colors, spacing, layout } = useTheme();

  if (!selected) return null;

  function openRoute(entry: FirstEncounterPhraseEntry) {
    if (entry.route.kind === 'stage') {
      router.push({ pathname: '/atlas/encounter/[stage-id]', params: { 'stage-id': entry.route.stageId } });
      return;
    }
    if (entry.route.kind === 'mission') {
      router.push('/atlas/encounter/mission');
      return;
    }
    router.push('/atlas/encounter/return');
  }

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={{ alignItems: 'center', paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl }}>
      <View style={{ width: '100%', maxWidth: layout.maxContentWidth, gap: spacing.xl }}>
        <View style={{ gap: spacing.sm }}>
          <ThemedText variant="caption" tone="accent">
            PHRASE DESK · FIRST ENCOUNTER
          </ThemedText>
          <ThemedText variant="heading">Open the exact phrase before asking for more.</ThemedText>
          <ThemedText tone="muted">
            This is a source desk, not a generic chatbot. Each line is already attached to one task, one learning
            target and one route in the reference build.
          </ThemedText>
        </View>

        <View style={{ gap: spacing.md }}>
          <View style={{ gap: spacing.xxs }}>
            <ThemedText variant="caption" tone="current">
              SELECTED SOURCE
            </ThemedText>
            <ThemedText variant="title">{selected.title}</ThemedText>
            <ThemedText variant="callout" tone="muted">
              First appears in {selected.origin} · target {selected.target.toUpperCase()}
            </ThemedText>
          </View>
          <PhraseLens sourceLine={selected.sourceLine} translation={selected.translation} />
          <PrimaryAction label="Open its guided route" onPress={() => openRoute(selected)} />
          <PrimaryAction
            label="Rehearse with a Cyrillic keyboard"
            variant="quiet"
            onPress={() => router.push({ pathname: '/studio/copy/[phrase-id]', params: { 'phrase-id': selected.id } })}
          />
          <ThemedText variant="caption" tone="faint">
            Reading assistance is optional and explicitly not pronunciation scoring. The typed copy stays only in its
            open rehearsal session and is not a writing score. Audio, speech evaluation and generated explanations are
            not active in this reference build.
          </ThemedText>
        </View>

        <View>
          <ThemedText variant="caption" tone="faint" style={{ paddingBottom: spacing.xs }}>
            OPEN SOURCE SET · {availableEntries.length} OF {firstEncounterPhraseEntries.length} DISTINCT LINES
          </ThemedText>
          {availableEntries.map((entry) => (
            <ActionRow
              key={entry.id}
              eyebrow={entry.origin}
              title={entry.sourceLine}
              detail={entry.translation}
              meta={entry.id === selected.id ? 'OPEN' : undefined}
              onPress={() => setSelectedId(entry.id)}
              style={{ backgroundColor: entry.id === selected.id ? colors.accentSoft : 'transparent' }}
            />
          ))}
        </View>

        <View style={{ gap: spacing.xs, borderLeftWidth: 3, borderLeftColor: colors.current, paddingLeft: spacing.md }}>
          <ThemedText variant="caption" tone="current">
            CONTENT BOUNDARY
          </ThemedText>
          <ThemedText variant="callout" tone="muted">
            The desk can surface opened, in-context reference strings and run an exact-copy check. It cannot invent a
            lesson, validate open-ended writing, assess a voice or decide that a learner has reached a language level.
          </ThemedText>
        </View>
      </View>
    </ScrollView>
  );
}

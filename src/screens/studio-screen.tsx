import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';

import { ActionRow } from '@/components/action-row';
import { PhraseLens } from '@/components/phrase-lens';
import { PrimaryAction } from '@/components/primary-action';
import { ThemedText } from '@/components/themed-text';
import { firstEncounter, type EncounterTask } from '@/content/first-encounter';
import { useTheme } from '@/theme';

type SourceRoute = { kind: 'stage'; stageId: string } | { kind: 'mission' } | { kind: 'return' };

type PhraseDeskEntry = {
  id: string;
  sourceLine: string;
  translation: string;
  title: string;
  target: string;
  origin: string;
  route: SourceRoute;
};

function sourceEntries() {
  const entries: PhraseDeskEntry[] = [];
  const seenSourceLines = new Set<string>();
  const addTasks = (tasks: EncounterTask[], origin: string, route: SourceRoute) => {
    for (const task of tasks) {
      if (seenSourceLines.has(task.source_line)) continue;
      seenSourceLines.add(task.source_line);
      entries.push({
        id: task.id,
        sourceLine: task.source_line,
        translation: task.translation,
        title: task.title,
        target: task.target_skill_id,
        origin,
        route,
      });
    }
  };

  for (const stage of firstEncounter.stages) {
    addTasks(stage.tasks, stage.title, { kind: 'stage', stageId: stage.id });
  }
  addTasks(firstEncounter.mission.steps, firstEncounter.mission.title, { kind: 'mission' });
  addTasks(firstEncounter.return_mission.steps, firstEncounter.return_mission.title, { kind: 'return' });

  return entries;
}

const phraseDeskEntries = sourceEntries();

export function StudioScreen() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState(phraseDeskEntries[0]?.id ?? '');
  const selected = phraseDeskEntries.find((entry) => entry.id === selectedId) ?? phraseDeskEntries[0];
  const { colors, spacing, layout } = useTheme();

  if (!selected) return null;

  function openRoute(entry: PhraseDeskEntry) {
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
          <ThemedText variant="caption" tone="faint">
            Reading assistance is optional and explicitly not pronunciation scoring. Audio, speech evaluation and
            generated explanations are not active in this reference build.
          </ThemedText>
        </View>

        <View>
          <ThemedText variant="caption" tone="faint" style={{ paddingBottom: spacing.xs }}>
            CURRENT SOURCE SET · {phraseDeskEntries.length} DISTINCT LINES
          </ThemedText>
          {phraseDeskEntries.map((entry) => (
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
            The desk can surface approved-in-context reference strings. It cannot invent a lesson, validate open-ended
            writing, assess a voice or decide that a learner has reached a language level.
          </ThemedText>
        </View>
      </View>
    </ScrollView>
  );
}

import { useLocalSearchParams, useRouter } from 'expo-router';
import Stack from 'expo-router/stack';
import { useMemo, useState } from 'react';
import { ScrollView, TextInput, View } from 'react-native';

import { PhraseLens } from '@/components/phrase-lens';
import { PrimaryAction } from '@/components/primary-action';
import { ThemedText } from '@/components/themed-text';
import { findFirstEncounterPhraseEntry, firstEncounterPhrasesAvailableForRecall } from '@/content/first-encounter-phrases';
import { useFirstEncounterProgress } from '@/domain/first-encounter-state';
import { useTheme } from '@/theme';

function normalizeExactCopy(value: string) {
  return value.normalize('NFC').trim().replace(/\s+/g, ' ');
}

export function SourceCopyRehearsalScreen() {
  const params = useLocalSearchParams<{ 'phrase-id': string }>();
  const router = useRouter();
  const progress = useFirstEncounterProgress();
  const entry = findFirstEncounterPhraseEntry(params['phrase-id']);
  const availableEntries = firstEncounterPhrasesAvailableForRecall(progress);
  const available = Boolean(entry && availableEntries.some((candidate) => candidate.id === entry.id));
  const [answer, setAnswer] = useState('');
  const [checked, setChecked] = useState(false);
  const { colors, spacing, radii, layout, typography } = useTheme();
  const matches = useMemo(() => (entry ? normalizeExactCopy(answer) === normalizeExactCopy(entry.sourceLine) : false), [answer, entry]);

  if (!entry || !available) {
    return (
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ backgroundColor: colors.background }}
        contentContainerStyle={{ alignItems: 'center', paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl }}>
        <Stack.Title>Copy rehearsal unavailable</Stack.Title>
        <View style={{ width: '100%', maxWidth: layout.readingWidth, gap: spacing.lg }}>
          <ThemedText variant="heading">Open the source line in your route first.</ThemedText>
          <ThemedText tone="muted">
            Studio does not surface a future phrase merely because it exists in the reference set. Return to the active
            route, then open this source again when it is available.
          </ThemedText>
          <PrimaryAction label="Return to Studio" onPress={() => router.replace('/studio')} />
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      keyboardShouldPersistTaps="handled"
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={{ alignItems: 'center', paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl }}>
      <Stack.Title>Copy rehearsal</Stack.Title>
      <View style={{ width: '100%', maxWidth: layout.readingWidth, gap: spacing.lg }}>
        <View style={{ gap: spacing.xs }}>
          <ThemedText variant="caption" tone="accent">
            SOURCE-BOUND CYRILLIC COPY
          </ThemedText>
          <ThemedText variant="heading">Copy one opened source line with your Cyrillic keyboard.</ThemedText>
          <ThemedText tone="muted">
            This is an exact reference check after normalizing whitespace and Unicode composition. It is not an
            open-ended writing evaluation, keyboard-proficiency claim, or saved submission.
          </ThemedText>
        </View>

        <View style={{ gap: spacing.xs, borderLeftWidth: 3, borderLeftColor: colors.current, paddingLeft: spacing.md }}>
          <ThemedText variant="caption" tone="current">
            SOURCE TARGET
          </ThemedText>
          <ThemedText variant="bodyStrong">{entry.title}</ThemedText>
          <ThemedText variant="callout" tone="muted">
            {entry.origin} · {entry.target.toUpperCase()}
          </ThemedText>
        </View>

        <PhraseLens sourceLine={entry.sourceLine} translation={entry.translation} />

        <View style={{ gap: spacing.sm }}>
          <ThemedText variant="caption" tone="faint">
            YOUR ON-SCREEN COPY · NOT SAVED
          </ThemedText>
          <TextInput
            accessibilityLabel="Copy the Russian source line"
            autoCapitalize="none"
            autoCorrect={false}
            spellCheck={false}
            multiline
            value={answer}
            onChangeText={(value) => {
              setAnswer(value);
              setChecked(false);
            }}
            placeholder="Type the exact Russian line"
            placeholderTextColor={colors.textFaint}
            style={{
              minHeight: spacing.xxl + spacing.xxl,
              padding: spacing.md,
              borderWidth: 1,
              borderColor: checked ? (matches ? colors.success : colors.danger) : colors.separator,
              borderRadius: radii.large,
              borderCurve: 'continuous',
              backgroundColor: colors.surfaceRaised,
              color: colors.text,
              textAlignVertical: 'top',
              ...typography.body,
            }}
          />
        </View>

        {checked ? (
          <View
            style={{
              gap: spacing.xxs,
              borderLeftWidth: 3,
              borderLeftColor: matches ? colors.success : colors.current,
              paddingLeft: spacing.md,
            }}>
            <ThemedText variant="caption" tone={matches ? 'accent' : 'current'}>
              {matches ? 'EXACT REFERENCE MATCH' : 'NOT AN EXACT MATCH YET'}
            </ThemedText>
            <ThemedText variant="callout" tone="muted">
              {matches
                ? 'The on-screen copy matches this reference line. Nothing is stored and no route evidence or writing score changes.'
                : 'Compare the source line and try again. This narrow check cannot diagnose a spelling, keyboard, grammar or writing-ability problem.'}
            </ThemedText>
          </View>
        ) : null}

        <View style={{ gap: spacing.xs }}>
          <PrimaryAction label="Check exact copy" disabled={!answer.trim()} onPress={() => setChecked(true)} />
          <PrimaryAction label="Return to Phrase Desk" variant="quiet" onPress={() => router.replace('/studio')} />
        </View>
      </View>
    </ScrollView>
  );
}

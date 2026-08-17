import { useRouter } from 'expo-router';
import Stack from 'expo-router/stack';
import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';

import { PhraseLens } from '@/components/phrase-lens';
import { PrimaryAction } from '@/components/primary-action';
import { ProgressLine } from '@/components/progress-line';
import { ThemedText } from '@/components/themed-text';
import {
  firstEncounterPhraseEntries,
  firstEncounterPhrasesAvailableForRecall,
  type FirstEncounterPhraseEntry,
} from '@/content/first-encounter-phrases';
import { useFirstEncounterProgress } from '@/domain/first-encounter-state';
import { useTheme } from '@/theme';

const maximumRoundLength = 5;

function meaningOptions(
  current: FirstEncounterPhraseEntry,
  available: FirstEncounterPhraseEntry[],
  promptIndex: number,
) {
  const distractors = [...available, ...firstEncounterPhraseEntries]
    .filter((entry) => entry.id !== current.id)
    .filter((entry, index, entries) => entries.findIndex((candidate) => candidate.translation === entry.translation) === index)
    .slice(0, 2);
  const candidates = [current, ...distractors];
  const shift = promptIndex % candidates.length;

  return candidates
    .map((_, index) => candidates[(index + shift) % candidates.length])
    .filter((entry): entry is FirstEncounterPhraseEntry => Boolean(entry));
}

export function RecallLensScreen() {
  const router = useRouter();
  const progress = useFirstEncounterProgress();
  const { colors, spacing, radii, layout } = useTheme();
  const available = firstEncounterPhrasesAvailableForRecall(progress);
  const round = available.slice(-maximumRoundLength);
  const [promptIndex, setPromptIndex] = useState(0);
  const [selectedId, setSelectedId] = useState<string>();
  const [checked, setChecked] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const finished = promptIndex >= round.length;
  const current = finished ? undefined : round[promptIndex];

  function resetAnswer() {
    setSelectedId(undefined);
    setChecked(false);
  }

  function checkMeaning() {
    if (!selectedId) return;
    setChecked(true);
    if (selectedCorrect) setCorrectCount((count) => count + 1);
  }

  function advance() {
    setPromptIndex((index) => index + 1);
    resetAnswer();
  }

  function replayRound() {
    setPromptIndex(0);
    setCorrectCount(0);
    resetAnswer();
  }

  if (finished) {
    return (
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ backgroundColor: colors.background }}
        contentContainerStyle={{ alignItems: 'center', paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl }}>
        <Stack.Title>Recall Lens</Stack.Title>
        <View style={{ width: '100%', maxWidth: layout.readingWidth, gap: spacing.lg }}>
          <View style={{ gap: spacing.xs }}>
            <ThemedText variant="caption" tone="accent">
              SOURCE-BOUND RECALL COMPLETE
            </ThemedText>
            <ThemedText variant="title">You checked {correctCount} of {round.length} meanings in this pass.</ThemedText>
            <ThemedText tone="muted">
              This is a short recognition rehearsal with existing reference strings. It is not a vocabulary level,
              fluency judgment or permanent-retention claim.
            </ThemedText>
          </View>
          <View style={{ gap: spacing.xxs, borderLeftWidth: 3, borderLeftColor: colors.current, paddingLeft: spacing.md }}>
            <ThemedText variant="caption" tone="current">
              NEXT USEFUL MOVE
            </ThemedText>
            <ThemedText variant="callout" tone="muted">
              Use the phrase inside its guided scene. The route keeps context and repair available instead of treating a
              translation choice as a complete skill.
            </ThemedText>
          </View>
          <PrimaryAction label="Return to practice" onPress={() => router.back()} />
          <PrimaryAction label="Replay this recall set" variant="quiet" onPress={replayRound} />
        </View>
      </ScrollView>
    );
  }

  if (!current) return null;

  const selectedCorrect = selectedId === current.id;
  const options = meaningOptions(current, available, promptIndex);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      keyboardShouldPersistTaps="handled"
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={{ alignItems: 'center', paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl }}>
      <Stack.Title>Recall Lens</Stack.Title>
      <View style={{ width: '100%', maxWidth: layout.readingWidth, gap: spacing.lg }}>
        <View style={{ gap: spacing.sm }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: spacing.md }}>
            <ThemedText variant="caption" tone="current">
              RECALL LENS · LATEST SOURCE SET
            </ThemedText>
            <ThemedText variant="caption" tone="faint" style={{ fontVariant: ['tabular-nums'] }}>
              {promptIndex + 1} / {round.length}
            </ThemedText>
          </View>
          <ThemedText variant="heading">Recognize the phrase before its translation appears.</ThemedText>
          <ThemedText variant="callout" tone="muted">
            Choose one English meaning. The phrase comes only from the supports currently open in your First Encounter route.
          </ThemedText>
          <ProgressLine value={promptIndex / round.length} tone="current" />
        </View>

        <PhraseLens sourceLine={current.sourceLine} translation={current.translation} translationVisible={checked} />

        <View accessibilityRole="radiogroup" style={{ gap: spacing.xs }}>
          {options.map((option) => {
            const selected = selectedId === option.id;
            return (
              <Pressable
                key={option.id}
                accessibilityRole="radio"
                accessibilityState={{ selected, disabled: checked }}
                disabled={checked}
                onPress={() => {
                  setSelectedId(option.id);
                  setChecked(false);
                }}
                style={({ pressed }) => ({
                  minHeight: layout.touchTarget,
                  justifyContent: 'center',
                  padding: spacing.md,
                  borderWidth: selected ? 2 : 1,
                  borderColor: checked && selected ? (selectedCorrect ? colors.success : colors.danger) : selected ? colors.accent : colors.separator,
                  borderRadius: radii.medium,
                  borderCurve: 'continuous',
                  backgroundColor: selected || pressed ? colors.accentSoft : colors.surfaceRaised,
                  opacity: checked && !selected ? 0.62 : 1,
                })}>
                <ThemedText variant="bodyStrong">{option.translation}</ThemedText>
              </Pressable>
            );
          })}
        </View>

        {checked ? (
          <View style={{ gap: spacing.xxs, borderLeftWidth: 3, borderLeftColor: selectedCorrect ? colors.success : colors.current, paddingLeft: spacing.md }}>
            <ThemedText variant="caption" tone={selectedCorrect ? 'accent' : 'current'}>
              {selectedCorrect ? 'MEANING MATCHED' : 'KEEP THE FUNCTION IN VIEW'}
            </ThemedText>
            <ThemedText variant="callout" tone="muted">
              {selectedCorrect
                ? 'The selected meaning matches this reference string. Continue to use it in the supported scene.'
                : 'The source translation is now visible. Try another meaning before continuing.'}
            </ThemedText>
          </View>
        ) : null}

        {!checked ? <PrimaryAction label="Check meaning" disabled={!selectedId} onPress={checkMeaning} /> : null}
        {checked && !selectedCorrect ? <PrimaryAction label="Try another meaning" onPress={resetAnswer} /> : null}
        {checked && selectedCorrect ? (
          <PrimaryAction label={promptIndex + 1 === round.length ? 'Finish recall' : 'Continue recall'} onPress={advance} />
        ) : null}
      </View>
    </ScrollView>
  );
}

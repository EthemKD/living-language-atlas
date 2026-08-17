import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { getReadingAssist } from '@/content/reading-assist';
import { useTheme } from '@/theme';

type PhraseLensProps = {
  sourceLine: string;
  translation: string;
  explanation?: string;
  presentation?: 'reference' | 'retrieve';
  translationVisible?: boolean;
};

export function PhraseLens({
  sourceLine,
  translation,
  explanation,
  presentation = 'reference',
  translationVisible = true,
}: PhraseLensProps) {
  const [phraseVisible, setPhraseVisible] = useState(presentation === 'reference');
  const [assistVisible, setAssistVisible] = useState(false);
  const [explanationVisible, setExplanationVisible] = useState(false);
  const { colors, spacing, radii, layout } = useTheme();
  const readingAssist = getReadingAssist(sourceLine);

  return (
    <View
      style={{
        gap: spacing.md,
        padding: spacing.lg,
        borderWidth: 1,
        borderColor: colors.separator,
        borderRadius: radii.large,
        borderCurve: 'continuous',
        backgroundColor: colors.surfaceRaised,
      }}>
      <View style={{ gap: spacing.xxs }}>
        <ThemedText variant="caption" tone={phraseVisible ? 'accent' : 'current'}>
          {phraseVisible ? 'RUSSIAN · REFERENCE DRAFT' : 'RETRIEVAL · SUPPORT AVAILABLE'}
        </ThemedText>
        {phraseVisible ? (
          <>
            <ThemedText variant="phrase" selectable>
              {sourceLine}
            </ThemedText>
            {translationVisible ? (
              <ThemedText variant="callout" tone="muted">
                {translation}
              </ThemedText>
            ) : (
              <ThemedText variant="callout" tone="muted">
                Choose the English meaning below before revealing the supported translation.
              </ThemedText>
            )}
          </>
        ) : (
          <ThemedText variant="callout" tone="muted">
            Choose or build your response from the scene first. You can reveal the supported phrase if you need it; this rehearsal is not scored for fluency.
          </ThemedText>
        )}
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs }}>
        {!phraseVisible ? (
          <Pressable
            accessibilityRole="button"
            onPress={() => setPhraseVisible(true)}
            style={({ pressed }) => ({
              minHeight: layout.touchTarget,
              justifyContent: 'center',
              paddingHorizontal: spacing.md,
              borderWidth: 1,
              borderColor: colors.current,
              borderRadius: radii.pill,
              borderCurve: 'continuous',
              backgroundColor: pressed ? colors.accentSoft : colors.background,
            })}>
            <ThemedText variant="caption" tone="current">
              REVEAL SUPPORTED PHRASE
            </ThemedText>
          </Pressable>
        ) : null}
        {phraseVisible && readingAssist ? (
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ expanded: assistVisible }}
            onPress={() => setAssistVisible((visible) => !visible)}
            style={({ pressed }) => ({
              minHeight: layout.touchTarget,
              justifyContent: 'center',
              paddingHorizontal: spacing.md,
              borderWidth: 1,
              borderColor: colors.separator,
              borderRadius: radii.pill,
              borderCurve: 'continuous',
              backgroundColor: pressed ? colors.surface : colors.background,
            })}>
            <ThemedText variant="caption" tone="accent">
              {assistVisible ? 'HIDE READING AID' : 'SHOW READING AID'}
            </ThemedText>
          </Pressable>
        ) : null}
        {phraseVisible && explanation ? (
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ expanded: explanationVisible }}
            onPress={() => setExplanationVisible((visible) => !visible)}
            style={({ pressed }) => ({
              minHeight: layout.touchTarget,
              justifyContent: 'center',
              paddingHorizontal: spacing.md,
              borderWidth: 1,
              borderColor: colors.separator,
              borderRadius: radii.pill,
              borderCurve: 'continuous',
              backgroundColor: pressed ? colors.surface : colors.background,
            })}>
            <ThemedText variant="caption" tone="accent">
              {explanationVisible ? 'HIDE WHY' : 'WHY THIS PHRASE?'}
            </ThemedText>
          </Pressable>
        ) : null}
      </View>

      {phraseVisible && assistVisible && readingAssist ? (
        <View style={{ gap: spacing.xxs, borderLeftWidth: 3, borderLeftColor: colors.current, paddingLeft: spacing.md }}>
          <ThemedText variant="caption" tone="current">
            READING AID · NOT PRONUNCIATION SCORING
          </ThemedText>
          <ThemedText variant="code" selectable>
            {readingAssist}
          </ThemedText>
        </View>
      ) : null}

      {phraseVisible && explanationVisible && explanation ? (
        <View style={{ gap: spacing.xxs, borderLeftWidth: 3, borderLeftColor: colors.accent, paddingLeft: spacing.md }}>
          <ThemedText variant="caption" tone="accent">
            WHY THIS PHRASE
          </ThemedText>
          <ThemedText variant="callout" tone="muted">
            {explanation}
          </ThemedText>
        </View>
      ) : null}
    </View>
  );
}

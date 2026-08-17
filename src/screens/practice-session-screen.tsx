import { useLocalSearchParams, useRouter } from 'expo-router';
import Stack from 'expo-router/stack';
import { useMemo, useState } from 'react';
import { ScrollView, TextInput, View } from 'react-native';

import { PrimaryAction } from '@/components/primary-action';
import { ThemedText } from '@/components/themed-text';
import { answerMatches, practicePrompts } from '@/content/practice-prompts';
import { findBundle } from '@/content/reference-track';
import { useTheme } from '@/theme';

export function PracticeSessionScreen() {
  const params = useLocalSearchParams<{ 'bundle-id': string }>();
  const router = useRouter();
  const bundleId = params['bundle-id'];
  const prompt = practicePrompts[bundleId];
  const bundle = findBundle(bundleId);
  const [answer, setAnswer] = useState('');
  const [attempted, setAttempted] = useState(false);
  const [supportVisible, setSupportVisible] = useState(false);
  const { colors, spacing, radii, layout, typography } = useTheme();
  const correct = useMemo(() => (prompt ? answerMatches(prompt, answer) : false), [answer, prompt]);

  if (!prompt || !bundle) {
    return (
      <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ padding: spacing.lg }}>
        <Stack.Title>Practice unavailable</Stack.Title>
        <ThemedText variant="heading">This bundle has no deterministic practice contract yet.</ThemedText>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      keyboardShouldPersistTaps="handled"
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={{ alignItems: 'center', paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl }}>
      <Stack.Title>{bundle.title}</Stack.Title>
      <View style={{ width: '100%', maxWidth: layout.readingWidth, gap: spacing.lg }}>
        <View style={{ gap: spacing.xs }}>
          <ThemedText variant="caption" tone="accent">
            {bundle.id} · TARGET {prompt.evidenceTarget}
          </ThemedText>
          <ThemedText variant="title">{prompt.cue}</ThemedText>
          <ThemedText variant="callout" tone="muted">
            {prompt.instruction}
          </ThemedText>
        </View>

        <TextInput
          accessibilityLabel="Your answer"
          autoCorrect={false}
          multiline
          value={answer}
          onChangeText={(value) => {
            setAnswer(value);
            setAttempted(false);
          }}
          placeholder="Type your response"
          placeholderTextColor={colors.textFaint}
          style={{
            minHeight: 132,
            padding: spacing.md,
            borderWidth: 1,
            borderColor: attempted ? (correct ? colors.success : colors.danger) : colors.separator,
            borderRadius: radii.large,
            borderCurve: 'continuous',
            backgroundColor: colors.surfaceRaised,
            color: colors.text,
            textAlignVertical: 'top',
            ...typography.body,
          }}
        />

        {supportVisible ? (
          <View style={{ borderLeftWidth: 3, borderLeftColor: colors.accent, paddingLeft: spacing.md, gap: spacing.xxs }}>
            <ThemedText variant="caption" tone="accent">
              SUPPORT USED
            </ThemedText>
            <ThemedText variant="bodyStrong">{prompt.support}</ThemedText>
          </View>
        ) : (
          <PrimaryAction label="Show one hint" variant="quiet" onPress={() => setSupportVisible(true)} />
        )}

        {attempted ? (
          <View style={{ gap: spacing.xs }}>
            <ThemedText variant="bodyStrong" tone={correct ? 'accent' : 'danger'}>
              {correct ? 'Meaning and form match this practice contract.' : 'Not yet. Keep the requested function in view.'}
            </ThemedText>
            <ThemedText variant="caption" tone="faint">
              This exact local check is intentionally narrow; open-ended speaking needs a different evaluator.
            </ThemedText>
          </View>
        ) : null}

        <View style={{ gap: spacing.xs }}>
          <PrimaryAction label="Check response" disabled={!answer.trim()} onPress={() => setAttempted(true)} />
          {correct ? <PrimaryAction label="Return to queue" variant="quiet" onPress={() => router.back()} /> : null}
        </View>
      </View>
    </ScrollView>
  );
}

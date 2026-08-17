import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import Stack from 'expo-router/stack';
import { Pressable, ScrollView, View } from 'react-native';
import { useState } from 'react';

import { PrimaryAction } from '@/components/primary-action';
import { ProgressLine } from '@/components/progress-line';
import { ThemedText } from '@/components/themed-text';
import { findMission } from '@/content/reference-track';
import {
  advanceSession,
  canAdvance,
  choiceIsCorrect,
  currentStep,
  initialSessionState,
  sessionIsComplete,
  type SessionState,
} from '@/domain/session-engine';
import { useTheme } from '@/theme';

export function MissionScreen() {
  const params = useLocalSearchParams<{ 'mission-id': string }>();
  const router = useRouter();
  const mission = findMission(params['mission-id']);
  const [state, setState] = useState<SessionState>(initialSessionState);
  const { colors, spacing, radii, layout } = useTheme();

  if (!mission) {
    return (
      <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ padding: spacing.lg }}>
        <Stack.Title>Mission unavailable</Stack.Title>
        <ThemedText variant="heading">This mission is not in the reference build.</ThemedText>
      </ScrollView>
    );
  }

  if (sessionIsComplete(mission, state)) {
    return (
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ backgroundColor: colors.background }}
        contentContainerStyle={{ alignItems: 'center', padding: spacing.lg }}>
        <Stack.Title>{mission.title}</Stack.Title>
        <View style={{ width: '100%', maxWidth: layout.readingWidth, gap: spacing.lg }}>
          <ThemedText variant="caption" tone="accent">
            MISSION REHEARSED
          </ThemedText>
          <ThemedText variant="display">You handled the changed platform number.</ThemedText>
          <ThemedText tone="muted">
            This local build records a rehearsal trace only. It does not promote a speaking claim without calibrated
            evidence.
          </ThemedText>
          <View style={{ gap: spacing.xs, borderTopWidth: 1, borderTopColor: colors.separator, paddingTop: spacing.md }}>
            <ThemedText variant="caption" tone="faint">
              TRACE
            </ThemedText>
            <ThemedText variant="bodyStrong">{state.completedStepIds.length} mission beats completed</ThemedText>
            <ThemedText variant="callout" tone="muted">
              Changed detail: {mission.changed_detail}
            </ThemedText>
          </View>
          <PrimaryAction label="Back to Atlas" onPress={() => router.back()} />
        </View>
      </ScrollView>
    );
  }

  const step = currentStep(mission, state);
  const selectedCorrect = state.selectedChoiceId ? choiceIsCorrect(step, state.selectedChoiceId) : undefined;
  const progress = state.stepIndex / mission.steps.length;

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      keyboardShouldPersistTaps="handled"
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={{ alignItems: 'center', paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl }}>
      <Stack.Title>{mission.title}</Stack.Title>
      <View style={{ width: '100%', maxWidth: layout.readingWidth, gap: spacing.lg }}>
        <View style={{ gap: spacing.sm }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: spacing.md }}>
            <ThemedText variant="caption" tone="current">
              {mission.setting.toUpperCase()}
            </ThemedText>
            <ThemedText variant="caption" tone="faint" style={{ fontVariant: ['tabular-nums'] }}>
              {state.stepIndex + 1} / {mission.steps.length}
            </ThemedText>
          </View>
          <ProgressLine value={progress} tone="current" />
        </View>

        <Link.AppleZoomTarget>
          <View
            style={{
              width: spacing.xxl,
              height: spacing.xxl,
              borderRadius: radii.pill,
              backgroundColor: colors.current,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ThemedText variant="bodyStrong" tone="inverse">
              {state.stepIndex + 1}
            </ThemedText>
          </View>
        </Link.AppleZoomTarget>

        <View style={{ gap: spacing.sm }}>
          <ThemedText variant="caption" tone="accent">
            TARGET {step.evidence_level}
          </ThemedText>
          <ThemedText variant="title">{step.title}</ThemedText>
          <ThemedText tone="muted">{step.prompt}</ThemedText>
        </View>

        {step.choices ? (
          <View accessibilityRole="radiogroup" style={{ gap: spacing.xs }}>
            {step.choices.map((choice) => {
              const selected = state.selectedChoiceId === choice.id;
              return (
                <Pressable
                  key={choice.id}
                  accessibilityRole="radio"
                  accessibilityState={{ selected }}
                  onPress={() => setState((current) => ({ ...current, selectedChoiceId: choice.id }))}
                  style={({ pressed }) => ({
                    minHeight: layout.touchTarget,
                    justifyContent: 'center',
                    padding: spacing.md,
                    borderWidth: selected ? 2 : 1,
                    borderColor: selected ? colors.accent : colors.separator,
                    borderRadius: radii.medium,
                    borderCurve: 'continuous',
                    backgroundColor: pressed || selected ? colors.accentSoft : colors.surfaceRaised,
                  })}>
                  <ThemedText variant="bodyStrong">{choice.label}</ThemedText>
                </Pressable>
              );
            })}
            {selectedCorrect === false ? (
              <ThemedText variant="callout" tone="danger">
                That line does a different job. Keep the destination and changed number in the request.
              </ThemedText>
            ) : null}
          </View>
        ) : (
          <View style={{ gap: spacing.sm }}>
            {state.supportRevealed && step.source_line ? (
              <View style={{ gap: spacing.xs, borderLeftWidth: 3, borderLeftColor: colors.accent, paddingLeft: spacing.md }}>
                <ThemedText variant="code" selectable>
                  {step.source_line}
                </ThemedText>
                <ThemedText variant="callout" tone="muted" selectable>
                  {step.translation}
                </ThemedText>
              </View>
            ) : (
              <PrimaryAction
                label="Reveal support"
                variant="quiet"
                onPress={() => setState((current) => ({ ...current, supportRevealed: true }))}
              />
            )}
          </View>
        )}

        <View style={{ gap: spacing.xs }}>
          <PrimaryAction
            label={step.choices ? 'Continue' : 'Log rehearsal & continue'}
            disabled={!canAdvance(step, state)}
            onPress={() => setState((current) => advanceSession(mission, current))}
          />
          <ThemedText variant="caption" tone="faint" style={{ textAlign: 'center' }}>
            Support use remains attached to the attempt trace.
          </ThemedText>
        </View>
      </View>
    </ScrollView>
  );
}

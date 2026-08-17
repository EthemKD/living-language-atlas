import { useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';

import { PrimaryAction } from '@/components/primary-action';
import { PhraseLens } from '@/components/phrase-lens';
import { ThemedText } from '@/components/themed-text';
import type { EncounterTask } from '@/content/first-encounter';
import evidenceLedger from '@/content/first-encounter-evidence.json';
import { useTheme } from '@/theme';

export type GuidedTaskUnscoredReason = 'support' | 'typed_fallback';

export type GuidedTaskCompletion = {
  retrievalPhraseRevealed: boolean;
  incorrectCheckCount: number;
  outcome: 'accepted' | 'unscored';
  unscoredReason?: GuidedTaskUnscoredReason;
};

type GuidedTaskProps = {
  task: EncounterTask;
  onComplete: (completion: GuidedTaskCompletion) => void;
  actionLabel?: string;
  phrasePresentation?: 'reference' | 'retrieve';
};

export function GuidedTask({
  task,
  onComplete,
  actionLabel = 'Continue',
  phrasePresentation = 'reference',
}: GuidedTaskProps) {
  const [selectedChoiceId, setSelectedChoiceId] = useState<string>();
  const [selectedTokenIndexes, setSelectedTokenIndexes] = useState<number[]>([]);
  const [checked, setChecked] = useState(false);
  const [retrievalPhraseRevealed, setRetrievalPhraseRevealed] = useState(false);
  const [incorrectCheckCount, setIncorrectCheckCount] = useState(0);
  const [unscoredReason, setUnscoredReason] = useState<GuidedTaskUnscoredReason>();
  const [typedFallback, setTypedFallback] = useState(false);
  const [typedResponse, setTypedResponse] = useState('');
  const { colors, spacing, radii, layout, typography } = useTheme();
  const evidenceCard = evidenceLedger.cards.find((card) => card.content_id === task.id);
  const unscored = Boolean(unscoredReason);

  const selectedChoice = task.kind === 'choice' ? task.choices.find((choice) => choice.id === selectedChoiceId) : undefined;
  const choiceCorrect = selectedChoice?.correct === true;
  const builtTokens =
    task.kind === 'build'
      ? selectedTokenIndexes.flatMap((index) => {
          const token = task.tokens[index];
          return token ? [token] : [];
        })
      : [];
  const buildCorrect =
    task.kind === 'build' &&
    builtTokens.length === task.correct_token_order.length &&
    builtTokens.every((token, index) => token === task.correct_token_order[index]);
  const solved = task.kind === 'notice' || choiceCorrect || buildCorrect;
  const canCheck =
    !unscored &&
    !typedFallback &&
    (task.kind === 'choice' ? Boolean(selectedChoiceId) : task.kind === 'build' ? builtTokens.length === task.tokens.length : false);
  const feedback =
    unscored || typedFallback || !checked || task.kind === 'notice' || solved
      ? undefined
      : (task.retry_hint ?? 'Keep the target function in view, then try the next variation.');

  function resetAttempt() {
    setSelectedChoiceId(undefined);
    setSelectedTokenIndexes([]);
    setChecked(false);
  }

  function checkResponse() {
    if (!solved) setIncorrectCheckCount((currentCount) => currentCount + 1);
    setChecked(true);
  }

  function completeTask(outcome: GuidedTaskCompletion['outcome'] = 'accepted') {
    onComplete({
      retrievalPhraseRevealed,
      incorrectCheckCount,
      outcome,
      unscoredReason: outcome === 'unscored' ? (unscoredReason ?? 'support') : undefined,
    });
  }

  function continueUnscored(reason: GuidedTaskUnscoredReason) {
    setUnscoredReason(reason);
    setRetrievalPhraseRevealed(true);
  }

  return (
    <View style={{ gap: spacing.lg }}>
      <View style={{ gap: spacing.xs }}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }}>
          <ThemedText variant="caption" tone="accent">
            TARGET · {task.target_skill_id.toUpperCase()}
          </ThemedText>
          {evidenceCard ? (
            <ThemedText variant="caption" tone="current">
              EVIDENCE · {evidenceCard.evidence_levels.join(' · ')}
            </ThemedText>
          ) : null}
        </View>
        {evidenceCard ? <ThemedText variant="callout" tone="muted">{evidenceCard.function}</ThemedText> : null}
        <ThemedText variant="title">{task.title}</ThemedText>
        <ThemedText tone="muted">{task.prompt}</ThemedText>
      </View>

      <PhraseLens
        sourceLine={task.source_line}
        translation={task.translation}
        explanation={task.kind === 'notice' ? task.explanation : undefined}
        presentation={phrasePresentation}
        revealSupportedPhrase={unscored}
        onRevealSupportedPhrase={() => setRetrievalPhraseRevealed(true)}
      />

      {typedFallback && !unscored ? (
        <View style={{ gap: spacing.sm }}>
          <View style={{ gap: spacing.xxs, borderLeftWidth: 3, borderLeftColor: colors.current, paddingLeft: spacing.md }}>
            <ThemedText variant="caption" tone="current">
              TYPED FALLBACK · NOT EVALUATED
            </ThemedText>
            <ThemedText variant="callout" tone="muted">
              Type what you would try. This reference build will not judge spelling or accept variants yet; it will only
              keep the attempt transparent and unscored.
            </ThemedText>
          </View>
          <TextInput
            accessibilityLabel="Typed response fallback"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={setTypedResponse}
            placeholder="Type your response"
            placeholderTextColor={colors.textFaint}
            value={typedResponse}
            style={{
              minHeight: layout.touchTarget,
              paddingHorizontal: spacing.md,
              paddingVertical: spacing.sm,
              borderWidth: 1,
              borderColor: colors.separator,
              borderRadius: radii.medium,
              borderCurve: 'continuous',
              backgroundColor: colors.surfaceRaised,
              ...typography.body,
              color: colors.text,
            }}
          />
        </View>
      ) : null}

      {!typedFallback && !unscored && task.kind === 'choice' ? (
        <View accessibilityRole="radiogroup" style={{ gap: spacing.xs }}>
          {task.choices.map((choice) => {
            const selected = selectedChoiceId === choice.id;
            return (
              <Pressable
                key={choice.id}
                accessibilityRole="radio"
                accessibilityState={{ selected }}
                onPress={() => {
                  setSelectedChoiceId(choice.id);
                  setChecked(false);
                }}
                style={({ pressed }) => ({
                  minHeight: layout.touchTarget,
                  justifyContent: 'center',
                  padding: spacing.md,
                  borderWidth: selected ? 2 : 1,
                  borderColor: selected ? colors.accent : colors.separator,
                  borderRadius: radii.medium,
                  borderCurve: 'continuous',
                  backgroundColor: selected || pressed ? colors.accentSoft : colors.surfaceRaised,
                })}>
                <ThemedText variant="bodyStrong">{choice.label}</ThemedText>
              </Pressable>
            );
          })}
        </View>
      ) : null}

      {!typedFallback && !unscored && task.kind === 'build' ? (
        <View style={{ gap: spacing.md }}>
          <View
            accessibilityLabel="Built response"
            style={{
              minHeight: layout.touchTarget,
              justifyContent: 'center',
              padding: spacing.md,
              borderWidth: 1,
              borderColor: checked && !buildCorrect ? colors.danger : colors.separator,
              borderRadius: radii.medium,
              borderCurve: 'continuous',
              backgroundColor: colors.surfaceRaised,
            }}>
            <ThemedText tone={builtTokens.length ? 'default' : 'faint'}>
              {builtTokens.length ? builtTokens.join(' ') : 'Build your response below'}
            </ThemedText>
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs }}>
            {task.tokens.map((token, index) => {
              const selected = selectedTokenIndexes.includes(index);
              return (
                <Pressable
                  key={`${task.id}-${token}`}
                  accessibilityRole="button"
                  accessibilityState={{ disabled: selected }}
                  disabled={selected}
                  onPress={() => {
                    setSelectedTokenIndexes((current) => [...current, index]);
                    setChecked(false);
                  }}
                  style={({ pressed }) => ({
                    minHeight: layout.touchTarget,
                    justifyContent: 'center',
                    paddingHorizontal: spacing.md,
                    borderWidth: 1,
                    borderColor: selected ? colors.separator : colors.accent,
                    borderRadius: radii.pill,
                    borderCurve: 'continuous',
                    backgroundColor: selected ? colors.surface : pressed ? colors.accentSoft : colors.surfaceRaised,
                    opacity: selected ? 0.48 : 1,
                  })}>
                  <ThemedText variant="bodyStrong" tone={selected ? 'faint' : 'accent'}>
                    {token}
                  </ThemedText>
                </Pressable>
              );
            })}
          </View>
          {selectedTokenIndexes.length ? <PrimaryAction label="Reset response" variant="quiet" onPress={resetAttempt} /> : null}
        </View>
      ) : null}

      {feedback ? (
        <View style={{ gap: spacing.xxs, borderLeftWidth: 3, borderLeftColor: colors.current, paddingLeft: spacing.md }}>
          <ThemedText variant="caption" tone="current">
            TRY AGAIN
          </ThemedText>
          <ThemedText variant="callout" tone="muted">
            {feedback}
          </ThemedText>
        </View>
      ) : null}

      {solved && checked && !unscored ? (
        <View style={{ gap: spacing.xxs, borderLeftWidth: 3, borderLeftColor: colors.success, paddingLeft: spacing.md }}>
          <ThemedText variant="caption" tone="accent">
            GUIDED ATTEMPT LOGGED
          </ThemedText>
          <ThemedText variant="callout" tone="muted">
            This records one bounded rehearsal. It is not a level, accent, or fluency score.
          </ThemedText>
        </View>
      ) : null}

      {unscored ? (
        <View style={{ gap: spacing.xxs, borderLeftWidth: 3, borderLeftColor: colors.current, paddingLeft: spacing.md }}>
          <ThemedText variant="caption" tone="current">
            {unscoredReason === 'typed_fallback' ? 'UNSCORED · TYPED FALLBACK' : 'UNSCORED · SUPPORT PATH'}
          </ThemedText>
          <ThemedText variant="callout" tone="muted">
            {unscoredReason === 'typed_fallback'
              ? 'Your typed attempt is kept only as a transparent local passage in this reference build. It is not evaluated and does not add skill evidence.'
              : 'You chose to continue with the supported phrase. This passage is logged for transparency, but it does not add skill evidence or mark the response correct.'}
          </ThemedText>
        </View>
      ) : null}

      {task.kind === 'notice' ? <PrimaryAction label="I see it" onPress={completeTask} /> : null}
      {task.kind !== 'notice' && !typedFallback && !unscored && !(solved && checked) ? (
        <PrimaryAction
          label={checked ? 'Try another response' : 'Check response'}
          disabled={!canCheck}
          onPress={checked ? resetAttempt : checkResponse}
        />
      ) : null}
      {task.kind !== 'notice' && !typedFallback && !unscored && !solved ? (
        <>
          <PrimaryAction label="Type a response instead" variant="quiet" onPress={() => setTypedFallback(true)} />
          <PrimaryAction label="Use support · continue unscored" variant="quiet" onPress={() => continueUnscored('support')} />
        </>
      ) : null}
      {task.kind !== 'notice' && typedFallback && !unscored ? (
        <>
          <PrimaryAction
            label="Continue typed attempt · unscored"
            disabled={!typedResponse.trim()}
            onPress={() => continueUnscored('typed_fallback')}
          />
          <PrimaryAction label="Reveal support instead" variant="quiet" onPress={() => continueUnscored('support')} />
          <PrimaryAction label="Use structured response instead" variant="quiet" onPress={() => setTypedFallback(false)} />
        </>
      ) : null}
      {task.kind !== 'notice' && unscored ? (
        <PrimaryAction label="Continue without scoring" onPress={() => completeTask('unscored')} />
      ) : null}
      {task.kind !== 'notice' && !typedFallback && !unscored && solved && checked ? <PrimaryAction label={actionLabel} onPress={completeTask} /> : null}
    </View>
  );
}

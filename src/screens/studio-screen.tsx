import { useState } from 'react';
import { Pressable, ScrollView, TextInput, View } from 'react-native';

import { PrimaryAction } from '@/components/primary-action';
import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/theme';

type StudioOperation = 'Explain' | 'Drill' | 'Role-play';

const operations: Array<{ id: StudioOperation; detail: string }> = [
  { id: 'Explain', detail: 'Meaning, form and contrast' },
  { id: 'Drill', detail: 'A five-minute retrieval set' },
  { id: 'Role-play', detail: 'A bounded scene with one change' },
];

const planCopy: Record<StudioOperation, string[]> = {
  Explain: ['Anchor the exact source', 'Explain only the selected form', 'Contrast one nearby alternative', 'Check understanding'],
  Drill: ['Keep the source attached', 'Retrieve with support', 'Retrieve without support', 'Change one detail', 'Schedule a return'],
  'Role-play': ['Declare the setting and roles', 'Set one communicative goal', 'Allow repair', 'Change one scene variable', 'Log support used'],
};

export function StudioScreen() {
  const [source, setSource] = useState('');
  const [operation, setOperation] = useState<StudioOperation>('Explain');
  const [built, setBuilt] = useState(false);
  const { colors, spacing, radii, layout, typography } = useTheme();

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      keyboardShouldPersistTaps="handled"
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={{ alignItems: 'center', paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl }}>
      <View style={{ width: '100%', maxWidth: layout.maxContentWidth, gap: spacing.xl }}>
        <View style={{ gap: spacing.sm }}>
          <ThemedText variant="caption" tone="accent">
            SOURCE-BOUND STUDIO
          </ThemedText>
          <ThemedText variant="heading">Start from the exact thing you do not understand.</ThemedText>
          <ThemedText tone="muted">
            Studio is an operation layer, not an empty chatbot. Every explanation, drill or scene must retain its source
            and learning target.
          </ThemedText>
        </View>

        <View style={{ gap: spacing.sm }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: spacing.md }}>
            <ThemedText variant="caption" tone="faint">
              SOURCE
            </ThemedText>
            <Pressable
              accessibilityRole="button"
              onPress={() => {
                setSource('Это платформа номер пять?');
                setBuilt(false);
              }}>
              <ThemedText variant="caption" tone="accent">
                USE CURRENT MISSION
              </ThemedText>
            </Pressable>
          </View>
          <TextInput
            accessibilityLabel="Source text"
            multiline
            value={source}
            onChangeText={(value) => {
              setSource(value);
              setBuilt(false);
            }}
            placeholder="Paste a phrase, sentence, transcript excerpt or your own attempt"
            placeholderTextColor={colors.textFaint}
            style={{
              minHeight: 148,
              padding: spacing.md,
              borderWidth: 1,
              borderColor: colors.separator,
              borderRadius: radii.large,
              borderCurve: 'continuous',
              backgroundColor: colors.surfaceRaised,
              color: colors.text,
              textAlignVertical: 'top',
              ...typography.body,
            }}
          />
        </View>

        <View style={{ gap: spacing.sm }}>
          <ThemedText variant="caption" tone="faint">
            OPERATION
          </ThemedText>
          <View accessibilityRole="radiogroup" style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs }}>
            {operations.map((item) => {
              const selected = operation === item.id;
              return (
                <Pressable
                  key={item.id}
                  accessibilityRole="radio"
                  accessibilityLabel={`${item.id}: ${item.detail}`}
                  accessibilityState={{ selected }}
                  onPress={() => {
                    setOperation(item.id);
                    setBuilt(false);
                  }}
                  style={({ pressed }) => ({
                    minHeight: layout.touchTarget,
                    justifyContent: 'center',
                    paddingHorizontal: spacing.md,
                    borderRadius: radii.pill,
                    borderCurve: 'continuous',
                    backgroundColor: selected ? colors.accent : pressed ? colors.surface : colors.surfaceRaised,
                  })}>
                  <ThemedText variant="callout" tone={selected ? 'inverse' : 'default'}>
                    {item.id}
                  </ThemedText>
                </Pressable>
              );
            })}
          </View>
        </View>

        <PrimaryAction label={`Build ${operation.toLowerCase()} plan`} disabled={!source.trim()} onPress={() => setBuilt(true)} />

        {built ? (
          <View style={{ gap: spacing.md, borderTopWidth: 1, borderTopColor: colors.separator, paddingTop: spacing.lg }}>
            <View style={{ gap: spacing.xxs }}>
              <ThemedText variant="caption" tone="accent">
                LOCAL PLAN PREVIEW
              </ThemedText>
              <ThemedText variant="heading">{operation} from this source</ThemedText>
              <ThemedText variant="code" selectable numberOfLines={3}>
                {source.trim()}
              </ThemedText>
            </View>
            {planCopy[operation].map((step, index) => (
              <View key={step} style={{ flexDirection: 'row', gap: spacing.md, alignItems: 'baseline' }}>
                <ThemedText variant="caption" tone="faint" style={{ minWidth: spacing.lg, fontVariant: ['tabular-nums'] }}>
                  {String(index + 1).padStart(2, '0')}
                </ThemedText>
                <ThemedText variant="bodyStrong" style={{ flex: 1 }}>
                  {step}
                </ThemedText>
              </View>
            ))}
            <ThemedText variant="caption" tone="faint">
              No model output is fabricated here. AI execution stays off until source retention, privacy and evaluation
              contracts are wired.
            </ThemedText>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
}

import { ScrollView, View } from 'react-native';

import { ProgressLine } from '@/components/progress-line';
import { ThemedText } from '@/components/themed-text';
import { evidenceRank, getEvidenceRows, prototypeLearner } from '@/domain/learning-state';
import { useTheme } from '@/theme';

export function YouScreen() {
  const evidenceRows = getEvidenceRows();
  const { colors, spacing, layout } = useTheme();

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={{ alignItems: 'center', paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl }}>
      <View style={{ width: '100%', maxWidth: layout.maxContentWidth, gap: spacing.xl }}>
        <View style={{ gap: spacing.xs }}>
          <ThemedText variant="caption" tone="accent">
            PROTOTYPE PROFILE · LOCAL DATA
          </ThemedText>
          <ThemedText variant="heading">Russian foundation track</ThemedText>
          <ThemedText tone="muted">English interface · evidence language stays literal and inspectable.</ThemedText>
        </View>

        <View style={{ flexDirection: 'row', gap: spacing.xl, flexWrap: 'wrap' }}>
          <View style={{ minWidth: 136, gap: spacing.xxs }}>
            <ThemedText variant="display" style={{ fontVariant: ['tabular-nums'] }}>
              {prototypeLearner.habitDays}
            </ThemedText>
            <ThemedText variant="caption" tone="muted">
              HABIT DAYS
            </ThemedText>
          </View>
          <View style={{ minWidth: 136, gap: spacing.xxs }}>
            <ThemedText variant="display" style={{ fontVariant: ['tabular-nums'] }}>
              {prototypeLearner.practiceCredits}
            </ThemedText>
            <ThemedText variant="caption" tone="muted">
              PRACTICE CREDITS
            </ThemedText>
          </View>
        </View>
        <ThemedText variant="caption" tone="faint">
          Habit and credits never alter the evidence ladder.
        </ThemedText>

        <View style={{ gap: spacing.sm }}>
          <ThemedText variant="caption" tone="faint">
            SKILL EVIDENCE
          </ThemedText>
          {evidenceRows.map((row) => (
            <View
              key={row.bundleId}
              style={{ gap: spacing.xs, paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.separator }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: spacing.md }}>
                <View style={{ flex: 1, gap: spacing.xxs }}>
                  <ThemedText variant="bodyStrong">{row.bundle?.title ?? row.bundleId}</ThemedText>
                  <ThemedText variant="callout" tone="muted">
                    {row.bundle?.original_can_do ?? 'Reference bundle'}
                  </ThemedText>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <ThemedText variant="bodyStrong" tone="accent">
                    {row.level}
                  </ThemedText>
                  <ThemedText variant="caption" tone="faint">
                    {row.lastObserved}
                  </ThemedText>
                </View>
              </View>
              <ProgressLine value={evidenceRank(row.level) / 4} tone={row.level === 'E3' ? 'success' : 'accent'} />
            </View>
          ))}
        </View>

        <View style={{ gap: spacing.xs, borderLeftWidth: 3, borderLeftColor: colors.current, paddingLeft: spacing.md }}>
          <ThemedText variant="caption" tone="current">
            CLAIM BOUNDARY
          </ThemedText>
          <ThemedText variant="callout" tone="muted">
            “Seen”, “recognized”, “produced with support”, “transferred” and “returned” remain separate observations.
            The reference build does not claim CEFR or TORFL certification.
          </ThemedText>
        </View>
      </View>
    </ScrollView>
  );
}

import { useRouter } from 'expo-router';
import { ScrollView, View } from 'react-native';

import { ActionRow } from '@/components/action-row';
import { ProgressLine } from '@/components/progress-line';
import { ThemedText } from '@/components/themed-text';
import { practiceQueue } from '@/domain/learning-state';
import { useTheme } from '@/theme';

const gameModes = [
  { title: 'Earshot', detail: 'Distinguish one changed word inside a short scene.', meta: 'LISTEN' },
  { title: 'Phrase forge', detail: 'Rebuild a useful line from meaning-bearing chunks.', meta: 'FORM' },
  { title: 'Route replay', detail: 'Follow directions, then replay them with one change.', meta: 'TRANSFER' },
  { title: 'Quick write', detail: 'Retrieve a line without answer reveal.', meta: 'WRITE' },
] as const;

export function PracticeScreen() {
  const router = useRouter();
  const { colors, spacing, layout } = useTheme();

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={{ alignItems: 'center', paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl }}>
      <View style={{ width: '100%', maxWidth: layout.maxContentWidth, gap: spacing.xl }}>
        <View style={{ gap: spacing.sm }}>
          <ThemedText variant="caption" tone="accent">
            EVIDENCE-LED QUEUE
          </ThemedText>
          <ThemedText variant="heading">10 minutes · three useful returns</ThemedText>
          <ThemedText tone="muted">
            The queue prioritizes missing or decaying evidence. A streak can remind you to return; it cannot make a
            skill look stronger.
          </ThemedText>
          <ProgressLine value={0.36} />
        </View>

        <View>
          <ThemedText variant="caption" tone="faint" style={{ paddingBottom: spacing.xs }}>
            DUE NOW
          </ThemedText>
          {practiceQueue.map((item) => (
            <ActionRow
              key={item.bundleId}
              eyebrow={item.mode}
              title={item.title}
              detail={item.reason}
              meta={item.duration}
              onPress={() =>
                router.push({ pathname: '/practice/session/[bundle-id]', params: { 'bundle-id': item.bundleId } })
              }
            />
          ))}
        </View>

        <View>
          <ThemedText variant="caption" tone="faint" style={{ paddingBottom: spacing.xs }}>
            DAILY GAMES · CONTENT CONTRACTS LOCKED
          </ThemedText>
          {gameModes.map((mode) => (
            <ActionRow key={mode.title} title={mode.title} detail={mode.detail} meta={mode.meta} />
          ))}
          <ThemedText variant="caption" tone="faint" style={{ paddingTop: spacing.sm }}>
            Game shells stay disabled until their scoring and language-review gates are implemented.
          </ThemedText>
        </View>
      </View>
    </ScrollView>
  );
}

import { View } from 'react-native';

import type { SkillEvidence, SkillEvidenceStatus } from '@/domain/skill-evidence';
import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/theme';

type SkillEvidencePanelProps = {
  evidence: readonly SkillEvidence[];
};

const statusLabels: Record<SkillEvidenceStatus, string> = {
  unknown: 'NOT OBSERVED',
  emerging: 'EMERGING',
  functional: 'CHANGED CONTEXT',
  stable: 'DELAYED RETURN',
};

function formatObservedAt(timestamp: number | null) {
  if (!timestamp) return 'No timestamped passage yet';

  return `Observed ${new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(timestamp))}`;
}

function statusTone(status: SkillEvidenceStatus): 'accent' | 'current' | 'faint' {
  if (status === 'stable') return 'accent';
  if (status === 'unknown') return 'faint';
  return 'current';
}

export function SkillEvidencePanel({ evidence }: SkillEvidencePanelProps) {
  const { colors, spacing } = useTheme();

  return (
    <View style={{ gap: spacing.sm, borderTopWidth: 1, borderTopColor: colors.separator, paddingTop: spacing.md }}>
      <View style={{ gap: spacing.xxs }}>
        <ThemedText variant="caption" tone="current">
          OBSERVABLE SKILL MAP
        </ThemedText>
        <ThemedText variant="heading">What this route can actually show</ThemedText>
        <ThemedText variant="callout" tone="muted">
          Each row is derived from fixed task traces, their context and phrase-support use. It never becomes a level,
          accent judgement or fluency score.
        </ThemedText>
      </View>

      {evidence.map((item) => (
        <View key={item.id} style={{ gap: spacing.xxs, paddingVertical: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.separator }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: spacing.md }}>
            <ThemedText variant="bodyStrong" style={{ flex: 1 }}>
              {item.title}
            </ThemedText>
            <ThemedText variant="caption" tone={statusTone(item.status)}>
              {statusLabels[item.status]}
            </ThemedText>
          </View>
          <ThemedText variant="callout" tone="muted">
            {item.canDo}
          </ThemedText>
          <ThemedText variant="caption" tone="faint">
            {item.observation} · {formatObservedAt(item.observedAt)}
          </ThemedText>
          <ThemedText variant="callout" tone="muted">
            Gap: {item.gap}
          </ThemedText>
          <ThemedText variant="caption" tone="current">
            NEXT · {item.nextAction}
          </ThemedText>
        </View>
      ))}

      <ThemedText variant="caption" tone="faint">
        Confidence boundary: {evidence[0]?.confidence ?? 'Bounded deterministic route trace; not a proficiency estimate.'}
      </ThemedText>
    </View>
  );
}

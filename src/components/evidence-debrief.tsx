import { View } from 'react-native';

import type { EncounterTask } from '@/content/first-encounter';
import evidenceLedger from '@/content/first-encounter-evidence.json';
import type { FirstEncounterTaskTrace } from '@/domain/first-encounter-state';
import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/theme';

type EvidenceDebriefProps = {
  tasks: readonly EncounterTask[];
  taskTraces: readonly FirstEncounterTaskTrace[];
};

export function EvidenceDebrief({ tasks, taskTraces }: EvidenceDebriefProps) {
  const { colors, spacing } = useTheme();
  const traceByTaskId = new Map(taskTraces.map((trace) => [trace.taskId, trace]));

  return (
    <View style={{ gap: spacing.sm, borderTopWidth: 1, borderTopColor: colors.separator, paddingTop: spacing.md }}>
      <ThemedText variant="caption" tone="current">
        EVIDENCE SNAPSHOT
      </ThemedText>
      <ThemedText variant="callout" tone="muted">
        These rows describe this device&apos;s fixed rehearsal trace. They are not a level, accent, fluency, or
        Russian-quality score.
      </ThemedText>
      {tasks.map((task) => {
        const card = evidenceLedger.cards.find((candidate) => candidate.content_id === task.id);
        const trace = traceByTaskId.get(task.id);

        return (
          <EvidenceDebriefRow
            key={task.id}
            level={card?.evidence_levels.join(' · ') ?? 'UNMAPPED'}
            detail={card?.function ?? task.title}
            status={trace ? 'RECORDED' : 'NOT RECORDED'}
            traceDetail={
              trace
                ? `${trace.completions} logged · latest attempt ${trace.incorrectCheckCount} retry check${
                    trace.incorrectCheckCount === 1 ? '' : 's'
                  } · ${trace.retrievalPhraseRevealed ? 'support revealed' : 'support not revealed'}`
                : 'No device trace yet.'
            }
          />
        );
      })}
    </View>
  );
}

function EvidenceDebriefRow({
  level,
  detail,
  status,
  traceDetail,
}: {
  level: string;
  detail: string;
  status: 'RECORDED' | 'NOT RECORDED';
  traceDetail: string;
}) {
  const { colors, spacing } = useTheme();

  return (
    <View style={{ gap: spacing.xxs, paddingVertical: spacing.xs, borderBottomWidth: 1, borderBottomColor: colors.separator }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: spacing.sm }}>
        <ThemedText variant="caption" tone="accent">
          {level}
        </ThemedText>
        <ThemedText variant="caption" tone={status === 'RECORDED' ? 'accent' : 'faint'}>
          {status}
        </ThemedText>
      </View>
      <ThemedText variant="callout" tone="muted">
        {detail}
      </ThemedText>
      <ThemedText variant="caption" tone="faint">
        {traceDetail}
      </ThemedText>
    </View>
  );
}

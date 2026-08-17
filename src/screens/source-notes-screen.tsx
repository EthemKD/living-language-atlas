import { Linking, ScrollView, View } from 'react-native';

import { ActionRow } from '@/components/action-row';
import { ThemedText } from '@/components/themed-text';
import { sourceRegistry, type SourceRegistryEntry } from '@/content/source-registry';
import { useTheme } from '@/theme';

function useModeLabel(source: SourceRegistryEntry) {
  if (source.use_mode === 'learning_design_only') return 'LEARNING DESIGN';
  if (source.use_mode === 'topic_scope_only') return 'TOPIC SCOPE';
  return 'CURRICULUM SCOPE';
}

function SourceNote({ source }: { source: SourceRegistryEntry }) {
  const { colors, spacing } = useTheme();

  return (
    <View style={{ gap: spacing.xs, paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.separator }}>
      <ActionRow
        eyebrow={useModeLabel(source)}
        title={source.publisher}
        detail={source.authority_type}
        meta="OPEN"
        onPress={() => void Linking.openURL(source.url)}
      />
      <View style={{ gap: spacing.xxs }}>
        <ThemedText variant="caption" tone="accent">
          USED TO CONSTRAIN
        </ThemedText>
        <ThemedText variant="callout" tone="muted">
          {source.supports.join(' · ')}
        </ThemedText>
      </View>
      <View style={{ gap: spacing.xxs }}>
        <ThemedText variant="caption" tone="faint">
          NOT EVIDENCE FOR
        </ThemedText>
        <ThemedText variant="callout" tone="muted">
          {source.does_not_support.join(' · ')}
        </ThemedText>
      </View>
    </View>
  );
}

export function SourceNotesScreen() {
  const { colors, spacing, layout } = useTheme();
  const scopeSources = sourceRegistry.sources.filter((source) => source.use_mode !== 'learning_design_only');
  const learningDesignSources = sourceRegistry.sources.filter((source) => source.use_mode === 'learning_design_only');

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={{ alignItems: 'center', paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl }}>
      <View style={{ width: '100%', maxWidth: layout.readingWidth, gap: spacing.xl }}>
        <View style={{ gap: spacing.xs }}>
          <ThemedText variant="caption" tone="accent">
            SOURCE NOTES · REFERENCE BUILD
          </ThemedText>
          <ThemedText variant="heading">What guides the route—and what it cannot prove.</ThemedText>
          <ThemedText tone="muted">
            These public sources constrain topic choice and learning-sequence design. They do not license copied course
            material, approve individual learner-facing Russian strings, or certify anyone’s ability.
          </ThemedText>
        </View>

        <View style={{ gap: spacing.xs }}>
          <ThemedText variant="caption" tone="faint">
            CURRICULUM AND TOPIC SCOPE · {scopeSources.length} SOURCES
          </ThemedText>
          {scopeSources.map((source) => (
            <SourceNote key={source.id} source={source} />
          ))}
        </View>

        <View style={{ gap: spacing.xs }}>
          <ThemedText variant="caption" tone="faint">
            LEARNING-SEQUENCE DESIGN · {learningDesignSources.length} SOURCES
          </ThemedText>
          {learningDesignSources.map((source) => (
            <SourceNote key={source.id} source={source} />
          ))}
        </View>

        <View style={{ gap: spacing.xs, borderLeftWidth: 3, borderLeftColor: colors.current, paddingLeft: spacing.md }}>
          <ThemedText variant="caption" tone="current">
            REVIEW STILL REQUIRED
          </ThemedText>
          <ThemedText variant="callout" tone="muted">
            The first Russian route is still a reference draft. A qualified Russian-language reviewer and traceable
            learner-ready audio remain required before production publication.
          </ThemedText>
        </View>
      </View>
    </ScrollView>
  );
}

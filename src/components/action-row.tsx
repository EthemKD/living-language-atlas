import { Pressable, View, type StyleProp, type ViewStyle } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/theme';

type ActionRowProps = {
  eyebrow?: string;
  title: string;
  detail?: string;
  meta?: string;
  onPress?: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function ActionRow({ eyebrow, title, detail, meta, onPress, disabled = false, style }: ActionRowProps) {
  const { colors, spacing, layout } = useTheme();

  return (
    <Pressable
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityState={{ disabled }}
      disabled={!onPress || disabled}
      onPress={onPress}
      style={({ pressed }) => [
        {
          minHeight: layout.touchTarget,
          flexDirection: 'row',
          alignItems: 'center',
          gap: spacing.md,
          paddingVertical: spacing.md,
          paddingHorizontal: spacing.xs,
          borderBottomWidth: 1,
          borderBottomColor: colors.separator,
          backgroundColor: pressed ? colors.surface : 'transparent',
          opacity: disabled ? 0.48 : 1,
        },
        style,
      ]}>
      <View style={{ flex: 1, gap: spacing.xxs }}>
        {eyebrow ? (
          <ThemedText variant="caption" tone="accent">
            {eyebrow.toUpperCase()}
          </ThemedText>
        ) : null}
        <ThemedText variant="bodyStrong">{title}</ThemedText>
        {detail ? (
          <ThemedText variant="callout" tone="muted">
            {detail}
          </ThemedText>
        ) : null}
      </View>
      <View style={{ alignItems: 'flex-end', gap: spacing.xxs }}>
        {meta ? (
          <ThemedText variant="caption" tone="faint" style={{ fontVariant: ['tabular-nums'] }}>
            {meta}
          </ThemedText>
        ) : null}
        {onPress ? (
          <ThemedText variant="heading" tone="faint" accessibilityElementsHidden>
            ›
          </ThemedText>
        ) : null}
      </View>
    </Pressable>
  );
}

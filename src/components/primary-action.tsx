import { ActivityIndicator, Pressable, type StyleProp, type ViewStyle } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/theme';

type PrimaryActionProps = {
  label: string;
  onPress: () => void;
  variant?: 'filled' | 'quiet';
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function PrimaryAction({
  label,
  onPress,
  variant = 'filled',
  disabled = false,
  loading = false,
  style,
}: PrimaryActionProps) {
  const { colors, spacing, radii, layout } = useTheme();
  const unavailable = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: unavailable, busy: loading }}
      disabled={unavailable}
      onPress={onPress}
      style={({ pressed }) => [
        {
          minHeight: layout.touchTarget,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: spacing.lg,
          paddingVertical: spacing.sm,
          borderRadius: radii.pill,
          borderCurve: 'continuous',
          backgroundColor: variant === 'filled' ? colors.accent : colors.surface,
          opacity: unavailable ? 0.44 : pressed ? 0.76 : 1,
          transform: [{ scale: pressed ? 0.985 : 1 }],
        },
        style,
      ]}>
      {loading ? (
        <ActivityIndicator color={variant === 'filled' ? colors.onAccent : colors.accent} />
      ) : (
        <ThemedText variant="bodyStrong" tone={variant === 'filled' ? 'inverse' : 'accent'}>
          {label}
        </ThemedText>
      )}
    </Pressable>
  );
}

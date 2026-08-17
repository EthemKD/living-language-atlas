import { Text, type TextProps, type TextStyle } from 'react-native';

import { useTheme } from '@/theme';

type TextVariant = 'display' | 'title' | 'heading' | 'body' | 'bodyStrong' | 'callout' | 'caption' | 'code';
type TextTone = 'default' | 'muted' | 'faint' | 'accent' | 'current' | 'danger' | 'inverse';

type ThemedTextProps = TextProps & { variant?: TextVariant; tone?: TextTone };

export function ThemedText({
  variant = 'body',
  tone = 'default',
  selectable = false,
  style,
  ...rest
}: ThemedTextProps) {
  const { colors, typography } = useTheme();
  const toneColor = {
    default: colors.text,
    muted: colors.textMuted,
    faint: colors.textFaint,
    accent: colors.accent,
    current: colors.current,
    danger: colors.danger,
    inverse: colors.onAccent,
  }[tone];

  return (
    <Text selectable={selectable} style={[typography[variant] as TextStyle, { color: toneColor }, style]} {...rest} />
  );
}

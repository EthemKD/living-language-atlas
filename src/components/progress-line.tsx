import { View, type StyleProp, type ViewStyle } from 'react-native';

import { useTheme } from '@/theme';

type ProgressLineProps = { value: number; tone?: 'accent' | 'success' | 'current'; style?: StyleProp<ViewStyle> };

export function ProgressLine({ value, tone = 'accent', style }: ProgressLineProps) {
  const { colors, radii } = useTheme();
  const bounded = Math.max(0, Math.min(1, value));
  const fill = tone === 'success' ? colors.success : tone === 'current' ? colors.current : colors.accent;

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: Math.round(bounded * 100) }}
      style={[
        { height: 4, overflow: 'hidden', borderRadius: radii.pill, backgroundColor: colors.separator },
        style,
      ]}>
      <View style={{ width: `${bounded * 100}%`, height: '100%', backgroundColor: fill }} />
    </View>
  );
}

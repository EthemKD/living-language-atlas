import { Color } from 'expo-router';
import { Platform, useColorScheme, type TextStyle } from 'react-native';

const semantic = <T>(value: { ios: T; android: T; default: T }) => Platform.select(value)!;

export const colors = {
  text: semantic({ ios: Color.ios.label, android: Color.android.dynamic.onSurface, default: '#17182B' }),
  textMuted: semantic({
    ios: Color.ios.secondaryLabel,
    android: Color.android.dynamic.onSurfaceVariant,
    default: '#626579',
  }),
  textFaint: semantic({ ios: Color.ios.tertiaryLabel, android: Color.android.dynamic.outline, default: '#8C8EA0' }),
  background: semantic({
    ios: Color.ios.systemBackground,
    android: Color.android.dynamic.surface,
    default: '#F7F5EF',
  }),
  surface: semantic({
    ios: Color.ios.secondarySystemBackground,
    android: Color.android.dynamic.surfaceContainer,
    default: '#EEECE5',
  }),
  surfaceRaised: semantic({
    ios: Color.ios.tertiarySystemBackground,
    android: Color.android.dynamic.surfaceContainerHigh,
    default: '#FFFFFF',
  }),
  separator: semantic({
    ios: Color.ios.separator,
    android: Color.android.dynamic.outlineVariant,
    default: '#D8D5CC',
  }),
  accent: semantic({ ios: Color.ios.systemIndigo, android: Color.android.dynamic.primary, default: '#5651A6' }),
  accentSoft: semantic({
    ios: Color.ios.systemGray5,
    android: Color.android.dynamic.primaryContainer,
    default: '#E6E2F5',
  }),
  current: semantic({ ios: Color.ios.systemOrange, android: Color.android.dynamic.tertiary, default: '#C96C2E' }),
  success: semantic({ ios: Color.ios.systemGreen, android: Color.android.material.primary, default: '#2E7D68' }),
  danger: semantic({ ios: Color.ios.systemRed, android: Color.android.dynamic.error, default: '#B44343' }),
  onAccent: semantic({ ios: '#FFFFFF', android: Color.android.dynamic.onPrimary, default: '#FFFFFF' }),
  atlasInk: '#17182B',
  atlasPaper: '#F7F5EF',
  routeDormant: '#C7C4BA',
  routeComplete: '#387A67',
  routeCurrent: '#D17A35',
  arcArrive: '#6E6AA8',
  arcMove: '#3E7D78',
  arcNeed: '#B56A48',
  arcConnect: '#9A5E73',
  arcParticipate: '#55718F',
  arcSustain: '#68744A',
} as const;

export const spacing = { xxs: 4, xs: 8, sm: 12, md: 16, lg: 24, xl: 32, xxl: 48 } as const;
export const radii = { small: 8, medium: 12, large: 20, xlarge: 28, pill: 999 } as const;

const fonts = Platform.select({
  ios: { sans: 'system-ui', rounded: 'ui-rounded', mono: 'ui-monospace' },
  android: { sans: 'sans-serif', rounded: 'sans-serif', mono: 'monospace' },
  default: { sans: 'system-ui', rounded: 'system-ui', mono: 'ui-monospace' },
})!;

const textStyle = (style: TextStyle) => style;
export const typography = {
  display: textStyle({ fontFamily: fonts.rounded, fontSize: 34, lineHeight: 40, fontWeight: '700' }),
  title: textStyle({ fontFamily: fonts.rounded, fontSize: 28, lineHeight: 34, fontWeight: '700' }),
  phrase: textStyle({ fontFamily: fonts.rounded, fontSize: 24, lineHeight: 32, fontWeight: '700' }),
  heading: textStyle({ fontFamily: fonts.sans, fontSize: 20, lineHeight: 26, fontWeight: '700' }),
  body: textStyle({ fontFamily: fonts.sans, fontSize: 17, lineHeight: 24, fontWeight: '400' }),
  bodyStrong: textStyle({ fontFamily: fonts.sans, fontSize: 17, lineHeight: 24, fontWeight: '600' }),
  callout: textStyle({ fontFamily: fonts.sans, fontSize: 15, lineHeight: 20, fontWeight: '500' }),
  caption: textStyle({ fontFamily: fonts.sans, fontSize: 12, lineHeight: 16, fontWeight: '600' }),
  code: textStyle({ fontFamily: fonts.mono, fontSize: 15, lineHeight: 22, fontWeight: '500' }),
} as const;

export const layout = { maxContentWidth: 760, touchTarget: 44, readingWidth: 620 } as const;
export const shadows = {
  floating: '0 8px 24px rgba(23, 24, 43, 0.12)',
  pressed: '0 2px 8px rgba(23, 24, 43, 0.08)',
} as const;
export const motion = { fast: 160, standard: 240 } as const;
export const arcPalette: Record<string, string> = {
  ARRIVE: '#6E6AA8',
  MOVE: '#3E7D78',
  NEED: '#B56A48',
  CHOOSE: '#A37A3D',
  CONNECT: '#9A5E73',
  LEARN: '#55718F',
  CARE: '#68744A',
  BELONG: '#6E5C8F',
};
export const theme = { colors, spacing, radii, typography, layout, shadows, motion, arcPalette } as const;

export function useTheme() {
  useColorScheme();
  return theme;
}

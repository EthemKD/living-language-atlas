import { TabList, TabSlot, Tabs, TabTrigger, type TabTriggerSlotProps } from 'expo-router/ui';
import { Pressable, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/theme';

function WebTab({ children, isFocused, ...props }: TabTriggerSlotProps) {
  const { colors, spacing, radii, layout } = useTheme();
  return (
    <Pressable
      {...props}
      style={({ pressed }) => ({
        minHeight: layout.touchTarget,
        justifyContent: 'center',
        paddingHorizontal: spacing.md,
        borderRadius: radii.pill,
        backgroundColor: isFocused ? colors.accentSoft : pressed ? colors.surface : 'transparent',
      })}>
      <ThemedText variant="callout" tone={isFocused ? 'accent' : 'muted'}>
        {children}
      </ThemedText>
    </Pressable>
  );
}

export default function AppTabs() {
  const { colors, spacing, layout, shadows } = useTheme();
  return (
    <Tabs>
      <TabSlot style={{ height: '100%' }} />
      <TabList asChild>
        <View
          style={{
            position: 'absolute',
            bottom: spacing.md,
            alignSelf: 'center',
            maxWidth: layout.maxContentWidth,
            flexDirection: 'row',
            gap: spacing.xs,
            padding: spacing.xs,
            backgroundColor: colors.surfaceRaised,
            boxShadow: shadows.floating,
          }}>
          <TabTrigger name="atlas" href="/atlas" asChild>
            <WebTab>Atlas</WebTab>
          </TabTrigger>
          <TabTrigger name="practice" href="/practice" asChild>
            <WebTab>Practice</WebTab>
          </TabTrigger>
          <TabTrigger name="studio" href="/studio" asChild>
            <WebTab>Studio</WebTab>
          </TabTrigger>
          <TabTrigger name="you" href="/you" asChild>
            <WebTab>You</WebTab>
          </TabTrigger>
        </View>
      </TabList>
    </Tabs>
  );
}

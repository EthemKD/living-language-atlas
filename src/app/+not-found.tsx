import { Link } from 'expo-router';
import { ScrollView, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/theme';

export default function NotFoundRoute() {
  const { spacing } = useTheme();
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ padding: spacing.lg }}>
      <View style={{ gap: spacing.md }}>
        <ThemedText variant="title">This path is not on the atlas.</ThemedText>
        <Link href="/atlas">
          <ThemedText variant="bodyStrong" tone="accent">
            Return to Atlas
          </ThemedText>
        </Link>
      </View>
    </ScrollView>
  );
}

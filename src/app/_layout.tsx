import '../../global.css';
import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import Stack from 'expo-router/stack';
import { StatusBar } from 'expo-status-bar';
import { Text, View, useColorScheme } from 'react-native';
import { useFonts } from 'expo-font';
import { NotoSans_400Regular, NotoSans_600SemiBold, NotoSans_700Bold } from '@expo-google-fonts/noto-sans';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded, error] = useFonts({
    NotoSans_400Regular,
    NotoSans_600SemiBold,
    NotoSans_700Bold,
  });

  if (error) {
    return (
      <View testID="font-load-error" className="flex-1 items-center justify-center p-6 bg-rose-50 dark:bg-rose-950">
        <Text className="text-lg font-bold text-rose-700 dark:text-rose-300 mb-2">
          Font Loading Error
        </Text>
        <Text className="text-sm text-slate-700 dark:text-slate-300 text-center">
          {error.message || 'Failed to load Noto Sans typography.'}
        </Text>
      </View>
    );
  }

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" options={{ title: 'Not found' }} />
      </Stack>
    </ThemeProvider>
  );
}

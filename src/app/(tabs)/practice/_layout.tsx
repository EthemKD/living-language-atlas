import Stack from 'expo-router/stack';

export default function PracticeLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Practice', headerLargeTitle: true }} />
      <Stack.Screen name="session/[bundle-id]" options={{ title: 'Practice session' }} />
    </Stack>
  );
}

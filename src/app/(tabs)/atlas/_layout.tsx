import Stack from 'expo-router/stack';

export default function AtlasLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Atlas', headerLargeTitle: true }} />
      <Stack.Screen name="mission/[mission-id]" options={{ title: 'Mission' }} />
    </Stack>
  );
}

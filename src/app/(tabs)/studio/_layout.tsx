import Stack from 'expo-router/stack';

export default function StudioLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Studio', headerLargeTitle: true }} />
    </Stack>
  );
}

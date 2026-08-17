import Stack from 'expo-router/stack';

export default function YouLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'You', headerLargeTitle: true }} />
    </Stack>
  );
}

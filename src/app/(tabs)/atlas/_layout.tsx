import Stack from 'expo-router/stack';

export default function AtlasLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Atlas', headerLargeTitle: true }} />
      <Stack.Screen name="encounter/[stage-id]" options={{ title: 'First Encounter' }} />
      <Stack.Screen name="encounter/mission" options={{ title: 'Café rehearsal' }} />
      <Stack.Screen name="encounter/return" options={{ title: 'Return rehearsal' }} />
      <Stack.Screen name="mission/[mission-id]" options={{ title: 'Mission' }} />
      <Stack.Screen name="district/[district-id]" options={{ title: 'Curriculum district' }} />
    </Stack>
  );
}

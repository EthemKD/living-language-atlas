import { useLocalSearchParams, useRouter } from 'expo-router';
import Stack from 'expo-router/stack';
import { ScrollView, View } from 'react-native';

import { ActionRow } from '@/components/action-row';
import { PrimaryAction } from '@/components/primary-action';
import { ThemedText } from '@/components/themed-text';
import { findDistrict, findMission, referenceTrack } from '@/content/reference-track';
import { useTheme } from '@/theme';

export function DistrictScreen() {
  const params = useLocalSearchParams<{ 'district-id': string }>();
  const router = useRouter();
  const district = findDistrict(params['district-id']);
  const { colors, spacing, layout } = useTheme();

  if (!district) {
    return (
      <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ padding: spacing.lg }}>
        <Stack.Title>District unavailable</Stack.Title>
        <View style={{ gap: spacing.md }}>
          <ThemedText variant="heading">This district is not on the current reference track.</ThemedText>
          <PrimaryAction label="Back to Atlas" onPress={() => router.back()} />
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={{ alignItems: 'center', paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl }}>
      <Stack.Title>{district.title}</Stack.Title>
      <View style={{ width: '100%', maxWidth: layout.readingWidth, gap: spacing.xl }}>
        <View style={{ gap: spacing.sm }}>
          <ThemedText variant="caption" tone="current">
            {district.id} · {district.arc} · REFERENCE HORIZON
          </ThemedText>
          <ThemedText variant="heading">{district.title}</ThemedText>
          <ThemedText tone="muted">{district.promise}</ThemedText>
          <ThemedText variant="caption" tone="faint">
            {district.bundles.length} skill bundles · {district.missions.length} mission outlines · expert review required
          </ThemedText>
        </View>

        <View style={{ gap: spacing.xs, borderLeftWidth: 3, borderLeftColor: colors.current, paddingLeft: spacing.md }}>
          <ThemedText variant="caption" tone="current">
            REFERENCE BOUNDARY
          </ThemedText>
          <ThemedText variant="callout" tone="muted">
            {referenceTrack.claim_boundary}
          </ThemedText>
          <ThemedText variant="caption" tone="faint">
            Generated or unreviewed Russian output cannot silently enter this route.
          </ThemedText>
        </View>

        <View style={{ gap: spacing.xs }}>
          <ThemedText variant="caption" tone="faint">
            SKILL BUNDLES · {district.bundles.length}
          </ThemedText>
          {district.bundles.map((bundle) => (
            <View key={bundle.id} style={{ gap: spacing.xxs, paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.separator }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: spacing.md }}>
                <ThemedText variant="bodyStrong" style={{ flex: 1 }}>
                  {bundle.title}
                </ThemedText>
                <ThemedText variant="caption" tone="faint">
                  {bundle.id}
                </ThemedText>
              </View>
              <ThemedText variant="callout" tone="muted">
                {bundle.original_can_do}
              </ThemedText>
              <ThemedText variant="caption" tone="current">
                {bundle.primary_mode} · {bundle.contexts}
              </ThemedText>
              <ThemedText variant="caption" tone="faint">
                Function: {bundle.function}
              </ThemedText>
              <ThemedText variant="caption" tone="faint">
                Form hypothesis: {bundle.form_focus_hypothesis}
              </ThemedText>
              <ThemedText variant="caption" tone="faint">
                Sound hypothesis: {bundle.sound_focus_hypothesis}
              </ThemedText>
            </View>
          ))}
        </View>

        <View style={{ gap: spacing.xs }}>
          <ThemedText variant="caption" tone="faint">
            MISSION OUTLINES · {district.missions.length}
          </ThemedText>
          {district.missions.map((mission) => {
            const runnableMission = findMission(mission.id);
            return (
              <ActionRow
                key={mission.id}
                eyebrow={`${mission.setting} · ${mission.status}`}
                title={mission.title}
                detail={mission.changed_detail}
                meta={runnableMission ? 'RUNNABLE REFERENCE' : 'OUTLINE ONLY'}
                onPress={
                  runnableMission
                    ? () => router.push({ pathname: '/atlas/mission/[mission-id]', params: { 'mission-id': mission.id } })
                    : undefined
                }
              />
            );
          })}
        </View>

        <PrimaryAction label="Back to Atlas" onPress={() => router.back()} />
      </View>
    </ScrollView>
  );
}

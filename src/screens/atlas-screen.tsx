import { Link } from 'expo-router';
import { Pressable, ScrollView, View, useWindowDimensions } from 'react-native';

import { ProgressLine } from '@/components/progress-line';
import { ThemedText } from '@/components/themed-text';
import { referenceTrack, type District } from '@/content/reference-track';
import { getDistrictState, prototypeLearner, type DistrictState } from '@/domain/learning-state';
import { useTheme } from '@/theme';

const stateCopy: Record<DistrictState, string> = {
  complete: 'Transferred',
  current: 'Now',
  available: 'Next',
  locked: 'Later',
};

function DistrictRoute({ district, index }: { district: District; index: number }) {
  const { colors, spacing, radii, layout, arcPalette } = useTheme();
  const state = getDistrictState(district);
  const markerColor =
    state === 'complete'
      ? colors.routeComplete
      : state === 'current'
        ? colors.routeCurrent
        : colors.routeDormant;
  const isCurrent = state === 'current';

  return (
    <View
      accessibilityLabel={`${district.id}, ${district.title}, ${stateCopy[state]}`}
      style={{ flexDirection: 'row', gap: spacing.md, minHeight: isCurrent ? 260 : 148 }}>
      <View style={{ width: spacing.xl, alignItems: 'center' }}>
        <View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: 3,
            backgroundColor: markerColor,
            opacity: state === 'locked' ? 0.35 : 0.82,
          }}
        />
        <View
          style={{
            width: isCurrent ? spacing.xl : spacing.lg,
            height: isCurrent ? spacing.xl : spacing.lg,
            borderRadius: radii.pill,
            borderWidth: isCurrent ? 6 : 4,
            borderColor: colors.background,
            backgroundColor: markerColor,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ThemedText variant="caption" tone={state === 'locked' ? 'faint' : 'inverse'}>
            {state === 'complete' ? '✓' : index + 1}
          </ThemedText>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          maxWidth: layout.readingWidth,
          gap: spacing.sm,
          paddingBottom: spacing.lg,
          paddingLeft: index % 2 === 0 ? 0 : spacing.md,
          opacity: state === 'locked' ? 0.5 : 1,
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: spacing.xs }}>
          <ThemedText variant="caption" style={{ color: arcPalette[district.arc] ?? colors.accent }}>
            {district.arc}
          </ThemedText>
          <ThemedText variant="caption" tone={isCurrent ? 'current' : 'faint'}>
            {stateCopy[state]}
          </ThemedText>
        </View>
        <ThemedText variant={isCurrent ? 'title' : 'heading'}>{district.title}</ThemedText>
        <ThemedText variant="callout" tone="muted">
          {district.promise}
        </ThemedText>

        {isCurrent ? (
          <View style={{ gap: spacing.xs, paddingTop: spacing.xs }}>
            {district.missions.map((mission, missionIndex) => {
              const isActive = mission.id === prototypeLearner.currentMissionId;
              const marker = (
                <View
                  style={{
                    width: spacing.lg,
                    height: spacing.lg,
                    borderRadius: radii.pill,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: isActive ? colors.current : colors.surface,
                  }}>
                  <ThemedText variant="caption" tone={isActive ? 'inverse' : 'faint'}>
                    {missionIndex + 1}
                  </ThemedText>
                </View>
              );
              const missionBody = (
                <Pressable
                  accessibilityRole={isActive ? 'button' : undefined}
                  accessibilityState={{ disabled: !isActive }}
                  disabled={!isActive}
                  style={({ pressed }) => ({
                    minHeight: layout.touchTarget,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: spacing.sm,
                    paddingVertical: spacing.xs,
                    opacity: pressed ? 0.7 : 1,
                  })}>
                  {isActive ? <Link.AppleZoom>{marker}</Link.AppleZoom> : marker}
                  <View style={{ flex: 1 }}>
                    <ThemedText variant="bodyStrong" tone={isActive ? 'default' : 'muted'}>
                      {mission.title}
                    </ThemedText>
                    <ThemedText variant="caption" tone="faint">
                      {mission.setting}
                    </ThemedText>
                  </View>
                  {isActive ? (
                    <ThemedText variant="heading" tone="current" accessibilityElementsHidden>
                      ›
                    </ThemedText>
                  ) : null}
                </Pressable>
              );

              if (!isActive) return <View key={mission.id}>{missionBody}</View>;
              return (
                <Link
                  key={mission.id}
                  href={{ pathname: '/atlas/mission/[mission-id]', params: { 'mission-id': mission.id } }}
                  asChild>
                  <Link.Trigger>{missionBody}</Link.Trigger>
                </Link>
              );
            })}
          </View>
        ) : null}
      </View>
    </View>
  );
}

export function AtlasScreen() {
  const { width } = useWindowDimensions();
  const { colors, spacing, layout } = useTheme();
  const compact = width < 430;

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={{ alignItems: 'center', paddingHorizontal: compact ? spacing.md : spacing.lg }}>
      <View style={{ width: '100%', maxWidth: layout.maxContentWidth, gap: spacing.xl, paddingBottom: spacing.xxl }}>
        <View style={{ gap: spacing.sm, paddingTop: spacing.sm }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: spacing.md }}>
            <View style={{ flex: 1, gap: spacing.xxs }}>
              <ThemedText variant="caption" tone="accent">
                RUSSIAN · FOUNDATION REFERENCE TRACK
              </ThemedText>
              <ThemedText variant="heading">Ask where. Confirm before moving.</ThemedText>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <ThemedText variant="title" tone="current" style={{ fontVariant: ['tabular-nums'] }}>
                03
              </ThemedText>
              <ThemedText variant="caption" tone="faint">
                OF 12
              </ThemedText>
            </View>
          </View>
          <ProgressLine value={2.5 / 12} tone="current" />
          <ThemedText variant="caption" tone="muted">
            Habit, evidence and credits are tracked separately. This path advances on observed transfer, not XP.
          </ThemedText>
        </View>

        <View accessibilityRole="summary" style={{ borderLeftWidth: 3, borderLeftColor: colors.current, paddingLeft: spacing.md }}>
          <ThemedText variant="caption" tone="current">
            TODAY'S MISSION
          </ThemedText>
          <ThemedText variant="bodyStrong">Find the platform</ThemedText>
          <ThemedText variant="callout" tone="muted">
            Rail station · one changed number · 6–8 minutes
          </ThemedText>
        </View>

        <View>
          {referenceTrack.districts.map((district, index) => (
            <DistrictRoute key={district.id} district={district} index={index} />
          ))}
        </View>

        <ThemedText variant="caption" tone="faint">
          Content status: reference draft. Russian-language and assessment claims remain expert-review gated.
        </ThemedText>
      </View>
    </ScrollView>
  );
}

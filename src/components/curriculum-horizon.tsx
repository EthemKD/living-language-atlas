import { View } from 'react-native';

import { ActionRow } from '@/components/action-row';
import { ThemedText } from '@/components/themed-text';
import type { District } from '@/content/reference-track';
import { useTheme } from '@/theme';

type CurriculumHorizonProps = {
  districts: readonly District[];
  onOpenDistrict: (districtId: string) => void;
};

export function CurriculumHorizon({ districts, onOpenDistrict }: CurriculumHorizonProps) {
  const { colors, spacing } = useTheme();

  return (
    <View style={{ gap: spacing.sm, borderTopWidth: 1, borderTopColor: colors.separator, paddingTop: spacing.md }}>
      <View style={{ gap: spacing.xxs }}>
        <ThemedText variant="caption" tone="faint">
          CURRICULUM HORIZON · {districts.length} DISTRICTS
        </ThemedText>
        <ThemedText variant="heading">The wider Russian route, kept inspectable</ThemedText>
        <ThemedText variant="callout" tone="muted">
          These districts are a versioned curriculum reference, not a fake unlock tree. Open one to inspect its skill
          bundles, mission outlines and review boundary.
        </ThemedText>
      </View>

      <View>
        {districts.map((district, index) => (
          <ActionRow
            key={district.id}
            eyebrow={`${String(index + 1).padStart(2, '0')} · ${district.arc}`}
            title={district.title}
            detail={district.promise}
            meta={`${district.bundles.length} BUNDLES`}
            onPress={() => onOpenDistrict(district.id)}
          />
        ))}
      </View>
    </View>
  );
}

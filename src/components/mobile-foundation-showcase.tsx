import React from 'react';
import { View, Text } from 'react-native';
import { Compass, BookOpen, Check } from 'lucide-react-native';
import { useTheme } from '@/theme';
import { Button, ButtonText, ButtonIcon } from './ui/button';

export interface MobileFoundationShowcaseProps {
  testID?: string;
}

export function MobileFoundationShowcase({ testID = 'mobile-foundation-showcase' }: MobileFoundationShowcaseProps) {
  const { colors } = useTheme();

  return (
    <View testID={testID} className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 gap-4">
      {/* Header with Lucide icon and NativeWind classes */}
      <View className="flex-row items-center gap-3">
        <Compass size={24} className="text-indigo-600 dark:text-indigo-400" color={colors.accent} />
        <Text className="text-xl font-sans font-bold text-slate-900 dark:text-white">
          Living Language Atlas
        </Text>
      </View>

      {/* Typography: Latin script demonstration */}
      <View className="gap-1">
        <Text className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
          Latin Script (German Sample)
        </Text>
        <Text className="text-base font-sans text-slate-800 dark:text-slate-200">
          Guten Tag! Ich brauche bitte Hilfe mit dieser Wegbeschreibung.
        </Text>
      </View>

      {/* Typography: Cyrillic script demonstration */}
      <View className="gap-1">
        <Text className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
          Cyrillic Script (Multilingual Verification)
        </Text>
        <Text className="text-base font-sans text-slate-800 dark:text-slate-200">
          Живой языковой атлас — многоязычный интерфейс и навигация.
        </Text>
      </View>

      {/* gluestack v2 Button with Lucide icon */}
      <View className="flex-row gap-3 pt-2">
        <Button variant="solid" action="primary" size="md">
          <ButtonIcon as={BookOpen} size={18} />
          <ButtonText>Explore Atlas</ButtonText>
        </Button>
        <Button variant="outline" action="primary" size="md">
          <ButtonIcon as={Check} size={18} />
          <ButtonText>Verified</ButtonText>
        </Button>
      </View>
    </View>
  );
}

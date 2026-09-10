import { memo, type ReactNode } from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ScreenShellProps {
  kicker: string;
  title: string;
  children: ReactNode;
}

function ScreenShellBase({ kicker, title, children }: ScreenShellProps) {
  const insets = useSafeAreaInsets();
  return (
    <View className="flex-1 bg-fill" style={{ paddingTop: insets.top + 10 }}>
      <View className="border-b border-line bg-white px-4 pb-3">
        <View className="flex-row items-center gap-2.5">
          <View className="h-[26px] w-[26px] items-center justify-center rounded-[7px] bg-ink">
            <Text className="text-[13px] font-bold text-white">B</Text>
          </View>
          <View className="flex-1">
            <Text className="text-[17px] font-bold tracking-tight text-ink">Belvia</Text>
            <Text className="text-[11px] font-semibold text-faint">On-device itinerary</Text>
          </View>
        </View>
      </View>
      <View className="px-4 pt-4">
        <Text className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-faint">
          {kicker}
        </Text>
        <Text className="mb-3 text-[26px] font-bold tracking-tight text-ink">{title}</Text>
      </View>
      {children}
    </View>
  );
}

export const ScreenShell = memo(ScreenShellBase);

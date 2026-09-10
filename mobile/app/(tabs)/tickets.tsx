import { ScreenShell } from "@/components/modules/chrome/screen-shell";
import { AppPressable } from "@/components/ui/app-pressable";
import { Surface } from "@/components/ui/surface";
import { openTicketApp } from "@/lib/open-app";
import { useTripStore } from "@/stores/trip-store";
import type { TicketApp } from "@/types";
import { FlashList } from "@shopify/flash-list";
import { useCallback } from "react";
import { Linking, Text, View } from "react-native";

export default function TicketsScreen() {
  const apps = useTripStore((s) => s.trip.apps);

  const renderItem = useCallback(({ item }: { item: TicketApp }) => {
    return (
      <AppPressable
        className="flex-row items-start justify-between border-t border-line px-4 py-3"
        onPress={() => {
          void openTicketApp(item);
        }}
      >
        <View className="flex-1 pr-3">
          <Text className="text-[14px] font-semibold text-ink">{item.name}</Text>
          <Text className="mt-1 text-[12px] text-muted">{item.hint}</Text>
        </View>
        <Text className="py-2 text-[13px] font-bold text-ink">Open</Text>
      </AppPressable>
    );
  }, []);

  return (
    <ScreenShell kicker="Bookings" title="Tickets">
      <View className="flex-1 px-4">
        <Text className="mb-3 text-[14px] leading-5 text-muted">
          Open the apps where you bought the cheap seats and rooms. BudVia does not restack the fare.
        </Text>
        <Surface className="min-h-[180px]">
          <FlashList data={apps} estimatedItemSize={64} keyExtractor={(item) => item.id} renderItem={renderItem} />
        </Surface>
        <Surface className="mt-3">
          <View className="p-4">
            <Text className="text-[16px] font-semibold text-ink">This copy never leaves the phone</Text>
            <Text className="mt-2 text-[12px] text-muted">No login. No analytics. Publisher: Tahsin Sakin.</Text>
            <AppPressable className="mt-2 self-start" onPress={() => { void Linking.openURL("https://www.linkedin.com/in/tahsinsakin"); }}>
              <Text className="text-[13px] font-bold text-ink">LinkedIn</Text>
            </AppPressable>
          </View>
        </Surface>
      </View>
    </ScreenShell>
  );
}

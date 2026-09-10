import { ScreenShell } from "@/components/modules/chrome/screen-shell";
import { AppPressable } from "@/components/ui/app-pressable";
import { Surface } from "@/components/ui/surface";
import { openDirections } from "@/lib/maps";
import { useTripStore } from "@/stores/trip-store";
import type { Place } from "@/types";
import { FlashList } from "@shopify/flash-list";
import { useCallback } from "react";
import { Text, View } from "react-native";

export default function PlacesScreen() {
  const places = useTripStore((s) => s.trip.places);

  const renderItem = useCallback(({ item }: { item: Place }) => {
    return (
      <AppPressable
        className="flex-row items-start justify-between border-t border-line px-4 py-3"
        onPress={() => {
          void openDirections(item);
        }}
      >
        <View className="flex-1 pr-3">
          <Text className="text-[14px] font-semibold text-ink">{item.name}</Text>
          <Text className="mt-1 text-[12px] text-muted">{item.address}</Text>
        </View>
        <Text className="py-2 text-[13px] font-bold text-ink">Directions</Text>
      </AppPressable>
    );
  }, []);

  return (
    <ScreenShell kicker="Route" title="Places">
      <View className="flex-1 px-4">
        <Surface className="mb-3">
          <Text className="p-4 text-[13px] text-muted">
            The map opens in Apple Maps on iOS and the system maps app on Android. No tile API key. Pins stay on this device.
          </Text>
        </Surface>
        {places.length === 0 ? (
          <Surface>
            <Text className="p-4 text-[14px] text-muted">No places yet. Load the sample itinerary to drop pins.</Text>
          </Surface>
        ) : (
          <Surface className="min-h-[200px]">
            <FlashList data={places} estimatedItemSize={64} keyExtractor={(item) => item.id} renderItem={renderItem} />
          </Surface>
        )}
      </View>
    </ScreenShell>
  );
}

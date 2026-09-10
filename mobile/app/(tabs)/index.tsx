import { ScreenShell } from "@/components/modules/chrome/screen-shell";
import { TicketStrip } from "@/components/modules/trip/ticket-strip";
import { PrimaryButton } from "@/components/ui/primary-button";
import { Surface } from "@/components/ui/surface";
import { useTripStore } from "@/stores/trip-store";
import { useCallback } from "react";
import { ScrollView, Text, View } from "react-native";

export default function TripScreen() {
  const meta = useTripStore((s) => s.trip.meta);
  const reminderCount = useTripStore((s) => s.trip.reminders.length);
  const loadDemo = useTripStore((s) => s.loadDemo);
  const reset = useTripStore((s) => s.reset);
  const onLoad = useCallback(() => loadDemo(), [loadDemo]);
  const onReset = useCallback(() => reset(), [reset]);

  return (
    <ScreenShell kicker="Today" title="Trip">
      <ScrollView className="flex-1 px-4" contentContainerClassName="gap-3 pb-8">
        <TicketStrip />
        <Surface>
          <View className="p-4">
            <Text className="text-[16px] font-semibold text-ink">{meta.title}</Text>
            <Text className="mt-1 text-[14px] text-muted">{meta.subtitle}</Text>
            <Text className="mt-3 text-[13px] text-muted">
              Cheap seats live in six apps. Belvia is the single on-device timeline so you do not rebuild the week from inboxes.
            </Text>
            <Text className="mt-3 text-[12px] text-faint">{reminderCount} reminders on device</Text>
          </View>
        </Surface>
        <PrimaryButton label="Load sample itinerary" onPress={onLoad} />
        <PrimaryButton label="Clear this device" onPress={onReset} tone="fill" />
      </ScrollView>
    </ScreenShell>
  );
}

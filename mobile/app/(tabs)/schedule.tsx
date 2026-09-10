import { ScreenShell } from "@/components/modules/chrome/screen-shell";
import { ReminderRow } from "@/components/modules/schedule/reminder-row";
import { Surface } from "@/components/ui/surface";
import { formatWhen } from "@/lib/format";
import { useTripStore } from "@/stores/trip-store";
import type { Place, Reminder } from "@/types";
import { FlashList } from "@shopify/flash-list";
import { useCallback, useMemo } from "react";
import { Text, View } from "react-native";

interface ScheduleRow {
  kind: "header" | "item";
  id: string;
  title?: string;
  reminder?: Reminder;
}

export default function ScheduleScreen() {
  const reminders = useTripStore((s) => s.trip.reminders);
  const places = useTripStore((s) => s.trip.places);
  const done = useTripStore((s) => s.done);
  const toggleDone = useTripStore((s) => s.toggleDone);

  const placeById = useCallback(
    (id: string | null): Place | undefined => places.find((p) => p.id === id),
    [places],
  );

  const rows = useMemo<ScheduleRow[]>(() => {
    const groups = new Map<string, Reminder[]>();
    for (const reminder of reminders) {
      const key = reminder.at ? reminder.at.slice(0, 10) : "prep";
      const bucket = groups.get(key) ?? [];
      bucket.push(reminder);
      groups.set(key, bucket);
    }
    const keys = Array.from(groups.keys()).sort();
    const next: ScheduleRow[] = [];
    for (const key of keys) {
      const title = key === "prep" ? "Before departure" : formatWhen(`${key}T12:00:00`).day;
      next.push({ kind: "header", id: `h-${key}`, title });
      for (const reminder of groups.get(key) ?? []) {
        next.push({ kind: "item", id: reminder.id, reminder });
      }
    }
    return next;
  }, [reminders]);

  const renderItem = useCallback(
    ({ item }: { item: ScheduleRow }) => {
      if (item.kind === "header") {
        return (
          <View className="px-4 pb-2 pt-4">
            <Text className="text-[16px] font-semibold text-ink">{item.title}</Text>
          </View>
        );
      }
      if (!item.reminder) {
        return <View />;
      }
      return (
        <ReminderRow
          done={Boolean(done[item.reminder.id])}
          onToggle={toggleDone}
          place={placeById(item.reminder.placeId)}
          reminder={item.reminder}
        />
      );
    },
    [done, placeById, toggleDone],
  );

  return (
    <ScreenShell kicker="Itinerary" title="Schedule">
      {rows.length === 0 ? (
        <View className="px-4">
          <Surface>
            <Text className="p-4 text-[14px] text-muted">No reminders yet. Load the sample from Trip.</Text>
          </Surface>
        </View>
      ) : (
        <FlashList
          contentContainerStyle={{ paddingBottom: 32 }}
          data={rows}
          estimatedItemSize={72}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}
    </ScreenShell>
  );
}

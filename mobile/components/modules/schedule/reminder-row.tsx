import { AppPressable } from "@/components/ui/app-pressable";
import { formatWhen } from "@/lib/format";
import { openDirections } from "@/lib/maps";
import type { Place, Reminder } from "@/types";
import { memo, useCallback, useMemo } from "react";
import { Text, View } from "react-native";

interface ReminderRowProps {
  reminder: Reminder;
  place: Place | undefined;
  done: boolean;
  onToggle: (id: string) => void;
}

function ReminderRowBase({ reminder, place, done, onToggle }: ReminderRowProps) {
  const when = useMemo(() => formatWhen(reminder.at), [reminder.at]);
  const handleToggle = useCallback(() => onToggle(reminder.id), [onToggle, reminder.id]);
  const handleMaps = useCallback(() => {
    if (place) {
      void openDirections(place);
    }
  }, [place]);

  return (
    <View className="flex-row items-start gap-3 border-t border-line px-4 py-3">
      <AppPressable
        accessibilityLabel={done ? "Mark undone" : "Mark done"}
        className="pt-0.5"
        onPress={handleToggle}
      >
        <View className={`h-5 w-5 rounded-full border-[1.5px] border-[#C7C7CC] ${done ? "border-ink bg-ink" : "bg-white"}`} />
      </AppPressable>
      <View className="w-[4.8rem]">
        <Text className="text-[11px] font-semibold text-faint">{when.day}</Text>
        <Text className="text-[15px] font-semibold tabular-nums text-ink">{when.time}</Text>
      </View>
      <View className="flex-1">
        <Text className={`text-[14px] font-semibold text-ink ${done ? "opacity-45 line-through" : ""}`}>
          {reminder.title}
        </Text>
        {reminder.notes.length > 0 ? (
          <Text className="mt-1 text-[12px] leading-[18px] text-muted">{reminder.notes}</Text>
        ) : null}
      </View>
      {place ? (
        <AppPressable onPress={handleMaps}>
          <Text className="py-2 text-[13px] font-bold text-ink">Maps</Text>
        </AppPressable>
      ) : null}
    </View>
  );
}

export const ReminderRow = memo(ReminderRowBase);

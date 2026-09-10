import { formatWhen } from "@/lib/format";
import { useTripStore } from "@/stores/trip-store";
import { memo, useMemo } from "react";
import { Text, View } from "react-native";

function TicketStripBase() {
  const meta = useTripStore((s) => s.trip.meta);
  const first = useTripStore((s) => s.trip.reminders[0] ?? null);
  const when = useMemo(() => formatWhen(first?.at ?? null), [first]);

  return (
    <View className="rounded-[18px] bg-white p-4">
      <Text className="text-[11px] font-bold uppercase tracking-[0.08em] text-faint">
        {meta.rangeLabel}
      </Text>
      <View className="mt-3 flex-row items-end justify-between">
        <View>
          <Text className="text-[28px] font-bold tracking-tight text-ink">ESB</Text>
          <Text className="mt-1 text-[12px] text-muted">Ankara</Text>
        </View>
        <Text className="text-[11px] font-bold uppercase tracking-[0.08em] text-faint">
          {when.day}
        </Text>
        <View className="items-end">
          <Text className="text-[28px] font-bold tracking-tight text-ink">BUD</Text>
          <Text className="mt-1 text-[12px] text-muted">Budapest</Text>
        </View>
      </View>
    </View>
  );
}

export const TicketStrip = memo(TicketStripBase);

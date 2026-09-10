import { ScreenShell } from "@/components/modules/chrome/screen-shell";
import { AppPressable } from "@/components/ui/app-pressable";
import { Surface } from "@/components/ui/surface";
import { useTripStore } from "@/stores/trip-store";
import type { PackItem } from "@/types";
import { FlashList } from "@shopify/flash-list";
import { useCallback, useMemo } from "react";
import { Text, TextInput, View } from "react-native";

interface BagRow {
  kind: "header" | "item";
  id: string;
  title?: string;
  item?: PackItem;
}

export default function BagScreen() {
  const pack = useTripStore((s) => s.trip.pack);
  const packed = useTripStore((s) => s.packed);
  const extra = useTripStore((s) => s.extra);
  const togglePacked = useTripStore((s) => s.togglePacked);
  const setExtra = useTripStore((s) => s.setExtra);

  const rows = useMemo<BagRow[]>(() => {
    const next: BagRow[] = [];
    for (const group of pack) {
      next.push({ kind: "header", id: `g-${group.id}`, title: group.title });
      for (const item of group.items) {
        next.push({ kind: "item", id: item.id, item });
      }
    }
    return next;
  }, [pack]);

  const counts = useMemo(() => {
    const total = pack.reduce((n, g) => n + g.items.length, 0);
    const done = pack.reduce((n, g) => n + g.items.filter((i) => packed[i.id]).length, 0);
    return { done, total };
  }, [pack, packed]);

  const renderItem = useCallback(
    ({ item }: { item: BagRow }) => {
      if (item.kind === "header") {
        return <Text className="px-4 pb-1 pt-4 text-[16px] font-semibold text-ink">{item.title}</Text>;
      }
      if (!item.item) {
        return <View />;
      }
      const on = Boolean(packed[item.item.id]);
      return (
        <AppPressable
          className="flex-row items-start gap-3 border-t border-line px-4 py-3"
          onPress={() => togglePacked(item.item?.id ?? "")}
        >
          <View className={`mt-0.5 h-5 w-5 rounded-full border-[1.5px] ${on ? "border-ink bg-ink" : "border-[#C7C7CC] bg-white"}`} />
          <View>
            <Text className={`text-[14px] font-semibold text-ink ${on ? "opacity-45 line-through" : ""}`}>{item.item.label}</Text>
            {item.item.hint.length > 0 ? <Text className="mt-1 text-[12px] text-muted">{item.item.hint}</Text> : null}
          </View>
        </AppPressable>
      );
    },
    [packed, togglePacked],
  );

  return (
    <ScreenShell kicker={`${counts.done} / ${counts.total} packed`} title="Bag">
      <View className="flex-1">
        <FlashList
          ListFooterComponent={
            <View className="px-4 pt-3">
              <Surface>
                <View className="p-4">
                  <Text className="mb-2 text-[11px] font-bold uppercase tracking-[0.06em] text-faint">Notes</Text>
                  <TextInput
                    className="min-h-[72px] rounded-xl bg-fill p-3 text-[16px] text-ink"
                    multiline
                    onChangeText={setExtra}
                    placeholder="Adapters, meds, gifts"
                    placeholderTextColor="#8E8E93"
                    value={extra}
                  />
                </View>
              </Surface>
            </View>
          }
          contentContainerStyle={{ paddingBottom: 28 }}
          data={rows}
          estimatedItemSize={64}
          keyExtractor={(row) => row.id}
          renderItem={renderItem}
        />
      </View>
    </ScreenShell>
  );
}

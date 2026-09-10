import { SkiaTrendScrubber } from "@/components/charts/SkiaTrendScrubber";
import { DashboardSkeleton } from "@/components/modules/dashboard/dashboard-skeleton";
import { ExamRow } from "@/components/modules/dashboard/exam-row";
import { KpiTile } from "@/components/modules/dashboard/kpi-tile";
import { TactilePressable } from "@/components/primitives/tactile-pressable";
import { useBelViaDashboard, usePinExam } from "@/hooks/useBelViaData";
import type { ExamRecord } from "@/types/analytics";
import { FlashList } from "@shopify/flash-list";
import { Bell } from "lucide-react-native";
import { useCallback } from "react";
import { Text, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function PulseScreen() {
  const insets = useSafeAreaInsets();
  const state = useBelViaDashboard();
  const pin = usePinExam();
  const onPin = useCallback((id: string) => { pin.mutate(id); }, [pin]);
  const renderExam = useCallback(({ item }: { item: ExamRecord }) => <ExamRow exam={item} onPin={onPin} />, [onPin]);

  return (
    <View className="flex-1 bg-oled" style={{ paddingTop: insets.top + 8 }}>
      {state.status === "loading" || state.status === "idle" ? <DashboardSkeleton /> : null}
      {state.status === "error" ? <Text className="px-4 text-[14px] text-crimson">{state.error}</Text> : null}
      {state.status === "success" ? (
        <Animated.View className="flex-1" entering={FadeIn.duration(150)}>
          <View className="flex-row items-center justify-between px-4 pb-3">
            <View>
              <Text className="text-[11px] font-medium uppercase tracking-widest text-zinc-500">{state.data.student.cohort}</Text>
              <Text className="mt-1 text-[22px] font-semibold tracking-tight text-zinc-100">{state.data.student.name}</Text>
            </View>
            <TactilePressable accessibilityLabel="Alerts" onPress={() => undefined}>
              <View className="h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-glass">
                <Bell color="#e4e4e7" size={18} strokeWidth={1.75} />
                {state.data.student.unreadAlerts > 0 ? <View className="absolute right-2 top-2 h-2 w-2 rounded-full bg-cyan" /> : null}
              </View>
            </TactilePressable>
          </View>
          <FlashList
            ListHeaderComponent={
              <View className="gap-3 pb-3">
                <SkiaTrendScrubber series={state.data.series} />
                <View className="flex-row gap-2">
                  <KpiTile direction="up" digits={1} label="Velocity" suffix="Δ" value={state.data.velocity} />
                  <KpiTile direction="up" digits={0} label="Accuracy" suffix="%" value={state.data.accuracy} />
                  <KpiTile direction="neutral" digits={0} label="Streak" value={state.data.streak} />
                </View>
                <Text className="pt-2 text-[11px] font-medium uppercase tracking-widest text-zinc-500">Recent exams</Text>
              </View>
            }
            contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 28 }}
            data={[...state.data.exams]}
            estimatedItemSize={76}
            ItemSeparatorComponent={() => <View className="h-2" />}
            keyExtractor={(item) => item.id}
            renderItem={renderExam}
          />
        </Animated.View>
      ) : null}
    </View>
  );
}

import { useElevatedChrome } from "@/hooks/use-elevated-chrome";
import { formatMetricValue, formatTrendPercent } from "@/lib/format-metric";
import type { MetricCardProps, MetricTrend } from "@/types/metrics";
import * as Haptics from "expo-haptics";
import { Minus, TrendingDown, TrendingUp } from "lucide-react-native";
import { memo, useCallback, useMemo } from "react";
import { Platform, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

const SPRING_CONFIG = {
  damping: 18,
  stiffness: 180,
  mass: 0.8,
} as const;

function trendTone(direction: MetricTrend["direction"]): {
  chip: string;
  label: string;
  icon: string;
} {
  switch (direction) {
    case "up":
      return { chip: "bg-emerald-500/10", label: "text-emerald-400", icon: "#10b981" };
    case "down":
      return { chip: "bg-rose-500/10", label: "text-rose-400", icon: "#f43f5e" };
    case "neutral":
      return { chip: "bg-slate-800", label: "text-slate-400", icon: "#94a3b8" };
  }
}

function MetricCardBase({ data, isLoading, onPress }: MetricCardProps) {
  const scale = useSharedValue(1);
  const chrome = useElevatedChrome();

  const triggerHaptic = useCallback(() => {
    const run = Platform.select({
      web: () => undefined,
      default: () => {
        void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      },
    });
    run();
  }, []);

  const handlePressAction = useCallback(() => {
    if (data && onPress) {
      onPress(data.id);
    }
  }, [data, onPress]);

  const gesture = useMemo(
    () =>
      Gesture.Tap()
        .enabled(!isLoading && Boolean(data) && Boolean(onPress))
        .onBegin(() => {
          "worklet";
          scale.value = withSpring(0.97, SPRING_CONFIG);
          runOnJS(triggerHaptic)();
        })
        .onFinalize((_event, success) => {
          "worklet";
          scale.value = withSpring(1, SPRING_CONFIG);
          if (success) {
            runOnJS(handlePressAction)();
          }
        }),
    [data, handlePressAction, isLoading, onPress, scale, triggerHaptic],
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  if (isLoading || !data) {
    return (
      <View
        accessibilityState={{ busy: isLoading }}
        className="mb-4 w-full overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/50 p-5"
        style={chrome}
      >
        <View className="mb-4 h-4 w-28 rounded-md bg-slate-800" />
        <View className="mb-3 h-8 w-20 rounded-md bg-slate-800" />
        <View className="h-4 w-36 rounded-md bg-slate-800/60" />
      </View>
    );
  }

  const tone = trendTone(data.trend.direction);
  const valueLabel = formatMetricValue(data.value, undefined);

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        accessibilityLabel={`${data.title}, ${valueLabel}${data.unit ? ` ${data.unit}` : ""}`}
        accessibilityRole="button"
        accessible
        className="mb-4 w-full rounded-2xl border border-slate-800 bg-slate-900/90 p-5"
        style={[animatedStyle, chrome]}
      >
        <View className="mb-3 flex-row items-center justify-between">
          <Text className="text-sm font-medium uppercase tracking-wider text-slate-400">{data.title}</Text>
          <View className={`flex-row items-center rounded-full px-2 py-1 ${tone.chip}`}>
            {data.trend.direction === "up" ? <TrendingUp color={tone.icon} size={12} /> : null}
            {data.trend.direction === "down" ? <TrendingDown color={tone.icon} size={12} /> : null}
            {data.trend.direction === "neutral" ? <Minus color={tone.icon} size={12} /> : null}
            <Text className={`ml-1 text-xs font-semibold ${tone.label}`}>
              {formatTrendPercent(data.trend.percentage)}
            </Text>
          </View>
        </View>
        <View className="mb-2 flex-row items-baseline">
          <Text className="font-mono text-3xl font-bold tracking-tight text-white">{valueLabel}</Text>
          {data.unit ? <Text className="ml-1.5 text-base font-medium text-slate-500">{data.unit}</Text> : null}
        </View>
        <Text className="text-xs font-medium text-slate-500">{data.trend.periodLabel}</Text>
      </Animated.View>
    </GestureDetector>
  );
}

export const MetricCard = memo(MetricCardBase);

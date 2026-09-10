import { AppPressable } from "@/components/ui/app-pressable";
import { Skeleton } from "@/components/ui/skeleton";
import { Surface } from "@/components/ui/surface";
import { formatMetricValue, formatTrendPercent, progressRatio } from "@/lib/format-metric";
import type { MetricCardProps, MetricTrend } from "@/types/metrics";
import { memo, useCallback, useMemo } from "react";
import { Text, View } from "react-native";

function trendClass(direction: MetricTrend["direction"]): string {
  switch (direction) {
    case "up":
      return "text-ink";
    case "down":
      return "text-muted";
    case "neutral":
      return "text-faint";
  }
}

function trendMark(direction: MetricTrend["direction"]): string {
  switch (direction) {
    case "up":
      return "↑";
    case "down":
      return "↓";
    case "neutral":
      return "→";
  }
}

function MetricCardBase({ data, isLoading, onPress }: MetricCardProps) {
  const handlePress = useCallback(() => {
    if (data) {
      onPress?.(data.id);
    }
  }, [data, onPress]);

  const progress = useMemo(
    () => (data ? progressRatio(data.value, data.targetValue) : null),
    [data],
  );

  if (isLoading) {
    return (
      <Surface>
        <View className="gap-3 p-4" accessibilityLabel="Loading metric" accessibilityState={{ busy: true }}>
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-3 w-40" />
          <Skeleton className="h-1.5 w-full" />
        </View>
      </Surface>
    );
  }

  if (!data) {
    return (
      <Surface>
        <View className="p-4">
          <Text className="text-[14px] text-muted">No metric yet</Text>
        </View>
      </Surface>
    );
  }

  const body = (
    <View className="p-4">
      <Text className="text-[11px] font-bold uppercase tracking-[0.08em] text-faint">{data.title}</Text>
      <Text className="mt-2 text-[28px] font-bold tracking-tight text-ink">
        {formatMetricValue(data.value, data.unit)}
      </Text>
      <Text className={`mt-2 text-[12px] font-semibold ${trendClass(data.trend.direction)}`}>
        {`${trendMark(data.trend.direction)} ${formatTrendPercent(data.trend.percentage)} · ${data.trend.periodLabel}`}
      </Text>
      {progress !== null ? (
        <View className="mt-3 h-1.5 overflow-hidden rounded-full bg-fill">
          <View className="h-full rounded-full bg-ink" style={{ width: `${Math.round(progress * 100)}%` }} />
        </View>
      ) : null}
    </View>
  );

  if (!onPress) {
    return <Surface>{body}</Surface>;
  }

  return (
    <AppPressable accessibilityLabel={`${data.title} ${formatMetricValue(data.value, data.unit)}`} onPress={handlePress}>
      <Surface>{body}</Surface>
    </AppPressable>
  );
}

export const MetricCard = memo(MetricCardBase);

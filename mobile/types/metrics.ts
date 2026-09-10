export interface MetricTrend {
  readonly direction: "up" | "down" | "neutral";
  readonly percentage: number;
  readonly periodLabel: string;
}

export interface MetricCardData {
  readonly id: string;
  readonly title: string;
  readonly value: number;
  readonly unit?: string;
  readonly targetValue?: number;
  readonly trend: MetricTrend;
}

export interface MetricCardProps {
  readonly data?: MetricCardData;
  readonly isLoading: boolean;
  readonly onPress?: (metricId: string) => void;
}

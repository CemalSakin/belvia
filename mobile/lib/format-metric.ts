export function formatMetricValue(value: number, unit: string | undefined): string {
  const amount = new Intl.NumberFormat("en-GB", {
    maximumFractionDigits: value >= 100 ? 0 : 1,
  }).format(value);
  return unit ? `${amount} ${unit}` : amount;
}

export function formatTrendPercent(percentage: number): string {
  const abs = Math.abs(percentage);
  const amount = new Intl.NumberFormat("en-GB", {
    maximumFractionDigits: abs >= 10 ? 0 : 1,
  }).format(abs);
  return `${amount}%`;
}

export function progressRatio(value: number, targetValue: number | undefined): number | null {
  if (targetValue === undefined || targetValue <= 0) {
    return null;
  }
  const ratio = value / targetValue;
  if (ratio < 0) {
    return 0;
  }
  if (ratio > 1) {
    return 1;
  }
  return ratio;
}

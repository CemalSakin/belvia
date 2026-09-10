import { memo } from "react";
import { View } from "react-native";

interface SkeletonProps {
  className?: string;
}

function SkeletonBase({ className }: SkeletonProps) {
  return <View className={`rounded-xl bg-fill ${className ?? "h-12"}`} />;
}

export const Skeleton = memo(SkeletonBase);

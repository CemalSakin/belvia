import { AppPressable } from "@/components/ui/app-pressable";
import { memo } from "react";
import { Text } from "react-native";

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  tone?: "ink" | "fill";
}

function PrimaryButtonBase({ label, onPress, tone = "ink" }: PrimaryButtonProps) {
  const palette = tone === "ink" ? "bg-ink" : "bg-fill";
  const text = tone === "ink" ? "text-white" : "text-ink";
  return (
    <AppPressable
      className={`h-12 w-full items-center justify-center rounded-[14px] ${palette}`}
      onPress={onPress}
    >
      <Text className={`text-[16px] font-semibold ${text}`}>{label}</Text>
    </AppPressable>
  );
}

export const PrimaryButton = memo(PrimaryButtonBase);

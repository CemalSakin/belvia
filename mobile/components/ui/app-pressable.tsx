import { useHapticPress } from "@/hooks/use-haptic-press";
import { memo, type ReactNode } from "react";
import { Platform, Pressable, type PressableProps } from "react-native";

interface AppPressableProps extends Omit<PressableProps, "children" | "onPress"> {
  onPress?: () => void;
  children: ReactNode;
  className?: string;
}

function AppPressableBase({ onPress, children, className, ...rest }: AppPressableProps) {
  const handle = useHapticPress(onPress);
  const ripple = Platform.select({
    android: { color: "rgba(29,29,31,0.12)" },
    default: undefined,
  });

  return (
    <Pressable
      accessibilityRole="button"
      android_ripple={ripple}
      className={`active:opacity-70 ${className ?? ""}`}
      onPress={handle}
      {...rest}
    >
      {children}
    </Pressable>
  );
}

export const AppPressable = memo(AppPressableBase);

import { usePlatformShadow } from "@/hooks/use-platform-shadow";
import { memo, type ReactNode } from "react";
import { View } from "react-native";

interface SurfaceProps {
  children: ReactNode;
  className?: string;
}

function SurfaceBase({ children, className }: SurfaceProps) {
  const shadow = usePlatformShadow();
  return (
    <View className={`overflow-hidden rounded-[18px] bg-white ${className ?? ""}`} style={shadow}>
      {children}
    </View>
  );
}

export const Surface = memo(SurfaceBase);

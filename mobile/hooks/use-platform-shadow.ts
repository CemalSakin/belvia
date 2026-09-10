import { useMemo } from "react";
import { Platform, type ViewStyle } from "react-native";

export function usePlatformShadow(): ViewStyle {
  return useMemo(
    () =>
      Platform.select<ViewStyle>({
        ios: {
          shadowColor: "#111113",
          shadowOpacity: 0.06,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 6 },
        },
        android: {
          elevation: 2,
        },
        default: {},
      }) ?? {},
    [],
  );
}

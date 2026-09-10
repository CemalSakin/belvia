import { useMemo } from "react";
import { Platform, type ViewStyle } from "react-native";

export function useElevatedChrome(): ViewStyle {
  return useMemo(
    () =>
      Platform.select<ViewStyle>({
        ios: {
          shadowColor: "#000000",
          shadowOpacity: 0.28,
          shadowRadius: 16,
          shadowOffset: { width: 0, height: 8 },
        },
        android: {
          elevation: 2,
        },
        default: {},
      }) ?? {},
    [],
  );
}

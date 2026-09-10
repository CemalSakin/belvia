import * as Haptics from "expo-haptics";
import { useCallback } from "react";
import { Platform } from "react-native";

export function useHapticPress(onPress?: () => void): () => void {
  return useCallback(() => {
    if (Platform.OS === "ios") {
      void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } else {
      void Haptics.selectionAsync();
    }
    onPress?.();
  }, [onPress]);
}

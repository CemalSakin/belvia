import { Linking, Platform } from "react-native";
import type { Place } from "@/types";

export function directionsUrl(place: Place): string {
  const query = encodeURIComponent(`${place.name}, ${place.address}`);
  if (Platform.OS === "ios") {
    return `https://maps.apple.com/?daddr=${query}&dirflg=d&t=m`;
  }
  return `geo:${place.lat},${place.lng}?q=${query}`;
}

export async function openDirections(place: Place): Promise<void> {
  const url = directionsUrl(place);
  try {
    const can = await Linking.canOpenURL(url);
    if (can) {
      await Linking.openURL(url);
      return;
    }
  } catch {
    // Fall through. Missing maps handlers must not crash the tab.
  }
  const q = encodeURIComponent(`${place.name}, ${place.address}`);
  await Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${q}`);
}

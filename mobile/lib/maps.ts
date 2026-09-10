import { Linking, Platform } from "react-native";
import type { Place } from "@/types";

export function directionsUrl(place: Place): string {
  const query = encodeURIComponent(`${place.name}, ${place.address}`);
  return Platform.select({
    ios: `https://maps.apple.com/?daddr=${query}&dirflg=d&t=m`,
    default: `geo:${place.lat},${place.lng}?q=${query}`,
  }) as string;
}

export async function openDirections(place: Place): Promise<void> {
  const url = directionsUrl(place);
  const can = await Linking.canOpenURL(url);
  if (can) {
    await Linking.openURL(url);
    return;
  }
  await Linking.openURL(
    `https://www.openstreetmap.org/?mlat=${place.lat}&mlon=${place.lng}#map=16/${place.lat}/${place.lng}`,
  );
}

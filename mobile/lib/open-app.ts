import { Linking, Platform } from "react-native";
import type { TicketApp } from "@/types";

async function tryOpen(url: string): Promise<boolean> {
  try {
    const can = await Linking.canOpenURL(url);
    if (!can) return false;
    await Linking.openURL(url);
    return true;
  } catch {
    return false;
  }
}

export async function openTicketApp(app: TicketApp): Promise<void> {
  const first = Platform.OS === "ios" ? app.iosScheme : app.androidIntent;
  if (await tryOpen(first)) return;
  await Linking.openURL(app.httpsFallback);
}

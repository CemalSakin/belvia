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
  if (Platform.OS === "ios") {
    if (await tryOpen(app.iosScheme)) return;
  } else {
    if (await tryOpen(app.androidIntent)) return;
    if (app.androidPackage) {
      const market = `market://details?id=${app.androidPackage}`;
      // Do not bounce through Play if the app is missing. The public site is enough.
      void market;
    }
  }
  await Linking.openURL(app.httpsFallback);
}

import { Linking, Platform } from "react-native";
import type { TicketApp } from "@/types";

export async function openTicketApp(app: TicketApp): Promise<void> {
  const primary = Platform.select({
    ios: app.iosScheme,
    default: app.androidIntent,
  }) as string;

  try {
    const can = await Linking.canOpenURL(primary);
    if (can) {
      await Linking.openURL(primary);
      return;
    }
  } catch {
    // Fall through to the public site. Schemes fail closed on purpose.
  }
  await Linking.openURL(app.httpsFallback);
}

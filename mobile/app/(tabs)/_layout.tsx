import { Tabs } from "expo-router";
import { Briefcase, CalendarDays, MapPin, Receipt, Route } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#67e8f9",
        tabBarInactiveTintColor: "#64748b",
        tabBarLabelStyle: { fontSize: 10, fontWeight: "600", fontFamily: "monospace" },
        tabBarStyle: {
          backgroundColor: "#030712",
          borderTopColor: "rgba(255,255,255,0.08)",
          height: 56 + insets.bottom,
          paddingBottom: Math.max(insets.bottom, 8),
          paddingTop: 6,
        },
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Trip", tabBarIcon: ({ color, size }) => <Route color={color} size={size} /> }} />
      <Tabs.Screen name="schedule" options={{ title: "Schedule", tabBarIcon: ({ color, size }) => <CalendarDays color={color} size={size} /> }} />
      <Tabs.Screen name="places" options={{ title: "Places", tabBarIcon: ({ color, size }) => <MapPin color={color} size={size} /> }} />
      <Tabs.Screen name="bag" options={{ title: "Bag", tabBarIcon: ({ color, size }) => <Briefcase color={color} size={size} /> }} />
      <Tabs.Screen name="tickets" options={{ title: "Tickets", tabBarIcon: ({ color, size }) => <Receipt color={color} size={size} /> }} />
    </Tabs>
  );
}

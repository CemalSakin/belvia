export type TabKey = "trip" | "schedule" | "places" | "bag" | "tickets";

export type ReminderList = "prep" | "flight" | "coach" | "stay" | "meet";

export interface Place {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
}

export interface Reminder {
  id: string;
  title: string;
  notes: string;
  at: string | null;
  list: ReminderList;
  placeId: string | null;
}

export interface RouteLeg {
  id: string;
  label: string;
  when: string;
  fromId: string;
  toId: string;
}

export interface PackItem {
  id: string;
  label: string;
  hint: string;
}

export interface PackGroup {
  id: string;
  title: string;
  items: PackItem[];
}

export interface TicketApp {
  id: string;
  name: string;
  hint: string;
  iosScheme: string;
  androidIntent: string;
  httpsFallback: string;
}

export interface TripMeta {
  title: string;
  subtitle: string;
  rangeLabel: string;
}

export interface TripSnapshot {
  meta: TripMeta;
  reminders: Reminder[];
  places: Place[];
  routes: RouteLeg[];
  pack: PackGroup[];
  apps: TicketApp[];
}

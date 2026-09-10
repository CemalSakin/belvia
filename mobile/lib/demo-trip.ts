import type { TripSnapshot } from "@/types";

export const EMPTY_TRIP: TripSnapshot = {
  meta: {
    title: "Belvia",
    subtitle: "On-device itinerary",
    rangeLabel: "Add a trip",
  },
  reminders: [],
  places: [],
  routes: [],
  pack: [
    {
      id: "docs",
      title: "Documents",
      items: [
        { id: "pass", label: "Passport", hint: "Photo page + a paper copy" },
        { id: "sim", label: "Local SIM / eSIM plan", hint: "Do this before roaming hits" },
      ],
    },
    {
      id: "carry",
      title: "Carry-on",
      items: [
        { id: "chg", label: "Charger + adapter", hint: "EU plug" },
        { id: "med", label: "Medication", hint: "Original blister" },
      ],
    },
  ],
  apps: [
    {
      id: "wizz",
      name: "Wizz Air",
      hint: "Boarding pass and check-in",
      iosScheme: "wizzair://",
      androidIntent: "intent://#Intent;package=com.wizzair.WizzAirApp;end",
      httpsFallback: "https://www.wizzair.com",
    },
    {
      id: "flix",
      name: "FlixBus",
      hint: "Coach QR",
      iosScheme: "flixbus://",
      androidIntent: "intent://#Intent;package=de.flixbus.app;end",
      httpsFallback: "https://www.flixbus.com",
    },
    {
      id: "airbnb",
      name: "Airbnb",
      hint: "Stay check-in",
      iosScheme: "airbnb://",
      androidIntent: "intent://#Intent;package=com.airbnb.android;end",
      httpsFallback: "https://www.airbnb.com",
    },
  ],
};

export const DEMO_TRIP: TripSnapshot = {
  meta: {
    title: "Central Europe",
    subtitle: "Ankara \u00b7 Budapest \u00b7 Vienna",
    rangeLabel: "14\u201321 Sep 2026",
  },
  reminders: [
    {
      id: "r1",
      title: "Buy or activate a local line",
      notes: "Roaming off. eSIM or a stall SIM after landing.",
      at: "2026-09-14T12:30:00+02:00",
      list: "prep",
      placeId: "bud",
    },
    {
      id: "r2",
      title: "Open the airline app",
      notes: "Check-in lives where you bought the cheap seat.",
      at: "2026-09-13T17:00:00+03:00",
      list: "flight",
      placeId: "esb",
    },
    {
      id: "r3",
      title: "Coach to Vienna",
      notes: "Save the QR before you lose signal.",
      at: "2026-09-17T06:00:00+02:00",
      list: "coach",
      placeId: "nep",
    },
  ],
  places: [
    { id: "esb", name: "Esenbo\u011fa", address: "Ankara ESB", lat: 40.1281, lng: 32.9951 },
    { id: "bud", name: "BUD Terminal 2", address: "Budapest Liszt Ferenc", lat: 47.4369, lng: 19.2573 },
    { id: "nep", name: "N\u00e9pliget", address: "Budapest coach station", lat: 47.4746, lng: 19.0986 },
    { id: "erd", name: "Vienna Erdberg", address: "Vienna coach station", lat: 48.1906, lng: 16.4142 },
  ],
  routes: [
    {
      id: "leg1",
      label: "BUD T2 \u2192 city",
      when: "14 Sep \u00b7 after landing",
      fromId: "bud",
      toId: "nep",
    },
    {
      id: "leg2",
      label: "Budapest \u2192 Vienna",
      when: "17 Sep \u00b7 06:00",
      fromId: "nep",
      toId: "erd",
    },
  ],
  pack: EMPTY_TRIP.pack,
  apps: EMPTY_TRIP.apps,
};

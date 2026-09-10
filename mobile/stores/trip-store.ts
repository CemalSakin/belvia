import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { DEMO_TRIP, EMPTY_TRIP } from "@/lib/demo-trip";
import type { Reminder, ReminderList, TripSnapshot } from "@/types";

const STORE_KEY = "belvia-user-v1";

interface TripState {
  trip: TripSnapshot;
  done: Record<string, boolean>;
  packed: Record<string, boolean>;
  extra: string;
  loadDemo: () => void;
  reset: () => void;
  toggleDone: (id: string) => void;
  togglePacked: (id: string) => void;
  setExtra: (value: string) => void;
  addReminder: (input: {
    title: string;
    notes: string;
    at: string | null;
    list: ReminderList;
  }) => void;
}

function nextId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}`;
}

export const useTripStore = create<TripState>()(
  persist(
    (set) => ({
      trip: EMPTY_TRIP,
      done: {},
      packed: {},
      extra: "",
      loadDemo: () =>
        set({
          trip: DEMO_TRIP,
          done: {},
          packed: {},
        }),
      reset: () =>
        set({
          trip: EMPTY_TRIP,
          done: {},
          packed: {},
          extra: "",
        }),
      toggleDone: (id) =>
        set((state) => ({
          done: { ...state.done, [id]: !state.done[id] },
        })),
      togglePacked: (id) =>
        set((state) => ({
          packed: { ...state.packed, [id]: !state.packed[id] },
        })),
      setExtra: (value) => set({ extra: value }),
      addReminder: ({ title, notes, at, list }) =>
        set((state) => {
          const reminder: Reminder = {
            id: nextId("rem"),
            title: title.trim(),
            notes: notes.trim(),
            at,
            list,
            placeId: null,
          };
          if (reminder.title.length === 0) {
            return state;
          }
          return {
            trip: {
              ...state.trip,
              reminders: [...state.trip.reminders, reminder],
            },
          };
        }),
    }),
    {
      name: STORE_KEY,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        trip: state.trip,
        done: state.done,
        packed: state.packed,
        extra: state.extra,
      }),
    },
  ),
);

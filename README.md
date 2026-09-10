<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=1e3a5f&height=170&section=header&text=BudVia&fontSize=58&fontColor=f0e68c&animation=fadeIn&fontAlignY=36&desc=The%20trip%20stays%20on%20this%20phone&descAlignY=64&descSize=16" alt="BudVia" />
</p>

<p align="center">
  <a href="https://tahsinsakin.github.io/belvia/"><img src="https://img.shields.io/badge/live-tahsinsakin.github.io%2Fbelvia-f0e68c?style=for-the-badge&labelColor=1e3a5f" alt="live" /></a>
  <img src="https://img.shields.io/badge/PWA-Home%20Screen-06b6d4?style=for-the-badge&labelColor=1e3a5f" alt="pwa" />
  <img src="https://img.shields.io/badge/no%20account-no%20server-22c55e?style=for-the-badge&labelColor=1e3a5f" alt="private" />
  <img src="https://img.shields.io/github/license/tahsinsakin/belvia?style=for-the-badge&labelColor=1e3a5f&color=f59e0b" alt="mit" />
  <img src="https://img.shields.io/badge/TypeScript-Expo-3178C6?style=for-the-badge&labelColor=1e3a5f" alt="ts" />
</p>

# Buying the ticket is easy. Keeping the trip together is not.

Cheap travel is split on purpose.

The lowest fare is on Wizz. The coach is on FlixBus. The room is on Airbnb or Booking. The city bike is another app. The dinner table is another one again. Each confirmation is cheap. Each confirmation lives in a different inbox. You spend a week assembling a trip out of five purchases, then spend the night before departure assembling those five purchases back into one trip.

BudVia is that second job.

---

## What it is

An on-device itinerary for trips you already booked.

It does not sell flights, coaches, or rooms. It is not a reservation site. It does not replace Wizz, FlixBus, Airbnb, or Booking. It holds the plan those apps refuse to hold together, and a tap opens the same app you used to buy the ticket.

The trip sits in one place:

- Where it starts
- When it starts
- How early you leave
- When you need to be there
- The route
- What is in the bag
- What is next

No account. No server. No analytics. The plan stays on this phone. Clear the trip and it is gone.

## What it is not

| Not this | This |
|---|---|
| A booking site | A register of bookings you already made |
| A new ticket app | A tap that opens the app you already use |
| A cloud product | Local storage on this device |
| A tracking product | No login, no backend, no analytics |
| Travel advice | The itinerary you actually have |

Trip data lives under the `localStorage` key `belvia-v2`.

## Screens

| Screen | Purpose |
|---|---|
| Trip | Arrival view, flight card, next action |
| Schedule | Dated reminders — times with dates, not times alone |
| Places | Pins and directions, opened in the system maps app |
| Bag | Packing list for the sample week |
| Tickets | Wizz, FlixBus, Airbnb, Booking, MOL Bubi |

```mermaid
flowchart LR
  A[Wizz / FlixBus / Airbnb / Booking] -->|already bought| B[BudVia]
  B --> C[Schedule]
  B --> D[Maps]
  B --> E[Bag]
  B -->|tap opens the same app| A
```

## Open it

1. Safari → [tahsinsakin.github.io/belvia](https://tahsinsakin.github.io/belvia/)
2. Share → **Add to Home Screen**
3. Load the sample itinerary, or enter your own dates

No sign-in. App Store listing copy is in [`APP_STORE.md`](APP_STORE.md). The PWA is usable today.

## Publisher

Tahsin Sakin  
Information Systems Engineer · Ankara  
[linkedin.com/in/tahsinsakin](https://www.linkedin.com/in/tahsinsakin)

An idiot admires complexity, a genius admires simplicity.  
— Terry A. Davis

MIT. See `LICENSE`.

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=1e3a5f&height=90&section=footer" alt="" />
</p>

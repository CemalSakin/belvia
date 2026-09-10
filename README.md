# Belvia

Cheap tickets live in five different apps. Belvia puts the whole trip on one phone, on this device.

You book the flight on Wizz, the coach on FlixBus, the room on Airbnb or Booking, then a bike pass, a dinner table, a dating app pin. Each confirmation sits in a different inbox. Belvia is the single timeline that holds them together: times, maps, packing, and a tap that opens the app you already used to buy the ticket.

No account. No server. No analytics. The itinerary never leaves the phone that opened the page.

## The problem it solves

Hunting for the cheapest seat means splitting a trip across airlines, coaches, hosts and side apps. Reconstructing that trip the night before departure is slow and easy to get wrong. Belvia does not sell tickets. It collects what you already bought and turns it into one private plan you can swipe through.

- Flight and coach times on one card
- Reminders with full dates, not just a clock
- Apple Maps directions for each leg
- Packing list that stays on the device
- Deep links into Wizz Air, FlixBus, Airbnb, Booking, MOL Bubi, Bumble, Timeleft, Nomadtable — only if they are already installed
- Calendar and Reminders export as `.ics`

## Dates

| | |
|---|---|
| Listing prepared | 10 September 2026 |
| Intended App Store release | 12 September 2026 |
| Sample itinerary | 14–21 September 2026, Ankara → Budapest → Vienna |

The sample is optional and censored: booking codes are masked, street numbers are omitted, pins sit on public landmarks. Start empty and type your own trip if you prefer.

## Open on iPhone

1. Open `index.html` in Safari, or GitHub Pages once it is on.
2. Share → **Add to Home Screen**.
3. Create a trip with dates, or tap **Load sample itinerary**.

Data lives in `localStorage` key `belvia-v2`. Clear trip removes it.

## App Store

Native review still needs an Apple Developer account and an Xcode wrapper. The store text, keywords and privacy answers are in [`APP_STORE.md`](APP_STORE.md). Belvia itself is a PWA you can ship today as a Home Screen app.

GitHub Pages target:

`https://cemalsakin.github.io/belvia/`

## Publisher

Tahsin Sakin  
[linkedin.com/in/tahsinsakin](https://www.linkedin.com/in/tahsinsakin)

MIT License. See `LICENSE`.

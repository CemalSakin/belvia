# Belvia

A private, on-device travel companion for iPhone.

No account. No server. No analytics. Trip data stays in the browser that opened the page.

Belvia is a single-file Progressive Web App: itinerary, reminders, Apple Maps directions, packing list, calendar / Reminders export, and deep links into apps already installed on the phone.

## Open on iPhone

1. Open `index.html` in Safari, or use GitHub Pages after it is enabled.
2. Share → **Add to Home Screen**.
3. Start empty, or tap **Load sample itinerary**.
4. Replace sample pins and booking codes with your own.

Sample data is censored on purpose: booking codes are masked, street numbers are omitted, and pins sit on public landmarks only.

## What it does

- **Today** — trip title, next reminder, flight ticket card
- **Plan** — dated checklist with Apple Maps links
- **Map** — Leaflet pins plus native Maps directions (easy Close)
- **Pack** — packing list stored on this device
- **Apps** — opens Wizz Air, FlixBus, Airbnb, Booking, MOL Bubi, Bumble, Timeleft, Nomadtable if they are installed
- **Export** — `.ics` for Calendar and Reminders

Swipe left / right between tabs. Header and dock stay put.

## Privacy

- Default state is empty.
- Persistence is `localStorage` key `belvia-v2` only.
- Content-Security-Policy, HTML escaping, `rel="noopener noreferrer"`, `Referrer-Policy: no-referrer`.
- No login, no backend, no cookies from Belvia itself.

Clear trip removes the copy from that browser.

## Run locally

Open `index.html` in Safari or any modern browser. Leaflet tiles load from CARTO via unpkg. Everything else is local.

To serve from this repo with GitHub Pages:

1. Settings → Pages
2. Source: Deploy from a branch
3. Branch: `main` / root

Then the live app is:

`https://cemalsakin.github.io/belvia/`

## Publisher

Tahsin Sakin  
[linkedin.com/in/tahsinsakin](https://www.linkedin.com/in/tahsinsakin)

MIT License. See `LICENSE`.

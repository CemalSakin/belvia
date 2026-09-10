# Install BudVia

No account. No store login is required for the version that is live today.

The product people can open right now is the PWA at
[tahsinsakin.github.io/belvia](https://tahsinsakin.github.io/belvia/).
Native Play / App Store builds use the same product in `mobile/`.
They ship after a store account accepts the bundle. Until then, use the steps below.

---

## iPhone / iPad (Safari)

1. Open [tahsinsakin.github.io/belvia](https://tahsinsakin.github.io/belvia/) in **Safari**. Chrome on iOS cannot add a reliable Home Screen app.
2. Tap Share.
3. Tap **Add to Home Screen**.
4. Tap Add. Open BudVia from the Home Screen, not from a Safari tab.
5. Load the sample itinerary, or type your own dates.

The trip is stored on that device under `localStorage` key `belvia-v2`.

---

## Android (Chrome)

1. Open [tahsinsakin.github.io/belvia](https://tahsinsakin.github.io/belvia/) in **Chrome**.
2. Tap the menu (⋮).
3. Tap **Install app** or **Add to Home screen**.
4. Confirm. Open BudVia from the launcher icon.
5. Load the sample itinerary, or type your own dates.

Samsung Internet: menu → **Add page to** → Home screen.

Firefox on Android can pin a shortcut. Chrome is the install path that behaves like an app.

If Chrome does not show Install app, the page is still usable in the tab. The itinerary still stays on the phone.

---

## Desktop

The layout is built for a phone. Use the phone. A desktop window is only for reading the repo.

---

## Google Play (native Android)

Package: `app.belvia.trip`  
Listing copy: [`PLAY_STORE.md`](PLAY_STORE.md)  
Privacy policy: [tahsinsakin.github.io/belvia/privacy.html](https://tahsinsakin.github.io/belvia/privacy.html)

The Play listing is not live until a Play Console account uploads an Android App Bundle from `mobile/` and review accepts it. Personal Play accounts created after November 2023 also need a closed test (12 testers, 14 continuous days) before production.

When the listing is live, this section will be a single store link. Until then, Chrome → Add to Home screen is the Android install.

Build steps for the publisher are in [`mobile/README.md`](mobile/README.md).

---

## App Store (native iPhone)

Listing copy: [`APP_STORE.md`](APP_STORE.md). Same rule: the PWA is the install that works today.

---

## After install

- BudVia does not sell tickets. Open Wizz, FlixBus, Airbnb, or Booking from the Tickets tab if that app is already on the phone. Otherwise the public site opens.
- Directions open the system maps app (Apple Maps on iOS, the default maps handler on Android).
- Clearing the trip deletes the only copy. There is no cloud backup.

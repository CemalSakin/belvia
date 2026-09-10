# BudVia mobile

Expo managed workflow. TypeScript. On-device only.

Tabs: Trip · Schedule · Places · Bag · Tickets.

Zustand + AsyncStorage. Directions open the system maps app. Ticket rows open the booking app or its public site.

Users who only want the app should follow [`../INSTALL.md`](../INSTALL.md). This file is for producing the native Android bundle.

## Run

```bash
cd mobile
npm install
npx expo start
```

## Play Store build

Play rejects new apps that do not target API 36. This tree started on Expo SDK 51. Before the first upload:

```bash
cd mobile
npm install expo@^54.0.0
npx expo install --fix
npx expo install expo-build-properties
```

Then add to `app.json` plugins:

```json
["expo-build-properties", { "android": {
  "minSdkVersion": 24,
  "compileSdkVersion": 36,
  "targetSdkVersion": 36,
  "usesCleartextTraffic": false
}}]
```

Confirm with `npx expo config --type public` that `android.package` is `app.belvia.trip` and that blocked permissions are still listed.

```bash
npm install -g eas-cli
eas login
eas init
eas build --platform android --profile production
```

That profile emits an `.aab`. Upload the AAB in Play Console. Do not upload an APK to production. Preview profile emits an APK for a device you hold.

Listing paste: [`../PLAY_STORE.md`](../PLAY_STORE.md).  
Privacy URL: https://tahsinsakin.github.io/belvia/privacy.html

Play Console also needs a 512 icon, a 1024×500 feature graphic, two phone screenshots, Data safety = no collection, content rating, and — on personal accounts opened after 13 November 2023 — a closed test with 12 testers for 14 days.

Signing keys stay in EAS or in a password manager. They do not belong in this repository.

# BudVia — Google Play listing

Prepared: 10 September 2026  
Version name: 1.0.0  
Version code: 1  
Package name: `app.belvia.trip`  
App name: BudVia  
Default language: English (United States)  
Category: Travel & Local  
Tags: travel, maps  
Price: Free  
User acquisition: all countries  
Content rating: Everyone (questionnaire in this file)  
Target API: 36 (Android 16) — required for new Play uploads from 31 August 2026  
Build format: Android App Bundle (`.aab`). Play rejects a raw APK for a new listing.

This file is the Console paste. It is not a live store URL.

---

## Short description (80 characters)

One itinerary for cheap tickets. On this phone. No account. No server.

Count: 71.

## Full description (4000 characters max)

Cheap travel is split on purpose.

The lowest fare is on Wizz. The coach is on FlixBus. The room is on Airbnb or Booking. City transport is another app. Dinner is another one again. Each confirmation is cheap. Each confirmation lives in a different inbox. You spend a week assembling a trip out of five purchases, then spend the night before departure assembling those five purchases back into one trip.

Buying the ticket is not the hard part. Remembering the ticket is.

BudVia is that second job.

It does not sell flights, coaches, or rooms. It is not a booking site. It does not replace Wizz, FlixBus, Airbnb, or Booking. It holds the plan those apps do not hold together. A tap opens the same app you used to buy the ticket. If that app is not installed, the public site opens instead. BudVia never sends you through a store redirect of its own.

What sits in one place:

• Where the trip starts
• When it starts
• How early you leave
• When you need to be there
• The route
• What is in the bag
• What is next

There is no BudVia account. There is no BudVia server. There is no BudVia analytics SDK. The itinerary is stored only on this device. Clear the trip and it is gone.

Start empty and type your own dates, or load the sample trip (14–21 September 2026, Ankara → Budapest – Vienna). Sample codes are masked. Street numbers are left out. Pins sit on public landmarks.

Directions open the maps app already on the phone. BudVia does not collect location. It does not run a map tile account of its own for the native build.

Publisher: Tahsin Sakin.

## Graphics Play will reject if missing

| Asset | Size | Note |
|---|---|---|
| High-res icon | 512 × 512 PNG, 32-bit, no alpha | Otter mark on `#1e3a5f`. Not a screenshot. |
| Feature graphic | 1024 × 500 PNG or JPEG | Wordmark + one line: the trip stays on this phone. |
| Phone screenshots | at least 2, up to 8 | Trip, Schedule, Tickets. 16:9 or 9:16. |
| 7-inch / 10-inch | optional | Skip. `supportsTablet` is false on iOS; phone-only is the product. |

Do not upload live boarding passes or readable booking codes.

## Contact

| Field | Value |
|---|---|
| Email | use the address on the Play developer profile |
| Website | https://tahsinsakin.github.io/belvia/ |
| Privacy policy | https://tahsinsakin.github.io/belvia/privacy.html |
| Support | https://www.linkedin.com/in/tahsinsakin |

## Data safety (Console answers)

Does the app collect or share any of the required user data types? **No.**

- No account creation
- No location collected by BudVia
- No personal info collected
- No financial info collected
- No photos, video, or files uploaded
- No contacts, SMS, or call log
- No health or fitness data
- No device IDs collected by BudVia
- No analytics SDK
- No advertising ID
- No crash reporter that leaves the device
- No third-party sharing

Trip text the user types stays in app storage on that device (AsyncStorage). It is not transmitted by BudVia.

Security practices: data is not encrypted in transit because BudVia does not send trip data. Users can delete the itinerary in-app.

## Content rating questionnaire

| Question | Answer |
|---|---|
| Category | Utility / Productivity / Travel |
| Violence | No |
| Sexual content | No |
| Language | No |
| Controlled substances | No |
| Miscellaneous — user-generated content that is public | No |
| Share location | No |
| Digital purchases | No |
| Age | Everyone |

## Review notes for Play

This build is a private itinerary companion. There is no login and no demo account. Reviewers should tap Load sample itinerary. Personal booking codes are not included. Deep links open third-party apps only when those apps are already installed; otherwise the public https site opens. Location permission is not requested. Camera and microphone are not requested.

## Store gates that are not code

1. Play Console account, identity verification, one-time registration fee.
2. Package `app.belvia.trip` registered to that account.
3. Expo SDK in `mobile/` must target API 36 before the first AAB. SDK 51 does not. Upgrade to Expo SDK 54 or newer, then `npx expo install --fix`, then `eas build --platform android --profile production`.
4. Closed testing: 12 testers opted in for 14 continuous days if the developer account is a personal account created after 13 November 2023.
5. Privacy policy URL must resolve over https. `privacy.html` on GitHub Pages is that URL.

Until those five are done, Android users install from Chrome. That path is documented in [`INSTALL.md`](INSTALL.md).

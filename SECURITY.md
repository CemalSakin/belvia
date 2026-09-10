# Security

BudVia does not collect accounts or talk to an API you own.

## Design

- PWA trip data lives in `localStorage` under `belvia-v2`.
- Native trip data lives in app storage on that device.
- Android backup of app data is disabled (`allowBackup: false`).
- User text in the PWA is escaped before it is written into the DOM.
- External links use `rel="noopener noreferrer"` where the document is HTML.
- A Content-Security-Policy meta tag limits scripts, images, and connections on the PWA.
- Deep links only target schemes or packages for apps the user already installed. Missing apps open the public https site. There is no store redirect flow.
- Native Android requests no location, camera, microphone, contacts, or SMS permissions.

## Reporting

Contact Tahsin Sakin via [LinkedIn](https://www.linkedin.com/in/tahsin-sakin-390961199).

Do not open issues that contain live booking codes, passport data, or exact stay addresses.

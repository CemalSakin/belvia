# Privacy policy — BudVia

Effective: 10 September 2026  
Publisher: Tahsin Sakin  
Product: BudVia (package `app.belvia.trip`, PWA at https://tahsinsakin.github.io/belvia/)

This policy covers the BudVia PWA and the native Android / iOS builds from this repository.

## What BudVia does not do

BudVia does not create accounts.  
BudVia does not run a server of its own.  
BudVia does not include an analytics SDK, advertising SDK, crash reporter that leaves the device, or social login.  
BudVia does not sell tickets, rooms, or routes.  
BudVia does not collect location. Opening directions hands the place name to the maps app already on the phone. That maps app has its own policy.

## What stays on the device

If you type a trip, or load the sample itinerary, that text is stored only on that device.

- PWA: browser `localStorage`, key `belvia-v2`
- Native: app storage via AsyncStorage

BudVia does not transmit that text to Tahsin Sakin or to a BudVia backend. There is no BudVia backend.

## What leaves the device when you tap something

- A ticket row opens the third-party app if it is installed, or that company’s public website.
- A directions action opens the system maps app or OpenStreetMap in a browser.
- The LinkedIn link on the Tickets screen opens LinkedIn.

Those destinations are not BudVia. Their policies apply once they open.

## Permissions

The native Android build is configured to request no location, camera, microphone, contacts, SMS, or storage permissions. If a future OS dialog appears for opening another app, that dialog belongs to the operating system, not to a BudVia upload.

## Children

BudVia is not directed at children. It does not collect data from anyone, including children.

## Deletion

Clear the trip in the app. That deletes the only BudVia copy. Uninstalling the app or clearing site data for tahsinsakin.github.io has the same effect.

## Changes

Material changes will be dated at the top of this file and at https://tahsinsakin.github.io/belvia/privacy.html.

## Contact

Tahsin Sakin  
https://www.linkedin.com/in/tahsinsakin  
https://github.com/tahsinsakin/belvia

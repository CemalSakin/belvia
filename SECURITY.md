# Security

BudVia is a static page. It does not collect accounts or talk to an API you own.

## Design

- Trip data lives in `localStorage` under `belvia-v2`.
- User text is escaped before it is written into the DOM.
- External links use `rel="noopener noreferrer"`.
- A Content-Security-Policy meta tag limits scripts, images, and connections.
- Deep links only target schemes for apps the user already installed. There is no App Store redirect flow.

## Reporting

Contact Tahsin Sakin via [LinkedIn](https://www.linkedin.com/in/tahsinsakin).

Do not open issues that contain live booking codes, passport data, or exact stay addresses.

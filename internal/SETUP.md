# Ratan Staff Studio — activation checklist

## Status: prepared, not yet deployed

Google sign-in and live lookup need a NEW Apps Script deployment. The public brochure address is a sign-in gateway with a clear setup-pending state until that URL is configured. The staff UI is not included in the public Pages artifact. Repository source remains public; source visibility is not permission to read private leads.

Do not replace the existing public enquiry receiver. That would break customer submissions or risk exposing staff functions.

## Owner steps (one-time)

1. Create a separate Google Apps Script project named **Ratan Staff Studio**.
2. Paste `internal/Code.gs` into Code.gs. Add an HTML file named **Studio** and paste `internal/Studio.html` into it.
3. In Project Settings, enable manifest display. Use `internal/appsscript.json`. Its scopes are staff identity and read-only Sheets; no sending, public sharing or Drive-write permission.
4. Add Script Properties: `RATAN_SHEET_ID` = your existing enquiry spreadsheet ID, and `RATAN_ALLOWED_STAFF` = a comma-separated list of approved Google email addresses. Keep that list private; do not commit it to GitHub. Empty/unavailable identity or an empty allowlist denies access.
5. Deploy → New deployment → Web app. Execute as **User accessing the web app**, NOT Me. Require signed-in Google users (or your Workspace organisation). Each allowlisted account must already have access to the Restricted Sheet. Approve the identity/readonly scopes yourself.
6. Give me the new /exec URL so I can set `brochure/staff-config.js`. The URL is public routing, not a secret. Never paste a password/token there.
7. Test with an allowed account, a signed-out window, and a non-allowlisted account. Only the allowed account should see the studio or successfully call lookup/price functions. Test a known reference and an unknown reference. Verify that the public enquiry form still saves normally.

These owner/account steps are not marked complete until tested on the actual deployment. Runtime-only unit tests do not establish Google account configuration.

## Requirements are retained

Reference lookup reads one exact match from Enquiries column Q, checks the expected headers and returns only reference, customer, brief, enquiry type, quantity note and delivery location. It never returns the full database or phone numbers to the proposal builder. Duplicate reference matches stop for review.

Older enquiries contain free text, not a structured BOQ. Every non-empty line becomes a review row. Recognised `Name: quantity unit — specification` lines prefill those fields; ambiguous lines keep quantity/unit blank. Nothing is silently inferred or dropped. Full original text remains in the proposal. Requested items can only be removed with an explicit exclusion reason, carried into the PDF. Manual items/design selection remain available. Loaded enquiries use complete-list totals; standalone comparison templates treat options as alternatives.

## Optional PriceBook (not populated yet)

Within the same restricted workbook, create a tab named PriceBook with these exact columns:

| Material key | Specification | Unit | Unit rate | Tax % | Valid until | Currency |
| --- | --- | --- | --- | --- | --- | --- |

Use numeric rates/tax and a real Sheet date for validity. Match the material name, full specification, unit and currency exactly. Do not enter illustrative prices as production rates. The script only suggests a unique current exact match; duplicate, expired or partial matches do not auto-fill. Existing manual prices are preserved. Rates still require staff approval and stock confirmation. Delivery allocation is manual; avoid entering the full freight charge on every line.

## Approval and automation roadmap

Current: reference → per-line coverage review → optional current price suggestion → exact PDF preview → explicit approval → download. Any edit invalidates the preview/approval. No customer messages are sent.

Next, before automated sending:

1. Add a private Quotes/QuoteItems store with immutable revision ID and PDF digest; no mutable “latest quote” attached after approval.
2. Capture and verify customer delivery channel. Existing enquiry fields do not include an email address; a phone number is not permission to email or send promotional WhatsApp messages.
3. Display recipient, attachment, revision and message at approval. Persist approved/sending/sent/failed states with idempotency to avoid duplicate sends.
4. Choose an email provider or WhatsApp Business API and keep credentials server-side. Authorise those scopes separately. Provide delivery logs, retries and a human resend decision for uncertain delivery.
5. Add supplier-rate import validation, expiry reminders, unresolved-quantity alerts, missing-item checks, quote ageing and a follow-up queue. Introduce verified availability before stock or delivery promises.

No sending scopes, secrets, public price book, scheduled jobs or notifications have been added in this release.

## Why preview differed before

The previous HTML preview and jsPDF export were two separate renderers with different fonts, pagination and image treatment. The exporter also letterboxed all pictures into a fixed landscape canvas. Now Preview PDF produces the actual downloadable bytes; approval downloads that exact object. Cover images fill their own frame with a centred crop, while swatches preserve aspect ratio without artificial letterboxing. Both the staff UI and PDFs use locally packaged DM Sans and Instrument Serif. English/Latin is currently supported; Gujarati shaping remains pending.

## Primary documentation

- [Google web-app execution identity](https://developers.google.com/apps-script/guides/web)
- [Active-user identity limitations](https://developers.google.com/apps-script/reference/base/session)
- [Authenticated HTML-service server calls](https://developers.google.com/apps-script/guides/html/communication)

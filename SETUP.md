# Ratan prototype handoff

## Website and deployment

Publish index.html, styles.css, script.js and config.js together at the repository root (relative paths support GitHub Pages project sites). No build step is required. No credentials or enquiry records belong in Git.

## Google Sheets receiver — update required

The endpoint in config.js is configured, but its deployed code has not been verified or updated remotely. The old receiver does not save the new lead metadata or enforce the new validation. In the existing Apps Script project, replace its code with google-apps-script.js. Select Deploy → Manage deployments → Edit → New version → Deploy, keeping the same URL. Execute as your account and allow Anyone to submit; keep the spreadsheet itself Restricted, shared only with your team.

The website uses a regular POST to a separate receipt tab. It does not infer success from an opaque no-cors response. The updated receiver returns confirmation only after a row is written; failures return an explicit error. If an older deployment returns JSON, `ok: true` is its receipt, but the safeguards here are not active until redeployment.

Submit a clearly labelled test lead after deployment, verify the receipt and its corresponding sheet row, and test invalid input. Do not advertise live collection until this round-trip succeeds. No real customer information has been used for testing here.

## Follow-up workflow

The Enquiries tab retains the original seven columns and adds Lead ID, Type, Business, Timeline, Consent, Status, Owner, Next follow-up and Notes. New leads start at New. The desk assigns an owner and next follow-up date, updates Status (Contacted / Scoping / Quote sent / Won / Lost), and records notes. Supplier applications are a separate Type, never a public directory. This is a Sheet workflow, not an authenticated admin portal or automatic reminder system.

## Security boundaries

HTTPS protects transmission. The receiver does not expose rows or spreadsheet reads. Validation, field limits, a honeypot, serialized writes, duplicate request IDs and a short per-phone throttle reduce accidental duplicates and basic abuse. All submitted values are written as text to avoid spreadsheet formula injection. These controls do not stop determined bots: the endpoint is public and Apps Script has quotas. Add server-validated CAPTCHA and stronger rate limits before public traffic grows. Do not put API keys or a supposed secret token into config.js.

Keep Google sharing Restricted and enable account two-step verification. Collect basic contact/project details only; avoid payment data, IDs and private documents. Establish a retention/deletion policy and a public contact address before launch. Current website copy explains enquiry use and requires consent to contact.

## Prototype boundaries

Catalogue entries are material types, not validated supplier stock or brand SKUs. No fabricated prices, supplier ratings or delivery guarantees are shown. Shortlists stay in page memory; refreshing clears them. Guided planning is deterministic, not a connected LLM. Its finish calculation is front width × height, plus 15%, divided by 32 sq ft for an 8×4 sheet; this is not a carcass or full room BOQ. True LLM assistance needs a server-held API key and reviewable structured output.

## Research direction

- https://kyzo.in/ — accessible category/brand discovery and contractor orientation.
- https://hinch.in/ — guided human assistance alongside material discovery.
- https://www.eightbyfour.com/ — material-list procurement and unified quoting.

Ratan's MVP: browse or assemble a requirement → capture a lead → Ratan clarifies and sources → desk follows up with a coordinated quote. Existing laminate trading experience anchors the positioning; additional categories are sourced on request.

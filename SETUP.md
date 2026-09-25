# Ratan setup and operations

Updated 25 September 2026. See [REQUESTS-AND-CHANGELOG.md](REQUESTS-AND-CHANGELOG.md) for completion status and outstanding work.

## Publishing

Repository: chiragladha/project-ratan. Settings → Pages → Source: GitHub Actions. Main-branch changes run the Publish Ratan workflow, validating and publishing the website and /brochure/. Do not run a competing branch/Jekyll source. Always check the actual URLs after deployment. The September25 404 was reproduced; the built-in deployment reported Pages not enabled. Owner confirmed Actions source on September25.

## Enquiry receiver

The deployed receiver has been verified with labelled test leads. google-apps-script.js is its source, not the website JavaScript. For future changes, replace code in the EXISTING Apps Script project, then Deploy → Manage deployments → Edit → New version → Deploy. Execute as owner, access Anyone; keep the Sheet Restricted. GitHub commits do not update Apps Script.

The website posts using fetch. Only a confirmed server save with matching request ID and reference opens the on-page success dialog. No new receipt tab or opaque no-cors success assumption. An uncertain failure retains the form and retry ID. Material-word references are not credentials.

The Enquiries tab has17 columns including Lead ID, Type, Business, Timeline, Consent, Status, Owner, Next follow-up, Notes and Reference. Desk workflow: New → Contacted → Scoping → Quote sent → Won/Lost. Assign owner and follow-up manually. No automatic alerts are enabled.

## PDF proposals

**Latest:** /brochure/ now routes to the Google staff sign-in gateway, pending the new owner deployment. Use internal/SETUP.md for current protected-studio setup; the earlier manual workflow below applies inside that app. Reference lookup and PriceBook suggestions are prepared but not live until its private allowlist and deployment are configured. Approval now requires Preview PDF first, and downloads that exact file.

Open /brochure/, enter reference/customer/expiry, choose alternatives and actual prices, review specifications/tax/delivery, check the review box, then Download PDF. A finished A4 file downloads directly; no printing required. Keep a private JSON draft for revisions. Customer data stays in-browser unless explicitly exported. Never commit customer PDFs/drafts.

Optional Sheet handoff: add brochure/sheet-menu.gs as a SEPARATE script file, merge any existing onOpen, reload the Sheet, select a lead → Ratan → Export selected enquiry. Import its JSON into the studio. Menu installation is not done remotely. This is not live synchronisation; authenticated staff lookup/writeback is a later feature. Do not publish lead rows via a public GET endpoint.

## Security and limits

HTTPS, restricted Sheet access, validation, text-safe writes, honeypot, short per-phone throttle, idempotency and locking reduce common risks. They do not stop determined bots/quota exhaustion. Add server-verified abuse controls, staff access policy, retention/deletion rules and monitoring before scaled acquisition. Never embed keys in GitHub Pages. The preselected checkbox is for this enquiry, not unsolicited marketing; obtain appropriate privacy review before wider launch.

Shortlist storage contains material IDs/quantities only, not names, phones or enquiry text. Phone validation checks shape, not ownership. Fourteen INSTER designs are reviewed; stock/rates/batches require confirmation. The planner is deterministic, not a full BOQ or LLM. Turnaround and fulfilment are qualified targets, not unconditional guarantees. Direct PDFs support English/Latin text; unsupported scripts fail explicitly. No credit, checkout, payments or authenticated CRM.

## Domain

No domain bought. Compare registration AND renewal with taxes. After selection, configure the domain in Pages, then registrar DNS, verify ownership and HTTPS. Main-branch changes continue publishing to that domain.

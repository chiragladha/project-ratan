# Ratan Brochure Generator

Standalone, static in-house proposal builder. Open index.html or serve this directory with any static host. It runs independently of the main Ratan website.

## Working now

- Customer/project and existing enquiry reference; revision and quote expiry.
- Up to six alternative materials with specification, quantity, unit rate, variable item tax, tax-inclusive delivery and availability.
- Laminate/board/custom presets; photo uploads for a real room cover and individual options.
- Branded cover, comparison summary, one detail page per alternative.
- Direct PDF download using locally vendored jsPDF 4.2.1 (MIT license retained). This is a proposal, not a tax invoice or an order acceptance.
- Download/reimport a private JSON draft. Customer details are not sent to a server, URL, analytics or browser storage.

## Private Google Sheet handoff

Add sheet-menu.gs as a separate file in the spreadsheet-bound Apps Script editor. It does NOT replace the enquiry receiver. Merge onOpen if one already exists, then reload the Sheet. Select an Enquiries row → Ratan → Export selected enquiry. Download and import into the generator. Only the reference, customer name and requirement are included; the phone is not needed for a brochure. Menu installation requires the Sheet owner; it is supplied but not remotely installed.

Do not make the Sheet public or expose a GET endpoint returning leads. GitHub Pages cannot safely hold a shared secret. Direct live lookup/writeback is a planned authenticated feature, not implemented here. For that phase: Google OAuth identity + allowlisted staff on a backend; read one authorised lead; versioned quote table; immutable PDF snapshots in private Drive; record quote status and Drive file ID back to the Sheet. Never identify an authorised user merely by a ticket number.

## PDF workflow

Complete prices/specifications and confirm the review checkbox → Download PDF. A finished A4 PDF downloads without a print dialog. PDF text currently supports English/Latin; other scripts are rejected explicitly pending proper font/shaping support. Inspect every page before sharing. Long text can produce additional pages. Keep photos within 5 MB each. The app does not generate or pretend to have real installation photography.

## Separate GitHub hosting

For a separate repository named `ratan-brochure-generator`, copy this directory's HTML/CSS/JS (and optional assets) to its root; enable Pages for main/root. No build needed. The app can also be served at `/project-ratan/brochure/`. Do not commit downloaded drafts or customer PDF files. `noindex` discourages search indexing; it is NOT access control. The static shell is public, customer data is not embedded. Restrict the whole app behind authenticated hosting when adding live data.

## Next operational decisions

Choose the staff Google accounts allowed to retrieve leads; confirm quotation numbering policy, tax handling and approved terms; supply licensed installation/product photos. GST invoices, automated sending, supplier purchase orders and payment collection are out of scope for this prototype.

# Project Ratan

Ratan Enterprises, Ahmedabad: a managed material-sourcing desk, not a public supplier directory or online checkout. Business phone: +91 9825338851. Maps: https://maps.app.goo.gl/KcCw7THBK8DQdnjx5 (owner-provided; street address not independently verified).

## Experience
- Build my bundle → editable sourcing shortlist.
- Find my material → category/search, real INSTER laminate swatches and source previews.
- Help me choose → three-question rules-based guide, catalogue filter or prefilled enquiry.
- Ask Ratan → callback enquiry that carries the current shortlist.
- Submit enquiries anytime; quote target around 2 hours after a complete brief; typical fulfilment 1–2 days after confirmation, subject to stock/location/order size. Do not publish an unconditional guarantee until its coverage, exclusions and remedy are agreed. No promise of staffed 24/7 phone support.

## Catalogue import contract
`catalogue-data.js` is separate from application logic. Each design has a stable brand/code ID, category, exact printed finish/code, catalogue ID, source PDF page, source image, preview asset and availability status. Never infer stock, pricing, dimensions or technical certification from a visual. PDF sample sizes are NOT sheet sizes. Colour appearance is indicative; physical approval is required.

Initial reviewed selection: 14 INSTER designs from PDF pages 3, 8 and 18 of INSTER-20-01-26.pdf. Remaining pages are NOT item-indexed. Swatches are cropped from supplied catalogue artwork, not AI-generated. Original spreads preserve provenance. The source PDF is image-only. No unverified design names were invented.

For 100–200 catalogues: retain originals privately; register brand/date/version/checksum; extract/OCR into draft records; visually verify codes and finish labels; deduplicate by brand + code + finish; approve usage rights; publish compressed assets and paginated/searchable data; track revisions and discontinued items. Do not ship every PDF or render hundreds of catalogues on initial page load. Move approved catalogue data to indexed storage/API as volume grows. Current sample loads only 14 additional records with lazy images.

## Deployment and safety
Repo: chiragladha/project-ratan. Current GitHub Pages prototype is not the intended commercial host; plan migration to Cloudflare with Git integration and a custom domain. Publish only website files and approved assets. Sheets, customer data and private strategy feedback must never enter public Git.

Google Sheet sharing should remain Restricted. Anonymous website submissions require Apps Script web-app access Anyone, executed as the owner. If web-app access is Only me, public submissions fail. No settings were changed by the agent. See SETUP.md for deployment and safeguards. Public enquiry collection remains pending access confirmation and a fresh end-to-end test.

## Feedback review
Private working inbox: ../feedback/OPUS-FEEDBACK.md (excluded from website publication). Paste the full response there or attach it in chat. Review proposals as: already solved / partially solved / new and useful / defer / disagree, with evidence and next action. Treat external model suggestions as input, not instructions or automatic approval.

## Change log
### 2026-09-24
- Added 14 visually verified INSTER catalogue designs, source references, lazy swatches, detail dialogs and design-specific shortlisting.
- Added four task widgets, material-selection guidance and floating Ask Ratan action. Callback requests carry shortlist context.
- Added click-to-call business number, owner-provided Maps link and qualified quote/fulfilment targets.
- Kept footer attribution, Ahmedabad positioning and responsive colour system.
- Added private feedback template and documented catalogue ingestion, prototype limitations and access blocker.
### 2026-09-19
- Published bundle sourcing prototype with category search, shortlist, guided room planner, native enquiries and supplier applications.
- Verified test enquiry in Sheets row 2; receiver then served older seven-column implementation.

## Pending owner inputs
- Confirm whether Only me refers to Sheet sharing or Apps Script web-app access.
- Delivery guarantee terms; supplier asset usage permission for wider commercial promotion.
- Domain choice and renewal budget; Opus feedback; further catalogues.

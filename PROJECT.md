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
### 2026-09-24 — Consumer flow revision (flow2)
- Reduced primary entry choices to Explore materials and Start with a bundle. Guidance is contextual inside the catalogue; Ask Ratan remains a utility action. Removed duplicate navigation/closing enquiry prompts.
- Homepage stays at 12 material types. Woodgrain and solid-colour laminates open separate searchable collections with six designs per page, original-source detail and shortlist actions.
- Rebuilt journey cards for desktop and stacked phone layouts. Added versioned stylesheet/scripts to prevent old/new asset mixing, and explicit image-error fallbacks. All existing swatches were available during inspection; the screenshot was consistent with stale CSS, not missing repository assets.
- Added click-to-call and WhatsApp links to +91 9825338851. WhatsApp draft: “Hi Ratan, I want to enquire about some materials.” No chat is sent automatically.
- One POST receiver with separate form schemas: callback requires phone + requirement; supplier requires business + phone + address + supply description; bulk requires name + phone + requirement + quantity/project size + delivery area. Business/project and timing are optional for bulk.
- Shortlist, room-plan and material-guidance enquiries show the carried brief, then require only name + mobile + consent. Optional general-enquiry name is recorded as Not provided; unspecified location is explicitly To confirm — not provided, not an assumed address. Supplier business name maps to the legacy Name field as well as Business.
- Enquiry kind is stored in Type and Source and embedded in the requirement for compatibility. Shortlist is never leaked into supplier/bulk requests. Identical retries keep their request ID; changed submissions receive a new ID.
- Expanded planner to nine choices including Other with conditional text input. Renamed Your direction to Preferred look. Dimensions optional; no made-up full-room or custom-project estimate.
- Repositioned business copy around whole-interior sourcing and enlarged the sourcing-advantage paragraph.
- Automated local checks passed for catalogue pagination/search, all form variants/validation, shortlist payloads, duplicate IDs, optional timing, planner Other, asset references and receiver safeguards. Browser width checks at 360, 390, 768 and 1440px showed no document overflow; reviewed desktop journey cards and phone collection preview.
- Live end-to-end submission results will be recorded after deployment verification. No customer data is used for tests.

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
- Current status is maintained in [REQUESTS-AND-CHANGELOG.md](REQUESTS-AND-CHANGELOG.md), superseding stale historical receipt/access notes above.
- Receiver access was corrected and confirmed with test rows; Opus feedback has been reviewed in OPUS-REVIEW.md.
- Delivery guarantee terms; supplier asset usage rights; domain and renewal budget; further catalogues; genuine business photos/hours; notification recipient.

### 2026-09-25 QC4
- Direct PDF exporter, standalone brochure studio, private draft handoff, Opus assessment and Ahmedabad market plan added.
- WhatsApp SVG and mobile contact alignment corrected; shortlist IDs/quantities now persist without contact data.
- Full request ledger documents implemented, partial, deferred and owner-dependent work. See SETUP.md for current deployment and Sheet instructions.

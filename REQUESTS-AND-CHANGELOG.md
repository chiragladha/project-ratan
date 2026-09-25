# Ratan — consolidated request ledger, QC and release log

## Google staff access activated — 25 September 2026

- Assistant created and deployed the separate Ratan Staff Studio project, version 2. The public customer receiver was not touched.
- Google execution: User accessing the web app. Google access: Only myself. Private Script Properties contain the workbook target and the single owner-approved staff identity; neither staff email lists nor credentials are committed here.
- Live studio displayed the approved signed-in identity. Private lookup of an existing DO NOT CALL QC enquiry succeeded and loaded all three non-empty requirement lines and the test customer name. No new lead or customer message was created.
- Live testing caught SpreadsheetApp.openById requiring write permission; replaced it with Advanced Sheets v4, preserving identity + spreadsheets.readonly scopes. Code and mock tests updated accordingly.
- Public brochure gateway is configured to the protected deployment. Authenticated lookup is now activated; the earlier setup-pending rows are historical.
- Remaining: populate a reviewed PriceBook, multi-staff onboarding if requested, automated quote sending/revision storage, Gujarati PDF shaping. Signed-out and a separate non-owner account have not been exercised in a live session; Google Only myself access was inspected, and deny-before-read behavior is unit-tested.

## Latest update — staff studio revision (26 September)

This section supersedes older brochure-status rows below.

Verification follow-up (25 September 2026): GitHub Pages run 36078001963 completed successfully. Live Contact → Ask Ratan opens the in-page enquiry dialog. Public staff gateway shows setup pending and exposes no editor or reference input. A five-page PDF was generated using the actual deployed DM Sans / Instrument Serif fonts and every page was rendered and visually checked; portrait swatch proportions, totals and pagination checked. Private Google sign-in, live lookup and PriceBook remain unverified until owner deployment. Quantity/project-size notes and enquiry type are preserved in the imported brief. Standalone comparisons are capped at six added options; complete requirement lists support 100 lines without silent truncation.

| New request | Implementation / activation status |
| --- | --- |
| Password or access protection | Owner chose Google sign-in. Separate Apps Script staff app prepared with allowlist and identity check on every read; public brochure URL becomes a sign-in gateway. **Activation pending** owner deployment, allowlist and /exec URL. Not claimed live-authenticated yet. No password/token embedded in public code. |
| Main-site font match | DM Sans and Instrument Serif packaged from pinned Google Fonts TTFs; used by studio UI and PDF exporter. |
| Preview/PDF discrepancy | Removed the independent HTML brochure preview. Preview PDF displays the actual bytes downloaded after approval; edits invalidate approval. Cover fills/crops its own frame; swatches preserve proportions. |
| Reference-driven items | Staff backend performs exact private lookup; UI imports every non-empty legacy requirement line, prefills recognised quantities/units, retains original brief, preserves manual item/design editing. **Live lookup pending staff deployment.** |
| Prevent missed items | Coverage list and required exclusion reasons; exclusions included in PDF. No silent six-item truncation. Ambiguous legacy quantities remain blank for review. |
| Auto-fetch rates | Optional private PriceBook reader prepared; exact current specification/unit/currency matches only, no manual price overwrite. **Needs owner-populated PriceBook and staff deployment.** |
| Approval/send automation | Exact-preview approval and download implemented. Automatic customer sending, durable quote revisions, recipient validation, retries and audit log **not activated**; scoped in internal/SETUP.md. No email/WhatsApp sending permissions added. |
| Contact query entry | Permanent Ask Ratan icon/button added to Contact while the floating shortcut remains hidden there. Opens the existing callback form. |
| Future-reference documentation | internal/SETUP.md is the authoritative setup/automation checklist; this ledger records pending activation separately from tested source. |

Tests: source-level denial before Sheet reads for missing/non-allowlisted identities; exact reference matching; unknown/duplicate handling; every-line import; explicit exclusions; enquiry regression suite; PDF binary/pagination. Live account-permission testing cannot be completed until the owner deploys the private app. Do not treat mock tests as Google deployment verification.

Updated 25 September 2026. Implementation, publication and business readiness are different states. No private Opus prompt or customer records belong in this public repository.

## Implemented

| Request | Delivered |
| --- | --- |
| Ahmedabad, footer, colours, branding | Ahmedabad copy; centered footer and Built with love from Ladha’s; original paper/green/lime/orange palette. |
| Clear bundle sourcing proposition | Whole-interior sourcing desk; suppliers are not exposed as a lead-bypass directory. Two primary customer routes: materials or room bundle. |
| Expanded sourcing categories | Lights/fans/switches, hardware, boards, paints, wallpaper/digital prints included as sourcing categories, not fictitious stock. |
| Real grouped catalogue | 14 reviewed INSTER SF designs under existing collections; six per page, design codes and source references. Not 100–200 catalogues yet. |
| Broken What brings you cards | Responsive two-card layout with actual swatches. |
| Shorter homepage / submenu | Six disclosure sections, addressable anchors, Explore Ratan submenu and mobile menu. |
| Call / WhatsApp | Direct tel and wa.me links to +91 9825338851, prefilled material enquiry. |
| Logos / arrows / mobile wrapping | Filled WhatsApp SVG; arrow SVGs replace text arrows; contact buttons have non-wrapping flex alignment, readable type and touch targets. |
| Ask Ratan | Required phone + requirement; optional name. |
| Supply with Ratan | Required business, phone, address and what you sell. Short words such as paint pass. |
| Bulk sourcing | Name, phone, materials, quantity, delivery area; business and timing optional. |
| Bundle enquiry | Existing material brief carried forward; only name and phone requested. |
| One Sheet, different schemas | Lead Type plus appropriate details sent to the same Enquiries tab. |
| More planning choices | Expanded choices, conditional Other input, clearer Preferred look label. |
| Why buy text / business copy | Larger advantage text; whole-interior sourcing rather than laminate-only positioning. |
| Remove Typeform | Native form with no Typeform response cap; Apps Script quotas remain. |
| Remove new receipt tab and copy | JSON fetch, matching request-ID confirmation, on-page success dialog only after server save. |
| Friendly unique reference | Material-word reference and unique suffix, generated under lock; retry idempotency. |
| International phone / length | Country picker plus Other, national length checks, international payload; not ownership/OTP verification. |
| Default consent checkbox | Preselected as requested; still required to submit. Covers enquiry contact, not marketing permission. |
| Shortlist persistence | Only material IDs/quantities in local storage, not contact details. |
| Brochure / quote generator | Standalone studio: presets, six alternatives, editable rates/tax/delivery, photos, reference/revision/expiry, private draft import/export. |
| Usable PDF, not print instructions | Direct Download PDF, branded cover/comparison/terms/option pages. English/Latin supported; other scripts produce a clear error. |
| Host brochure on Git | Included in Pages artifact at /brochure/. Separate repository is documented but not created. |
| Opus feedback | OPUS-REVIEW.md evaluates adopted, partial, deferred and disputed suggestions. Raw prompt stays private. |
| Ahmedabad research | AHMEDABAD-GTM.md: cited competitor research, segments, channel plan, economics hypotheses and 30/60/90-day sequence. No advertising purchased. |
| Documentation | This ledger, SETUP.md, PROJECT.md, brochure guide and regression tests. |

## Test evidence

- September24: browser-to-deployed-receiver confirmation and private Sheet rows verified for callback, supplier (paint), bulk and material-list enquiries. Fictional reserved numbers and DO NOT CALL labels; no real customer details used. Rows retained for owner review.
- Local regression passes: schemas, phone limits, optional fields, inline receipt, failed/mismatched responses, idempotent retries, icons, disclosures, persistence, catalogue selection and quote calculations.
- September25: real six-page PDF with three catalogue alternatives generated and every page visually inspected. Long text paginates; unsupported scripts fail explicitly. Example prices are fictitious.
- Deployment acceptance requires loading the actual homepage and /brochure/ after Actions, not just a green commit. Final observations appended after verification.

## Not complete — owners and acceptance criteria

| Item | State and next step |
| --- | --- |
| Real LLM / full sizing | Deferred; guide is deterministic, not a full BOQ. Engineering: complete dimensional model, server-held credentials, reviewed output. |
| Remaining catalogues | Sample14 only. Owner provides files/rights; validate category, code, finish, thickness and source for every import. |
| Live Sheet → quote lookup/writeback | Not implemented. Private export/import helper supplied; owner installs menu. Staff-authenticated backend needed for live leads. |
| Separate brochure repo | Standalone app hosted in subdirectory; no second repo created. |
| Gujarati PDFs | Needs embedded fonts and shaping tests; current direct export is English/Latin. |
| Owner alerts/reminders | Not enabled. Choose notification recipient/channel and escalation rules. |
| Robust bot protection | Honeypot/throttle/validation only; server-verified challenge and durable rate limits needed before paid scale. |
| Genuine business proof | Owner: real photos, hours, written address, authorised brand claims, approved case studies/reviews. No fabricated reviews or stock. |
| Guaranteed fulfilment | Owner defines coverage, exclusions, stock cutoffs, remedy and accountable operator. Current language is qualified. |
| Domain/DNS | Not bought. Owner chooses name and renewal budget; no purchase inferred. |
| SEO pages / Gujarati site | Recommended, not shipped; validate scope and local copy first. |
| Analytics / ads / outreach | Research only; tools, spend and communications not silently activated. |
| Checkout, finance, full marketplace | Later phases after contribution and fulfilment reliability are proven. |

## Honest QC judgment

This can support a managed sourcing business; it is not yet a scalable marketplace. Stand out through one accountable desk converting a mixed list into an accurate, comparable landed quote and confirmed availability. The brochure matters because grade, shade, alternatives and cost become understandable.

Before paid growth: assign every lead an owner and follow-up; approve physical samples; log supplier confirmations/substitutions; collect real delivery proof; track contribution after freight, returns, callbacks and desk time. Measure quote-to-order conversion and repeat purchases. Two-hour quotes and one-to-two-day fulfilment must remain qualified targets until operational guarantees exist. Start with a focused Ahmedabad segment and confirmed categories.

## Release history

- September19: bundle prototype and Sheet collection.
- September24 flow2: collections, separate lead forms, planner and contact options.
- September24 flow3 (b8a4df4): inline receipt, phone picker and compact navigation; live test rows checked.
- September25 QC4: revised WhatsApp vector, mobile contact alignment, persisted shortlist, direct PDF, brochure deployment, Opus/GTM docs and this ledger. Pages404 reproduced; failed job retried; owner confirmed Source=GitHub Actions. Final publication result follows verification.

### Verified publication and final QC — September25

- Commit 2af1f736 deployed successfully in Actions run36047813863. Both homepage and /brochure/ load; the earlier404 is resolved after Pages configuration and the successful rerun/release.
- Download PDF clicked on the live generator: actual PDF downloaded with three selected INSTER images. All six pages rendered and checked; no missing images. Browser preview at390px has no horizontal overflow.
- Main contact section inspected at351px: phone, WhatsApp and Maps actions remain on one line with48px+ targets. Follow-up fix hides the floating Ask Ratan shortcut while contact is visible so it cannot cover these links.
- Guided-room enquiry from September24 confirmed in Sheet with a reference. Fresh QC4 callback submitted on the live site returned an inline receipt; no new tab. Test reference cross-checked against the Sheet.
- Added local-storage privacy explanation, persistent catalogue selector state and PDF binary/pagination tests to Actions. These small follow-up fixes form QC5.

### Browser-tab branding

- Added the lime Ratan monogram as the SVG favicon for both the main website and brochure studio, replacing the browser’s generic globe. Relative asset links work under GitHub Pages and standalone brochure hosting.

# Ratan — consolidated request ledger, QC and release log

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

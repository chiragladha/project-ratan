# Ratan Staff Brochure Studio

The public /brochure/ URL is now a Google staff sign-in gateway. The protected app source is in internal/Code.gs and internal/Studio.html, **not** included as a page in the public Pages artifact. See [the activation guide](../internal/SETUP.md).

## Activation status

Prepared and unit-tested, not yet deployed to Google. Owner must create a SEPARATE Apps Script project, configure the private allowlist/Sheet ID, deploy executing as User accessing the web app, and provide the /exec URL for staff-config.js. Do not replace the public enquiry receiver. No fake client-side password gate is used; source remains public while private reads require server checks.

## Workflow

Load enquiry reference → review every imported request line → complete quantities/units/specifications → suggest exact current PriceBook rates or enter rates manually → Preview PDF → inspect all pages → approve and download the exact previewed PDF. Any edit resets approval. Requested items require an exclusion reason if removed. Full original requirements and exclusions travel into the PDF. Manual items and design choices remain available.

Older leads are free text, not structured BOQs. Recognised name/quantity/unit lines prefill fields; ambiguous quantities stay blank. No materials are invented and no lines are silently truncated. Complete-list mode adds item totals; alternative mode compares options without adding them together. Allocate freight once across items.

## PDF fidelity

The old HTML renderer has been removed. A PDF iframe displays the actual export. Cover images use a centred cover crop and swatches keep their original aspect ratio. Fonts are DM Sans and Instrument Serif, locally served after verified build-time download; licenses are in FONT-LICENSES.md. English/Latin is supported; Gujarati shaping is not yet supported. If a browser cannot display an embedded PDF, use Open full PDF preview.

## Privacy and automation

Customer fields are not stored in URLs, analytics or local storage. Explicit private JSON/PDF downloads contain personal data: never commit them. The optional Sheet export menu remains available but is not needed after live staff lookup is activated. Automatic sending, stored quote approvals/revisions and staff notifications are not implemented; the activation guide specifies required approval, recipient and idempotency controls. There are no sending scopes or credentials in this build.

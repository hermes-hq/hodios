---
schema: 1
id: design-stationery-set
kind: prompt
title: Design a business stationery set
description: Designs a business stationery set - letterhead, continuation sheet, envelopes, compliment slip, email signature and document templates - built for office printers and editable files.
category: graphic-design
version: 1.0.0
status: incubating
stage: [plan, design]
role: [graphic-designer, designer, founder, operations-manager]
requires: [none]
inputs: [text, preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [letterhead, stationery, email-signature, document-template, print-design]
pairs_with:
  prompts: [design-business-card, build-brand-guidelines, build-diy-brand-kit, prepare-print-files]
  personas: [art-director]
args:
  - name: business
    description: The business, its brand assets (logo, colours, fonts), what it sends (letters, quotes, invoices, reports) and how (printed and posted, PDF, email).
    type: text
    required: true
  - name: country
    description: The country the business is registered in, which decides paper sizes, envelope standards and any business details required on letters. Optional; without it the plan states its assumption.
    type: string
output_contract:
  format: markdown
  sections: [Pieces and priorities, Shared system, Letterhead and continuation sheet, Envelopes and slips, Email signature, Document templates, Required business details, Production]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most letterheads today are not printed by a printer at all: they are a word-processor template filled in by staff and printed on an office printer or saved as PDF. Designs fail when they rely on full-bleed colour that office printers cannot reach, place the address where it misses the envelope window, use brand fonts that staff do not have installed so the document falls back to a default, or put the logo so large that the letter has no room to breathe. Email signatures fail when they are a single image (blocked by many mail clients, unreadable by screen readers) or carry five icons and a banner. Some countries require registered company details on business letters and emails, so the footer has a legal job too.
</context>

<task>
Design a stationery set for: {{business}}
{{#country}}Country: {{country}}{{/country}}

If no country is given, state which paper size and envelope standard you assume (A4 and DL, or US Letter and No. 10) and keep the advice valid for both.

1. **Pieces and priorities.** Which pieces this business needs, given what it actually sends, and which to skip. Start from the most used piece.
2. **Shared system.** Logo position and size, colour use, typefaces with free or system fallbacks for editable files, a grid and margins shared by all pieces.
3. **Letterhead and continuation sheet.** Positions of logo, sender details, address block (aligned to the window of the chosen envelope standard), date, reference, body text area, and footer; a continuation sheet with a lighter header. Keep a white margin of at least 5 mm (more is safer) so office printers do not clip.
4. **Envelopes and slips.** Envelope printing (return address placement allowed by the postal service, window position), compliment slip layout and when it is still useful.
5. **Email signature.** Text-based layout with name, role, company, one phone, one web link, an optional small logo with alt text, pronouns if wanted; what to leave out (quotes, multiple banners, legal disclaimers longer than needed); dark-mode and mobile checks.
6. **Document templates.** Quote, invoice and report templates that reuse the system; which styles (headings, body, tables) to define so staff do not format by hand.
7. **Required business details.** What may need to appear on letters, emails and invoices in the stated country (for example registered name, registration number, registered office, tax number), marked as items to confirm with an accountant or the company registry rather than as a definitive list.
8. **Production.** Which pieces to print professionally and which to keep as templates, file formats to deliver (editable template, PDF, print-ready artwork), and a check to print a test letter, fold it into a window envelope and send a test email to several mail clients.
</task>

<constraints>
- Do not invent registration numbers, addresses or legal wording; use placeholders.
- Every editable template must work with fonts the staff actually have; name a fallback for every brand font.
- Keep the system restrained: the content of the letter is the point.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the contract's sections in order. The letterhead as a positions table (Element, Position from top-left in mm, Size, Notes). Required business details as a checklist marked "to confirm". Production as a checklist.
</output_format>

---
schema: 1
id: prepare-comic-print-files
kind: prompt
title: Prepare comic print files
description: Checks a comic for print before files go to the printer, covering page count, trim, bleed and safe area, colour mode, black handling, lettering, cover and spine, proofs and a printer question list.
category: comics
version: 1.0.0
status: incubating
stage: [verify, ship]
role: [artist, writer]
requires: [none]
inputs: [notes, spec]
output: [checklist, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [print-production, prepress, self-publishing, bleed-and-trim, colour-management]
pairs_with:
  prompts: [plan-comic-production-schedule, plan-comic-lettering, make-one-sheet-minicomic]
args:
  - name: book
    description: "The comic: page count including covers, trim size, colour or black and white, binding (saddle stitch, perfect bound, hardcover), and how the art was made (software, resolution, colour mode)."
    type: text
    required: true
  - name: printer_specs
    description: Whatever the printer has told you (template, bleed, safe margin, colour profile, file type, ink limit). Optional; without it the checklist marks those values to confirm.
    type: text
output_contract:
  format: markdown
  sections: [Fit check, Page setup, Colour and blacks, Lettering and line art, Cover and spine, Proofing, Questions for the printer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You prepare comics for print. Most first-print problems are predictable: a page count that is not a multiple of four for saddle-stitched books (or of the printer's signature size), art that does not extend into the bleed so white slivers show at the trim, lettering or important faces too near the trim or lost in the gutter of a perfect-bound book, screen-colour RGB files converted without a proof so colours shift, small black text printed in rich black that blurs with slight misregistration, and large black areas in plain black that print weak and grey. The printer's own template and specifications always win over general rules, so values like bleed width, safe margin, ink limit and colour profile are confirmed with them, not assumed. Spine width depends on page count and paper stock and must come from the printer.

Book: {{book}}
{{#printer_specs}}Printer specs: {{printer_specs}}{{/printer_specs}}
</context>

<task>
1. Fit check: count pages including covers; check the interior page count works for the binding (multiples of four for saddle stitch, or the printer's signature size), and suggest what to add or remove (a title page, back matter, a blank) if it does not.
2. Page setup: trim size, bleed and safe area for every page, with the values from {{printer_specs}} or marked "confirm with printer". Flag spreads that cross the gutter in a perfect-bound book.
3. Colour and blacks: colour mode and profile to confirm, rich black for large solid areas only, plain single-ink black for lettering and fine lines, and total ink coverage to check. For black and white books, greyscale versus pure line art and tone handling.
4. Lettering and line art: resolution for line art versus colour pages, lettering kept in vector or high resolution where the workflow allows, nothing important in the safe margin, and font licences that allow print use.
5. Cover and spine: cover size with bleed, spine width from the printer, barcode or price placement if needed, and spine text only if the spine is wide enough.
6. Proofing: what to check on a digital proof and on a hard proof, and who signs off.
7. Questions for the printer: everything still unknown, in one list ready to send.
</task>

<constraints>
- Never state a printer's bleed, margin, ink limit, profile or spine width as fact unless given; mark it to confirm.
- Do not recommend buying software or services; work with what the creator uses.
- Say plainly if the page count or binding as described cannot work, and give the options.
- Keep the advice to print preparation; do not rewrite the comic.
</constraints>

<output_format>
## Fit check
## Page setup
## Colour and blacks
## Lettering and line art
## Cover and spine
## Proofing
## Questions for the printer
Each section as a checklist, with values or "confirm with printer".
</output_format>

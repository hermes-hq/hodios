---
schema: 1
id: design-folded-brochure
kind: prompt
title: Design a folded brochure
description: Designs a bi-fold, tri-fold or Z-fold brochure with the fold choice, panel widths, the order panels are read in, a layout per panel, type, images and print specs.
category: graphic-design
version: 1.0.0
status: incubating
stage: [plan, design]
role: [graphic-designer, marketer, founder, individual]
requires: [none]
inputs: [text, document]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [brochure, leaflet, fold-layout, print-design, panel-sequence]
pairs_with:
  prompts: [write-brochure-copy, prepare-print-files, write-design-brief, critique-graphic-design]
  personas: [art-director]
args:
  - name: purpose
    description: What the brochure is for and who picks it up, for example "clinic services leaflet for a waiting-room rack" or "course overview mailed to prospective students".
    type: text
    required: true
  - name: content
    description: The copy or a list of the content to include (sections, contact details, images available). Optional; without it the plan uses placeholders.
    type: text
  - name: format
    description: Any fixed format details such as flat size, fold type, paper, quantity, rack size or whether it is mailed. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Purpose and reader, Fold and format, Panel sequence, Panel-by-panel layout, Typography and colour, Images, Print specs, Mock-up check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A folded brochure is read in an order that is not the order of the flat artwork. On a letter-fold (roll-fold) tri-fold the reader sees the front cover, then the inside flap that folds in, then the three inside panels at once; the back panel is often the last thing seen and is where contact details or a mailing area go. Beginners lay the content out left to right on the flat sheet and end up with the cover on the wrong panel or the call to action hidden. Other practical traps: in a roll fold the panel that tucks inside must be about 2 to 3 mm narrower than the others or it buckles; text and faces placed across a fold get cracked or split; heavy paper (roughly above 170 gsm) needs creasing before folding or the coating cracks; rack brochures show only the top third of the cover, so the title must sit there.
</context>

<task>
Design a folded brochure for this purpose: {{purpose}}
{{#content}}

<content>
{{content}}
</content>
{{/content}}
{{#format}}

Fixed format details: {{format}}
{{/format}}

If the purpose does not say who the reader is or how they get the brochure (rack, handout, mail, counter), ask and stop.

1. **Purpose and reader.** The one action the brochure should lead to, the reader's situation when they pick it up, and the three things they must take away.
2. **Fold and format.** Recommend a fold (bi-fold, roll-fold tri-fold, Z-fold, gatefold, or a single flat sheet if the content is short) and a finished size, with the reason. Give flat size and panel widths in millimetres, including the narrower tuck-in panel for roll folds.
3. **Panel sequence.** The order the reader meets each panel, and what each panel's job is (hook, credibility, detail, proof, action). Show the panel positions on the outside and inside of the flat sheet so a designer cannot misplace them.
4. **Panel-by-panel layout.** For each panel: headline, content blocks in reading order, image or graphic, and how the inside spread works as a whole when opened. Keep the call to action and contact details where the reader ends.
5. **Typography and colour.** Typefaces and roles, body size (at least 9 to 10 pt for general readers, larger for older readers), line length, colour use and contrast, consistent with any brand.
6. **Images.** What each image shows, crop, and rules (no faces or key details across folds, enough resolution at print size, licensed or own images only).
7. **Print specs.** Bleed and safe margins from folds and trims, paper weight and finish, creasing if needed, grain direction parallel to the fold, quantity notes, and whether a mailing panel must meet postal rules (to check with the local postal service).
8. **Mock-up check.** A short instruction to print, fold and read a paper mock-up before final artwork, and what to look for.
</task>

<constraints>
- Do not invent services, prices, statistics, testimonials or contact details; use placeholders and list what is missing.
- Never put essential text or faces across a fold line.
- Recommend fewer words over more panels; flag content that would make the brochure crowded and suggest what to move online.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the contract's sections in order. Fold and format includes a panel diagram as a small table (Side, Left, Middle, Right) with each panel's name and width. Panel-by-panel layout as one subsection per panel. Print specs as a checklist.
</output_format>

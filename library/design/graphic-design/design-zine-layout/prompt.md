---
schema: 1
id: design-zine-layout
kind: prompt
title: Design a zine layout
description: Plans a zine's format, page count, page-by-page plan, imposition, layout approach and reproduction method (photocopy, risograph or home printer), with folding, binding and assembly notes.
category: graphic-design
version: 1.0.0
status: incubating
stage: [plan, design]
role: [graphic-designer, artist, writer, individual]
requires: [none]
inputs: [text, preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [zine, self-publishing, risograph, imposition, diy-print]
pairs_with:
  prompts: [make-one-sheet-minicomic, prepare-print-files, pair-typefaces]
  personas: [art-director]
args:
  - name: zine
    description: What the zine is about, the content you have (writing, photos, drawings, collage), the tone, and roughly how many pages you imagine.
    type: text
    required: true
  - name: production
    description: How it will be reproduced and how many copies, for example "50 copies on a library photocopier", "two-colour risograph at a local studio, 200 copies", "home inkjet". Optional.
    type: string
output_contract:
  format: markdown
  sections: [Concept and voice, Format and page count, Page plan, Imposition, Layout approach, Reproduction, Assembly, Distribution notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Zines are cheap, personal and made by hand, and their charm comes from a clear voice, not polish. The practical side is where first zines go wrong: page counts that are not a multiple of 4, pages laid out in reading order and then printed in the wrong order because imposition (the arrangement of pages on the printed sheet) was ignored, photos that turn into grey mud on a photocopier, fine detail lost at the edges because copiers and home printers cannot print to the edge, and risograph files supplied as a single colour image instead of one greyscale layer per ink. Thick stacks of paper also creep: inner pages stick out after folding and lose their outer margins when trimmed.
</context>

<task>
Plan a zine about: {{zine}}
{{#production}}Production: {{production}}{{/production}}

If production is not given, assume black-and-white photocopying and say so.

1. **Concept and voice.** The zine's point in one sentence, the voice, and the visual idea that ties pages together (a repeated element, a palette, a hand-made texture).
2. **Format and page count.** Size (for example an 8-page one-sheet mini zine folded from A4 or US Letter, or a half-size zine stapled through the spine), page count as a multiple of 4 including covers, and why.
3. **Page plan.** A table of every page in reading order with its content and its job (opener, rhythm change, centre spread, closer); use the centre spread for the strongest image because it is printed on one sheet.
4. **Imposition.** Which pages print next to each other on each sheet side for the chosen format, shown as a table, plus the instruction to make a folded paper dummy, number its pages and unfold it to check.
5. **Layout approach.** Margins kept clear of the non-printing edge (often 5 to 10 mm on copiers), a loose grid or none, text sizes that survive copying, hand lettering or type, collage tips, and how to handle photos for the method (higher contrast, simple halftones or bitmaps for photocopy).
6. **Reproduction.** For the stated method: file or master-copy setup, black-and-white contrast, for risograph one greyscale file per ink colour, registration tolerance and overprinting, paper choice and weight, and a test print before the full run.
7. **Assembly.** Folding, the cut for one-sheet zines, saddle stapling (a long-reach stapler), allowing for creep on thicker zines, trimming, and covers on heavier paper.
8. **Distribution notes.** Edition size, price or swap, credits and contact on the back, and a reminder that collaged images, lyrics and photos by others may need permission or should be the maker's own.
</task>

<constraints>
- Do not invent printer studios, prices or tool settings you cannot know; describe what to ask.
- Keep the advice achievable with cheap, common tools.
- Respect other creators' copyright; flag borrowed material.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the contract's sections in order. Page plan as a table (Page, Content, Job). Imposition as a table (Sheet side, Position, Page number). Assembly as a numbered list.
</output_format>

---
schema: 1
id: write-comic-cover-brief
kind: prompt
title: Write a comic cover brief
description: Writes a cover brief for a comic issue or collection, with the selling idea, three concepts, trade dress and logo space, thumbnail-size checks, variant notes and the file specs to confirm.
category: comics
version: 1.0.0
status: incubating
stage: [design]
role: [writer, editor, artist]
requires: [none]
inputs: [text, notes]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [cover-art, art-direction, creative-brief, trade-dress, variant-covers]
pairs_with:
  prompts: [write-comic-solicitation, write-character-model-sheet-brief, prepare-comic-print-files]
  personas: [comics-editor]
args:
  - name: book
    description: The issue or collection, what happens in it, the genre and tone, who the reader is, and the creators.
    type: text
    required: true
  - name: constraints
    description: "What is fixed: series trade dress, logo, size and format, where it will mostly be seen (shop shelf, online store thumbnail, webtoon tile), variants, deadline. Optional."
    type: text
output_contract:
  format: markdown
  sections: [Selling idea, Concepts, Layout and trade dress, Thumbnail check, Variants, Specs to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You art-direct comic covers. A cover sells one idea in a glance, and most people now first see it as a small thumbnail online, so a single strong silhouette or face and clear value contrast matter more than detail. The cover is designed with the logo, issue number, price box or barcode and creator credits in mind from the start; artists who paint into the logo area lose their best work under type. Series covers share trade dress (logo position, a band or colour system) so issues read as a set on the shelf. A cover can show a moment from the issue, a symbolic image, or a character pin-up; for a first issue or new arc, showing who the book is about usually beats a scene. Covers should not promise events that do not happen inside.

Book: {{book}}
{{#constraints}}Constraints: {{constraints}}{{/constraints}}
</context>

<task>
1. Selling idea: in one sentence, the single thing the cover must make a browser feel or understand.
2. Concepts: three different concepts (for example a character moment, a symbolic image, a scene), each with composition, focal point, mood, colour note and what it promises the reader. Mark the one you recommend and why.
3. Layout and trade dress: describe the safe zones for the logo, issue number, credits and barcode or price, and how the recommended concept leaves space for them. Give a simple text layout in a code block.
4. Thumbnail check: what must still read at about stamp size (silhouette, face, value contrast, title), and one test the artist can run (shrink and greyscale the rough).
5. Variants: if variants are planned, a short brief for each that differs from the main cover; otherwise say why one is enough.
6. Specs to confirm: trim and bleed size, resolution, colour mode, file format and deadline, as a list to confirm with the printer or publisher rather than values you assume.
</task>

<constraints>
- Concepts must match what happens in {{book}}; do not promise characters or events that are not in it.
- Do not reference living artists' styles as the brief; describe the qualities wanted instead.
- Do not invent print specs; list them for confirmation.
- Keep each concept describable in a few lines so the artist can thumbnail it.
</constraints>

<output_format>
## Selling idea
## Concepts
A numbered list with the recommended one marked.
## Layout and trade dress
## Thumbnail check
## Variants
## Specs to confirm
A checklist.
</output_format>

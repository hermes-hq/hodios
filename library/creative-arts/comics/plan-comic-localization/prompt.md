---
schema: 1
id: plan-comic-localization
kind: prompt
title: Plan a comic localization
description: Plans translating and re-lettering a comic or manga into another language, covering text expansion, sound effects, honorifics, reading direction, signage in art, a glossary and a QA pass.
category: comics
version: 1.0.0
status: incubating
stage: [plan]
role: [editor, writer, artist]
requires: [none]
inputs: [text, notes]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [comic-translation, manga-localisation, relettering, sound-effects, glossary]
pairs_with:
  prompts: [plan-comic-lettering, convert-print-comic-to-vertical-scroll, prepare-comic-print-files]
args:
  - name: comic
    description: The comic, its source and target languages, page count, reading direction, and what the source files are (layered files with text separate, or flat images).
    type: text
    required: true
  - name: audience
    description: Who the translation is for and any house choices already made (keep honorifics or not, translate sound effects or not, keep the original reading direction or flip). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Scope and files, Key decisions, Text fit, Sound effects and art text, Glossary and style sheet, Workflow and QA, Rights check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You manage comic and manga localization. Translating a comic is a lettering job as much as a language job: balloons are fixed sizes, so a target language that runs longer than the source needs tighter phrasing, and vertical text balloons in manga become awkward shapes for horizontal scripts. Decisions that must be made once and applied everywhere: whether to keep honorifics and cultural terms or adapt them, whether sound effects drawn into the art are replaced, subtitled with a small translation beside them, or left alone, whether to keep right-to-left reading or flip pages (flipping breaks handedness, text in the art and the artist's composition, and many creators object), and how to treat signs, letters and screens drawn in the art. Without flat or layered source files, removing original text means redrawing art under it, which is slow. A glossary of names, places and recurring terms keeps volumes consistent. Rights to translate and publish must be in place before work starts.

Comic: {{comic}}
{{#audience}}Audience and house choices: {{audience}}{{/audience}}
</context>

<task>
1. Scope and files: what will be translated (balloons, captions, sound effects, art text, covers, back matter), and what the source files allow. If only flattened pages exist, estimate which pages need art repair under text.
2. Key decisions: for each of honorifics and cultural terms, sound effects, reading direction, names, and font choice, give the options, the trade-off and a recommendation, respecting any house choices given.
3. Text fit: how to keep translations within balloon space (typical expansion or contraction risk for this language pair stated as a risk, not a number), when to resize a balloon, and a rule for vertical-to-horizontal balloon shapes.
4. Sound effects and art text: a treatment rule with examples, and a list of art text types to track (signs, phones, letters).
5. Glossary and style sheet: the columns to keep, plus entries to seed from the information given.
6. Workflow and QA: translator, editor, letterer, proofreader steps, and a QA checklist (balloon order, missing text, overset text, consistent terms, line breaks and hyphenation in the target language).
7. Rights check: confirm translation and publication rights and the creator's approval of decisions such as flipping or SFX replacement.
</task>

<constraints>
- Do not translate the comic here; this is the plan. Translate sample lines only if asked.
- Do not claim percentages of text expansion as fact; describe the risk.
- Do not proceed as if rights exist; list them as a precondition.
- Respect the creator's art: recommend the least destructive option for sound effects and flipping unless the house choice says otherwise.
</constraints>

<output_format>
## Scope and files
## Key decisions
A table: Decision | Options | Trade-off | Recommendation.
## Text fit
## Sound effects and art text
## Glossary and style sheet
## Workflow and QA
## Rights check
</output_format>

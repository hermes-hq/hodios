---
schema: 1
id: plan-comic-lettering
kind: prompt
title: Plan comic lettering
description: Plans the lettering for a comic, with a style sheet for balloons, captions and sound effects, balloon placement per panel, legible size and font licence checks, and a production checklist.
category: comics
version: 1.0.0
status: incubating
stage: [design]
role: [artist, writer]
requires: [none]
inputs: [text, document]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [lettering, speech-balloons, sound-effects, comic-fonts, style-sheet]
pairs_with:
  prompts: [thumbnail-comic-page, review-comic-script, convert-print-comic-to-vertical-scroll]
  personas: [comics-editor]
args:
  - name: pages
    description: The script or the dialogue for the pages to letter, with panel numbers, plus a short description of each panel's composition if the art exists.
    type: text
    required: true
  - name: medium
    description: Where it will be read.
    type: enum
    enum: [print, digital-page, vertical-scroll]
    default: print
  - name: setup
    description: Your lettering software, the trim size or canvas width, the reading direction, and any fonts you already own. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Style sheet, Balloon placement, Sound effects, Production setup, Checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a comic letterer. You know that lettering is part of the storytelling: balloons are placed in reading order so the first speaker sits highest and leftmost (rightmost for right-to-left comics), tails point toward the speaker's mouth and stay short, balloons avoid faces, hands and key action, and text never runs into the gutter or the trim. A consistent style sheet makes a book feel professional: one dialogue font, a set of balloon shapes for whispers, shouts, thoughts, radio and off-panel speech, caption boxes coded for each narrator, and emphasis in bold italic rather than random capitals. Lettering stays on its own layer so it can be corrected or translated. Fonts need a licence that covers commercial comics and, for digital, embedding.

Pages:
{{pages}}
Medium: {{medium}}
{{#setup}}Setup: {{setup}}{{/setup}}
</context>

<task>
1. Style sheet: the dialogue font approach (a dedicated comic lettering font, mixed or all caps, and if all caps, the convention of the crossbar I only for the pronoun "I" and initials), emphasis rule, and the shape, border and tail for each balloon type the pages need: normal, whisper, shout, thought or internal caption, electronic or radio, off-panel, and caption boxes per narrator, place and time.
2. Size: give a starting point for text size suited to {{medium}} and tell the letterer to test it (print a page at 100 percent, or view it on a phone for vertical scroll) before lettering the rest. For vertical scroll, keep each panel's text readable within one phone screen.
3. Balloon placement: for every panel, the balloon order, where each balloon sits relative to the composition, where tails point, and any balloon that should break the panel border or link across panels. Flag panels with too much text for the art and suggest a split or trim.
4. Sound effects: which sounds get hand-drawn or display-style SFX, which are left out, and how each should integrate with the art (size, angle, overlapping figures or behind them).
5. Production setup: layers, live area and safe margins away from the trim and the spine gutter, file naming, and how to keep text editable for translation.
6. Checklist: a final pass for spelling, balloon order, tails, widows, consistent styles and text inside the safe area.
</task>

<constraints>
- Only suggest fonts the creator owns or can license; never suggest unlicensed copies, and tell them to check the licence covers commercial print and digital embedding.
- Do not change the dialogue. If a line is too long for its panel, flag it and offer a trim for the writer to approve.
- Mirror every order and placement rule for right-to-left reading.
- Give sizes as starting points to test, not universal rules.
</constraints>

<output_format>
## Style sheet
A table: Element | Font and case | Shape and border | Tail | When to use.
## Balloon placement
A table: Page | Panel | Order | Placement | Tail | Notes.
## Sound effects
## Production setup
## Checklist
</output_format>

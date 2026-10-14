---
schema: 1
id: design-colourwork-chart
kind: prompt
title: Design a stranded colourwork chart
description: Designs a stranded colourwork motif for a knitted yoke, hat or band that fits the stitch count, keeps floats short, balances contrast and gives a chart with repeat maths.
category: crafts
version: 1.0.0
status: incubating
stage: [design]
role: [individual]
requires: [none]
inputs: [text, preferences]
output: [plan, table, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [knitting, stranded-colourwork, fair-isle, float-length, motif-repeat, fibre-crafts]
pairs_with:
  prompts: [plan-knitting-project, resize-knitting-pattern]
args:
  - name: placement
    description: Where the colourwork goes and its stitch count, for example "hat band, 112 stitches, 20 rounds" or "yoke, 288 stitches at the start with decreases to 96".
    type: text
    required: true
  - name: theme
    description: The look you want, for example "snowflakes", "simple geometric", "birds". Optional.
    type: string
  - name: colours
    description: Your yarn colours with a note on light or dark, for example "cream, navy, mustard". Optional; two colours if omitted.
    type: string
output_contract:
  format: markdown
  sections: [Repeat maths, Chart, Float and contrast check, Knitting notes, Swatch first]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a knitwear designer who specialises in stranded colourwork. The repeat width must divide the stitch count evenly, or the knitter must adjust the count with a few increases or decreases in a plain round before the chart. Floats, the unused yarn carried behind, should rarely span more than five to seven stitches, or they snag and pucker unless caught (trapped) every few stitches. Traditionally only two colours are used per round. Contrast in value (light against dark) matters more than hue: designs that look bold in colour can vanish in greyscale. Stranded fabric has a tighter gauge than plain stockinette, so a swatch in pattern is essential. On a yoke, motifs must fit between decrease rounds and shrink with them.

Placement: {{placement}}
{{#theme}}Theme: {{theme}}{{/theme}}
{{#colours}}Colours: {{colours}}{{/colours}}
</context>

<task>
1. Repeat maths: choose a repeat width that divides the stitch count, list the factors you considered, and if none suit the motif, give the adjustment (for example, increase 4 evenly in the round before) and where. For yokes, place each band between decrease rounds and show the stitch count at each band.
2. Design the motif and draw the chart as a monospaced grid using two symbols per round (for example, "." for background and "X" for contrast), numbered from the bottom right as knitters read charts, with the repeat boxed or marked.
3. Float and contrast check: list every round's longest float; for any over seven stitches, change the motif or say where to trap the float. Note which colour is dominant (held so it shows more) and check value contrast by describing how it would read in greyscale.
4. Knitting notes: which colour sits in which round, colour changes between rounds, how to carry yarn for two-handed or one-handed stranding, and jog-less join tips for horizontal stripes.
5. Swatch first: a swatch in the round (or a speed swatch) in pattern, measuring gauge, and adjusting needle size if the colourwork pulls in.
6. Before answering, count each chart row to confirm it has the repeat width and that the repeat divides the stitch count.
</task>

<constraints>
- Keep to two colours per round unless the knitter asks otherwise, and say so if a request needs three.
- Do not copy a named designer's published motif; create an original one.
- If the stitch count makes an even repeat impossible without large changes, say so plainly.
</constraints>

<output_format>
## Repeat maths
## Chart
Code block, rows numbered, repeat marked.
## Float and contrast check
Table: Round | Colours | Longest float | Action.
## Knitting notes
## Swatch first
</output_format>

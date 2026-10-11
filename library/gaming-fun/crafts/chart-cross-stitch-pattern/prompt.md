---
schema: 1
id: chart-cross-stitch-pattern
kind: prompt
title: Chart a cross-stitch pattern
description: Turns a design idea, motif or simple image into a counted cross-stitch chart plan with fabric count, finished size, a limited thread palette with stitch counts, backstitch and a stitching order.
category: crafts
version: 1.0.0
status: incubating
stage: [design, plan]
role: [individual]
requires: [none]
inputs: [text, image, preferences]
output: [plan, table, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [cross-stitch, counted-thread, aida, stitch-chart, needlework, thread-palette]
pairs_with:
  prompts: [plan-embroidery-piece]
args:
  - name: design
    description: What you want to stitch, for example "a 30 by 30 stitch strawberry", "my cat from this photo", or "a house name in a simple alphabet with a floral border".
    type: text
    required: true
  - name: size
    description: The finished size you want, or the fabric and count you have, for example "fits a 15 cm hoop" or "14-count Aida".
    type: string
    default: "14-count Aida, about 15 cm across"
  - name: colours
    description: The colour limit or theme, for example "max 8 colours, pastel". Optional.
    type: string
output_contract:
  format: markdown
  sections: [Size maths, Palette, Chart, Stitching order, Finishing, Limits of this chart]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a cross-stitch designer. Size is the first decision: finished width in cm equals stitches across divided by the fabric count per inch, times 2.54, plus a margin of at least 5 to 8 cm on each side for framing. Good charts use few colours with clear contrast, because photo conversions with dozens of near-identical shades become unstitchable confetti of single stitches; designers simplify shapes and add backstitch outlines to define edges. Thread is usually stranded cotton, two strands on 14-count, one on 18-count or higher. Thread brands use their own numbering, and conversions between brands are approximate.

Design: {{design}}
Size or fabric: {{size}}
{{#colours}}Colours: {{colours}}{{/colours}}
</context>

<task>
1. Size maths: pick a stitch grid (width by height) and show the finished size on the chosen fabric count and on one alternative count, plus the fabric piece to cut with margins.
2. Simplify the design: describe how the motif is reduced to blocks of colour at this grid size and what detail is dropped or moved to backstitch. For a photo, say which features must survive (for a pet: eye shape, markings) and suggest cropping.
3. Palette: a limited set of colours, each with a symbol, a plain colour description, and an approximate stitch count. Name thread codes only as "suggested, check against a physical colour card", and never claim exact brand matches.
4. Chart: for designs up to about 40 by 40 stitches, give the chart as a monospaced text grid of symbols, with row and column numbers every 10 and a centre mark. For larger designs, give the chart section by section or a precise description and suggest charting software to finish it.
5. Stitching order: start at the centre, colour by colour or parking method, consistent top-stitch direction, full stitches before backstitch, and how to avoid carrying thread across gaps longer than a few stitches.
6. Finishing: washing and pressing face down on a towel, and framing or hoop finishing.
7. Thread estimate: rough skeins per colour from stitch counts, stated as an estimate with a spare.
8. Before answering, count each row of the text chart to confirm it has the stated width.
</task>

<constraints>
- Do not reproduce copyrighted characters, logos or commercial charts; offer an original design in a similar spirit or suggest buying the licensed chart.
- Keep the palette small enough to stitch; if the person asks for a photo-real result, explain the trade-off honestly.
- Do not present thread codes as exact colour matches.
- Say clearly that a text chart can contain mistakes and that the person should stitch a small section first and adjust.
</constraints>

<output_format>
## Size maths
## Palette
Table: Symbol | Colour | Suggested thread | Stitches | Skeins.
## Chart
A code block with the grid, or numbered sections for larger designs.
## Stitching order
## Finishing
## Limits of this chart
</output_format>

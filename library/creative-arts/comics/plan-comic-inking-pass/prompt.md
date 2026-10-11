---
schema: 1
id: plan-comic-inking-pass
kind: prompt
title: Plan a comic inking pass
description: Plans how to ink a comic page or chapter, with a line weight hierarchy, where to spot blacks, texture and hatching rules, depth separation and a consistency sheet for the whole book.
category: comics
version: 1.0.0
status: incubating
stage: [design, build]
role: [artist]
requires: [none]
inputs: [text, image, notes]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [inking, line-weight, spotting-blacks, hatching, inking-style]
pairs_with:
  prompts: [thumbnail-comic-page, plan-comic-colour-script, critique-comic-page]
args:
  - name: page
    description: The pencilled page (image) or a panel-by-panel description of what is on it, including the mood and light of each scene.
    type: text
    required: true
  - name: style_and_tools
    description: The look you want, whether the book will be coloured or stay black and white, and your tools (brush, pens, digital brushes). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Page read, Line weight hierarchy, Spotting blacks, Texture and rendering, Panel notes, Consistency sheet]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a comic inker. Inking is not tracing pencils: it decides what the reader sees first. Line weight builds depth and clarity: heavier outer contours and lines on the shadow side, thinner interior and distant lines, so foreground separates from background without colour. Spotting blacks (placing solid black areas) creates mood, leads the eye and holds the page together; a page with blacks spread evenly reads as grey and flat, while a planned pattern of blacks across the page gives it shape. Black and white books depend on this far more than coloured books, where heavy blacks and hatching can fight the colourist. Texture and hatching should follow form and be consistent for each material. Light direction must stay consistent within a scene. The most common inking faults are uniform line weight, overworked hatching that muddies faces, and tangents where lines from different depths touch.

Page: {{page}}
{{#style_and_tools}}Style and tools: {{style_and_tools}}{{/style_and_tools}}
</context>

<task>
1. Page read: the focal point of the page and of each panel, the light source per scene, and whether the page reads as one design.
2. Line weight hierarchy: three or four weights (for example foreground contour, interior detail, background, effects) and where each applies, adjusted to the tools given.
3. Spotting blacks: where solid blacks go across the page and why (mood, eye path, separating figures), with a simple text map in a code block showing the dark shapes per panel. Adjust for colour or black and white.
4. Texture and rendering: rules per material (skin, hair, cloth, metal, foliage, sky), hatching direction following form, and where to leave white space for faces and balloons.
5. Panel notes: per panel, the specific inking decisions and any tangent or depth problem to fix while inking.
6. Consistency sheet: the rules to keep across the whole book so pages match.
</task>

<constraints>
- If working from an image you cannot see clearly or a vague description, state your assumptions.
- Do not change the composition or drawing; suggest pencil fixes separately and briefly.
- Keep balloon areas and faces clear of heavy rendering.
- Match advice to the tools given; do not recommend buying new ones.
</constraints>

<output_format>
## Page read
## Line weight hierarchy
## Spotting blacks
## Texture and rendering
## Panel notes
## Consistency sheet
A checklist.
</output_format>

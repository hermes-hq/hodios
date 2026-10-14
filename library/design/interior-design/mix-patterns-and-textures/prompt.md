---
schema: 1
id: mix-patterns-and-textures
kind: prompt
title: Mix patterns and textures in a room
description: Plans how to combine patterns and textures in a room's textiles, wallpaper and surfaces, using scale, colour links and a texture mix so the room feels layered rather than busy or flat.
category: interior-design
version: 1.0.0
status: incubating
stage: [design]
role: [individual]
requires: [none]
inputs: [text, preferences, image]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [patterns, textures, soft-furnishings, textiles, styling]
pairs_with:
  prompts: [identify-interior-style, choose-window-treatments]
args:
  - name: room
    description: The room and its main fixed surfaces and colours (walls, floor, sofa, bed, curtains, rug), with any patterns already there.
    type: text
    required: true
  - name: pieces
    description: Patterned or textured items you have or are considering (cushions, throw, rug, wallpaper, curtains, bedding), with colours, pattern type and scale if you know. Optional.
    type: text
  - name: feel
    description: How busy or calm you want it, and colours or patterns you love or hate. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What you have, Pattern plan, Texture plan, Where each goes, Test before buying]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a textile designer and stylist. Pattern mixing works when patterns vary in scale (one large, one medium, one small), share at least one colour, and differ in type (a floral with a stripe with a geometric or a plain weave), and when there is enough plain surface around them to rest the eye. Rooms that feel flat usually lack texture, not colour: everything is smooth cotton and painted plaster. You balance pattern and texture across the room, distribute them so no corner carries all the interest, and keep the number of colours in the patterns controlled.

Room: {{room}}
{{#pieces}}Pieces: {{pieces}}{{/pieces}}
{{#feel}}Feel: {{feel}}{{/feel}}
</context>

<task>
1. Describe what the room has now: dominant colours, existing patterns with their scale and type, and the textures present (smooth, matt, nubbly, shiny, soft, rough).
2. Build a pattern plan: one lead pattern (usually the largest scale, on the biggest piece such as curtains, wallpaper or a rug), a supporting pattern at a different scale and type, and a small-scale or textural pattern, all linked by at least one shared colour. Say which colours each pattern may contain.
3. Build a texture plan that varies at least three textures (for example linen, boucle or wool, wood grain, rattan, velvet, ceramic, metal) and says where each goes.
4. Place everything around the room so pattern appears in at least two or three places, solids sit next to patterns, and the eye travels rather than stopping in one corner. Use a ratio as a guide, labelled as a guide (for example about 60 percent plain, 30 percent secondary, 10 percent accent).
5. If the person's pieces are given, say which work together, which clash and why, and what to swap.
6. Give a test before buying: swatches together in the room's light, photographed in black and white to check scale and contrast, and viewed from across the room.
</task>

<constraints>
- Work from the colours and pieces given; do not invent items they own.
- No brand names or prices; describe patterns by type, scale and colours.
- For homes with babies, keep loose throws and cushions out of cots and cribs; for pets, note which textures snag or hold hair.
- Respect the feel asked for: a calm room may have one pattern only, carried by texture.
</constraints>

<output_format>
## What you have
## Pattern plan
Table: Role | Pattern type | Scale | Colours | Where.
## Texture plan
Table: Texture | Material | Where.
## Where each goes
## Test before buying
Short checklist.
</output_format>

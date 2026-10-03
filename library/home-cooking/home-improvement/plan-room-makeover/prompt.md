---
schema: 1
id: plan-room-makeover
kind: prompt
title: Plan a room makeover
description: Plans a room makeover with a style direction, colour palette, layered lighting, key pieces, a prioritised shopping list and a budget split. Use before buying anything for a room refresh.
category: home-improvement
version: 1.0.0
status: incubating
stage: [design, plan]
role: [individual]
requires: [none]
inputs: [preferences, image]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [interior-design, decorating, colour-palette, lighting, mood-board]
pairs_with:
  prompts: [plan-room-layout, plan-decluttering, plan-diy-project]
  personas: [interior-designer]
args:
  - name: room_and_constraints
    description: The room, its size, windows and which way they face, what is staying, how it is used and by whom, and limits such as renting, children, pets or deadlines. Photos help if your assistant accepts them.
    type: text
    required: true
  - name: style_likes
    description: Rooms, images, places or objects you love and hate, and any style words you use. Optional.
    type: text
  - name: budget
    description: Total budget with currency. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Brief, Style direction, Palette, Lighting plan, Key pieces, Shopping list, Budget split, Order of work]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an interior designer preparing a makeover plan a homeowner or renter can carry out themselves. A makeover works when every purchase serves one clear direction and the money goes where it changes the room most. It fails when people buy accessories first, pick paint from a tiny chip, and light the room with one ceiling bulb.

Room and constraints:
<room>
{{room_and_constraints}}
</room>
{{#style_likes}}Likes and dislikes: {{style_likes}}{{/style_likes}}
{{#budget}}Budget: {{budget}}{{/budget}}
</context>

<task>
1. Write a short brief: how the room must work, what stays, the problems to solve (dark, cluttered, cold, no focal point), and the constraints.
2. Set a style direction in plain words: a name, three to five attributes (for example "warm, layered, natural textures, a little vintage, calm"), and two or three reference ideas the user can search for. Base it on their likes, not a trend; if no likes are given, offer two contrasting directions and recommend one.
3. Build a palette with roles: a dominant colour, a secondary, an accent, and a wood or metal finish, each described by colour family and undertone, with how to test paint (large swatches on two walls, viewed morning and evening) and how the window orientation affects it.
4. Plan lighting in layers: ambient, task and accent, with positions, warm colour temperature (about 2700–3000 K for living spaces) and renter-friendly options if needed.
5. Choose the key pieces that carry the look (often the sofa or bed, the rug, the curtains, one statement light or piece of art), with sizes to look for and what to keep.
6. Write a shopping list prioritised Must, Should and Could, each with a typical price range to verify and where cheap is fine or second-hand works.
7. Split the budget in percentages and amounts, keeping about 10% contingency; if the budget is tight, show what to do now and later.
8. Give the order of work: declutter, repairs, paint, lighting, large pieces, textiles, then accessories.
</task>

<constraints>
- Do not invent specific products, brands or exact prices. Give typical ranges to verify locally and describe what to look for.
- For renters, keep changes reversible and remind them to get written permission before painting or drilling.
- Anything electrical beyond plug-in lights or replacing a bulb goes to a qualified electrician.
- Anchor tall furniture to the wall where children live, and keep clear walkways of about 90 cm (36 in).
- If the room size or how it is used is missing, state your assumption, or ask in one short list if the plan would change completely.
</constraints>

<output_format>
## Brief
Bullets.

## Style direction
Name, attributes and references.

## Palette
Table: Role | Colour family and undertone | Where it goes | Test note.

## Lighting plan
Table: Layer | Fixture type | Position | Colour temperature.

## Key pieces
Bullets with sizes and what to look for.

## Shopping list
Table: Priority | Item | Typical range | Notes.

## Budget split
Table: Category | % | Amount.

## Order of work
Numbered steps.
</output_format>

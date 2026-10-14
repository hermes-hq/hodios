---
schema: 1
id: plan-cookie-baking-day
kind: prompt
title: Plan a cookie baking day
description: Plans baking several kinds of cookies in one session for holidays, gifts or a swap, with a make-ahead dough plan, an oven and tray rotation, cooling and storage by texture, and a shopping list.
category: baking
version: 1.0.0
status: incubating
stage: [plan]
role: [home-cook, parent]
requires: [none]
inputs: [preferences, text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [holiday-baking, cookie-swap, edible-gifts, make-ahead, batch-baking]
pairs_with:
  prompts: [plan-royal-icing-cookies, pack-baked-goods-for-shipping, tune-cookie-texture]
  personas: [baking-instructor]
args:
  - name: cookies
    description: The cookies you want to make (or the occasion if you want suggestions), how many of each or in total, and any recipes you already use.
    type: text
    required: true
  - name: setup
    description: Number of ovens and trays, freezer space, how many helpers (and their ages), the day you bake and when gifts or the swap happen.
    type: text
    required: true
  - name: dietary
    description: Allergies or dietary needs among the people receiving them. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Lineup, Make-ahead plan, Bake-day schedule, Cooling and storage, Gifting, Shopping list]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a baker who runs big holiday cookie days. You know the bottleneck is rarely mixing: it is oven space, trays and cooling racks. Experienced bakers make doughs ahead (many cookie doughs keep a few days in the fridge or weeks frozen, and some improve with rest), portion dough into balls or logs before freezing, bake one tray at a time in the middle of the oven for even results unless the oven handles two trays well, cool trays before reusing them so the next batch does not spread, and store crisp and soft cookies apart because crisp cookies go soft when stored with soft ones. Decorated cookies need hours to dry before stacking, and some cookies keep far longer than others, which decides the baking order.

Cookies: {{cookies}}
Setup: {{setup}}
{{#dietary}}Dietary needs: {{dietary}}{{/dietary}}
</context>

<task>
1. Lineup: each cookie with its batch count, total pieces, keeping time and texture (crisp, chewy, soft, decorated). If the baker asked for suggestions, choose a balanced mix of textures and effort levels and fit any dietary needs.
2. Make-ahead plan: which doughs to make one to three days before or freeze earlier, how to portion and wrap them, and which cookies to bake first because they keep longest.
3. Bake-day schedule: clock times for each batch, oven temperature changes grouped to avoid waiting for the oven, trays in rotation with cooling time, and jobs for helpers matched to their ages.
4. Cooling and storage: how long each cookie cools, which go in separate airtight tins, and when decorated cookies can be stacked.
5. Gifting: how to pack mixed boxes so flavours and textures do not spoil each other, labels with the cookie names and main allergens, and the date to give them by.
6. Shopping list: totals for butter, flour, sugars, eggs and the rest, rounded to how they are sold, plus parchment and containers.
</task>

<constraints>
- Keep allergen-free cookies separate in preparation and storage, and label everything; if anyone has a severe allergy, say that a shared kitchen cannot guarantee it is free of traces.
- Base the schedule on the actual ovens and trays given.
- Use grams and the baker's units side by side when giving quantities.
- Do not have young children handle hot trays or ovens.
</constraints>

<output_format>
## Lineup
A table: Cookie | Batches | Pieces | Keeps for | Texture.
## Make-ahead plan
## Bake-day schedule
A table: Time | Oven and temperature | Tray | Task | Who.
## Cooling and storage
## Gifting
## Shopping list
</output_format>

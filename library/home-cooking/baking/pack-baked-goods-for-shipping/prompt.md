---
schema: 1
id: pack-baked-goods-for-shipping
kind: prompt
title: Pack baked goods for shipping
description: Plans sending homemade baked goods by post, choosing bakes that travel, adjusting them, packing to prevent breakage and staleness, timing the send, and listing food rules to check for the destination.
category: baking
version: 1.0.0
status: incubating
stage: [plan]
role: [home-cook]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [mailing-food, care-package, edible-gifts, food-packaging, shelf-life]
pairs_with:
  prompts: [plan-cookie-baking-day, tune-cookie-texture]
  personas: [baking-instructor]
args:
  - name: bakes
    description: What you want to send, or the occasion if you want suggestions, and how many people it is for.
    type: text
    required: true
  - name: route
    description: From where to where (same country or abroad), the shipping service and speed if known, and the weather along the way.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [What travels, Recipe adjustments, Packing, Timing, Rules to check, Note for the recipient]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a home baker who has sent care packages around the world. Sturdy, low-moisture bakes travel best: shortbread, biscotti, sturdy drop cookies, brownies and blondies, many bar cookies, and dense loaf cakes. Delicate, creamy or very moist bakes do not: cream, custard and cream-cheese fillings and frostings, meringues, thin crisp tuiles, and anything that needs refrigeration. Bakes survive when they are fully cooled before wrapping (warm bakes steam and go soggy or mouldy), wrapped in small airtight groups, packed tightly in a rigid tin or box so nothing moves, cushioned on all sides, and sent early in the week so they do not sit in a depot over a weekend. International parcels can be refused or destroyed at customs: many countries restrict foods containing meat, dairy or eggs, or require declarations, and rules change.

Bakes: {{bakes}}
Route: {{route}}
</context>

<task>
1. What travels: rate each requested bake as good, risky or not suitable for this route, with the reason. Suggest swaps for the unsuitable ones that keep the spirit of the gift.
2. Recipe adjustments: small changes that help bakes travel, such as baking cookies a little longer for a firmer texture, choosing bars over frosted cakes, leaving loaf cakes unglazed, and avoiding chocolate coatings in hot weather.
3. Packing: step by step: cool completely, wrap in pairs or small stacks, fill gaps, use a tin or rigid box inside a larger box with cushioning on all sides, keep strong flavours apart, and put nothing moist in the box to "keep things fresh"; airtight wrapping does that job.
4. Timing: when to bake relative to sending, which day of the week to send, the fastest service worth paying for given the bakes' keeping time, and what heat or cold along the route changes.
5. Rules to check: for international or long-distance parcels, the questions to check with the shipping service and the destination's customs or food import authority (allowed ingredients, declarations, labelling). Do not state a country's rules as fact.
6. Note for the recipient: a short card text listing what is inside, main allergens, the date baked and how long each item keeps.
</task>

<constraints>
- Never suggest sending bakes that need refrigeration through ordinary post.
- Do not state customs or postal rules as fact; tell the sender to check the current rules for the destination and service.
- Always list allergens in the recipient note.
- Keep the advice about food safety cautious: if the parcel is delayed far beyond the keeping time, the recipient should not eat moist items.
</constraints>

<output_format>
## What travels
A table: Bake | Rating | Why | Swap.
## Recipe adjustments
## Packing
Numbered steps.
## Timing
## Rules to check
## Note for the recipient
</output_format>

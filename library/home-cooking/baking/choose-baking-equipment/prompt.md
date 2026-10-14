---
schema: 1
id: choose-baking-equipment
kind: prompt
title: Choose baking equipment
description: Builds a baking kit list for what you bake, your space and budget, ranking what to buy first, what to skip, and the specs that matter for scales, thermometers, tins and mixers.
category: baking
version: 1.0.0
status: incubating
stage: [plan]
role: [home-cook]
requires: [none]
inputs: [preferences, text]
output: [table, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [baking-tools, kitchen-equipment, stand-mixer, kitchen-scale, buying-guide]
pairs_with:
  prompts: [calibrate-home-oven, convert-baking-recipe-to-grams]
  personas: [baking-instructor]
args:
  - name: baking
    description: What you bake or want to bake (bread, sourdough, cakes, cookies, pastry, decorated cakes), how often, and for how many.
    type: text
    required: true
  - name: constraints
    description: Budget with currency, kitchen and storage space, what you already own, and any limits (small oven, no counter for a mixer). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Buy first, Buy next, Skip or wait, What specs matter, Already own]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a baking teacher who has watched students waste money on gadgets. What matters: a digital scale that reads in 1 g steps (and ideally 0.1 g for yeast and salt in small batches) improves baking more than anything else; an oven thermometer and an instant-read probe thermometer come next, because ovens are often off and doneness by temperature is reliable; good, light-coloured, heavy-gauge tins in the sizes recipes use matter more than specialist pans; a bench scraper, a flexible spatula, a whisk, a rolling pin, cooling racks, baking paper and a couple of bowls cover most work; a stand mixer earns its place for enriched doughs, meringue buttercreams and big batches, but not for occasional cakes, where a hand mixer will do; bread bakers benefit from a lidded heavy pot or a baking stone or steel and a proofing basket; and many single-use gadgets duplicate tools they already have. Brands are not needed to choose well.

Baking: {{baking}}
{{#constraints}}Constraints: {{constraints}}{{/constraints}}
</context>

<task>
1. Buy first: the five to eight items that make the biggest difference for what they bake, with the reason for each.
2. Buy next: items to add once they are baking regularly, tied to specific bakes they mentioned.
3. Skip or wait: popular items they do not need yet, and cheap substitutes (a bowl and tea towel instead of a proofing basket at first, a heavy oven tray instead of a steel).
4. What specs matter: for each key item, what to look for in plain terms (scale range and resolution and tare; probe thermometer speed and range; tin material, colour and depth, loose bottom or springform; mixer bowl size and power for stiff doughs; pot size and oven-safe lid knob temperature).
5. Already own: if they listed what they own, say what is fine as it is and what to replace.
Fit the total to their budget when given, as relative priorities rather than prices.
</task>

<constraints>
- No brand or model names, and no prices stated as current fact.
- Keep the first-buy list short; resist recommending gadgets.
- Mention safety where it matters (oven-safe ratings on pot lids and handles, non-stick at very high heat).
</constraints>

<output_format>
## Buy first
Table: Item | Why for you | What to look for.
## Buy next
## Skip or wait
## What specs matter
## Already own
Only if they listed items.
</output_format>

---
schema: 1
id: plan-choux-pastry
kind: prompt
title: Plan choux pastry
description: Plans choux pastry for éclairs, profiteroles or cream puffs, with a recipe in grams, panade and egg-addition cues, piping, a bake that does not collapse, safe fillings and a timeline.
category: baking
version: 1.0.0
status: incubating
stage: [plan]
role: [home-cook]
requires: [none]
inputs: [preferences, text]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [choux-pastry, eclairs, profiteroles, pastry-cream, patisserie]
pairs_with:
  prompts: [calibrate-home-oven, plan-croissant-lamination, plan-macaron-bake]
  personas: [baking-instructor]
args:
  - name: goal
    description: What you want to make (éclairs, profiteroles, cream puffs, gougères, a croquembouche), how many, the fillings and toppings, and when they will be served.
    type: string
    required: true
  - name: last_attempt
    description: What happened last time, if you have tried before, for example "they puffed then collapsed", "hollow but soggy". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Plan, Recipe, Method and cues, Baking, Fillings and finishing, Troubleshooting, Timeline]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a pastry chef who teaches choux. Choux rises on steam, not on leavening, so three things decide the result. First, the panade (water or milk, butter, salt, sugar and flour cooked together) has to be cooked and dried until it forms a ball and leaves a thin film on the pan, so it can absorb eggs. Second, eggs are added gradually and the amount varies with how much the panade dried, so the recipe's egg weight is a maximum and the cue is the texture: the paste falls from the spatula slowly and leaves a V-shaped ribbon. Third, the shells must bake until deep golden and dry enough to hold their shape, without the oven door being opened early; underbaked shells look fine in the oven and collapse as they cool. Venting or piercing the shells and drying them briefly helps them stay crisp. Pastry cream and cream fillings are perishable: they must be cooked properly (pastry cream boiled to thicken fully), cooled quickly, kept cold, and filled close to serving.

Goal: {{goal}}
{{#last_attempt}}Last attempt: {{last_attempt}}{{/last_attempt}}
</context>

<task>
1. Plan: what you will make, the piping sizes and count, the fillings and toppings, and one simpler option if the goal is ambitious (for example profiteroles instead of a croquembouche for a first try).
2. Recipe: choux paste in grams scaled to the count, with the egg weight given as a maximum; fillings and toppings in grams.
3. Method and cues: cooking and drying the panade with the film cue, cooling it briefly, adding beaten egg in portions, the V-ribbon test, and piping technique (size, angle, smoothing tips with a wet finger, optional craquelin on top for even rise).
4. Baking: temperature range with a hot start and lower finish, no door opening in the first part of the bake, the colour and feel cues for done, venting and drying, and cooling on a rack.
5. Fillings and finishing: pastry cream method with full boiling, quick cooling and storage, or whipped cream or ganache; filling technique; glazing éclairs or chocolate sauce for profiteroles.
6. Troubleshooting: causes and fixes for collapse, flat spread shells, cracks and uneven shapes, soggy shells and hollow-less shells. If a last attempt is described, start with that.
7. Timeline: what can be made ahead (baked shells freeze well and re-crisp in the oven; pastry cream keeps a short time chilled) and the order on the day.
</task>

<constraints>
- Cream fillings must stay refrigerated and should not sit out more than about two hours (less in hot weather); filled choux are best eaten the same day.
- Present temperatures and times as ranges with cues, adjusted for fan or conventional ovens.
- Do not suggest raw-egg fillings unless pasteurised eggs are used.
- Keep the egg amount driven by texture, not by a fixed count.
</constraints>

<output_format>
## Plan
## Recipe
## Method and cues
Numbered steps with a cue for each.
## Baking
## Fillings and finishing
## Troubleshooting
A table: Problem | Likely cause | Fix.
## Timeline
</output_format>

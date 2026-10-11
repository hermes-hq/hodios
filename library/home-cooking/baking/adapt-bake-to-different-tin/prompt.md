---
schema: 1
id: adapt-bake-to-different-tin
kind: prompt
title: Adapt a bake to a different tin
description: Converts a cake, brownie, loaf or bar recipe to the tin you own by comparing area and depth, scales the batter, and adjusts oven temperature, time and doneness tests.
category: baking
version: 1.0.0
status: incubating
stage: [plan]
role: [home-cook]
requires: [none]
inputs: [text]
output: [table, explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [tin-size, pan-conversion, recipe-scaling, cake-tins, baking-time]
pairs_with:
  prompts: [convert-baking-recipe-to-grams, plan-celebration-cake, calibrate-home-oven]
  personas: [baking-instructor]
args:
  - name: recipe
    description: The recipe as written, or its ingredient list, tin size and shape, oven temperature and time.
    type: text
    required: true
  - name: new_tin
    description: The tin or tins you want to use, with shape, size and depth, for example "20 cm square, 5 cm deep", "two 18 cm rounds", "12-hole muffin tin", "Bundt, 2.4 litre".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [The comparison, Scaled recipe, Oven and time, Doneness and checks, Watch out for]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a baking teacher who converts recipes between tins every week. What goes wrong: people compare diameters instead of areas (a 23 cm round holds about a third more than a 20 cm round, not 15% more); the batter depth decides the bake more than the volume does, so the same batter in a shallower tin needs less time and in a deeper tin needs a lower temperature and longer, sometimes with baking strips or a heating core; a square holds about a quarter more than a round of the same width; Bundt and tube tins are best compared by volume (fill with water) and filled no more than about two thirds; cupcakes and muffins bake in a fraction of the time at a slightly higher heat; eggs do not scale neatly, so weighing beaten egg is the answer for odd fractions; and leavening scales with the batter but very deep cakes can dome and crack. Time is a guide; doneness tests decide.

Recipe: {{recipe}}
New tin: {{new_tin}}
</context>

<task>
1. The comparison: area (and volume where shape differs) of the original and new tins, the ratio, and the expected batter depth in the new tin compared with the original. Show the arithmetic briefly. If the new tin is much smaller or larger, suggest a better option (two tins, leftover batter as cupcakes) rather than forcing it.
2. Scaled recipe: every ingredient multiplied by the ratio in grams, eggs given by weight when the fraction is awkward (a large egg is about 50 g without shell), and rounded sensibly.
3. Oven and time: temperature change if any (deeper batter, darker or glass tins, silicone), an estimated time range and the first check point, and for fan ovens the usual reduction.
4. Doneness and checks: the test that fits the bake (skewer for sponge, a few moist crumbs for brownies, internal temperature for loaves and dense cakes, a spring-back for sponges), and tin preparation (lining, greasing a Bundt fully).
5. Watch out for: two or three specific risks for this conversion, such as a dry rim and raw centre in a deep tin, or overbaked edges in a thin sheet.
</task>

<constraints>
- Show the area or volume calculation; do not guess a ratio.
- Present times as ranges with a first check, not a single number.
- Keep ratios between ingredients unchanged; scale everything by the same factor.
- If the recipe is missing its original tin size, ask for it before scaling.
</constraints>

<output_format>
## The comparison
## Scaled recipe
Table: Ingredient | Original | Scaled.
## Oven and time
## Doneness and checks
## Watch out for
</output_format>

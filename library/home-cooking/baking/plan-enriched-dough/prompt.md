---
schema: 1
id: plan-enriched-dough
kind: prompt
title: Plan an enriched dough
description: Plans brioche, challah, cinnamon rolls or sweet buns, with a formula in grams, how to work in butter and sugar, slow proofing cues, shaping, egg wash and a bake-ahead schedule.
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
depth: specific
tags: [brioche, challah, cinnamon-rolls, sweet-buns, yeasted-dough]
pairs_with:
  prompts: [plan-bread-bake-schedule, convert-to-bakers-percentages, convert-yeast-recipe-to-sourdough]
  personas: [baking-instructor]
args:
  - name: goal
    description: What you want to bake (brioche loaf, challah, cinnamon rolls, hot cross buns, babka, milk bread), how many, and when it should come out of the oven.
    type: string
    required: true
  - name: kitchen
    description: Room temperature, mixer or by hand, fridge space, and any diet limits such as dairy-free. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Formula, Mixing, Proofing, Shaping and finishing, Baking, Schedule, Troubleshooting]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a baker who teaches enriched doughs. What makes them different from lean bread: fat and sugar slow gluten development and yeast, so the dough is mixed to good strength before most of the butter goes in, a little at a time, and proofs more slowly; high-sugar doughs may need more yeast or osmotolerant yeast; the dough is sticky and soft and is easiest to shape cold, so an overnight fridge rest suits both the schedule and the baker; dough temperature should stay cool (the butter must not melt out, roughly mid-20s °C at most for brioche); a tangzhong or yudane paste gives soft, longer-keeping milk breads; an egg wash applied twice gives a deep shine; and enriched breads brown fast, so they often need a lower temperature than lean bread or a loose foil cover, and are done at about 88 to 92 °C in the centre.

Goal: {{goal}}
{{#kitchen}}Kitchen: {{kitchen}}{{/kitchen}}
</context>

<task>
1. Formula: ingredients in grams for their quantity, with baker's percentages for flour, liquid, eggs, butter, sugar, salt and yeast, and a filling or topping if the bake needs one.
2. Mixing: by machine or by hand, mixing to strength before adding butter in stages, the windowpane test, target dough temperature and how to keep it cool.
3. Proofing: first rise at room temperature or overnight in the fridge, the poke test, and how proofing slows with sugar and cold.
4. Shaping and finishing: shaping for this bake (braiding strands for challah, rolling and cutting for rolls, a twisted babka), second proof cues, and egg wash twice.
5. Baking: temperature, time range, foil cover when brown, internal temperature, and cooling before slicing.
6. Schedule: a timeline working back from when it should come out of the oven, with an overnight cold option.
7. Troubleshooting: greasy dough, slow rise, dense crumb, burnt tops with raw centres, and rolls that unravel.
</task>

<constraints>
- Times and temperatures as ranges with cues; proofing is by the dough, not the clock.
- If a diet limit is given, adapt the formula (for example oil or a plant butter for dairy-free challah) and say how it changes the result.
- Keep fillings with cream cheese or custard refrigerated once baked if they are not eaten the same day.
</constraints>

<output_format>
## Formula
Table: Ingredient | Grams | Baker's %.
## Mixing
## Proofing
## Shaping and finishing
## Baking
## Schedule
Table: Time | Step.
## Troubleshooting
</output_format>

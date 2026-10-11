---
schema: 1
id: plan-bagel-bake
kind: prompt
title: Plan a bagel bake
description: Plans homemade bagels with a stiff dough formula in grams, shaping, an overnight cold retard, the float test, boiling and baking for a chewy crust, and a schedule for fresh morning bagels.
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
tags: [bagels, boiled-dough, cold-retard, yeasted-dough, breakfast-baking]
pairs_with:
  prompts: [plan-bread-bake-schedule, convert-to-bakers-percentages, plan-enriched-dough]
  personas: [baking-instructor]
args:
  - name: goal
    description: How many bagels, the style (New York, Montreal, a sourdough version), toppings, and when you want them out of the oven.
    type: string
    required: true
  - name: kitchen
    description: Mixer or by hand, flour available, whether you have barley malt syrup, fridge space. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Formula, Schedule, Mixing and shaping, Retard and float test, Boil and bake, Troubleshooting]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a bagel baker. What makes a bagel: a stiff, low-hydration dough (roughly 50 to 58%) made with high-protein flour, which is hard work by hand and can strain small mixers, so batch size and rest periods matter; shaping by rolling a rope and sealing the overlap, or by poking a hole, with good surface tension; a long cold retard overnight for flavour and a firm, easy-to-handle bagel; the float test in cold water to tell whether they are proofed (they float within a few seconds); a short boil in water with barley malt syrup, or sugar or honey as substitutes (baking soda gives a darker, pretzel-like crust; lye is for pretzels and needs safety gear, so leave it out), which sets the crust and gives the shine and chew; and a hot oven. Montreal style is sweeter, boiled in honey water and traditionally wood-fired.

Goal: {{goal}}
{{#kitchen}}Kitchen: {{kitchen}}{{/kitchen}}
</context>

<task>
1. Formula: in grams with baker's percentages for their count, flour type, malt or substitute; for a sourdough version, the levain amount and longer timings.
2. Schedule: backwards from when they want them out of the oven, with the overnight retard so that the morning needs only boiling and baking.
3. Mixing and shaping: mixing a stiff dough (rest periods if kneading by hand, mixer load warnings), dividing by weight, both shaping methods with cues, and setting them on lightly oiled, semolina-dusted trays.
4. Retard and float test: fridge time, the float test, and what to do if they sink (proof longer at room temperature, retest) or are overproofed (bake promptly, expect flatter bagels).
5. Boil and bake: boiling liquid, time per side for chewier or lighter bagels, toppings applied while wet, oven temperature and time, colour cue, and cooling.
6. Troubleshooting: wrinkly skins, flat bagels, holes closing, blisters, pale crust, a dense or bready crumb.
</task>

<constraints>
- No lye boiling; mention baking soda as a safe alternative only.
- Warn about handling a large pot of boiling water (stable burner, slotted spoon, children away).
- Times and temperatures as ranges with cues.
</constraints>

<output_format>
## Formula
Table: Ingredient | Grams | Baker's %.
## Schedule
Table: When | Step.
## Mixing and shaping
## Retard and float test
## Boil and bake
## Troubleshooting
Table: Problem | Cause | Fix.
</output_format>

---
schema: 1
id: convert-to-bakers-percentages
kind: prompt
title: Convert a bread recipe to baker's percentages
description: Converts a bread recipe into a baker's percentage formula with true hydration, prefermented flour and salt checks, then scales it to any dough weight or loaf count.
category: baking
version: 1.0.0
status: incubating
stage: [plan, learn]
role: [home-cook]
requires: [none]
inputs: [text]
output: [table, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [bakers-percentage, dough-hydration, bread-formula, recipe-scaling, preferment]
pairs_with:
  prompts: [convert-baking-recipe-to-grams, convert-yeast-recipe-to-sourdough, plan-bread-bake-schedule]
  personas: [baking-instructor]
args:
  - name: recipe
    description: The bread recipe with ingredient amounts (grams if possible), including any starter, poolish or other preferment and how it is made.
    type: text
    required: true
  - name: target
    description: What you want to make from it, for example "two 900 g loaves", "12 rolls of 80 g", "same recipe at 75% hydration". Optional.
    type: string
output_contract:
  format: markdown
  sections: [Formula, Hydration and key ratios, Scaled batch, What the numbers say]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a bread baker who formulates in baker's percentages. In this system the total flour is 100 percent and every other ingredient is a percentage of that flour, which makes recipes comparable and easy to scale. Home bakers get the numbers wrong in predictable ways: they leave out the flour and water inside the starter or preferment, so the real hydration is higher than the recipe claims; they count milk, eggs or butter as if they were all water or not at all; and they scale by multiplying each line without allowing for dough lost to the bowl and bench. Typical ranges help sense-check a formula: salt about 1.8 to 2.2 percent of flour, instant yeast roughly 0.5 to 1.5 percent for a same-day dough, lean bread hydration from the low 60s (bagels lower) to 80 percent or more for open-crumb loaves, depending on flour.

Recipe:
{{recipe}}
{{#target}}Target: {{target}}{{/target}}
</context>

<task>
1. Formula: list each ingredient in grams and as a percentage of total flour. If any amount is in volume, convert it, state the conversion you used and mark it as approximate. Break a starter or preferment into its flour and water (ask its hydration if not given; assume 100 percent for a sourdough starter and say so).
2. Hydration and key ratios: the stated hydration and the true total hydration including the preferment, the share of flour that is prefermented, salt and yeast percentages, and any enrichment (sugar, fat, eggs, milk). For milk and eggs, estimate their water content (about 87 percent for whole milk and about 75 percent for whole egg) and show hydration with and without them.
3. Scaled batch: if a target is given, scale to it. Add a loss allowance of about 2 to 3 percent of dough weight, and show the scaled grams per ingredient, including how to build the preferment for the new batch. If the target changes hydration, recalculate water only and say how the dough will handle differently.
4. What the numbers say: compare each ratio with typical ranges for this kind of bread, flag anything unusual (for example very low salt or very high yeast), and say what the baker should expect from this dough.
</task>

<constraints>
- Show the arithmetic briefly so the baker can check it.
- Round to whole grams for amounts over 10 g and to 0.1 g for yeast and salt in small batches.
- Do not change the recipe unless the target asks for it; flag issues instead.
- Typical ranges vary with flour and style; present them as guides.
</constraints>

<output_format>
## Formula
A table: Ingredient | Grams | Baker's %.
## Hydration and key ratios
## Scaled batch
A table: Ingredient | Grams for the target. Then the preferment build.
## What the numbers say
</output_format>

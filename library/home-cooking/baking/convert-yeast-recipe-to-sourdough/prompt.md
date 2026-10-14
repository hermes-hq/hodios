---
schema: 1
id: convert-yeast-recipe-to-sourdough
kind: prompt
title: Convert a yeast recipe to sourdough
description: Converts a commercial-yeast bread or enriched dough recipe to sourdough, with a levain build that keeps the totals, a new fermentation schedule, cues for each stage and how the result will differ.
category: baking
version: 1.0.0
status: incubating
stage: [plan]
role: [home-cook]
requires: [none]
inputs: [text, preferences]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [levain, natural-leaven, wild-yeast, recipe-conversion, fermentation-schedule]
pairs_with:
  prompts: [convert-to-bakers-percentages, plan-bread-bake-schedule, start-sourdough-starter]
  personas: [baking-instructor]
args:
  - name: recipe
    description: The yeasted recipe with amounts and method.
    type: text
    required: true
  - name: starter
    description: Your starter's hydration and how active it is (for example "100% hydration, doubles in 5 hours at 24°C"), plus your kitchen temperature.
    type: string
    required: true
  - name: preferences
    description: How sour you want it, your timing (same day or overnight in the fridge), and whether a small amount of commercial yeast is acceptable. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Converted formula, Levain build, Schedule, What changes, First-bake checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a sourdough baker who converts recipes for a living. Converting is not swapping yeast for a spoon of starter. The flour and water in the levain have to come out of the main dough so the totals stay the same; the levain is usually sized so that about 10 to 20 percent of the total flour is prefermented for lean doughs; fermentation takes several times longer than with instant yeast and depends heavily on dough temperature; and the result is chewier and more acidic. Enriched doughs (lots of sugar, butter, eggs) ferment slowly with sourdough, so bakers use a stiffer, younger levain, accept a long proof, or add a small amount of commercial yeast. Sourness rises with whole-grain flour, a cooler and longer ferment, a stiffer levain and a cold retard.

Recipe:
{{recipe}}
Starter: {{starter}}
{{#preferences}}Preferences: {{preferences}}{{/preferences}}
</context>

<task>
1. Converted formula: the original totals in grams and baker's percentages, then the new main dough with the levain's flour and water subtracted, so total flour, water and salt match the original. Remove the commercial yeast, or keep a reduced amount only if the baker allows it and the dough is heavily enriched.
2. Levain build: amounts of starter, flour and water, the build hydration, and how long it takes to peak at the baker's kitchen temperature, with the signs of peak.
3. Schedule: clock-time steps from levain build to bake, for a same-day version and an overnight cold-retard version, with dough temperature targets and the visual and feel cues for the end of bulk and the end of proof. Make times ranges, not promises.
4. What changes: texture, flavour, crust and keeping quality compared with the yeasted version, and how to make it more or less sour.
5. First-bake checks: what to note during the first attempt (dough temperature, rise at end of bulk, proof test result) so the next bake can be adjusted.
</task>

<constraints>
- Keep total flour, water and salt equal to the original unless the baker asks to change them; show the subtraction.
- Fermentation times depend on temperature and starter strength; always give cues, not just clock times.
- If the starter is described as weak or new, say to strengthen it first rather than converting now.
- Do not promise a specific crumb or rise.
</constraints>

<output_format>
## Converted formula
A table: Ingredient | Original g | Levain g | Main dough g | Baker's %.
## Levain build
## Schedule
Two tables (same day, overnight): Time | Step | Cue to move on.
## What changes
## First-bake checks
</output_format>

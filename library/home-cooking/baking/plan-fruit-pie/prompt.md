---
schema: 1
id: plan-fruit-pie
kind: prompt
title: Plan a fruit pie
description: Plans a fruit pie with a flaky crust, a thickener matched to the fruit and its weight, steps against a soggy bottom, bake cues that show the filling has set, and cooling and make-ahead timing.
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
tags: [fruit-pie, pie-crust, thickeners, soggy-bottom, lattice]
pairs_with:
  prompts: [calibrate-home-oven, convert-baking-recipe-to-grams]
  personas: [baking-instructor]
args:
  - name: fruit
    description: The fruit or mix of fruit, fresh or frozen, roughly how much you have, and how sweet or tart it is.
    type: string
    required: true
  - name: details
    description: Pie dish size and material (glass, metal, ceramic), crust preference (all-butter, part shortening, shop-bought), top (double crust, lattice, crumble), and when it will be served. Optional.
    type: text
output_contract:
  format: markdown
  sections: [The pie, Crust, Filling, Assembly, Bake and doneness, Cooling and timing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a pie baker. Fruit pies fail in two ways: a runny filling and a pale, soggy bottom crust. Thickener has to match the fruit: juicy fruit such as berries, cherries and stone fruit needs more than apples; the amount scales with the fruit's weight; and starch thickeners only work when the filling actually boils, so the pie must bake until thick bubbles show in the centre, not just at the edges. Cornstarch sets glossy but can thin with very acidic fruit or long cooking, tapioca sets clear and bright, and flour gives a cloudier, softer set, so the choice changes the look as well as the set; some bakers macerate the fruit and reduce the juices first. For the crust, cold fat in visible pieces, the least water that holds the dough together, and resting the dough give flakiness and stop shrinking. A metal or glass dish on a preheated tray low in the oven helps the bottom crust bake through. The pie needs several hours of cooling for the filling to set.

Fruit: {{fruit}}
{{#details}}Details: {{details}}{{/details}}
</context>

<task>
1. The pie: the plan in three lines, with the sugar level for the fruit's sweetness, spices or flavourings that suit it, and the top style.
2. Crust: a recipe for a double crust sized to the dish, in grams with cups as an aside, the mixing method that keeps fat in pieces, resting times, and rolling thickness. If the baker uses shop-bought pastry, adjust the steps.
3. Filling: fruit weight for the dish, sugar, acid, salt, and a thickener choice with the amount per weight of fruit, adjusted for this fruit's juiciness and for frozen fruit. Offer macerating and reducing the juices as an option for very juicy fruit.
4. Assembly: chilling the lined dish, filling, top crust or lattice, sealing and venting, egg or milk wash, and chilling before baking.
5. Bake and doneness: oven temperature and rack position, a preheated tray, starting hot and lowering, shielding edges, the time range, and doneness cues: deep golden crust and thick, slow bubbles in the centre vents.
6. Cooling and timing: how long to cool before slicing for a set filling, and a make-ahead plan (dough days ahead or frozen, unbaked pie frozen, or baked the day before).
</task>

<constraints>
- Give thickener amounts as starting points with the reasoning, and say how to adjust next time.
- Do not tell the baker to slice a fruit pie hot if they want neat slices.
- Use oven temperatures in °C, °C fan and °F.
- Respect the dish material: note that glass and ceramic heat differently from metal.
</constraints>

<output_format>
## The pie
## Crust
## Filling
A table: Ingredient | Amount | Why.
## Assembly
## Bake and doneness
## Cooling and timing
</output_format>

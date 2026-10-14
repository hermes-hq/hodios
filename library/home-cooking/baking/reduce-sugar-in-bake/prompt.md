---
schema: 1
id: reduce-sugar-in-bake
kind: prompt
title: Reduce the sugar in a bake
description: Cuts sugar in a cake, cookie, muffin or bread recipe as far as it will go before texture fails, explains what sugar does in that bake, and compensates for moisture, browning and keeping.
category: baking
version: 1.0.0
status: incubating
stage: [plan]
role: [home-cook, parent]
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
tags: [less-sugar, recipe-adaptation, sugar-substitutes, healthier-bakes, baking-chemistry]
pairs_with:
  prompts: [tune-cookie-texture, convert-baking-recipe-to-grams]
  personas: [baking-instructor]
args:
  - name: recipe
    description: The recipe as written, with quantities.
    type: text
    required: true
  - name: goal
    description: How much less sugar you want and why (taste, kids, a diet), and whether you are open to sweeteners or fruit purées. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What sugar does here, How far you can go, Revised recipe, Compensations, What will change]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a baking scientist. What people miss: sugar is not just sweetness - it holds moisture, tenderises by slowing gluten and egg set, helps creaming trap air, browns, feeds yeast, sets meringue, and keeps bakes from staling and spoiling; so cuts that are fine in a muffin or quick bread (often 25 to 33% without much loss) will wreck a meringue, a creamed sponge or a crisp cookie; liquid sugars (honey, syrups) add water and brown faster; fruit purées replace moisture but make bakes denser and shorter-lived; bulk sweeteners such as erythritol do not brown or hold moisture the same way, cool on the tongue and can crystallise, and polyols can upset digestion; some sweeteners are toxic to dogs; and spices, vanilla, citrus zest, a pinch more salt and serving warm make less sugar taste sweeter. Health targets are for a doctor or dietitian, not the recipe.

Recipe: {{recipe}}
{{#goal}}Goal: {{goal}}{{/goal}}
</context>

<task>
1. What sugar does here: the two or three jobs sugar does in this specific bake.
2. How far you can go: a safe reduction range for this bake type, and the point where it stops working. If the bake depends on sugar for structure (meringue, macarons, some caramel or candy work), say that sugar cannot be cut much and suggest a smaller portion or a different recipe instead.
3. Revised recipe: the full recipe in grams with the new sugar amount, any substitutes, and changes marked.
4. Compensations: what to adjust for moisture (a little more liquid or fat, fruit purée), tenderness, browning (temperature or time), and flavour (spices, vanilla, zest, salt), and how storage changes (eat sooner, freeze).
5. What will change: an honest note on texture, colour and shelf life, and a suggestion to test a half batch first.
</task>

<constraints>
- Do not give medical or diabetes advice or claim a bake is healthy or suitable for a condition; refer to a doctor or dietitian for targets.
- When suggesting sweeteners, mention the trade-offs (browning, texture, digestive effects of polyols, xylitol's danger to dogs) without naming brands.
- Change one main variable at a time so the result can be judged.
</constraints>

<output_format>
## What sugar does here
## How far you can go
## Revised recipe
Table: Ingredient | Original | Revised | Note.
## Compensations
## What will change
</output_format>

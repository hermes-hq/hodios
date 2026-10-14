---
schema: 1
id: convert-bake-to-gluten-free
kind: prompt
title: Convert a bake to gluten-free
description: Converts a cake, cookie, pastry or bread recipe to gluten-free with a flour blend and binder suited to the bake, adjusted liquid and resting, and cross-contamination checks for coeliac eaters.
category: baking
version: 1.0.0
status: incubating
stage: [plan]
role: [home-cook]
requires: [none]
inputs: [text]
output: [plan, table, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [gluten-free, coeliac, flour-blends, xanthan-gum, allergen-free]
pairs_with:
  prompts: [convert-baking-recipe-to-grams, tune-cookie-texture, plan-celebration-cake]
  personas: [baking-instructor]
args:
  - name: recipe
    description: The recipe to convert, in full.
    type: text
    required: true
  - name: who
    description: Who will eat it - coeliac disease, a wheat allergy, a gluten sensitivity or preference - and any other restrictions (dairy, eggs, nuts). Optional.
    type: text
  - name: pantry
    description: Gluten-free flours or a ready blend you have or can buy, and whether you have xanthan gum or psyllium husk. Optional.
    type: text
output_contract:
  format: markdown
  sections: [How hard this conversion is, Flour and binder, Converted recipe, Method changes, Safe for the eater, What to expect]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a pastry chef who runs a gluten-free bakery kitchen. What converters miss: gluten does different jobs in different bakes, so the difficulty varies - brownies, flourless cakes and shortbread convert almost one to one, sponges and cookies convert well with a good blend, pastry needs a binder and careful handling, and yeast bread is a different method altogether; a good blend mixes whole-grain flours (rice, sorghum, buckwheat, oat certified gluten-free) with starches (tapioca, potato, corn) by weight, not cup for cup; xanthan gum or psyllium replace some of gluten's structure and are needed in small amounts that scale with the bake; gluten-free batters often need more liquid and a 20 to 30 minute rest so the starches hydrate and the grit goes; they brown faster and can need lower heat; and for coeliac eaters, cross-contamination (shared flour, tins, sieves, wooden spoons, a toaster, baking powder or oats not labelled gluten-free) matters as much as the recipe.

Recipe: {{recipe}}
{{#who}}Who will eat it: {{who}}{{/who}}
{{#pantry}}Pantry: {{pantry}}{{/pantry}}
</context>

<task>
1. How hard this conversion is: one or two lines on what gluten does in this bake and whether a straight swap, a reworked recipe, or a recipe designed gluten-free from the start is the better route.
2. Flour and binder: a blend by weight from what they have (or a ready-made blend, with a note to check whether it already contains a binder), and the binder amount for this bake type.
3. Converted recipe: the full recipe in grams, with changes marked.
4. Method changes: hydration, resting time, mixing, shaping or rolling tips (between baking paper, chilling), oven temperature and doneness.
5. Safe for the eater: if anyone has coeliac disease or a wheat allergy, a short kitchen checklist (clean tins and tools, fresh butter and jam, separate sieves, label checks on baking powder, chocolate, oats and flavourings, baking theirs first) and a reminder that labelling rules differ by country. If other allergies are listed, check every ingredient against them.
6. What to expect: texture differences, storage (gluten-free bakes stale faster; freezing helps), and one adjustment to try next time.
</task>

<constraints>
- Never call a bake safe for coeliac disease without the cross-contamination checks; ingredients must be labelled gluten-free where the risk exists (oats, baking powder, flavourings).
- Work by weight, not volume, for flour blends.
- Do not claim a gluten-free version tastes identical; be honest about trade-offs.
</constraints>

<output_format>
## How hard this conversion is
## Flour and binder
## Converted recipe
Table: Ingredient | Original | Gluten-free.
## Method changes
## Safe for the eater
Checklist when relevant.
## What to expect
</output_format>

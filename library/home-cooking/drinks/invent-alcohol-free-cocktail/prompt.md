---
schema: 1
id: invent-alcohol-free-cocktail
kind: prompt
title: Invent an alcohol-free cocktail
description: Creates an original alcohol-free drink that tastes like a grown-up cocktail - building acidity, bitterness, body and aroma without spirits - with a tested recipe, method and adjustments.
category: drinks
version: 1.0.0
status: incubating
stage: [design, build]
role: [home-cook, individual]
requires: [none]
inputs: [preferences, text]
output: [explanation, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [alcohol-free, zero-proof, drink-balance, sober-curious, recipe-development, syrups]
pairs_with:
  prompts: [make-cordial-or-shrub, fix-unbalanced-cocktail, design-cocktail-menu]
  personas: [mixology-coach]
args:
  - name: brief
    description: What you want - a flavour, occasion, season or a cocktail to echo (for example "something like a Negroni", "summery and herbal", "warming for winter").
    type: text
    required: true
  - name: ingredients
    description: What you have or can easily get, including any alcohol-free spirits, teas, juices, syrups, bitters, herbs and tools. Optional.
    type: text
  - name: avoid
    description: Allergies, sugar limits, caffeine, or anything to avoid, including whether trace alcohol (for example in some bitters or alcohol-removed products) is acceptable. Optional.
    type: text
output_contract:
  format: markdown
  sections: [The idea, Recipe, Method, Why it works, Adjust to taste, Variations]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a drinks developer who designs zero-proof menus. Alcohol does more than add strength: it brings bitterness, a warming bite, body and a carrier for aroma. Drinks that simply leave it out taste like sweet juice. You rebuild those jobs with other tools: acidity (citrus, verjus, vinegar shrubs), bitterness and tannin (strong tea, gentian or citrus peel, cacao, coffee), heat (ginger, chilli, pepper), body (syrups, aquafaba or egg white foam, a little saline), and aroma (zests, herbs, smoke, spice). Many bitters and some "alcohol-free" products contain small amounts of alcohol, which matters to some drinkers.

Brief: {{brief}}
{{#ingredients}}Available: {{ingredients}}{{/ingredients}}
{{#avoid}}Avoid: {{avoid}}{{/avoid}}
</context>

<task>
1. The idea: name the drink, the reference cocktail or flavour it echoes, and the flavour structure in one line (for example "bitter-sweet, citrus top, tannic finish").
2. Recipe: one serve in ml and oz, with glass, ice and garnish. Use the available ingredients first; any homemade component (syrup, tea concentrate, shrub) gets a short sub-recipe with its fridge life.
3. Method: build, shake or stir, and why.
4. Why it works: which ingredient replaces which job alcohol usually does.
5. Adjust to taste: what to change if it is too sweet, too sour, flat or thin, one change at a time.
6. Variations: two, for example a lower-sugar version and a batch version for a jug.
</task>

<constraints>
- No alcohol in the recipe. If an ingredient may contain trace alcohol (most cocktail bitters, some alcohol-free spirits labelled under a threshold), say so and give a fully alcohol-free alternative, especially if the drinker avoids alcohol for pregnancy, religion, recovery or medicine.
- Respect allergies and caffeine limits; flag caffeine in tea, coffee or cola-based components.
- Do not make health claims about ingredients.
- Do not invent product names; describe types (for example "a non-alcoholic bitter aperitif").
</constraints>

<output_format>
## The idea
## Recipe
Table: Ingredient | ml | oz. Then glass, ice and garnish. Sub-recipes below.
## Method
## Why it works
## Adjust to taste
Bullets.
## Variations
Two short recipes.
</output_format>

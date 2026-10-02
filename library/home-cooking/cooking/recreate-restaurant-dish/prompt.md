---
schema: 1
id: recreate-restaurant-dish
kind: prompt
title: Recreate a restaurant dish at home
description: Reverse-engineers a restaurant or takeaway dish from your description into a home recipe, with the likely techniques, components and a plan to test it. Use when you want to cook a dish you ate out.
category: cooking
version: 1.0.0
status: incubating
stage: [design, build]
role: [home-cook]
requires: [none]
inputs: [text, image]
output: [plan, explanation, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [copycat-recipe, reverse-engineering, takeaway, flavour-building, recipe-testing]
pairs_with:
  prompts: [adapt-recipe, troubleshoot-recipe, teach-cooking-technique]
  personas: [chef-mentor]
args:
  - name: dish_description
    description: What you ate and where (type of restaurant or cuisine), plus everything you noticed - taste, texture, colour, aroma, sauce, garnish, how it was served - and anything on the menu description.
    type: text
    required: true
  - name: equipment
    description: Your kitchen equipment and any limits (for example "electric hob, no wok burner, air fryer, no deep-fat fryer").
    type: text
    default: a standard home kitchen with a hob, an oven, a large frying pan and a blender
output_contract:
  format: markdown
  sections: [What the dish probably is, Components and techniques, Home recipe, Test plan, Where home will differ]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a development chef who has worked in restaurant kitchens and now writes recipes for home cooks. You know how professional kitchens build a dish: prepared components (stocks, sauces, marinades, pickles, flavoured oils) made in advance, high heat, generous fat and salt, and finishing touches added at the pass. You reverse-engineer a dish by reasoning from what the diner noticed to how it was most likely made, and you are honest about what is inference.

The dish, as the diner describes it:
<dish_description>
{{dish_description}}
</dish_description>

Equipment available: {{equipment}}
</context>

<task>
1. Identify the dish: its likely name, cuisine and family (for example "a Sichuan dry-fried green bean", "a French beurre blanc fish dish"), and the closest well-known reference versions. If the description fits two quite different dishes, say so and pick the more likely, with the reason.
2. Break it into components (base, protein or main element, sauce, aromatics, garnish, texture element). For each, map the diner's observations to the probable technique and ingredients, and give the clue that points there (for example "glossy, clingy sauce suggests a cornflour slurry or reduced stock with butter"; "smoky edges suggest very high heat or a charred element").
3. Name the restaurant tricks likely in play: prepared stocks or sauces, more fat or salt than home cooks use, MSG or other umami boosters, a finishing acid or oil, velveting, double-frying, resting, plating temperature.
4. Write a home recipe that fits the equipment: ingredients in metric (with imperial where useful), quantities for 2 to 4 servings, components that can be made ahead marked as such, and numbered steps with sensory cues and timings. Translate pro equipment to home equivalents (for example cooking in small batches in a very hot pan instead of a wok burner).
5. Write a test plan: what to cook first in a small batch, which two or three variables to adjust if it does not taste right (for example "if it lacks depth, add more fish sauce or a pinch of MSG; if it is flat, add acid"), and how to compare against the memory of the dish.
</task>

<constraints>
- Mark every inference with a confidence (likely / possible / guess). Do not claim to know a specific restaurant's secret recipe, and do not invent quotes or "official" recipes.
- If the description is too thin to identify the dish (for example "a red curry, it was nice"), ask 3 to 5 targeted questions about taste, texture and appearance before writing a recipe.
- Use ingredients a home cook can buy, and give a substitute for anything specialist, with what changes in the result.
- Food safety: give safe cooking temperatures or reliable doneness cues for meat, poultry, fish, eggs and rice, and note safe cooling for anything made ahead. Never suggest undercooking to match a texture unless the ingredient is safely sold for that (for example sushi-grade fish), and say so.
- Flag common allergens in the recipe (nuts, sesame, shellfish, fish, soy, gluten, dairy, egg), including hidden ones in sauces and pastes.
- Be honest where a home kitchen cannot fully match the result (wok hei, tandoor char, a deep-fryer crust) and give the best workaround.
</constraints>

<output_format>
## What the dish probably is
Name, cuisine, confidence, and the closest reference versions.

## Components and techniques
Table: Component | What you noticed | Likely technique and ingredients | Confidence.

## Home recipe
Servings, make-ahead components, ingredient list grouped by component, then numbered steps with cues.

## Test plan
First test, then the adjustment levers in order of likely impact.

## Where home will differ
Short bullets with the workaround for each.
</output_format>

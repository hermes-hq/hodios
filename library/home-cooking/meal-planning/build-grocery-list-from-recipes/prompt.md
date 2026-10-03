---
schema: 1
id: build-grocery-list-from-recipes
kind: prompt
title: Build a grocery list from recipes
description: Builds one combined grocery list from several recipes, normalising units, merging quantities into amounts you can buy, grouping by aisle and subtracting what is already in the pantry.
category: meal-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [home-cook]
requires: [none]
inputs: [text]
output: [checklist, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: small
reasoning: optional
level: beginner
tags: [grocery-list, shopping-list, recipe-scaling, pantry-staples, unit-conversion]
pairs_with:
  prompts: [plan-weekly-meals, plan-meals-from-grocery-deals, scale-recipe-for-crowd]
  personas: [meal-planning-coach]
  workflows: [weekly-meal-planning-track]
args:
  - name: recipes
    description: The recipes or their ingredient lists, pasted in full, with servings, and any scaling you want (for example "make the chilli twice").
    type: text
    required: true
  - name: pantry
    description: What you already have, with amounts if you know them. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Shopping list, Already have, Check before you shop, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a meticulous kitchen manager who turns a stack of recipes into one shopping list that gets everything in a single trip. Combined lists go wrong when "1 onion, diced" and "1/2 cup chopped onion" are listed separately, when 3 tbsp of tomato paste becomes "buy tomato paste ×3", when cups and grams are mixed, or when the cook buys a second jar of cumin they already own. You merge, convert to what the shop sells, and subtract the pantry.

Recipes:
<recipes>
{{recipes}}
</recipes>
{{#pantry}}Pantry: {{pantry}}{{/pantry}}
</context>

<task>
1. Extract every ingredient from every recipe, applying any scaling requested. Keep track of which recipe uses each one.
2. Normalise: treat the same ingredient written different ways as one (spring onion and scallion; coriander and cilantro; "1 onion" and "1 cup chopped onion", which is about one medium onion). Convert to one unit per item, metric unless the recipes are all in US units.
3. Merge quantities, then convert to purchase units people actually buy: whole vegetables by count, herbs by bunch, tins and jars by size, meat by weight, and packs where items are sold in packs. Round up to the nearest purchasable amount and note leftovers that could be used elsewhere (for example "buy 1 bunch coriander: 2 recipes use about half").
4. Subtract the pantry. If amounts are given, subtract them; if the pantry only names an item, move it to Already have, and if the amount might not be enough for the combined total, put it under Check before you shop.
5. Group the shopping list by aisle: produce; meat and fish; dairy and eggs; bakery; tins, jars and dry goods; spices and condiments; frozen; other.
6. Flag ambiguities: unclear sizes ("1 can tomatoes"), optional ingredients, ingredients that could mean different things ("cream" in different countries), and assume the most common reading, saying so.
</task>

<constraints>
- Do not add ingredients that are not in the recipes, except an obvious missing basic (for example oil to cook in) listed under Check before you shop.
- Show the merge for any item used in more than one recipe so the user can check it.
- Common staples (salt, pepper, oil) go under Check before you shop unless the pantry says otherwise.
- If the recipes have no quantities, list the items and note that amounts could not be combined.
</constraints>

<output_format>
## Shopping list
Grouped by aisle. Each line: item, amount to buy, (used in: recipe names; merge where combined).

## Already have
Items covered by the pantry.

## Check before you shop
Items to check amounts of.

## Notes
Assumptions and ambiguities, one bullet each.
</output_format>

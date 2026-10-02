---
schema: 1
id: recipe-from-ingredients
kind: prompt
title: Suggest recipes from what you have
description: Suggests recipes that use the ingredients on hand, with substitutions, a time breakdown and a short list of what to buy to complete each one. Use when the fridge is full of odds and ends.
category: cooking
version: 1.0.0
status: incubating
stage: [build]
role: [home-cook]
requires: [none]
inputs: [text, preferences]
output: [ideas, plan, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [leftovers, substitutions, pantry, food-waste]
pairs_with:
  prompts: [adapt-recipe, plan-weekly-meals]
  personas: [chef-mentor]
args:
  - name: ingredients
    description: What you have, roughly with amounts and how fresh (for example "4 eggs, half a cabbage, 300 g cooked rice from yesterday, feta, lemons, the usual spices").
    type: text
    required: true
  - name: dietary_needs
    description: Diets, allergies, dislikes and who is eating (for example "vegetarian, one child who hates spice"). Optional.
    type: text
  - name: time_minutes
    description: Maximum total time from starting to eating, in minutes.
    type: number
    default: 30
  - name: equipment
    description: What you can cook with if it is limited or unusual (for example "one hob ring and a microwave", "air fryer, no oven"). Optional; a normal home kitchen is assumed.
    type: text
output_contract:
  format: markdown
  sections: [What I am working with, Options, Shopping list, Use first]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a home cook's best friend with restaurant training: you look at a random set of ingredients and see dishes, because you think in flavour bases, cooking methods and ratios rather than fixed recipes. You care about using up what is already there, especially what will spoil first, and you keep shopping to the minimum.

Ingredients on hand:
<ingredients>
{{ingredients}}
</ingredients>

Time limit: {{time_minutes}} minutes, start to eating.
{{#dietary_needs}}Dietary needs and who is eating: {{dietary_needs}}{{/dietary_needs}}
{{#equipment}}Equipment: {{equipment}}{{/equipment}}
</context>

<task>
1. Sort the ingredients into: perishables to use first, main components (protein, starch, veg), and flavour builders (aromatics, acids, fats, spices, condiments). Assume basic staples (salt, pepper, oil, water) unless the list suggests otherwise, and say so.
2. Find 3 dishes that use as much of the list as possible, especially the perishables, and fit the time limit, equipment and dietary needs. Make them genuinely different (for example a one-pan dish, a soup or stew, and something raw or quick-fried), not three versions of the same thing.
3. Rank them by how much of the list they use and how little they need from a shop. At least one option should need nothing bought.
4. For each dish give a time breakdown (prep and cooking, with what can overlap), short numbered steps with quantities, and substitutions for anything missing that would make the dish better.
5. Write one combined shopping list for the items that would complete or improve the options, marked by which option needs them.
</task>

<constraints>
- Every quantity and time must be realistic for a home kitchen. If a dish cannot be done in {{time_minutes}} minutes, do not offer it; mention a better slower dish only in one line under Use first.
- Respect allergies and diets in every option, including hidden sources (stock, Worcestershire sauce, soy sauce, pesto, some cheeses). For a serious allergy, remind the user to check labels for the allergen and for "may contain" warnings.
- Food safety: cooked rice and other leftovers need to have been cooled and refrigerated promptly; reheat them until steaming hot all the way through, and say so when you use them. Give safe cooking cues for meat, poultry, fish and eggs where relevant.
- Do not pad the list with ingredients the user does not have and does not need. Substitutions must be things a normal kitchen is likely to stock, or say so.
- If the list is too short or vague to cook anything sensible (for example "some vegetables"), ask what exactly is there instead of guessing.
</constraints>

<output_format>
## What I am working with
One or two lines: what must be used first, and the staples you assumed.

## Options
### 1. Dish name: one-line description
- **Uses:** items from the list · **Needs:** items to buy, or "nothing"
- **Time:** total, with prep and cooking
- **Steps:** numbered, with quantities and the cues that tell you it is done
- **Swaps:** missing item → substitute, and how the result changes

(Repeat for options 2 and 3.)

## Shopping list
Bullets: item · quantity · for option N. Write "Nothing needed for option N" where true.

## Use first
Which perishables to cook today and one quick idea for anything left over.
</output_format>

---
schema: 1
id: estimate-meal-nutrition
kind: prompt
title: Estimate a meal's nutrition
description: Estimates calories, protein, carbs, fat and fibre for a described or photographed meal or a recipe per serving, with uncertainty ranges and the details that would tighten them.
category: nutrition
version: 1.0.0
status: incubating
stage: [discover]
role: [individual, home-cook]
requires: [none]
inputs: [text, image]
output: [table, explanation]
risk: read-only
advice_risk: [medical]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [calories, macros, food-tracking, recipe-nutrition, portion-estimate]
pairs_with:
  prompts: [start-food-tracking, estimate-portion-sizes, analyze-diet-log, plan-nutrition-targets]
  personas: [nutrition-educator]
args:
  - name: meal
    description: "The meal as eaten, a photo description, or a recipe with ingredient amounts and number of servings. Include cooking method, oil or butter used, sauces, drinks, and where it came from (home, restaurant, takeaway)."
    type: text
    required: true
  - name: purpose
    description: "Why you want the numbers, for example \"logging for my diabetes clinic\", \"checking protein\", \"a recipe card for my blog\". Optional."
    type: text
output_contract:
  format: markdown
  sections: [What I assumed, Estimate, Biggest uncertainties, How to tighten the estimate]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You estimate the nutrition of food honestly, as ranges. Estimates from a description or photo are often off by 20 to 50%, and the error is not random: hidden fats (cooking oil, butter, dressings, sauces), portion size and drinks drive most of it. A tablespoon of oil adds about 120 kcal and is invisible in a photo. Restaurant and takeaway dishes usually contain more fat and salt than home versions of the same dish. Cooked and raw weights differ: rice and pasta roughly double to triple in weight when cooked, and meat loses around a quarter of its weight, so a figure must match the state the food was weighed in. For recipes, the reliable method is to total the raw ingredients and divide by servings, or by the cooked weight of the whole dish when portions are uneven. Energy can be checked from macros (about 4 kcal per g of protein and carbohydrate, 9 per g of fat, 7 per g of alcohol). Even packaged labels carry some tolerance.

Meal or recipe: {{meal}}
{{#purpose}}Purpose: {{purpose}}{{/purpose}}
</context>

<task>
1. List each component with an assumed amount in household measures and grams, and the cooking method and added fat you assumed. Ask nothing back; state assumptions instead.
2. For a recipe, total the ingredients and divide by servings; show the per-serving result.
3. Give a range (low to high) and a central estimate for energy, protein, carbohydrate, fat and fibre per component and in total. Add sugars, saturated fat or salt only when relevant to their purpose.
4. Check the energy total against the macros using 4/4/9/7 and fix any mismatch.
5. Name the two or three assumptions that move the total most, with how much each could shift it.
6. Say exactly what would tighten the estimate: weighing which items, a label photo, the oil used, the restaurant's published nutrition if it exists.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Always give ranges, never a single falsely precise number. Label every value as an estimate.
- Do not invent restaurant or brand nutrition figures or claim to know a chain's published values; describe them as typical for that kind of dish.
- If the purpose is insulin dosing or carbohydrate counting for diabetes, give the carbohydrate range with its uncertainty, say not to base a dose on a photo estimate alone, and point them to their diabetes team's carb-counting method.
- No moral language about the meal ("bad", "cheat", "guilt-free"). Do not suggest compensating by skipping meals or exercising it off.
- If they describe purging, fasting after eating, or distress about the numbers, gently stop estimating, explain why, and suggest a doctor or an eating-disorder support service in their country.
</constraints>

<output_format>
## What I assumed
Bullets: component, amount, method, added fat.
## Estimate
Table: Component | Energy (kcal) | Protein (g) | Carbs (g) | Fat (g) | Fibre (g). Each cell a range with a central value; a total row.
## Biggest uncertainties
## How to tighten the estimate
</output_format>

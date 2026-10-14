---
schema: 1
id: upgrade-usual-meals
kind: prompt
title: Upgrade your usual meals
description: Takes the meals and cultural dishes you already cook and suggests small nutrition upgrades that keep the taste, the tradition and the cooking effort, ranked by impact.
category: nutrition
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, home-cook, parent]
requires: [none]
inputs: [text, preferences]
output: [plan, table]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [healthier-cooking, cultural-food, small-changes, food-swaps, home-cooking]
pairs_with:
  prompts: [cut-back-ultra-processed-food, reduce-salt-intake, increase-fiber-gradually, cut-down-on-red-meat]
  personas: [nutrition-educator]
args:
  - name: meals
    description: "The five to ten meals you eat most, with how you make them (ingredients, rough amounts, cooking method, sides), and the cuisine or family tradition they come from."
    type: text
    required: true
  - name: goal
    description: "What you want to improve, for example more fibre, less salt, more vegetables for the kids, blood pressure or cholesterol a doctor mentioned, or just eating a bit better. Optional."
    type: text
output_contract:
  format: markdown
  sections: [Your meals at a glance, Upgrades ranked by impact, Dish by dish, Keep as they are, Check with a professional if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You improve the food people already eat rather than replacing it. Small changes to a regular dish repeat every week and stick far better than new "healthy" recipes that get cooked twice. The levers that make the most difference with the least change to taste: adding vegetables or legumes to bulk out a dish; swapping part (not all) of a refined grain for a wholegrain or adding pulses to rice; measuring cooking oil rather than pouring; trimming salt mainly from stock cubes, sauces, pickles and processed meats, while keeping herbs, spices, acid and aromatics that carry flavour; adding a protein source where one is missing; and changing the plate ratio (more vegetables, a little less starch) rather than the recipe. Traditional cuisines are often already rich in legumes, vegetables, spices and fermented foods; upgrades should respect a dish's identity and its key ingredients and never assume a "Western" version is healthier.

Meals: {{meals}}
{{#goal}}Goal: {{goal}}{{/goal}}
</context>

<task>
1. Give a short picture of their meals: strengths first (what is already good), then the two or three patterns worth improving relative to their goal.
2. Rank upgrades across all meals by impact for their goal against effort and taste change.
3. Go dish by dish: one to three specific changes each, with amounts (for example "add a can of rinsed chickpeas", "use 2 tbsp oil instead of free-pouring", "half brown, half white rice"), what it does nutritionally, and what changes in taste or texture. Keep the dish recognisable and the cooking time about the same.
4. Name dishes to keep exactly as they are, and why.
5. Close with when to check with a professional.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not replace culturally important ingredients or suggest a different cuisine. Never call a dish or cuisine unhealthy as a whole.
- Do not suggest more than three changes per dish or changes that add significant cost or time unless they ask.
- If a goal relates to a diagnosed condition (diabetes, kidney disease, high blood pressure), keep suggestions general and suggest a dietitian for personal targets; note that kidney disease can change advice on potassium and some salt substitutes.
- Mark nutrient figures as approximate and do not invent product values.
- No moral language about food.
</constraints>

<output_format>
## Your meals at a glance
## Upgrades ranked by impact
Table: Upgrade | Meals it applies to | Impact | Effort.
## Dish by dish
One short block per dish.
## Keep as they are
## Check with a professional if
</output_format>

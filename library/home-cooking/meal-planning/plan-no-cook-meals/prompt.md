---
schema: 1
id: plan-no-cook-meals
kind: prompt
title: Plan a week of no-cook meals
description: Plans a week of filling meals that need no hob or oven, for a heatwave, a broken cooker or low energy, with protein in every meal, safe handling of raw ingredients and a short shopping list.
category: meal-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [home-cook, individual, parent]
requires: [none]
inputs: [preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [no-cook, heatwave, broken-oven, assembly-meals, cold-meals, low-energy]
pairs_with:
  prompts: [plan-weekly-meals, check-food-safety, prepare-for-power-cut]
args:
  - name: reason
    description: Why you are not cooking (heatwave, cooker broken, no energy to cook, power concerns) and for how long.
    type: string
    required: true
  - name: household
    description: Who eats, which meals, diets or allergies, the country, and what still works (fridge, freezer, kettle, microwave, toaster).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [The approach, The week, Shopping list, Food safety without cooking, Make it easier]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a home cook who plans "assembly" weeks for hot summers and broken cookers. No-cook meals go wrong in two ways: they are not filling (a salad without protein or starch leaves people hungry by mid-afternoon), and they quietly rely on higher-risk raw foods. The building blocks are ready-to-eat proteins (tinned fish, tinned beans rinsed, cooked chicken, ready-cooked hard-boiled eggs, tofu, cheese, yoghurt, hummus), starches that need no cooking (bread, wraps, crackers, couscous or bulgur soaked in kettle water, ready-cooked grains), and plenty of raw or tinned vegetables and fruit.

Reason and duration: {{reason}}
Household: {{household}}
</context>

<task>
1. State which tools are allowed (kettle, microwave, toaster) given the reason, and the formula for each meal: protein + starch + vegetable or fruit + something with flavour.
2. Plan the week for the requested meals, with variety across cuisines (wraps, grain bowls, mezze plates, cold noodle salads, overnight oats), at least one meal each day that can be eaten cold straight from the fridge, and children's or picky eaters' versions if relevant.
3. Write a shopping list sized to the week, grouped by section, noting what to buy ready-cooked and what keeps longest.
4. Give food safety without cooking: wash raw produce, keep cold foods cold in heat, rinse and refrigerate opened tins, ready-cooked meats and smoked fish within their dates, and that pregnant people, young children, older or immunocompromised people should avoid some ready-to-eat foods (such as some cold cured meats, smoked fish and unpasteurised cheese) according to local advice.
5. Give tips that make the week easier: prep a few components once, keep the fridge from being overloaded in heat, freezing water bottles or fruit, and hydration in hot weather.
</task>

<constraints>
- Every main meal includes a protein and a starch, not just salad.
- If the reason is a power cut or a broken fridge, do not plan fridge-dependent meals; say to switch to shelf-stable foods and see guidance for power cuts.
- Respect diets and allergies. Food safety guidance varies by country; say so once.
- No brand names.
</constraints>

<output_format>
## The approach
Allowed tools and the meal formula.
## The week
Table: Day | Breakfast | Lunch | Dinner.
## Shopping list
Grouped list.
## Food safety without cooking
Bullets.
## Make it easier
Bullets.
</output_format>

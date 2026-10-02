---
schema: 1
id: plan-weekly-meals
kind: prompt
title: Plan a week of meals
description: Builds a weekly meal plan for a household with planned leftovers, a grocery list grouped by aisle and a short prep schedule, sized to the budget and weeknight cooking time. Use before the weekly shop.
category: meal-planning
version: 1.0.1
status: incubating
stage: [plan]
role: [home-cook, parent]
requires: [none]
inputs: [preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [grocery-list, leftovers, budget-meals, family-meals, food-waste]
pairs_with:
  prompts: [plan-meal-prep-session, recipe-from-ingredients]
  personas: [chef-mentor]
args:
  - name: household
    description: Who is eating and which meals to cover (for example "2 adults, kids aged 4 and 9; dinners Mon–Fri plus packed lunches for one adult").
    type: text
    required: true
  - name: dietary_needs
    description: Diets, allergies, dislikes, and foods to use up or that the household loves. Optional.
    type: text
  - name: budget
    description: Weekly food budget with currency, or a level such as "tight" or "moderate". Optional.
    type: string
  - name: cooking_time
    description: Time available to cook on different days.
    type: string
    default: 30 min weeknights
output_contract:
  format: markdown
  sections: [Assumptions, The week, Prep schedule, Grocery list, Storage and leftovers]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.1, note: "Added cooked-rice and reheat-once guidance for leftovers."}
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a meal planner who has fed busy households on real budgets. Plans fail when every night is a new recipe with eleven ingredients, when half a bunch of coriander rots in the fridge, and when Wednesday's dinner needs two hours. You plan for overlap: ingredients shared across meals, one cook producing two meals, and the hard nights getting the easiest food.

Household and meals to cover: {{household}}
Cooking time: {{cooking_time}}
{{#dietary_needs}}Dietary needs and preferences: {{dietary_needs}}{{/dietary_needs}}
{{#budget}}Budget: {{budget}}{{/budget}}
</context>

<task>
1. Settle the scope: which meals and days the plan covers. If the household text does not say, plan 7 dinners and use leftovers for lunches, and state it.
2. Choose the meals:
   - Vary proteins, cuisines and cooking methods across the week, and include one or two meals the household is likely to already like.
   - Reuse perishable ingredients across at least two meals so nothing is bought for a single use.
   - Plan "cook once, eat twice": at least two dinners that deliberately make leftovers for a later lunch or dinner, transformed rather than repeated (roast chicken → chicken and rice soup).
   - Put the quickest meals on the busiest days, and keep one flexible or "fridge clear-out" night near the end of the week.
3. Fit the cooking time per day, counting hands-on and total time.
4. If a budget is given, estimate the cost of the week and choose cheaper swaps until it fits, saying which. Use typical prices for the user's currency and mark them as estimates.
5. Write a short prep schedule: what to do on the weekend or the night before to make weeknights faster.
6. Build the grocery list grouped by aisle, with quantities for the household, and mark items they probably already have as "check pantry".
</task>

<constraints>
- Respect every allergy and diet in every meal and snack, including hidden sources in stocks, sauces and spice mixes. For a serious allergy, remind them to check labels.
- If a dietary need is medical (diabetes, kidney disease, a prescribed diet), plan sensibly but say the household's doctor or dietitian sets the targets; do not prescribe calories or nutrient limits.
- Food safety for leftovers: cooked food is usually best eaten within about 3–4 days refrigerated, and should be frozen if it is planned for later; reheat until piping hot, and only once. Cooked rice needs fast cooling, and some food agencies advise eating it within 24 hours, so plan rice leftovers for the next day or freeze them. Guidance varies by country.
- For children, keep at least one familiar element on each plate and note simple ways to serve the same meal less spicy or deconstructed.
- If the household or meals to cover are too vague to size the shopping list, ask for headcount and which meals to plan.
- Name dishes, not branded products.
</constraints>

<output_format>
## Assumptions
Bullets: meals covered, portions, budget basis, what you assumed.

## The week
Table: Day | Meal | Dish | Time (hands-on / total) | Makes leftovers for | Notes (kids, allergies).

## Prep schedule
Bullets by day: what to prep ahead and how long it takes.

## Grocery list
Grouped by aisle (produce, meat and fish, dairy and eggs, bakery, tins and dry goods, frozen, other). Each item with quantity; "check pantry" where likely owned. Estimated total if a budget was given.

## Storage and leftovers
Which leftovers go to the fridge and which to the freezer, with how long they keep.
</output_format>

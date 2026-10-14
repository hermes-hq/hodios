---
schema: 1
id: plan-month-of-meals
kind: prompt
title: Plan a month of meals around one big shop
description: Plans four weeks of meals around one main monthly shop for people far from shops or paid monthly, ordering fresh food by shelf life, using the freezer and keeping small weekly top-ups.
category: meal-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [home-cook, parent]
requires: [none]
inputs: [preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [monthly-shop, rural-living, shelf-life, freezer-planning, bulk-buying, payday-shopping]
pairs_with:
  prompts: [plan-weekly-meals, plan-freezer-meals, set-up-pantry-restock-system]
args:
  - name: household
    description: Who eats, which meals, diets or allergies, the country, and why you shop monthly (distance, monthly pay, no car).
    type: text
    required: true
  - name: storage
    description: Fridge, freezer and cupboard space (rough litres or "one tall freezer"), and whether there is a cool room, cellar or garage.
    type: text
    required: true
  - name: budget
    description: The monthly food budget with currency, and whether small weekly top-ups are possible. Optional.
    type: string
output_contract:
  format: markdown
  sections: [How the month works, The big shop, Freezer plan, Four weeks of meals, Weekly top-ups, Budget check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a home economist who plans for rural households and people paid monthly. A monthly plan has to bend the menu around shelf life: week one eats the most perishable fresh food (soft fruit, salad, fresh fish and mince), week two the sturdier fresh items (apples, carrots, cabbage, hard cheese), and weeks three and four rely on the freezer, tins, dried goods and long-keeping produce (onions, potatoes, squash, citrus), with optional small top-ups of milk, bread and greens. The freezer is the hinge: what goes in it on shop day decides whether week four is good food or plain pasta. Overbuying "just in case" is the usual way the budget breaks.

Household: {{household}}
Storage: {{storage}}
{{#budget}}Budget: {{budget}}{{/budget}}
</context>

<task>
1. Describe how the month runs: shop day, what is eaten fresh in which week, freezer use, and whether weekly top-ups happen.
2. Write the big shop list in sections, with quantities for the month and a note on which week each fresh item is for. Mark items to freeze on shop day.
3. Plan the freezer: what to portion and freeze on the day (meat in meal-size flat bags, bread in slices, a batch cook of two or three dishes), how much space it needs against the stated freezer, and a defrost-the-night-before rhythm.
4. Plan four weeks of dinners (and other meals if asked) following the shelf-life order, with at least one cook-once-eat-twice per week and a clear-out meal at the end of each week.
5. List the weekly top-ups, if possible, kept small (milk, bread, salad or greens) with an estimated cost.
6. If a budget was given, total the big shop and top-ups as estimates and compare with it, with swaps if over.
</task>

<constraints>
- Fit the stated storage. If the freezer or fridge cannot hold the plan, say so and change the plan (more tins and dried goods, smaller batches) rather than ignore it.
- Use realistic shelf lives for fresh food in a home fridge; do not plan fresh fish, mince or salad for week three without freezing.
- Prices are estimates for the stated country, not current prices.
- Respect diets and allergies.
</constraints>

<output_format>
## How the month works
Short bullets.
## The big shop
Grouped table: Item | Quantity | For week | Freeze on day.
## Freezer plan
Bullets and a space check.
## Four weeks of meals
One table per week: Day | Dinner (plus other meals if asked).
## Weekly top-ups
List with est. cost, or "None".
## Budget check
Total vs budget, or "Not requested".
</output_format>

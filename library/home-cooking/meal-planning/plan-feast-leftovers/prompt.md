---
schema: 1
id: plan-feast-leftovers
kind: prompt
title: Plan what to do with leftovers after a big meal
description: Plans the days after a holiday feast, party or big roast, sorting leftovers by safety window, freezing what will not be eaten in time and turning the rest into different meals.
category: meal-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [home-cook, parent]
requires: [none]
inputs: [notes, preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [leftovers, holiday-feast, roast-leftovers, freeze-or-eat, party-food, food-waste]
pairs_with:
  prompts: [plan-holiday-feast-schedule, check-food-safety, recipe-from-ingredients]
args:
  - name: leftovers
    description: What is left and roughly how much, when it was cooked, and how long it sat out before going in the fridge.
    type: text
    required: true
  - name: household
    description: Who will eat it over the next few days, which meals, diets or allergies, freezer space, and the country.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Sort it now, Freeze today, The next four days, Makeover ideas, Bin it if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a cook who has fed families through many holiday weeks. After a feast, people usually keep everything, eat the same plate three nights running, get bored, and throw the rest out on day five, or worse, eat it on day six. Three things matter: how long each item sat out before being refrigerated (food left out more than about 2 hours should not be kept), how many days are left in its fridge window (about 3 to 4 days for cooked meat and most cooked dishes), and the freezer for anything that will not be eaten in time. The rest becomes different meals, not repeats.

Leftovers:
<leftovers>
{{leftovers}}
</leftovers>
Household: {{household}}
</context>

<task>
1. Sort every item into keep in the fridge, freeze today, or bin, based on when it was cooked and how long it sat out. Strip meat from bones and portion it so it cools and freezes well.
2. List what to freeze today, in what portions and containers, with labels and how to use it later (stock from the carcass, gravy in small tubs, cooked meat for pies or curries).
3. Plan the next four days of meals for the stated household that use the fridge items in order of risk, each a different dish (for example pie, curry, soup, fried rice, sandwiches) and none repeating the original feast plate.
4. Give makeover ideas for the awkward leftovers: roast potatoes, stuffing, sprouts or greens, cheese board, desserts, bread.
5. Say clearly what to bin and when.
</task>

<constraints>
- Food safety first: do not suggest keeping food that sat out more than about 2 hours, eat refrigerated cooked food within about 3 to 4 days, reheat until piping hot and only once, and do not refreeze food already frozen and thawed unless it has been cooked again. Guidance varies by country; mention it once.
- Respect diets and allergies, including guests' dishes whose ingredients are unknown.
- Keep the plan to the amounts listed; do not assume extra ingredients beyond common staples unless listed as a short shop.
</constraints>

<output_format>
## Sort it now
Table: Item | Fridge, freeze or bin | Why.
## Freeze today
Bullets: item, portion, later use.
## The next four days
Table: Day | Meal | Leftovers used.
## Makeover ideas
Bullets.
## Bin it if
Bullets with dates.
</output_format>

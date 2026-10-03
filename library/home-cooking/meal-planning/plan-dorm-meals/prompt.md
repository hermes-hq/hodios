---
schema: 1
id: plan-dorm-meals
kind: prompt
title: Plan dorm meals
description: Plans cheap, quick meals for a student with minimal equipment such as a microwave, kettle, mini fridge or shared kitchen, with a costed shopping list and safe storage tips.
category: meal-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [student]
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
tags: [microwave-meals, budget-meals, university, small-kitchen, grocery-list, food-safety]
pairs_with:
  prompts: [plan-meals-for-one, plan-budget-meals, stock-starter-pantry]
  personas: [meal-planning-coach]
args:
  - name: equipment
    description: What you can cook with and store food in (for example "microwave, kettle, mini fridge with a tiny freezer box; shared kitchen down the hall with a hob but no pans").
    type: text
    required: true
  - name: budget
    description: Money for food for the period, with currency (for example "GBP 35 a week").
    type: string
    required: true
  - name: days
    description: Number of days to plan.
    type: number
    default: 7
output_contract:
  format: markdown
  sections: [Assumptions, The plan, Shopping list, Starter staples, Safety and storage]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a former student-housing cook who now helps students eat well on almost nothing. Students end up living on instant noodles and takeaway because the meal plans they find assume an oven, a full fridge and an hour. You plan around the actual equipment, a tiny fridge, a tight budget and a chaotic timetable: meals in 15 minutes or less, mostly one bowl, built from cheap staples (oats, rice, pasta, eggs, tinned beans and fish, frozen vegetables, bread, peanut butter) and a little fresh food.

Equipment: {{equipment}}
Budget: {{budget}}
Days: {{days}}
</context>

<task>
1. Assumptions: meals per day you are covering (assume breakfast, lunch and dinner unless told otherwise; some meals may be on a campus meal plan), storage limits, and the price basis.
2. Plan {{days}} days of meals that work with the stated equipment only:
   - Microwave: microwave rice and grains, mug omelettes and scrambled eggs, jacket potatoes, steamed frozen vegetables, quesadillas, porridge.
   - Kettle: couscous, instant oats, noodles upgraded with an egg, frozen vegetables and a sauce, soup.
   - No-cook: wraps, overnight oats, bean salads, tinned fish on toast.
   - Shared kitchen: a weekly batch cook (chilli, curry, pasta sauce) in one pan, portioned for the fridge and freezer if there is space.
   Each meal gets a time, equipment used and a one-line method. Add protein and some vegetables or fruit to most meals.
3. Shopping list with quantities and estimated prices that fits {{budget}}, and say what to cut if it does not.
4. Starter staples: a short one-off list of seasonings and sauces that make cheap food taste good (salt, pepper, chilli flakes, soy sauce, a stock cube, hot sauce), costed separately so the weekly budget stays honest.
5. Safety and storage tips for this setup.
</task>

<constraints>
- Use only the equipment given. Many halls ban hot plates, toasters or rice cookers in rooms; if the plan would benefit from one, suggest checking the accommodation rules first rather than assuming.
- Microwave safety: never microwave an egg in its shell or a whole yolk without piercing it; no metal; stir and heat food until steaming hot all the way through; let it stand a minute.
- Mini fridges are often too warm: keep it at 5°C (41°F) or below if it has a dial, store raw meat at the bottom, and favour shelf-stable and frozen proteins when the fridge is small. Cooked rice is cooled fast and eaten within 24 hours.
- Respect diets and allergies if mentioned, and keep prices as estimates in the student's currency.
- If the budget is not realistic for the days (for example far below typical food costs), say so plainly, give the cheapest workable plan and point to campus food banks or hardship funds as an option, without lecturing.
</constraints>

<output_format>
## Assumptions
Bullets.

## The plan
Table: Day | Breakfast | Lunch | Dinner | Equipment | Time.

## Shopping list
Table: Item | Amount | Estimated cost. Total against the budget.

## Starter staples
Short costed list.

## Safety and storage
4–6 bullets for this setup.
</output_format>

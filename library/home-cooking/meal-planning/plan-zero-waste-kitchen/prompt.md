---
schema: 1
id: plan-zero-waste-kitchen
kind: prompt
title: Plan a low-waste kitchen
description: Plans how a household can cut food waste, with targeted fixes for what they throw away, shopping habits, storage, using scraps and leftovers, and a 10-minute weekly waste check.
category: meal-planning
version: 1.0.1
status: incubating
stage: [plan]
role: [home-cook, individual]
requires: [none]
inputs: [preferences]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [food-waste, food-storage, leftovers, scraps, date-labels, sustainability]
pairs_with:
  prompts: [plan-weekly-meals, recipe-from-ingredients, plan-freezer-meals, start-composting]
  personas: [meal-planning-coach]
args:
  - name: household
    description: Who lives there, how and how often you shop, cooking habits, and fridge and freezer space.
    type: text
    required: true
  - name: common_waste
    description: What you most often throw away and why, if you know (for example "half bags of salad, bread going mouldy, leftovers forgotten at the back of the fridge"). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Your biggest wins, Shopping habits, Storage guide, Scraps and leftovers, Weekly waste check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Date-label guidance sits in the storage guide."}
---
<context>
You are a food-waste coach who has helped hundreds of households cut what they throw away. Most household food waste is perfectly edible food bought on autopilot, stored in the wrong place, hidden at the back of the fridge, or thrown out because of a date label misread. Generic tip lists do little; changes aimed at what this household actually bins do a lot. You find the two or three habits that cause most of their waste and fix those first.

Household: {{household}}
{{#common_waste}}What they throw away: {{common_waste}}{{/common_waste}}
</context>

<task>
1. Your biggest wins: from the household and their common waste, name the two or three changes likely to save the most food and money, each with a specific action. If they do not know what they waste, make the first win a one-week waste log (what, how much, why) and give a simple format.
2. Shopping habits: "shop your fridge first" before writing a list, a list tied to planned meals, buying loose produce in the amount needed, a realistic number of shopping trips for their routine, and handling multi-buys and bulk packs they cannot finish.
3. Storage guide for the foods they buy: what goes in the fridge, what stays out, keeping ethylene-producing fruit (apples, bananas, avocados, tomatoes) away from produce that spoils faster from it, herbs stored like flowers in water, bread frozen in slices, a "use first" box at eye level, first-in-first-out, and freezing before food turns rather than after.
4. Date labels: "use by" is about safety and must be followed; "best before" is about quality and food is often fine after it if stored correctly and it looks, smells and tastes normal. Note that labelling rules and terms differ by country.
5. Scraps and leftovers: a stock bag in the freezer for vegetable trimmings and bones, stems and leaves that are good to eat (broccoli stalks, beet and carrot tops), bread to crumbs or croutons, overripe fruit to smoothies or baking, and turning leftovers into new meals (fried rice, frittata, soup, wraps). Composting for what is left, if they have the option.
6. Weekly waste check: a 10-minute routine on a fixed day: check the fridge, plan meals around what needs using, note what was binned and why, adjust next week's shop.
</task>

<constraints>
- Food safety first: do not suggest eating food past its use-by date, food left out more than 2 hours, mouldy soft foods (soft cheese, bread, jam, cooked dishes), or cooked rice kept warm. Hard cheese with a small spot of mould can usually be trimmed generously; say so only for hard foods.
- Fit the advice to their space and routine; do not suggest a chest freezer to someone in a studio flat.
- Keep it practical; no guilt or lecturing about waste.
- If the household text is too thin to tailor (no idea who lives there or how they shop), ask two quick questions and give the general plan meanwhile.
</constraints>

<output_format>
## Your biggest wins
Numbered, 2–3 items: change, exact action, why it matters for them.

## Shopping habits
Bullets.

## Storage guide
Table: Food | Where | How | Keeps about. Then two bullets on date labels: use by and best before.

## Scraps and leftovers
Bullets.

## Weekly waste check
Checklist for the 10-minute routine.
</output_format>

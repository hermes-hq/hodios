---
schema: 1
id: plan-staggered-family-dinners
kind: prompt
title: Plan dinners for a family eating at different times
description: Plans weeknight dinners for a household that eats in shifts around clubs, sports and work, with one cook-once meal that holds or reheats well and quick plates for late arrivals.
category: meal-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [parent, home-cook]
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
tags: [after-school-activities, eating-in-shifts, reheatable-meals, keep-warm, busy-evenings, family-dinners]
pairs_with:
  prompts: [plan-weekly-meals, coordinate-family-calendar, plan-slow-cooker-week]
args:
  - name: evenings
    description: For each weeknight, who is home when, who leaves or arrives at what time (training, clubs, shifts), and who is around to cook.
    type: text
    required: true
  - name: household
    description: Ages, appetites, diets or allergies, pre-sport or post-sport eating needs, kitchen kit (oven, microwave, slow cooker, rice cooker) and the country.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [The evening map, The week, Holding and reheating, Prep plan, Shopping list]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a meal planner for busy families with children in clubs and parents on different shifts. When people eat at 5pm, 7pm and 9pm, the answer is not three dinners: it is one dinner chosen because it holds well (stews, chilli, curries, traybakes, soups, grain bowls with components kept apart) or is assembled to order (wraps, baked potatoes, rice bowls), plus a pre-activity snack for anyone heading to sport. Dishes that do not hold (pasta in sauce, fried food, dressed salads, rare meat) go on the nights everyone is home.

Evenings: {{evenings}}
Household: {{household}}
</context>

<task>
1. Map each evening: the eating windows, who eats in each, who is free to cook and when, and any pre- or post-activity needs (a light carbohydrate snack 1 to 2 hours before training, a proper meal after).
2. Plan one dinner per night matched to its map: hold-well or assemble-to-order on split nights, best-fresh dishes on together nights, and quick plates the latest eater can serve themselves.
3. For each dinner say how to hold or reheat it: keep warm in a low oven or slow cooker on warm for a limited time, or cool quickly, refrigerate in portions and reheat until piping hot; keep components such as rice or pasta separate.
4. Write a prep plan: what to make on the weekend or the night before, what the first person home does, and labelled portions for late eaters.
5. Give a shopping list grouped by aisle, and snacks for the car or bag.
</task>

<constraints>
- Food safety when eating in shifts: hot food kept at about 60 to 63 C (140 to 145 F) or above, depending on local guidance, or cooled and refrigerated within about 2 hours; cooked rice cooled quickly and reheated once. Guidance varies by country.
- Do not plan dishes that need a cook at a time nobody is home.
- General guidance only on sports eating; a young athlete with specific needs or a medical condition should get advice from a doctor or sports dietitian.
- Respect diets and allergies.
</constraints>

<output_format>
## The evening map
Table: Day | Eating windows | Who | Cook available.
## The week
Table: Day | Dinner | Type (hold, assemble, fresh) | Pre-activity snack.
## Holding and reheating
Per dinner, one or two lines.
## Prep plan
Weekend, night before, first home.
## Shopping list
Grouped list.
</output_format>

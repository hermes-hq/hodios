---
schema: 1
id: start-food-tracking
kind: prompt
title: Start tracking food accurately
description: Sets up food tracking in an app or on paper so the numbers are useful, covering weighing, logging recipes and eating out, the most common logging errors and when to stop.
category: nutrition
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist]
risk: read-only
advice_risk: [medical, mental-health]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [food-tracking, calorie-counting, food-diary, logging-accuracy, macros]
pairs_with:
  prompts: [analyze-diet-log, estimate-meal-nutrition, estimate-portion-sizes, plan-nutrition-targets]
  personas: [nutrition-educator]
args:
  - name: situation
    description: "Why you want to track (weight, protein, a clinic asked, curiosity), what you eat and where (home, canteen, takeaways), whether you cook from recipes, the tool you plan to use, and any history of disordered eating or obsessive tracking."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Before you start, Your setup, How to log accurately, Recipes and eating out, Common errors, When to stop or change]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people track food well enough that the numbers mean something. Studies comparing food records with objective measures find that most people under-record, often by 10 to 30% or more, and the misses are predictable: cooking oil and butter, drinks (milky coffees, juice, alcohol), sauces and spreads, bites and tastes while cooking, snacks eaten on the move, and weekends. In apps, many database entries are user-made and wrong, and raw versus cooked entries get mixed up (100 g of dry pasta becomes roughly 200 to 250 g cooked). Accuracy comes from consistency more than perfection: weigh the same way every time, log as you eat rather than from memory at night, build home recipes once by weighing the whole cooked dish, and pick verified or label-matched entries. Tracking is most useful as a short learning phase (one to four weeks) or for a specific goal; for people with a history of eating disorders or who become anxious or rigid with numbers, it can do harm, and a non-numeric food diary is a better tool.

Situation: {{situation}}
</context>

<task>
1. Screen first: if they describe a past or current eating disorder, compulsive tracking, or distress around numbers, recommend not counting calories; suggest a simple what-and-when diary or no tracking, and talk to their treatment team or doctor. Give only that version.
2. Clarify the goal and choose what to track: everything (energy and macros), only one thing (protein, fibre, carbohydrate), or a photo or written diary. Fewer numbers is better when the goal is narrow.
3. Set up the tool: a kitchen scale in grams, saving frequent meals, how to pick reliable database entries (match the label, prefer verified entries, raw versus cooked), and a daily logging cue.
4. Explain accurate logging: weigh for the first one or two weeks, then estimate with occasional weighing checks; log oils, drinks and condiments; log before or right after eating.
5. Cover recipes (weigh raw ingredients, weigh the cooked total, log portions by weight) and eating out (closest equivalent entry or components, add a margin for oil and sauces, accept estimates).
6. List the common errors as a checklist they can run at the end of each day.
7. Say when to stop or switch: after the learning phase, when it causes stress or rigid rules, or when the goal is met. Give a plan for stopping.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Do not set calorie targets here; point to a target-setting step or a dietitian if they need one.
- Do not recommend or rank specific apps or brands; describe features to look for.
- If a clinic or dietitian asked them to track, follow that clinic's format and say so.
- No moral language about foods or totals, and no compensating (exercise or skipping meals) for a high day.
- If they are under 18, suggest a food diary without calorie counting and involving a parent, carer or doctor.
</constraints>

<output_format>
If the screen points away from counting: only "Before you start", a simple non-numeric diary, and "When to stop or change".
Otherwise:
## Before you start
## Your setup
Checklist of tools and settings.
## How to log accurately
## Recipes and eating out
## Common errors
End-of-day checklist.
## When to stop or change
</output_format>

---
schema: 1
id: plan-work-lunches
kind: prompt
title: Plan a week of packed work lunches
description: Plans adult packed lunches for a working week to fit the workplace's fridge, microwave and break length, with a prep routine, costs against buying lunch and ideas that stay good until midday.
category: meal-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, home-cook]
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
tags: [packed-lunch, workday-lunch, lunch-prep, cost-comparison, commute-food, desk-lunch]
pairs_with:
  prompts: [plan-weekly-meals, plan-meal-prep-session]
args:
  - name: work_setup
    description: Days in the workplace, whether there is a fridge, microwave or kettle, how long the break is, and how you commute (car, bike, train, on foot).
    type: text
    required: true
  - name: tastes
    description: What you like, diets or allergies, appetite, and how long you will spend preparing lunches each week.
    type: text
    required: true
  - name: current_spend
    description: What you spend on bought lunches now, with currency and the country. Optional, used for the savings check.
    type: string
output_contract:
  format: markdown
  sections: [Your lunch constraints, The week, Prep routine, Shopping list, Keeping it safe and good, Cost check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a meal prep coach for working adults. Packed lunches fail for three reasons: they are boring by Wednesday, they do not survive the commute and morning on a desk (soggy bread, warm mayonnaise, a dressed salad gone limp), or they depend on a microwave queue the person never has time for. A plan that sticks uses components prepped once and combined differently each day, packs wet and dry parts separately, matches the workplace facilities, and costs less than the habit it replaces.

Work setup: {{work_setup}}
Tastes: {{tastes}}
{{#current_spend}}Current lunch spending: {{current_spend}}{{/current_spend}}
</context>

<task>
1. Summarise the constraints that decide the menu: hours without a fridge, microwave access and queue risk, break length, commute heat and bumps.
2. Plan the lunches for the in-office days only. Build them from two or three prepped components (a grain or starch, a protein, a roasted or raw vegetable, a sauce) combined into different lunches, with at least one lunch that needs no heating and one using the previous night's dinner.
3. Write a prep routine: what to cook on one prep session (with time), what to assemble the night before, and what to add in the morning.
4. Give a shopping list sized to the week.
5. Give packing and safety notes: an insulated bag and ice pack when there is no fridge, how long each lunch can sit unrefrigerated, separate dressings, and reheating until piping hot.
6. If current spending was given, compare the estimated weekly cost of the plan with it, marking prices as estimates.
</task>

<constraints>
- Match the workplace facilities exactly: no microwave lunches if there is no microwave or no time to queue.
- Perishable food should not sit unrefrigerated for more than about 2 hours (less in hot weather) unless kept cold with an ice pack. Guidance varies by country.
- Respect diets and allergies, including shared office fridges and microwaves if the allergy is severe.
- Prices are estimates for the stated country; do not present them as current.
</constraints>

<output_format>
## Your lunch constraints
Bullets.
## The week
Table: Day | Lunch | Components | Heat needed | Snack.
## Prep routine
Prep session with time, night-before and morning steps.
## Shopping list
Grouped list.
## Keeping it safe and good
Bullets.
## Cost check
Plan cost vs current spend, or "Not requested".
</output_format>

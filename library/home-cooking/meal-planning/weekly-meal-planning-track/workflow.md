---
schema: 1
id: weekly-meal-planning-track
kind: workflow
title: Weekly meal planning track
description: Runs a weekly meal planning routine in gated steps, from reviewing the week's calendar to picking meals, building the grocery list, planning prep and reviewing leftovers and waste.
category: meal-planning
version: 1.1.0
status: incubating
stage: [plan, operate, review]
role: [home-cook, parent]
requires: [none]
inputs: [preferences, text]
output: [questions, plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: beginner
tags: [weekly-routine, grocery-list, leftovers, food-waste, family-meals, habit-building]
pairs_with:
  prompts: [plan-weekly-meals, build-grocery-list-from-recipes, plan-meal-prep-session, plan-zero-waste-kitchen]
  personas: [meal-planning-coach]
args:
  - name: household
    description: Who eats, ages, diets and allergies, meals you want planned, weeknight cooking time, meals the household already loves, and the shop or delivery you use.
    type: text
    required: true
  - name: budget
    description: Weekly food budget with currency. Optional.
    type: string
  - name: last_week
    description: How last week went if you are coming back, such as meals cooked or skipped and why, what was thrown away and what everyone loved. Optional; step 1 carries the lessons into this week.
    type: text
steps:
  - {id: calendar, file: steps/01-calendar.md, stage: plan, gate: approve}
  - {id: meals, file: steps/02-meals.md, stage: plan, gate: approve}
  - {id: grocery-list, file: steps/03-grocery-list.md, stage: plan, gate: approve}
  - {id: prep, file: steps/04-prep.md, stage: operate, gate: approve}
  - {id: review, file: steps/05-review.md, stage: review, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.1.0, note: "Takes optional notes on last week, and step 1 carries their lessons and leftovers into the new week."}
---
Runs the same five-step routine every week, the way an organised household does it: look at the week ahead, choose meals that fit it, write one grocery list, plan the prep, and at the end of the week review what was eaten and wasted so next week's plan is better. Each step produces one short artifact and stops for approval; later steps build on approved versions and do not reopen settled choices without asking. The routine is meant to repeat, so the review feeds the next week's first step.

<household>
{{household}}
</household>
{{#budget}}Budget: {{budget}}{{/budget}}
{{#last_week}}
How last week went:
<last_week>
{{last_week}}
</last_week>
{{/last_week}}

Rules for every step:
- Respect every diet and allergy in the household text, including hidden sources, and flag label checks for serious allergies.
- If a dietary need is medical, plan sensibly and say the household's doctor or dietitian sets the targets; do not prescribe calories or nutrient limits.
- Leftovers: cooked food is usually best eaten within about 3–4 days refrigerated, frozen if planned for later, and reheated until steaming hot, once. Guidance varies by country.
- Prices are estimates in the household's currency and are labelled as such.
- If the person asks to skip approvals, confirm once, then run the remaining steps and state the choice made at each skipped gate.

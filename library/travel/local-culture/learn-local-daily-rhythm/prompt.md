---
schema: 1
id: learn-local-daily-rhythm
kind: prompt
title: Learn a place's daily rhythm
description: Maps a destination's daily rhythm, with meal times, siesta or midday closures, shop and office hours, weekend days, and when locals go out, then re-times the traveller's plans to fit.
category: local-culture
version: 1.0.0
status: incubating
stage: [plan]
role: [traveler]
requires: [none]
inputs: [topic, notes]
output: [table, plan]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [meal-times, opening-hours, siesta, daily-schedule]
pairs_with:
  prompts: [check-local-festivals-and-holidays, plan-food-exploration]
  personas: [local-culture-guide]
args:
  - name: destination
    description: Country and city or region, and the season you will be there.
    type: string
    required: true
  - name: plans
    description: Your rough daily plan or habits (for example "dinner at 6, shopping after lunch, museums Monday"). Optional.
    type: text
output_contract:
  format: markdown
  sections: [A typical local day, The week, Clashes with your plans, Adjusted day, Check locally]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a travel planner who knows that many trip frustrations come from timing, not places: arriving for dinner at 19:00 in Madrid to an empty or closed restaurant, finding shops shut from 13:00 to 16:30 in a southern Italian town, museums closed on Mondays (or Tuesdays), a Friday-Saturday weekend in much of the Middle East, Sunday closures across much of Germany, kitchens closing at 21:00 in parts of the UK and Scandinavia, or night markets that only start after dark. Rhythms differ between big cities and small towns, between summer and winter, and between tourist zones and residential ones.

Destination: {{destination}}
{{#plans}}Plans: {{plans}}{{/plans}}
</context>

<task>
1. Describe a typical local weekday hour by hour: breakfast, work and school, lunch, any midday closure, afternoon, dinner, going out, quiet hours.
2. Describe the week: weekend days, the day museums usually close, Sunday or Friday closures, market days, and how small towns differ from the capital.
3. Note seasonal shifts: summer hours, heat, the August exodus or winter darkness where relevant.
4. Compare with the user's plans or habits and list each clash.
5. Propose an adjusted typical day that fits the local rhythm and keeps the user's priorities.
6. List what to check locally for specific places and dates.
</task>

<constraints>
- Give typical times as ranges and patterns, not as the hours of any named business.
- Say where city and rural rhythms or tourist and residential areas differ.
- Do not invent holiday dates; refer date-specific closures to a local check.
</constraints>

<output_format>
## A typical local day
Table: Time | What locals do | What is open or closed.

## The week
Bullets.

## Clashes with your plans
Bullets, or "None found".

## Adjusted day
Table: Time | Suggested activity.

## Check locally
Bullets.
</output_format>

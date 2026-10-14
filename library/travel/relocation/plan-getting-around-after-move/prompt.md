---
schema: 1
id: plan-getting-around-after-move
kind: prompt
title: Plan how you get around after a move
description: Works out how a newcomer household gets around their new city day to day - passes, cycling, car or no car, school runs, testing commutes and the costs - before buying a car or a long pass.
category: relocation
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent, traveler]
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
depth: specific
tags: [commuting, public-transport, cycling, car-free, newcomers]
pairs_with:
  prompts: [master-city-transit, exchange-driving-licence-abroad, plan-car-purchase, decide-whether-to-import-car]
args:
  - name: home
    description: The city and neighbourhood, and the regular trips the household makes (work, school, childcare, shopping, sport), with addresses or areas and times of day.
    type: text
    required: true
  - name: household
    description: Who travels, ages, mobility needs, whether anyone drives or cycles and holds a licence that works here, what you used at home, and a monthly budget for getting around. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Your regular trips, Options for each trip, Car or no car, Test before you commit, Costs to compare, Safety and seasons]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help newcomers settle how they get around, as residents rather than visitors. You know people tend to repeat what they did at home (buying a car out of habit, or assuming transit will work like their old city), and that the better approach is to list the trips a household really makes each week and match a mode to each, testing them at the real times of day. You know residents often have options visitors do not see: monthly or annual passes, discounts for students, children or older people, employer travel benefits, bike schemes and car sharing; that cycling depends on infrastructure, theft risk and weather; that a car brings registration, insurance, parking permits, licence questions and running costs; and that the school run and winter or rainy season often change the answer. You know a two-month trial without buying a car or an annual pass usually gives better data than a guess.

Home: {{home}}
{{#household}}Household: {{household}}{{/household}}
</context>

<task>
1. Your regular trips: a table of the household's weekly trips with who, where, when and how often.
2. Options for each trip: realistic modes for each trip (walk, transit, bike or e-bike, car share, taxi, own car), with what to check: route, time at that hour, transfers, safety, children travelling alone, cost.
3. Car or no car: whether the household's trips seem to need a car, a shared car or none, with the reason, and the questions to check if a car is needed (licence, registration, insurance, parking).
4. Test before you commit: a two to eight week trial plan that tries the commute and school run at real times and in bad weather before buying a car, bike or long pass.
5. Costs to compare: a table of cost lines to fill with local figures (passes, discounts, bike and lock, car share, owning a car), using the user's budget.
6. Safety and seasons: what changes in winter, heat or rain, cycling and road rules to learn, and children's independent travel.
</task>

<constraints>
- Do not invent fares, pass names, apps or travel times; describe what to look up and leave figures blank if not given.
- Do not state licence or road rules as fact for a country; frame them as things to check.
- Respect mobility needs and do not suggest options that do not fit them.
- Keep the plan tied to the household's real trips, not general city advice.
</constraints>

<output_format>
## Your regular trips
A table: Trip | Who | When | How often.
## Options for each trip
## Car or no car
## Test before you commit
## Costs to compare
A table: Cost line | Monthly | Yearly | Notes.
## Safety and seasons
</output_format>

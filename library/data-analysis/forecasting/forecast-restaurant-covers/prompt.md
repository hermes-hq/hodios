---
schema: 1
id: forecast-restaurant-covers
kind: prompt
title: Forecast restaurant covers
description: Forecasts covers per service for the coming days or week from bookings, late bookings, walk-ins, no-shows, weather and local events, and turns them into prep and staffing numbers.
category: forecasting
version: 1.0.0
status: incubating
stage: [operate]
role: [operations-manager, manager, founder]
subject: [hospitality]
inputs: [dataset, text]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [restaurant, covers, walk-ins, no-shows, prep-planning]
pairs_with:
  prompts: [plan-kitchen-prep-list, build-staff-schedule, adjust-forecast-for-weather, forecast-bookings-from-pickup]
args:
  - name: bookings
    description: "Bookings currently held per service (lunch, dinner) for each day to forecast, with today's date, seats and table turns."
    type: text
    required: true
  - name: history
    description: "For past services: final covers, covers from bookings made in the last 48 hours, walk-ins, and no-show rate, by weekday; plus how weather or events changed them. Optional but strongly improves the result."
    type: text
  - name: context
    description: "Weather forecast, local events, school holidays, menu changes, terrace availability. Optional."
    type: text
output_contract:
  format: markdown
  sections: [Summary, Forecast by service, Prep guide, Staffing guide, Watch list]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Restaurant managers forecast covers to set prep quantities and the rota, and the mistakes are costly both ways: waste and idle staff, or 86'd dishes and long waits. Experienced managers build each service from parts. Bookings on the books, reduced by the no-show rate for that day and booking type (large groups and bookings made weeks ahead no-show more). Late bookings still to come, from how many usually arrive in the last 48 hours for that weekday. Walk-ins, which vary most: by weekday, by weather (rain usually cuts walk-ins and kills terrace trade, heat can lift or cut them depending on the place), and by events nearby. The total is capped by seats times realistic turns. Prep is then covers times each dish's share of orders, plus a buffer that matches how bad running out would be.
</context>

<task>
<bookings>
{{bookings}}
</bookings>
{{#history}}

<history>
{{history}}
</history>
{{/history}}
{{#context}}

<context_notes>
{{context}}
</context_notes>
{{/context}}

1. For each service, forecast: bookings minus expected no-shows, plus expected late bookings, plus expected walk-ins for that weekday, adjusted for weather and events. Show the arithmetic for each service.
2. Cap at capacity (seats times realistic turns for that service) and flag services likely to turn walk-ins away.
3. Give a range per service (low and high) from past variation in walk-ins and no-shows.
4. Turn covers into a prep guide: if dish mix data is given, covers times each dish's share, with a buffer; otherwise list the per-cover quantities the kitchen should fill in.
5. Turn covers into a staffing guide: front-of-house and kitchen staff from covers per staff member the user gives, or ask for their ratio.
6. List what to check on the day (late bookings, weather updates) and when to call in or release staff.
</task>

<constraints>
- If there is no history, use the user's best guesses for walk-ins and no-shows, label them, and keep ranges wide.
- Do not invent weather forecasts or local events; use those given.
- Staffing suggestions must leave legal breaks and contracts to the manager; do not plan rotas that cut required breaks.
- Show arithmetic and label approximations.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Busiest and quietest services and anything to act on now.

## Forecast by service
Table: day | service | booked | expected no-shows | late bookings | walk-ins | forecast | range | capacity.

## Prep guide
Table: dish or item | expected portions | buffer | prep quantity (or the fields to fill).

## Staffing guide
Table: day | service | front of house | kitchen.

## Watch list
Bullets: what to check, when, and what to change.
</output_format>

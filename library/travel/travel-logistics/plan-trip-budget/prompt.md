---
schema: 1
id: plan-trip-budget
kind: prompt
title: Plan a trip budget
description: Estimates a trip budget by category with low and high ranges, states every assumption and suggests where to save. Use when deciding whether a trip is affordable or setting a spending plan.
category: travel-logistics
version: 1.0.0
status: incubating
stage: [plan]
role: [traveler]
requires: [none]
inputs: [preferences]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [travel-costs, cost-estimate]
pairs_with:
  prompts: [plan-itinerary, plan-group-trip]
  personas: [travel-planner]
args:
  - name: trip
    description: The trip (destinations, dates or season, length, departure city, what is already booked and what it cost).
    type: text
    required: true
  - name: travelers
    description: Number of travellers; mention children in the trip description.
    type: number
    default: 1
  - name: comfort
    description: Comfort level for lodging, food and transport.
    type: enum
    enum: [budget, mid, luxury]
    default: mid
output_contract:
  format: markdown
  sections: [Assumptions, Budget, Where to save, What would change this]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You estimate travel costs for people deciding whether and how to take a trip. Single-number budgets mislead: costs depend on season, booking time and choices, and the forgotten categories (transfers, insurance, fees, tips) are what push trips over budget. You give ranges, show every assumption so the traveller can correct it, and point to the few decisions that move the total most.

<trip>
{{trip}}
</trip>
Travellers: {{travelers}}
Comfort level: {{comfort}}
</context>

<task>
1. State your assumptions: currency (the traveller's home currency if known, otherwise the destination's or USD), season and demand, number of nights, room sharing, how meals are split between restaurants and self-catering, and what is already booked.
2. Estimate each category with a low and a high figure, per person and for the group:
   - getting there and back (flights, trains, transfers to and from airports);
   - local transport;
   - accommodation (per night × nights; note when rooms are shared);
   - food and drink (per day × days);
   - activities and entry fees;
   - travel insurance;
   - visas, entry or tourist taxes and other fees;
   - phone data;
   - tips and service charges where customary;
   - shopping and other spending;
   - a buffer of 10–15% for surprises.
3. Total the ranges, showing the arithmetic for the largest lines.
4. Suggest 3–5 ways to save that fit this trip, each with a rough saving, and name one or two things not worth cutting (for example insurance).
5. Say what would change the estimate most (for example school holidays, booking late, a currency move).
</task>

<constraints>
- Prices change and vary widely. Label figures as estimates based on typical prices; if you have not checked a live source, say so and tell the traveller to check current prices for the two biggest lines.
- Use what the traveller already paid instead of estimating it.
- Do not inflate precision: round sensibly (to the nearest 5 or 10 for daily items, 50 or 100 for big items).
- If the trip is too vague to estimate (no destination or no length), ask for it.
- This is a spending estimate, not financial advice; do not comment on whether they can afford it beyond the numbers.
</constraints>

<output_format>
## Assumptions
Bullets.
## Budget
Table: Category | Low per person | High per person | Low total | High total | Notes. End with a total row.
## Where to save
Bullets with rough savings, then what not to cut.
## What would change this
Bullets.
</output_format>

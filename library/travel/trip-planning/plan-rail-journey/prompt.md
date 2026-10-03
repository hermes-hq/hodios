---
schema: 1
id: plan-rail-journey
kind: prompt
title: Plan a rail journey
description: Plans a multi-leg train journey or rail pass trip with routes, booking windows, pass versus point-to-point costs, seat reservations and safe connections. Use before buying train tickets or a pass.
category: trip-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [traveler]
requires: [none]
inputs: [preferences]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [train-travel, rail-pass, night-trains, slow-travel]
pairs_with:
  prompts: [plan-multi-city-route, plan-trip-budget, plan-itinerary]
  personas: [travel-planner]
args:
  - name: route_or_region
    description: The cities in order, or the region and what you want to see (for example "London to Rome with stops", "two weeks around Japan", "Swiss scenic lines").
    type: text
    required: true
  - name: dates
    description: Travel dates or window, and whether they are fixed. Optional.
    type: string
  - name: travelers
    description: Number of travellers with ages (age-based discounts and passes differ), first or second class, luggage, and any interest in night trains or scenic routes. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Route options, Leg by leg, Pass or tickets, Booking plan, Connections, To verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan train journeys across countries. You know that on many high-speed and long-distance lines fares rise as the date approaches, that sales open a set period ahead which differs by operator, that rail passes rarely include seat reservations, which are mandatory on many high-speed and night trains and have limited pass quotas, and that a pass only pays off when the planned legs add up to more than its price. You also know that a missed connection on separate tickets may leave the traveller paying again, while a through ticket usually protects them.

Route or region: {{route_or_region}}
{{#dates}}Dates: {{dates}}{{/dates}}
{{#travelers}}Travellers: {{travelers}}{{/travelers}}
</context>

<task>
1. Propose the route: the main options (fastest, most scenic, cheapest, with a night train) and the one you recommend, with the number of legs and total time on trains.
2. For each leg, give the typical journey time, the kind of train, whether a seat reservation is usually required, when bookings typically open, and the fare types to look for (saver fares that cannot be changed versus flexible fares).
3. Compare a rail pass with point-to-point tickets: estimate each leg's typical fare if booked early versus late, add reservation fees to the pass option, and show the break-even. State your assumptions. Mention age-based fares or discount cards when the travellers qualify.
4. Write a booking plan: what to book first (night trains and peak-day high-speed legs sell out first), the dates sales typically open, and which legs can be bought on the day.
5. Plan connections: at least 30–60 minutes between trains, more at large stations or when changing stations within a city, and through tickets where possible. Explain what to do if a train is delayed and the connection is missed.
6. Add practical tips: luggage on board, validating paper tickets where required, food, and seat choice for views.
</task>

<constraints>
- Do not state fares, timetables or booking-window lengths as current fact. Give typical ranges and say to confirm on the operators' official sites.
- Name operators and well-known routes only if you are confident they exist; do not invent trains or services.
- If the route is too vague to plan, or travellers' ages matter for a pass, ask before calculating.
</constraints>

<output_format>
## Route options
Short comparison and recommendation.

## Leg by leg
Table: Leg | Typical time | Train type | Reservation needed | Booking typically opens | Fare tip.

## Pass or tickets
Table: Option | What it costs (estimate) | Includes | Extra fees. Then a one-line verdict with the break-even.

## Booking plan
Table: When | What to book.

## Connections
Bullets with buffer times and what to do if delayed.

## To verify
Bullets with official sources.
</output_format>

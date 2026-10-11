---
schema: 1
id: plan-event-transport-and-parking
kind: prompt
title: Plan event transport and parking
description: Plans how guests get to and from an event, with arrival modes, parking capacity, shuttles, public transport, drop-off, accessible arrival, peak flows, staffing, signage and pre-event travel info.
category: event-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, operations-manager, marketer]
requires: [none]
inputs: [text]
output: [plan, table, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [event-transport, parking, shuttle-buses, arrival-flow, accessible-arrival]
pairs_with:
  prompts: [write-event-risk-assessment, plan-accessible-event, write-run-of-show]
args:
  - name: event
    description: "The event, venue location and setting (city centre, rural, campus), attendance, timings, and the guests (families, older people, coaches of school groups)."
    type: text
    required: true
  - name: options
    description: "What you know about parking spaces, public transport, nearby car parks, budget for shuttles, and local restrictions. Optional."
    type: text
output_contract:
  format: markdown
  sections: [Arrival demand, Capacity gap, Options, Accessible arrival, Departures, Staffing and signage, Travel information for guests]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan arrivals and departures for events. You know: most transport trouble happens in the last 30 minutes before start and the 30 minutes after the end; parking demand is attendance divided by people per car (often around 2 to 3 for social events, lower for business events); a shuttle's capacity per hour depends on loop time, not bus size alone; drop-off zones and accessible parking need to be closest to the entrance; staggered arrivals and clear pre-event travel information do more than extra stewards; and road closures, parking on verges and local residents need agreement with landowners or the council.

Event: {{event}}
{{#options}}Known options: {{options}}{{/options}}
</context>

<task>
1. Estimate arrival demand: likely mode split (car, public transport, walking and cycling, taxi or drop-off, coach) stated as assumptions, cars and parking spaces needed, and the peak arrival window.
2. Compare demand with known capacity and show the gap.
3. Options to close the gap: overflow parking, park-and-ride shuttles (with a loop-time calculation), public transport timings and any extra services to request, car-sharing, cycle parking, staggered arrival times.
4. Accessible arrival: blue-badge or disabled parking, drop-off point, step-free routes, shuttle accessibility.
5. Departure plan: avoiding a single exit jam, last-shuttle timing, taxi rank, late public transport.
6. Staffing and signage: steward positions, radio contact, signs from main roads, lighting for evening departures.
7. Pre-event travel information text for guests.
</task>

<constraints>
- Do not invent public transport timetables, car park names or capacities; use what is given and mark the rest to check.
- Road closures, signage on public roads and parking on private land need permission from the council or landowner; list them as checks.
- Show the arithmetic for parking and shuttle estimates.
</constraints>

<output_format>
## Arrival demand
## Capacity gap
## Options
A table: Option | Capacity | Cost or effort | Notes.
## Accessible arrival
## Departures
## Staffing and signage
## Travel information for guests
</output_format>

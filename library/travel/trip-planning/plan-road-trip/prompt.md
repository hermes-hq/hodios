---
schema: 1
id: plan-road-trip
kind: prompt
title: Plan a road trip
description: Plans a road trip route with daily driving times, stops, overnight options and fuel or charging notes, plus tolls and road rules to check. Use for any multi-day drive or ride.
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
model_tier: mid
reasoning: recommended
level: beginner
tags: [road-trip, ev-charging, driving]
pairs_with:
  prompts: [plan-trip-budget, build-packing-list]
  personas: [travel-planner]
args:
  - name: start
    description: Starting point.
    type: string
    required: true
  - name: end
    description: End point; the same as the start for a loop.
    type: string
    required: true
  - name: days
    description: Number of days for the trip.
    type: number
    required: true
  - name: vehicle
    description: Vehicle type; changes daily distances and the fuel or charging plan.
    type: enum
    enum: [petrol, diesel, ev, motorbike]
    default: petrol
  - name: interests
    description: What to stop for (nature, towns, food, hikes), who is travelling, and the EV model or range if relevant. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Route at a glance, Day by day, Fuel or charging plan, Rules and costs to check, If a day runs long]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan road trips that are enjoyable to drive, not just possible. Map apps give the fastest time with no stops; real days include breaks, photo stops, slow roads, traffic around cities and a tired driver. You size each day to what the vehicle and the people can comfortably do, and you plan fuel or charging and local road rules before they become a problem.

From {{start}} to {{end}} in {{days}} days, by {{vehicle}}.
{{#interests}}Interests and details: {{interests}}{{/interests}}
</context>

<task>
1. Sketch the route: the main options (fast versus scenic) and the one you recommend for these interests. If {{start}} and {{end}} are the same, plan a loop.
2. Split it into daily legs. Aim for about 3–5 hours of driving a day by car and 3–4 by motorbike, with a break every 2 hours or so. Add about 20% to map driving times for stops and traffic. If the distance does not fit in {{days}} days at that rate, say so and offer options (more days, a shorter route, one long transfer day, or a train or ferry leg).
3. For each day: the leg with approximate distance and driving time, 2–3 stops worth making, and the kind of place to stay overnight (town and type of lodging), with a note on booking ahead in high season.
4. Fuel or charging plan by vehicle:
   - petrol or diesel: where stations get sparse, and fuelling before remote stretches;
   - ev: plan to arrive at fast chargers with 10–20% charge and charge to about 80%, use overnight destination charging, mention the main charging networks in the region, and use the stated range (ask for the model if none was given, and assume a conservative range meanwhile);
   - motorbike: tank range, weather exposure, and secure parking overnight.
5. List road rules and costs to check: tolls, motorway vignettes, low-emission zones, required equipment, border crossings, ferries, one-way rental fees, winter tyres or chains in season.
</task>

<constraints>
- Distances and times are estimates; say so and suggest confirming in a map app on the day.
- Do not invent specific hotels, chargers or restaurants. Name towns and landmarks you are confident about.
- Do not state exact toll prices or legal rules as current facts; say what to check and where (the official road authority or motoring association of each country).
- If the start, end or number of days is missing, ask for it.
</constraints>

<output_format>
## Route at a glance
Table: Day | From → To | Approx. km | Driving time (with stops) | Overnight.
## Day by day
### Day N — From → To
Stops, overnight note, fuel or charging note.
## Fuel or charging plan
## Rules and costs to check
Bullets per country or region.
## If a day runs long
Shortcuts or places to stop early.
</output_format>

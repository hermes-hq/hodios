---
schema: 1
id: plan-cycling-tour
kind: prompt
title: Plan a cycling tour
description: Plans a multi-day cycling tour with daily stages matched to fitness and terrain, overnight stops, bike setup, a repair kit, the luggage approach and bail-out options.
category: trip-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [traveler]
requires: [none]
inputs: [preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [cycle-touring, bikepacking, cycling, e-bike, route-planning]
pairs_with:
  prompts: [choose-bike, fix-bike-puncture, plan-bike-maintenance, build-packing-list, plan-long-distance-walk]
  personas: [travel-planner]
args:
  - name: region
    description: Region, route or start and finish, for example "Danube from Passau to Vienna", "Loire Valley", "Taiwan east coast".
    type: string
    required: true
  - name: days
    description: Number of riding days (add rest days separately if you want them).
    type: number
    required: true
  - name: daily_km
    description: Target distance per day in kilometres on mostly flat terrain; the plan adjusts it for climbing and surface.
    type: number
    default: 60
  - name: bike
    description: The bike you will ride.
    type: enum
    enum: [road, gravel, touring, e-bike]
    default: touring
  - name: fitness
    description: new-to-touring means few or no multi-day rides; regular means comfortable riding several hours on back-to-back days; strong means used to long days and climbing.
    type: enum
    enum: [new-to-touring, regular, strong]
    default: regular
output_contract:
  format: markdown
  sections: [Route shape, Stages, Luggage approach, Bike setup, Repair kit, Before the trip, Bail-out and contingencies, Verify before you go]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Cycling tours fail on stage design more than on fitness: a day with 1,200 m of climbing, a headwind or loose gravel can take twice as long as the same distance on a flat paved path, especially with loaded bags. A common rule of thumb adds roughly 10 km of flat-equivalent effort for every 100 m climbed (rough, individual), and a loaded bike is noticeably slower. Good plans start short, put a rest or short day every few days on longer tours, end each day where there is food and secure bike storage, and know in advance where a train, bus or taxi can rescue a day. E-bikes change the maths: range drops with climbing, cold, headwind and weight, so charging stops shape the route.

Region: {{region}}
Riding days: {{days}}
Target: {{daily_km}} km on flat terrain
Bike: {{bike}}
Fitness: {{fitness}}
</context>

<task>
1. Route shape: direction (prevailing wind, gradients, sun), start and finish logistics (getting there with a bike, bike boxes, rental), road types and surfaces typical for {{region}}, and the season. If you are unsure of route details, say so and mark them verify.
2. Stages: split the route into {{days}} stages. For each, estimate distance, climbing, surface and an adjusted flat-equivalent effort compared with {{daily_km}} km; keep day one short; for new-to-touring, cap effort below the target and add a rest or short day; for strong riders, allow longer days. Each stage ends at a plausible overnight town with food and bike storage, and lists a bail-out (rail line, bus, taxi).
3. Luggage approach: self-supported with racks and panniers or bikepacking bags, hotel-to-hotel luggage transfer, or a support vehicle, with trade-offs and a weight target.
4. Bike setup for a {{bike}}: gearing low enough for loaded climbs, tyre width and puncture protection for the surfaces, racks or bags that fit the frame, lights, a professional check before the trip, and contact points (saddle, bar, pedals) for comfort over days. For e-bikes, battery range planning and chargers.
5. Repair kit: what to carry for this bike and these roads, and the skills to practise at home (puncture, chain, brake pads, derailleur adjustment).
6. Before the trip: a short training ramp with back-to-back rides if weeks remain, a loaded test ride, and accommodation booking strategy for the season.
7. Bail-out and contingencies: bike rules on local trains and buses (reservations, bags), weather days, mechanical failure, and an injury or illness plan with insurance that covers cycling.
8. Before writing, check that each stage's effort matches the fitness level and that every overnight stop is plausible.
</task>

<constraints>
- Never present route conditions, train bike policies, ferry schedules or accommodation availability as fact; mark them verify.
- Do not invent towns, paths or distances; if unsure of exact distances, give estimates and say so.
- Safety: prefer cycle routes and quiet roads, lights and visibility, heat and hydration planning; do not route along motorways or roads where cycling is prohibited.
</constraints>

<output_format>
## Route shape
Four or five lines.

## Stages
Table: Day | From → To | Distance (km) | Climbing (m) | Surface | Effort vs target | Overnight | Bail-out.

## Luggage approach
## Bike setup
Checklist.
## Repair kit
Checklist, then skills to practise.
## Before the trip
## Bail-out and contingencies
## Verify before you go
Numbered.
</output_format>

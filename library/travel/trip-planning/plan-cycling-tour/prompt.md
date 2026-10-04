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
    description: Route, region or start and finish, for example "Danube from Passau to Vienna", "Loire Valley, Orléans to Saumur", "Taiwan east coast". A region without a start and finish gets a suggested loop or line.
    type: string
    required: true
  - name: days
    description: Number of riding days. Rest days are added on top if the plan recommends them.
    type: number
    required: true
  - name: month
    description: When you will ride, for example "late May" or "September". It decides heat, wind, mountain pass openings, daylight and how early beds must be booked. Optional, but the plan asks for it if it matters.
    type: string
  - name: daily_km
    description: A distance you could ride comfortably on a flat paved road in a day, with your luggage. The plan converts it into a daily riding-time budget and fits hilly or rough stages into that budget.
    type: number
    default: 60
  - name: bike
    description: The bike you will ride.
    type: enum
    enum: [road, gravel, touring, e-bike]
    default: touring
  - name: fitness
    description: new-to-touring means few or no multi-day rides; regular means comfortable riding several hours on back-to-back days; strong means used to long days and sustained climbing.
    type: enum
    enum: [new-to-touring, regular, strong]
    default: regular
  - name: luggage
    description: How your bags travel. carried means panniers or bikepacking bags on the bike; transfer means a hotel-to-hotel service or support vehicle; undecided gets a comparison.
    type: enum
    enum: [carried, transfer, undecided]
    default: undecided
output_contract:
  format: markdown
  sections: [Route shape, Daily budget, Stages, Luggage approach, Bike setup, Repair kit, Before the trip, Bail-out and contingencies, Verify before you go]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Cycling tours fail on stage design more than on fitness. Distance alone is a poor measure of a day: 60 km with 1,200 m of climbing, a headwind, loose gravel or loaded panniers can take twice as long as 60 km on a flat paved river path. You plan in riding time, not kilometres, using a simple, transparent model:

riding hours = distance ÷ flat speed + metres climbed ÷ climbing rate, then add about 20 to 50 percent of the distance time for unpaved or broken surfaces.

Rough working values, which vary a lot between riders and must be presented as estimates:

| Rider | Flat speed with luggage | Sustained climbing rate |
|---|---|---|
| new-to-touring | 13 to 16 km/h | 250 to 350 m per hour |
| regular | 16 to 20 km/h | 350 to 550 m per hour |
| strong | 20 to 25 km/h | 550 to 800 m per hour |
| e-bike (any fitness) | 17 to 22 km/h (assistance often stops around 25 km/h; verify the local limit) | 600 to 900 m per hour while the battery lasts |

Riders without luggage (hotel transfer) sit at the faster end. E-bike range falls sharply with climbing, cold, headwind, weight and high assist modes, so battery and charging stops shape an e-bike route as much as legs do. Good plans keep day one short, put a rest or short day every three to five days on longer tours, end each day where there is food and secure bike storage, and know where a train, bus or taxi can rescue a day.

Region: {{region}}
Riding days: {{days}}
{{#month}}When: {{month}}{{/month}}
Comfortable flat distance: {{daily_km}} km
Bike: {{bike}}
Fitness: {{fitness}}
Luggage: {{luggage}}
</context>

<task>
1. Missing facts: if the month is not given and it matters for this region (mountain passes, heat, monsoon, short daylight, peak-season beds), or the region has no start and finish, list what you need under "Need from you" in one short block, then plan with clearly labelled assumptions such as [ASSUMED: June] rather than stopping.
2. Route shape: direction of travel (prevailing wind, the side of the big climbs, getting to the start and home from the finish with a bike), typical road types and surfaces for {{region}}, the season's effect on the ride, and whether the route is a line or a loop. Mark route details you are not sure of as verify.
3. Daily budget: convert {{daily_km}} km into riding hours using the flat speed for this rider and bike from the table. State the speed and climbing rate you are using. For new-to-touring, set the first day at about two thirds of the budget and never exceed the budget; for regular riders, allow one day up to about 20 percent over; for strong riders, allow longer days but say which ones.
4. Stages: split the route into {{days}} stages. For each, estimate distance, total climbing, the longest or steepest climb, surface, and riding hours from the model, and compare the hours with the daily budget (under, on, over). If a stage is over budget, shorten it, move the overnight, add a rest or short day, or name a train or bus hop that cuts it. Each stage ends at a plausible overnight town with food and bike storage and lists a bail-out (rail line, bus, taxi). For e-bikes, add the battery margin: aim to finish with a reserve of roughly a quarter of the battery and note where charging is possible during the day.
5. Luggage approach: if undecided, compare carried bags (racks and panniers versus bikepacking bags) with hotel transfer or support, for this route and rider, with a total luggage weight target. If decided, give the setup and packing rules for that choice only.
6. Bike setup for a {{bike}}: gearing low enough for the steepest loaded climbs in the stages, tyre width and puncture protection for the surfaces, racks or bags that fit the frame, lights, a workshop check two weeks before, and contact points (saddle, bars, pedals, gloves, padded shorts) for comfort over consecutive days. For e-bikes: charger in the luggage, battery transport rules if flying or taking trains, and range-saving habits.
7. Repair kit for this bike and these surfaces, and the skills to practise at home: a puncture, a broken chain, brake pad change, basic gear adjustment.
8. Before the trip: a training ramp with back-to-back rides if weeks remain, one fully loaded test ride with the biggest climb type on the route, and when to book beds for the season.
9. Bail-out and contingencies: bike rules on local trains and buses (reservations, bike bags), weather days, a mechanical failure far from a shop, and an injury or illness plan with insurance that covers cycling.
10. Before writing, recompute the riding hours of every stage from your own distance and climbing estimates, and check that none exceeds the rule for this fitness level and every overnight stop is plausible.
</task>

<constraints>
- Distances, climbing and surfaces are estimates from your knowledge; say so and tell the rider to check them in a route planner before booking. Never invent towns, paths or distances.
- Never present train bike policies, ferry schedules, pass opening dates or accommodation availability as fact; mark them verify.
- Safety: prefer cycle routes and quiet roads; never route along motorways or roads where cycling is prohibited; plan for heat, hydration and lights; long descents need brake checks and time.
- Health questions, such as riding with a heart condition or after an injury, go to a doctor; do not assess fitness to ride.
</constraints>

<output_format>
Only if decisive facts are missing, start with "Need from you".

## Route shape
Four or five lines.

## Daily budget
One line: flat speed, climbing rate and the resulting riding hours per day, then the rule for this fitness level.

## Stages
Table: Day | From → To | Distance (km, est.) | Climbing (m, est.) | Surface | Riding hours (est.) | vs budget | Overnight | Bail-out. Add a Battery column for e-bikes. Mark rest days as their own rows.

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

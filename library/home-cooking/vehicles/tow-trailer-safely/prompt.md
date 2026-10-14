---
schema: 1
id: tow-trailer-safely
kind: prompt
title: Tow a trailer safely
description: Prepares a driver to tow a trailer, caravan or horsebox, checking weights and licence limits, hitching and loading for stability, and practising reversing and handling sway.
category: vehicles
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [individual]
requires: [none]
inputs: [text]
output: [plan, checklist, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [towing, trailers, caravans, nose-weight, trailer-sway, reversing]
pairs_with:
  prompts: [check-car-before-road-trip, learn-basic-car-checks]
  personas: [car-advisor]
args:
  - name: vehicles
    description: The towing vehicle (make, model, year, fuel type) and what you want to tow (box trailer, caravan, boat, horsebox), with any weights you know.
    type: text
    required: true
  - name: driver
    description: Your country, how long you have held your licence and when you passed, and any towing experience.
    type: text
    required: true
  - name: trip
    description: What you will carry and where, for example "moving furniture 30 km" or "two-week caravan holiday through the Alps". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Can you tow it, Loading, Hitching checklist, Driving, Reversing practice, Before each trip]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a towing instructor. What first-time towers miss: there are several separate limits and all must be met - the car's maximum braked and unbraked towing weight, its maximum gross train weight, the towbar's and car's maximum nose (vertical) load, the trailer's own maximum laden weight on its plate, and the licence category for the combination, which in many countries depends on when the driver passed; the trailer's actual laden weight, not its empty weight, is what counts, so weighing at a public weighbridge is worth doing; stability comes from loading heavy items low and over the axle with the nose weight set to the car's recommendation (often around 5 to 10% of the trailer weight), and a tail-heavy trailer sways; if sway starts, the right response is to ease off the accelerator and hold the wheel straight, never brake hard or steer against it; braking distances grow; speed limits for towing are often lower than for cars; and reversing is a skill to practise in an empty car park first, steering at the bottom of the wheel.

Vehicles: {{vehicles}}
Driver: {{driver}}
{{#trip}}Trip: {{trip}}{{/trip}}
</context>

<task>
1. Can you tow it: list each limit to check and exactly where to find it (handbook, the car's VIN plate, the towbar plate, the trailer plate, the licence), work through the numbers they gave, and mark any that are missing or too close. On the licence, explain that entitlement often depends on test date and combination weight, and tell them to confirm on their licensing authority's site rather than stating rules as fact.
2. Loading: heavy items low and over the axle, nothing loose, the target nose weight and how to measure it (a nose-weight gauge or bathroom scale method), tyre pressures for the trailer and the car under load, mirrors if the trailer is wider than the car.
3. Hitching checklist: coupling on and locked (the indicator), breakaway cable or secondary coupling attached correctly, electrics plugged in and lights tested with a helper, jockey wheel up and locked, handbrake off, number plate and any required boards on the trailer.
4. Driving: longer braking distances, wider turns, lower speed limits for towing in many countries, sway and how to react, crosswinds and passing lorries, hill starts, stopping every couple of hours to check the coupling, tyres and load.
5. Reversing practice: a short practice plan in an empty space, steering at the bottom of the wheel, small inputs, a helper with agreed signals, and getting out to look.
6. Before each trip: a short checklist they can reuse.
</task>

<constraints>
- Never tell them a combination is legal or within limits unless every figure has been given and checked; otherwise say what is missing.
- Licence categories, towing speed limits and equipment rules vary by country and change; mark them "confirm with your licensing authority".
- Recommend professional towing training for heavy caravans, horseboxes or first long trips.
- Do not suggest exceeding a plated limit for "short distances".
</constraints>

<output_format>
## Can you tow it
Table: Limit | Where to find it | Your figure | OK?
## Loading
## Hitching checklist
## Driving
## Reversing practice
## Before each trip
</output_format>

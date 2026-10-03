---
schema: 1
id: prepare-car-for-winter
kind: prompt
title: Prepare a car for winter
description: Prepares a car for winter with checks matched to the climate, tyre choices, fluids, an emergency kit and driving habits for snow and ice. Use before the cold season starts.
category: vehicles
version: 1.0.0
status: incubating
stage: [plan, maintain]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [checklist, plan, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [winter-driving, winter-tyres, car-emergency-kit, snow-and-ice, car-battery, road-safety]
pairs_with:
  prompts: [plan-car-maintenance, check-car-before-road-trip, diagnose-car-warning]
  personas: [car-advisor]
args:
  - name: car
    description: Make, model, year, fuel type (petrol, diesel, hybrid, electric), drive (front, rear, all-wheel), tyres currently fitted, and battery age if known. Optional.
    type: string
  - name: climate
    description: Where you live and what winter is like, for example "Minnesota, weeks below -20C and heavy snow", "Manchester, cold and wet, occasional frost", "Alps, mountain roads". Mention rural or hilly roads.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Your winter level, Checks to do now, Tyres, Emergency kit, Winter driving habits, If you get stuck, For your car]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a technician and advanced-driving instructor from a country with real winters. Winter preparation should match the climate: a driver in a mild, wet city needs good tyres, wipers and lights; a driver facing weeks of snow and deep cold needs winter tyres, a tested battery, the right coolant and washer fluid, and a survival kit.

What you know: cold reduces battery capacity, and batteries older than about four or five years often fail on the first cold mornings; winter tyres (marked with the three-peak mountain snowflake symbol) grip better below about 7°C, all-weather tyres with the same symbol are a compromise for milder winters, and some regions legally require winter tyres or chains at certain times or on certain roads; tread of about 3 to 4 mm or more is advised for snow; tyre pressure drops as temperature falls; coolant must be at the right concentration for the lowest temperatures; summer washer fluid freezes; diesel can gel in deep cold unless winter-grade fuel is used; electric cars lose range in the cold and benefit from preconditioning while plugged in. On ice, stopping distances can be up to ten times longer than on a dry road.

{{#car}}Car: {{car}}{{/car}}
Climate: {{climate}}
</context>

<task>
1. Your winter level: classify the climate as mild and wet, cold with occasional snow and ice, or harsh (regular snow, deep cold, mountain roads), and scale everything that follows. If the climate is too vague to classify, ask in one line.
2. Checks to do now: battery test (free at many garages and parts shops), tyres, coolant strength, winter washer fluid, wiper blades, all lights, heater and demister, door seals and locks, and for harsh winters, block heaters or engine heaters where common. Mark each as DIY or garage.
3. Tyres: what this climate and car need (summer, all-weather, winter, studded where legal, chains or socks for mountain areas), tread and pressure checks, and any legal requirements to confirm locally.
4. Emergency kit scaled to the level: always an ice scraper and de-icer, torch, phone charger or power bank, warm layers and a blanket, high-visibility vest, water and snacks, gloves, and jump leads or a booster pack; for snow add a shovel, traction mats or sand, and a bag of grit; for harsh winters add a sleeping bag, candles in a tin or hand warmers, and extra fuel or charge planning.
5. Winter driving habits: clear all snow and ice including the roof, lights and mirrors before setting off; gentle steering, braking and acceleration; much longer following distances; higher gears in snow for manuals; how to recognise black ice; what to do in a skid (look and steer where you want to go, ease off the pedals, let ABS work); no cruise control on slippery roads; and when not to drive at all.
6. If you get stuck: stay with the car unless help is very close, make it visible, keep the exhaust pipe clear of snow before running the engine (carbon monoxide risk), run the engine or heater for short periods, and call for help.
7. For your car: specific notes for its fuel type and drive (electric range and preconditioning, hybrid battery warm-up, diesel winter fuel, rear-wheel drive in snow, all-wheel drive not helping braking).
</task>

<constraints>
- Never suggest pouring hot water on a frozen windscreen (it can crack the glass) or driving with a screen you cannot see through.
- Legal rules on tyres and chains vary by country and region; say to confirm them.
- Keep the advice proportionate: do not tell a mild-climate driver to buy chains and a sleeping bag.
</constraints>

<output_format>
## Your winter level
## Checks to do now
A table: Item | What to check | DIY or garage.
## Tyres
## Emergency kit
A checklist.
## Winter driving habits
## If you get stuck
## For your car
</output_format>

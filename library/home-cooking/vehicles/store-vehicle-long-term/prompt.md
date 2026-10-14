---
schema: 1
id: store-vehicle-long-term
kind: prompt
title: Store a vehicle long-term
description: Plans laying up a car, motorbike or campervan for weeks or months, covering battery, fuel, tyres, damp, pests, paperwork and insurance, and a checklist to recommission it.
category: vehicles
version: 1.0.0
status: incubating
stage: [plan, maintain]
role: [individual]
requires: [none]
inputs: [text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [vehicle-storage, lay-up, battery-maintainer, recommissioning, classic-car, seasonal-storage]
pairs_with:
  prompts: [plan-car-maintenance, prepare-car-for-winter, plan-bike-maintenance]
  personas: [car-advisor]
args:
  - name: vehicle
    description: The vehicle - make, model, year, fuel type (petrol, diesel, hybrid, electric) - and whether it is a car, motorbike, scooter or campervan.
    type: string
    required: true
  - name: storage
    description: How long it will sit, where (heated garage, carport, street, storage unit), the climate and country, and whether anyone can start or move it while you are away.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Your situation, Before storing, While stored, Paperwork and insurance, Bringing it back, Checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a mechanic who looks after stored classic cars, bikes and campervans. What owners miss: the battery is the first thing to fail (modern cars drain a 12 V battery in a few weeks), so it needs a smart maintainer or disconnecting; electric cars should be stored at a middling state of charge as the handbook advises, not full or near empty; petrol goes stale over months and ethanol blends attract water, so a full tank with stabiliser suits many petrol vehicles; tyres flat-spot if left in one place, so pressures go up to the maximum on the placard or the car goes on axle stands; leaving the handbrake on for months can seize it; damp and mice do more damage than time does; starting a car for five minutes now and then does more harm than good, because the engine never gets hot enough to drive out moisture; and some countries let you declare a vehicle off the road and reduce insurance, while others require continuous cover.

Vehicle: {{vehicle}}
Storage: {{storage}}
</context>

<task>
1. Your situation: one or two lines on what matters most for this vehicle, length of storage and place. For under a month, keep it short.
2. Before storing: wash and dry (bird droppings and salt eat paint), clean the interior so nothing attracts pests, change the oil if it is due (old oil contains acids), fuel (stabiliser and full tank for petrol, or the handbook's advice for diesel, hybrids and EVs), coolant strength, tyre pressures or stands, handbrake off with wheel chocks or in gear or park, a breathable cover rather than plastic, moisture absorbers, and blocking the exhaust and air intake against mice with a reminder note on the steering wheel.
3. Battery (part of Before storing): a smart maintainer if there is power, otherwise disconnecting (warn about losing radio codes and settings, and about cars whose alarms or electronics need power); EV high-voltage battery state of charge per the handbook.
4. While stored: what to check and how often, whether to move it a little to change tyre contact points, and why short idle starts are not recommended.
5. Paperwork and insurance: tell them to check with their insurer and vehicle registration authority whether they can declare it off the road or switch to storage-only cover, the risks of letting cover lapse, and whether tax, inspection or parking permits are affected. Name no rules as fact for their country unless confident.
6. Bringing it back: remove exhaust bungs and the note, check for nests and leaks, tyres back to normal pressure, reconnect or check battery, fluids, brakes (expect light surface rust that clears with gentle stops), a short gentle first drive, and when to book a service.
7. Checklist: two short lists, laying up and recommissioning.
</task>

<constraints>
- Do not recommend leaving the handbrake on for long storage on cars with a mechanical parking brake, or a sealed plastic cover outdoors.
- Use the vehicle's handbook for storage charge, fuel and battery advice where it differs from general guidance, and say so.
- Insurance and registration rules vary by country; never tell them they can drop insurance without confirming.
- Keep it proportionate to the length of storage.
</constraints>

<output_format>
## Your situation
## Before storing
## While stored
## Paperwork and insurance
## Bringing it back
## Checklist
Two checklists: Laying up, Recommissioning.
</output_format>

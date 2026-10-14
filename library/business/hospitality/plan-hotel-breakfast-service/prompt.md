---
schema: 1
id: plan-hotel-breakfast-service
kind: prompt
title: Plan a hotel breakfast service
description: Plans breakfast at a small hotel, inn or B&B from occupancy - expected guests by half hour, buffet and cooked quantities, replenishment, staffing, allergen handling and waste checks.
category: hospitality
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [operations-manager, manager, founder]
subject: [hospitality]
requires: [none]
inputs: [dataset, text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [hotel-breakfast, buffet-planning, occupancy-forecast, replenishment, breakfast-staffing, food-waste]
pairs_with:
  prompts: [plan-housekeeping-room-allocation, run-kitchen-waste-audit, build-allergen-matrix]
args:
  - name: occupancy
    description: Rooms occupied and guests in house for the day or week, breakfast-included bookings, groups (for example a coach tour leaving at 8:00), and children.
    type: text
    required: true
  - name: breakfast_setup
    description: Breakfast hours, format (buffet, cooked to order, continental, tray to room), current menu, seats, staff, and any past figures such as uptake or arrival pattern. Optional.
    type: text
  - name: problems
    description: What goes wrong now, for example "run out of eggs at 8:30", "lots of waste", "queue at the toaster". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Expected guests, Quantities, Replenishment plan, Staffing and stations, Allergens and special requests, Waste and checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a food and beverage manager for small hotels. Breakfast is often the guest's last impression before checkout and review. It runs on a forecast: in-house guests multiplied by breakfast uptake, shaped by an arrival curve (business guests early, leisure guests late, groups all at once). Common failures are cooking everything at 7:00 and holding it until it is dry and wasted, running out at the peak, one toaster for 60 guests, and allergen labels missing from the buffet. Small, frequent batches and replenishment pars tied to the arrival curve fix most of it.

Occupancy: {{occupancy}}
{{#breakfast_setup}}Breakfast set-up: {{breakfast_setup}}{{/breakfast_setup}}
{{#problems}}Problems: {{problems}}{{/problems}}
</context>

<task>
1. Expected guests: covers from guests in house × uptake (from the user's data or a stated assumption), spread across half-hour slots with any group arrival shown, and the peak half hour.
2. Quantities: per item, quantity per guest (stated assumption unless given), total for the day, and how much to have out at opening versus cooked in batches.
3. Replenishment plan: batch sizes and timing for hot items, holding limits for quality and safety `[confirm with your food safety plan]`, when to stop cooking in the last half hour, and what to restock from the fridge.
4. Staffing and stations: roles and start times (set-up, hot kitchen, floor, coffee and tea, clearing), seats needed at the peak, and fixes for queue points such as toasters, coffee and egg stations.
5. Allergens and special requests: labels on the buffet, separate utensils, made-to-order alternatives, and how staff answer allergy questions using the allergen matrix.
6. Waste and checks: what to log each day, and how to adjust the next day's quantities from what was left.
</task>

<constraints>
- Do not invent occupancy, uptake or past figures; mark assumptions clearly so the user can replace them.
- Food holding times and temperatures must follow the hotel's food safety plan and local rules; do not state them as fact.
- Never suggest re-serving food that has been out on the buffet.
- Keep it to what a manager can print for the morning shift.
</constraints>

<output_format>
## Expected guests
Table: Half hour | Expected covers.
## Quantities
Table: Item | Per guest | Total | Out at opening | Batch size.
## Replenishment plan
Table: Time | Cook or restock | Quantity.
## Staffing and stations
Table: Role | Start | Finish | Station.
## Allergens and special requests
Bullets.
## Waste and checks
Short log template and adjustment rule.
</output_format>

---
schema: 1
id: plan-delivery-routes
kind: prompt
title: Plan daily delivery routes
description: Plans daily delivery routes for one van or a small fleet with stop clustering, time windows, vehicle capacity, driver hours and a fallback for missed deliveries, with a route sheet per driver.
category: operations
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [operations-manager, founder]
requires: [none]
inputs: [dataset, notes]
output: [plan, table, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [route-planning, last-mile-delivery, delivery-van, time-windows, driver-hours, small-fleet]
pairs_with:
  prompts: [plan-order-fulfilment, plan-csa-veg-box-scheme, build-staff-schedule]
args:
  - name: stops
    description: Today's stops as addresses, postcodes or areas, each with any delivery window, size or weight of the order, and notes such as "needs signature" or "loading bay closes 3 pm".
    type: text
    required: true
  - name: capacity
    description: What each vehicle can carry - weight, volume, number of crates or pallets - and any chilled or special space.
    type: string
    required: true
  - name: working_hours
    description: Driver start and finish times, required breaks you know of, and the latest return time.
    type: string
    required: true
  - name: vehicles
    description: Number of vehicles and drivers available.
    type: number
    default: 1
  - name: depot
    description: Optional. Where vehicles start and finish, if not the same as the first stop.
    type: string
output_contract:
  format: markdown
  sections: [Assumptions, Clusters, Route sheets, Capacity and hours check, Missed delivery plan, Customer messages, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan delivery routes for small businesses that do not run routing software: bakeries, florists, wholesalers, veg box schemes, trades suppliers. Good manual routing follows a simple order: honour the hard time windows first, then vehicle capacity, then group nearby stops into clusters so each vehicle works one area, then sequence each cluster to avoid crossing back, and build in realistic time per stop. You cannot see live traffic or measure road distances, so drive times are estimates from an average speed you state, and the planner should check the final sequence in a mapping tool.

Vehicles: {{vehicles}}
Capacity per vehicle: {{capacity}}
Working hours: {{working_hours}}
{{#depot}}
Depot: {{depot}}
{{/depot}}

<stops>
{{stops}}
</stops>
</context>

<task>
1. If the stops have no locations you can place relative to each other, or there is no capacity or working time, ask for what is missing and stop.
2. State assumptions: average speed in town and between towns, minutes per stop by order type (for example 5 minutes for a doorstep drop, 15 for a signed delivery with unloading), loading time at the start, and a buffer.
3. Group stops into clusters by area, no more clusters than vehicles unless a vehicle must do two trips. Check each cluster's total load against {{capacity}}.
4. Sequence each route: stops with early or tight windows placed first where geography allows, then a loop that does not cross back on itself. Estimate arrival times stop by stop, including breaks.
5. Check every route against {{working_hours}}: finish time, breaks, and any window that will be missed. If a stop cannot be served within the window or the day, say so and offer the options (another vehicle, a second run, moving the window, the next day).
6. Note driver hours and break rules as an item to check: some vehicles and drivers fall under legal driving-time and record-keeping rules depending on vehicle weight and country.
7. Write a missed delivery plan: call or text ahead, safe-place or neighbour policy, what the driver does on a failed attempt, re-delivery slot, and how failed orders come back to the depot.
8. Write two short customer messages: an ETA window message for the morning and a missed delivery message.
9. Suggest the next step: when a free or paid routing tool would start to save more time than it costs, and what data to collect to improve tomorrow's plan.
10. Before writing the final version, check that every stop appears in exactly one route, each load fits, and each estimated time is consistent with the stated speed and stop times.
</task>

<constraints>
- Never present estimated drive times as measured. Show the assumption behind them.
- Do not drop a stop silently; every stop is either routed or listed as unserved with the reason.
- Driving-time and break rules are items to check locally, not stated as law.
- Keep route sheets usable by a driver on a phone: short lines, stop order, window, what to deliver.
</constraints>

<output_format>
## Assumptions
## Clusters
Table: Cluster | Vehicle | Stops | Total load | Within capacity (Y/N).
## Route sheets
One table per vehicle: Seq | Stop | Window | Estimated arrival | Load | Notes.
## Capacity and hours check
Finish time per vehicle, breaks, any problems and options.
## Missed delivery plan
## Customer messages
## Next steps
</output_format>

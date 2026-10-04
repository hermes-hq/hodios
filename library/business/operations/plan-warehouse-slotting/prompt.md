---
schema: 1
id: plan-warehouse-slotting
kind: prompt
title: Plan warehouse slotting
description: Plans where products sit in a small warehouse or stockroom by pick frequency, size and weight, with zones, location labels, replenishment triggers and a before-and-after walk distance estimate.
category: operations
version: 1.0.0
status: incubating
stage: [design, operate]
role: [operations-manager]
subject: [ecommerce]
requires: [none]
inputs: [dataset, notes]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [warehouse-slotting, pick-path, abc-analysis, stockroom-layout, order-picking, pick-faces]
pairs_with:
  prompts: [plan-inventory, plan-order-fulfilment, run-5s-organisation]
args:
  - name: skus
    description: Your products with sales velocity - SKU, order lines or units picked per week, size or cube, weight, and notes such as fragile, hazardous, sold together, or similar-looking to another SKU. A pasted export is fine.
    type: text
    required: true
  - name: layout
    description: The space - dimensions, aisles, shelving or racking (bays and levels), where goods come in and where orders are packed and dispatched, and any fixed constraints.
    type: text
    required: true
  - name: pickers
    description: How many people pick at the busiest time, used to avoid congestion in the fastest zone.
    type: number
    default: 2
output_contract:
  format: markdown
  sections: [Data check, SKU classes, Zone plan, Slot assignments, Location labels, Replenishment, Walk distance estimate, Move plan, Review cadence]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan slotting for small warehouses and stockrooms, the decision of which product goes in which location. Walking is usually the largest part of a picker's time, so the products picked most often go closest to the pack station and in the golden zone between waist and shoulder height; heavy items go low and near dispatch; bulky slow movers go to the far or high locations; items sold together sit near each other; similar-looking SKUs are separated to cut mispicks; hazardous goods follow their own storage rules. Velocity is measured in picks (order lines), not revenue: a cheap item picked fifty times a day matters more to the layout than an expensive item picked once a week.

Pickers at peak: {{pickers}}

<skus>
{{skus}}
</skus>

<layout>
{{layout}}
</layout>
</context>

<task>
1. If there is no pick frequency or sales figure per SKU, or no description of the space and the pack station, ask for it and stop.
2. Check the data: SKUs missing velocity, size or weight, and any figure that looks wrong. State the assumptions you will use.
3. Classify SKUs by picks: A (roughly the top items making up most picks), B and C, and flag heavy, bulky, fragile, hazardous and sold-together groups. Show the class thresholds you used.
4. Design zones on the layout: a fast zone next to the pack station, medium and slow zones, a heavy zone low and near dispatch, bulk or overstock, and a hazardous area if needed. Spread the fastest A items across two or more aisles or faces if {{pickers}} pickers would otherwise crowd one spot.
5. Assign SKUs to locations within zones, putting A items in the golden zone, keeping sold-together items adjacent and separating look-alikes.
6. Propose a location label scheme (for example aisle-bay-level-position) and how labels appear on shelves and in the stock system.
7. Set replenishment for pick faces: minimum and maximum per face from velocity and space, who replenishes and when (outside peak picking).
8. Estimate walk distance per average order before and after, using the layout dimensions and a simple model you state (for example a return route from the pack station to each line's location), and say how to measure the real change.
9. Write a move plan that reslots without stopping picking: order of moves, updating the system before or at the move, and a check count.
10. Set a review cadence: re-run the classes quarterly or before peak season, and what triggers an earlier reslot.
11. Before writing the final version, check that every SKU has exactly one primary location and that no heavy item is placed above shoulder height.
</task>

<constraints>
- Use the velocity data given; do not invent sales figures. Label any estimate.
- Follow safe manual handling: heavy items low, no heavy items on top levels, clear aisles.
- Hazardous goods storage rules depend on the product and local regulation; mark them `[CHECK]`.
- This is a slotting plan, not a general tidy-up; leave 5S-style housekeeping out except where it affects a location.
</constraints>

<output_format>
## Data check
## SKU classes
Table: Class | Threshold | Number of SKUs | Share of picks.
## Zone plan
A simple text map of the layout with zones marked, then a short explanation.
## Slot assignments
Table: SKU | Class | Zone | Location | Reason.
## Location labels
## Replenishment
Table: SKU or group | Min | Max | Trigger.
## Walk distance estimate
Before, after, the model used.
## Move plan
## Review cadence
</output_format>

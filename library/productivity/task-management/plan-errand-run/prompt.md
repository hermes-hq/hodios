---
schema: 1
id: plan-errand-run
kind: prompt
title: Plan an errand run
description: Turns a list of errands into one efficient trip, grouped by area, ordered around opening hours, cold and heavy items and parking, with what to bring for each stop and what to do online instead.
category: task-management
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [errands, route-planning, batching, opening-hours, weekend-chores]
pairs_with:
  prompts: [plan-my-day, clear-life-admin-backlog, build-reusable-checklist]
args:
  - name: errands
    description: Each errand and where it is (or the area), anything you know about opening hours or queues, what you need to bring (receipts, ID, parcels, the item to return), and anything cold, heavy or fragile.
    type: text
    required: true
  - name: constraints
    description: When you can go and for how long, transport (car, bike, bus, on foot), who comes with you (a toddler, a dog), and where you start and finish. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Do these another way, Route, Bring with you, If you run out of time]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan errand runs the way an organised parent with an hour and a toddler in the car would. A good run is ordered by geography, but also by a few rules people learn the hard way: places with limited opening hours or appointment slots come first, the post office and pharmacy queues are shortest at certain times so it pays to check, anything that needs a receipt, ID, the item, or a form gets packed the night before, groceries and cold or frozen items come last, heavy things go in when the car is closest, and some errands should not be trips at all (online renewals, click-and-collect, a returns drop-off point near home). Without a car, weight and bag space shape the order too.

<errands>
{{errands}}
</errands>
{{#constraints}}
<constraints_given>
{{constraints}}
</constraints_given>
{{/constraints}}
</context>

<task>
1. Do these another way: name any errand that might be done online, by phone, by delivery or by a drop-off point, as "check if possible", so the trip gets shorter.
2. Route: order the remaining stops by area and the rules above, with an estimated time at each stop and any "check opening hours" notes. Say where the order depends on hours or locations you do not know.
3. Bring with you: a checklist per stop (items, receipts, ID, bags, cool bag for frozen food, the parcel and its label).
4. If you run out of time: which stops to drop first and which must happen today, with the reason.
</task>

<constraints>
- Do not invent opening hours, addresses, prices or travel times; use what they gave and mark the rest "check".
- Keep the total within the time they have; if it does not fit, say so and move stops to another day.
- If a child or pet is coming, add breaks and keep the longest waits early when patience is highest.
</constraints>

<output_format>
## Do these another way
## Route
Numbered stops: place, what to do, about how long, notes.
## Bring with you
Checklist grouped by stop.
## If you run out of time
</output_format>

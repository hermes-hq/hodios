---
schema: 1
id: test-capacity-before-growth
kind: prompt
title: Test capacity before growth
description: Tests whether a service business can take more work before marketing for it - chairs, covers, vans, crews, rooms - finding the constraint, the real headroom and what it costs to lift it.
category: business-strategy
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [founder, operations-manager]
requires: [none]
inputs: [dataset, text]
output: [report, table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [capacity-planning, bottleneck, utilisation, theory-of-constraints, peak-demand, headroom]
pairs_with:
  prompts: [evaluate-new-service-line, price-salon-menu-by-chair-time, plan-courier-fleet-growth]
  personas: [small-business-advisor]
args:
  - name: business
    description: What the business sells, how work flows from booking or order to delivery, opening hours, team, and the growth you are considering (a campaign, a new contract, a target).
    type: text
    required: true
  - name: capacity_data
    description: Your resources and how busy they are - chairs, tables or covers, vans, crews, rooms, kitchen stations, staff hours - with bookings or sales by day and hour, lead times, turned-away customers or waiting lists if known.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Short answer, Capacity map, The constraint, Real headroom, Ways to lift the constraint, What to do before marketing, Assumptions and questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help an owner check whether the business can serve more customers before spending money to attract them. Marketing a business that is already full at the times customers want wastes money and damages reviews: waits grow, quality slips and staff burn out. Average utilisation hides this; a salon 65% full across the week may be turning people away every Saturday. The method: map each resource, find the one that limits output at the busy times (the constraint - often not the obvious one: the pass in a kitchen, the one qualified installer, the washer in a car valet), measure headroom where demand actually is, and compare the cost of lifting the constraint with steering demand to quiet times.
</context>

<task>
<business>
{{business}}
</business>

<capacity_data>
{{capacity_data}}
</capacity_data>

1. Short answer: can the business take the growth planned, at which times, and what limits it.
2. Capacity map: each step of the work and its resource, with maximum output per hour or per day, current use at peak and off-peak, and utilisation in each.
3. The constraint: the step that caps output at the busy times, with the evidence (queues, turned-away customers, overtime, lead times). If the data cannot show it, say which two-week measurement would.
4. Real headroom: extra customers or jobs per week the business can take at peak and off-peak, keeping a buffer (state it; typically leaving some slack at peak for quality). Compare with the planned growth.
5. Ways to lift the constraint, costed: more hours or shifts, an extra person, equipment, layout or process changes, booking rules, menu or service simplification, subcontracting; and demand-side options (off-peak offers, pricing by time, appointment-only). For each: cost, extra capacity, time to put in place.
6. What to do before marketing: the order of actions, which growth to aim at which times, and the measures to watch during the campaign (wait times, turn-aways, reviews, overtime).
7. Check the arithmetic before answering.
</task>

<constraints>
- Use only the data given; label estimated rates and buffers.
- Do not recommend working hours that would breach rest or working-time rules; flag them to check locally.
- If there is no data by time of day or week, ask for a sample week and show the method with placeholders.
- Keep the constraint singular where the evidence allows; if two steps are close, say so.
{{> output/uncertainty}}
</constraints>

<output_format>
## Short answer
Two or three sentences.
## Capacity map
Table: Step | Resource | Max per hour or day | Peak use | Off-peak use | Utilisation peak/off-peak.
## The constraint
Two or three sentences with the evidence.
## Real headroom
Table: Period | Spare capacity per week | Planned growth | Gap.
## Ways to lift the constraint
Table: Option | Cost | Extra capacity | Time to implement.
## What to do before marketing
Numbered steps and the measures to watch.
## Assumptions and questions
Bullets.
</output_format>

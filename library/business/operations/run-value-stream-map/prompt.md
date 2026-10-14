---
schema: 1
id: run-value-stream-map
kind: prompt
title: Build a value stream map
description: Builds a lean value stream map for one product or service family - process data, inventory and waiting between steps, lead time versus value-added time - and a future-state plan.
category: operations
version: 1.0.0
status: incubating
stage: [discover, design]
role: [operations-manager, manager, founder, business-analyst]
requires: [none]
inputs: [notes, dataset, text]
output: [diagram, table, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [value-stream-mapping, lean, lead-time, flow, waste-reduction]
pairs_with:
  prompts: [map-business-process, calculate-process-capacity, run-five-whys]
args:
  - name: value_stream
    description: The product or service family, from customer order or request to delivery. For each step - cycle time, changeover, people, uptime or availability, batch size, rework rate - and the queue or stock waiting before it (how many units or how many days).
    type: text
    required: true
  - name: information_flow
    description: How orders, forecasts and schedules move - who plans, how each step knows what to do next, systems used, how often the schedule changes.
    type: text
  - name: customer_demand
    description: Customer demand per day or week and available working time, plus the goal (shorter lead time, less stock, more output, fewer late orders).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Scope, Current-state map, Timeline, Biggest wastes, Future-state map, Implementation plan, Data to verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A value stream map shows one product or service family from order to delivery, with both the material (or work) flow and the information flow, and a timeline underneath comparing total lead time with value-added time. The usual surprise is the ratio: work often waits for days or weeks while value is added for minutes or hours, so the biggest gains come from queues, batch sizes and scheduling, not from making steps faster. Waiting time in front of a step can be estimated from stock or queue size divided by daily demand (Little's law). Experienced practitioners walk the actual flow, map one family at a time, use observed rather than standard times, and build the future state around takt time, continuous flow where possible, pull with supermarkets or FIFO lanes where not, and a single scheduling point. The map is a means to an implementation plan, not a poster.
</context>

<task>
Value stream:
<value_stream>
{{value_stream}}
</value_stream>

{{#information_flow}}Information flow:
<information_flow>
{{information_flow}}
</information_flow>{{/information_flow}}

Demand and goal:
<customer_demand>
{{customer_demand}}
</customer_demand>

1. Define the scope: the family, start and end points, customer demand, available time and takt time. If several families with different routings are mixed, pick the main one and say so.
2. Draw the current-state map as a Mermaid flowchart (left to right) with process boxes and their data, inventory or queue triangles between them, and the information flow from customer and planning. Keep labels short.
3. Build the timeline: for each queue, waiting time = quantity waiting divided by daily demand; for each step, value-added time. Total lead time, total value-added time and the ratio.
4. Identify the biggest wastes: the queues that dominate lead time, overproduction, batch sizes, rework loops, steps scheduled separately, steps out of step with takt.
5. Design the future state: where continuous flow is possible, where to use a supermarket or FIFO lane, the single scheduling point, smaller batches or shorter changeovers, and fixes to rework. Draw it as a second Mermaid diagram and estimate the new lead time.
6. Write an implementation plan in loops (pacemaker first, then upstream), with actions, owners as roles, dates as placeholders and measures.
7. List the data to verify on the shop floor or in the office before acting.
</task>

<constraints>
- Use only the data given; mark estimates clearly. Show how each waiting time was derived.
- Keep each map to one family and under about 15 boxes so it stays readable.
- Do not promise lead time reductions as fact; give them as estimates from the data, with assumptions.
- Valid Mermaid syntax only: quote labels that contain punctuation and use `<br>` for line breaks.
</constraints>

<output_format>
## Scope
## Current-state map
Mermaid diagram, then a table: Step | Cycle time | Changeover | People | Uptime | Batch | Queue before.
## Timeline
Table and the lead time to value-added ratio.
## Biggest wastes
## Future-state map
Mermaid diagram and estimated lead time.
## Implementation plan
Table: Loop | Action | Owner | Due | Measure.
## Data to verify
</output_format>

---
schema: 1
id: calculate-process-capacity
kind: prompt
title: Calculate process capacity and takt time
description: Calculates a process's capacity, takt time, bottleneck and utilisation from step times, staffing and demand, then shows which changes lift throughput and by how much.
category: operations
version: 1.0.0
status: incubating
stage: [plan, design]
role: [operations-manager, manager, founder]
requires: [none]
inputs: [notes, dataset, text]
output: [table, explanation, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [takt-time, throughput, bottleneck-analysis, line-balancing, capacity-planning]
pairs_with:
  prompts: [map-business-process, run-value-stream-map, analyze-process-cycle-times, reduce-changeover-time]
args:
  - name: process
    description: The steps in order, with the time each takes per unit (or per batch and batch size), people or machines at each step, setup or changeover times, and scrap or rework rates.
    type: text
    required: true
  - name: demand
    description: Units, orders or customers needed per day or week, and the available working time (shifts, hours, breaks, planned downtime).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Inputs used, Takt time, Capacity by step, Bottleneck, Gap to demand, Options to lift throughput, Data to check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Capacity questions are arithmetic, but people get them wrong in consistent ways. Takt time is available working time divided by customer demand; it is the pace the process must hit. Each step's capacity is its available time times the number of parallel people or machines, divided by its cycle time per unit, reduced by changeovers, downtime and the share of output lost to scrap and rework. The process can only go as fast as its slowest step (the bottleneck), so improving any other step adds nothing to output. An hour lost at the bottleneck is an hour lost for the whole process; an hour saved elsewhere is a mirage. Planners also overestimate capacity by using best-case or nameplate times instead of observed averages, by loading the bottleneck to 100% with no allowance for variation, and by forgetting breaks and meetings in available time.
</context>

<task>
Process:
<process>
{{process}}
</process>

Demand and available time:
<demand>
{{demand}}
</demand>

1. List the inputs used, converting all times to the same unit. Where a value is missing, state the assumption and mark it.
2. Compute available time per period (after breaks and planned downtime) and takt time. Show the working.
3. For each step compute effective cycle time per unit (including batch setup spread over the batch and the yield loss), capacity per period, and utilisation at current demand. Show the formula once and the numbers per step.
4. Identify the bottleneck and the next constraint, and say how much demand the process can meet.
5. State the gap to demand in units and as a percentage, and whether it is a capacity problem or a variation and planning problem.
6. Give options to lift throughput, focused on the bottleneck: remove waiting and non-essential work from it, run it through breaks, cut its changeovers, move tasks to under-loaded steps, add a person or machine, reduce rework upstream. For each, the estimated new bottleneck capacity and where the constraint moves next.
7. Recommend keeping utilisation at the bottleneck below about 85 to 90% when demand or times vary, and say why.
8. List the data that would most change the answer if it were wrong.
</task>

<constraints>
- Show the arithmetic so it can be checked. Round only at the end.
- Use only the times given; never invent cycle times or demand. Use clearly labelled assumptions for gaps.
- Do not recommend speeding up non-bottleneck steps to raise output; say it does not help.
- If the inputs are inconsistent (for example a step's output larger than its input), point it out before calculating.
</constraints>

<output_format>
## Inputs used
## Takt time
## Capacity by step
Table: Step | Cycle time per unit | Parallel resources | Capacity per period | Utilisation.
## Bottleneck
## Gap to demand
## Options to lift throughput
Table: Option | New bottleneck capacity | Effort | Where the constraint moves.
## Data to check
</output_format>

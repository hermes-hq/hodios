---
schema: 1
id: plan-construction-lookahead
kind: prompt
title: Plan a three-week construction lookahead
description: Plans a three-week lookahead schedule for a construction site with tasks by area and trade, deliveries, inspections, constraints to clear and risks, ready for the weekly coordination meeting.
category: operations
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [operations-manager]
subject: [engineering]
requires: [none]
inputs: [notes, dataset, document]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [construction, lookahead-schedule, site-coordination, last-planner, constraint-log, trade-sequencing]
pairs_with:
  prompts: [write-construction-rfi, write-construction-change-order, write-toolbox-talk]
args:
  - name: project_stage
    description: Where the project is - the current activities by area or floor, what the master programme says comes next, key milestones in the next month, and last week's progress or misses.
    type: text
    required: true
  - name: trades
    description: The trades or subcontractors on site in the next three weeks, crew sizes, and any known availability problems.
    type: text
    required: true
  - name: constraints
    description: Optional. Weather risks, site access or crane limits, working hours, neighbours, outstanding design information, long-lead materials and inspections to book.
    type: text
  - name: start_date
    description: Optional. The Monday the lookahead starts, used to put real dates on tasks; without it weeks are labelled Week 1 to 3.
    type: string
output_contract:
  format: markdown
  sections: [Summary, Lookahead, Deliveries, Inspections and approvals, Constraint log, Risks, Coordination meeting agenda, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan short-term lookahead schedules for construction site managers. The master programme says what should happen; the three-week lookahead decides what can actually happen, by breaking the next activities into tasks by area and trade and checking each one for the constraints that stop work: missing design information or open RFIs, materials not delivered, labour or equipment not available, permits or inspections not booked, access blocked by another trade, prerequisite work not finished, or weather. A task only goes on next week's plan when its constraints are cleared, and each constraint gets an owner and a date. This is the make-ready discipline used in collaborative planning methods such as the Last Planner System.

<project_stage>
{{project_stage}}
</project_stage>

<trades>
{{trades}}
</trades>
{{#constraints}}
<constraints>
{{constraints}}
</constraints>
{{/constraints}}
{{#start_date}}
Lookahead starts: {{start_date}}
{{/start_date}}
</context>

<task>
1. If the project stage gives no indication of the next activities or areas, ask for the relevant part of the master programme and stop.
2. Write a summary: the main goals for the three weeks, the milestone at risk, and the top constraint.
3. Break the next activities into tasks by area or floor and trade, in a logical sequence with predecessors. Use durations from the input where given; otherwise state your estimate as an assumption.
4. For every task, list its constraints and mark status: ready (all constraints cleared), at risk (constraints with an owner and date before the start) or blocked. Week 1 should contain only ready tasks or tasks whose constraints clear before they start.
5. Check trade stacking: no area with more trades than it can safely hold at once, no trade split across too many areas, and crane or hoist time not double-booked.
6. Schedule deliveries with the task they feed, the date needed on site and the storage or offloading plan.
7. List inspections and approvals to book, with notice needed `[CHECK]` and the task they release.
8. Build the constraint log: constraint, task affected, owner, date needed, status.
9. List risks for the period (weather, long-lead items, labour, design changes) with a response for each, and a backup task for crews if a planned task is blocked.
10. Write the coordination meeting agenda: last week's planned versus completed tasks and reasons for misses if given, the lookahead by area, constraints by owner, safety focus for the coming week, and commitments for next week.
11. Before writing the final version, check that no task in week 1 has an uncleared constraint without a clearing date, that predecessors come before successors, and that every task has a trade and an area.
</task>

<constraints>
- Do not invent progress, durations or delivery dates as facts. Label estimates.
- Safety is part of planning: flag tasks that create hazards for other trades in the same area (work at height above others, hot works, lifting) and need a permit or segregation.
- Inspection notice periods and permit rules depend on the authority and contract; mark them `[CHECK]`.
- Keep the plan readable in a site meeting: short task names, one line per task.
</constraints>

<output_format>
## Summary
## Lookahead
Table: Week | Day or dates | Area | Task | Trade | Crew | Predecessor | Constraints | Status.
## Deliveries
Table: Material | Needed on site | For task | Offloading and storage.
## Inspections and approvals
Table: Inspection | Book by | Releases task.
## Constraint log
Table: Constraint | Task | Owner | Needed by | Status.
## Risks
## Coordination meeting agenda
## Questions
At most four.
</output_format>

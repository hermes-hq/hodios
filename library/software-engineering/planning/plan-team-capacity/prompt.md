---
schema: 1
id: plan-team-capacity
kind: prompt
title: Plan team capacity
description: Works out a team's real capacity for a period after time off, on-call and interruptions, splits it across features, bugs, debt and support, and flags over-commitment and single-person dependencies.
category: planning
version: 1.0.0
status: incubating
aliases: [planning-capacity]
stage: [plan]
role: [engineering-manager, tech-lead, project-manager]
stack: []
requires: [none]
inputs: [text, notes]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [capacity-planning, resourcing, team-planning, over-commitment]
pairs_with:
  prompts: [plan-sprint, write-technical-roadmap, estimate-with-ranges]
  personas: [engineering-manager]
args:
  - name: team
    description: Who is on the team, their skills and what only they know, planned time off, on-call rotation, meetings and other regular commitments.
    type: text
    required: true
  - name: period
    description: The planning period, for example "next quarter, 12 weeks" or "the next two sprints".
    type: string
    required: true
  - name: demand
    description: The work asking for time - committed features with estimates, bug and support load from past periods, planned tech debt, and history of how much was actually delivered.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Available capacity, Allocation, Forecast, Risks]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Teams over-commit because they plan with headcount times working days. Real capacity is smaller: time off, holidays, on-call, interrupts, meetings and support eat a large and predictable share. A capacity plan starts from that real number, uses past delivery rather than hope, and makes trade-offs visible before the period starts.
</context>

<task>
Plan capacity for {{period}}.

Team:
<team>
{{team}}
</team>

Demand:
<demand>
{{demand}}
</demand>

1. Compute available capacity per person and in total, in days or points: start from working days, subtract holidays and time off, on-call, recurring meetings and a stated interrupt rate taken from history (or a stated assumption if there is none). Show the arithmetic.
2. Compare it with past delivery if given, and use the lower of the two as the planning number.
3. Allocate capacity across features, bugs, tech debt and support as percentages and days, keeping 10 to 20% unallocated as buffer, and say why you chose that split.
4. Place the committed features against the allocation. Mark which fit, which are at risk and which do not fit, and propose what to cut, defer or descope.
5. Forecast delivery over the period as a simple week-by-week burndown of the committed work, with a best and worst case.
6. Flag risks: weeks where several people are away, work only one person can do, on-call weeks colliding with deadlines, and dependencies on other teams.
</task>

<constraints>
- Never plan at 100% of available capacity.
- Do not invent velocity or interrupt rates; use the history given or state the assumption plainly.
- Name single-person dependencies by area of knowledge, and propose pairing or documentation for each.
- If the demand does not fit, say so plainly and make the trade-off explicit rather than squeezing estimates.
{{> output/uncertainty}}
</constraints>

<output_format>
## Available capacity
A table per person and a total, with the arithmetic.
## Allocation
Percentages and days per work type, and which committed items fit, are at risk or do not fit.
## Forecast
Week-by-week burndown with best and worst case.
## Risks
Ranked, each with a mitigation.
</output_format>

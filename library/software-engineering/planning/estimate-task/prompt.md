---
schema: 1
id: estimate-task
kind: prompt
title: Estimate a task
description: Estimates a software task as a range with a three-point breakdown, the assumptions behind it and the unknowns that drive the spread. Use when someone asks how long a piece of work will take.
category: planning
version: 1.0.0
status: experimental
stage: [plan]
role: [software-engineer, tech-lead, engineering-manager, project-manager]
stack: []
requires: [none]
inputs: [ticket, spec, text]
output: [table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [estimation, three-point-estimate, pert]
pairs_with:
  prompts: [break-down-epic, plan-spike]
args:
  - name: task
    description: The task or ticket to estimate, with acceptance criteria if there are any.
    type: text
    required: true
  - name: context
    description: Who does the work, how well they know the codebase, the tech involved, and similar past work with its actual duration.
    type: text
  - name: unit
    description: Unit for the estimate.
    type: enum
    enum: [hours, days, points]
    default: days
output_contract:
  format: markdown
  sections: [Estimate, Breakdown, Assumptions, Biggest unknowns, Not included]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A single-number estimate hides the information people need to plan: how uncertain it is and why. A three-point estimate per part (optimistic, most likely, pessimistic) makes the uncertainty visible, and naming the unknowns tells the team what to investigate to narrow it.
</context>

<task>
Estimate: {{task}}
{{#context}}
Context:
{{context}}
{{/context}}
Unit: {{unit}}.

1. Break the task into parts small enough to reason about, including the work people forget: reading existing code, tests, code review rounds, data migration, documentation, deployment and verification in a real environment.
2. For each part, give optimistic, most likely and pessimistic values in {{unit}}.
3. Compute the expected value per part as (optimistic + 4 × most likely + pessimistic) / 6 and sum them. Report the total as a likely value with a range from the summed optimistic to the summed pessimistic values. Show the arithmetic.
4. State the assumptions the numbers rest on.
5. Name the unknowns that widen the range most, and for each the cheapest way to shrink it (a question to ask, code to read, a short spike).
6. Give a confidence level (low, medium or high) with one reason.
</task>

<constraints>
- Never give a single number without a range.
- Do not pad silently. If you add buffer, show it as its own line with a reason.
- For points, estimate relative to a reference task from the context. If there is none, say that points cannot be calibrated and give days as well.
- If the task is too vague for a meaningful range, say so, give the questions that would make it estimable, and give a rough order of magnitude only.
- An estimate is not a commitment; do not phrase it as one.
{{> output/uncertainty}}
</constraints>

<output_format>
## Estimate
One line: likely X {{unit}}, range A to B {{unit}}, confidence level.
## Breakdown
Table: part, optimistic, most likely, pessimistic, expected, notes. Then the totals with the arithmetic.
## Assumptions
Bullets.
## Biggest unknowns
Bullets: unknown — effect on the range — how to shrink it.
## Not included
Bullets.
</output_format>

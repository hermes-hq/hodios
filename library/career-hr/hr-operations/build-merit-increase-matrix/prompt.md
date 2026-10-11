---
schema: 1
id: build-merit-increase-matrix
kind: prompt
title: Build a merit increase matrix
description: Builds a company-wide merit increase guideline grid from performance rating and position in range, models its cost against the pay review budget, and sets the rules managers follow.
category: hr-operations
version: 1.0.0
status: incubating
stage: [plan, design]
role: [operations-manager, executive, founder]
requires: [none]
inputs: [dataset, text]
output: [table, report, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [merit-matrix, pay-review, compa-ratio, compensation-budget, salary-increase-guidelines]
pairs_with:
  prompts: [allocate-merit-increases, design-salary-bands, analyze-pay-equity, write-pay-review-letters]
  personas: [hr-business-partner]
args:
  - name: budget
    description: The total merit budget as a percentage of payroll or an amount, whether promotions and market adjustments come from the same pot, and the effective date.
    type: text
    required: true
  - name: population
    description: Counts of employees by performance rating and by position in range (compa-ratio bands or quartiles), or a pseudonymised table with salary, range midpoint and rating. Note eligibility rules such as new joiners.
    type: text
    required: true
  - name: principles
    description: What leadership wants the review to do (reward top performers, close gaps for people low in range, hold pay for weak performance), the rating scale and its definitions, and any country differences or collective agreements. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, Matrix, Cost model, Manager rules, Equity checks, Open decisions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design merit increase guidelines the way an experienced compensation lead does. A merit matrix sets a target increase for each combination of performance rating and position in the salary range: higher performance earns more, and people low in their range get more than people near or above the top, so pay moves toward the right level over time. What goes wrong: a matrix that looks fair but costs more than the budget because the rating distribution was not modelled; ratings inflated so most people land in the top boxes; no rule for people above the range maximum; and a grid applied mechanically so existing gaps between groups grow. Ranges (minimum to maximum per cell) give managers judgment within limits. Collective agreements or statutory increases may override the matrix in some places.

<budget>
{{budget}}
</budget>

<population>
{{population}}
</population>
{{#principles}}
<principles>
{{principles}}
</principles>
{{/principles}}
</context>

<task>
1. Assumptions: what you take from the inputs, eligibility, and what is missing. If the population distribution is missing, ask for it; a matrix cannot be costed without it.
2. Matrix: a grid of rating by position-in-range band, each cell with a target and a minimum-maximum range. Explain the logic in three bullets.
3. Cost model: multiply the distribution by the targets (salary-weighted where salaries are given) and compare with the budget. Show the working. If over or under, adjust and show the revised grid.
4. Manager rules: how much discretion managers have, how to treat people above maximum (lump sum or no base increase), new joiners, part-timers, people on leave, and promotions in the same cycle.
5. Equity checks: tests to run on proposed increases before approval (by gender and other lawful groups where data exists, part-time versus full-time, people on leave during the year), with a minimum group size for reporting.
6. Open decisions for leadership.
</task>

<constraints>
- Show every cost calculation; never state a total you did not compute.
- Do not invent market movement or budget norms; use the user's budget.
- Use pseudonymised data only; do not ask for names.
- Flag where collective agreements, minimum wage changes or statutory rules may override the matrix, as points to confirm locally.
{{> output/uncertainty}}
</constraints>

<output_format>
## Assumptions
## Matrix
Table: Rating by position-in-range band, each cell "target (min-max)".
## Cost model
Table: Cell | Headcount or payroll | Target | Cost, then total versus budget.
## Manager rules
## Equity checks
## Open decisions
Numbered.
</output_format>

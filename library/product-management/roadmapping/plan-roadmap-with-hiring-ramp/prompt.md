---
schema: 1
id: plan-roadmap-with-hiring-ramp
kind: prompt
title: Plan a roadmap with a hiring ramp
description: Plans roadmap capacity while a team is growing, counting time to hire, onboarding ramp and the drag on existing staff, so the plan does not assume new people are productive on day one.
category: roadmapping
version: 1.0.0
status: incubating
stage: [plan]
role: [product-manager, engineering-manager, founder, executive]
requires: [none]
inputs: [text]
output: [table, plan, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [team-growth, onboarding-ramp, capacity-planning, hiring-plan, brooks-law, headcount]
pairs_with:
  prompts: [forecast-roadmap-dates-with-ranges, run-quarterly-planning, allocate-capacity-across-departments]
args:
  - name: team_and_hiring
    description: Current team size and roles, open roles with target start dates, how long hiring usually takes for you, and how long new people typically take to become fully productive.
    type: text
    required: true
  - name: roadmap
    description: The roadmap items for the period with rough sizes in person-weeks or team-weeks, and any fixed dates.
    type: text
    required: true
  - name: period
    description: The planning period.
    type: enum
    enum: [quarter, half, year]
    default: half
output_contract:
  format: markdown
  sections: [Assumptions, Capacity by month, Roadmap fit, What to sequence differently, If hiring slips, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan a roadmap for a team that is hiring. The common mistake is counting heads on their planned start date at full output. In reality roles open later than planned, hiring takes months, new people ramp up over several months, and the people who interview and onboard them lose time too, so a growing team often delivers less for a while before it delivers more (Brooks's observation that adding people to a late project makes it later). A credible plan models capacity month by month, puts work that new people can learn on later in the period, and keeps the riskiest, most context-heavy work with the existing team.

Planning period: {{period}}
</context>

<task>
<team_and_hiring>
{{team_and_hiring}}
</team_and_hiring>

<roadmap>
{{roadmap}}
</roadmap>

1. Assumptions: time to hire per role, ramp curve (for example 25% in month one, 50% in month two, 75% in month three, full after that, unless the user gives their own), interviewing and onboarding drag on existing staff (as hours per hire), and the share of time lost to support and meetings. Use the user's figures where given and mark defaults as defaults.
2. Capacity by month: existing staff plus each new hire's ramped contribution minus drag, in person-weeks. Show the arithmetic for at least one month and the total for the period. Compare with the naive headcount-on-start-date figure.
3. Roadmap fit: compare total sizes with ramped capacity month by month. Say which items fit, which are at risk and where fixed dates collide with low-capacity months.
4. What to sequence differently: keep context-heavy and risky items with the existing team early; put well-defined, learnable work later where new hires can contribute; protect time for onboarding material.
5. If hiring slips: recompute with each hire starting two months later and say what moves.
</task>

<constraints>
- Show all arithmetic; do not hide a capacity gap in rounding.
- Do not assume hires start on their planned date or reach full output in the first month.
- Label every default as an assumption to replace with the team's own history.
- If team size, hiring plans or roadmap sizes are missing, ask for them and stop.
{{> output/uncertainty}}
</constraints>

<output_format>
## Assumptions
Table: assumption | value | source (given or default).

## Capacity by month
Table: month | existing | new hires ramped | drag | net capacity | naive capacity. One worked example below the table.

## Roadmap fit
Table: item | size | planned month | fits, at risk or does not fit.

## What to sequence differently
Bullets.

## If hiring slips
The recomputed total and what moves.

## Questions
What to confirm.
</output_format>

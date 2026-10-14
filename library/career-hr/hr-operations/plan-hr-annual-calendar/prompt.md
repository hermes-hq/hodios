---
schema: 1
id: plan-hr-annual-calendar
kind: prompt
title: Plan the HR annual calendar
description: Builds a twelve-month HR calendar that sequences reviews, pay, benefits renewals, surveys, filings and policy reviews, with lead times, owners and clashes with the business's peak periods.
category: hr-operations
version: 1.0.0
status: incubating
stage: [plan]
role: [operations-manager, founder, project-manager]
requires: [none]
inputs: [text]
output: [plan, table, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
depth: specific
tags: [hr-calendar, annual-planning, pay-review-cycle, performance-cycle, statutory-deadlines]
pairs_with:
  prompts: [define-hr-metrics, design-engagement-survey, allocate-merit-increases]
args:
  - name: organisation
    description: Headcount, countries, financial year start, the business's busy periods, and the size of the HR team.
    type: text
    required: true
  - name: processes
    description: The HR processes you run or want to run, with any fixed dates you know, for example "pay review effective 1 April", "health insurance renews 1 January", "annual survey", "performance reviews twice a year", "gender pay report".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Assumptions, Calendar, Dependencies and lead times, Clashes and load, Statutory dates to confirm, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An HR calendar stops the same scramble happening every year. The key is sequencing: performance ratings should be final before pay review decisions; the pay budget must be agreed with finance before managers allocate it; salary band refreshes come before the pay review, not after; benefits renewals need decisions two to three months before the renewal date; an engagement survey should not land in the same month as reviews or the busiest trading period; and statutory filings and reports have fixed deadlines that differ by country. A small HR team also needs the load spread so that no month carries three big cycles.

<organisation>
{{organisation}}
</organisation>

<processes>
{{processes}}
</processes>
</context>

<task>
1. Assumptions: state the year start, countries and any fixed dates you are relying on. Mark missing ones [DATE].
2. Calendar: month by month for twelve months, the HR activities, each with prep start, key milestone and owner (HR, finance, managers, leadership).
3. Dependencies and lead times: the chains that must run in order (for example ratings, calibration, pay budget, allocation, letters, payroll cut-off), with the minimum gap between steps.
4. Clashes and load: months where cycles overlap or hit the business's busy period, and the moves that fix them; the HR team's busiest months.
5. Statutory dates to confirm: types of filings, reports or notices that commonly fall in the year for the named countries (labelled "typical, confirm with an adviser or official source"), never as fixed dates you assert.
6. Questions that need a decision.
</task>

<constraints>
- Do not invent statutory deadlines; list them as items to confirm.
- Use only the processes given plus clearly marked suggestions; label suggestions as optional.
- Keep it realistic for the HR team size given.
{{> output/uncertainty}}
</constraints>

<output_format>
## Assumptions
## Calendar
Table: Month | Activity | Prep starts | Milestone | Owner.
## Dependencies and lead times
## Clashes and load
## Statutory dates to confirm
## Questions
</output_format>

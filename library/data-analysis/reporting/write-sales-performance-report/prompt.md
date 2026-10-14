---
schema: 1
id: write-sales-performance-report
kind: prompt
title: Write a sales performance report
description: Writes a weekly or monthly sales report with bookings against quota, pipeline coverage, win rates, deal metrics, forecast risk and fair team or region highlights.
category: reporting
version: 1.0.0
status: incubating
stage: [operate, review]
role: [manager, sales-rep, executive, operations-manager]
inputs: [dataset, text]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [quota-attainment, pipeline-coverage, win-rate, sales-forecast, revops]
pairs_with:
  prompts: [review-sales-pipeline, analyze-sales-data, write-monthly-business-review, set-scorecard-status-thresholds]
args:
  - name: sales_data
    description: "Bookings or closed-won revenue for the period and year to date against quota (total, by team, region or rep), open pipeline by stage and close date, deals won and lost with values, new pipeline created, and forecast categories (commit, best case) if you use them."
    type: text
    required: true
  - name: period
    description: The reporting period and where it sits in the quarter or year (for example "week 7 of 13 in Q3", "October, month 1 of Q4").
    type: string
    required: true
  - name: context
    description: "Sales motion (inbound, outbound, channel), typical cycle length and historical win rate, ramping reps or territory changes, and the audience. Optional."
    type: text
output_contract:
  format: markdown
  sections: [Summary, Bookings against quota, Pipeline and forecast, Win rates and deal metrics, Team and region highlights, Risks and actions, Data notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A sales report has to show where the number will land, not only where it stands. Sales leaders read four things: attainment to date against quota, whether there is enough pipeline to close the gap, whether that pipeline is real, and which leading indicators are moving. Pipeline coverage is open pipeline due to close in the period divided by the quota still to close; the "3x" rule of thumb only holds for a win rate of about a third, so the needed coverage is roughly one divided by the historical win rate. Win rate by count and by value tell different stories; large deals often win less often. Pipeline quality shows in close dates already in the past, deals stuck in a stage far longer than the usual cycle, and repeated slips. New pipeline created this period is the best leading indicator of next quarter. Team averages hide spread: report median attainment and how many reps are at or above quota, and do not rank ramping reps or reps with changed territories against tenured ones without saying so.

{{#context}}Context: {{context}}{{/context}}
</context>

<task>
<sales_data>
{{sales_data}}
</sales_data>

<period>{{period}}</period>

1. Compute bookings against quota for the period and year to date, in total and by team or region, plus the remaining gap and the share of the period elapsed.
2. Compute pipeline coverage of the remaining gap, compare it with the coverage the historical win rate implies, and give a forecast range from commit and best case (or from weighted pipeline if categories are absent), saying how it was built.
3. Check pipeline quality: deals with past close dates, deals aged beyond the normal cycle, slipped deals, and concentration in a few large deals.
4. Report win rate by count and by value, average deal size, sales cycle length and new pipeline created, each against the previous period.
5. Write team, region or rep highlights with median attainment and the number at or above quota, noting ramping reps and territory changes.
6. List the main risks to the number and concrete actions with owners.
</task>

<constraints>
- Compute only from the data given; show the numbers behind every ratio.
- Do not call a forecast likely or safe without stating the method and the assumptions.
- Do not rank individuals publicly unless the audience note asks for it; when you do, add context on ramp and territory.
- Treat stale close dates and aged deals as risk, not as pipeline at face value.
- Do not invent win rates or benchmarks; if no historical win rate is given, say coverage cannot be judged against one.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Three to five sentences: attainment, gap, forecast range, the biggest risk, the main action.

## Bookings against quota
Table: Team or region | Quota | Booked | Attainment | Gap | Year to date attainment.

## Pipeline and forecast
Coverage calculation, required coverage at the historical win rate, forecast range and method, pipeline quality findings.

## Win rates and deal metrics
Table: Measure | This period | Previous period | Change.

## Team and region highlights
Median attainment, number at or above quota, notable wins and losses with reasons where recorded.

## Risks and actions
Table: Risk | Value at stake | Action | Owner | By when.

## Data notes
Bullets: data gaps, definitions used, hygiene issues found.
</output_format>

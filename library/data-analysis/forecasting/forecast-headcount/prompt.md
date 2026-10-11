---
schema: 1
id: forecast-headcount
kind: prompt
title: Forecast headcount month by month
description: Forecasts a team's headcount month by month from starting staff, tenure-based attrition, hiring lead times and ramp-up, and shows the hiring plan needed to meet a workload or budget target.
category: forecasting
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, operations-manager, executive, financial-analyst]
inputs: [text, dataset]
output: [table, plan, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [workforce-planning, attrition, hiring-plan, time-to-fill, staffing]
pairs_with:
  prompts: [write-headcount-request, analyze-workforce-data, plan-team-capacity]
args:
  - name: workforce
    description: "Current headcount by team or role (heads and FTE), recent leavers per month, how attrition differs for staff in their first year, open vacancies, time to fill a role, notice periods and time for a new hire to become fully productive. Aggregate numbers only, no names."
    type: text
    required: true
  - name: demand
    description: What the team needs to deliver - workload drivers (tickets, customers, projects, sites) and how much one productive person handles, or a budget or headcount cap.
    type: text
  - name: horizon
    description: Months ahead to forecast.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Summary, Starting position, Attrition assumptions, Staff needed, Month-by-month forecast, Hiring plan implied, Risks and scenarios]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Headcount plans usually go wrong in the same ways: they assume people arrive the day a role is approved, ignore that some people will leave, and treat a new hire as fully productive on day one. In reality the supply of staff is a flow with lags: approval, then time to fill, then notice period, then onboarding and ramp-up, while leavers resign with notice. Attrition is not uniform: people in their first year leave at a higher rate than long-tenured staff, and there are seasonal waves (after bonus payments, at the end of an academic year). Heads, FTE and productive FTE are three different numbers. For small teams one leaver is a large percentage, so the forecast should be read as a range. The demand side matters too: the number of people needed comes from the workload and what one productive person can handle, not from last year's headcount plus a bit.

Horizon: {{horizon}}
{{#demand}}Demand: {{demand}}{{/demand}}
</context>

<task>
<workforce>
{{workforce}}
</workforce>

1. Starting position: heads, FTE and productive FTE now, open vacancies and their stage, and people currently serving notice.
2. Attrition assumptions: monthly leaver rate from the history, split by first-year and longer-tenured staff where the data allows; seasonal patterns; express each as expected leavers per month. Label assumed rates.
3. Staff needed: translate the workload or cap into required productive FTE per month, showing the arithmetic. If no demand is given, forecast supply only and say so.
4. Month-by-month forecast: opening heads, plus starters, minus leavers, equals closing heads; then productive FTE after ramp-up for recent starters. Apply time to fill and notice periods so hires arrive when they realistically would.
5. Hiring plan implied: how many hires must be approved and when, to close the gap with required FTE, allowing for the lead time and for the extra attrition that new joiners bring. Show the month by which each hire must start recruiting.
6. Risks and scenarios: higher or lower attrition, slower hiring, workload changes; give the gap in productive FTE for each and the most sensitive assumption.
</task>

<constraints>
- Use aggregate figures only; do not request or use names or personal data about individuals.
- Keep heads, FTE and productive FTE separate and named in every table.
- Compute only from figures supplied; label assumptions and show where they would come from.
- Do not recommend dismissals or redundancies; if supply exceeds need, show the gap and note that natural attrition and redeployment are options for the organisation's HR and legal process to consider.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Closing headcount and productive FTE at the horizon, the gap to need, and the date by which hiring must start.

## Starting position
Bullets.

## Attrition assumptions
Table: group | monthly rate | expected leavers per month | source.

## Staff needed
Table: month | workload | required productive FTE.

## Month-by-month forecast
Table: month | opening | starters | leavers | closing heads | productive FTE | required | gap.

## Hiring plan implied
Table: hire | start recruiting by | expected start | productive by.

## Risks and scenarios
Bullets with numbers.
</output_format>

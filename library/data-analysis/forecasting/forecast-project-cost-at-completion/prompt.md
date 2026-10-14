---
schema: 1
id: forecast-project-cost-at-completion
kind: prompt
title: Forecast a project's cost at completion
description: Forecasts what a project will cost and when it will finish from spend and progress to date, using earned value indices, a bottom-up estimate to complete and a range, not the original budget.
category: forecasting
version: 1.0.0
status: incubating
stage: [operate]
role: [project-manager, financial-analyst, operations-manager, executive]
inputs: [dataset, text]
output: [table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [earned-value, estimate-at-completion, cost-forecast, project-controls]
pairs_with:
  prompts: [forecast-roadmap-dates-with-ranges, run-monte-carlo-simulation, write-forecast-commentary]
args:
  - name: project_data
    description: "Budget at completion, planned schedule, actual cost to date, planned value to date, and progress measured as earned value or percent complete by work package, plus contingency and change orders."
    type: text
    required: true
  - name: known_issues
    description: "Risks, claims, scope changes, price rises or productivity problems known to the team, and the team's own estimate to complete if they have one. Optional."
    type: text
output_contract:
  format: markdown
  sections: [Summary, Performance to date, Estimates at completion, Schedule forecast, Range and contingency, Questions for the team]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Project cost forecasts are routinely too optimistic because they assume the rest of the work will go to plan even though the work so far did not. Earned value management gives a discipline: compare earned value (budgeted cost of work actually done) with actual cost (cost performance index, CPI) and with planned value (schedule performance index, SPI). Research on large project portfolios finds that CPI rarely improves much after a project is a fifth or so complete, so an estimate at completion of budget divided by CPI is a realistic central case, while budget minus remaining-at-plan is an optimistic bound and a CPI times SPI formula is a pessimistic one when schedule pressure drives cost. Progress measurement is the weak point: "percent complete" by spend is circular and makes CPI meaningless, so progress should be measured by physical milestones or completed work packages. A bottom-up estimate to complete from the team should be compared with the index-based ones; a big gap needs an explanation.
</context>

<task>
<project_data>
{{project_data}}
</project_data>
{{#known_issues}}

<known_issues>
{{known_issues}}
</known_issues>
{{/known_issues}}

1. Check how progress is measured; if earned value is derived from spend, say the indices are unreliable and ask for physical progress.
2. Compute cost variance, schedule variance, CPI and SPI, overall and by work package where data allows.
3. Compute estimates at completion: optimistic (actual cost plus remaining budget), CPI-based (budget divided by CPI), and CPI times SPI based; compare with the team's bottom-up estimate if supplied, and with known issues added on top.
4. Compute the to-complete performance index needed to finish within budget and say whether that performance is plausible given the record.
5. Forecast the finish date using SPI or remaining work over recent progress rates, and note the limits of SPI late in a project.
6. Give a recommended estimate at completion with a range, compare it with remaining contingency, and list the questions to put to the team.
</task>

<constraints>
- Compute only from figures supplied and show each formula with numbers.
- Do not present the original budget as the forecast when indices say otherwise.
- Contractual claims, variations and their entitlement are for the commercial or legal owner; include them only as amounts and probabilities supplied.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Recommended estimate at completion, range, finish date forecast, and contingency position.

## Performance to date
Table: Measure | Value | Formula.

## Estimates at completion
Table: Method | EAC | Variance at completion | When it applies.

## Schedule forecast
Forecast finish and method.

## Range and contingency
Low, central, high against remaining contingency.

## Questions for the team
Bullets.
</output_format>

---
schema: 1
id: forecast-fundraising-income
kind: prompt
title: Forecast fundraising income
description: Forecasts a nonprofit's income for the year by stream - regular givers, one-off donors, major gifts, grants pipeline, events, legacies - with retention, probability weighting and a cautious range.
category: forecasting
version: 1.0.0
status: incubating
stage: [plan]
role: [executive, financial-analyst, operations-manager, data-analyst]
subject: [nonprofit]
inputs: [dataset, text]
output: [table, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [income-forecast, donor-retention, grant-pipeline, charity-finance]
pairs_with:
  prompts: [plan-annual-fundraising-mix, analyze-donor-data, plan-for-funding-loss, present-forecast-uncertainty]
args:
  - name: income_data
    description: "Past income by stream (at least two years), donor counts and retention for regular and one-off givers, average gifts, the major gift and grant pipeline with amounts, stage and decision dates, and planned events or appeals."
    type: text
    required: true
  - name: year
    description: The financial year to forecast and how far through the current year you are.
    type: string
    required: true
  - name: purpose
    description: "What it is for: budget setting, board reporting, reserves planning, a funding bid. Optional."
    type: string
output_contract:
  format: markdown
  sections: [Summary, Forecast by stream, Pipeline weighting, Scenarios, Risks and signposts]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Nonprofit income forecasts go wrong when they are a single total grown by a percentage. Each income stream behaves differently and needs its own logic. Regular giving is the most predictable: this year's income is the retained donors times their average gift plus new recruits, and attrition is front-loaded among new donors. One-off giving depends on appeals and retention of last year's donors, which is often low. Major gifts and grants are lumpy: a pipeline weighted by probability and timing is better than history, but weighting hides the all-or-nothing reality, so the largest few should also be shown as scenarios. Events have costs and should be forecast net. Legacies are volatile and outside the charity's control; many finance teams budget them cautiously, from a multi-year average or notified legacies only. Restricted income must be shown apart from unrestricted because it cannot cover core costs. A board needs a central case, a downside it can survive, and the signposts that show which one is unfolding.

Year: {{year}}
{{#purpose}}Purpose: {{purpose}}{{/purpose}}
</context>

<task>
<income_data>
{{income_data}}
</income_data>

1. Split income into streams and, for each, choose the forecast logic: retention times average gift plus recruitment for regular giving; retention and appeal response for one-off giving; probability and timing weighted pipeline for major gifts and grants; net income for events; cautious averages or notified amounts for legacies.
2. Compute each stream for the year, showing the arithmetic and the assumption behind each driver. Separate restricted and unrestricted income where the data allows.
3. Weight the pipeline: amount times probability for each opportunity, assigned to the period of expected receipt; list the largest opportunities individually.
4. Build three scenarios: central, downside (key grants lost, lower retention, legacies at the low end) and upside, and say what each implies for the budget.
5. Name signposts with dates: grant decision dates, appeal results, retention at month X, that will show which scenario is unfolding.
</task>

<constraints>
- Use only figures supplied; label every assumption and show its effect.
- Do not count weighted pipeline as secured income; show secured, probable and possible separately.
- Accounting recognition of income and restricted funds rules vary by country; flag questions for the finance lead or auditor rather than deciding them.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Central forecast, downside, upside, and the share already secured.

## Forecast by stream
Table: Stream | Method | Key assumptions | Restricted | Unrestricted | Total.

## Pipeline weighting
Table: Opportunity | Amount | Probability | Expected | Expected date | Status.

## Scenarios
Table: Scenario | Total | What differs | Budget implication.

## Risks and signposts
Bullets: signpost, date, what it would mean.
</output_format>

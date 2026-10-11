---
schema: 1
id: forecast-subscription-revenue
kind: prompt
title: Forecast subscription revenue by cohort
description: Forecasts recurring revenue by sign-up cohort, keeping the existing base separate from new business, with an MRR bridge of new, expansion, contraction and churn and scenarios.
category: forecasting
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, financial-analyst, business-analyst, data-analyst]
subject: [saas]
inputs: [dataset, text]
output: [report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [mrr, cohort-analysis, churn, net-revenue-retention, recurring-revenue]
pairs_with:
  prompts: [plan-expansion-revenue, forecast-time-series, present-forecast-uncertainty]
args:
  - name: subscription_data
    description: "What you have: monthly MRR or subscriber counts by sign-up cohort, or at least monthly new, churned, expansion and contraction MRR; plan mix (monthly or annual), prices, and how churn is defined. Leave out customer names."
    type: text
    required: true
  - name: horizon
    description: How many months ahead to forecast.
    type: string
    required: true
  - name: plans
    description: Known changes ahead - price rises, new plans, marketing spend, sales hiring, annual renewals coming due.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Data and definitions, Existing base, New business, MRR bridge, Scenarios, Risks and checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A subscription business has two very different forecasts inside it. Revenue from customers you already have is fairly predictable if you forecast it by cohort: churn is highest in the first months after sign-up and falls as a cohort ages, so applying one average churn rate to the whole base overstates churn for old customers and understates it for new ones. Revenue from customers you have not won yet is the uncertain part and depends on marketing and sales capacity. Annual plans churn in lumps at renewal dates, not smoothly. Price rises lift revenue but cause a churn spike at the next renewal. Logo churn (customers lost) and revenue churn differ when big and small customers behave differently, and expansion can push net revenue retention above 100% even with logo churn. MRR, billings and recognised revenue are different numbers; finance teams need to know which one the forecast is.

Horizon: {{horizon}}
{{#plans}}Known changes: {{plans}}{{/plans}}
</context>

<task>
<data>
{{subscription_data}}
</data>

1. Data and definitions: state which revenue measure this is, how churn and expansion are defined, the plan mix, and any gaps. If the data is only totals with no cohort detail, say what cohort data would add and proceed with the best available method, labelled as such.
2. Existing base: estimate retention by cohort age (month 1, 2, 3 and so on) from the history, separately for monthly and annual plans if possible, plus expansion and contraction rates. Project each existing cohort forward and sum them. Place annual renewals in the months they fall due.
3. New business: forecast new subscribers or new MRR from recent trend and the stated plans, then age each new cohort with the same retention curve. Keep this as a separate line.
4. MRR bridge: for each month, opening MRR, plus new, plus expansion, minus contraction, minus churn, equals closing MRR. Show net revenue retention and gross revenue retention for the period.
5. Scenarios: low, central and high, varying new business most and retention less; add the effect of any planned price rise as explicit extra churn at renewal with a stated assumption.
6. Risks and checks: sensitivity of the closing number to a one-point change in early-tenure churn and to new-business volume; sanity checks such as implied customer lifetime and whether the forecast exceeds sales capacity.
</task>

<constraints>
- Never apply a single blended churn rate to all cohorts when cohort data exists; if you must because data is missing, flag it as a known bias.
- Compute only from figures supplied. Label every assumed rate and show where it would come from.
- Keep currency and measure (MRR, ARR, billings, revenue) consistent and named in every table.
- Do not present the central case as a target. If the person gives a target, compare it with the scenarios and say what would have to be true.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Closing MRR or revenue at the horizon for each scenario, the share from the existing base, and the main risk.

## Data and definitions
Bullets.

## Existing base
Table: cohort age | retention | expansion | source; then projected base by month.

## New business
Table: month | new subscribers or MRR | assumption.

## MRR bridge
Table: month | opening | new | expansion | contraction | churn | closing.

## Scenarios
Table: scenario | closing MRR | what differs.

## Risks and checks
Bullets with the sensitivities.
</output_format>

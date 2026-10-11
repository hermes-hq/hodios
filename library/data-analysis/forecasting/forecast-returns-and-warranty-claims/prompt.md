---
schema: 1
id: forecast-returns-and-warranty-claims
kind: prompt
title: Forecast returns and warranty claims
description: Forecasts product returns or warranty claims from past and planned sales using the lag between sale and claim and the claim rate by product and age, so provisions, spares and staff are planned.
category: forecasting
version: 1.0.0
status: incubating
stage: [plan]
role: [data-analyst, operations-manager, financial-analyst, business-analyst]
subject: [ecommerce, retail]
inputs: [dataset, text]
output: [table, report, code]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [returns-forecast, warranty-claims, lag-distribution, sales-cohorts]
pairs_with:
  prompts: [forecast-time-series, forecast-intermittent-demand, present-forecast-uncertainty]
args:
  - name: sales_and_claims
    description: "Units sold by month (by product or family), and claims or returns with both the sale month and the claim month, or at least claims by month and the typical time to claim. Warranty length or returns window."
    type: text
    required: true
  - name: future_sales
    description: The sales forecast or plan for the coming periods. Optional; without it only claims from units already sold are forecast.
    type: text
  - name: use
    description: "What the forecast is for: a warranty provision, spare parts, returns warehouse staffing, refunds cash planning."
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Summary, Lag profile, Claim rates, Forecast, Code, Caveats]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Returns and warranty claims are an echo of sales: each month's sales generate claims spread over the following weeks or years. Forecasting claims directly from the claims time series misses this and fails at turning points (a sales peak at Christmas produces a returns peak in January; a warranty spike follows a product's sales by months or years). The standard approach treats each sale month as a cohort: estimate the claim rate per unit sold and the lag distribution (share of a cohort's claims arriving in month 1, 2, 3 after sale and so on), then forecast claims as the sum over cohorts of units sold times rate times lag share. Recent cohorts are immature, so their final claim rate is not yet visible and must be projected from older cohorts' development (the same idea as an insurance claims triangle). Rates differ by product and channel (online returns far exceed in-store), and a product quality issue shows up as a cohort whose early claims run above the usual curve, which is the early warning worth surfacing.

Use: {{use}}
</context>

<task>
<sales_and_claims>
{{sales_and_claims}}
</sales_and_claims>
{{#future_sales}}

<future_sales>
{{future_sales}}
</future_sales>
{{/future_sales}}

1. Build the cohort table (sale month by months since sale) from the data. If only claims by month are supplied, say the lag profile must be assumed and state the assumption.
2. Estimate the lag profile (share of eventual claims by month since sale) and the ultimate claim rate per unit sold, using mature cohorts; project immature cohorts forward using the profile.
3. Check for cohorts running above or below the usual curve and flag possible quality or policy changes.
4. Forecast claims by future month: from units already sold (known) plus from future sales (if supplied). Show the two parts separately.
5. Give a range from the variation in rates across cohorts.
6. Translate into the units the use requires (provision value, parts, staff hours) only when the needed conversion figures are supplied; otherwise list them.
7. Provide code or spreadsheet steps to rebuild the triangle monthly.
</task>

<constraints>
- Compute only from data supplied and show the cohort table.
- Do not treat immature cohorts' claims to date as their final rate.
- Accounting treatment of warranty provisions is for the finance owner; this forecast supplies the expected claims, not the accounting entry.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Expected claims for the horizon, split into already-sold and future-sales parts, with range and any cohort warnings.

## Lag profile
Table: Months since sale | Share of claims | Cumulative share.

## Claim rates
Table: Cohort | Units sold | Claims to date | Maturity | Projected ultimate rate.

## Forecast
Table: Month | From units sold | From future sales | Total | Low | High.

## Code
Code or formulas.

## Caveats
Bullets.
</output_format>

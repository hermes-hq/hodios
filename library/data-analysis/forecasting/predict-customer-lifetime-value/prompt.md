---
schema: 1
id: predict-customer-lifetime-value
kind: prompt
title: Predict customer lifetime value
description: Predicts future purchases and value per customer from order history with BG/NBD and Gamma-Gamma models (or a cohort fallback), validated on a time holdout before use.
category: forecasting
version: 1.0.0
status: incubating
stage: [build]
role: [data-scientist, data-analyst, marketer]
stack: [pandas]
subject: [ecommerce, retail]
inputs: [dataset, schema, text]
output: [code, table, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [customer-lifetime-value, bg-nbd, gamma-gamma, rfm, holdout-validation]
pairs_with:
  prompts: [calculate-customer-lifetime-value, analyze-repeat-purchase-behaviour, model-unit-economics]
args:
  - name: data_description
    description: "The order data: columns (customer id, order date, order value, returns), date range, number of customers and orders, and whether customers have contracts or subscriptions."
    type: text
    required: true
  - name: use
    description: "What the prediction will drive: acquisition cost limits, segmenting for retention campaigns, finance forecasts, VIP lists."
    type: text
    required: true
  - name: horizon
    description: Prediction horizon (for example 12 months) and the discount rate to use, if any.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Summary, Is this the right model, Data preparation, Models, Validation, Outputs and use, Code]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
For non-contractual businesses (shops, marketplaces, restaurants), where a customer's departure is never observed, the standard predictive approach is the "buy till you die" family: BG/NBD (or Pareto/NBD) predicts how many repeat purchases each customer will make from frequency, recency and age (T), and Gamma-Gamma predicts their average order value; together they give expected value over a horizon. Practitioners know the details that make or break it: frequency counts repeat purchases only (the first order is excluded), monetary value is the mean of repeat orders, multiple orders on one day are merged, returns are netted, and Gamma-Gamma assumes order value is independent of purchase frequency, which should be checked by correlation. Value should be on gross margin, not revenue, and discounted. The models must be validated on a time holdout (fit on a calibration period, compare predicted with actual purchases in the next period) before anyone acts on them. Individual predictions are noisy; they rank customers well and sum to good totals, but a single customer's figure is not a promise. For subscriptions or contracts, churn is observed and a survival or retention model fits better. The Python `lifetimes` package is no longer actively maintained; PyMC-Marketing's CLV module is the maintained successor.
</context>

<task>
Predict customer value {{horizon}} for this use: {{use}}

<data>
{{data_description}}
</data>

1. Decide whether the model fits: non-contractual repeat buying, enough repeat customers (a few thousand customers and at least a year of history is a practical minimum), stable business. If contractual or too little data, say so and switch to a cohort or retention-based method.
2. Prepare the data: merge same-day orders, net returns, convert to margin if margin rates are available, exclude test and staff accounts, and build the RFM summary (frequency, recency, T, monetary value) for a calibration period and a holdout period.
3. Fit BG/NBD on the calibration period; check the fit (predicted versus actual repeat-purchase counts, plot of purchases by frequency).
4. Validate on the holdout: predicted versus actual purchases in total and by decile of predicted value; report error and whether the ranking holds.
5. Check the Gamma-Gamma independence assumption (correlation of frequency and monetary value among repeat buyers), fit it on repeat buyers, and combine into discounted value over the horizon.
6. Refit on all data and produce outputs fit for the use: segments or deciles, expected purchases, expected value, probability still active.
7. Write Python code (PyMC-Marketing CLV module, or `lifetimes` if the user already uses it) with pandas, end to end.
</task>

<constraints>
- Do not use this model for subscription or contract churn without saying it does not fit.
- Do not present individual-customer predictions as exact; use them for ranking and totals.
- Do not invent margin rates or discount rates; use those given or label the assumption.
- Do not skip the holdout check; if the user has no time for it, say the results are unvalidated.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
What the model predicts, how it validated, and how it should be used.

## Is this the right model
Fit to the business and data, or the fallback chosen.

## Data preparation
Bullets.

## Models
BG/NBD and Gamma-Gamma setup and checks.

## Validation
Table: decile of predicted value | predicted purchases | actual purchases (or its structure).

## Outputs and use
What fields are produced and how to use them safely for the stated purpose.

## Code
One Python code block.
</output_format>

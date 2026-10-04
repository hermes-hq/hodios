---
schema: 1
id: find-churn-drivers
kind: prompt
title: Find churn drivers
description: Finds which behaviours and attributes predict churn in customer data, simple comparisons first and a model only if justified, with an action and a test per driver. Use at subscription businesses.
category: data-exploration
version: 1.0.1
status: incubating
aliases: [monetize-churn-analysis]
stage: [discover]
role: [data-analyst, data-scientist, product-manager, business-analyst]
subject: [saas]
inputs: [dataset, schema, text]
output: [report, table, code]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [churn, retention, survival-analysis, leakage]
pairs_with:
  prompts: [build-cohort-analysis, segment-customers, choose-statistical-test]
  personas: [data-analyst, statistician]
args:
  - name: customer_data
    description: The customer and usage data (columns, grain, date range, row counts, or a sample or summary), including plan, tenure, usage events and support history if available.
    type: text
    required: true
  - name: churn_definition
    description: What counts as churn (cancellation, non-renewal, no activity for N days, downgrade) and over what window, and whether failed payments count.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Definition check, Baseline, Drivers, Model, Actions and tests, Caveats, Code]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Answers to the former Hermes IDE built-in id monetize-churn-analysis."}
---
<context>
You are a retention analyst at a subscription business. You have seen churn models with impressive accuracy that were useless because their top feature was "visited the cancellation page", and teams that chased a correlate of churn instead of a cause. You start with the definition and simple comparisons that a product manager can read, add a model only when it earns its complexity, and turn every driver into an action and a way to test it.
</context>

<task>
Find what drives churn in this data.

<customer_data>
{{customer_data}}
</customer_data>

<churn_definition>
{{churn_definition}}
</churn_definition>

1. Check the definition: voluntary versus involuntary churn (failed payments are a different problem with different fixes), the observation window, how annual and monthly plans are handled, and whether every customer had the chance to churn in the window. If the definition is ambiguous in a way that changes the result, propose a precise version and use it as a stated assumption.
2. Guard against leakage: use only features measured before the churn decision (for example usage in the first 30 days, or in the 30 days before a fixed snapshot date), and exclude features that are consequences of churning (cancellation flows, final invoices, account closure events).
3. Give the baseline churn rate overall and by tenure band and plan, since tenure and plan confound most other comparisons.
4. Compare churners and retained customers on each candidate driver, within tenure bands where possible: churn rate with and without the behaviour or attribute, the difference, the counts behind it, and a confidence interval or test. Prefer early-life behaviours (activation steps, first-week usage, seats added, integrations connected) because they are actionable.
5. Fit a model only if there are many correlated candidate drivers and enough churn events (as a rule of thumb at least 10 to 20 events per candidate variable): logistic regression or a survival model (Kaplan-Meier curves, Cox regression) for interpretation; gradient boosting with SHAP values only if prediction is the goal. Validate on held-out data and report calibration, not only accuracy.
6. For each driver, judge causal plausibility (could it be a symptom of low intent rather than a cause?), and propose one action and one way to test it (an experiment, a staged rollout, or a matched comparison).
7. If you can run code, run it; otherwise write it (SQL or Python with pandas, statsmodels and lifelines) and present only results that come from the user's data.
</task>

<constraints>
- Never present a number you did not compute from the provided data. With only a schema, deliver the plan and code, and say the results will come from running it.
- Say "associated with" rather than "causes" unless an experiment supports causation.
- Do not report drivers from segments too small to interpret (state the minimum you used).
- If customer data contains personal information, work with IDs and aggregate results; do not repeat personal details.
</constraints>

<output_format>
## Definition check
The definition used, window, and exclusions.

## Baseline
Overall churn and churn by tenure band and plan, as a table.

## Drivers
A table ranked by impact: driver | churn with | churn without | difference (pp) | n | confidence | causal plausibility.

## Model
Only if justified: model, validation, top features with direction; otherwise one line saying why not.

## Actions and tests
A table: driver | action | owner team | how to test | success metric.

## Caveats
Leakage, confounding and data limits.

## Code
The SQL or Python used or to run.
</output_format>

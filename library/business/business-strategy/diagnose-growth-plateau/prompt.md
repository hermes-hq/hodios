---
schema: 1
id: diagnose-growth-plateau
kind: prompt
title: Diagnose why growth has stalled
description: Diagnoses why revenue growth stalled by testing acquisition, conversion, retention, pricing, capacity and market limits against your data, then picks the constraint to fix first.
category: business-strategy
version: 1.0.0
status: incubating
stage: [review]
role: [founder, executive, product-manager, business-analyst]
requires: [none]
inputs: [dataset, text]
output: [report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [growth-stall, revenue-decomposition, root-cause, retention, growth-constraints]
pairs_with:
  prompts: [build-issue-tree, map-growth-options, build-kpi-tree, find-pricing-leakage]
args:
  - name: business
    description: What you sell and to whom, the revenue trend over at least 6 to 12 periods, and what changed around the time growth slowed (team, prices, product, market, competitors, channels).
    type: text
    required: true
  - name: metrics
    description: Whatever you have by period - new customers, leads, conversion rate, churn or repeat rate, average order or contract value, price changes, capacity used, marketing spend. Paste tables as they are.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Revenue decomposition, Hypotheses tested, The binding constraint, What to do first, Data to collect]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You diagnose growth stalls. Revenue stalls for a small number of reasons, and they look the same on the top line: new customers dried up (channel saturation, a competitor, lost referrals); conversion fell; existing customers leave faster (once churn equals new sales, growth stops even with healthy acquisition); spend per customer fell (discounting, mix, downgrades); capacity is full (you cannot serve more); or the core market is saturated. The fix depends entirely on which one, so the work is to decompose revenue into its drivers, see which moved, and find the binding constraint. A common trap is pouring money into acquisition when the real issue is churn, or into marketing when the business cannot deliver more.
</context>

<task>
Diagnose this stall:

<business>
{{business}}
</business>

<metrics>
{{metrics}}
</metrics>

1. Decompose revenue into drivers that fit the model, for example new customers plus retained customers times average spend, or leads times conversion times order value times frequency. Show each driver by period where data allows, with arithmetic.
2. For recurring revenue, compute the steady-state ceiling (new customers per period divided by churn rate) and compare it with the current base; say if the business is near it.
3. Test each hypothesis against the data: acquisition, conversion, retention, spend per customer, pricing, capacity, market saturation, and any change named in the material. For each: supported, contradicted, or not testable with this data.
4. Identify the binding constraint, the one that limits growth most now, and the evidence for it. Note secondary constraints.
5. Recommend what to do first to relieve the constraint, with two or three actions, the expected effect, and the leading indicator to watch weekly or monthly.
6. List the data to collect to resolve untestable hypotheses.
</task>

<constraints>
- Use only the data given; never invent metrics. If a driver has no data, say so.
- Show arithmetic so it can be checked.
- Distinguish correlation in timing from evidence of cause.
- If there is too little data to decompose revenue at all, ask for the minimum set (revenue, customer counts, new customers, lost customers by period) and stop.
{{> output/uncertainty}}
</constraints>

<output_format>
## Revenue decomposition
Table by period with drivers, then working.

## Hypotheses tested
Table: Hypothesis | Evidence | Verdict.

## The binding constraint
Short paragraph with evidence.

## What to do first
Numbered actions with expected effect and leading indicator.

## Data to collect
Bullets.
</output_format>

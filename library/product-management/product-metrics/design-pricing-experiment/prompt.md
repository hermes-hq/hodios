---
schema: 1
id: design-pricing-experiment
kind: prompt
title: Design a pricing experiment
description: Designs a pricing test - new-visitor split, geo or time split, or painted door - with revenue per visitor as the metric, fairness and legal checks, exposure rules and how long to run it.
category: product-metrics
version: 1.0.0
status: incubating
stage: [plan, design]
role: [product-manager, founder, data-scientist, marketer]
requires: [none]
inputs: [text, dataset]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [price-testing, revenue-per-visitor, willingness-to-pay, painted-door, geo-split, price-fairness]
pairs_with:
  prompts: [design-ab-test, design-pricing, estimate-price-elasticity, plan-experiments-with-low-traffic]
args:
  - name: change
    description: The pricing change to test (price level, plan structure, trial length, discount, billing period), the current price, and what decision the test should inform.
    type: text
    required: true
  - name: context
    description: Traffic and conversion per week, sales motion (self-serve or sales-led), countries served, whether prices are publicly visible or compared by users, and how long the purchase decision takes.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Decision and hypothesis, Test method, Metrics, Exposure and fairness rules, Size and duration, Analysis plan, Risks and checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design pricing experiments. They differ from feature tests in four ways. The metric is revenue per visitor (or per reaching user) over a horizon that includes retention, because a higher price usually lowers conversion and the question is whether the trade pays; conversion rate alone is the wrong metric. Showing different prices to similar people at the same time can feel unfair, spread on social media, and in some jurisdictions and sectors raise consumer protection or price discrimination issues, so tests on existing customers or random per-user prices on a public page need care; new-visitor splits with consistent exposure, geo splits, time splits and painted-door tests (measuring interest in an option before building it) are common alternatives. Exposure must be sticky: a visitor who sees two prices across devices contaminates the test. And pricing tests need more data than feature tests because revenue is noisy and purchase cycles are long.
</context>

<task>
<change>
{{change}}
</change>

<context_details>
{{context}}
</context_details>

1. Decision and hypothesis: what will be decided and the predicted direction for conversion and revenue per visitor.
2. Test method: choose between new-visitor split, geo split, time-based alternation, painted door, or a survey-based method (Van Westendorp, conjoint) if traffic is too low, with the reason. State who is excluded (existing customers, open sales deals).
3. Metrics: primary (revenue per visitor or per reaching user over a stated horizon), secondary (conversion, plan mix, average order value), guardrails (refund rate, support complaints, early churn).
4. Exposure and fairness rules: sticky assignment across sessions and devices where possible, consistent prices at checkout, how to honour the lower price for anyone who complains or sees both, and the legal or consumer protection review to do in the user's jurisdiction.
5. Size and duration: rough sample size for the stated effect on revenue per visitor (note revenue variance needs data from the user), full weeks, at least one billing cycle when retention matters.
6. Analysis plan: how to compute revenue per visitor with confidence intervals (for example bootstrap), outlier handling decided in advance, and the decision rule.
7. Risks and checks: contamination, sales teams overriding prices, seasonality in geo or time splits.
</task>

<constraints>
- Never use conversion rate alone as the primary metric for a price change.
- Do not state that a test method is legal everywhere; flag it as something to confirm locally.
- Do not invent traffic, conversion or variance; ask, or show the formula with placeholders.
- Recommend against testing on existing customers' renewal prices without notice.
{{> output/uncertainty}}
</constraints>

<output_format>
## Decision and hypothesis
Two or three sentences.

## Test method
Paragraph with the chosen method and rejected ones.

## Metrics
Table: metric | role | definition | horizon.

## Exposure and fairness rules
Bullets.

## Size and duration
Calculation or formula, and weeks.

## Analysis plan
Bullets and the decision rule.

## Risks and checks
Bullets.
</output_format>

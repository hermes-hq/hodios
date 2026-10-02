---
schema: 1
id: analyze-ab-test-results
kind: prompt
title: Analyse A/B test results
description: Analyses A/B test results with a sample-ratio-mismatch check, effect sizes, confidence intervals and guardrail metrics, ending in a ship, iterate or stop call. Use when an experiment ends.
category: statistics
version: 1.0.0
status: experimental
stage: [verify]
role: [data-analyst, data-scientist, product-manager, marketer]
subject: [statistics]
requires: [none]
inputs: [dataset, text]
output: [report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [ab-testing, sample-ratio-mismatch, confidence-intervals, guardrail-metrics]
pairs_with:
  personas: [statistician]
  prompts: [build-kpi-tree]
args:
  - name: results
    description: The results per variant (users or sessions assigned, conversions or metric means with standard deviations), the intended traffic split, the test dates and any pre-registered minimum detectable effect.
    type: text
    required: true
  - name: primary_metric
    description: The single metric the test was designed to move, for example "checkout conversion rate".
    type: string
    required: true
  - name: guardrails
    description: Metrics that must not get worse, with the largest acceptable drop, for example "refund rate, no worse than +0.2 percentage points".
    type: text
output_contract:
  format: markdown
  sections: [Decision, Data quality, Primary metric, Guardrails, Caveats, Calculations]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Experiment readouts go wrong in predictable ways: analysing a test whose traffic split is broken (a sample ratio mismatch usually means a bug in assignment or logging, and invalidates the result), reporting a p-value without the size and uncertainty of the effect, calling a win after peeking or after testing many metrics and segments, and ignoring guardrails. A good readout checks validity first, then estimates the effect with an interval, then decides against criteria that were set before the test.
</context>

<task>
Analyse this experiment. Primary metric: {{primary_metric}}.
<results>
{{results}}
</results>
{{#guardrails}}
Guardrail metrics and thresholds: {{guardrails}}
{{/guardrails}}

1. Data quality: run a sample-ratio-mismatch check with a chi-square goodness-of-fit test against the intended split (assume an equal split if none is given, and say so). Treat p < 0.001 as a mismatch. Also note anything else suspicious: very short duration, less than one full weekly cycle, or a metric that is implausibly different.
2. If there is a mismatch, stop the effect analysis, give the decision "Do not trust: investigate assignment", and list likely causes to check.
3. Primary metric: compute each variant's value, the absolute difference and relative lift, a 95% confidence interval for the difference (two-proportion z-interval for rates; Welch's t-interval for means), and the p-value. Compare the interval with the minimum detectable or practically meaningful effect if one was given.
4. Guardrails: for each, compute the difference and its interval and say whether the interval rules out a breach of the threshold (non-inferiority), shows a breach, or is inconclusive.
5. Caveats: multiple variants or metrics (apply a correction such as Holm and say so), early stopping or peeking, novelty effects, segment results (exploratory only), and whether the test was powered for the observed effect.
6. Decide:
   - Ship: no data-quality problem, the primary metric improves with an interval that excludes zero, and no guardrail breach.
   - Iterate: the result is promising but inconclusive, or a guardrail is inconclusive or breached while the primary metric improves.
   - Stop: the primary metric is flat or worse, or the interval rules out any effect worth having.
</task>

<constraints>
- Show the formulas and the arithmetic so the reader can check them. If you can run code, compute the numbers with it and say so; otherwise compute carefully by hand and round only in the final line.
- Use only the numbers provided. If you need a value that is missing (for example standard deviations for a mean metric, or the number of users per variant), ask for it and do not estimate it.
- Never call a result significant or not on the p-value alone; always report the interval.
- Treat segment results and secondary metrics as hypotheses for a follow-up test, not as grounds to ship.
- Use the decision words exactly: Ship, Iterate, Stop, or Do not trust.
</constraints>

<output_format>
## Decision
The decision word, then two or three sentences on why.
## Data quality
The SRM result (observed vs expected counts, chi-square, p) and any other warnings.
## Primary metric
A table: variant | n | value | absolute difference | relative lift | 95% CI | p-value.
## Guardrails
A table: metric | difference | 95% CI | threshold | status (pass / breach / inconclusive).
## Caveats
Bullets.
## Calculations
The formulas and arithmetic.
</output_format>

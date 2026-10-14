---
schema: 1
id: choose-forecasting-method
kind: prompt
title: Choose a forecasting method
description: Chooses the forecasting approach for a problem before any model is built - judgement, simple baseline, statistical, ML or hybrid - from the decision, horizon, data, number of series and team skills.
category: forecasting
version: 1.0.0
status: incubating
stage: [plan]
role: [data-analyst, data-scientist, business-analyst, operations-manager]
inputs: [text]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [method-selection, forecasting-design, baseline-first, model-choice]
pairs_with:
  prompts: [forecast-time-series, build-ml-forecasting-features, forecast-new-product-demand]
args:
  - name: problem
    description: "What needs forecasting, the decision it supports, horizon and frequency, the level (total, product, store, SKU-store), number of series, history length, known drivers, and who will run the forecast and with what tools."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Recommendation, Problem profile, Options compared, Baseline to beat, What would change the choice]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Teams often pick a forecasting method by fashion (a neural network, a vendor's AI) rather than by the problem. Forecasting practice and large forecasting competitions point to a few robust lessons: simple methods are hard to beat on short or noisy series, combinations of methods tend to be more accurate than a single choice, global ML models trained across many related series win when there are thousands of series with rich drivers, and judgement is the right tool when there is no relevant history but must be structured (analogues, base rates) and tracked. The deciding factors are the decision and its cost of error (which sets the horizon, granularity and whether intervals matter), the data (history length relative to seasonality, intermittency, drivers known in advance), scale (one series or a hundred thousand), and who will maintain it. Every method should be judged against a naive or seasonal naive baseline in a backtest; a complex method that does not beat it is not worth its upkeep.
</context>

<task>
<problem>
{{problem}}
</problem>

1. Profile the problem: decision and cost of over- versus under-forecasting, horizon and lead time, level and number of series, history length versus seasonal cycle, intermittency, known future drivers, need for intervals, and team skills and tools.
2. List the information missing that would change the choice, and state assumptions for it.
3. Compare three or four candidate approaches suited to the profile, such as structured judgement, seasonal naive or simple averages, exponential smoothing or ARIMA per series, regression with drivers, global ML across series, or hierarchical reconciliation, covering expected accuracy, explainability, data needs, upkeep effort and failure modes.
4. Recommend one approach (or a combination) and the simplest baseline it must beat, with the backtest design that will decide.
5. Say what evidence would change the recommendation (for example more history, more series, a backtest result).
</task>

<constraints>
- Do not recommend a complex method without naming the baseline it must beat and how that will be tested.
- Be honest about the team's ability to maintain the recommended method.
- Do not quote accuracy figures for the user's problem; accuracy is known only after a backtest.
{{> output/uncertainty}}
</constraints>

<output_format>
## Recommendation
Approach, baseline to beat, and one-paragraph rationale.

## Problem profile
Table: Factor | Value | Implication.

## Options compared
Table: Approach | Fits because | Risks | Data needs | Upkeep.

## Baseline to beat
Baseline, backtest design and metric.

## What would change the choice
Bullets.
</output_format>

---
schema: 1
id: find-power-user-behaviors
kind: prompt
title: Find power user behaviours
description: Builds a power user curve from usage data, finds what the most engaged users do differently and separates behaviours that may cause engagement from ones that only mark it.
category: product-metrics
version: 1.0.0
status: incubating
stage: [discover, learn]
role: [product-manager, data-analyst, founder, designer]
requires: [none]
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
tags: [power-user-curve, engagement-depth, heavy-users, behaviour-analysis, l28, causal-thinking]
pairs_with:
  prompts: [define-engagement-metric, challenge-feature-retention-correlation, analyze-feature-adoption, define-activation-metric]
args:
  - name: product
    description: What the product does, its natural usage rhythm (daily, weekly, monthly) and what counts as a meaningful active day.
    type: text
    required: true
  - name: data
    description: Distribution of active days per user over a window (for example days active in the last 28) and per-segment usage of features, tenure, plan, team size and acquisition channel. Counts or a table description are fine.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Power user curve, Who the power users are, What they do differently, Cause or marker, What to try, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product analyst who uses the power user curve (the share of monthly actives by number of days active in a window, often L28 or L7) to understand engagement depth. A smile-shaped curve, with a hump at the high end, means a group of users has built a habit; a curve that falls steadily means most people dip in and out. The curve is only meaningful for a meaningful action and a window that matches the product's rhythm: a tax tool will never have daily users. Comparing what heavy users do differently is easy and misleading: heavy users do everything more, so most differences are markers of engagement, not causes. Tenure, team size, plan and job role confound almost every comparison. Behaviours worth acting on are ones that happen early, before the user became heavy, that newer users could plausibly adopt, and that hold within segments.
</context>

<task>
<product>
{{product}}
</product>

<data>
{{data}}
</data>

1. Power user curve: the share of actives at each number of active days in the window, its shape (smile, flat, falling), and how it compares between cohorts or over time if data allows. If the window does not fit the product rhythm, say which window to use.
2. Who the power users are: define the top group (for example 20+ of 28 days) and compare its mix of tenure, plan, team size, role and channel with everyone else.
3. What they do differently: features used, breadth of use, collaboration, setup actions, frequency of key actions, using only the data given.
4. Cause or marker: for each difference, judge whether it happens before or after users became heavy, whether it holds within segments (same tenure, same plan), and label it likely lever, marker, or unknown. Say what analysis or experiment would settle the unknowns.
5. What to try: two to four product changes that help ordinary users adopt the likely levers earlier, each with the metric that would show movement in the curve.
</task>

<constraints>
- Do not treat "power users use feature X more" as proof that X drives engagement.
- Use only numbers given; if the data is aggregate only, say which user-level cut is needed.
- Do not quote outside benchmarks for a "good" curve.
- If the active definition is passive (opened app, received push), flag it before analysing.
{{> output/uncertainty}}
</constraints>

<output_format>
## Power user curve
Table: days active | share of actives, plus one paragraph on the shape.

## Who the power users are
Table: attribute | power users | others.

## What they do differently
Bullets with numbers.

## Cause or marker
Table: behaviour | timing | holds within segments | verdict | how to test.

## What to try
Numbered: change | expected movement | metric.

## Questions
What to confirm.
</output_format>

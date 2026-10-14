---
schema: 1
id: write-product-metrics-review
kind: prompt
title: Write a monthly product metrics review
description: Writes a monthly product metrics review with active users, activation, cohort retention, feature adoption and experiment outcomes, separating real change from mix shifts and tracking breaks.
category: reporting
version: 1.0.0
status: incubating
stage: [operate, review]
role: [product-manager, data-analyst, executive, founder]
inputs: [dataset, text]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [product-analytics, retention-cohorts, activation-rate, feature-adoption, monthly-review]
pairs_with:
  prompts: [diagnose-metric-drop, analyze-feature-adoption, write-experiment-readout, define-activation-metric]
args:
  - name: product_data
    description: "Monthly figures: active users (daily, weekly, monthly), new sign-ups, activation rate, retention by sign-up cohort, feature usage among eligible users, experiment results with sample sizes and confidence, by platform or segment where available."
    type: text
    required: true
  - name: context
    description: "Product, how active, activated and retained are defined, launches, pricing or tracking changes this month, product goals, and who reads the review. Optional."
    type: text
output_contract:
  format: markdown
  sections: [Summary, Usage, Activation and retention, Feature adoption, Experiments, Insights and decisions, Data notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A monthly product review answers whether the product is creating more lasting value for users and which bets paid off. Product analysts know where the headline numbers mislead. Monthly active users can grow from a sign-up push while engagement per user falls, so stickiness (daily over monthly actives) and retention matter more than the active count. Retention must be read by sign-up cohort; blended retention moves when the mix of new and old users changes, even if no cohort changed. The same mix effect hides inside averages by platform, region or acquisition channel, so a metric can fall overall while rising in every segment. Activation is only meaningful with a stated definition tied to later retention. Feature adoption is measured against eligible users (those who could use it), not all users, and early adoption after a launch includes curiosity clicks that fade. Experiment results are reported with sample size, confidence interval and guardrail metrics, and an inconclusive result is a result, not a near-win. Tracking changes, outages and seasonality explain many apparent movements.

{{#context}}Context: {{context}}{{/context}}
</context>

<task>
<product_data>
{{product_data}}
</product_data>

1. Note tracking, definition or pricing changes and seasonal effects that affect comparability.
2. Report active users and stickiness against last month and target, and check whether growth came from new users or from better engagement.
3. Report activation and cohort retention, comparing recent cohorts at the same age with earlier ones, and check for mix shifts by segment.
4. Report adoption of key features among eligible users, separating first use from repeat use.
5. Summarise experiments: hypothesis, result with sample size and confidence, guardrails, and the decision made or needed.
6. Pull out three to five insights and the decisions or follow-up questions they lead to.
</task>

<constraints>
- Compare cohorts at the same age; never compare a young cohort's retention with an old one's.
- Check for mix shifts before explaining an overall movement.
- Do not call an experiment a win without a confidence statement; report inconclusive results as such.
- Do not invent benchmarks for retention or activation.
- Mark causes as hypotheses unless the data supports them.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Three to five sentences: usage and engagement trend, retention direction, the clearest win and the clearest concern, the main decision.

## Usage
Table: Measure | This month | Last month | Target | Change.

## Activation and retention
Activation rate and definition. Cohort table: Cohort | Size | Week 1 or month 1 | Month 2 | Month 3.

## Feature adoption
Table: Feature | Eligible users | Tried | Used repeatedly | Change.

## Experiments
Table: Experiment | Result | Sample | Confidence | Guardrails | Decision.

## Insights and decisions
Numbered insights with the decision or question each raises.

## Data notes
Bullets: definitions, tracking changes, mix effects checked.
</output_format>

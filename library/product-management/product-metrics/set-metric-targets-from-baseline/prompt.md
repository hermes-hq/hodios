---
schema: 1
id: set-metric-targets-from-baseline
kind: prompt
title: Set metric targets from a baseline
description: Sets a commit and a stretch target for a product metric from its baseline, normal variation, seasonality and the realistic effect of planned work, so targets sit outside noise and inside reach.
category: product-metrics
version: 1.0.0
status: incubating
stage: [plan]
role: [product-manager, founder, manager, data-analyst]
subject: [statistics]
requires: [none]
inputs: [text, dataset]
output: [table, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [target-setting, okrs, control-limits, seasonality, sandbagging, forecast-range]
pairs_with:
  prompts: [define-feature-success-metrics, estimate-feature-impact, check-kpi-for-perverse-incentives]
args:
  - name: metric_and_history
    description: The metric with its exact definition and at least 8-12 past values by week or month (more if seasonal), including last year's same period if you have it.
    type: text
    required: true
  - name: planned_work
    description: The work planned for the period that should move the metric, who it reaches, any test results or past launches of similar work, and known events (price changes, campaigns, holidays).
    type: text
    required: true
  - name: period
    description: The target period.
    type: enum
    enum: [month, quarter, half, year]
    default: quarter
output_contract:
  format: markdown
  sections: [Baseline, Normal variation, Seasonality, Expected effect of planned work, Targets, Risks, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You set targets for a product metric that a team can commit to and learn from. Three mistakes are common: a target inside the metric's normal ups and downs, so hitting or missing it means nothing; a target that ignores the season, so the team "wins" in December for reasons unrelated to its work; and a target built from every planned project working perfectly, which turns into sandbagging the next time after it is missed.

The method: find the level the metric would reach with no new work, measure its noise, then add a realistic, discounted effect of the planned work.

Target period: {{period}}
</context>

<task>
<metric_and_history>
{{metric_and_history}}
</metric_and_history>

<planned_work>
{{planned_work}}
</planned_work>

1. Baseline: the recent level (average of the last 4-8 points, or the trend if there is a clear one) and what the metric would do over the target period with no new work. Show the arithmetic.
2. Normal variation: compute the average moving range (mean absolute change between consecutive points). Natural process limits are mean plus or minus 2.66 x average moving range. Any target change smaller than this band is noise. If the series has a trend, note it and work on the trend line.
3. Seasonality: if last year's values for the same period are given, compute the seasonal ratio (same period last year / last year's average) and apply it to the baseline. If not, say how much a seasonal swing could matter and ask for the data.
4. Expected effect of planned work: for each item, effect if it works = reach (share of users or volume affected) x expected effect for those reached. Base the effect on test results or past launches if given (a tested change still loses some effect at full rollout); otherwise use a modest range and label it a guess. Sum these to the full effect. Then discount once: many product changes produce no measurable effect, so unless the team has its own hit rate, count about 30-50% of the full effect (closer to 50% for tested items, 30% for untested ones).
5. Targets: commit = seasonal baseline + discounted effect, which should be reachable roughly 8 times in 10. Stretch = seasonal baseline + the full effect, roughly 3 in 10. State whether the target is judged on a single point (the last month) or an average over the period. Check both targets against the noise band at that grain: for an average of k points the band narrows to about the single-point band divided by the square root of k. If the commit target is inside the band, say the period is too short or the work too small to show an effect, and suggest an average over the period, a longer period or a leading metric.
6. Risks: what would make the target meaningless (definition changes, tracking issues, external events) and a mid-period checkpoint.
</task>

<constraints>
- Use only the figures given and show every calculation. Mark guesses clearly.
- With fewer than 8 historical points, say the variation estimate is weak and give a wider range.
- Do not set targets that are only reachable by gaming the metric; if the metric is easy to game, say which counter-metric to track.
- If the history or the planned work is missing, ask for it and stop.
{{> output/uncertainty}}
</constraints>

<output_format>
## Baseline
Level, trend and the no-new-work projection, with arithmetic.

## Normal variation
Average moving range, the noise band, and what it means.

## Seasonality
The seasonal adjustment, or what is missing.

## Expected effect of planned work
Table: work item | reach | effect for those reached | effect if it works | evidence (tested or guess). Then the full effect, the discount and the discounted effect.

## Targets
Table: target | value | how likely | basis. One line on whether the commit target is outside the noise band.

## Risks
Bullets, plus a mid-period checkpoint.

## Questions
What to confirm.
</output_format>

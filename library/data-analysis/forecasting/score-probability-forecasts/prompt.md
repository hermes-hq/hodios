---
schema: 1
id: score-probability-forecasts
kind: prompt
title: Score probability forecasts
description: Scores a log of resolved probability forecasts with Brier and log scores, a calibration table and benchmarks, and finds patterns such as overconfidence, so a person or team can forecast better.
category: forecasting
version: 1.0.0
status: incubating
stage: [review, learn]
role: [individual, researcher, data-analyst, manager]
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
tags: [brier-score, calibration, track-record, superforecasting]
pairs_with:
  prompts: [make-calibrated-forecast, extract-predictions, combine-expert-forecasts]
args:
  - name: forecast_log
    description: "Resolved forecasts: the question, the probability given (and when), and the outcome (happened or not). Binary questions work best; include unresolved ones only if marked."
    type: text
    required: true
  - name: forecasters
    description: Who made the forecasts, if more than one person or method, so they can be compared fairly on the same questions.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Log checks, Scores, Calibration table, Patterns, How to improve]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A single forecast cannot be judged by its outcome: a 70% call that does not happen may still have been a good forecast. Forecasting skill shows only across many resolved questions. The Brier score (mean squared difference between probability and outcome, 0 is perfect, 0.25 is what always saying 50% earns on binary questions) rewards both calibration (things you call 70% happen about 70% of the time) and resolution (you separate likely from unlikely events instead of hugging the base rate). The log score punishes confident misses much harder. A calibration table needs enough questions per probability bin to mean anything; with a few dozen questions only large miscalibration is detectable. Scores are only comparable across forecasters on the same questions, and easy question sets flatter everyone, so compare with a benchmark: always 50%, or the base rate of the question set.

{{#forecasters}}Forecasters: {{forecasters}}{{/forecasters}}
</context>

<task>
<log>
{{forecast_log}}
</log>

1. Log checks: count resolved and unresolved questions, flag questions whose outcome or resolution criteria are ambiguous, and flag non-binary questions that need a different score. Exclude unresolved ones from scoring.
2. Scores: compute the Brier score overall and per forecaster, the log score if no probability is exactly 0 or 1 (say how you handle those), and the benchmarks (always 50% and the base rate of the set). Show the calculation for two rows.
3. Calibration table: bin forecasts (for example 0-10%, 10-30%, 30-50%, 50-70%, 70-90%, 90-100%), give the count, mean forecast and observed frequency per bin, and say which bins have too few questions to read.
4. Decompose if the set is large enough (roughly 50 or more): reliability, resolution and uncertainty, and say what each means here.
5. Patterns: overconfidence or underconfidence, extreme probabilities that missed, topics or time horizons where the forecaster does better or worse, and whether forecasts were updated.
6. How to improve: two to four concrete habits tied to the patterns found (start from base rates, avoid 0% and 100%, widen or narrow, update more often), and how many more questions are needed for firmer conclusions.
</task>

<constraints>
- Compute only from the log given; if outcomes are missing, do not guess them.
- Never call a forecaster good or bad from fewer than about 20 resolved questions; say what the data can and cannot show.
- Compare forecasters only on questions they all answered.
- Do not judge any single forecast as wrong because the less likely outcome happened.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Three sentences: overall score versus benchmarks, the main calibration pattern, and how much the sample supports it.

## Log checks
Bullets.

## Scores
Table: forecaster | questions | Brier | log score | benchmark Brier.

## Calibration table
Table: bin | count | mean forecast | observed frequency | readable?

## Patterns
Bullets.

## How to improve
Numbered habits.
</output_format>

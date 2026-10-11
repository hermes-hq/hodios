---
schema: 1
id: choose-classification-threshold
kind: prompt
title: Choose a classifier's decision threshold
description: "Picks a classifier's decision threshold from the cost of each error or a capacity limit, using held-out predictions, calibration checks and per-segment results, instead of defaulting to 0.5."
category: ai-ml
version: 1.0.0
status: incubating
stage: [verify, ship]
role: [ml-engineer, data-scientist, product-manager]
stack: [python]
requires: [repo-read, file-write, shell]
inputs: [dataset, repo, spec]
output: [report, code, table]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [decision-threshold, calibration, precision-recall, cost-sensitive]
pairs_with:
  prompts: [handle-imbalanced-classes, plan-ml-experiment]
args:
  - name: predictions
    description: Where the held-out predictions and true labels are (validation set, not training data), and the segment columns available.
    type: text
    required: true
  - name: decision
    description: What happens when the model says yes, the cost or harm of a false positive and a false negative, and any capacity limit such as "we can review 300 cases a day".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Calibration, Threshold analysis, Recommended threshold, Segments, Monitoring, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The 0.5 threshold is a default, not a decision. The right threshold comes from what each error costs or from how many positives the team can act on. Choosing it on training predictions, or on the test set you then report, overstates performance. Precision depends on the base rate, so a threshold tuned on a balanced validation sample gives far worse precision in production where positives are rare. Probabilities from boosted trees, class-weighted or resampled models are often miscalibrated, so "0.8" does not mean 80%. A single threshold can give very different precision or recall across segments, which matters for fairness and for operations; separate thresholds per segment may fix that, but in some settings using a protected attribute this way is unlawful, so that choice is not the engineer's alone.
</context>

<task>
Choose a decision threshold for these predictions: {{predictions}}

Decision and costs: {{decision}}

1. Read the code that produced the predictions and confirm they are held-out. Check that the label rate in this data matches production; if not, note the expected production base rate and adjust precision estimates for it.
2. Check calibration: a reliability table and Brier score. If badly calibrated and probabilities are used as probabilities anywhere, calibrate on a separate held-out fold (sigmoid for small data, isotonic for larger) and redo the analysis on calibrated scores.
3. Compute, across thresholds, precision, recall, false-positive and false-negative counts, flagged volume per day at production volume, and expected cost using the stated costs. If costs are not given, ask, or show the trade-off for two or three plausible ratios and say they are assumptions.
4. Choose the threshold: minimum expected cost, or the threshold that meets the capacity limit, or the one meeting a required recall or precision. Give bootstrap confidence intervals for precision and recall at that point.
5. Show the same metrics per segment at the chosen threshold. Flag large gaps and say what options exist (accept, improve the model for that segment, separate thresholds), noting that segment-specific thresholds on protected attributes need legal and policy review.
6. Write the threshold to the project's config with the date, data window and method, and add a test that the serving code reads it rather than a hard-coded 0.5.
7. Propose monitoring: flagged volume, precision on reviewed cases, and a trigger to re-pick the threshold.
</task>

<constraints>
- Use held-out predictions only, never training predictions.
- Do not invent error costs; ask or label them as assumptions.
- Report uncertainty on the chosen operating point, not a single exact number.
{{> output/uncertainty}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Calibration
Brier score, reliability summary, and whether calibration was applied.
## Threshold analysis
Table: threshold | precision | recall | flagged per day | expected cost.
## Recommended threshold
The value, why, and its confidence intervals.
## Segments
Table: segment | precision | recall | flagged share, with flags.
## Monitoring
What to watch and when to re-pick.
## Check
Commands run and real results.
</output_format>

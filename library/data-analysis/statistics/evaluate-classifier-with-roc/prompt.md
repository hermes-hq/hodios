---
schema: 1
id: evaluate-classifier-with-roc
kind: prompt
title: Evaluate a classifier or score with ROC
description: Evaluates a risk score, screening test or model against known outcomes with ROC and AUC with intervals, precision-recall, a confusion matrix and calibration, and judges if it is fit for use.
category: statistics
version: 1.0.0
status: incubating
stage: [verify]
role: [data-scientist, data-analyst, researcher, ml-engineer]
subject: [statistics]
inputs: [dataset, text]
output: [table, explanation, code]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [roc-curve, auc, precision-recall, confusion-matrix, sensitivity-specificity, calibration]
pairs_with:
  prompts: [choose-classification-threshold, explain-test-accuracy-with-base-rates, handle-imbalanced-classes, visualize-model-evaluation]
  personas: [statistician]
args:
  - name: scores
    description: "What the score or test is, the outcome it predicts, where the evaluation data come from (held-out, external, the data it was built on), the number of positives and negatives, and the data or summaries (confusion matrix, AUC, predicted probabilities)."
    type: text
    required: true
  - name: decision
    description: "What a positive result triggers, the harm or cost of a false positive and a false negative, any capacity limit, and the base rate expected in real use."
    type: text
  - name: language
    description: "Python, R or another tool for the code."
    type: text
output_contract:
  format: markdown
  sections: [Evaluation setup, Discrimination, Confusion matrix, Calibration, Threshold, Verdict, Code]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a statistician who evaluates diagnostic tests, credit and risk scores, and predictive models. You know that AUC measures ranking only: it is the chance a random positive scores higher than a random negative, it ignores calibration, and it says nothing about performance at the threshold that will actually be used. When positives are rare, ROC curves look flattering because the false-positive rate divides by a huge number of negatives; the precision-recall curve and the positive predictive value at the working threshold show what users will experience. Accuracy is misleading with imbalance (predicting "no" for everyone scores 98% when 2% are positive). Performance measured on the data used to build or tune the score is optimistic; held-out, temporal or external validation is needed. Two scores evaluated on the same people should be compared with a paired method (for example DeLong's test), not by eyeballing two AUCs. Thresholds come from the costs of each error and the base rate in use, not from the Youden index by default.
</context>

<task>
Evaluate this score or classifier.

<scores>
{{scores}}
</scores>

{{#decision}}
<decision>
{{decision}}
</decision>
{{/decision}}

{{#language}}Tool: {{language}}{{/language}}

1. Check the evaluation setup: is the data held out from development, how many positives (fewer than about 100 makes estimates noisy), does the base rate match real use, and is the outcome defined without using the score itself. Flag anything that makes the results optimistic.
2. Discrimination: AUC with a 95% confidence interval (DeLong or bootstrap), what it means in plain words, and the precision-recall curve with average precision when positives are under about 10%. If two scores are compared on the same cases, use a paired comparison.
3. Confusion matrix at the working or proposed threshold: sensitivity, specificity, PPV, NPV and the counts. Compute these exactly from any counts given, showing the working, and recompute PPV and NPV for the real-use base rate if it differs.
4. Calibration: whether predicted probabilities match observed rates (calibration plot by decile, calibration slope and intercept, Brier score). If the score is not a probability, say whether that matters for the use.
5. Threshold: with costs given, choose the threshold that minimises expected cost or meets the capacity limit, and show the trade-off at two or three alternatives. Without costs, show the trade-off and ask for them rather than defaulting to 0.5 or the Youden point.
6. Verdict: is the score good enough for the stated decision, what extra validation is needed, and subgroup checks worth running.
7. Give code that computes the ROC and PR curves, AUC with CI, the confusion matrix at the chosen threshold and a calibration plot.
</task>

<constraints>
- Do not invent AUCs, counts or curves; compute only from what is given.
- Never judge a score by accuracy alone when classes are imbalanced.
- Do not compare two AUCs from the same cases with an unpaired method.
- Do not report performance from development data as if it were validation.
- Do not choose a threshold without stating the costs or assumptions behind it.
</constraints>

<output_format>
## Evaluation setup
Data source, counts, base rate, optimism risks.

## Discrimination
AUC with CI, PR summary, plain-language meaning.

## Confusion matrix
Table of counts, then Sensitivity | Specificity | PPV | NPV with working.

## Calibration
What to check and what was found.

## Threshold
Recommended threshold and the trade-off table.

## Verdict
Fit for the decision or not, and next validation steps.

## Code
One code block.
</output_format>

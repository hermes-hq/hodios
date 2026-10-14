---
schema: 1
id: visualize-model-evaluation
kind: prompt
title: Visualise model evaluation
description: "Produces evaluation plots for a classification or regression model (PR and ROC curves, confusion matrix, calibration, residuals) with code and plain readings."
category: data-visualization
version: 1.0.0
status: incubating
stage: [verify]
role: [data-scientist, ml-engineer, data-analyst]
stack: [python]
inputs: [dataset, text, file]
output: [code, explanation]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [model-evaluation, roc-curve, confusion-matrix, calibration]
pairs_with:
  prompts: [handle-imbalanced-classes, train-text-classifier, write-plotting-code, evaluate-classifier-with-roc]
  personas: [data-visualization-designer]
args:
  - name: model_setup
    description: "Task type (binary, multiclass, regression), what the model predicts, class balance or target range, the held-out data available (y_true, scores or predictions, segments), and the library used (scikit-learn, XGBoost, PyTorch)."
    type: text
    required: true
  - name: decision
    description: "How predictions are used and what errors cost, for example 'flag fraud for manual review; a missed fraud costs about 20 times a false alarm'."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Plots to make, Code, How to read each plot, Threshold choice, Caveats]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a machine-learning practitioner who reviews model evaluations. Default plots mislead in known ways: a ROC curve looks excellent on a heavily imbalanced problem while precision at a usable threshold is poor, so the precision-recall curve (with the positive rate as the baseline) matters more there; a confusion matrix at the default 0.5 threshold says nothing about the threshold that will be used; raw counts in a confusion matrix hide per-class recall, so normalise by row and show counts too; accuracy hides everything on skewed classes; probabilities that will be used as probabilities need a calibration (reliability) plot with bin counts; regression needs predicted-versus-actual with a y = x line and residual plots against predictions and key features, not only RMSE; and an overall metric hides segments where the model fails. Every plot must be computed on held-out data, never the training set.
</context>

<task>
Produce evaluation plots for this model.

<model_setup>
{{model_setup}}
</model_setup>

<decision>
{{decision}}
</decision>

1. Choose the plots for the task: binary classification: PR curve with baseline, ROC curve with AUC, confusion matrix at the chosen threshold (row-normalised with counts), calibration plot with histogram of scores, metric-versus-threshold plot (precision, recall, and cost if costs are known). Multiclass: row-normalised confusion matrix, per-class precision and recall bars, one-vs-rest curves only for key classes. Regression: predicted versus actual with y = x, residuals versus predicted, residual distribution, error by segment or feature bins.
2. Add a per-segment view of the main metric for the segments given, with counts, so small segments are not over-read.
3. Write Python code (scikit-learn metrics and matplotlib, or plotly) that takes y_true, scores or predictions and an optional segment column, makes each plot with titles, axis labels, the baseline marked and a fixed random seed for any bootstrap, and saves each figure.
4. Explain how to read each plot in two or three sentences, including what a bad result looks like.
5. Choose a threshold from the decision: if costs are given, minimise expected cost and show the arithmetic; otherwise show the trade-off at two or three candidate thresholds and say who should decide.
6. List caveats: held-out data only, class balance in the test set versus production, leakage signs (results too good to be true), and bootstrap intervals when the test set is small.
</task>

<constraints>
- Never evaluate on training data; if the setup suggests that, stop and say so.
- Do not report accuracy alone on imbalanced data.
- Do not claim a model is good from the plots without the decision context; tie readings to the stated costs.
- Do not invent metric values; the code computes them, and the readings describe what to look for.
</constraints>

<output_format>
## Plots to make
Table: Plot | Why for this task.

## Code
One Python code block.

## How to read each plot
Short paragraph per plot.

## Threshold choice
Method and arithmetic, or the trade-off table.

## Caveats
Bullets.
</output_format>

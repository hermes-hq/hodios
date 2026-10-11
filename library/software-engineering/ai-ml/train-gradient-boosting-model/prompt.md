---
schema: 1
id: train-gradient-boosting-model
kind: prompt
title: Train a gradient-boosting model on tabular data
description: "Trains an XGBoost, LightGBM or CatBoost model on tabular data with leak-free splits, early stopping on validation, a baseline comparison and a saved, reloadable model."
category: ai-ml
version: 1.0.0
status: incubating
stage: [build]
role: [ml-engineer, data-scientist]
stack: [pandas]
requires: [repo-read, file-write, shell]
inputs: [dataset, repo, spec]
output: [code, report]
risk: runs-commands
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [xgboost, lightgbm, tabular-data, cross-validation, early-stopping]
pairs_with:
  prompts: [plan-ml-experiment, review-training-data]
args:
  - name: task
    description: The target, classification or regression, the unit of prediction and the moment of prediction.
    type: text
    required: true
  - name: data
    description: Where the data is, row count, columns and types, time range, and any grouping (customers, stores, patients).
    type: text
    required: true
  - name: library
    description: XGBoost, LightGBM or CatBoost if the project has one already.
    type: string
output_contract:
  format: markdown
  sections: [Setup, Code, Results, Feature notes, Check, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Gradient-boosted trees are the strongest default for tabular data, and their failures are mostly in the setup around them. Early stopping on the test set quietly tunes on it. Random K-fold on data that will be used to predict the future, or with many rows per customer, inflates scores. One-hot encoding high-cardinality columns is slower and often worse than the libraries' native categorical handling, while category codes that differ between training and inference produce silent garbage. Default parameters with a huge learning rate overfit; a learning rate around 0.05 with early stopping and a sensible leaf limit is a better start. Imbalance handled with resampling distorts probabilities; class weights or `scale_pos_weight` and a later threshold choice are usually better. Gain-based feature importance is biased toward high-cardinality features and is not an explanation.
</context>

<task>
Train a gradient-boosting model for: {{task}}

Data: {{data}}
{{#library}}

Library: {{library}}
{{/library}}

1. Read the repository's data loading, feature code and any existing training scripts. Reuse them and the project's config pattern.
2. Set up the split to match use: time-based when predicting the future (train on the past, validate on a later window, test on the latest), grouped when entities repeat, stratified for rare classes. Keep a test set untouched until the final run.
3. Prepare features: native categorical handling with a fixed category mapping saved with the model, missing values left to the library unless there is a reason, and no feature computed with information from after the moment of prediction.
4. Train baselines on the same split: a trivial one and a regularised linear model or a shallow tree.
5. Train the boosted model with sensible starting parameters (learning rate about 0.05, leaf or depth limit, minimum samples per leaf, row and column subsampling, light regularisation), early stopping on the validation fold only, and an objective and metric that match the task. For imbalance, use class weights and leave the threshold to a later step.
6. Run cross-validation with the same fold scheme to report mean and spread of the metric. Tune only a few parameters and only on validation folds.
7. Evaluate once on the test set: the primary metric, the baselines, and two or three slices that matter.
8. Inspect features with permutation importance on validation (and SHAP if it is already available), and treat any single dominant feature as a leakage suspect until explained.
9. Save the model with its feature list, category mapping, parameters and library version; add a test that reloads it and reproduces predictions on a fixed sample. Run the tests.
</task>

<constraints>
- Never use the test set for early stopping, tuning or feature selection.
- Report every metric next to the baselines and with its spread across folds.
- Prefer the library already in the project; do not add a second boosting library.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Setup
Split scheme, features, parameters, in bullets.
## Code
Code blocks with file paths.
## Results
Table: model | validation metric (mean ± sd) | test metric | key slices.
## Feature notes
Top features and any leakage suspects.
## Check
Commands run and real results.
## Next steps
Up to three, ranked.
</output_format>

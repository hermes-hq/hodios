---
schema: 1
id: engineer-features-for-tabular-model
kind: prompt
title: Engineer features for a tabular model
description: Designs and codes features for a tabular ML model - encodings, date, ratio and aggregate features, point-in-time correctness and leakage checks - and keeps only those that improve validation scores.
category: ai-ml
version: 1.0.0
status: incubating
stage: [build]
role: [data-scientist, ml-engineer]
stack: [python]
requires: [repo-read, file-write]
inputs: [dataset, repo, text]
output: [code, report]
risk: edits-files
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [feature-engineering, target-encoding, point-in-time, leakage, cross-validation]
pairs_with:
  personas: [ml-engineer]
  prompts: [train-gradient-boosting-model, find-leakage-in-training-code, build-sklearn-preprocessing-pipeline, explain-model-with-shap]
args:
  - name: problem
    description: What the model predicts, for which entity and at what moment (for example "at signup + 7 days, will this account churn in 90 days"), the evaluation metric and the model family.
    type: text
    required: true
  - name: data
    description: The tables and columns available with types, row counts, keys and timestamps - a schema, a sample or a profiling summary. Say when each column becomes known.
    type: text
    required: true
  - name: baseline
    description: The current feature set and validation score, if a model already exists.
    type: text
output_contract:
  format: markdown
  sections: [Prediction point, Candidate features, Leakage review, Code, Evaluation plan, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
On tabular problems, features move the score more than model choice or tuning, and the features that look best are often leaks. Experienced practitioners anchor everything to the prediction point: the moment the model will be called in production. Any value not known at that moment (a status updated later, an aggregate over the whole table, a refund recorded after the order) must be excluded or computed as of that time, or the offline score will be excellent and the production model useless. Aggregates per entity (counts, sums, recency, trends over 7, 30 and 90 day windows) are usually the strongest features, and the most leak-prone. Target encoding of high-cardinality categories is powerful but must be fitted out of fold, or it memorises the label. Gradient-boosted trees do not need scaling or log transforms and handle missing values natively, so effort goes into information the model cannot derive itself: ratios, differences, time since an event, counts of related records. Linear models and neural networks need encoding, scaling and cyclical treatment of periodic values. Feature importance from impurity is biased toward high-cardinality columns; a single feature dominating importance is a leak suspect before it is a win. And every feature must be computable the same way in the serving path.
</context>

<task>
<problem>
{{problem}}
</problem>
<data>
{{data}}
</data>
{{#baseline}}
<baseline>
{{baseline}}
</baseline>
{{/baseline}}

1. If you can read the repository, find the training code, the split logic and the serving or batch scoring code, and match their libraries and structure. Note how features are computed at serving time.
2. Write down the prediction point and the label window precisely. If either is unclear from the problem, ask and stop; every later step depends on it.
3. Classify each available column: known at the prediction point, known only later (exclude or compute as of the prediction time), an identifier, or a direct or indirect proxy for the label.
4. Propose candidate features in groups, each with its definition and why it should carry signal: entity aggregates over time windows ending at the prediction point; recency and time-since features; ratios and differences; date parts (with cyclical encoding only for models that need it); categorical encodings by cardinality (one-hot for few levels, native categorical support for boosting libraries, out-of-fold target encoding for many); missingness indicators where missing is informative; text length or simple counts where text exists.
5. Implement the features as functions or a pipeline that takes the as-of timestamp, never the full table at once, so training and serving share the code. Fit every learned transform (encoders, scalers, target encoding) inside the cross-validation folds.
6. Leakage review: for each feature, state when its inputs become known. Then run checks: a time-based or group-based split matching production (not a random split when rows share entities or time matters), a comparison of train and validation importance, and a flag on any single feature that lifts the score implausibly.
7. Evaluate by group: add one feature group at a time against the baseline with the same folds, report the metric with its spread across folds, and keep a group only if the gain exceeds the fold-to-fold noise. Use permutation importance on validation data, or SHAP, to prune features that add nothing.
8. Report the final feature list, the score change, and any features that need new data pipelines at serving time.
</task>

<constraints>
- Do not invent columns, scores or gains; work from the data described and label estimates as estimates.
- Never fit encoders, scalers or target statistics on data that includes the validation fold or test set.
- Do not use features derived from protected attributes or their close proxies for decisions about people without flagging it for review under the applicable law and policy.
- Prefer fewer, explainable features that can be served over a long list that only exists offline.
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Prediction point
The prediction moment, label window and split strategy in a few lines.
## Candidate features
Table: Feature | Definition | Group | Known at prediction point? | Why it may help.
## Leakage review
Bullets: excluded or rewritten columns and why, and the checks to run.
## Code
Code blocks with file paths.
## Evaluation plan
How groups are added and compared, the metric with fold spread, and the pruning rule. Include real results if you ran them, or say they were not run.
## Open questions
Numbered, or "None".
</output_format>

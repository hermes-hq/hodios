---
schema: 1
id: handle-imbalanced-classes
kind: prompt
title: Handle imbalanced classes in a classifier
description: "Chooses and implements fixes for an imbalanced classification problem (metrics, class weights, resampling inside folds, thresholds) and measures the effect of each against the same folds."
category: ai-ml
version: 1.0.0
status: incubating
stage: [build]
role: [ml-engineer, data-scientist]
stack: [python]
requires: [repo-read, file-write, shell]
inputs: [repo, dataset]
output: [code, report]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [class-imbalance, resampling, smote, precision-recall, class-weights]
pairs_with:
  prompts: [choose-classification-threshold, review-training-data]
args:
  - name: problem
    description: What is classified, the class counts or rates, and the cost of missing a positive versus a false alarm.
    type: text
    required: true
  - name: code
    description: Path to the current training and evaluation code.
    type: string
    required: true
  - name: model
    description: The model family in use, for example logistic regression, gradient boosting or a neural network.
    type: string
output_contract:
  format: markdown
  sections: [Diagnosis, Options compared, Code, Results, Recommendation, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Imbalance is often a metric problem before it is a model problem. At a 1% positive rate a model that never predicts the positive class scores 99% accuracy, and ROC-AUC looks flattering because it is dominated by the many easy negatives; PR-AUC and recall at a fixed precision show the real picture. Many "imbalance fixes" do no more than move the decision threshold, which can be done directly and cheaply. Resampling done before the split, or outside the cross-validation fold, leaks synthetic copies of test points into training. SMOTE interpolates between neighbours and behaves badly with categorical or high-dimensional features. Oversampling, undersampling and class weights all distort predicted probabilities, so anything that uses the probability as a probability needs recalibration or a prior correction afterwards.
</context>

<task>
Improve this imbalanced classifier: {{problem}}

Code: {{code}}
{{#model}}

Model: {{model}}
{{/model}}

1. Read the training and evaluation code. Report the current split (is it stratified?), the metric, where any resampling happens relative to the split, and the decision threshold in use.
2. Fix the measurement first: stratified (and grouped or time-based where needed) splits, PR-AUC, recall at the precision the business needs (or precision at the recall it needs), and the confusion matrix at the chosen threshold. Re-score the current model with these.
3. Compare, on identical folds, a small set of options suited to the model: no change with a tuned threshold; class weights (or `scale_pos_weight`, or a weighted loss for neural networks, focal loss only if training is unstable); random undersampling of the majority for very large data; and SMOTE or random oversampling only for numeric features. Put any resampling inside the training fold through an imbalanced-learn pipeline.
4. For each option report PR-AUC, the operating-point metric with its spread across folds, training time, and the calibration effect (Brier score or a reliability table).
5. If probabilities are used downstream, recalibrate the chosen option on held-out data (isotonic or sigmoid) or apply a prior correction after undersampling.
6. Recommend the simplest option that meets the target, and implement it in the project's code with a test that the resampling runs only on training data.
7. Run the tests and the comparison, and report the real numbers.
</task>

<constraints>
- Never resample before splitting or outside the cross-validation fold.
- Do not report accuracy as the main metric for an imbalanced problem.
- Do not recommend a complex fix when a threshold change gives the same result.
- If the cost of errors is unknown, ask or state the assumption used for the operating point.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Diagnosis
Current split, metric, resampling placement, threshold.
## Options compared
Table: option | PR-AUC (mean ± sd) | operating-point metric | Brier | training time.
## Code
Code blocks with file paths.
## Results
What changed against the original, in numbers.
## Recommendation
The chosen option and why, in two or three sentences.
## Check
Commands run and real results.
</output_format>

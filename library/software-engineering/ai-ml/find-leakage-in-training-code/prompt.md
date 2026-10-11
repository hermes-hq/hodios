---
schema: 1
id: find-leakage-in-training-code
kind: prompt
title: Find data leakage in ML training code
description: "Reviews ML training code for target leakage, preprocessing fitted on test data, time and group leakage and duplicates across splits, with the line, evidence and fix for each."
category: ai-ml
version: 1.0.0
status: incubating
stage: [review, verify]
role: [ml-engineer, data-scientist, researcher]
stack: [python]
requires: [repo-read, shell]
inputs: [repo, file, dataset]
output: [report, checklist]
risk: runs-commands
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [data-leakage, model-validation, cross-validation, ml-review]
pairs_with:
  prompts: [review-training-data, plan-ml-experiment]
  personas: [ml-engineer]
args:
  - name: code
    description: Paths to the training, feature and evaluation code or notebooks.
    type: text
    required: true
  - name: context
    description: What is predicted, when the prediction is made in production, how data is grouped, and the offline score that seems too good or does not hold in production.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Verdict, Findings, Confirmation tests, Clean areas, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
When a model scores far better offline than in production, leakage is the first suspect, and it usually hides in ordinary-looking lines. Scalers, imputers, PCA, feature selection, tokenisers or oversampling (SMOTE) fitted before the split. Target or mean encoding computed on the full table. Random splits on time-ordered data, rolling windows without a shift, backward fills that copy future values into the past. Rows of the same customer, patient or document in both train and test. Columns recorded after the outcome (status fields, closing dates, "reason" fields). The test set used for early stopping, threshold choice or model selection. Exact and near-duplicate rows across splits. Each of these can be confirmed with a cheap test, and a review that only lists suspicions without a test leaves the team arguing.
</context>

<task>
Review this training code for leakage: {{code}}

Context: {{context}}

1. Read the code end to end in execution order, following data from loading to the reported metric. Note where the split happens; everything fitted before that line is suspect.
2. Check each leakage class against the code and the stated moment of prediction:
   - preprocessing or resampling fitted before the split or outside cross-validation folds;
   - target-derived features and encodings computed on the full data;
   - features available only after the moment of prediction (check column names, joins on later tables, timestamps);
   - time leakage: random splits on temporal data, unshifted rolling or lag features, forward or backward fills across the split, future-dated joins;
   - group leakage: the same entity in more than one split;
   - duplicates and near-duplicates across splits;
   - evaluation leakage: test data used for early stopping, tuning, threshold or model selection, or the test set reused across many experiments;
   - for text and images: vocabulary, normalisation statistics or augmentation fitted on all data, and the same source document or scene in several splits.
3. For each finding give the file and line, why it leaks, the severity (inflates the headline metric a lot, a little, or only in theory), and the minimal fix.
4. Propose a confirmation test for each high-severity finding: retrain with the fix and compare, count shared entities or duplicate hashes across splits, drop the suspect feature and watch the score, or run adversarial validation (a classifier that tries to tell train from test).
5. If the data is available and the user allows running code, run the cheap checks (duplicate and entity overlap counts, feature-drop comparison) and report the real numbers.
6. List the areas you checked and found clean, so the team knows what was covered.
</task>

<constraints>
- Every finding cites the exact code; do not report a leak you cannot point to. Mark suspicions that depend on data you could not see as such.
- Do not rewrite the training code in this review; give the minimal fix per finding.
- Do not run long training jobs without asking; the cheap checks come first.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One paragraph: how likely the reported score is inflated, and by which finding most.
## Findings
Table: # | file:line | leakage type | why | severity | fix.
## Confirmation tests
For each high-severity finding: the test and, if run, the result.
## Clean areas
Bullets of what was checked and found clean.
## Open questions
Numbered, or "None".
</output_format>

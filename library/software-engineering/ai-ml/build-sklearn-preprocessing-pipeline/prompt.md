---
schema: 1
id: build-sklearn-preprocessing-pipeline
kind: prompt
title: Build a scikit-learn preprocessing pipeline
description: "Builds a scikit-learn Pipeline with ColumnTransformer for missing values, encoding and scaling that is fitted only on training data, saved as one object and tested on messy input."
category: ai-ml
version: 1.0.0
status: incubating
stage: [build]
role: [ml-engineer, data-scientist]
stack: [pandas]
requires: [repo-read, file-write, shell]
inputs: [dataset, repo, file]
output: [code, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [scikit-learn, feature-engineering, data-leakage, column-transformer, serialization]
pairs_with:
  prompts: [plan-ml-experiment, review-training-data]
args:
  - name: data
    description: The dataset or a sample, with column names, types, missing-value patterns and the target column.
    type: text
    required: true
  - name: model
    description: The estimator the pipeline feeds, for example logistic regression, gradient boosting or a k-nearest-neighbours model.
    type: string
    required: true
  - name: current_code
    description: Path to the existing preprocessing code or notebook, if there is one.
    type: string
output_contract:
  format: markdown
  sections: [Column plan, Code, Tests, Check, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Preprocessing done in pandas before the split is the most common leak in tabular ML: the scaler, imputer or target encoder learns from test rows, and cross-validation scores come out higher than production ever sees. Putting every learned step inside one Pipeline fixes this and gives a single object to save and serve. The details matter: `OneHotEncoder` needs `handle_unknown` set or a new category at inference crashes the service; rare categories should be grouped (`min_frequency`); scaling helps linear, distance and neural models but is pointless for trees; `SimpleImputer(add_indicator=True)` keeps the fact that a value was missing, which is often predictive; scikit-learn's `TargetEncoder` cross-fits internally, while a hand-rolled mean encoding leaks. A pipeline pickled with one scikit-learn version may not load with another, so the version must be pinned and recorded.
</context>

<task>
Build the preprocessing pipeline for this data: {{data}}

It feeds: {{model}}
{{#current_code}}

Existing code to replace: {{current_code}}
{{/current_code}}

1. Read the existing preprocessing and training code and the pinned scikit-learn version. Note every step that is fitted on the full dataset today.
2. Make a column plan: each column assigned to numeric, low-cardinality categorical, high-cardinality categorical, ordinal, text, datetime, identifier (dropped) or target, with the transformation and the reason. Flag columns that may leak the target.
3. Build the `ColumnTransformer` and `Pipeline`: imputation with missing indicators where useful, one-hot with unknown-category handling and rare grouping for low-cardinality, target or ordinal encoding for high-cardinality depending on the model, scaling only if the model needs it, and datetime parts derived in a stateless transformer. Use `set_output(transform="pandas")` where the version supports it so feature names survive.
4. Put the estimator as the last step, and run cross-validation on the whole pipeline so every fold refits preprocessing.
5. Save the fitted pipeline as one artifact with the scikit-learn version and the expected input columns and types recorded next to it.
6. Write tests: unseen category, all-missing column value, missing column (fails with a clear message), extra column (ignored or rejected, as decided), wrong dtype, a single-row input, and a reload of the saved artifact giving identical predictions.
7. Run the tests and a cross-validation, and compare the score with the old approach if one existed; a drop usually means the old score was leaking.
</task>

<constraints>
- No learned statistic may be computed outside the pipeline.
- Keep column lists in one place; do not duplicate them between training and serving code.
- Use only transformers available in the pinned scikit-learn version; if a feature needs a newer version, say so instead of upgrading silently.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Column plan
Table: column | group | transformation | reason.
## Code
Code blocks with file paths.
## Tests
Code blocks with file paths.
## Check
Commands run, cross-validation result old versus new, and real test results.
## Open questions
Numbered, or "None".
</output_format>

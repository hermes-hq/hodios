---
schema: 1
id: explain-model-with-shap
kind: prompt
title: Explain a model's predictions with SHAP
description: "Explains a trained model globally and per prediction with SHAP, cross-checked against permutation importance, with honest caveats on correlated features and causality."
category: ai-ml
version: 1.0.0
status: incubating
stage: [verify, review]
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
depth: specific
tags: [shap, explainability, feature-importance, interpretability]
pairs_with:
  prompts: [write-model-card, find-leakage-in-training-code]
args:
  - name: model
    description: Where the trained model and its preprocessing are, the model type, and the target.
    type: text
    required: true
  - name: data
    description: The validation or recent production data to explain, and its size.
    type: text
    required: true
  - name: audience
    description: Who the explanation is for, for example "the data science team", "credit officers" or "a regulator's request".
    type: string
output_contract:
  format: markdown
  sections: [Setup, Code, Global explanation, Local explanations, Caveats, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
SHAP values explain what the model does, not how the world works: a feature with high SHAP is one the model leans on, which may be a proxy or a leak. With correlated features, credit is split between them in ways that depend on the explainer and the background data, so "feature A matters and B does not" can flip between runs. For classifiers, SHAP values are usually in log-odds, not probability, and summing them to explain "a 30% risk" needs care. TreeExplainer is fast and exact for tree ensembles; KernelExplainer is slow and approximate and needs a small, representative background sample. Explanations must be computed on the transformed features the model actually sees and then mapped back to readable names, or one-hot columns get explained as noise. Gain importance from the model itself is biased and should not stand alone.
</context>

<task>
Explain this model: {{model}}

Data to explain: {{data}}
{{#audience}}

Audience: {{audience}}
{{/audience}}

1. Read the training and preprocessing code. Load the model and the pipeline, confirm feature names after transformation, and check the SHAP library version against the model library.
2. Pick the explainer: TreeExplainer for tree ensembles, a linear explainer for linear models, a gradient or deep explainer for neural networks, and KernelExplainer only as a last resort with a background sample of 100-500 rows. State the output space (log-odds, probability or raw).
3. Compute SHAP values on a representative sample of the data (stratified if classes are rare). Check additivity: base value plus SHAP values equals the model output for a few rows.
4. Global view: mean absolute SHAP per feature, aggregated back to original features where one-hot or other encodings split them; a beeswarm summary; and dependence plots for the top features, coloured by the strongest interacting feature.
5. Cross-check with permutation importance on held-out data. Where the two disagree, look for correlated features and say so.
6. Local view: explain a handful of chosen rows (a typical positive, a typical negative, a confident error, any rows the user names) with waterfall plots and a plain-language sentence each, translating log-odds to probability changes approximately where the audience needs it.
7. Flag suspicious patterns: identifiers, timestamps or post-outcome fields near the top, or effects with the wrong sign for domain logic.
8. Save plots and a short script to reproduce them, and run it.
</task>

<constraints>
- Never describe SHAP results as causal effects or as advice on what to change in the real world.
- State the output space and the background data used; results are not comparable without them.
- For decisions about people (credit, hiring, health, insurance), note that explanations for those affected may have legal requirements the team must check.
{{> output/uncertainty}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Setup
Explainer, output space, sample, background data.
## Code
Code blocks with file paths.
## Global explanation
Top features table (original names) with mean absolute SHAP and permutation importance, plus plot paths.
## Local explanations
Each chosen row: prediction, top contributions, one plain sentence.
## Caveats
Correlated features, suspicious features, what this does not show.
## Check
Commands run, additivity check result, real outputs.
</output_format>

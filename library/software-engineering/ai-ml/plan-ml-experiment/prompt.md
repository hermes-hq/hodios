---
schema: 1
id: plan-ml-experiment
kind: prompt
title: Plan a machine-learning experiment
description: "Plans a machine-learning experiment before any training code exists: framing, baselines, leak-proof splits, metrics, ablations and a stop rule. Use when starting a new model or modelling spike."
category: ai-ml
version: 1.0.0
status: experimental
stage: [plan, design]
role: [ml-engineer, data-scientist, researcher]
requires: [none]
inputs: [spec, dataset, text]
output: [plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [data-leakage, baselines, ablation, reproducibility]
pairs_with:
  prompts: [review-training-data, choose-ml-approach]
  personas: [ml-engineer]
args:
  - name: problem
    description: What should be predicted or generated, for whom, and the decision the prediction feeds.
    type: text
    required: true
  - name: dataset
    description: What the data is, its columns or fields, row count, time range, how labels were produced, and any grouping (users, patients, sites).
    type: text
    required: true
  - name: compute_budget
    description: Hardware and time available, for example "one GPU for a week" or "laptop only".
    type: string
output_contract:
  format: markdown
  sections: [Framing, Metrics, Baselines, Data splits, Leakage checks, Run plan, Reproducibility, Stop rule]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Weeks of modelling are lost to the same mistakes. With no baseline, "0.92 AUC" means nothing. Random splits on data with time or group structure leak the answer into training. Features computed after the moment of prediction make offline results impossible to reproduce in production. The chosen metric does not match the decision the model supports. Tuning against the test set inflates every number. Without a stop rule, the project drifts from run to run. All of this is cheapest to fix on paper, before training code exists.
</context>

<task>
Plan an experiment for this problem:
{{problem}}

Dataset:
{{dataset}}
{{#compute_budget}}

Compute budget: {{compute_budget}}
{{/compute_budget}}

1. Frame it: the target, the unit of prediction (a row, user, session, document), the moment of prediction and which features exist at that moment, the decision the output drives, and the cost of a false positive against a false negative. If the target or the moment of prediction is unclear, ask before planning further.
2. Choose metrics: one primary metric that matches the decision (for example recall at a fixed precision for rare positives, PR-AUC for imbalanced ranking, MAE in the target's units), guardrail metrics, the slices to report separately, and the smallest improvement that would change the decision.
3. Define baselines in order: a trivial one (majority class, mean, last value, seasonal naive), a heuristic a domain expert would write, and a simple model such as logistic regression or gradient-boosted trees on obvious features. Every later result is reported against all three.
4. Design the splits: by time when the model will predict the future, by group when the same user, patient or document appears in many rows, stratified when classes are rare, cross-validated when data is small. Lock the test set until the final evaluation.
5. List leakage checks specific to this dataset: features recorded after the moment of prediction, identifiers or timestamps that correlate with the label, duplicates or near-duplicates across splits, preprocessing fitted on all the data, and target encoding computed outside the training fold. For each, give the concrete check, and treat a result that looks too good as a leak until proven otherwise.
6. Write the run plan: ordered runs, each with a hypothesis, the single change, its expected effect, its compute cost, and the evidence that would confirm it. Include ablations that attribute any gain over the simple model, and at least three seeds wherever variance could exceed the gain.
7. Specify reproducibility: data snapshot or version, code commit, configuration and seeds recorded for every run.
8. Write the stop rule: the condition to stop (target met, budget spent, or no gain above the minimum over a set number of consecutive runs) and the result that would end the project.
</task>

<constraints>
- Do not write training code. This is the plan the code will follow.
- Fit the run plan inside the compute budget, and say what to drop if it does not fit.
- Prefer the simplest model that meets the decision's needs. A complex model must beat the simple one by more than seed variance to stay in the plan.
{{> output/uncertainty}}
</constraints>

<output_format>
## Framing
Target, unit, moment of prediction, decision, error costs.

## Metrics
Primary, guardrails, slices, minimum meaningful improvement.

## Baselines
The three baselines and how each is computed.

## Data splits
The split scheme and why it matches how the model will be used.

## Leakage checks
Checklist: suspected leak, check, action if found.

## Run plan
Table: # | hypothesis | change | cost | what confirms it.

## Reproducibility
What is recorded for every run, and where.

## Stop rule
When to stop, and what would end the project.
</output_format>

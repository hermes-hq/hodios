---
schema: 1
id: write-model-retraining-pipeline
kind: prompt
title: Build a model retraining pipeline with a promotion gate
description: "Builds a scheduled or triggered retraining pipeline with data validation, reproducible training, a champion-versus-challenger gate and safe promotion with rollback."
category: ai-ml
version: 1.0.0
status: incubating
stage: [build, operate]
role: [ml-engineer, data-engineer]
stack: [python]
requires: [repo-read, file-write, shell]
inputs: [repo, config]
output: [code, tests, docs]
risk: runs-commands
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [model-retraining, ml-pipelines, champion-challenger, data-validation, model-registry]
pairs_with:
  prompts: [monitor-model-drift, shadow-test-new-model, set-up-experiment-tracking]
args:
  - name: model
    description: The model, its training code, data sources and how it is deployed today.
    type: text
    required: true
  - name: trigger
    description: When to retrain (schedule, drift alert, new labelled data volume) and how often new labels arrive.
    type: text
    required: true
  - name: orchestrator
    description: The scheduler or orchestrator already in use (Airflow, Dagster, Prefect, cron, CI pipelines, a cloud ML pipeline service).
    type: string
output_contract:
  format: markdown
  sections: [Pipeline design, Promotion gate, Code, Tests, Runbook, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Automatic retraining is safe only when every step can stop the pipeline. Without data validation, a broken upstream extract (half the rows, a column of nulls, a label pipeline that stopped) trains a bad model that then gets deployed. Without a fixed data cutoff and recorded versions, a run cannot be reproduced. Comparing the new model with the current one on different data, or only on overall metrics, lets regressions in important segments through. Evaluating the challenger on data the champion trained on favours one of them. A model trained on outcomes that the previous model influenced (who got approved, which items were shown) learns its own bias, so feedback loops need at least a note and ideally exploration data. And an automatic promotion with no rollback path turns one bad night into an incident.
</context>

<task>
Build a retraining pipeline for: {{model}}

Trigger: {{trigger}}
{{#orchestrator}}

Orchestrator: {{orchestrator}}
{{/orchestrator}}

1. Read the training, evaluation and deployment code and the orchestrator setup. Reuse existing tasks; do not introduce a second orchestrator.
2. Design the steps, each able to fail the run with a clear reason:
   - extract training data up to a fixed cutoff, with labels only for examples old enough to have them, and record the data snapshot or query and row counts;
   - validate data: schema, volume compared with recent runs, missing shares, label distribution, and freshness, against thresholds;
   - train with pinned config, code commit and seed, logging to the experiment tracker;
   - evaluate the challenger and the current champion on the same recent holdout that neither trained on, overall and on key segments, plus calibration where probabilities are used;
   - gate promotion;
   - register the challenger, and on promotion update the deployment pointer, with the previous champion kept for rollback.
3. Write the promotion gate: the challenger must beat or match the champion within a stated tolerance on the primary metric, not regress beyond a limit on any key segment, pass sanity checks (prediction distribution, latency), and optionally require human approval or a shadow period for high-risk models.
4. Note feedback-loop risks for this model and how the pipeline mitigates them (holdout traffic, logging of exposure, or documented acceptance).
5. Make runs idempotent and resumable, with alerts on failure to the owning team.
6. Write tests: validation failing on a truncated extract, the gate rejecting a worse model, the gate rejecting a segment regression, and promotion plus rollback against a local registry.
7. Run the pipeline end to end on a small sample in a non-production environment and report real results.
</task>

<constraints>
- Never promote to production without the gate; never delete the previous champion.
- Do not run the pipeline against production systems or change deployment pointers without explicit approval.
- Keep thresholds in configuration, with their reasons recorded.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Pipeline design
Ordered steps with what each records and what stops the run.
## Promotion gate
Numbered criteria with thresholds.
## Code
Code blocks with file paths.
## Tests
Code blocks with file paths.
## Runbook
What to do when each step fails, and how to roll back.
## Check
Commands run and real results.
</output_format>

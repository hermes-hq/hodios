---
schema: 1
id: monitor-model-drift
kind: prompt
title: Monitor a production model for drift
description: "Sets up monitoring for a production ML model: data quality, input drift, prediction drift and delayed-label performance, with thresholds tuned on history to avoid alert noise."
category: ai-ml
version: 1.0.0
status: incubating
stage: [operate]
role: [ml-engineer, data-scientist, sre]
stack: [python]
requires: [repo-read, file-write, shell]
inputs: [repo, dataset, logs]
output: [code, config, report]
risk: runs-commands
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [model-monitoring, data-drift, population-stability-index, alerting]
pairs_with:
  prompts: [write-model-retraining-pipeline, shadow-test-new-model]
args:
  - name: model
    description: What the model predicts, its features, where predictions are logged, and how they are used.
    type: text
    required: true
  - name: labels
    description: Whether and when true outcomes arrive (immediately, after 30 days, never) and where they are stored.
    type: text
    required: true
  - name: stack
    description: The monitoring and alerting tools already in use, and where scheduled jobs run.
    type: string
output_contract:
  format: markdown
  sections: [What to monitor, Thresholds, Code, Alerts and runbook, Check, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most "model drift" alerts turn out to be data bugs: an upstream column renamed, a unit changed, a join that now returns nulls, a category re-coded. Data quality checks catch those faster and more precisely than statistical drift tests. Drift statistics need a reference window that matches the business cycle, or every Monday and every holiday alerts. With large volumes, significance tests (KS, chi-square) flag tiny meaningless shifts, so effect-size measures such as the population stability index or Jensen-Shannon distance, with thresholds tuned on historical data, are more useful; the common PSI rule of thumb (0.1 watch, 0.25 act) is a starting point, not a law. Input drift does not always hurt performance, and performance can fall with no input drift (concept drift), so outcome-based metrics are what really matter, computed when delayed labels arrive, with prediction drift and proxy metrics as early warnings in between. Alerts with no runbook or owner get muted within a month.
</context>

<task>
Set up monitoring for: {{model}}

Labels: {{labels}}
{{#stack}}

Existing tools: {{stack}}
{{/stack}}

1. Read the serving and logging code and confirm that predictions are logged with timestamp, model version, input features (or a reference to them) and a key to join outcomes later. If not, add that first.
2. Define monitors in four layers:
   - Data quality per feature: missing share, out-of-range values, unseen categories, type and schema changes, volume per period.
   - Input drift: per-feature distribution comparison against a reference window (training data or a stable recent period that covers the business cycle), with PSI or Jensen-Shannon for continuous and categorical features, focused on the most important features.
   - Prediction drift: distribution of scores or classes, share above the decision threshold.
   - Performance: the model's primary metric once labels arrive, by segment, plus proxy metrics where labels are delayed (for example override rates or complaint rates).
3. Tune thresholds on history: replay the monitors over past months, count how often each would have fired, and set thresholds so alerts are rare and meaningful. Distinguish warning from action.
4. Implement the monitors as a scheduled job using existing tools (a monitoring library or plain SQL and Python), writing results to a table or dashboard.
5. Wire alerts to the existing alerting system with owner, severity and a short runbook for each: what to check first (upstream data changes), how to decide between fixing data, retraining, rolling back or accepting.
6. Run the job on historical data and show what it would have flagged.
</task>

<constraints>
- Data quality checks come before drift statistics.
- Do not set thresholds without replaying them on history, or say clearly that they are provisional.
- Do not log or display personal data in monitoring outputs beyond what is already allowed.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## What to monitor
Table: layer | metric | features or segments | frequency.
## Thresholds
Table: monitor | warning | action | how often it would have fired historically.
## Code
Code blocks with file paths.
## Alerts and runbook
Per alert: owner, severity, first checks, decisions.
## Check
The historical replay and real results.
## Open questions
Numbered, or "None".
</output_format>

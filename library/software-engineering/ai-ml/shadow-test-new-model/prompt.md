---
schema: 1
id: shadow-test-new-model
kind: prompt
title: Shadow or canary test a new model version
description: "Runs a new model version in shadow or canary next to the current one, compares outputs, latency and errors, and applies promotion and rollback rules written before the test."
category: ai-ml
version: 1.0.0
status: incubating
stage: [ship, operate]
role: [ml-engineer, backend-engineer, sre]
requires: [repo-read, file-write, shell]
inputs: [repo, spec, config]
output: [plan, code, report]
risk: runs-commands
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [shadow-deployment, canary-release, model-rollout, model-comparison]
pairs_with:
  prompts: [serve-ml-model-as-api, monitor-model-drift, choose-llm-for-feature]
args:
  - name: change
    description: The current and new model versions, what changed (retrain, new features, new architecture, new LLM or prompt), and offline results.
    type: text
    required: true
  - name: serving
    description: How predictions are served today (service, batch job, LLM call), traffic volume, and what side effects predictions trigger.
    type: text
    required: true
  - name: risk_appetite
    description: What a bad prediction costs and how fast a rollback must happen.
    type: string
output_contract:
  format: markdown
  sections: [Rollout plan, Promotion criteria, Code, Comparison report, Rollback, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Offline evaluation does not catch everything that changes in production: feature pipelines that behave differently live, latency under real load, different input mixes, and effects that only show in business metrics. Shadow mode sends live requests to the new model without using its answers, which is safe only if the shadow path has no side effects (no writes, emails, charges or tool calls) and does not slow the user's request. Canary mode serves a small share of real users, which is needed to measure outcomes but exposes them to the new model; assignment should be sticky per user so experiences and metrics are not mixed. The usual failure is deciding the promotion rule after seeing the numbers. Labels often arrive late, so the early comparison is on agreement, prediction distribution, latency and errors, with outcome metrics later.
</context>

<task>
Plan and implement a safe rollout for: {{change}}

Serving: {{serving}}
{{#risk_appetite}}

Risk appetite: {{risk_appetite}}
{{/risk_appetite}}

1. Read the serving code and how the model version is chosen today. Identify every side effect a prediction triggers.
2. Choose the stages: shadow first (always, unless there is no live path), then canary at a small share, then ramp. Say why, and how long each stage runs given traffic volume.
3. Write promotion criteria before any data is seen: maximum latency increase at p95 and p99, maximum error rate, prediction distribution limits, agreement rate with the current model and how disagreements will be reviewed, and outcome or guardrail metrics for the canary with the minimum sample needed.
4. Implement shadow mode: asynchronous call to the new model off the request path, a timeout, no side effects (disable or stub them explicitly), and logging of both outputs with a shared request id and versions.
5. Implement canary routing: a configurable share, sticky assignment by user or account id, version recorded on every prediction, and a single switch to send all traffic back.
6. Build the comparison report: agreement rate, distribution of both models' outputs, the largest disagreements with examples, latency percentiles, errors, cost, and, for the canary, outcome metrics with confidence intervals.
7. Define rollback triggers that act automatically or page someone, and test the rollback switch.
8. Run the tests for routing, stickiness, side-effect isolation and rollback, and report real results.
</task>

<constraints>
- The shadow path must never change what the user receives or trigger side effects; prove it with a test.
- Do not change production traffic or configuration without explicit approval; deliver the code and plan.
- Promotion criteria are fixed before the test; do not relax them after seeing results without saying so.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Rollout plan
Table: stage | traffic share | duration | exit condition.
## Promotion criteria
Numbered, each measurable.
## Code
Code blocks with file paths.
## Comparison report
The report template and how it is generated.
## Rollback
Triggers and the switch, with its test.
## Check
Commands run and real results.
</output_format>

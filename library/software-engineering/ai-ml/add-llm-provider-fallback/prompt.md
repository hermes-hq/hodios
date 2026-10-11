---
schema: 1
id: add-llm-provider-fallback
kind: prompt
title: Add LLM provider fallback
description: Adds failover from a primary LLM provider or model to a backup, with error-based triggers, a circuit breaker, per-model prompt adaptation and an eval that proves the fallback output is acceptable.
category: ai-ml
version: 1.0.0
status: incubating
stage: [build, operate]
role: [backend-engineer, ml-engineer, sre, software-engineer]
stack: [llm-apps]
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [code, tests, report]
risk: runs-commands
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [failover, circuit-breaker, multi-provider, reliability, model-routing]
pairs_with:
  prompts: [integrate-llm-api-with-retries, write-llm-eval-suite, choose-llm-for-feature]
args:
  - name: current_setup
    description: The feature, the primary provider and model, where the call lives (path or code), and what outages or slowdowns have happened.
    type: text
    required: true
  - name: fallback_candidates
    description: The backup provider or model you are allowed to use, and any limits (data residency, contracts, approved vendors).
    type: text
    required: true
  - name: quality_check
    description: The eval set or acceptance check the feature already has, if any.
    type: text
output_contract:
  format: markdown
  sections: [Failure modes, Fallback design, Prompt adaptation, Code, Parity eval, Check, Operational notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Provider outages, regional overloads and sudden rate-limit drops are routine, so a feature that matters needs a second path. Fallback done naively causes new problems: the backup model receives a prompt tuned for the primary and returns a different format that breaks the parser; tool definitions or structured-output settings that the backup does not support fail at runtime; every request first waits for the primary to time out, so latency during an outage is worse than an error; a flapping primary sends traffic back and forth; the backup is a different vendor whose data terms the company never approved; and nobody notices the system has been running on the fallback for a week. The fallback path is also rarely tested, so it fails on the day it is needed.
</context>

<task>
Add fallback for this feature: {{current_setup}}

Allowed fallbacks: {{fallback_candidates}}
{{#quality_check}}
Existing quality check: {{quality_check}}
{{/quality_check}}

1. Read the code around the model call: client construction, prompt building, tool or schema settings, parsing and existing retry logic. List the provider-specific features in use (tool calling format, JSON or structured output mode, system prompt placement, prompt caching, streaming, token limits).
2. Define what triggers failover: which errors (overload, 5xx, timeouts, exhausted retries on 429) and which do not (400, content refusals, input too large, which would fail on the backup too). Add a circuit breaker per provider: open after N failures in a window, skip the primary while open, half-open probe after a cool-down.
3. Put both providers behind one internal interface with a common request and response type, so callers do not change. Use an existing gateway or abstraction if the project already has one.
4. Adapt the prompt per model where needed: system prompt placement, tool schema format, structured output enforcement, stop sequences and `max_tokens`. Keep one source prompt and small per-model adapters, not two diverging copies.
5. Validate the backup's output with the same parser and validators as the primary; on validation failure, return the feature's normal error, not a half-parsed result.
6. Build a parity eval: run the quality check (or, if there is none, 30 to 50 representative inputs with expected properties) through both paths and report pass rates side by side, plus latency and cost per request. State whether the fallback is acceptable as is, acceptable as a degraded mode, or not acceptable.
7. Add observability: a metric and log field for which provider served each request, breaker state changes, and an alert when fallback traffic exceeds a threshold.
8. Write tests for the switch logic with fake providers: primary fails with each trigger, primary fails with a non-trigger, breaker opens and recovers, both fail. Run them and report.
</task>

<constraints>
- Only use providers and models listed as allowed. If sending data to the backup raises a data-processing or residency question, flag it for the owner; do not decide it.
- Do not claim the backup is equivalent without the parity eval results.
- Keep total latency bounded during an outage: the breaker must stop paying the primary's timeout on every request.
- Use each SDK's real parameters for the versions in the repository; if unsure, say so.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Failure modes
Which failures trigger fallback and which do not, as a table.
## Fallback design
Interface, breaker settings and request flow in bullets.
## Prompt adaptation
Per-model differences and how each is handled.
## Code
Code blocks with file paths.
## Parity eval
Table: path | pass rate | p50 and p95 latency | cost per request, then the verdict. If not run, the exact command to run it.
## Check
Tests and commands run with real results.
## Operational notes
Metrics, alerts, how to force or disable fallback, and open approvals.
</output_format>

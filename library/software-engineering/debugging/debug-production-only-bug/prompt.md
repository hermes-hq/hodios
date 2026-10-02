---
schema: 1
id: debug-production-only-bug
kind: prompt
title: Debug a production-only bug
description: Debugs a bug that happens only in production by diffing environment, config, data, traffic, versions and timing, then plans safe instrumentation to confirm the cause. Use for works-on-my-machine bugs.
category: debugging
version: 1.0.0
status: experimental
stage: [maintain, verify]
role: [backend-engineer, software-engineer, sre, devops-engineer]
requires: [repo-read]
inputs: [logs, text, config]
output: [report, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [works-on-my-machine, environment-drift, production-debugging, hypotheses]
pairs_with:
  prompts: [instrument-service-observability, find-root-cause, debug-race-condition, triage-production-alert]
  personas: [debugger]
args:
  - name: symptoms
    description: What goes wrong in production - error messages, which users or requests, how often, since when, and what does not reproduce locally or in staging.
    type: text
    required: true
  - name: environment_differences
    description: Known differences between production and where it works - versions, configuration, infrastructure, data size, traffic, feature flags, regions, time zones.
    type: text
  - name: logs
    description: Relevant production log lines, traces, metrics or error-tracker entries, with personal data removed.
    type: text
output_contract:
  format: markdown
  sections: [What the evidence says, Differences that matter, Hypotheses, Confirm safely, Likely fix, Missing information]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
When a bug appears only in production, the code is usually the same and something around it is not: a configuration value, a dependency version resolved differently, the data (size, shape, encoding, old records written by an earlier version), the traffic (concurrency, retries, request size), the infrastructure (proxies, load balancers, timeouts, memory limits, multiple instances), or time (time zones, clock skew, scheduled jobs, certificates or tokens expiring). Guessing and redeploying wastes days. The faster path is to list what differs, rank which difference can explain every symptom, and confirm with instrumentation that is safe to run against real users.
</context>

<task>
Debug this production-only problem:
{{symptoms}}
{{#environment_differences}}

Known differences: {{environment_differences}}
{{/environment_differences}}
{{#logs}}

<logs>
{{logs}}
</logs>
{{/logs}}

1. Extract the facts from the symptoms and logs: what fails, for whom (all users, some tenants, some regions, some instances), how often, since when, and what changed around that time (deploys, config changes, traffic growth, dependency updates, data migrations). Note patterns: specific instances, times of day, request sizes, user cohorts.
2. Diff production against the environment where it works, across these dimensions, and mark each as known-same, known-different or unknown:
   - Build and versions: commit, build flags, resolved dependency versions (lockfile honoured?), runtime and OS image, CPU architecture.
   - Configuration: environment variables, secrets, feature flags, defaults that differ when a variable is missing.
   - Data: volume, records written by older versions, nulls and unusual encodings, collation and time-zone settings, cache contents.
   - Traffic: concurrency, request sizes, retries, long-lived connections, bots.
   - Infrastructure: multiple instances (local state, sticky sessions), proxies and load balancers (header size, body size, idle timeouts), network policies, DNS, memory and CPU limits, file-system permissions and read-only volumes.
   - Time: time zones, clock skew between hosts, daylight saving, scheduled jobs, expiring certificates or tokens.
   - Dependencies: third-party API behaviour in production versus sandbox, rate limits, regional endpoints.
3. Form at most four hypotheses. For each, say which symptoms it explains and which it does not; drop hypotheses that contradict the evidence.
4. For each remaining hypothesis, design the cheapest confirming check, in order of safety: read-only queries and comparisons first (compare configs, query the data, read existing logs and metrics), then reproduction with production-like conditions in a non-production environment (production data snapshot with personal data masked, same versions, load), and only then targeted production instrumentation: extra log fields or spans behind a flag, sampled, for a limited time, on a subset of traffic, with no personal data or secrets logged and a plan to remove it.
5. Give the likely fix for the leading hypothesis and how to verify it in production after release (which metric or log should change).

If the symptoms are too vague to form any hypothesis, ask the three questions whose answers would narrow it most, and stop.
</task>

<constraints>
- Do not suggest attaching a debugger to production, enabling verbose logging globally, or experimenting on production data. Production instrumentation must be scoped, sampled, time-boxed and free of personal data.
- Each hypothesis must account for why it does not happen in the working environment.
- Never ask for secrets or credentials; ask for whether a value is set or how it differs.
{{> guardrails/investigate-before-answering}}
{{> output/uncertainty}}
</constraints>

<output_format>
## What the evidence says
Bullets of facts, each with its source (symptom report, log line, metric).

## Differences that matter
Table: dimension | production | working environment | known-same, known-different or unknown.

## Hypotheses
Numbered, most likely first. Each: the cause, the symptoms it explains, the ones it does not, and why the working environment is unaffected.

## Confirm safely
Per hypothesis, the checks in order with exactly what to run or look at and what result confirms or rules it out.

## Likely fix
The fix for the leading hypothesis and the production signal that proves it worked.

## Missing information
What to collect next, most useful first.
</output_format>

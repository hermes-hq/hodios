---
schema: 1
id: reduce-serverless-cold-start
kind: prompt
title: Reduce serverless cold starts
description: Cuts cold start latency of serverless functions or scale-to-zero containers by measuring init time and frequency, then trimming package and init work before paying for warm capacity.
category: performance
version: 1.0.0
status: incubating
stage: [maintain, operate]
role: [backend-engineer, devops-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo, logs, config, text]
output: [diff, report]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [serverless, cold-start, function-init, scale-to-zero, provisioned-concurrency]
pairs_with:
  prompts: [profile-hot-path, reduce-bundle-size, speed-up-cli-startup]
  personas: [performance-engineer]
args:
  - name: function
    description: The function or service, platform, runtime and language, memory setting, package size, traffic pattern, and the cold start latency you see.
    type: text
    required: true
  - name: evidence
    description: Init duration logs, traces of cold invocations, or the handler's setup code.
    type: text
output_contract:
  format: markdown
  sections: [Result, Cold start breakdown, Fixes ranked, Changes made, Cost of warm capacity]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A cold start is the platform creating a new instance: fetching the package or image, starting the runtime, and running everything at module or global scope before the first request. Only the last two are under your control in code, and the platform's logs usually report init duration separately from handler duration, which tells you where to look. Frequency matters as much as duration: spiky traffic, many small functions, and every deploy cause cold starts. Common costs are large packages and dependency trees, eager imports of SDKs the request does not use, fetching secrets or config over the network at init, opening database connections, and heavy framework bootstrapping. Memory settings often scale CPU too, so a larger setting can shorten init. Paid warm capacity (provisioned or minimum instances) and snapshot-and-restore features remove cold starts for a price and with their own constraints, and keep-warm pings are unreliable because they warm one instance, not the concurrency you need.
{{#evidence}}
Evidence:
{{evidence}}
{{/evidence}}
</context>

<task>
Function: {{function}}

1. Measure: cold start count as a share of invocations, init duration and first-request handler duration (p50 and p99), separated from warm invocations. Say which numbers come from platform logs and which from traces.
2. Break down init: package download or image size, runtime start, and each step at module scope (imports, client creation, config and secret fetches, connections), timed with simple timestamps or a trace.
3. Rank fixes by milliseconds saved per effort: trim and bundle the package and remove unused dependencies; lazy-load modules used by few paths; create clients once but without network calls at init where possible; cache secrets and config; adjust memory if CPU-bound during init; pick a faster-starting runtime only if justified.
4. Apply the top fixes and re-measure with forced cold starts (a new deploy or configuration change) several times.
5. If cold starts still miss the target, cost warm capacity or snapshot options for the traffic pattern and compare with the user-facing benefit.
</task>

<constraints>
- Do not recommend keep-warm pings as the solution; explain their limits if raised.
- Do not quote platform prices or limits as facts; ask for them or mark them to verify.
- Report measured numbers, separating cold and warm invocations.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Result
One line: cold start share and init p99 before and after.
## Cold start breakdown
Table: step | duration | measured or estimated.
## Fixes ranked
Numbered: fix | ms saved | effort.
## Changes made
The diff summary.
## Cost of warm capacity
Only if still needed: options, the cost formula with the user's prices, and the recommendation.
</output_format>

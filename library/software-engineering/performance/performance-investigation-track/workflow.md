---
schema: 1
id: performance-investigation-track
kind: workflow
title: Performance investigation track
description: Takes a vague "it is slow" complaint through gated steps, from metric and target to baseline, profile, one hypothesis at a time, fix and a verified write-up. Use when handed a slowness report.
category: performance
version: 1.0.0
status: incubating
stage: [plan, verify, build, review]
role: [software-engineer, backend-engineer, sre, tech-lead]
requires: [none]
inputs: [text, logs, repo]
output: [plan, report, diff]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [performance-investigation, baseline, profiling, hypothesis-testing, latency]
pairs_with:
  prompts: [profile-hot-path, read-flame-graph, analyze-load-test-results, tune-garbage-collector]
  personas: [performance-engineer]
  rules: [hot-path-performance-rules]
args:
  - name: complaint
    description: The complaint as you received it, with who reported it, what they were doing, when it started and any numbers, screenshots or tickets.
    type: text
    required: true
  - name: system_context
    description: The system - architecture, language and runtime, where it runs, recent changes or deploys, monitoring and profiling tools available, and what access you have (production, staging, local).
    type: text
steps:
  - {id: define, file: steps/01-define.md, stage: plan, gate: approve, artifact: "perf-investigation/01-definition.md"}
  - {id: baseline, file: steps/02-baseline.md, stage: verify, gate: approve, artifact: "perf-investigation/02-baseline.md"}
  - {id: profile, file: steps/03-profile.md, stage: verify, gate: approve, artifact: "perf-investigation/03-profile.md"}
  - {id: hypotheses, file: steps/04-hypotheses.md, stage: build, gate: approve, artifact: "perf-investigation/04-experiments.md"}
  - {id: verify, file: steps/05-verify.md, stage: review, gate: none, artifact: "perf-investigation/05-write-up.md"}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Turns a vague slowness complaint into a measured, fixed and documented result. Most performance investigations fail by skipping the first two steps: nobody agrees what "slow" means, so nobody can prove it got faster, and the first guess gets optimised. This track forces a metric, a target and a baseline before any code changes, then tests one hypothesis at a time.

<complaint>
{{complaint}}
</complaint>
{{#system_context}}

<system_context>
{{system_context}}
</system_context>
{{/system_context}}

Rules for every step:
- Work from real measurements only. If you can run commands in this environment, run them and show the output; otherwise give the user the exact commands and wait for their results. Never invent numbers.
- Ask for missing essentials (who is affected, which operation, environment access) and mark gaps as [X].
- If the user asks to skip measurement and jump to a fix ("just add caching"), say in two sentences what that risks (no proof of gain, new staleness or complexity), then offer a time-boxed minimal version of steps 1 and 2 (one metric, one quick baseline) before any change.
- One change per measurement, so every gain is attributable. Keep behaviour identical; run the tests after each kept change.
- Separate what was verified from what is inferred.
- Do not touch production without the user's explicit approval for that action.
{{> guardrails/scope-discipline}}

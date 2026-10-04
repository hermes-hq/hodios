---
schema: 1
id: set-performance-budgets
kind: prompt
title: Set performance budgets
description: Sets performance budgets (bundle size, LCP, INP, API p95, startup time, memory) from baseline data and wires them into CI so regressions fail the build with a clear message. Use to stop slow creep.
category: performance
version: 1.0.0
status: incubating
stage: [plan, verify]
role: [frontend-engineer, tech-lead, mobile-engineer, backend-engineer]
requires: [none]
inputs: [dataset, config, text]
output: [plan, config, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [performance-budgets, core-web-vitals, ci-gates, regression-prevention, lighthouse-ci]
pairs_with:
  prompts: [improve-web-vitals, reduce-bundle-size, speed-up-app-cold-start]
  personas: [performance-engineer]
args:
  - name: baseline_metrics
    description: Current numbers with their source - field data (CrUX, RUM), lab runs (Lighthouse), bundle sizes per route, API latency percentiles, app startup or memory - plus the CI system you use and any targets already promised.
    type: text
    required: true
  - name: app_type
    description: What the budgets are for.
    type: enum
    enum: [web, mobile, api]
    default: web
output_contract:
  format: markdown
  sections: [Budgets, How each is measured, CI wiring, When a budget fails, Review cadence]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user's {{app_type}} product gets slower release by release because nobody notices a few kilobytes or milliseconds at a time. Budgets fix that only if they are tied to user experience, set from real baselines, measured the same way every time, and enforced where changes happen (the pull request), with a message that says what grew and how to fix it.

Common mistakes: budgets copied from a blog rather than set from the product's own numbers; lab metrics treated as if they were field metrics; gates so noisy (single Lighthouse run on shared CI) that engineers learn to ignore them; budgets only on totals so nobody knows which change caused the regression; and no owner or process when a budget must be raised.

Reference thresholds that are public standards: Core Web Vitals "good" is LCP at or under 2.5 s, INP at or under 200 ms and CLS at or under 0.1, at the 75th percentile of field page loads.
</context>

<task>
<baseline_metrics>
{{baseline_metrics}}
</baseline_metrics>

1. Pick 4-7 budgets that matter for this {{app_type}} product, mixing outcome metrics (what users feel) and proxy metrics (what CI can measure reliably):
   - web: field LCP, INP, CLS at p75; lab proxies such as JavaScript bytes per route (compressed), total transfer, number of requests, Lighthouse performance score as a soft signal, time to first byte.
   - mobile: cold start time on a reference low-end device, app download and install size, memory at a key screen, frame rendering (slow or frozen frames).
   - api: p95 and p99 latency per critical endpoint at a stated load, error rate, payload size, queries per request.
2. Set each budget from the baseline: hold the line at the current value plus a small tolerance for metrics already good; for metrics that are poor, set the current value as the gate and a separate target with a date. Show the arithmetic.
3. Define measurement so it is stable: tool, environment, device or throttling profile, number of runs (for example median of 3-5 Lighthouse runs), and which percentile. Separate gates (lab, deterministic: bundle size, request count, query count) from monitors (field, noisy: alert and review, not block).
4. Wire it into CI for the user's system with concrete config: for example bundle-size checks (size-limit or bundler stats with a comparison), Lighthouse CI assertions with a budget file, a mobile startup benchmark job, or a load-test threshold for API latency. Report the change per pull request as a comment.
5. Write the failure message template: which budget, the base and new value, the delta, the files or dependencies that grew, and links to the fix guide.
6. Define the exception process: who can raise a budget, the evidence needed, and that raises are recorded with a reason.
7. Set the review cadence: monthly check of field data against targets; tighten budgets when improvements land.

If baselines are missing for a metric, say how to collect them and leave that budget as [TO SET AFTER BASELINE].
</task>

<constraints>
- Every budget number traces to the user's baseline or to a named public standard; never invent baselines.
- Do not gate pull requests on noisy field metrics; gate on deterministic lab proxies.
- Keep the number of budgets small enough that each has an owner.
{{> output/uncertainty}}
</constraints>

<output_format>
## Budgets
Table: metric | baseline | budget (gate) | target and date | gate or monitor | owner (role).
## How each is measured
Table: metric | tool | environment and profile | runs and percentile.
## CI wiring
Config files and pipeline steps as code blocks.
## When a budget fails
The message template, then the exception process.
## Review cadence
Bullets.
</output_format>

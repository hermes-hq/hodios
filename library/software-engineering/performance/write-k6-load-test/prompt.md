---
schema: 1
id: write-k6-load-test
kind: prompt
title: Write a k6 load test
description: Writes a k6 load test script from a workload model, with arrival-rate scenarios, thresholds that fail the run, test data and tagged metrics. Use when the load plan is settled and you need the script.
category: performance
version: 1.0.0
status: incubating
stage: [verify]
role: [backend-engineer, sre, qa-engineer]
stack: []
requires: [none]
inputs: [spec, text]
output: [code]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [k6, load-testing, thresholds, workload-model]
pairs_with:
  personas: [performance-engineer]
  prompts: [plan-load-test]
args:
  - name: endpoints
    description: The requests to make - method, path, headers, example payloads, auth flow and the expected success status for each.
    type: text
    required: true
  - name: workload
    description: The workload model - target arrival rate or users per transaction, the mix, think time, ramp and duration per scenario, and the pass or fail thresholds.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Script, Test data, How to run, Reading the results, Placeholders]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
This prompt turns an agreed workload model into a k6 script. (To design the model itself, use a load test planning prompt first.) The k6 details that decide whether results mean anything:
- Arrival-rate executors (`constant-arrival-rate`, `ramping-arrival-rate`) model an open system, so a slow server does not quietly reduce the load. Looping virtual-user executors do, which hides saturation.
- `preAllocatedVUs` and `maxVUs` must cover rate times response time; when they do not, k6 reports `dropped_iterations` and the generator, not the server, was the limit.
- Thresholds in `options.thresholds` make the run pass or fail automatically; `abortOnFail` stops a run that is already lost.
- Tagging requests with a stable `name` keeps URLs with ids from exploding into thousands of metric series.
- `SharedArray` loads test data once instead of once per virtual user.
</context>

<task>
Write a k6 script for these requests:
<endpoints>
{{endpoints}}
</endpoints>
using this workload model:
<workload>
{{workload}}
</workload>

1. If the model lacks a rate, a mix or a threshold, ask for it and stop; do not invent the goal of the test. Minor gaps (think time, ramp length) can be filled with a stated assumption.
2. One scenario per traffic shape in the model (for example smoke, peak, stress, soak), selected with an environment variable such as `__ENV.SCENARIO` so one file serves all. Each user-facing scenario uses an arrival-rate executor with `preAllocatedVUs` and `maxVUs` sized from the target rate and expected latency, showing the arithmetic in a comment.
3. Implement the transaction mix by weight inside the default function or as separate `exec` functions per scenario. Add think time only where the model has it.
4. Authentication happens once in `setup()` where tokens can be shared, or per virtual user when sessions must be distinct. Secrets and the base URL come from `__ENV`, never the script.
5. Load varied test data from CSV or JSON through `SharedArray` (with papaparse for CSV), enough rows to defeat caching the way production traffic does.
6. Every request gets a `name` tag, a `check` on status and one meaningful body property, and a `group` or scenario tag that matches the model's transaction names.
7. Thresholds: p95 and p99 per transaction via tagged metrics (`http_req_duration{name:checkout}`), `http_req_failed` rate, `checks` rate, and `dropped_iterations` count equal to 0. Use `abortOnFail` with a delay on the error-rate threshold.
8. Add `handleSummary` only if the user wants a file report; otherwise rely on the standard summary.
</task>

<constraints>
- Use only the k6 standard modules (`k6`, `k6/http`, `k6/data`, `k6/metrics`, `k6/execution`) plus the papaparse remote module for CSV; no npm packages, because k6 does not run on Node.
- Do not invent endpoints, payload fields or status codes; mark gaps as placeholders.
- Never default the base URL to a production host. Warn if the endpoints call third-party services that must be stubbed.
</constraints>

<output_format>
## Script
One fenced `javascript` block, complete and runnable.
## Test data
The data file format with three example rows using fake values.
## How to run
`k6 run` commands per scenario with the environment variables.
## Reading the results
Five bullets: which numbers decide pass or fail, what `dropped_iterations` means, and which server-side metrics to watch alongside.
## Placeholders
List of values to fill in, or "None".
</output_format>

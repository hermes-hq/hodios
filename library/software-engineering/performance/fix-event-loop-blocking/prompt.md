---
schema: 1
id: fix-event-loop-blocking
kind: prompt
title: Fix event loop blocking
description: Finds synchronous or CPU-heavy work that blocks a Node.js or Python asyncio event loop and makes every request slow at once, measures loop delay, and moves the work off the loop.
category: performance
version: 1.0.0
status: incubating
stage: [maintain, operate]
role: [backend-engineer, fullstack-engineer]
stack: [nodejs, python]
requires: [repo-read, file-write, shell]
inputs: [repo, logs, text]
output: [diff, report]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [event-loop, asyncio, worker-threads, event-loop-lag, async-io]
pairs_with:
  prompts: [profile-hot-path, read-flame-graph, find-memory-leak]
  personas: [performance-engineer, concurrency-specialist]
args:
  - name: symptom
    description: What you see (for example all endpoints slow together, health checks timing out under load), the runtime and framework, and suspected code if any.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Result, Blocking calls found, Fix, Guard against regressions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
In a single-threaded event loop, one slow synchronous call stalls every other request on that process, so the signature is "everything got slow at the same moment", timers firing late, and health checks failing under load while CPU on one core is pinned. Common blockers: synchronous file, crypto, compression or child-process calls; parsing or stringifying large JSON; regular expressions with catastrophic backtracking; big loops over arrays; template rendering of huge pages; in Python, calling blocking libraries (an HTTP client, a database driver, `time.sleep`) inside `async def`. The right measurement is event loop delay (Node's `monitorEventLoopDelay` or equivalent APM metric; asyncio debug mode and its slow callback warning) plus a CPU profile taken while delay spikes.
</context>

<task>
Symptom: {{symptom}}

1. Measure event loop delay under representative load (p50, p99, max) and record request latency at the same time. If the platform already exports a loop delay metric, use it.
2. Find the blocking calls: take a CPU profile during a delay spike, enable the runtime's blocking or slow-callback detection, and search the code for synchronous APIs and blocking libraries used on request paths. List each with `path:line` and its measured or observed duration.
3. Fix each with the matching tool: the asynchronous API version; streaming instead of whole-payload parsing; a worker thread, process pool or `to_thread`/executor for CPU-bound or unavoidable blocking work; chunking long loops so the loop yields; a safe regular expression or input length limit for backtracking patterns; moving heavy work to a background job.
4. Re-run the same load and report loop delay and latency before and after.
5. Add a guard: an alert on loop delay, a lint rule against synchronous APIs in request code, or a test that fails on slow callbacks.
</task>

<constraints>
- Do not add more processes or instances as the fix; it hides blocking instead of removing it. Mention it only as a short-term mitigation.
- Moving work to threads or processes must keep error handling, cancellation and back-pressure; say how.
- Report measured numbers, not estimates.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Result
One line: loop delay p99 and request latency before and after.
## Blocking calls found
Table: `path:line` | call | duration | why it blocks.
## Fix
The diff and one sentence per change.
## Guard against regressions
What was added.
</output_format>

---
schema: 1
id: implement-asyncio-concurrent-requests
kind: prompt
title: Run many HTTP calls concurrently with asyncio
description: Implements bounded concurrent I/O in Python with asyncio and httpx, a shared client, a concurrency limit, timeouts, retries and per-item results. Use when a loop of slow calls must run in parallel.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, data-engineer, software-engineer]
stack: [python]
requires: [repo-read, file-write, shell]
inputs: [spec, repo]
output: [code, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [asyncio, httpx, semaphore, retries, timeouts, fan-out]
args:
  - name: job
    description: What calls to make and over what inputs, for example "fetch 20,000 product pages by id" or "call the enrichment API for each row of a CSV".
    type: text
    required: true
  - name: limits
    description: Known rate limits or concurrency caps of the remote service, for example "100 requests per minute" or "max 10 connections".
    type: text
  - name: python_version
    description: Python version the code must run on. Leave empty to detect it from the project.
    type: string
output_contract:
  format: markdown
  sections: [Plan, Changes, Failure handling, Tests, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Turning a slow loop of HTTP calls into async code fails in familiar ways. `asyncio.gather` over 20,000 coroutines opens as many connections as the OS allows and the server answers with 429s or drops them. A new `httpx.AsyncClient` per request throws away connection pooling. One blocking call (`requests`, `time.sleep`, a sync database driver) freezes the whole event loop. Plain `gather` raises the first exception while the rest keep running unobserved, and `TaskGroup` cancels every sibling on the first failure, which is wrong when you want partial results. Retries without backoff and jitter turn a brief outage into a self-inflicted flood.
</context>

<task>
Implement this concurrent job:

{{job}}

{{#limits}}
Remote limits: {{limits}}
{{/limits}}
{{#python_version}}
Python version: {{python_version}}
{{/python_version}}

1. Read the existing code that does this work today and the project's dependencies. If there is already an async HTTP client, a retry helper or a rate limiter, use it. Detect the Python version if not given (`TaskGroup` needs 3.11+).
2. Find anything blocking in the per-item path (sync HTTP clients, sync DB drivers, file I/O, CPU-heavy parsing). Replace it with an async equivalent, or move it off the loop with `asyncio.to_thread` and say so.
3. Create one `httpx.AsyncClient` for the whole run, with explicit `httpx.Timeout` (connect, read, write, pool) and `httpx.Limits` matching the concurrency cap, and close it with `async with`.
4. Bound concurrency with an `asyncio.Semaphore` (or a fixed pool of worker tasks reading from an `asyncio.Queue` when the input is large or streamed). If a requests-per-second limit exists, add a simple rate limiter on top of the semaphore; a semaphore alone does not limit rate.
5. Retry only transient failures: connect and read timeouts, 429, 502, 503 and 504. Use exponential backoff with jitter and a max attempt count, honour `Retry-After` when present, and do not retry non-idempotent requests unless the API supports an idempotency key.
6. Return one result per input: success value or a recorded error with the input id, attempts and final status. Do not let one failure cancel the rest, unless the job says all-or-nothing.
7. Keep input order in the results if callers rely on it. Add progress logging every N items and a summary at the end (succeeded, failed, retried).
8. Provide the entry point: `asyncio.run(main())` for scripts; note that inside Jupyter or an already running loop you must `await main()` instead.
9. Write tests with a mocked transport (`httpx.MockTransport` or the project's HTTP mocking library) covering success, a retried 503, a permanent 404 recorded as failure, and a timeout. Run them.
</task>

<constraints>
- Never fire unbounded concurrency at a third-party service. If limits are unknown, start at a conservative cap (for example 10) and make it a parameter.
- Do not swallow exceptions silently; every failed item appears in the results with its reason.
- Do not mix sync and async HTTP clients in the same path.
- Keep secrets (API keys, tokens) out of logs and error records.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Plan
Concurrency model (semaphore or worker pool), cap, timeouts and retry policy, in a few bullets.

## Changes
One line per file: `path`, what changed.

## Failure handling
Table: Failure | Retried? | Final outcome in results.

## Tests
One line per test and the case it covers.

## Verification
Commands run and their real results, plus any measured speed-up if you ran it.
</output_format>

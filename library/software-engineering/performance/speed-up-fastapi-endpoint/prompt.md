---
schema: 1
id: speed-up-fastapi-endpoint
kind: prompt
title: Speed up a slow FastAPI endpoint
description: Speeds up a slow FastAPI endpoint by profiling it, fixing blocking calls in async routes, sequential awaits, slow database access and heavy response serialization, with timings before and after.
category: performance
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [backend-engineer, software-engineer]
stack: [fastapi]
requires: [repo-read, file-write, shell]
inputs: [repo, logs, text]
output: [diff, tests, report]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [async, pydantic, sqlalchemy, profiling, latency]
pairs_with:
  prompts: [fix-event-loop-blocking, fix-n-plus-one-queries, parallelize-sequential-io-calls, tune-app-server-workers]
  personas: [performance-engineer, python-engineer]
args:
  - name: endpoint
    description: The slow route, its handler location, the timing seen (p50, p95, under what load), and the database and client libraries used.
    type: text
    required: true
  - name: evidence
    description: Profiler output, APM traces, SQL logs or load test results, if any.
    type: text
output_contract:
  format: markdown
  sections: [Result, Where the time goes, Changes, Verification, Further options]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
FastAPI runs `async def` routes on the event loop and plain `def` routes in a thread pool. The most common FastAPI slowdown is a blocking call (a sync database driver, `requests`, file I/O, heavy CPU work) inside an `async def` route: it stalls every request on that worker, so latency rises with load even though each call looks fast alone. The fix is an async client, moving the call to a thread with `run_in_threadpool`, or declaring the route `def`; the thread pool has a limited size, so many slow sync routes also queue. Other usual costs: awaiting independent calls one after another instead of together, lazy loading in SQLAlchemy (which also fails outright under async sessions), dependencies that open a new database or HTTP client per request instead of reusing a pooled one, and response serialization of large lists through `response_model` validation. Pydantic v2 is much faster than v1, and returning a pre-validated response or a faster JSON response class can matter for large payloads. Measure with a profiler that understands async (pyinstrument, py-spy) and with load, not a single request.
</context>

<task>
Endpoint: {{endpoint}}
{{#evidence}}
Evidence:
{{evidence}}
{{/evidence}}

1. Read the route, its dependencies, the database session setup and the clients it calls. Note whether it is `async def` or `def` and which calls inside are blocking.
2. Measure a baseline: time the endpoint with realistic data, once alone and under modest concurrency, and profile one request. Log the SQL statements and count them.
3. Fix in order of measured impact, one change at a time:
   - Blocking calls in async routes: switch to the async client, offload to a thread, or make the route sync.
   - Sequential independent awaits: run them concurrently with bounded concurrency and proper error handling.
   - Database: remove lazy loads and N+1 with eager loading, select only needed columns, add the missing index if the query plan shows a scan.
   - Per-request setup: reuse pooled database and HTTP clients created at startup.
   - Serialization: trim the response model, paginate large lists, and avoid validating the same data twice.
4. After each change re-measure with the same method. Keep the response body identical unless the user agrees to change it.
5. Run the test suite and add a test that guards the fix where practical (for example a bound on query count).
</task>

<constraints>
- Report only measured numbers, with the method and load used.
- Do not change the API contract (fields, status codes, pagination) without the user's agreement.
- Do not add caching unless the user agrees on staleness and invalidation.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Result
p50 and p95 before and after, alone and under load.
## Where the time goes
Findings with `path:line`.
## Changes
The diff with one sentence per change and its measured effect.
## Verification
Tests run and measurement method.
## Further options
Bigger changes not made (caching, background tasks, more workers), or "None".
</output_format>

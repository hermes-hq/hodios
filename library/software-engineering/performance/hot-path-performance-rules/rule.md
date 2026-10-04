---
schema: 1
id: hot-path-performance-rules
kind: rule
title: Hot path performance rules
description: Standing rules for code on latency-sensitive paths covering no queries in loops, bounded result sets and allocations, timeouts on remote calls, and measuring before and after any optimisation.
category: performance
version: 1.0.0
status: incubating
stage: [build, review]
role: [backend-engineer, software-engineer, sre]
requires: [none]
risk: read-only
level: intermediate
tags: [latency, hot-path, timeouts, pagination, n-plus-one, benchmarking]
pairs_with:
  prompts: [fix-n-plus-one-queries, profile-hot-path, plan-caching-strategy]
  personas: [performance-engineer]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you write, change or review code that runs on a latency-sensitive path (request handlers, message consumers, rendering loops, inner loops of batch jobs, or anything the user calls hot):

**Data access**
- Never issue a database query, cache lookup or remote call inside a loop over items. Batch it (one query with `IN`, a join, a bulk API) or load the data before the loop.
- Every query or listing that can grow has a bound: pagination with a maximum page size, a `LIMIT`, or a streamed cursor. No unbounded `SELECT *` or "fetch all" on tables that grow with users or time.
- Select only the columns you use. Check that new filters and sort orders on large tables are covered by an index, and say so when you cannot check.

**Remote calls**
- Every network call has an explicit timeout (connect and read or total) shorter than the caller's own deadline. Never rely on library defaults, which are often infinite or very long.
- Retries only for idempotent operations or with an idempotency key, with capped exponential backoff and jitter, and a total retry budget within the caller's deadline.
- Do independent remote calls concurrently, not one after another, and bound the concurrency.

**Memory and work**
- Keep allocations bounded by input size you control: no loading whole files, responses or result sets into memory when streaming works; no unbounded in-process caches (set a size and an eviction policy).
- Do not repeat work per item that can be done once: compile regexes, build lookup maps and parse configuration outside the loop.
- Avoid accidental quadratic behaviour: lookups in lists inside loops, string concatenation in loops, repeated sorting.
- Keep blocking work (file I/O, CPU-heavy computation, synchronous calls) off event loops and UI threads.

**Measuring**
- Do not make a change "for performance" without evidence that the code is on a hot path: a profile, a trace, a benchmark or a query plan.
- Measure before and after with the same method and input size, and report the numbers with the number of runs. If you could not measure, say plainly that the gain is unmeasured.
- Prefer the simpler, readable version unless a measurement shows the faster version matters for the stated target.
- When you add a cache, state how it is invalidated and what staleness is acceptable.

**Reviewing**
- When you see a violation of these rules in code you are touching, fix it if it is in scope; otherwise name it in one line with the file and line, without rewriting unrelated code.

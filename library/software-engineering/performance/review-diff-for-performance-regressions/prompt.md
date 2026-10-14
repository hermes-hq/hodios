---
schema: 1
id: review-diff-for-performance-regressions
kind: prompt
title: Review a diff for performance regressions
description: Reviews a diff for changes that will make production slower, such as N+1 queries, unbounded loads, sync I/O on hot paths, missing indexes and quadratic loops, sized by real data volumes.
category: performance
version: 1.0.0
status: incubating
stage: [review]
role: [backend-engineer, software-engineer, fullstack-engineer]
stack: []
requires: [repo-read]
inputs: [diff, file]
output: [report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [n-plus-one, query-count, hot-path, big-o, pull-request]
pairs_with:
  personas: [performance-engineer]
  prompts: [review-pull-request, fix-n-plus-one-queries, investigate-performance-regression]
  rules: [hot-path-performance-rules]
args:
  - name: diff
    description: The diff with file paths. Include the call sites of changed functions and any schema or migration files the change touches.
    type: text
    required: true
  - name: scale
    description: Real volumes the code will meet - rows in the touched tables, items per request, requests per second, payload sizes - and any latency budget. Without this the review states its assumptions.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Findings, Assumptions about scale, Measurements to run]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Performance regressions get merged because they are invisible at test-data scale: a loop that issues one query per item runs in 5 ms against 3 fixture rows and in 8 seconds against a customer with 4,000. A useful performance review therefore multiplies: how many times does this line run per request, against how much data, in production. The patterns that matter in review are few: queries or remote calls inside loops (including ones hidden behind ORM lazy loading, serializers and template helpers), loads with no `LIMIT` or pagination on tables that grow, filters and sorts on columns without an index, `.contains` or `indexOf` on lists inside loops (quadratic), blocking file, network or crypto work on an event loop or UI thread, work moved from a background job into the request path, caches removed or keyed so they never hit, new per-request allocations of large objects, and logging or serialization of whole payloads on hot paths. Equally important is what not to flag: micro-optimisations on code that runs once per request against small bounded inputs are noise, and reviewers lose credibility by raising them.
</context>

<task>
<diff>
{{diff}}
</diff>

{{#scale}}
<scale>
{{scale}}
</scale>
{{/scale}}

1. If you can read the repository, open each changed function in full, find its callers to learn how often it runs (per request, per item, per batch, once at startup), and read the schema and existing indexes for any table it queries. If you only have the diff, say which conclusions depend on code you could not see.
2. For each changed code path, write down its frequency and the size of the data it touches, from `scale` or from stated assumptions. Skip paths that run rarely on small bounded data.
3. Look for: database queries or remote calls inside loops, including lazy-loaded relations and per-item serializers; queries without a limit on growing tables; new `WHERE`, `JOIN` or `ORDER BY` columns with no supporting index (check the migrations in the diff); `SELECT *` or full objects loaded to read one field; nested loops or repeated linear searches over collections that grow; sorting or regex compilation inside loops.
4. Look for blocking and placement problems: synchronous I/O, sleeps or CPU-heavy work on an event loop, UI thread or request path; work moved from a queue into the request; sequential independent remote calls that could run concurrently; missing timeouts on new remote calls.
5. Look for memory and payload growth: whole files or result sets loaded into memory, unbounded in-process caches or maps, responses that now include large nested data, and logging of full payloads.
6. Look for cache changes: removed caching, keys that include a timestamp or request id so they never hit, and invalidation that now clears everything.
7. For each finding, estimate the cost with arithmetic ("1 query per line item; orders have up to 500 items, so up to 501 queries per request instead of 2") and propose the fix (eager loading or batching, an index, pagination, a set or map lookup, moving work to a job). Say how confident you are.
8. List the measurements that would confirm or clear each finding before merge: a query-count assertion, `EXPLAIN` on a production-sized dataset, a benchmark, or a profile.
</task>

<constraints>
- Every finding needs a frequency and a data size, stated or assumed; drop any finding whose cost you cannot estimate.
- Do not flag micro-optimisations on cold or bounded code, or ask for caching or concurrency where the arithmetic does not justify it.
- Do not claim measured numbers; estimates are labelled as estimates.
- At most 8 findings, largest estimated cost first.
- Stay read-only: do not edit files, push, or run commands that change state. Read-only checks such as running tests or `EXPLAIN` on a non-production database are fine; never run load against production.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: approve | approve-with-nits | request-changes, and the biggest expected slowdown in one sentence.
## Findings
Numbered. Each: severity (high, medium, low), `path:line`, the pattern, frequency times data size with the estimated cost, the fix, confidence.
## Assumptions about scale
Bullets: each volume you assumed and where it came from.
## Measurements to run
Checklist of the specific query-count tests, `EXPLAIN` runs or benchmarks that would confirm or clear each finding.
</output_format>

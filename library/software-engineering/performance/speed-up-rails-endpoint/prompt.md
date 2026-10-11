---
schema: 1
id: speed-up-rails-endpoint
kind: prompt
title: Speed up a slow Rails endpoint
description: Speeds up a slow Rails controller action or page with measured fixes from includes and preload, counter caches, pluck, select, batched writes and fragment caching, guarded by a query-count test.
category: performance
version: 1.0.0
status: incubating
stage: [maintain, build]
role: [backend-engineer, fullstack-engineer, software-engineer]
stack: [rails]
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
tags: [activerecord, rack-mini-profiler, counter-cache, fragment-caching, eager-loading]
pairs_with:
  prompts: [fix-n-plus-one-queries, optimize-sql-query, plan-caching-strategy]
  personas: [performance-engineer]
args:
  - name: target
    description: The slow controller action, route or page and its response time.
    type: text
    required: true
  - name: evidence
    description: Rails log lines for the request, rack-mini-profiler, Bullet or APM output, if available.
    type: text
output_contract:
  format: markdown
  sections: [Result, Where the time goes, Changes, Regression guard, Further options]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The Rails log already splits each request into ActiveRecord time, view rendering time and the rest, which tells you where to look. ActiveRecord costs hide in views and serializers: association calls per row (fix with includes, preload or eager_load; preload for collections to avoid row multiplication), .count on an association inside a loop (counter_cache or a grouped count), .map(&:id) instead of pluck, loading full records where select or pluck would do, and Ruby-side filtering of what a where clause should do. View rendering costs come from many small partials per row (collection rendering with cached: true helps) and heavy helpers. Writes in loops need insert_all, upsert_all or update_all where callbacks and validations are not needed, which must be checked first. Fragment and Russian-doll caching depends on touch: true for correct invalidation.
</context>

<task>
Speed up: {{target}}
{{#evidence}}
Evidence:
{{evidence}}
{{/evidence}}

1. Reproduce with realistic data and read the request log: total time, ActiveRecord time, Views time, and the SQL lines. Use rack-mini-profiler or Bullet in development if available; otherwise count queries with ActiveSupport::Notifications.
2. Decide where the time goes: queries, rendering, Ruby code or external calls. Profile Ruby code (stackprof or the profiler in use) if the database is not dominant.
3. Fix queries: includes or preload for associations used per row, counter_cache or a single grouped count for per-row counts (with a backfill for existing rows), pluck and select for narrow reads, exists? instead of present? on relations, and database filtering instead of Ruby filtering.
4. Check indexes for the remaining slow SQL with EXPLAIN; add a migration only where the plan shows a scan on a large table.
5. Fix rendering: collection rendering, removing per-row queries from partials, and fragment caching with correct cache keys and touch on parent associations, where staleness is acceptable.
6. Re-measure with the same data and add a request or integration test that asserts the query count stays bounded with several records. Run the test suite.
</task>

<constraints>
- Do not bypass callbacks or validations with update_all, insert_all or upsert_all without confirming they are not needed.
- Keep the response, ordering and authorization identical.
- Report measured times and query counts, before and after, with the record count.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Result
Time and query count before and after, for N records.
## Where the time goes
ActiveRecord, views and other, with offenders at `path:line`.
## Changes
The diff with one sentence per change.
## Regression guard
The test added and its result.
## Further options
Bigger changes not made, or "None".
</output_format>

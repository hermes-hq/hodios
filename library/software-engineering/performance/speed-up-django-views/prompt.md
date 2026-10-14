---
schema: 1
id: speed-up-django-views
kind: prompt
title: Speed up a slow Django view
description: Speeds up a slow Django or DRF view by measuring queries and time, then applying select_related, prefetch_related, only, annotations, bulk operations and targeted caching, with a query-count test.
category: performance
version: 1.0.0
status: incubating
stage: [maintain, build]
role: [backend-engineer, fullstack-engineer, software-engineer]
stack: [django]
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
tags: [django-orm, queryset, drf, assert-num-queries, debug-toolbar]
pairs_with:
  prompts: [fix-n-plus-one-queries, optimize-sql-query, plan-caching-strategy]
  personas: [performance-engineer]
args:
  - name: target
    description: The slow view, URL or DRF endpoint, and how slow it is.
    type: text
    required: true
  - name: evidence
    description: Debug Toolbar, Silk or APM output, query logs, or profiler output, if you have them.
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
A slow Django view is usually spending its time in the ORM, and the ORM hides the cost. QuerySets are lazy, so templates and DRF serializers trigger queries late, often one per row through foreign keys (select_related fixes those with a join) and reverse or many-to-many relations (prefetch_related, with Prefetch objects to filter or order the related set). Other common costs: counting with len(qs) instead of .count() or an annotation, Python loops that sum or filter what the database could aggregate, loading wide rows when only() or values() would do, .exists() missing where only presence matters, saving in a loop instead of bulk_create or bulk_update, and DRF SerializerMethodFields that query per object. Pagination with large OFFSETs is slow on big tables. Caching comes after the queries are right, never instead.
</context>

<task>
Speed up: {{target}}
{{#evidence}}
Evidence:
{{evidence}}
{{/evidence}}

1. Reproduce with realistic data volume (fixtures or a factory for at least a few hundred rows) and measure: number of queries, total query time, and total response time. Use Debug Toolbar, Silk, connection.queries under DEBUG, or django.test.utils.CaptureQueriesContext.
2. Split the time: database, Python (serialization, template rendering, loops) and external calls. Profile the Python side if the database is not the main cost.
3. Fix queries in order of cost: select_related and prefetch_related (with Prefetch for filtered sets) on the queryset used by the view or serializer's get_queryset; annotate counts and aggregates; only()/defer() or values() for wide models; exists() and count(); bulk_create, bulk_update or update() for writes.
4. Check the indexes behind the remaining queries: run EXPLAIN on the slowest SQL and add a migration with an index only if the plan shows a scan on a large table.
5. Consider caching only for remaining expensive work that tolerates staleness (cached_property, low-level cache with explicit keys and invalidation, or per-view cache for anonymous pages), and say what staleness it introduces.
6. Re-measure with the same data, then add a test with assertNumQueries (or a query-count fixture) for this view with several rows. Run the test suite.
</task>

<constraints>
- Keep the response body, ordering and permissions identical.
- Report real measured numbers, before and after, with the row count used.
- Do not cache per-user or permission-dependent responses under shared keys.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Result
Queries and response time before and after, for N rows.
## Where the time goes
Database, Python and external split, with the main offenders and `path:line`.
## Changes
The diff with one sentence per change.
## Regression guard
The query-count test and its result.
## Further options
Bigger changes not made (denormalisation, caching, async work), or "None".
</output_format>

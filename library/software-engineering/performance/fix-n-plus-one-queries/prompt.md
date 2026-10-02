---
schema: 1
id: fix-n-plus-one-queries
kind: prompt
title: Fix N+1 queries
description: Finds N+1 database queries behind an endpoint, page or job by counting real queries, fixes them with eager loading or batching, and adds a query-count test so they do not return.
category: performance
version: 1.0.0
status: experimental
stage: [maintain, review]
role: [backend-engineer, fullstack-engineer, software-engineer]
stack: []
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
tags: [n-plus-one, orm, eager-loading, query-count]
args:
  - name: target
    description: The endpoint, page, resolver, job or file where you suspect N+1 queries.
    type: text
    required: true
  - name: query_log
    description: A query log or APM trace from a slow request, if you have one.
    type: text
output_contract:
  format: markdown
  sections: [Result, Cause, Fix, Regression guard, Other N+1 patterns spotted]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An N+1 query happens when code loads a list with one query and then runs one more query per item, usually through lazy-loaded relations inside a loop or a serializer. It looks fine with test data and collapses with real data. The fix must be proven by counting queries, not by reading the code.
</context>

<task>
Find and fix N+1 queries in: {{target}}
{{#query_log}}
Start from this log or trace:
{{query_log}}
{{/query_log}}

1. Identify the ORM or data layer and how to observe queries: enable query logging or use the framework's query counter or debug tooling.
2. Run the target with enough data to show the pattern (at least 3 items; create fixtures if needed) and count the queries. Record the count and, if available, the time.
3. Trace each repeated query to the code that triggers it: the loop, template, serializer or resolver and the relation it touches, with `path:line`.
4. Fix it with the idiomatic tool for this stack: eager loading (for example select_related or prefetch_related, includes or preload, with, JOIN FETCH or an entity graph, selectinload or joinedload, include), a batched loader such as DataLoader for GraphQL, or one aggregate query where only counts or sums are needed.
5. Choose between a join and a separate batched query deliberately: joining several collections at once multiplies rows, so prefer separate IN-list queries for collections.
6. Re-run and count again. Then add a test that asserts the query count for the target with several items, so the N+1 cannot come back unnoticed.
</task>

<constraints>
- Load only the relations the code actually uses; do not over-fetch whole object graphs.
- Keep the response shape and ordering identical.
- Do not add caching as the fix for an N+1.
- Report real query counts from runs, not from reading the code.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Result
One line: queries before and after for N items, and time if measured.
## Cause
Each N+1: `path:line` — the loop or serializer — the relation loaded per item.
## Fix
The diff, then one sentence per change on why it removes the extra queries.
## Regression guard
The test added and its result.
## Other N+1 patterns spotted
Bullets with `path:line`, not fixed. Or "None".
</output_format>

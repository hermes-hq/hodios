---
schema: 1
id: tune-jpa-hibernate-performance
kind: prompt
title: Fix slow JPA and Hibernate data access
description: Fixes slow JPA or Hibernate data access using SQL logs and statistics, with fetch joins or entity graphs, batch fetching, DTO projections, JDBC batching and read-only queries.
category: performance
version: 1.0.0
status: incubating
stage: [maintain, build]
role: [backend-engineer, software-engineer]
stack: [java]
requires: [repo-read, file-write, shell]
inputs: [repo, logs, config, text]
output: [diff, tests, report]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
tags: [hibernate, jpa, fetch-strategy, entity-graph, jdbc-batching, dto-projection]
pairs_with:
  prompts: [fix-n-plus-one-queries, fix-jpa-lazy-loading-error, optimize-sql-query]
  personas: [performance-engineer]
args:
  - name: target
    description: The slow service method, repository call, endpoint or batch job, with timings.
    type: text
    required: true
  - name: evidence
    description: SQL logs, Hibernate statistics, APM traces or the entity mappings involved.
    type: text
output_contract:
  format: markdown
  sections: [Result, Diagnosis, Changes, Regression guard, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Hibernate performance problems come from a few mechanics. ManyToOne and OneToOne are EAGER by default in JPA, so loading a list pulls extra queries the code never asked for; the safe default is LAZY everywhere and fetching explicitly per use case with JOIN FETCH or an entity graph. Fetch-joining two collections in one query multiplies rows (and with bags throws MultipleBagFetchException), so use batch fetching (@BatchSize or default_batch_fetch_size) or separate queries for the second collection. Pagination with a collection fetch join is done in memory (Hibernate warns about it). Loading managed entities only to read them costs dirty checking and memory: DTO projections or read-only queries avoid it. Inserts with IDENTITY ids cannot be JDBC-batched; sequence ids with an allocation size and hibernate.jdbc.batch_size can, with periodic flush and clear in long loops. Open Session in View hides lazy loading in the web layer. The second-level cache helps only for read-mostly reference data.
</context>

<task>
Speed up: {{target}}
{{#evidence}}
Evidence:
{{evidence}}
{{/evidence}}

1. Read the entities, repositories and the service method. Turn on SQL logging with bind parameters and Hibernate statistics (or a datasource proxy) in a test or local profile, and count statements and time for a realistic data size.
2. Diagnose each extra statement: eager associations, lazy loads in loops or serializers, collection fetch joins with pagination, entity loading where a projection would do, unbatched inserts or updates, or flushes caused by queries inside a write loop.
3. Fix per use case: LAZY mappings plus JOIN FETCH or @EntityGraph on the specific repository method, batch fetching for secondary collections, DTO or interface projections for read paths, @Transactional(readOnly = true) or read-only query hints, and a two-step query (ids page, then fetch) for paginated collection fetches.
4. For write-heavy jobs: enable JDBC batching with ordered inserts and updates, use sequence-based ids where IDENTITY blocks batching (note this is a schema change), and flush and clear the persistence context every batch.
5. Consider the second-level or query cache only for read-mostly reference data, with its invalidation rules.
6. Re-measure statement count and time, and add a test that asserts the statement count (Hibernate statistics or a query-count assertion library). Run the test suite.
</task>

<constraints>
- Changing a mapping from EAGER to LAZY can cause LazyInitializationException elsewhere: search for every use of the association and fix or list them.
- Do not enable Open Session in View or broad eager fetching to make errors go away.
- Report measured statement counts and times, before and after.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Result
Statements and time before and after, with the data size.
## Diagnosis
Each extra-statement source with `path:line`.
## Changes
The diff with one sentence per change.
## Regression guard
The test asserting statement count, and its result.
## Risks
Mapping changes and the other code paths they affect.
</output_format>

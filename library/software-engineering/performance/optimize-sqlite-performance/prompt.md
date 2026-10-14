---
schema: 1
id: optimize-sqlite-performance
kind: prompt
title: Speed up SQLite in an app
description: Speeds up slow SQLite reads and writes in a mobile, desktop or CLI app by batching writes in transactions, adding indexes from EXPLAIN QUERY PLAN and moving queries off the UI thread.
category: performance
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [mobile-engineer, software-engineer, backend-engineer]
stack: [sqlite]
requires: [repo-read, file-write, shell]
inputs: [repo, schema, text]
output: [diff, report]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [explain-query-plan, transactions, wal-mode, prepared-statements, local-database]
pairs_with:
  prompts: [configure-sqlite-for-production, design-on-device-database, optimize-sql-query]
  personas: [performance-engineer]
args:
  - name: problem
    description: What is slow (startup, a screen, a sync, inserts, a search) with timings and data size.
    type: text
    required: true
  - name: context
    description: Platform and SQLite wrapper or ORM (Room, Core Data, GRDB, sqflite, better-sqlite3, rusqlite, Python sqlite3), and the slow code or queries.
    type: text
output_contract:
  format: markdown
  sections: [Result, Cause, Changes, Measurements, Not changed]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
SQLite is fast; slow SQLite in apps almost always comes from how it is used. The biggest win is usually transactions: without an explicit transaction every INSERT or UPDATE is its own transaction with a sync to disk, so 10,000 inserts can take tens of seconds instead of well under one. Next come missing indexes (EXPLAIN QUERY PLAN shows "SCAN table" instead of "SEARCH ... USING INDEX"), LIKE '%term%' searches that need full-text search (FTS5) instead, and re-preparing the same statement in a loop. WAL journal mode lets readers run while one writer writes, which fixes "database is locked" stalls between a UI and background sync. On mobile and desktop, any query on the main thread causes dropped frames, whatever its speed on a fast device. Pragma changes such as synchronous=NORMAL trade durability for speed and must be a deliberate choice.
</context>

<task>
Problem: {{problem}}
{{#context}}
Context:
{{context}}
{{/context}}

1. Read the data access code and find the slow path. Measure it first: time the operation on a realistic data size, and log the SQL the wrapper or ORM actually runs.
2. Check writes: are bulk inserts or updates wrapped in one transaction (in batches for very large loads)? Are statements prepared once and reused?
3. Check reads: run EXPLAIN QUERY PLAN on each slow query, add the index it needs (composite where filters and ORDER BY combine), and replace substring LIKE searches with FTS5 if the search must be fast.
4. Check the threading model: no queries on the UI thread; one writer connection or a serialised write queue; WAL mode if readers and a writer overlap.
5. Check the schema and query shape for avoidable work: SELECT * of large blob columns, loading whole tables to count or filter in app code, N+1 lookups in a loop.
6. Make the smallest change for the biggest gain, re-measure with the same data, and run the tests.
7. Mention ANALYZE (or PRAGMA optimize) and VACUUM only where relevant, and the durability trade-off of any pragma change.
</task>

<constraints>
- Report measured timings before and after, with the data size; do not estimate a speed-up you did not measure.
- Do not change journal mode, synchronous or other durability pragmas without stating the risk and asking the user.
- Add a schema migration for index changes in the app's migration system; do not edit an existing user's database by hand.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Result
One line: operation, before and after time, data size.
## Cause
Each cause with `path:line` and evidence (query plan line or timing).
## Changes
The diff with one sentence per change.
## Measurements
How it was measured and the numbers.
## Not changed
Ideas left out and why, or "None".
</output_format>

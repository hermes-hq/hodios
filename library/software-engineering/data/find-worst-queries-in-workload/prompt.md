---
schema: 1
id: find-worst-queries-in-workload
kind: prompt
title: Find the worst queries in a database workload
description: Ranks the queries costing the most from pg_stat_statements, Performance Schema or a slow query log by total time, calls and I/O, and picks the few worth fixing first.
category: data
version: 1.0.0
status: incubating
stage: [operate, discover]
role: [dba, backend-engineer, sre]
stack: [postgres, mysql]
requires: [none]
inputs: [logs, text, file]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [pg-stat-statements, slow-query-log, query-triage, database-load, performance-schema]
pairs_with:
  prompts: [optimize-sql-query, review-database-indexes, fix-n-plus-one-queries]
  personas: [database-administrator]
args:
  - name: stats
    description: The output of a top-queries report (pg_stat_statements rows with calls, total and mean time, rows, shared blocks; or a MySQL slow log digest or Performance Schema digest summary). If you have none yet, say so and the answer will give the queries to collect it.
    type: text
    required: true
  - name: context
    description: Engine and version, instance size, the symptom (high CPU, slow pages, I/O wait), and the time window the stats cover.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Workload summary, Ranked queries, Top picks, Next steps per pick, Data gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Teams usually tune the query someone complained about, while the database's load comes from somewhere else. The useful ranking is total time (calls times mean), because a 3 ms query run two million times an hour costs more than a 20 s report run once. Experts read several columns together: high calls with tiny mean points at N+1 patterns or missing caching in the app; high mean with few calls points at a plan or index problem; high rows per call points at over-fetching; high shared block reads (or rows examined in MySQL) relative to rows returned points at scans. Stats are cumulative since the last reset, so the window matters, and pg_stat_statements normalises literals, so one entry can hide very different parameter values. Write-heavy statements also cost locks and WAL, which time alone may understate.
</context>

<task>
<stats>
{{stats}}
</stats>
Context: {{context}}

1. If no usable stats are given, give the exact queries to collect them for this engine (pg_stat_statements ordered by total time with blocks and rows; MySQL Performance Schema digest summary or pt-query-digest style summary of the slow log), the settings needed to enable them, and how long a window to collect. Stop there.
2. Summarise the workload: total time covered, share taken by the top 5 and top 20 statements, read versus write split.
3. Rank the top statements by total time and annotate each: calls, mean, rows per call, I/O per row, and the pattern it suggests (N+1, scan, over-fetch, lock-heavy write, chatty housekeeping).
4. Pick the three to five worth fixing first, weighing total cost, ease of fix and user impact, and say why lower-ranked ones can wait.
5. For each pick, the next step: get the plan with parameters that are actually slow, check indexes, find the calling code by the normalised text, or fix at the app level (batching, caching).
6. List what the data cannot tell you (window, reset time, missing columns, parameter skew).
</task>

<constraints>
- Rank only from the numbers given; do not invent statements or timings.
- Do not propose index changes without the plan; propose what to check.
- Keep units explicit (ms, seconds, per hour).
- Any collection queries must be read-only.
{{> output/uncertainty}}
</constraints>

<output_format>
## Workload summary
Three to five lines with percentages.

## Ranked queries
Table: rank | statement (shortened) | calls | mean | total | share | pattern.

## Top picks
Numbered, with the reason for each.

## Next steps per pick
Bullets per pick.

## Data gaps
Bullets.
</output_format>

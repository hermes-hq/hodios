---
schema: 1
id: speed-up-ef-core-queries
kind: prompt
title: Speed up EF Core queries
description: Speeds up Entity Framework Core data access from logged SQL, using AsNoTracking, Select projections, split queries, server-side filtering, bulk updates and compiled queries, with measurements.
category: performance
version: 1.0.0
status: incubating
stage: [maintain, build]
role: [backend-engineer, software-engineer]
stack: [dotnet]
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
tags: [ef-core, linq, as-no-tracking, split-query, projection]
pairs_with:
  prompts: [fix-n-plus-one-queries, review-ef-core-data-access-change, optimize-sql-query]
  personas: [performance-engineer]
args:
  - name: target
    description: The slow endpoint, service method or LINQ query, with timings.
    type: text
    required: true
  - name: evidence
    description: Logged SQL, MiniProfiler or APM output, or the query plan, if available.
    type: text
output_contract:
  format: markdown
  sections: [Result, Diagnosis, Changes, Verification, Further options]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
EF Core is only as fast as the SQL it generates, so the first step is to log that SQL (LogTo or the logging category for database commands) and look at it. Common costs: tracking queries for read-only data (AsNoTracking skips change tracking and identity resolution), loading whole entities with Include when the endpoint needs five columns (a Select projection generates narrow SQL and needs no Include), Include of several collections creating a cartesian explosion (AsSplitQuery, with its consistency trade-off), client evaluation or materialising with ToList() before Where, Skip/Take paging without a stable order, lazy-loading proxies triggering per-row queries, and SaveChanges inside a loop. Since EF Core 7, ExecuteUpdate and ExecuteDelete run set-based statements without loading entities, bypassing the change tracker and interceptors. Compiled queries and DbContext pooling help only on very hot paths after the SQL is right.
</context>

<task>
Speed up: {{target}}
{{#evidence}}
Evidence:
{{evidence}}
{{/evidence}}

1. Read the query code and the entity configuration. Enable SQL logging in a local or test run and record the SQL, the number of commands and the time for realistic data.
2. Diagnose: tracking on reads, over-fetching, cartesian explosion, queries per row (lazy loading or loops), filtering or sorting in memory after materialisation, missing indexes on the generated SQL, or SaveChanges in a loop.
3. Fix in order: Select projections to DTOs for read endpoints; AsNoTracking where entities are not modified; AsSplitQuery for multiple collection includes; move Where, OrderBy and paging before materialisation; ExecuteUpdate or ExecuteDelete or batched SaveChanges for bulk writes; disable lazy loading on this path.
4. Check the generated SQL's plan for the slowest statement and add an index via a migration only where the plan shows a scan on a large table.
5. Only then consider compiled queries or DbContext pooling, and say how much they saved in a measurement.
6. Re-measure with the same data and run the tests. Add a test or benchmark that pins the number of commands if the project has a pattern for it.
</task>

<constraints>
- ExecuteUpdate and ExecuteDelete skip the change tracker, SaveChanges interceptors and concurrency tokens: check for these before using them and tell the user.
- Keep results, ordering and tenant or security filters (global query filters) identical.
- Report measured numbers, not expectations.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Result
Commands and time before and after, with the data size.
## Diagnosis
Each cause with the generated SQL excerpt and `path:line`.
## Changes
The diff with one sentence per change.
## Verification
What was run and the results.
## Further options
Bigger changes not made, or "None".
</output_format>

---
schema: 1
id: speed-up-graphql-api
kind: prompt
title: Speed up a slow GraphQL API
description: Speeds up a slow GraphQL API by tracing resolvers, batching data access with DataLoader, limiting query depth and cost, and caching safely, with per-operation numbers before and after.
category: performance
version: 1.0.0
status: incubating
stage: [maintain, build]
role: [backend-engineer, fullstack-engineer]
stack: [graphql]
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
tags: [dataloader, resolver-tracing, query-cost, persisted-queries, batching]
pairs_with:
  prompts: [fix-n-plus-one-queries, review-graphql-resolver-change, plan-caching-strategy]
  personas: [performance-engineer]
args:
  - name: target
    description: The slow operations (query names and example queries), server library (Apollo Server, GraphQL Yoga, graphql-java, Strawberry, Hot Chocolate, gqlgen) and timings.
    type: text
    required: true
  - name: evidence
    description: Resolver traces, APM spans or database query logs for a slow operation.
    type: text
output_contract:
  format: markdown
  sections: [Result, Where the time goes, Changes, Protection limits, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
GraphQL resolvers run per field per object, so a list of 100 posts with an author field calls the author resolver 100 times; without batching that is 100 database or service calls. DataLoader (or the library's equivalent) collects keys within one tick and makes one batched call, and must be created per request so its cache does not leak data between users. Other costs: resolvers that fetch whole objects for one field, deeply nested or very wide queries from clients (a single query can request thousands of objects), sequential resolver chains that could run in parallel, and expensive computed fields. Protection needs depth and cost limits, pagination arguments with maximums, and for public APIs persisted or allow-listed queries. HTTP caching is harder than in REST because most queries are POSTs; caching happens per field or per response with care for authorization, or at the data layer. Resolver-level tracing (Apollo tracing, OpenTelemetry instrumentation) shows which fields cost time.
</context>

<task>
Target: {{target}}
{{#evidence}}
Evidence:
{{evidence}}
{{/evidence}}

1. Reproduce a slow operation with realistic data and enable resolver-level tracing and query logging. Record total time, the number of data-source calls and the slowest fields.
2. Find repeated per-item calls and add batching: a DataLoader per entity and key, created per request in the context, with results returned in key order and missing keys handled.
3. Fix over-fetching in resolvers (select only needed columns, or use the selection set where the library supports it) and run independent resolvers concurrently where the library does not already.
4. Add protection: maximum depth, a cost or complexity limit, required pagination arguments with maximum page size, and timeouts on downstream calls. For public APIs, propose persisted queries.
5. Add caching only where safe: per-request DataLoader caching first, then data-layer caching with explicit keys, and response or field caching marked private for user-specific data.
6. Re-measure the same operation, add a test that bounds the number of data-source calls for a list query, and run the test suite.
</task>

<constraints>
- DataLoader instances must be per request; never share one across users.
- Keep the schema and results unchanged unless the user agrees; protection limits that reject existing client queries need the user's sign-off.
- Report measured numbers per operation.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Result
Per operation: time and data-source calls before and after.
## Where the time goes
Slow fields and repeated calls with `path:line`.
## Changes
The diff with one sentence per change.
## Protection limits
Limits added and their values, and which existing queries they would affect.
## Verification
Tests and measurements.
</output_format>

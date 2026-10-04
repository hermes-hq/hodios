---
schema: 1
id: switch-orm-or-query-layer
kind: prompt
title: Switch ORM or query layer
description: Plans replacing an ORM or query builder incrementally, with a query inventory, transaction, lazy loading and null differences, a compatibility layer, per-query tests and performance checks.
category: migration
version: 1.0.0
status: incubating
stage: [plan, build]
role: [backend-engineer, tech-lead]
stack: []
requires: [none]
inputs: [text, file]
output: [plan, table, code]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [orm, query-builder, repository-pattern, n-plus-one, transactions, strangler-fig]
pairs_with:
  prompts: [plan-incremental-migration, migrate-database-engine]
  personas: [migration-engineer, database-administrator]
args:
  - name: current_layer
    description: What the code uses now and its version (for example "ActiveRecord 6", "TypeORM 0.3", "hand-written SQL with psycopg", "Hibernate 5").
    type: string
    required: true
  - name: target_layer
    description: What you want to move to (for example "Drizzle", "SQLAlchemy 2 core", "jOOQ", "Prisma").
    type: string
    required: true
  - name: code_sample
    description: Optional. Representative models, repositories and a few real queries, including the most complex one and a transaction, plus the database engine and rough number of query sites.
    type: text
output_contract:
  format: markdown
  sections: [Why and whether, Query inventory, Behaviour differences, Compatibility layer, Migration order, Test and performance checks, Risks and open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A backend team wants to move from {{current_layer}} to {{target_layer}}. Data access layers look interchangeable and are not. The bugs in these migrations come from semantics, not syntax: implicit transactions and autocommit, lazy loading that silently becomes N+1 queries or throws outside a session, identity maps and caching, how nulls, empty strings and defaults are written, timestamp and time zone handling, decimal precision, enum mapping, optimistic locking columns, callbacks and hooks that ran on save, and soft-delete scopes applied by default. A big-bang swap stalls; the reliable path routes one query or aggregate at a time through a seam, with tests that compare old and new results.
</context>

<task>
{{#code_sample}}
<code_sample>
{{code_sample}}
</code_sample>
{{/code_sample}}

1. Why and whether: state what the move buys (type safety, performance, maintenance status, fewer abstractions) and what it costs. If the main problem is a few slow queries, say that targeted rewrites may beat a migration.
2. Query inventory: how to find every query site (grep patterns for the current layer's API, model callbacks, raw SQL strings, migrations and seed scripts, background jobs and reports), and classify each as simple CRUD, relation loading, aggregate or report, write with side effects, or raw SQL. Mark hot paths using production query statistics if available.
3. Behaviour differences: a table of semantics to check between the two layers for this codebase, covering transactions and isolation, connection and session lifecycle, lazy versus eager loading, hooks and callbacks, soft deletes and default scopes, null and default handling, type mapping (dates, decimals, JSON, enums, UUIDs), batching and upserts, and how errors and unique violations surface. Say which ones need a decision and which a test.
4. Compatibility layer: a repository or data-access interface per aggregate that both implementations satisfy, both sharing one connection pool and able to join the same transaction where possible. Schema migrations stay with one tool during the move; say which.
5. Migration order: read-only and leaf queries first, then writes without hooks, then writes with side effects, then reports; transactions that span several aggregates move together. Each step is a small merge request behind the interface.
6. Checks per query: a contract test that runs the same inputs through both implementations against a real database (not mocks) and compares results; logged generated SQL; query count per request to catch N+1; and latency on production-sized data for hot paths. Optionally a shadow-read period comparing results in production.
7. Exit: delete the old layer, its dependency and its generated code, and remove the interface if it no longer earns its place.
</task>

<constraints>
- Do not claim specific behaviour of either library as fact if you are not sure; mark it "verify in the docs or with a test".
- Keep the database schema unchanged during the switch unless the user asks; schema changes are a separate step.
- If the code sample is missing, give the general plan and list exactly what to send for a specific one; do not invent models or queries.
{{> guardrails/scope-discipline}}
{{> output/uncertainty}}
</constraints>

<output_format>
## Why and whether
Three to five lines with a recommendation.

## Query inventory
Search patterns to run, and a table: category | examples from the sample | count if known | risk.

## Behaviour differences
Table: area | current behaviour | target behaviour | action (decide, test, adapt).

## Compatibility layer
Interface sketch in the project's language and how both implementations share connections and transactions.

## Migration order
Numbered phases with exit criteria.

## Test and performance checks
Contract test sketch and the checks per query.

## Risks and open questions
Bullets.
</output_format>

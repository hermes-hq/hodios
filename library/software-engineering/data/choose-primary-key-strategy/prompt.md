---
schema: 1
id: choose-primary-key-strategy
kind: prompt
title: Choose a primary key strategy
description: Chooses between bigint identity, UUIDv4, UUIDv7, ULID, natural and composite keys per table, weighing index locality, size, exposure in URLs, client-side generation and migration cost.
category: data
version: 1.0.0
status: incubating
stage: [design]
role: [backend-engineer, architect, dba]
stack: []
requires: [none]
inputs: [schema, text]
output: [report, code]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [primary-keys, uuidv7, ulid, identity-columns, surrogate-keys, public-ids]
pairs_with:
  prompts: [design-database-schema, plan-zero-downtime-schema-change]
args:
  - name: context
    description: The tables or entities, expected row counts and insert rates, whether ids appear in URLs or APIs, whether clients or several services create records offline or independently, and the database engine.
    type: text
    required: true
  - name: current
    description: Optional. The current key type if this is a change to an existing system, and why it is being reconsidered.
    type: text
output_contract:
  format: markdown
  sections: [Recommendation, Per-table choices, Trade-offs, DDL, Migration notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Key choice is hard to change later and the trade-offs are concrete. Sequential `bigint` identity keys are small (8 bytes), fast to index because inserts go to the right edge of the B-tree, and easy to read, but they leak volume and allow enumeration when shown in URLs, and need coordination to generate outside the database. Random UUIDv4 keys (16 bytes) can be generated anywhere but scatter inserts across the index, which costs cache and write amplification on large tables, especially in clustered-index engines such as InnoDB where every secondary index also stores the primary key. Time-ordered ids (UUIDv7, ULID) keep most of the locality while being generated anywhere; they reveal creation time. PostgreSQL 18 has a native `uuidv7()` function; earlier versions and most other engines need an extension or app-side generation. Storing UUIDs as text instead of a native or binary type doubles their size. Natural keys (email, SKU) change in practice and make poor primary keys, though they deserve unique constraints. A common pattern is an internal bigint key plus a separate public id (UUIDv7 or a random token) for URLs. Composite keys suit join tables.
</context>

<task>
Context: {{context}}
{{#current}}Current: {{current}}{{/current}}

1. Identify the forces that decide this case: table sizes and insert rates, engine (clustered or heap), ids exposed publicly, offline or multi-service generation, merges of data across systems, and human use (support quoting ids).
2. Give one default recommendation for the system and the reason.
3. Give per-table choices where they differ (join tables, high-volume event tables, user-facing entities), including whether a separate public id is needed.
4. Lay out the trade-offs that apply here, with rough sizes (bytes per key, effect on secondary indexes) rather than general claims.
5. Write the DDL for the chosen types in the stated engine, including the native UUID type or binary storage, generation (database function if available for this version, or application library), and unique constraints on natural keys.
6. If changing an existing system, outline the migration: add the new column, backfill, switch references and foreign keys, and the risks; or advise against changing if the gain is small.
</task>

<constraints>
- Say which UUID version functions exist natively in the stated engine version and which need an extension or app-side generation; mark uncertain ones to verify.
- Do not recommend natural keys as primary keys for values people can change.
- Do not present security by obscurity as access control: random ids do not replace authorisation checks.
{{> output/uncertainty}}
</constraints>

<output_format>
## Recommendation
Two to four lines.

## Per-table choices
Table: table | key type | public id | reason.

## Trade-offs
Bullets specific to this case.

## DDL
SQL.

## Migration notes
Bullets, or "not needed".
</output_format>

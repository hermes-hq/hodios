---
schema: 1
id: design-temporal-history-table
kind: prompt
title: Design a temporal history table
description: Designs versioned history for prices, contracts or similar records with valid-from and valid-to rows or system-versioned tables, as-of queries, corrections and constraints against gaps.
category: data
version: 1.0.0
status: incubating
stage: [design]
role: [backend-engineer, data-engineer, dba]
stack: [sql]
requires: [none]
inputs: [schema, text]
output: [code, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [temporal-tables, slowly-changing-data, as-of-queries, effective-dating, system-versioning, bitemporal]
pairs_with:
  prompts: [implement-audit-log, design-date-and-time-storage, design-star-schema]
args:
  - name: entity
    description: The table whose history matters (DDL), what changes over time, and the questions people ask, for example "what price applied to this order on 3 March" or "what did we believe the contract terms were last month".
    type: text
    required: true
  - name: database
    description: Engine and version, and whether future-dated changes (a price that starts next month) or back-dated corrections happen.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Which kind of time, Design, DDL, Writing changes, Queries, Pitfalls]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An audit log answers "who changed what and when"; a temporal table answers "what was true at time T", which is what pricing, contracts, tax rates, org charts and insurance need. There are two kinds of time. Valid time (application time) is when a fact is true in the real world, which can be future-dated or corrected backwards. Transaction time (system time) is when the database recorded it, which only moves forward. Many systems need only valid time; regulated ones need both (bitemporal). Experts use half-open ranges `[valid_from, valid_to)` so periods meet without overlap or one-second gaps, with an open end (NULL or infinity) for the current row. Postgres can enforce no-overlap per key with an exclusion constraint on a range, and PostgreSQL 18 adds `WITHOUT OVERLAPS` primary and unique keys plus `PERIOD` foreign keys; SQL Server and MariaDB have system-versioned tables; MySQL has neither, so the write path must enforce it in a transaction. Storing history in the same table as current rows complicates every query; a separate history table or a view of current rows keeps the main paths simple. Orders and invoices should usually copy the price they used rather than rely on a history join forever.
</context>

<task>
<entity>
{{entity}}
</entity>
Database: {{database}}

1. Decide which kind of time is needed (valid, transaction or both) from the stated questions, and say why.
2. Design: same table versus current table plus history table, range columns or a range type, the open end representation, and keys (entity id plus period).
3. Write the DDL, including the constraint that prevents overlapping periods per entity (exclusion constraint where supported, otherwise the transactional write rule), indexes for as-of lookups, and system versioning where the engine has it and it fits.
4. Writing changes: SQL or code for a normal change (close the current period, open a new one in one transaction), a future-dated change, and a back-dated correction that splits or replaces periods; for bitemporal, how corrections keep the old belief.
5. Queries: current value, value as of a time, full history of one entity, and a join from orders or events to the value valid at their timestamp.
6. Pitfalls specific to this case: time zones on boundaries, inclusive versus exclusive ends, concurrent edits, and storage growth.
</task>

<constraints>
- Use half-open periods unless the user has a stated reason not to; state the convention.
- Use only features available in the stated engine and version; mark uncertain ones to verify.
- Do not confuse audit logging with temporal modelling; say which this is.
{{> output/uncertainty}}
</constraints>

<output_format>
## Which kind of time
Two to four lines.

## Design
Bullets with choices and reasons.

## DDL
SQL.

## Writing changes
SQL or code for each change type.

## Queries
SQL for each question.

## Pitfalls
Bullets.
</output_format>

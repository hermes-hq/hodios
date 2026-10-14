---
schema: 1
id: split-shared-database
kind: prompt
title: Split a database shared by several services
description: Plans separating a database shared by several services into owned stores, with a table ownership map, replacements for cross-service reads and joins, and safe cutover steps.
category: architecture
version: 1.0.0
status: incubating
stage: [plan]
role: [architect, backend-engineer, tech-lead, dba]
requires: [none]
inputs: [schema, repo, text, document]
output: [plan, table, diagram]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [data-ownership, database-per-service, shared-database, strangler-fig, microservices]
pairs_with:
  personas: [software-architect]
  prompts: [plan-monolith-extraction, find-service-boundaries, design-event-driven-system, design-cqrs-read-models]
args:
  - name: database
    description: The shared database's schema or table list, and which services read and write which tables (or the repositories to inspect).
    type: text
    required: true
  - name: goal
    description: Why the split is wanted (independent deploys, scaling, team ownership, incidents caused by one service's queries) and any deadline.
    type: text
    required: true
  - name: constraints
    description: Downtime tolerance, data volume, reporting or analytics that depend on joins, and the database and messaging tools available.
    type: text
output_contract:
  format: markdown
  sections: [Ownership map, Cross-boundary access, Target design, Migration steps, Reporting and analytics, Risks, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A database shared by several services is the most common reason "microservices" still deploy and fail together: any service can change a table another depends on, one slow query hurts everyone, and nobody owns the data's rules. Splitting it is mostly about ownership, not about moving bytes. The proven sequence is: assign every table one owning service; find every read, write, join, foreign key, trigger and report that crosses the new boundaries; replace foreign writes with calls to the owner's API; replace foreign reads with the owner's API, or with a local read-only copy kept up to date by events or change data capture when the reader needs joins or high volume; only then move tables to a separate schema with separate credentials, and later to a separate database if needed. Joins across the boundary and cross-table transactions are the hard parts and must be redesigned, not wished away. Analytics usually moves to a warehouse fed from all services.
</context>

<task>
<database>
{{database}}
</database>

<goal>
{{goal}}
</goal>

{{#constraints}}
<constraints_given>
{{constraints}}
</constraints_given>
{{/constraints}}

1. If repositories are available, find every query, ORM model and migration that touches the shared tables in each service, and say what you read. Do not run anything against the database.
2. Build the ownership map: each table's owning service with the reason (who writes it, whose rules it encodes); flag tables written by several services and tables that should be split.
3. List every cross-boundary access: foreign writes, foreign reads, cross-boundary joins, foreign keys, triggers, views, and transactions spanning tables of different owners.
4. Choose a replacement for each: owner API call, a local read model fed by events or change data capture (with acceptable staleness), moving the logic to the owner, or a saga for cross-owner transactions. State the consistency cost.
5. Describe the target design: per-service schemas or databases, credentials restricted to owned tables, and how referential integrity across services is handled (soft references, cleanup on delete events).
6. Write migration steps in a safe order, each shippable and reversible: restrict access by schema and credentials first, replace foreign writes, replace foreign reads, remove cross-boundary foreign keys and joins, then move data physically. Include how to detect remaining foreign access (database audit logs, query logs).
7. Plan reporting and analytics that depended on cross-service joins.
</task>

<constraints>
- Do not propose moving tables before foreign reads and writes are replaced.
- Do not hide the consistency cost of replacing joins and transactions with APIs or events.
- Do not run or propose destructive database commands without a backup, a verified step order and explicit approval.
{{> output/uncertainty}}
</constraints>

<output_format>
## Ownership map
Table: table, owner, writers today, readers today, notes.
## Cross-boundary access
Table: access, from service, to table, kind, replacement, consistency cost.
## Target design
Mermaid diagram plus rules.
## Migration steps
Numbered, each with verification and rollback.
## Reporting and analytics
## Risks
## Open questions
Numbered.
</output_format>

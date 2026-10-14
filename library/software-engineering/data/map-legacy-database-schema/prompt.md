---
schema: 1
id: map-legacy-database-schema
kind: prompt
title: Map an undocumented legacy database
description: Reverse-engineers an undocumented database into an entity-relationship diagram with inferred relationships, dead tables, naming quirks, business meaning guesses and open questions.
category: data
version: 1.0.0
status: incubating
stage: [discover]
role: [backend-engineer, data-engineer, dba, architect]
stack: [sql]
requires: [repo-read]
inputs: [schema, repo, text]
output: [diagram, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [reverse-engineering, entity-relationship-diagram, legacy-databases, implicit-relationships, schema-discovery]
pairs_with:
  prompts: [write-data-dictionary, add-foreign-keys-to-legacy-schema]
  personas: [legacy-code-steward]
  workflows: [legacy-codebase-takeover-track]
args:
  - name: schema_dump
    description: The schema-only dump or the catalog output (tables, columns, types, keys, indexes, views, triggers), ideally with row counts and last-write times per table.
    type: text
    required: true
  - name: context
    description: Optional. What the system does, which apps use the database, and the question driving this (migration, new feature, handover).
    type: text
output_contract:
  format: markdown
  sections: [Overview, Entity-relationship diagram, Inferred relationships, Probably unused, Quirks and risks, Open questions, Queries to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Legacy databases rarely declare their relationships. The real model lives in naming conventions (`cust_no` in twelve tables), in the application's queries and ORM mappings, in indexes that only make sense for joins, and in views and stored procedures. Experts infer relationships from several signals and rate them, rather than trusting name matches alone: matching name and type, an index on the column, joins in application code, and a data check that values exist in the candidate parent. They also find tables nobody uses (no writes in years, no references in code, names like `_old`, `_bak`, `tmp_`), columns overloaded with different meanings by a type flag, codes whose meaning lives in a lookup table or only in code, and dates stored as strings. The output is a map with confidence levels and a list of questions for the people who know, not a confident fiction.
</context>

<task>
<schema_dump>
{{schema_dump}}
</schema_dump>
{{#context}}Context: {{context}}{{/context}}

1. If the repository of an app that uses the database is available, search it for table names, ORM models and raw SQL joins to collect evidence. Do not connect to any database.
2. Group the tables into domains (customers, orders, billing, auth, audit, staging) with a one-line guess at each table's purpose.
3. List declared foreign keys, then inferred relationships with the evidence for each (name and type match, index, code join, view definition) and a confidence level.
4. Draw an entity-relationship diagram in Mermaid `erDiagram` for the core domains (not every table), marking inferred relationships clearly.
5. List tables and columns that look unused or obsolete, with the evidence (row counts, last writes, no code references, naming).
6. List quirks and risks: overloaded columns, magic codes, dates or numbers stored as text, missing primary keys, duplicate-looking tables, triggers with side effects.
7. Write open questions for people who know the system, and read-only SQL queries that would confirm the inferred relationships (orphan counts, value overlap) for someone with access to run.
</task>

<constraints>
- Read only. Do not connect to, query or change any database; confirmation queries are for the user to run.
- Label every inferred relationship and purpose as inferred with its evidence; never present a guess as fact.
- Do not invent tables or columns that are not in the dump.
{{> guardrails/investigate-before-answering}}
{{> output/uncertainty}}
</constraints>

<output_format>
## Overview
Domains with table counts and one-line purposes.

## Entity-relationship diagram
Mermaid erDiagram block.

## Inferred relationships
Table: child.column | parent.column | evidence | confidence.

## Probably unused
Table: object | evidence.

## Quirks and risks
Bullets.

## Open questions
Numbered.

## Queries to confirm
Read-only SQL.
</output_format>

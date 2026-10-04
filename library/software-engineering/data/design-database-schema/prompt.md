---
schema: 1
id: design-database-schema
kind: prompt
title: Design a relational database schema
description: Designs a relational schema from requirements and access patterns, with keys, constraints, types, indexes and DDL. Use when starting a new service or feature that stores data.
category: data
version: 1.0.1
status: experimental
aliases: [data-schema]
stage: [design]
role: [backend-engineer, data-engineer, architect, software-engineer]
stack: [sql]
requires: [none]
inputs: [spec, text]
output: [code, diagram, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [data-modeling, ddl, normalization]
pairs_with:
  prompts: [plan-zero-downtime-schema-change, optimize-sql-query]
args:
  - name: requirements
    description: What the system must store and do. Entities, rules, volumes, retention and any multi-tenancy.
    type: text
    required: true
  - name: access_patterns
    description: The main reads and writes with rough frequency, for example "list a customer's last 20 orders, 200/s".
    type: text
  - name: database
    description: Target database engine.
    type: enum
    enum: [postgres, mysql, sqlite, sql-server, other]
    default: postgres
output_contract:
  format: markdown
  sections: [Assumptions, Diagram, DDL, Access patterns, Trade-offs, Open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Answers to the former Hermes IDE built-in id data-schema."}
---
<context>
A schema outlives the code around it. Mistakes such as a missing constraint, money stored as a float, a timestamp without a time zone or a tenant key left out of an index are cheap on day one and expensive after a year of data. The database should enforce the rules it can, so bad data cannot get in through any code path.
</context>

<task>
Design a {{database}} schema for:
{{requirements}}
{{#access_patterns}}
Access patterns:
{{access_patterns}}
{{/access_patterns}}

1. List the entities, their relationships and cardinalities, and the business rules the data must obey. Write down every assumption you make.
2. Model to third normal form first. Denormalise only where a listed access pattern needs it, and say which one.
3. Choose keys: a surrogate primary key (identity integer, or a time-ordered UUID when ids are created outside the database or exposed publicly), plus natural unique keys as `UNIQUE` constraints.
4. Choose types deliberately: exact decimals for money (with the currency stored alongside), time-zone-aware timestamps, text with `CHECK` constraints or lookup tables for small fixed sets, and JSON only for data that is genuinely schemaless.
5. Enforce rules in the database: `NOT NULL` by default, foreign keys with an explicit `ON DELETE` behaviour, `UNIQUE` and `CHECK` constraints.
6. Derive indexes from the access patterns, one per pattern at most, with column order explained. Index foreign keys used in joins or cascading deletes.
7. For multi-tenant data, put the tenant key in every tenant-owned table, in its unique constraints and first in its indexes.
</task>

<constraints>
- Model only what the requirements need. Add audit columns, soft deletes or history tables only when a requirement asks for them, and list them under Trade-offs as options otherwise.
- Use DDL that runs on {{database}} as written. Do not mix dialects.
- Every index maps to a named access pattern or foreign key.
- When a requirement is ambiguous in a way that changes the model (one-to-many or many-to-many, hard or soft delete), pick one, say so in Assumptions, and add the question to Open questions.
{{> output/uncertainty}}
</constraints>

<output_format>
## Assumptions
Numbered.

## Diagram
A Mermaid `erDiagram` with every table, key and relationship.

## DDL
One SQL code block that creates every table, constraint and index in dependency order.

## Access patterns
| Pattern | Query shape | Index used |

## Trade-offs
Each significant choice, the alternative, and why you chose this one.

## Open questions
Questions whose answers would change the schema. "None" if none.
</output_format>

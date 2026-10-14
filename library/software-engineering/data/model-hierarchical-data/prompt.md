---
schema: 1
id: model-hierarchical-data
kind: prompt
title: Model hierarchical data
description: Chooses and implements a relational model for trees such as categories, org charts, folders or threaded comments, comparing adjacency list, closure table, materialised path and nested sets.
category: data
version: 1.0.0
status: incubating
stage: [design, build]
role: [backend-engineer, dba]
stack: [sql]
requires: [none]
inputs: [spec, schema, text]
output: [code, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [trees, hierarchies, closure-table, recursive-cte, materialized-path, nested-sets]
pairs_with:
  prompts: [design-database-schema, optimize-sql-query]
  personas: [database-administrator]
args:
  - name: hierarchy
    description: What the tree represents, typical depth and size, how often nodes are added, moved or deleted, and the queries needed (children, all descendants, ancestors and breadcrumbs, subtree counts, ordering among siblings).
    type: text
    required: true
  - name: database
    description: Database engine and version.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Requirements, Choice, Schema, Queries, Moves and integrity]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Hierarchies look simple and cause trouble later. The four classic models trade read speed against write cost. An adjacency list (`parent_id`) is simple, keeps integrity with a foreign key and handles moves in one update; with recursive CTEs (supported by Postgres, MySQL 8, SQL Server, SQLite and others) it serves most trees of moderate size well. A closure table stores every ancestor and descendant pair with depth, making subtree and ancestor queries fast and indexable at the cost of extra rows and more work on moves. A materialised path (`/1/4/9/`, or Postgres `ltree`) is fast for subtree prefix queries and breadcrumbs but must be rewritten for a whole subtree on move. Nested sets give very fast subtree reads but renumber large parts of the tree on insert, which is rarely worth it for data that changes. Real requirements decide: depth, write frequency, moves, sibling ordering, and whether cycles must be prevented (a node moved under its own descendant). Many trees also need soft deletes, orphan handling and a maximum depth.
</context>

<task>
Database: {{database}}

<hierarchy>
{{hierarchy}}
</hierarchy>

1. Turn the description into requirements: size, depth, read queries with frequency, write and move frequency, sibling ordering, and integrity rules.
2. Compare the models briefly against these requirements and choose one (a hybrid is fine, for example adjacency list plus a closure table maintained by the application or triggers). Say what would change the choice.
3. Write the DDL with keys, constraints, indexes and sibling order column if needed.
4. Write the queries for each requirement: children, all descendants with depth, ancestors in order for breadcrumbs, subtree counts or aggregates, and roots.
5. Write the operations for insert, move and delete (with the chosen rule for children: cascade, reparent or block), including cycle prevention on move and transaction boundaries.
6. Note performance limits: depth or size at which the choice should be revisited, and the indexes each query uses.
</task>

<constraints>
- Use syntax supported by the stated engine and version; mark anything you are unsure of.
- Prevent cycles and orphaned rows explicitly; do not leave integrity to "the app will handle it" without saying how.
- Do not choose nested sets for frequently changing trees without stating the write cost.
{{> output/uncertainty}}
</constraints>

<output_format>
## Requirements
Bullets.

## Choice
Comparison table: Model | Reads | Writes and moves | Fit. Then the choice and why.

## Schema
DDL code block.

## Queries
One code block per query, with a one-line title.

## Moves and integrity
SQL for insert, move and delete, and cycle prevention.
</output_format>

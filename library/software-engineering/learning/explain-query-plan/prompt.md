---
schema: 1
id: explain-query-plan
kind: prompt
title: Explain a query plan
description: Teaches you to read an EXPLAIN or EXPLAIN ANALYZE output node by node, what each operator does, how to read costs, rows and timings, and where the time actually goes.
category: learning
version: 1.0.0
status: incubating
stage: [learn, review]
role: [software-engineer, backend-engineer, dba, data-analyst]
stack: [postgres, mysql]
requires: [none]
inputs: [text, logs]
output: [explanation, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [query-plans, explain-analyze, indexes, query-performance]
pairs_with:
  prompts: [optimize-sql-query, review-database-indexes, explain-sql-query]
args:
  - name: plan
    description: The EXPLAIN or EXPLAIN ANALYZE output, ideally with BUFFERS, in text form.
    type: text
    required: true
  - name: query
    description: The SQL the plan is for.
    type: text
  - name: database
    description: The database and version (PostgreSQL 16, MySQL 8, SQLite, SQL Server).
    type: string
output_contract:
  format: markdown
  sections: [How to read this plan, Node by node, Where the time goes, Estimates versus reality, What to look at next]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A query plan is a tree read from the innermost, most indented nodes outward; each node feeds rows to its parent. Most people misread three things. First, cost numbers are the planner's arbitrary units, not milliseconds, and the first number is startup cost. Second, in PostgreSQL's EXPLAIN ANALYZE, actual time and rows are per loop, so a node with `loops=5000` costs five thousand times what it shows, and parent times include their children. Third, the biggest clue is usually a gap between estimated and actual rows, which means stale statistics or correlated columns and leads the planner to a bad join type. Operators matter too: a sequential scan is not always bad on small tables, a nested loop is good with few outer rows and terrible with many, sorts and hashes that spill to disk show up as external merge or batches, and `Rows Removed by Filter` reveals a missing or unusable index. MySQL's tabular EXPLAIN and its tree format read differently from PostgreSQL's.
</context>

<task>
Explain this query plan{{#database}} from {{database}}{{/database}}.

```
{{plan}}
```
{{#query}}
For this query:

```sql
{{query}}
```
{{/query}}

1. Identify the database and whether this is an estimate only (EXPLAIN) or with real execution (ANALYZE). If not given, infer it from the format and say so. Say in two or three sentences how to read this format: tree direction, what each number means, per-loop values.
2. Walk the tree from the innermost nodes up. For each node: the operator in plain words, which table or index it touches, estimated versus actual rows, loops, and its own time (its time minus its children's, multiplied by loops where relevant).
3. Identify where the time goes: the one to three nodes responsible for most of the total, with the arithmetic shown.
4. Compare estimates to actuals and point out gaps of ten times or more, and what they suggest (stale statistics, correlated predicates, functions on columns, parameter values).
5. Point out signals a learner should learn to spot in this plan: filters removing many rows, sorts or hashes spilling to disk, nested loops with many outer rows, index scans followed by many heap fetches, and buffer reads versus hits if BUFFERS is present.
6. Say what to look at next: the statistics, indexes or query parts to inspect. Keep fixes as pointers, not a rewrite.
</task>

<constraints>
- Do not treat cost units as time. Do not add up per-loop times without multiplying by loops.
- With EXPLAIN only, say that the actual behaviour is unknown and recommend EXPLAIN (ANALYZE, BUFFERS) on a safe copy, noting that ANALYZE executes the query, so a write statement should run inside a transaction that is rolled back.
- Do not invent indexes or table sizes not shown; ask for them.
{{> output/uncertainty}}
</constraints>

<output_format>
## How to read this plan
Two or three sentences.
## Node by node
A table: node, operator, table or index, est rows, actual rows, loops, own time.
## Where the time goes
Bullets with arithmetic.
## Estimates versus reality
Bullets. "Estimates are close" if they are.
## What to look at next
Numbered pointers.
</output_format>

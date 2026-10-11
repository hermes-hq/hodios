---
schema: 1
id: optimize-mongodb-queries
kind: prompt
title: Optimize slow MongoDB queries
description: Speeds up slow MongoDB finds and aggregations from explain output, with compound indexes in equality-sort-range order, projections and schema changes, verified by docs examined.
category: performance
version: 1.0.0
status: incubating
stage: [maintain, operate]
role: [backend-engineer, dba, software-engineer]
stack: [mongodb]
requires: [none]
inputs: [logs, schema, text]
output: [report, code]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [explain-plan, compound-index, aggregation-pipeline, nosql, indexing]
pairs_with:
  prompts: [write-mongodb-aggregation, optimize-sql-query, find-worst-queries-in-workload]
  personas: [performance-engineer, database-administrator]
args:
  - name: query
    description: The slow find or aggregation pipeline, with the collection name and how often it runs.
    type: text
    required: true
  - name: explain
    description: Output of explain("executionStats") for the query, or the profiler or slow-log entry.
    type: text
  - name: indexes
    description: The collection's current indexes (getIndexes()), document count, a sample document and the write rate.
    type: text
output_contract:
  format: markdown
  sections: [Diagnosis, Index change, Query or pipeline rewrite, Schema notes, How to verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The explain output tells you almost everything: COLLSCAN means no usable index; a large gap between totalDocsExamined and nReturned means the index is not selective for this filter; an in-memory SORT stage means the index does not provide the order, and on big results it spills or fails at the memory limit. Compound indexes work best in equality, sort, range order (ESR): equality fields first, then the sort keys, then range filters, because a range field placed before the sort key forces an in-memory sort. Covered queries (projection only of indexed fields, excluding _id if it is not indexed) skip fetching documents entirely. In aggregations, $match and $sort must come first to use an index; $lookup per document is the MongoDB N+1, and $unwind on large arrays multiplies documents. Some slowness is the schema: unbounded arrays, documents near the size limit, or data that is always read together but stored apart. Every new index costs write time, memory and disk.
</context>

<task>
Slow query: {{query}}
{{#explain}}
Explain or profiler output:
{{explain}}
{{/explain}}
{{#indexes}}
Indexes and collection facts:
{{indexes}}
{{/indexes}}

1. Read the winning plan: stage types, index used, keysExamined, docsExamined, nReturned, in-memory sort, execution time. If no explain output is given, give the exact explain command to run and reason from the query shape, marking conclusions as unverified.
2. Name the cause in one or two sentences: no index, wrong field order, unselective index, in-memory sort, fetching whole documents, early $lookup or $unwind, or a schema problem.
3. Propose the index in ESR order and explain the order field by field. Check whether an existing index can be extended instead of adding a new one, and flag existing indexes that become redundant (a prefix of the new one).
4. Rewrite the query or pipeline if it helps: move $match and $sort first, add a projection, use a covered query, replace skip-based paging with range paging on an indexed key, filter before $lookup and give the joined collection an index on the foreign field.
5. Note schema changes only when the query cannot be fixed otherwise (embedding, bucketing, a precomputed field), with their write-side cost.
6. Give the verification: the explain fields that should change and the expected ratio of keys examined to documents returned.
</task>

<constraints>
- Do not claim a speed-up you have not seen; state the explain numbers that would confirm it.
- State the write and memory cost of every index you propose; do not suggest indexing every field.
- Build large indexes in a way that does not block the application; say to check the server version's index build behaviour first.
- Keep query results and ordering identical unless the user agrees to change them.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Diagnosis
The key explain numbers and the cause.
## Index change
The createIndex command, the reason for the field order, and indexes made redundant.
## Query or pipeline rewrite
The new query or pipeline, or "No change needed".
## Schema notes
Only if relevant, otherwise "None".
## How to verify
The explain fields to check and their expected values.
</output_format>

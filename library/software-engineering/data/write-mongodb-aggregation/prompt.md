---
schema: 1
id: write-mongodb-aggregation
kind: prompt
title: Write a MongoDB aggregation pipeline
description: Writes a MongoDB aggregation pipeline that answers a question, explains each stage, handles missing and array fields, and recommends indexes. Use when a query needs grouping, joins or reshaping.
category: data
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, data-engineer, data-analyst]
stack: [mongodb]
requires: [none]
inputs: [schema, text]
output: [code, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [aggregation-pipeline, nosql, query-optimization, indexes]
pairs_with:
  personas: [database-administrator]
  prompts: [review-database-indexes]
args:
  - name: collection_schema
    description: The collections involved, with example documents (field names, types, which fields can be missing or arrays), approximate document counts and existing indexes.
    type: text
    required: true
  - name: question
    description: The question to answer in plain words, including filters, time range, time zone, grouping and the output shape you want.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Pipeline, Stage by stage, Assumptions, Indexes, Example output, Check it]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Aggregation pipelines that look right often return wrong numbers or run slowly because of: a `$match` placed after a `$project` or `$unwind`, so no index is used; `$unwind` dropping documents whose array is empty or missing; missing fields and nulls grouped together, or counted as zero; dates bucketed in UTC when the business means local days; `$lookup` against an unindexed foreign field, which scans the other collection per document; and stages hitting the 100 MB memory limit. Only the leading `$match` and `$sort` stages can use indexes, so stage order is a performance decision as much as a logical one.
</context>

<task>
Write an aggregation pipeline that answers:
<question>
{{question}}
</question>
for these collections:
<collection_schema>
{{collection_schema}}
</collection_schema>

1. Restate the question as precise definitions in one or two lines (what counts, which time zone, what to do with missing values). If a definition is genuinely ambiguous and changes the result, ask and stop.
2. Order stages for correctness and index use: filter with `$match` first, using fields an index can serve; `$sort` and `$limit` together when only the top results are needed; reshape (`$project`, `$set`) after filtering.
3. Handle the data's real shape:
   - arrays: `$unwind` with `preserveNullAndEmptyArrays` when documents without elements must still count, or array operators (`$size`, `$filter`) to avoid unwinding;
   - missing versus null fields: `$ifNull` or explicit `$exists` matches, chosen deliberately;
   - dates: `$dateTrunc` or `$dateToString` with the `timezone` argument;
   - joins: `$lookup` with `localField` and `foreignField` (or `let` and a sub-pipeline only when needed), and a note on the index the foreign collection needs.
4. Prefer `$group` accumulators, `$facet`, `$bucket` or `$setWindowFields` over pulling documents into application code.
5. Give the pipeline for mongosh, and for one driver if the question mentions a language.
6. Recommend indexes using the equality, sort, range order, and say which existing index the leading stages can use.
</task>

<constraints>
- Use only fields that appear in the schema or examples; flag any you had to assume.
- Use operators available in the MongoDB version stated, or in currently supported versions if none is stated, and say which version an operator needs when it is recent.
- Mention `allowDiskUse` only when a stage can exceed the memory limit, and explain why.
- Do not recommend more than two new indexes without explaining the write cost.
</constraints>

<output_format>
## Pipeline
One fenced block for mongosh, plus a driver version if asked.
## Stage by stage
Numbered: what each stage does and why it sits there.
## Assumptions
Bullets: definitions and data-shape assumptions.
## Indexes
Index definitions with the reason, and which stages use them.
## Example output
Two or three output documents showing the shape.
## Check it
How to confirm with `explain("executionStats")`: index used, documents examined versus returned.
</output_format>

---
schema: 1
id: design-dynamodb-table
kind: prompt
title: Design a DynamoDB table
description: Designs a DynamoDB single-table or multi-table model from listed access patterns with partition and sort keys, GSIs, item examples, hot-partition avoidance and cost notes.
category: data
version: 1.0.0
status: incubating
stage: [design]
role: [backend-engineer, architect]
stack: [aws]
requires: [none]
inputs: [text, spec]
output: [table, code, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [dynamodb, single-table-design, partition-keys, global-secondary-indexes, access-patterns, nosql-modelling]
pairs_with:
  prompts: [write-aws-lambda-function, test-code-using-aws-services, choose-database-for-workload]
args:
  - name: app
    description: The entities and every read and write the app performs (for example "get order by id", "list a customer's orders newest first", "list open orders per warehouse"), with rough frequency.
    type: text
    required: true
  - name: scale
    description: Optional. Item counts, item sizes, peak requests per second, and any very hot keys (a celebrity user, one big tenant).
    type: text
output_contract:
  format: markdown
  sections: [Access patterns, Key design, Item examples, Indexes, Query mapping, Hot partitions and limits, Trade-offs]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
DynamoDB is designed backwards from relational databases: list every access pattern first, then design keys so each pattern is a `GetItem` or a `Query` on one partition key with a sort key condition. Scans and filters on non-key attributes read and bill for every item they touch. Single-table design puts related entities under shared partition keys (for example `PK = CUSTOMER#123`, `SK = ORDER#2026-10-01#987`) so one query fetches a customer and their orders; it is efficient but harder to read and evolve, and separate tables are a fine choice when entities are not fetched together. GSIs give alternative keys, are eventually consistent, and each one costs writes. Sort keys with composed values support range and prefix queries; sparse indexes include only items that have the attribute. Limits shape the design: 400 KB per item, per-partition throughput limits that make a single hot key a bottleneck (write sharding with suffixes spreads it), 1 MB per query page, and transactions limited in item count. Counting, ad-hoc filtering and aggregation need precomputed items or a separate analytics path.
</context>

<task>
App: {{app}}
{{#scale}}Scale: {{scale}}{{/scale}}

1. List every access pattern as a numbered table: pattern, key inputs, sort or range needs, consistency needs, frequency. If the list is clearly incomplete, say what is missing.
2. Decide single-table or multi-table for this case and say why.
3. Key design: the partition and sort key formats for each entity, using prefixes and composed sort keys, plus attributes for GSIs.
4. Show item examples as a table of rows (PK, SK, GSI keys, main attributes) with invented values.
5. Indexes: each GSI (or LSI if justified), its keys, projection and which patterns it serves; sparse indexes where useful.
6. Map every access pattern to its exact operation: table or index, key condition, sort direction, and pagination.
7. Hot partitions and limits: hot keys and how to spread them, item size growth, query page limits, and how counts or aggregates are kept (update in a transaction, or streams).
8. Trade-offs: what the design cannot answer cheaply, how new patterns would be added, and cost drivers.
</task>

<constraints>
- No access pattern may rely on a Scan unless it is a rare admin or batch job, and say so when it does.
- Use only current DynamoDB features and limits; mark any figure you are unsure of to verify against the AWS documentation.
- Item examples use invented data.
{{> output/uncertainty}}
</constraints>

<output_format>
## Access patterns
Numbered table.

## Key design
Table: entity | PK | SK | GSI keys.

## Item examples
Table of example items.

## Indexes
Bullets per index.

## Query mapping
Table: pattern | operation | index | key condition.

## Hot partitions and limits
Bullets.

## Trade-offs
Bullets.
</output_format>

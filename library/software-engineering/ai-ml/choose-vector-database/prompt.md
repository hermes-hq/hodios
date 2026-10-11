---
schema: 1
id: choose-vector-database
kind: prompt
title: Choose a vector database
description: Picks a vector store (a Postgres extension, a search engine's vector support, a managed service or a dedicated database) from data size, filtering, update rate, ops skills and cost.
category: ai-ml
version: 1.0.0
status: incubating
stage: [design, plan]
role: [architect, backend-engineer, ml-engineer, tech-lead]
stack: [llm-apps]
requires: [none]
inputs: [spec, text]
output: [adr, table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [vector-search, database-selection, semantic-search, trade-offs]
pairs_with:
  prompts: [choose-database-for-workload, design-rag-pipeline, choose-embedding-model]
args:
  - name: workload
    description: Number of vectors now and in two years, dimensions, queries per second, update and delete rate, metadata filters needed, and whether keyword search is also needed.
    type: text
    required: true
  - name: environment
    description: Databases and search engines already run in production, cloud and hosting rules, team ops experience and budget.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Workload summary, Options, Comparison, Recommendation, Proof of concept, Exit plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
For most products the right vector store is the database they already run. A Postgres extension or the vector support in an existing search engine handles millions of vectors with metadata filters, transactions and backups the team already knows, and it keeps permissions and joins next to the data. A dedicated vector database earns its extra moving part at very large scale, very high query rates, heavy multi-tenancy or specific features the general-purpose options lack. Decisions go wrong on details: filtered search where the filter is very selective and the approximate index returns too few results, index build time and memory for large collections, delete-heavy workloads, keeping the vector store in sync with the source of truth, and hybrid keyword plus vector search needing a second system.
</context>

<task>
Choose a vector store for this workload: {{workload}}

Environment: {{environment}}

1. Summarise the workload as numbers: vectors now and later, dimensions, raw vector memory (count x dimensions x 4 bytes for float32, plus index overhead), query rate, latency target, write and delete rate, filter selectivity, tenancy model, and whether hybrid search is needed.
2. List 3 or 4 options that fit the environment, starting with what the team already runs: a Postgres extension, vector support in an existing search engine, a managed vector service, and a self-hosted dedicated database.
3. Compare them on: fit at the projected scale, filtered search behaviour, hybrid search support, consistency with the source data, operational load for this team, backup and recovery, multi-tenancy isolation, cost model, and lock-in.
4. Recommend one, with the conditions under which you would switch to another (for example a vector count or query rate threshold).
5. Proof of concept: load a realistic sample (or synthetic vectors of the right dimension at the projected count), run the real query patterns with filters, and measure recall against exact search, p95 latency and memory. Give pass criteria.
6. Exit plan: keep embeddings reproducible from source data and store the model version, so moving stores means re-loading, not re-deriving.
</task>

<constraints>
- Do not quote vendor prices, limits or benchmark numbers from memory as facts; mark them as "verify" with where to check.
- Do not recommend adding a new system when an existing one meets the numbers; justify any new component by a specific requirement.
- Name products only as examples of an option type.
{{> output/uncertainty}}
</constraints>

<output_format>
## Workload summary
Table of the numbers and the memory arithmetic.
## Options
One short paragraph per option.
## Comparison
Table: criterion | option A | option B | option C.
## Recommendation
The choice, why, and the switch conditions.
## Proof of concept
Steps, measurements and pass criteria.
## Exit plan
Bullets.
</output_format>

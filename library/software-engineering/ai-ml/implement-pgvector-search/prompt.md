---
schema: 1
id: implement-pgvector-search
kind: prompt
title: Implement semantic search with pgvector
description: Implements semantic search in PostgreSQL with pgvector, covering the schema, HNSW or IVFFlat index choice and tuning, metadata filters, query code and recall checks against exact search.
category: ai-ml
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, ml-engineer, dba, fullstack-engineer]
stack: [postgres, llm-apps]
requires: [repo-read, file-write, shell]
inputs: [repo, schema]
output: [code, tests, report]
risk: runs-commands
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [pgvector, hnsw, vector-search, semantic-search, embeddings]
pairs_with:
  prompts: [design-rag-pipeline, choose-vector-database]
args:
  - name: requirements
    description: What is searched, row count now and later, embedding model and dimensions, filters (tenant, type, date), latency target, and the app's language and database access library.
    type: text
    required: true
  - name: postgres_setup
    description: PostgreSQL and pgvector versions, hosting (managed service or self-run) and instance memory.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Design, Migration, Query code, Tuning, Tests, Check, Operational notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
pgvector makes semantic search a few SQL statements, and the details decide whether it works. The distance operator in queries must match the operator class of the index (cosine, inner product or L2), or the index is silently ignored and every query scans the table. HNSW gives better recall-speed trade-offs and needs no training data but uses more memory and builds slower; IVFFlat builds fast but must be created after data is loaded and its `lists` and `probes` tuned. Approximate indexes apply `WHERE` filters after finding candidates, so a selective filter (one tenant among thousands) can return fewer rows than `LIMIT`; newer pgvector versions add iterative index scans to help, and partial indexes or partitioning per tenant are other fixes. Index builds need enough `maintenance_work_mem`, and managed services may pin an older pgvector version.
</context>

<task>
Implement semantic search: {{requirements}}

Postgres setup: {{postgres_setup}}

1. Read the existing schema, migrations and data access code. Check which pgvector version is installed or available on this host; features differ by version.
2. Design: where embeddings live (same table or a separate chunks table with a foreign key), the `vector(n)` column matching the model's dimensions (or `halfvec` if storage matters and the version supports it), the embedding model name stored with each row, and the distance metric the model is meant to use (normalised embeddings make cosine and inner product equivalent).
3. Index: choose HNSW or IVFFlat for this data size and update rate and explain why; give starting parameters (`m`, `ef_construction`, `hnsw.ef_search`, or `lists` and `ivfflat.probes`), use the operator class that matches the query operator, and build concurrently where possible.
4. Filters: B-tree indexes on filter columns; for selective filters, use iterative index scans if the version supports them, partial indexes, or partitioning by tenant, and explain the choice.
5. Write the migration with the project's migration tool, and the query code with parameterised queries: embed the query, `ORDER BY embedding <op> :query_embedding LIMIT k` with filters, return distances.
6. Tests: an `EXPLAIN` check that the index is used, a recall test comparing approximate results with exact search (index disabled) on a sample of queries, and a filtered query that returns k results for a small tenant. Run them against a disposable database.
7. Operational notes: index memory estimate, build time and `maintenance_work_mem`, vacuum and re-index after large changes, and how to re-embed when the model changes.
</task>

<constraints>
- Run migrations and tests only against a local or disposable database; never against shared or production databases without explicit confirmation.
- Use only parameters and functions that exist in the stated pgvector version; if unsure, say which version introduced them.
- Do not build a large index inside a migration that locks a busy table without warning about it.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Design
Tables, columns, metric and index choice with reasons.
## Migration
SQL or migration code with file path.
## Query code
Code blocks with file paths.
## Tuning
Starting parameters and how to tune them against recall and latency.
## Tests
Code blocks with file paths.
## Check
Commands run and results, including EXPLAIN output and measured recall.
## Operational notes
Memory, build, maintenance and re-embedding.
</output_format>

---
schema: 1
id: design-search-index
kind: prompt
title: Design a search index
description: Designs a search index in Elasticsearch, OpenSearch or Postgres full-text, with mappings, analysers, relevance tuning and a reindexing plan. Use when adding search or fixing poor results.
category: data
version: 1.0.0
status: incubating
stage: [design, build]
role: [backend-engineer, data-engineer, software-engineer, fullstack-engineer]
stack: [elasticsearch, postgres]
requires: [none]
inputs: [text, schema, dataset]
output: [config, code, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [full-text-search, relevance, analyzers, reindexing, bm25]
pairs_with:
  personas: [data-engineer, backend-engineer]
  prompts: [design-database-schema, review-database-indexes, design-rag-pipeline]
args:
  - name: content_and_queries
    description: What is being searched (document types, fields, languages, volume, update rate) and real example queries with the results users expect, plus filters, sorting and facets needed.
    type: text
    required: true
  - name: engine
    description: Search engine to design for; "recommend" lets the assistant choose and justify.
    type: enum
    enum: [elasticsearch, opensearch, postgres, recommend]
    default: recommend
output_contract:
  format: markdown
  sections: [Engine choice, Document model, Mappings and analysers, Queries, Relevance tuning, Indexing and reindexing, Evaluation, Open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Search quality is decided by three things most designs skip: analysis (how text becomes tokens: language stemming, accents, synonyms, compound words, identifiers like SKUs that must not be split), the query (which fields, with what weights, how exact phrase and prefix matches rank against fuzzy ones), and a way to measure relevance against real queries. Postgres full-text search is enough for many products under a few million documents with simple ranking and no need for a separate cluster; a dedicated engine earns its operational cost with complex relevance, facets at scale, fuzzy and typo tolerance, or many languages.
</context>

<task>
Design search for:
<content_and_queries>
{{content_and_queries}}
</content_and_queries>
Engine: {{engine}}

1. **Engine choice.** If "recommend", choose between Postgres full-text (with `pg_trgm` for fuzzy matching) and Elasticsearch or OpenSearch from volume, update rate, relevance needs, languages, facets and operational capacity, and state the trade-off. If an engine is given, use it and mention a serious mismatch once.
2. **Document model.** One indexed document per thing users want back. Denormalise the fields needed for matching, filtering, sorting and display; note what is copied from where and how it stays in sync.
3. **Mappings and analysers.** For each field: type (full-text, keyword, numeric, date, nested), analyser, and whether it is searched, filtered, sorted or only stored. Define custom analysers: language stemming per language, ASCII folding, lowercase, synonyms (applied at search time so they can change without reindexing), edge n-grams or a search-as-you-type field for autocomplete, and a keyword or exact sub-field for codes and identifiers. For Postgres, give the `tsvector` generated column with weights (`setweight` A to D), the text search configuration per language, and GIN indexes.
4. **Queries.** Write the main query for the example searches: multi-field matching with field boosts (title over body), phrase and exact-identifier boosts, fuzziness only on longer terms, filters in filter context (not scored), and business signals (recency, popularity, stock) through function scoring or rank expressions, capped so they cannot overwhelm text relevance. Include the highlighting and pagination approach (search-after rather than deep offset).
5. **Relevance tuning.** Walk through each example query: what currently or naively would rank first, what should, and which setting makes that happen.
6. **Indexing and reindexing.** How changes flow in (outbox or change data capture, queue, or periodic batch), handling deletes, and zero-downtime reindexing with versioned indexes behind an alias (create new index, backfill, dual-write or catch up, swap the alias, keep the old one for rollback). For Postgres, how the generated column and index are rebuilt safely.
7. **Evaluation.** A small judged query set (30 to 100 real queries with expected results), a metric (for example NDCG@10 or success at 3), zero-result and click-through monitoring, and a process for adding synonyms from failed searches.
</task>

<constraints>
- Use the engine's real syntax and say which version you assume. If unsure of an option, say so and describe the intent.
- Do not invent data volumes or query patterns; mark assumptions.
- Never mix the scoring of user-supplied filters into relevance; filters do not score.
- Keep the design operable by the team described; flag when a cluster is more than they need.
{{> output/uncertainty}}
</constraints>

<output_format>
## Engine choice
Choice and reasons, in a few bullets.
## Document model
A table: field, source, purpose (search, filter, sort, display).
## Mappings and analysers
One fenced block (index mapping JSON, or SQL DDL for Postgres).
## Queries
Fenced query examples for the main search and autocomplete.
## Relevance tuning
A table: example query, expected top results, settings that achieve it.
## Indexing and reindexing
Numbered steps.
## Evaluation
Bullets.
## Open questions
Numbered.
</output_format>

---
schema: 1
id: optimize-elasticsearch-queries
kind: prompt
title: Speed up Elasticsearch searches and indexing
description: Speeds up slow Elasticsearch or OpenSearch searches and indexing with query rewrites, mapping fixes, filter context, shard sizing and bulk settings, using the profile API and node stats.
category: performance
version: 1.0.0
status: incubating
stage: [operate, maintain]
role: [backend-engineer, sre, data-engineer]
stack: [elasticsearch]
requires: [none]
inputs: [logs, config, schema, text]
output: [report, config, code]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [shard-sizing, profile-api, bulk-indexing, mappings, search-latency]
pairs_with:
  prompts: [write-elasticsearch-query, design-search-index, reduce-tail-latency]
  personas: [performance-engineer]
args:
  - name: problem
    description: What is slow (a search, aggregations, indexing throughput, refresh lag) with timings and versions.
    type: text
    required: true
  - name: query
    description: The slow query DSL, and output of the profile API or slow log if available.
    type: text
  - name: cluster
    description: Index mappings, number of shards and replicas, shard sizes, node count and sizes, heap, indexing rate, _cat or node stats output.
    type: text
output_contract:
  format: markdown
  sections: [Diagnosis, Query fixes, Mapping and index fixes, Cluster and shard fixes, How to verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most slow searches have a few causes. Scoring work the user does not need: exact-match conditions placed in must instead of filter, which also stops filter caching. Expensive clauses: leading wildcards, regexp, script queries and scripted sorting run per document. Aggregations on high-cardinality fields or on text fields with fielddata. Deep pagination with from and size instead of search_after. Wrong mappings: numbers used as identifiers mapped as numeric (term lookups are usually faster on keyword), dynamic mapping that created thousands of fields. On the cluster side, too many small shards waste heap and coordination, too few huge shards slow recovery and parallelism; a common guideline is tens of gigabytes per shard, to be checked against the vendor's current advice. Indexing throughput depends on bulk request size, refresh interval, replicas during the initial load and mapping explosion. The profile API shows where a query spends time per shard.
</context>

<task>
Problem: {{problem}}
{{#query}}
Query and profile:
{{query}}
{{/query}}
{{#cluster}}
Mappings and cluster:
{{cluster}}
{{/cluster}}

1. Say what you need if key evidence is missing (profile API output, slow log, _cat/shards, node stats, mappings) and give the read-only requests to get it.
2. Diagnose: which part is slow (query phase, fetch phase, aggregations, indexing, merges, garbage collection or heap pressure) and why, quoting the evidence.
3. Query fixes: move non-scoring conditions into filter context, replace leading wildcards with an n-gram or wildcard-type field, replace scripts with indexed fields computed at write time, use search_after for deep paging, trim _source to the needed fields, and cap aggregation sizes.
4. Mapping and index fixes: keyword versus numeric for identifiers, disable indexing or doc_values on fields never searched or aggregated, stop mapping explosion with explicit mappings, add a sort index only if justified. State which changes need a reindex.
5. Cluster and shard fixes: shard count and size targets for this data, replicas for read throughput, refresh_interval and bulk sizing for indexing, and rollover or time-based indices for log-like data.
6. Give a verification plan: the same query with profile before and after, latency percentiles under real concurrency, indexing rate.
</task>

<constraints>
- Mark which recommendations require a reindex or downtime, and never suggest deleting an index without a confirmed backup and the user's approval.
- Do not quote defaults or limits as fact when they vary by version or between Elasticsearch and OpenSearch; mark them to verify.
- Keep relevance in mind: say when a change alters ranking.
{{> output/uncertainty}}
</constraints>

<output_format>
## Diagnosis
The slow phase and the evidence.
## Query fixes
The rewritten query DSL with a note per change.
## Mapping and index fixes
Bullets, each marked reindex or no reindex.
## Cluster and shard fixes
Bullets with target numbers and the reason.
## How to verify
Steps and the numbers to compare.
</output_format>

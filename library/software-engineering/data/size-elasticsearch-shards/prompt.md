---
schema: 1
id: size-elasticsearch-shards
kind: prompt
title: Size Elasticsearch shards and indices
description: Plans Elasticsearch or OpenSearch shard counts, replicas, rollover and index lifecycle from data volume, retention and query load, and fixes oversharded or overloaded clusters.
category: data
version: 1.0.0
status: incubating
stage: [design]
role: [backend-engineer, sre, data-engineer, devops-engineer]
stack: [elasticsearch]
requires: [none]
inputs: [text, config, logs]
output: [plan, config, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [sharding, index-lifecycle, rollover, capacity-planning]
pairs_with:
  prompts: [design-search-index, estimate-system-capacity, plan-data-archival]
args:
  - name: workload
    description: What is indexed (logs, events, product catalogue, documents), daily ingest volume, document size, retention, query patterns and rates, and latency targets.
    type: text
    required: true
  - name: cluster
    description: Current or planned cluster (version, Elasticsearch or OpenSearch, managed or self-hosted, nodes, heap and disk) and output from _cat/shards, _cat/indices or _cluster/stats if the cluster exists.
    type: text
output_contract:
  format: markdown
  sections: [Sizing summary, Calculation, Index and lifecycle settings, Changes for the existing cluster, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Shard count is the decision most Elasticsearch and OpenSearch clusters get wrong, and it cannot be changed on an existing index without a reindex, split or shrink. Too many small shards (daily indices with five primaries for a few megabytes of logs) waste heap and cluster state, slow recovery and eventually hit per-node shard limits. Too few huge shards slow recovery and rebalancing and limit indexing parallelism. Common guidance is shards of roughly 10 to 50 GB, keeping total shards per node bounded relative to heap, but the right size depends on the version and workload: search-heavy catalogues favour smaller shards and more replicas for query throughput; log and time-series data favours rollover by size or age through data streams and lifecycle policies (ILM in Elasticsearch, ISM in OpenSearch) that move data through hot, warm, cold and delete phases. Replicas add resilience and read capacity but double disk and indexing work. Mappings matter too: indexing every field of logs with dynamic mapping inflates storage. Capacity must include replicas, overhead and the disk watermarks, which stop allocation when disks fill past set percentages.
</context>

<task>
Workload: {{workload}}
{{#cluster}}Cluster: {{cluster}}{{/cluster}}

1. Restate the workload as numbers: daily primary data size after indexing (estimate the ratio of index size to raw size if unknown, and say so), retention, total primary and replica storage, query rate and latency target. List assumptions.
2. Choose the index strategy: time-based data streams or rollover indices for append-only data, or a single index (with an alias for future reindexing) for a catalogue or documents that are updated.
3. Calculate primaries per index and replicas: target shard size, rollover conditions (max primary shard size and max age), total shard count at full retention, and shards per node against heap and the version's limits.
4. Define lifecycle phases with actions (rollover, force merge, shrink, move to warm or cold nodes, searchable snapshots if licensed or available, delete) and timings from retention needs.
5. Size nodes: disk with headroom under the watermarks, heap, and node count for the hot tier and others; say where the estimate is weakest.
6. If the cluster exists, read its stats and list concrete fixes: indices to shrink or merge, templates to change for new indices, oversized indices to split (split API or reindex), mapping bloat to address, and the order to do them safely.
</task>

<constraints>
- Do not run reindex, shrink, delete or setting changes on a cluster yourself; produce requests for the user.
- Say whether each setting applies to Elasticsearch, OpenSearch or both, and to which versions, since lifecycle features and licences differ.
- Do not present rules of thumb as guarantees; recommend validating with a benchmark on representative data and queries.
</constraints>

<output_format>
## Sizing summary
Primaries, replicas, rollover, total shards, nodes and storage in a short table.
## Calculation
The arithmetic with assumptions.
## Index and lifecycle settings
Index template and lifecycle policy as JSON blocks.
## Changes for the existing cluster
Ordered steps, or "Greenfield".
## Open questions
Numbered, or "None".
</output_format>

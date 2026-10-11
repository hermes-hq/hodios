---
schema: 1
id: plan-database-sharding
kind: prompt
title: Plan database sharding
description: Decides whether a database really needs sharding, then picks the shard key from access patterns and plans routing, cross-shard queries, rebalancing, global ids and the migration path.
category: data
version: 1.0.0
status: incubating
stage: [plan, design]
role: [architect, backend-engineer, dba, tech-lead]
stack: []
requires: [none]
inputs: [text, schema]
output: [plan, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [sharding, shard-key, horizontal-scaling, rebalancing, cross-shard-queries]
pairs_with:
  prompts: [plan-table-partitioning, add-read-replicas, design-multi-tenancy, choose-primary-key-strategy]
  personas: [database-administrator]
args:
  - name: situation
    description: Engine and version, data size and growth, read and write rates, the bottleneck observed (CPU, disk, write throughput, storage), what has already been tried, and the main tables with their access patterns.
    type: text
    required: true
  - name: constraints
    description: Optional. Team size, managed service, downtime tolerance, timeline, and whether distributed SQL or a managed sharding layer is an option.
    type: text
output_contract:
  format: markdown
  sections: [Do you need to shard, Alternatives first, Shard key, Architecture, Cross-shard concerns, Migration plan, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Sharding splits data across database servers. It removes a single-server ceiling and adds permanent complexity: routing, cross-shard queries and transactions, global uniqueness, rebalancing, schema changes on many servers, and harder backups. Most systems that ask for it have cheaper options left: query and index fixes, read replicas, caching, a bigger instance, archiving cold data, partitioning, or moving one hot workload (events, logs) to its own store. When sharding is needed, the shard key decides everything. A good key is present in nearly every query, spreads load evenly, and keeps data that is read or written together on one shard: in B2B SaaS that is usually the tenant id; in consumer apps often the user id. Bad keys create hot shards (a timestamp, a giant tenant) or force scatter-gather queries. Hash-based placement spreads load; a directory (lookup table) placement allows moving big tenants. Existing options include application-level routing, sharding layers (Vitess for MySQL, Citus for Postgres) and distributed SQL databases, each with different trade-offs.
</context>

<task>
Situation: {{situation}}
{{#constraints}}Constraints: {{constraints}}{{/constraints}}

1. Decide whether sharding is needed: compare the bottleneck and growth with what a well-tuned single primary (largest sensible instance) plus replicas can handle, with rough numbers. Say what data is missing.
2. List alternatives to try first, in order of effort, with the expected relief for each. If they are likely enough, recommend them and keep the rest of the plan brief.
3. If sharding is warranted, choose the shard key: evaluate two or three candidates against query coverage, even distribution (including the largest tenant or user), and colocation. Pick one.
4. Architecture: placement (hash, range or directory), routing (app library, proxy, extension or distributed database), global ids, where shared reference data lives, and how big tenants are isolated.
5. Cross-shard concerns: queries that span shards and how to serve them (fan-out, a separate analytics store), transactions across shards (avoid, or sagas), uniqueness constraints, and schema migrations across shards.
6. Migration plan: add the shard key everywhere, route by it while still on one database, then move data shard by shard with dual-write or replication, verification and rollback.
7. Risks and the operational load the team takes on.
</task>

<constraints>
- Do not recommend sharding when the stated numbers fit a single primary with replicas; say so plainly.
- Throughput figures are rough and depend on hardware and workload; label them as estimates.
- Do not invent product capabilities; mark specifics of named tools as to verify.
{{> output/uncertainty}}
</constraints>

<output_format>
## Do you need to shard
Verdict and reasoning with numbers.

## Alternatives first
Table: option | effort | expected relief.

## Shard key
Candidates compared, then the choice.

## Architecture
Bullets.

## Cross-shard concerns
Bullets with the approach for each.

## Migration plan
Numbered phases with verification and rollback.

## Risks
Bullets.
</output_format>

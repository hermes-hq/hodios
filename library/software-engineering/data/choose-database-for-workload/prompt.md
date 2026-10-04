---
schema: 1
id: choose-database-for-workload
kind: prompt
title: Choose a database for a workload
description: Recommends a database type and product from access patterns, consistency needs, volume, team skills and operations budget, explaining why the boring default usually wins and what would change it.
category: data
version: 1.0.0
status: incubating
stage: [design, plan]
role: [backend-engineer, architect, founder, tech-lead]
stack: []
requires: [none]
inputs: [text]
output: [report, table, adr]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [database-selection, access-patterns, consistency, managed-services, total-cost, decision-record]
pairs_with:
  prompts: [design-database-schema, design-time-series-schema, write-adr]
  personas: [database-administrator]
args:
  - name: workload
    description: What the system does and how it uses data - main entities, the top queries and writes with rough rates, data size now and in two years, read/write mix, consistency needs (money, inventory, bookings), search or analytics needs, latency targets.
    type: text
    required: true
  - name: constraints
    description: Optional. Team skills, who operates it, cloud or on-premises, budget, compliance or data residency, existing databases in the company, and any product already being pushed.
    type: text
output_contract:
  format: markdown
  sections: [Recommendation, Workload profile, Options compared, Why not the others, What would change the answer, Decision record]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An engineer or founder is choosing a database for a new system. Teams often pick from hype or from one feature, then pay for years in operations and workarounds. Most workloads are served well by a mainstream relational database, run as a managed service, with a cache or search index added only when a measured need appears. Specialised stores (document, key-value, wide-column, graph, time-series, vector, analytical columnar) win for specific access patterns at specific scales, and the honest answer names the threshold. The choice is also about people: who will be paged, what the team already knows, and what the company already runs.
{{#constraints}}
Constraints:
{{constraints}}
{{/constraints}}
</context>

<task>
<workload>
{{workload}}
</workload>

1. Profile the workload: entities and relationships, the top five access patterns with rates, read/write ratio, data size now and in two years (show the arithmetic if derivable), transactional needs (multi-row atomicity, constraints, isolation), query flexibility needed (known key lookups versus ad hoc filters and joins), latency targets, search, analytics and retention.
2. Start from the default: a mainstream relational database as a managed service. Check whether it meets each requirement, and where it is stretched, by how much.
3. Compare two to four realistic options, including the default. For each: fit to the access patterns, consistency model, scaling path, operational burden (backups, upgrades, failover, who is on call), team familiarity, ecosystem, lock-in and cost drivers (not prices).
4. Recommend one primary store, plus any secondary stores only for a named, measured need (for example a search index for full-text relevance, a cache for a hot read path, a warehouse for analytics). Each extra store adds a sync path and an on-call surface; say so.
5. Name what would change the answer, as concrete thresholds or events (for example sustained writes above what one primary handles after tuning, a need for multi-region writes, graph traversals several hops deep on every request).
6. Write a short decision record.
</task>

<constraints>
- Do not state product prices, limits or benchmark numbers as fact; name the cost drivers and say what to measure or check.
- If access patterns or sizes are missing, ask for them; give a provisional answer only with assumptions marked [X].
- Do not recommend a product because the user named it; evaluate it like the others, and say plainly if it fits.
- Avoid vendor marketing claims; prefer facts the team can verify with a small spike or load test.
{{> output/uncertainty}}
</constraints>

<output_format>
## Recommendation
Two to four lines: primary store, any secondary store and why.

## Workload profile
Table: aspect | value | source (given or assumed).

## Options compared
Table: option | access-pattern fit | consistency | scaling path | operations burden | team fit | lock-in.

## Why not the others
One bullet per rejected option.

## What would change the answer
Bullets with thresholds or events, and the spike or load test that would confirm.

## Decision record
Context, decision, consequences, in under 150 words.
</output_format>

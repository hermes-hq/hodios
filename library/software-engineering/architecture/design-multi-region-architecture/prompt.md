---
schema: 1
id: design-multi-region-architecture
kind: prompt
title: Design a multi-region architecture
description: Decides between single region, active-passive and active-active for a system from latency, availability and residency needs, and specifies data replication, write routing, conflicts and failover.
category: architecture
version: 1.0.0
status: incubating
stage: [design]
role: [architect, sre, devops-engineer, tech-lead]
requires: [none]
inputs: [spec, text, document]
output: [docs, diagram, table, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [multi-region, active-active, failover, data-residency, replication]
pairs_with:
  personas: [software-architect]
  prompts: [plan-disaster-recovery, choose-database-for-workload, estimate-cloud-costs, design-multi-tenancy]
args:
  - name: system
    description: What the system does, its main components and data stores, where it runs today and where its users are.
    type: text
    required: true
  - name: drivers
    description: Why multi-region is being considered, with targets, for example "EU customers need EU-only storage", "p95 latency under 150 ms in Asia", "survive a full region outage within 15 minutes".
    type: text
    required: true
  - name: limits
    description: Budget, team size and on-call capacity, cloud provider, and data stores you cannot change.
    type: text
output_contract:
  format: markdown
  sections: [Recommendation, Topology comparison, Data strategy, Request routing, Failover and failback, Cost and operational load, Rollout, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Multi-region is driven by three different needs that lead to different designs: latency (put compute and read data near users), availability (survive a region outage), and residency (keep some data in a jurisdiction). Stateless compute is easy to replicate; the data is the hard part. Active-passive with asynchronous replication is far simpler but loses the last seconds of writes on failover and needs rehearsed promotion. Active-active writes require either partitioning data so each record has one home region, or conflict resolution (last-writer-wins silently loses updates; CRDTs and per-field merges only fit some data), or a globally consistent database that pays cross-region latency on every write. Many outages labelled "region failure" are really failures of a global control plane, DNS or a dependency that was never multi-region, so the design must trace every dependency.
</context>

<task>
<system>
{{system}}
</system>

<drivers>
{{drivers}}
</drivers>

{{#limits}}
<limits>
{{limits}}
</limits>
{{/limits}}

1. Separate the drivers into latency, availability and residency, each with its target. If a target is missing, ask up to four questions and stop, or label an assumption.
2. Compare single region with better zonal redundancy, active-passive, read-local with a home region for writes, partitioned active-active (each user or tenant homed in one region), and fully active-active. Score each against the drivers, complexity, cost and team capacity. Recommend the simplest that meets the targets.
3. Data strategy per store: replication mode (sync or async) and expected lag, the data loss window on failover (RPO) and why, which data is homed per region for residency, which data is global (accounts, config, auth) and how it is served, and how conflicts are prevented or resolved. Include caches, queues, object storage, search and secrets.
4. Request routing: how a request reaches the right region (DNS, anycast, global load balancer, tenant-to-region lookup), how a write for a user homed elsewhere is handled, and session and token validity across regions.
5. Failover and failback: detection, who or what decides, the steps and their order, the target recovery time and what makes it achievable, how to avoid split brain, and how traffic and data return after the region recovers.
6. Cost and operational load: the relative extra cost (duplicated capacity, cross-region data transfer, replicated stores), deploy pipeline changes, and on-call impact. Give relative magnitudes or the arithmetic from given numbers; do not invent prices.
7. Rollout in phases, each testable, ending with a regular failover drill.
8. Add a Mermaid diagram of the recommended topology.
</task>

<constraints>
- Do not recommend active-active writes without stating how conflicts are prevented or resolved for each store.
- Name every global dependency (DNS, identity provider, control plane, third parties) and whether it is itself a single point of failure.
- Residency needs are legal requirements: do not claim compliance; say what the design guarantees technically and what must be confirmed with the compliance owner.
- Do not invent provider limits, replication lags or prices.
{{> output/uncertainty}}
</constraints>

<output_format>
## Recommendation
Topology and why, in at most 6 lines.
## Topology comparison
Table: option, latency, availability, residency, complexity, relative cost, verdict.
## Data strategy
Table per store: replication, lag, RPO, home or global, conflict handling.
## Request routing
Rules plus a Mermaid diagram.
## Failover and failback
Numbered runbook outline with RTO and RPO.
## Cost and operational load
## Rollout
Numbered phases with tests.
## Open questions
</output_format>

---
schema: 1
id: plan-service-scaling
kind: prompt
title: Plan scaling a service
description: Finds what limits a service's capacity from load and resource data, then plans scaling in phases, cheapest fixes first, with the capacity each phase buys. Use before growth outruns the system.
category: architecture
version: 1.0.0
status: incubating
aliases: [arch-scaling]
stage: [design, plan, operate]
role: [architect, backend-engineer, sre, tech-lead]
stack: []
requires: [none]
inputs: [text, logs, config]
output: [plan, diagram, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [scalability, capacity-planning, bottlenecks, autoscaling]
pairs_with:
  prompts: [plan-load-test, plan-caching-strategy, profile-hot-path, estimate-cloud-costs]
  personas: [software-architect, site-reliability-engineer]
args:
  - name: system
    description: The architecture as it runs today - services, databases, caches, queues, hosting, instance sizes and how requests flow.
    type: text
    required: true
  - name: load
    description: Current load and resource data - requests per second at peak, latency percentiles, CPU, memory, disk and network use, database connections and slow queries - plus where you need to get to and by when.
    type: text
    required: true
  - name: constraints
    description: Budget, team size, deadlines, compliance or technology limits.
    type: text
output_contract:
  format: markdown
  sections: [Bottlenecks, Current capacity, Scaling plan, Risks and open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Scaling plans fail in two ways: they add machines in front of a bottleneck that more machines cannot fix (a single primary database, a lock, a chatty dependency), or they jump to sharding and rewrites when an index, a connection pool or a cache would have bought a year. A good plan names the resource that saturates first, estimates how much headroom each change buys, and orders changes by capacity gained per unit of cost and risk.
{{#constraints}}
Constraints: {{constraints}}
{{/constraints}}
</context>

<task>
System:
<system>
{{system}}
</system>

Load and target:
<load>
{{load}}
</load>

1. Restate the target as numbers (peak requests per second, data volume, latency goal, date). If the target is missing, ask for it and plan for a stated assumption meanwhile.
2. Find the bottlenecks. For each tier (edge, application, cache, database, queues, external dependencies), say which resource saturates first - CPU, memory, disk I/O, network, connections, locks or a rate limit - and the evidence for it. Separate measured facts from inferences, and say which measurement would confirm each inference.
3. Estimate current capacity: the load at which the first bottleneck breaks the latency goal, with the arithmetic shown.
4. Plan scaling in phases, cheapest and most reversible first. Consider, where they apply: query and index fixes, connection pooling, caching and a CDN, moving slow work to queues, vertical scaling, horizontal scaling of stateless tiers with autoscaling policies (metric, thresholds, cool-down, minimum and maximum), read replicas with the consistency trade-off, partitioning or sharding only when a single writer is the limit. For each phase give the change, the capacity it buys, the cost, the risk and how to roll it back.
5. Draw the architecture as a Mermaid diagram with the bottleneck marked, and say what changes in each phase.
6. Name the load test that should prove each phase before traffic needs it.
</task>

<constraints>
- Do not recommend sharding, a rewrite or a new datastore when a cheaper change removes the bottleneck; say what evidence would justify the bigger step.
- Show the arithmetic behind every capacity number, and label estimates as estimates.
- Do not invent measurements. When data is missing, say what to measure and how.
- Keep stateful tiers honest: say what scaling them costs in consistency, failover and operations.
{{> output/uncertainty}}
</constraints>

<output_format>
## Bottlenecks
A table: tier, resource, evidence, measured or inferred, how to confirm.
## Current capacity
The breaking load with the arithmetic, and the Mermaid diagram with the bottleneck marked.
## Scaling plan
Numbered phases: change, capacity after, cost, risk, rollback, load test that proves it.
## Risks and open questions
What could break the plan and what to measure next.
</output_format>

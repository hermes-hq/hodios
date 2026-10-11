---
schema: 1
id: remove-single-points-of-failure
kind: prompt
title: Find and remove single points of failure
description: Finds single points of failure in a system's components, data stores, third parties and people, and plans redundancy for each with its cost and a failover test.
category: architecture
version: 1.0.0
status: incubating
stage: [review]
role: [architect, sre, devops-engineer, tech-lead]
requires: [none]
inputs: [document, config, repo, text]
output: [table, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [high-availability, redundancy, failover, resilience, spof]
pairs_with:
  personas: [software-architect]
  prompts: [design-graceful-degradation, design-multi-region-architecture, plan-game-day, map-service-dependencies]
args:
  - name: system
    description: The system's architecture (components, instances, data stores, networks, DNS, CI/CD, third-party services), or the infrastructure code and diagrams to read.
    type: text
    required: true
  - name: availability_goal
    description: The availability target or SLO and the cost of downtime, if known.
    type: text
  - name: budget
    description: Constraints on spending or effort, so the plan can be prioritised.
    type: text
output_contract:
  format: markdown
  sections: [Summary, SPOF register, Plan, Failover tests, Accepted risks, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Teams usually remember the obvious single points of failure (one database instance, one app server) and miss the quiet ones: the NAT gateway in one zone, a single DNS provider, a cron host, a secrets store every service reads at startup, the one person who can deploy, a TLS certificate renewed by hand, a third-party API with no fallback, the CI system needed to ship a fix, or a "redundant" pair that shares a disk, a power source or a configuration push. Redundancy that has never been failed over is a hope, not a control: replicas lag, failover scripts rot and health checks miss partial failures. The useful output is a register of each SPOF with its likelihood, blast radius and the cheapest acceptable fix, ordered by risk, including the ones consciously accepted.
</context>

<task>
<system>
{{system}}
</system>

{{#availability_goal}}
<availability_goal>
{{availability_goal}}
</availability_goal>
{{/availability_goal}}

{{#budget}}
<budget>
{{budget}}
</budget>
{{/budget}}

1. If a repository is available, read infrastructure code, deployment configuration and service configuration to find actual instance counts, zones, data stores and external endpoints. Say what you read and what you could not see.
2. Walk the request path and the operations path (deploy, secrets, DNS, certificates, monitoring, backups, on-call people) and list every component whose single failure stops users or stops you from recovering.
3. Look for shared fate: replicas in one zone, shared storage, one configuration push to all instances, one account or region, a single upstream provider.
4. For each SPOF, record likelihood, blast radius, detection (would you know quickly), and current recovery time.
5. Propose the fix for each: redundancy, automated failover, a degraded mode, a documented manual procedure, or explicit acceptance, with relative cost and effort.
6. Order the plan by risk reduction per effort and fit it to the budget.
7. Define a failover test per fix: how to trigger the failure safely, what to observe, and the pass condition. Never propose testing in production without a controlled plan and approval.
</task>

<constraints>
- Do not count a redundant component as removing a SPOF unless failover has been tested or a test is planned.
- Include people and processes (single maintainers, manual renewals) as well as infrastructure.
- Do not invent instance counts or provider guarantees; mark what was not visible.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Top three risks in at most 5 lines.
## SPOF register
Table: component, type (infrastructure, data, third party, process, person), likelihood, blast radius, detection, current recovery time.
## Plan
Table: fix, SPOFs removed, effort, cost, order.
## Failover tests
Numbered, each with trigger, observation and pass condition.
## Accepted risks
## Open questions
Numbered.
</output_format>

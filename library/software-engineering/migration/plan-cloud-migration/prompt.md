---
schema: 1
id: plan-cloud-migration
kind: prompt
title: Plan a cloud migration
description: Plans moving workloads from on-premises or another cloud, classifying each with the 6 Rs and ordering waves by dependency and risk, with cutover, rollback and cost checks.
category: migration
version: 1.0.0
status: incubating
stage: [plan]
role: [devops-engineer, architect, engineering-manager, sre]
stack: []
requires: [none]
inputs: [dataset, document, text, config]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [cloud-migration, six-rs, lift-and-shift, migration-waves, cutover, datacenter-exit]
pairs_with:
  personas: [software-architect, devops-engineer]
  prompts: [plan-incremental-migration, migrate-database-engine, reduce-cloud-spend, plan-disaster-recovery]
args:
  - name: inventory
    description: The workloads to move, with for each what you know - purpose, owner, tech stack, OS, data size, dependencies, criticality, licensing and current hosting.
    type: text
    required: true
  - name: target_cloud
    description: The destination, for example AWS, Azure, Google Cloud, or a specific region or landing zone.
    type: string
    required: true
  - name: constraints
    description: Fixed constraints, such as a data-centre contract end date, compliance and data residency, downtime windows, budget, team skills and licences that do not move.
    type: text
  - name: timeline
    description: Target dates or the time available, for example "exit the data centre by June 2027".
    type: string
output_contract:
  format: markdown
  sections: [Summary, Workload decisions, Dependency map, Waves, Cutover and rollback, Cost checks, Prerequisites, Risks and open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Cloud migrations overrun for the same reasons: an inventory that misses the dependencies (a nightly job on a forgotten server, a hard-coded IP, a shared database), latency-sensitive pairs split across the data centre and the cloud for months, every workload treated as "lift and shift" or every workload treated as a rewrite, no landing zone ready before wave one, cutovers with no tested rollback, and a cloud bill nobody modelled. The standard frame is the "6 Rs" for each workload: rehost (lift and shift), replatform (lift and reshape, such as moving to a managed database), repurchase (replace with SaaS), refactor or re-architect, retire, and retain (keep where it is for now); AWS adds a seventh, relocate, for moving virtualised estates as-is. Waves are ordered by dependencies and risk: start with low-risk workloads that build the team's skills and the platform, and move tightly coupled groups together.
</context>

<task>
Plan the migration of this estate to {{target_cloud}}.

<inventory>
{{inventory}}
</inventory>

{{#constraints}}
Constraints:
{{constraints}}
{{/constraints}}
{{#timeline}}
Timeline: {{timeline}}
{{/timeline}}

1. Check the inventory for gaps that block planning: missing owners, dependencies, data sizes, criticality or licensing. List them, and continue with labelled assumptions; if the inventory is too thin to plan at all, ask for the minimum fields and stop.
2. Classify each workload with one of the Rs and a one-line reason. Prefer retire for anything with no clear owner or usage evidence (to be confirmed), retain for workloads blocked by licensing, hardware or compliance, rehost when the deadline dominates, replatform when a managed service removes real operational work, and refactor only where there is a business case beyond the move. Flag licences that may not transfer (for example per-core database or OS licences) for checking.
3. Map dependencies: which workloads call which, share databases or file systems, or depend on on-premises services (directory, DNS, mainframe, file shares). Identify groups that must move together because of latency or chatty traffic, and the hybrid connectivity needed in the meantime (VPN or dedicated interconnect, DNS, identity).
4. Plan waves: wave 0 for the landing zone (accounts or subscriptions, networking, identity, security baselines, logging, backup, cost tagging) and a pilot; then waves ordered by dependency groups, rising risk and criticality, with the most critical systems after the team has done several cutovers. Give each wave its workloads, R, rough duration, entry criteria and exit criteria. Fit the waves to the timeline and say plainly if it is not realistic.
5. For each wave, define cutover and rollback: data migration method (replication, backup and restore, offline transfer for large volumes, with the transfer time calculated from data size and bandwidth), the freeze window, the cutover steps, validation checks, the go or no-go criteria, how traffic switches (DNS with lowered TTLs ahead of time, load balancer weights), and the rollback trigger, steps and point of no return.
6. Add cost checks: what to estimate before each wave with the provider's pricing calculator (compute right-sized from measured utilisation rather than on-premises allocation, storage, data transfer and egress, licensing, the period of running both environments in parallel), and post-migration checks to compare actual against estimate.
7. List prerequisites and organisational work: skills and training, runbooks, monitoring in the new environment, security and compliance sign-offs, and decommissioning of old hardware and contracts.
</task>

<constraints>
- Do not invent prices, instance types, service limits or data sizes. Show how to estimate them and mark every number you did not get as an assumption.
- Do not recommend refactoring a workload just because it is moving; tie every refactor to a stated benefit.
- Do not split tightly coupled, latency-sensitive workloads across environments without stating the latency risk and the mitigation.
- Use {{target_cloud}}'s own service names where you are confident of them; otherwise describe the service generically.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Number of workloads per R, number of waves, the critical path and whether the timeline is realistic, in at most 6 lines.
## Workload decisions
Table: workload, owner, R, reason, target service, data size, criticality, notes.
## Dependency map
A Mermaid flowchart of the main dependencies and move-together groups, then the hybrid connectivity needed.
## Waves
Table: wave, workloads, duration, entry criteria, exit criteria.
## Cutover and rollback
Per wave: data method with transfer-time arithmetic, cutover steps, validation, go or no-go criteria, rollback trigger and point of no return.
## Cost checks
Checklist before and after each wave.
## Prerequisites
Checklist.
## Risks and open questions
Numbered, each with an owner and what it affects.
</output_format>

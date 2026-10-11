---
schema: 1
id: map-system-ownership
kind: prompt
title: Map system ownership across teams
description: Builds a map of which team owns each service, job, repo, database and dashboard, finds orphaned or disputed systems, and proposes owners and a way to keep the map current.
category: planning
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [engineering-manager, sre, tech-lead, architect]
stack: []
requires: [none]
inputs: [repo, config, notes, text]
output: [table, report, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [service-catalog, ownership, orphaned-services, codeowners, system-inventory, reorg]
pairs_with:
  prompts: [reduce-bus-factor, plan-team-split, write-ownership-handover-doc]
args:
  - name: inventory
    description: What you have of the system list, for example a repo list, service catalog export, CODEOWNERS files, cloud resource list, on-call schedules, alert routing, and the current teams.
    type: text
    required: true
  - name: trigger
    description: Why you are doing this now, for example a reorg, an incident with no owner, an audit, a cost review.
    type: string
output_contract:
  format: markdown
  sections: [Ownership map, Orphaned systems, Disputed or split ownership, Proposed owners, What owning means, Keeping it current]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Ownership gaps show up during incidents ("who owns this cron job?"), audits and reorganisations. The sources disagree: the repo's CODEOWNERS names a team that was dissolved, alerts route to a person who left, the cloud account is tagged with a project nobody remembers, and the on-call schedule covers services but not the batch jobs and databases behind them. A useful map reconciles these sources, records ownership by team (never by individual), and treats "who is paged when it breaks" as the real test of ownership. Orphaned systems are often the riskiest: unpatched, unmonitored, and still in the critical path.
</context>

<task>
Inventory: {{inventory}}
{{#trigger}}Trigger: {{trigger}}{{/trigger}}

1. If you can read repositories or configuration, check CODEOWNERS, service manifests, alert routing and deployment configs to fill gaps, and say which source each fact came from. Do not change any file.
2. Build the map: every system (services, scheduled jobs, queues, databases, data pipelines, repos, dashboards, cloud accounts) with the owning team according to each source, the on-call rotation that is paged, criticality if known, and status (active, deprecated, unknown).
3. Find orphaned systems: no owning team, owner is a dissolved team or a departed person, or no one paged when it fails.
4. Find disputed or split ownership: sources disagree, two teams claim it, or code and runtime are owned by different teams.
5. Propose an owner for each gap, with a reason (who changes it most, who depends on it, who has the knowledge), and flag systems that may be candidates for decommissioning instead.
6. Define what owning means: on-call, patching and upgrades, cost, documentation, deprecation decisions.
7. Keeping it current: one source of truth, ownership checked on reorgs and team changes, a quarterly review, and alerts on systems with no owner.
</task>

<constraints>
- Do not invent systems or owners; mark unknowns as unknown and list how to find out.
- Ownership is by team, not individual.
- Proposals are for discussion with the teams; do not present them as decisions.
{{> output/uncertainty}}
</constraints>

<output_format>
## Ownership map
Table: System | Type | Owner per source | Paged rotation | Criticality | Status.
## Orphaned systems
## Disputed or split ownership
## Proposed owners
Table: System | Proposed team | Reason | Or decommission?
## What owning means
## Keeping it current
</output_format>

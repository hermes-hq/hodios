---
schema: 1
id: plan-disaster-recovery
kind: prompt
title: Plan backups and disaster recovery
description: Writes a backup and disaster-recovery plan with RPO and RTO targets, dependency order, restore drills and owner checklists. Use when a system has backups nobody has restored, or no plan at all.
category: devops
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [sre, devops-engineer, architect, engineering-manager]
stack: []
requires: [none]
inputs: [spec]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [disaster-recovery, backups, rpo-rto, restore-drills]
pairs_with:
  prompts: [write-runbook]
args:
  - name: system
    description: Components, data stores and their sizes, regions and accounts, third-party dependencies, and how it is deployed today.
    type: text
    required: true
  - name: rpo
    description: Maximum acceptable data loss, e.g. "15 minutes"; leave empty to get proposed targets.
    type: string
  - name: rto
    description: Maximum acceptable time to restore service, e.g. "4 hours"; leave empty to get proposed targets.
    type: string
output_contract:
  format: markdown
  sections: [Summary, Inventory, Scenarios, Backup policy, Recovery order, Drills, Owner checklists, Open risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Disaster-recovery plans fail on the things nobody listed: backups that were never restored, replicas that faithfully copied the corruption, the secrets manager or the backup credentials living in the region that went down, a DNS change only one person knows how to make. A useful plan is specific to the system, measured in minutes and data lost, and proven by drills.
</context>

<task>
Write a backup and disaster-recovery plan for:
{{system}}
Recovery point objective: {{#rpo}}{{rpo}}{{/rpo}}
Recovery time objective: {{#rto}}{{rto}}{{/rto}}

1. If an objective above is blank, propose per-tier targets with reasoning and mark them "proposed, needs business sign-off". Do not present them as decided.
2. Inventory every component and data store. Assign each a tier, and list what it depends on to start: identity, secrets, DNS, certificates, container registry, CI/CD, third-party APIs.
3. Cover these scenarios separately, because each needs a different answer: accidental deletion, logical corruption (replication copies it, so point-in-time recovery is required), loss of a zone, loss of a region, compromised cloud account or ransomware, and a critical vendor outage.
4. For each data store, specify the backup method, frequency (it must meet the RPO), retention, encryption and where the key lives, and isolation: a separate account or immutable storage so an attacker with production access cannot delete backups.
5. Choose a recovery strategy per tier (backup and restore, pilot light, warm standby or active-active) and justify it against the RTO and cost.
6. Write the recovery order from the dependency graph: what must be up before what, with an estimated time per step and a total compared against the RTO.
7. Define restore drills: what is restored, how often, success criteria (measured RPO and RTO), and who signs off.
</task>

<constraints>
- Replication and high availability are not backups. Do not count them toward recovery from corruption or deletion.
- A backup is only counted as working once a restore of it has been tested. Mark untested backups as risks.
- Use the details given. Where a fact is missing (sizes, regions, owners), write a clearly marked placeholder and list it under Open risks rather than inventing it.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
The targets (stated or proposed), the strategy per tier, and the three biggest gaps today.
## Inventory
A table: component, tier, data store (yes/no), depends on, current backup, gap.
## Scenarios
One short subsection per scenario: detection, decision owner, recovery path, expected data loss and downtime.
## Backup policy
A table: data store, method, frequency, retention, isolation, encryption key location, last tested restore.
## Recovery order
Numbered steps with estimated durations and a total against the RTO.
## Drills
A table: drill, frequency, success criteria, owner.
## Owner checklists
One checklist per role (for example incident lead, database owner, platform owner).
## Open risks
Bullets: missing information and unproven assumptions.
</output_format>

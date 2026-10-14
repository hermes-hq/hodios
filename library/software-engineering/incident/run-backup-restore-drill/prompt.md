---
schema: 1
id: run-backup-restore-drill
kind: prompt
title: Run a backup restore drill
description: Runs a test restore of a production backup into an isolated environment, timing it against the recovery time objective, checking data integrity and recording the gaps found.
category: incident
version: 1.0.0
status: incubating
stage: [operate, verify]
role: [sre, devops-engineer, dba]
stack: []
requires: [none]
inputs: [text, config]
output: [plan, checklist, report]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [backups, restore-test, rto, rpo, disaster-recovery]
pairs_with:
  prompts: [plan-disaster-recovery, automate-postgres-backups, plan-game-day]
  personas: [site-reliability-engineer]
args:
  - name: system
    description: The data store or system to restore (database, object storage, file server, a whole service), its size, backup method and schedule, where backups are stored, and the RTO and RPO targets if any.
    type: text
    required: true
  - name: constraints
    description: Where the restore can run (isolated account, staging), data handling rules for production data, who must take part, and the time available.
    type: text
output_contract:
  format: markdown
  sections: [Drill plan, Restore steps, Integrity checks, Timing log, Findings, Report]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a team prove they can restore. A backup that has never been restored is a hope, not a backup. Drills find the real failures: backups that are empty or truncated, encryption keys or credentials only the departed engineer had, a restore that takes 14 hours against a 1-hour objective, point-in-time recovery missing the log segments it needs, a restored database that the app cannot use (missing roles, extensions, configuration), and backups stored in the same account an attacker or a mistake could wipe. The drill measures time end to end, from "we decide to restore" to "the service works on the restored data", not just the copy. It also checks the recovery point: how old the newest restorable data is. The drill must never touch production: restore into an isolated environment, with production data handled under the same rules as production, and torn down afterwards.
</context>

<task>
<system>
{{system}}
</system>
{{#constraints}}
<constraints_given>
{{constraints}}
</constraints_given>
{{/constraints}}

1. Drill plan: scope (which backup, which point in time), the isolated target, participants and roles, success criteria (restore within the RTO, data no older than the RPO, integrity checks pass), and a stop rule. Ask the user to confirm the target is isolated from production (separate network, credentials, no outbound jobs or emails) before any step.
2. Restore steps for this system, written as a runbook a person follows, including finding the right backup, getting keys and credentials, provisioning the target, restoring base data and logs to the chosen point, and starting the app or a test client against it. Mark each step that needs elevated access. Have the user record start and end times for each.
3. Integrity checks: row or object counts against the source at the backup time, checksums where the tool supports them, latest record timestamps (achieved RPO), application-level smoke tests, and engine consistency checks.
4. Timing log: a table to fill as the drill runs, with total time against the RTO.
5. Findings: each gap found, severity, owner placeholder and fix; include gaps in documentation and access, not only in tooling.
6. Report: a short summary for stakeholders stating pass or fail against the targets, and the date of the next drill.
7. Teardown: delete the restored copy and its credentials, and confirm.
</task>

<constraints>
- Never restore over or into a production system as part of a drill; the target must be isolated, and the user confirms this first.
- Make sure the restored environment cannot send emails, webhooks, payments or jobs to real users or partners; say how to block outbound traffic.
- Treat restored data with production data rules; do not suggest copying it to laptops or shared drives.
- Do not invent tool flags; use the backup tool's documented commands or placeholders.
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Drill plan
Scope, target, roles, success criteria, stop rule.

## Restore steps
Numbered runbook with access notes.

## Integrity checks
Check | How | Expected.

## Timing log
Table: Step | Start | End | Duration | Notes.

## Findings
Table: Gap | Severity | Owner | Fix.

## Report
Pass or fail against RTO and RPO, summary, next drill date.
</output_format>

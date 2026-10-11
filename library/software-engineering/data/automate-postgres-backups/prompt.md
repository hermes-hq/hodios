---
schema: 1
id: automate-postgres-backups
kind: prompt
title: Automate Postgres backups with point-in-time recovery
description: Sets up automated Postgres backups with point-in-time recovery using pgBackRest, WAL-G or managed snapshots, with retention, encryption, off-site copies and a scheduled restore test.
category: data
version: 1.0.0
status: incubating
stage: [operate]
role: [dba, sre, devops-engineer, backend-engineer]
stack: [postgres]
requires: [repo-read, file-write]
inputs: [config, text]
output: [config, plan, checklist]
risk: edits-files
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [pgbackrest, wal-g, point-in-time-recovery, wal-archiving, restore-testing, backup-retention]
pairs_with:
  prompts: [plan-disaster-recovery, upgrade-database-major-version]
  personas: [database-administrator]
args:
  - name: setup
    description: Postgres version, hosting (self-run VM, Kubernetes, managed service), database size and daily change volume, and where backups could be stored (object storage, another region).
    type: text
    required: true
  - name: targets
    description: How much data you can afford to lose (RPO) and how quickly you must be back (RTO), plus any retention or compliance requirement.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Approach, Configuration, Schedule and retention, Security, Restore procedure, Restore test, Monitoring]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A nightly `pg_dump` loses up to a day of data, takes hours to restore on a large database, and is often never tested. Point-in-time recovery combines periodic physical base backups with continuous WAL archiving, so you can restore to any moment, for example one minute before a bad `DELETE`. pgBackRest and WAL-G are the common tools on self-run servers: full, differential or incremental backups to object storage, parallel compression, encryption, and checks that archiving works. Managed services provide automated snapshots plus PITR within a retention window, but the window is often short, the backups usually live in the same account, and a deleted instance can take its automated backups with it. A backup is only proven by a restore: teams that never restore discover missing WAL segments, wrong permissions or a 14-hour restore time during the incident. `pg_dump` still has a place for logical copies of single databases and for version upgrades.
</context>

<task>
Setup: {{setup}}
Targets: {{targets}}

1. Choose the approach for this hosting: pgBackRest or WAL-G for self-run (pick one and say why), the provider's PITR plus an extra independent copy for managed services, and where `pg_dump` adds value.
2. Write the configuration: archive settings in Postgres (`archive_mode`, `archive_command` or the tool's equivalent, `wal_level`), the tool's config file with repository, compression, parallelism and encryption, and the scheduled jobs in whatever the project uses (systemd timers, cron, Kubernetes CronJob, operator settings). Put files where the repo keeps infrastructure config; do not apply them.
3. Schedule and retention from the RPO and RTO: full and incremental cadence, WAL retention to cover the PITR window, an off-site or cross-account copy, and immutability or object lock if ransomware is a concern.
4. Security: encryption at rest with the key kept outside the backup location, least-privilege credentials for the backup user and storage bucket.
5. Restore procedure: exact steps to restore to a point in time on a new host, how to choose the target time or transaction, and how to promote it.
6. Restore test: an automated or scheduled drill that restores the latest backup to a scratch instance, runs sanity queries (row counts, latest timestamps), records the restore duration against the RTO, and alerts on failure.
7. Monitoring: alerts for failed backups, archive failures or lag, backup age and repository size.
</task>

<constraints>
- Write configuration and runbooks only; do not run backups, restores or change servers. The user applies them.
- Never place encryption keys or storage credentials in the repo; reference a secret store.
- State that backups not restore-tested are unproven.
- Mark tool options and provider limits that depend on version as to verify.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Approach
Choice and reasons in a few lines.

## Configuration
Config files with paths.

## Schedule and retention
Table: what | how often | kept for | where.

## Security
Bullets.

## Restore procedure
Numbered runbook.

## Restore test
Job definition and pass criteria.

## Monitoring
Alerts with thresholds.
</output_format>

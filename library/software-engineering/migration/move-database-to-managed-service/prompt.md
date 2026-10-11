---
schema: 1
id: move-database-to-managed-service
kind: prompt
title: Move a self-hosted database to a managed service
description: Moves a self-hosted Postgres or MySQL database to a managed service such as RDS or Cloud SQL, checking extensions and privileges, then cutting over with replication and minimal downtime.
category: migration
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [dba, devops-engineer, backend-engineer]
stack: [postgres, mysql]
requires: [repo-read, file-write, shell]
inputs: [config, text]
output: [plan, checklist]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [managed-database, logical-replication, database-cutover, rds, cloud-sql]
pairs_with:
  prompts: [upgrade-database-major-version, migrate-database-engine, plan-cloud-migration, automate-postgres-backups]
  personas: [migration-engineer]
args:
  - name: database
    description: Engine and version, size, write rate, extensions, replication or HA setup, and where the app runs relative to the target.
    type: text
    required: true
  - name: target
    description: The managed service and region, and the acceptable downtime.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Compatibility check, Migration method, Steps, Cutover, Rollback, After the move]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Managed databases look like the same engine, but they remove superuser access, allow only a listed set of extensions and versions, restrict some parameters, require TLS by default and manage backups and failover their own way. Those differences decide the method. For Postgres, logical replication gives a short cutover, but it does not copy DDL, sequence values or large objects, and every replicated table needs a primary key or replica identity; sequences must be set at cutover or inserts fail with duplicate keys. For MySQL, binlog replication with GTIDs into the managed instance does the same job. Cloud migration services wrap these mechanisms and check prerequisites. Dump and restore is simplest when the downtime window covers it, and a rehearsal measures the time. Roles, grants and passwords are not part of a database-level dump. Latency changes if the app stays where it is and the database moves, which can turn chatty request paths slow. After cutover, backups, point-in-time recovery, maintenance windows and parameters must be checked, not assumed.
</context>

<task>
Database: {{database}}
Target: {{target}}

1. Collect the facts: version, extensions in use, custom parameters, roles and grants, tables without primary keys, large objects, triggers and scheduled jobs inside the database, total size and write rate. Give read-only queries for the user to run if needed.
2. Compare with the target service and list blockers (unsupported extensions, superuser-only features, version gaps) with options.
3. Choose the method from downtime tolerance and size, and say why.
4. Write the steps: create the target with matching parameters, recreate roles and grants, set up replication or the migration service, monitor lag, and verify with counts and sample checksums.
5. Write the cutover: freeze writes, wait for zero lag, sync sequences, switch application connection settings (with TLS), smoke test, and keep the old server running and untouched.
6. List after-move checks: backup and point-in-time recovery tested by a restore, monitoring and alerts, connection limits, maintenance window, and query latency from the app.
</task>

<constraints>
- Do not run commands that change either database; provide them for the user with what to check first.
- Do not shut down or reconfigure the source until the rollback window has passed and the user confirms.
- Do not state a service supports an extension or version without telling the user to confirm in its current documentation.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Compatibility check
Version, extensions, parameters, roles and features compared with the managed service, with blockers.
## Migration method
Chosen method (replication, migration service, dump and restore) and why.
## Steps
Ordered setup, sync and verification steps.
## Cutover
Write freeze, lag check, sequence sync, connection switch, smoke tests.
## Rollback
How to return to the old server and until when.
## After the move
Backups, monitoring, maintenance windows and parameter settings to confirm.
</output_format>

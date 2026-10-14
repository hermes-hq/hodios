---
schema: 1
id: set-up-server-backups
kind: prompt
title: Set up encrypted backups for a server
description: Sets up scheduled, encrypted, off-site backups of a server's files and app data with restic or Borg, with database dumps first, retention, ransomware-resistant storage, monitoring and a restore test.
category: devops
version: 1.0.0
status: incubating
stage: [operate]
role: [devops-engineer, sre, backend-engineer]
requires: [repo-read, file-write, shell]
inputs: [text, config]
output: [config, checklist]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [backups, restic, borg, retention, restore-test]
pairs_with:
  prompts: [automate-postgres-backups, run-backup-restore-drill, plan-disaster-recovery]
args:
  - name: server
    description: What the server runs and what must be recoverable, for example "a VPS with Nextcloud in Docker, a MariaDB database and nginx config".
    type: text
    required: true
  - name: notes
    description: "Operating system, data size and daily change, preferred tool (restic or Borg), backup destination (object storage, another server, a storage box), recovery point and time goals, budget."
    type: text
output_contract:
  format: markdown
  sections: [What to back up, Setup, Schedule and retention, Monitoring, Restore test]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A backup that has never been restored is a hope, not a backup. restic and Borg both give encrypted, deduplicated, incremental snapshots; restic writes directly to object storage and many other backends, Borg works over SSH to a server with Borg installed and supports an append-only mode on that server. The usual mistakes: copying a live database's data files, which produces a corrupt copy, instead of dumping it first (`pg_dump`, `mysqldump --single-transaction`) or using a filesystem snapshot; backing up to the same machine or provider account only, which fails the 3-2-1 rule (three copies, two media, one off-site); leaving credentials on the server that can also delete the backups, so ransomware or an attacker removes them too (use append-only mode, object lock, or credentials that cannot delete, and run pruning from elsewhere); storing the only copy of the repository password or key on the server being backed up; forgetting what is not in the data directory (`/etc`, crontabs, TLS certificates, Docker Compose files and volumes, the list of installed packages); and having no alert when the job silently stops. Retention is set with `forget --keep-daily/--keep-weekly/--keep-monthly` plus `prune` (restic) or `borg prune` and `borg compact`. Integrity checks (`restic check`, `borg check`) and a periodic real restore catch corruption.
</context>

<task>
Set up backups for {{server}}.
{{#notes}}
Notes:
{{notes}}
{{/notes}}

1. Ask for or gather (with read-only commands the user runs) the data locations: app data and Docker volumes, databases, `/etc` and service config, crontabs and timers, certificates, home directories, and the installed package list. Estimate size and daily change.
2. Write the "what to back up" list with how each item is captured consistently: database dumps before the snapshot, application maintenance mode or a filesystem snapshot for apps that cannot be copied live, plain files otherwise. List exclusions (caches, temp, `node_modules`, logs if not needed).
3. Write the setup for the chosen tool: repository initialisation at the off-site destination, a password or key stored outside the server (password manager or second location), credentials scoped so the server cannot delete old snapshots, and a backup script that dumps databases, runs the backup with exclusions, and exits non-zero on any failure.
4. Schedule it with a systemd timer (with `Persistent=true`) or cron, and set retention with the tool's forget and prune commands, run from a place that holds delete rights.
5. Add monitoring: a dead man's switch ping on success, an alert on failure or when no ping arrives, and a periodic integrity check.
6. Write the restore test: restore a single file, restore a database dump into a scratch database and check row counts, and once a quarter restore the whole server to a fresh machine and time it against the recovery time goal.
</task>

<constraints>
- Do not run commands that delete or prune data, or change the server, without the user's confirmation.
- Never store the repository password or key only on the server being backed up.
- Do not back up live database files without a dump or a consistent snapshot.
- Do not quote storage prices; explain the cost drivers (stored size, egress on restore).

{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## What to back up
Table: item, location, capture method, size estimate.
## Setup
Repository init, credentials, backup script, exclusions, with commands and file contents.
## Schedule and retention
Timer or cron, retention policy, where pruning runs.
## Monitoring
Success ping, failure alerts, integrity checks.
## Restore test
Steps for file, database and full-server restores, with what success looks like.
</output_format>

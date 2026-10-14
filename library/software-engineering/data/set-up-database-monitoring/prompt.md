---
schema: 1
id: set-up-database-monitoring
kind: prompt
title: Set up database monitoring and alerts
description: Sets up dashboards and alerts for Postgres or MySQL covering saturation, slow queries, locks, long transactions, replication lag, disk growth and backup age, with runbook notes.
category: data
version: 1.0.0
status: incubating
stage: [operate]
role: [dba, sre, backend-engineer]
stack: [postgres, mysql]
requires: [repo-read, file-write]
inputs: [repo, config, text]
output: [config, checklist, report]
risk: edits-files
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [database-alerts, grafana-panels, replication-lag, long-transactions, disk-growth, postgres-exporter]
pairs_with:
  prompts: [design-alerting-rules, find-worst-queries-in-workload, find-lock-contention, automate-postgres-backups]
  personas: [database-administrator]
args:
  - name: database
    description: Engine and version, hosting (self-run, RDS, Cloud SQL and so on), topology (primary, replicas, pooler) and data size.
    type: string
    required: true
  - name: monitoring_stack
    description: What the team already uses for metrics and alerts (Prometheus and Grafana, Datadog, CloudWatch, a managed console) and where alerts go.
    type: string
    required: true
  - name: concerns
    description: Optional. Past incidents or worries, such as running out of disk, connection storms, replication lag or a vacuum that never finishes.
    type: text
output_contract:
  format: markdown
  sections: [Signals to collect, Collection setup, Alerts, Dashboard, Runbook notes, Gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Database outages usually announce themselves hours or days in advance, and the default host metrics (CPU, memory) miss most of the warnings. The signals that predict trouble are: connections in use against the limit; disk space and its growth rate, so the alert fires on time-to-full rather than at 95 percent; long-running and idle-in-transaction sessions, which hold locks and, in Postgres, stop vacuum from cleaning up; lock waits and deadlocks; replication lag and replication slots holding WAL; transaction ID age approaching wraparound in Postgres; checkpoint and redo pressure; query latency and the top queries by total time from `pg_stat_statements` or the MySQL Performance Schema; and the age of the last successful backup. Cache hit ratio alone is a weak signal. Alerts should be few and actionable: page only for things that need a human now (disk will fill within hours, primary down, replica lag breaking reads, backups missing for more than a day), and send the rest to a ticket queue. Thresholds come from the real baseline, not generic numbers. The monitoring login needs read-only rights (the `pg_monitor` role in Postgres, `PROCESS` and `performance_schema` select in MySQL), and query text in dashboards can contain personal data, so it should be normalised or restricted.
</context>

<task>
Database: {{database}}
Monitoring stack: {{monitoring_stack}}
{{#concerns}}Concerns: {{concerns}}{{/concerns}}

1. Read the repo for existing monitoring config (exporter configs, alert rule files, dashboards as code, Terraform for managed alarms) and follow its layout and naming. Do not duplicate alerts that already exist; list them.
2. List the signals to collect for this engine and topology, where each one comes from (exporter metric, system view, managed service metric) and why it matters.
3. Collection setup: the exporter or agent configuration, the monitoring login with least-privilege grants, and the extensions or settings needed (`pg_stat_statements`, Performance Schema, slow query log), noting which need a restart.
4. Alerts: for each, the condition, threshold or rate, duration, severity (page or ticket), and the first thing the responder should check. Base thresholds on a baseline and say where the user must adjust them.
5. Dashboard: panels grouped as health, saturation, query performance, replication and storage, with the query or metric for each.
6. Runbook notes: a few lines per paging alert on how to confirm and the safe first actions. Mark any action that kills sessions, changes settings or fails over as needing human confirmation.
7. Write the config files in the repo's existing locations. Do not apply them to shared environments or change database settings yourself.
</task>

<constraints>
- Use metric names only from the exporter or service the user has, and mark names you are not sure of as to verify against that exporter's documentation.
- No alert without a clear action; drop or downgrade ones that would only add noise.
- Never grant the monitoring login write or superuser rights.
- Do not expose raw query text with parameters on shared dashboards without noting the personal-data risk.
- Do not restart, reconfigure or kill sessions on any database.
{{> guardrails/scope-discipline}}
{{> output/uncertainty}}
</constraints>

<output_format>
## Signals to collect
Table: signal | source | why it matters.

## Collection setup
Config and grants, with file paths and restart notes.

## Alerts
Table: alert | condition | duration | severity | first check. Then the rule files.

## Dashboard
Panels by group with their metric or query.

## Runbook notes
Short notes per paging alert.

## Gaps
Bullets: what could not be monitored with the current stack and what would close it.
</output_format>

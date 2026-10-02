---
schema: 1
id: migrate-database-engine
kind: prompt
title: Plan a database engine migration
description: Plans a move between database engines, such as MySQL to Postgres, covering incompatibilities, data copy, cutover, verification and rollback. Use before committing to a migration date.
category: migration
version: 1.0.0
status: incubating
stage: [plan]
role: [backend-engineer, dba, architect, data-engineer]
stack: [sql]
requires: [none]
inputs: [schema, spec]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [data-migration, cutover, cdc, zero-downtime]
args:
  - name: source
    description: Source engine and version, e.g. "MySQL 5.7 on RDS".
    type: string
    required: true
  - name: target
    description: Target engine and version, e.g. "PostgreSQL 16 on Cloud SQL".
    type: string
    required: true
  - name: data_size
    description: Total size, largest tables, and write rate at peak.
    type: string
  - name: downtime_budget
    description: Acceptable write downtime at cutover, e.g. "5 minutes", "a 2-hour maintenance window".
    type: string
output_contract:
  format: markdown
  sections: [Summary, Inputs needed, Incompatibilities, Approach, Phases, Cutover runbook, Verification, Rollback, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Engine migrations rarely fail on the bulk copy. They fail on semantics that differ quietly: case-insensitive comparisons that become case-sensitive, zero dates and unsigned integers with no equivalent, sequences not reset after the load, different default isolation levels, query plans that change for the worst queries, and a cutover with no tested way back. A credible plan finds those differences before the copy and makes the cutover boring.
</context>

<task>
Plan a migration from {{source}} to {{target}}.
{{#data_size}}Data size and write rate: {{data_size}}
{{/data_size}}{{#downtime_budget}}Downtime budget: {{downtime_budget}}
{{/downtime_budget}}

1. If the data size or the downtime budget is not stated above, or you do not have the schema, ask for them under "Inputs needed" and write the rest of the plan with each dependent choice labelled as an assumption. Ask also for the features in use (stored procedures, triggers, full-text search, JSON, spatial), the application stack and ORM, and the top queries by load.
2. Audit incompatibilities for this pair of engines: data types (booleans, unsigned integers, date and time zones, zero dates, enums, text and binary sizes), character sets and collations including case sensitivity, auto-increment versus identity or sequences, NULL versus empty-string handling, SQL dialect (upsert, limit, group-by strictness, quoting, functions), procedures and triggers, full-text search, JSON operators, default transaction isolation and locking behaviour, and implicit casts.
3. Choose the copy approach from size and downtime: an offline dump and load when the window allows; otherwise a bulk load followed by change data capture to stay in sync until cutover. Name candidate tools and why. Avoid application dual-writes unless you explain how consistency is guaranteed.
4. Phase the work: schema conversion, a test load, application changes behind a switch, performance testing of the top queries on the target, a rehearsal of the full cutover, then production.
5. Write the cutover runbook: stop or freeze writes, drain replication lag to zero, verify, reset sequences, switch connections, smoke test, decision point. Give each step an owner role and duration, and compare the total to the downtime budget.
6. Verification: row counts per table, checksums per chunk on normalised values, sampled row comparison, and application-level comparison of read results.
7. Rollback: how to return to the source after writes have landed on the target (reverse replication or a replay plan), the triggers for rolling back, and the deadline after which you roll forward instead.
</task>

<constraints>
- Be specific to {{source}} and {{target}}. Do not list incompatibilities that do not apply to this pair.
- Do not invent table names or sizes. Use the information given and label assumptions.
- A cutover without a rehearsed rollback is a risk to state plainly, not a footnote.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Approach, expected downtime, and the top three risks.
## Inputs needed
Bullets, or "None".
## Incompatibilities
A table: area, behaviour in the source, behaviour in the target, action.
## Approach
The copy method and tools, and why.
## Phases
A table: phase, work, exit criteria.
## Cutover runbook
Numbered steps with owner role and duration, plus the go or no-go checks.
## Verification
The checks and their pass criteria.
## Rollback
The mechanism, triggers and deadline.
## Risks
Bullets with mitigations.
</output_format>

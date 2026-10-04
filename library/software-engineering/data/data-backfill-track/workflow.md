---
schema: 1
id: data-backfill-track
kind: workflow
title: Data backfill track
description: Runs a production data backfill in gated steps, from scope and a correctness check to an idempotent batched script, a sample dry run, a throttled tracked run and reconciliation.
category: data
version: 1.0.0
status: incubating
stage: [plan, build, verify, operate]
role: [backend-engineer, data-engineer, dba]
stack: []
requires: [none]
inputs: [text, schema]
output: [plan, code, checklist, report]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
tags: [backfill, batch-processing, idempotency, throttling, reconciliation, production-data]
pairs_with:
  prompts: [plan-zero-downtime-schema-change, write-data-quality-checks]
  personas: [data-engineer, database-administrator]
args:
  - name: backfill_goal
    description: What data must change and why (fill a new column, fix corrupted rows, re-derive values after a bug, copy into a new table), which rows, rough counts, and the deadline.
    type: text
    required: true
  - name: data_store
    description: The database or store and version, how it is hosted, replication or CDC consumers, and the language or tool you will write the script in.
    type: string
    required: true
steps:
  - {id: scope, file: steps/01-scope-and-check.md, stage: plan, gate: approve, artifact: "backfill/01-scope.md"}
  - {id: script, file: steps/02-write-script.md, stage: build, gate: approve, artifact: "backfill/02-script.md"}
  - {id: dry-run, file: steps/03-dry-run.md, stage: verify, gate: approve, artifact: "backfill/03-dry-run.md"}
  - {id: run, file: steps/04-run.md, stage: operate, gate: approve, artifact: "backfill/04-run-log.md"}
  - {id: reconcile, file: steps/05-reconcile.md, stage: verify, gate: none, artifact: "backfill/05-reconciliation.md"}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Changes production data at scale without an outage and without making things worse. Backfills go wrong by locking or overloading the primary, flooding replicas and change-data consumers, touching rows the application is changing at the same moment, failing halfway with no way to resume, and finishing with nobody able to prove the result is right. This track defines "correct" before any code, writes a resumable idempotent script, proves it on a sample, runs it under throttling with progress tracking, and reconciles the result. Each step writes one artifact and stops for approval.

<backfill_goal>
{{backfill_goal}}
</backfill_goal>

Data store: {{data_store}}

Rules for every step:
- Use only facts the user gave or confirmed; ask for missing essentials (row counts, table DDL, write rate, consumers, deadline) and mark gaps as [X].
- You prepare scripts, queries and runbooks. The user runs anything against shared or production data; never claim a run happened or invent its output.
- Every write path is idempotent, batched by key ranges, throttled, and resumable from a checkpoint.
- A backup or snapshot that covers the affected rows exists before writing, and there is a written way to undo.
- Say which settings and behaviours are engine-specific and must be verified for this version.
{{> guardrails/scope-discipline}}

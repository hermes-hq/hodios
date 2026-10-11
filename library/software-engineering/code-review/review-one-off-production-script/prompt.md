---
schema: 1
id: review-one-off-production-script
kind: prompt
title: Review a one-off production script
description: Reviews a script or SQL that will run once against production data, such as a backfill, data fix or cleanup, for scope, dry-run, batching, locking, idempotent re-runs, audit and a way back.
category: code-review
version: 1.0.0
status: incubating
stage: [review, operate]
role: [backend-engineer, data-engineer, sre, dba]
requires: [none]
inputs: [file, diff, text]
output: [report, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [backfill, data-fix, production-safety, runbook, batch-updates]
pairs_with:
  personas: [code-reviewer]
  prompts: [review-database-migration, plan-zero-downtime-schema-change, review-sql-query-change]
args:
  - name: script
    description: The script or SQL to be run, in full.
    type: text
    required: true
  - name: purpose
    description: What it should fix or change, how many rows or records you expect it to touch, how and where it will run, and when.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Verdict, Scope check, Findings, Run plan, Undo plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
One-off scripts skip the safety rails normal code gets: no tests, no staged rollout, often run from a laptop with admin credentials. They are a classic source of incidents: a WHERE clause broader than intended, one giant UPDATE that locks a hot table for minutes or fills the replication log, a script that dies halfway and cannot be re-run without doubling its effect, triggers or events that fire for every row and email customers, or a fix with no record of what the data was before. A good review checks the scope against the expected count, insists on a dry run, batching with pauses, idempotency, a before-image for undo, and a named person watching the right metrics while it runs.
</context>

<task>
<script>
{{script}}
</script>

<purpose>
{{purpose}}
</purpose>

1. Restate what the script will do in plain words and compare its selection logic with the stated purpose and expected count. Flag any way it can select more (missing tenant or status filters, NULL handling, joins that fan out) or fewer records than intended.
2. Check safety of execution: a dry-run mode that reports counts and samples without writing, batching by key with a small batch size and a pause, statement and lock timeouts, effect on replicas and replication lag, and running outside peak hours.
3. Check re-runnability: if it stops at any point, can it be run again safely (idempotent updates, a progress marker, skipping already-fixed rows)?
4. Check side effects: triggers, change data capture, events, webhooks, emails, cache entries or search indexes affected, and whether downstream consumers should be paused or told.
5. Check auditability and undo: the before-image saved (a backup table or export of affected rows with keys), a log of what changed, and the exact undo steps.
6. Check credentials and environment: least-privilege access, an explicit environment guard, no secrets in the script, and where it runs.
7. Rate findings: blocker (could change the wrong data, cannot be undone, long locks on hot tables), should-fix, nit.
</task>

<constraints>
- Do not approve a script that writes to production without a way to verify the count first and a way to undo.
- Cite the line for each finding and give corrected code in the same language or SQL dialect.
- Do not assume table sizes or traffic; ask or say what to check.
- At most 10 findings.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: run as is | run after fixes | do not run.
## Scope check
Expected versus likely selected records and the query to count them first.
## Findings
Numbered: severity, line, problem, fix.
## Run plan
Checklist: dry run, backup, batch settings, who runs it, who watches which metric, stop condition.
## Undo plan
Numbered steps.
</output_format>

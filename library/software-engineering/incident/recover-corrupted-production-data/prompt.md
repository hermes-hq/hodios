---
schema: 1
id: recover-corrupted-production-data
kind: prompt
title: Recover from corrupted production data
description: Handles production data corrupted by a bug, bad script or migration - stops the writes, scopes the affected rows, and repairs from backups or history with checks before and after.
category: incident
version: 1.0.0
status: incubating
stage: [operate]
role: [sre, backend-engineer, dba]
stack: []
requires: [none]
inputs: [text, schema, logs]
output: [plan, checklist, summary]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
tags: [data-corruption, point-in-time-recovery, data-repair, backups, blast-radius]
pairs_with:
  prompts: [decide-rollback-or-fix-forward, review-one-off-production-script, write-incident-update, write-postmortem]
  personas: [incident-commander]
args:
  - name: situation
    description: What went wrong (bad deploy, script, migration, sync job), which tables or fields look wrong, examples of good versus bad values, when it started and whether it is still happening.
    type: text
    required: true
  - name: recovery_options
    description: Backups and their times, point-in-time recovery window, audit or history tables, event logs, replicas or analytics copies, and the database engine.
    type: text
output_contract:
  format: markdown
  sections: [Stop the damage, Scope, Recovery source, Repair plan, Verify, Communicate, Summary]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a team repair data a bug or script damaged. The sequence that avoids making it worse: stop new damage, preserve evidence, scope exactly, pick the recovery source, repair in a controlled and reversible way, verify. Experts never restore a whole database over production to fix some rows, because it throws away every good write since the backup. Instead they restore a backup or a point-in-time copy to a separate instance, compute the difference for the affected rows, and repair only those, while keeping legitimate changes users made after the corruption. Scoping is a query, not a guess: the bad deploy's time window, the job's run log, a recognisable bad value pattern, the `updated_at` column (if the bug did not also touch it), or audit tables. Downstream copies matter too: caches, search indexes, data warehouses, emails or invoices already sent from wrong data, and webhooks to partners. Before any repair, snapshot the current state of the affected rows so the repair itself can be undone.
</context>

<task>
<situation>
{{situation}}
</situation>
{{#recovery_options}}
<recovery_options>
{{recovery_options}}
</recovery_options>
{{/recovery_options}}

1. Stop the damage: identify what is still writing bad data and how to stop it (disable the job, turn off the flag, roll back the deploy, revoke the script's access). Confirm the writes stopped before anything else.
2. Preserve: take a snapshot or export of the affected tables now, and note backup retention so the needed backup is not rotated away during the incident.
3. Scope: the query that finds affected rows, with the criteria and their weaknesses; counts by table and by customer; downstream systems that copied or acted on the bad data. If the scope cannot be determined from what is given, ask the one question that would settle it.
4. Recovery source: compare options (point-in-time copy to a separate instance, last good backup, audit or history tables, recomputing from source events) by completeness and time.
5. Repair plan: restore to a separate instance, build a repair set with old value, bad value and the value to write, handle rows users legitimately changed since the corruption, apply in batches inside transactions with a dry run first, and keep the pre-repair snapshot for undo. Have a second person review the repair script.
6. Verify: before-and-after counts, spot checks of known examples, invariants and totals, and downstream resyncs.
7. Communicate: which customers to inform and what they saw, coordinated with support, legal or privacy if personal or financial data was exposed or altered.
</task>

<constraints>
- Never recommend restoring a full backup over the production database to fix partial corruption, unless the user shows the whole database is unusable, and then state the data loss explicitly.
- Every write step is marked, has a dry run, and waits for the user's confirmation. Do not phrase writes as done.
- Do not guess table or column names; use placeholders or what the user gave.
- If personal or financial data may have been exposed to the wrong users, say this may be a reportable breach and that the decision belongs to the organisation's privacy or legal owner.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Stop the damage
Actions and the check that writes stopped.

## Scope
Scoping query or criteria, counts, downstream copies.

## Recovery source
Table: Source | Covers | Time to use | Risk.

## Repair plan
Numbered steps, writes marked.

## Verify
Checks and expected results.

## Communicate
Audiences and points.

## Summary
State now and next decision.
</output_format>

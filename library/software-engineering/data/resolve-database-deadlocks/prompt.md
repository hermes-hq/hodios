---
schema: 1
id: resolve-database-deadlocks
kind: prompt
title: Resolve database deadlocks
description: Diagnoses deadlocks and lock waits from database logs or lock graphs, names the transactions and lock order involved, and fixes them with consistent ordering, shorter transactions, indexes or retries.
category: data
version: 1.0.0
status: incubating
stage: [operate, maintain]
role: [backend-engineer, dba]
stack: [postgres, mysql]
requires: [none]
inputs: [logs, text, file]
output: [report, code]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [deadlocks, lock-waits, lock-ordering, isolation-levels, gap-locks, retry-logic]
pairs_with:
  prompts: [review-database-indexes]
  personas: [database-administrator, concurrency-specialist]
args:
  - name: deadlock_log
    description: The deadlock report or log lines as they are (for example the latest deadlock section of the InnoDB status output, or Postgres "deadlock detected" log entries with details), or lock wait output.
    type: text
    required: true
  - name: database
    description: The engine and version, plus isolation level if changed from the default.
    type: string
    required: true
  - name: code
    description: Optional. The transactions involved - application code or SQL in order - plus the relevant table DDL and indexes.
    type: text
output_contract:
  format: markdown
  sections: [What happened, Root cause, Fixes, Retry policy, How to verify, Open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A backend engineer or DBA is seeing deadlocks or long lock waits on {{database}}. A deadlock is two or more transactions each holding a lock the other needs; the database kills one. Common causes: the same rows updated in a different order by two code paths; a missing index that turns a targeted update into a scan that locks many rows (or, in MySQL InnoDB, gap and next-key locks over ranges); foreign key checks taking shared locks on parent rows; long transactions that hold locks while calling external services; and upserts racing on unique keys. Retrying hides the symptom; the fix is usually a consistent lock order, smaller and shorter transactions, or the right index, with a bounded retry as the safety net.
</context>

<task>
<deadlock_log>
{{deadlock_log}}
</deadlock_log>
{{#code}}
<code>
{{code}}
</code>
{{/code}}

1. Read the report: for each transaction, the statement it was running, the locks it held and the lock it waited for (table, index, lock mode, and rows or ranges if shown), and which one was chosen as the victim. Draw the cycle in one line (T1 holds A, wants B; T2 holds B, wants A).
2. Map statements to code paths if code is given; otherwise say which code to look for (the statements and tables named).
3. Name the root cause from the evidence: inconsistent ordering, a scan due to a missing or unusable index, gap or next-key locking under the current isolation level, foreign key locks, a lock escalation from a broad update, an upsert race, or long transactions. Say how confident you are and what evidence would confirm it.
4. Propose fixes, best first:
   - Lock in a consistent order (for example sort ids before updating many rows, or lock the parent row first with `SELECT ... FOR UPDATE` in every path).
   - Make the transaction smaller and shorter: no network calls or user waits inside it, batch large updates.
   - Add or fix the index so the statement locks only the rows it changes; show the DDL and how to build it online.
   - Change the statement (atomic single-statement update, a proper upsert) or, only if justified, the isolation level for that transaction, with the trade-off stated.
5. Retry policy: retry the whole transaction (not the single statement) on the engine's deadlock or serialisation error code, with a small bounded number of attempts and jittered backoff, and only if the transaction is safe to repeat. Log each retry with a metric.
6. Verification: a reproduction with two sessions running the statements in the conflicting order, deadlock and lock wait metrics before and after, and the settings that log deadlocks and lock waits for future diagnosis (to verify for this engine).
</task>

<constraints>
- Base the diagnosis on the log. If the log is truncated or missing the lock details, say what is missing and how to capture it, and keep conclusions provisional.
- Do not recommend lowering isolation globally or disabling foreign keys to make deadlocks go away.
- Mark engine-specific behaviour you are not sure of to verify for this version.
- Every index or DDL change states its lock impact and how to run it online.
{{> output/uncertainty}}
</constraints>

<output_format>
## What happened
The cycle in one line, then a table: transaction | statement | holds | waits for | victim?

## Root cause
Two to five lines with confidence and evidence.

## Fixes
Numbered, best first, each with code or SQL and its trade-off.

## Retry policy
Code sketch and rules.

## How to verify
Checklist including the two-session reproduction.

## Open questions
Bullets.
</output_format>

---
schema: 1
id: review-transaction-boundaries
kind: prompt
title: Review transaction boundaries in a change
description: Reviews how a change opens, scopes and ends database transactions, finding partial writes, external calls inside transactions, missing rollback and the wrong isolation level.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [backend-engineer, software-engineer]
requires: [none]
inputs: [diff, file]
output: [report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [transactions, isolation-levels, consistency, orm, pull-request]
pairs_with:
  personas: [code-reviewer]
  prompts: [review-sql-query-change, review-diff-for-concurrency-bugs, design-distributed-transaction]
args:
  - name: diff
    description: The change, with file paths, plus the code that starts transactions (decorators, middleware, unit-of-work setup) if it is not in the diff.
    type: text
    required: true
  - name: context
    description: Database engine and default isolation level, ORM or driver, and how transactions are normally opened in this codebase (per request, per service method, explicit).
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Transaction map, Findings, Tests to add]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Transaction bugs show up only under failure or concurrency, which is why they pass review. What experienced reviewers check: where the transaction actually begins and ends (a framework decorator, request middleware or an ORM session can make it wider or narrower than the code suggests); whether two writes that must succeed together are in the same one; whether an HTTP call, email, queue publish or file write happens inside the transaction (it holds locks and connections while waiting, and the side effect cannot be rolled back if the commit fails); whether a message is published before commit so a consumer reads data that is not there yet (use an outbox or after-commit hook); whether an exception is caught inside the transaction and the code carries on with a transaction the database has already aborted; whether nested calls create savepoints or silently join the outer transaction; whether read-check-write logic is safe at the engine's default isolation (Postgres and SQL Server default to read committed, MySQL InnoDB to repeatable read); and whether a long transaction blocks vacuum, migrations or other writers.
</context>

<task>
<diff>
{{diff}}
</diff>

{{#context}}
<context_given>
{{context}}
</context_given>
{{/context}}

1. Build a transaction map: for each code path the change touches, where the transaction begins, every statement and side effect inside it in order, and where it commits or rolls back. If the begin or end is implicit (decorator, middleware, autocommit), find and cite it; if you cannot see it, say so and ask.
2. Check atomicity: writes that must succeed or fail together but run in separate transactions or in autocommit; delete-then-insert or multi-table updates split across commits.
3. Check side effects: network calls, emails, queue publishes, cache writes and file writes inside the transaction; events published before commit; side effects that run even when the transaction rolls back.
4. Check error handling: exceptions swallowed inside the transaction, retries that re-run only part of the work, missing rollback on early return, connection or session leaks on error.
5. Check nesting and propagation: inner functions that open their own transaction, savepoint use, commits inside helpers that end the caller's transaction early.
6. Check isolation and locking: read-then-write decisions (balance checks, uniqueness checks, counters) that can race at the default isolation level, lock order that can deadlock, `SELECT ... FOR UPDATE` missing or held too long, serialization failures not retried.
7. Check duration: loops, batch work or user waits inside one transaction that will hold locks for seconds.
8. For each finding, give the failure or interleaving that breaks it and the smallest fix in the codebase's existing transaction style.
</task>

<constraints>
- Every finding includes a concrete failure point or interleaving (which step fails or which two requests overlap) and the resulting bad state.
- Name the isolation level you assume and why; differences between engines matter.
- Use the transaction helpers the codebase already has; do not introduce a new pattern unless none fits.
- At most 8 findings.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: approve | approve-with-nits | request-changes.
## Transaction map
Per path: begin (where), ordered statements and side effects, end (where).
## Findings
Numbered: severity, `path:line`, failure or interleaving, bad state, fix.
## Tests to add
Bullets: failure-injection or concurrent tests that would catch each finding.
</output_format>

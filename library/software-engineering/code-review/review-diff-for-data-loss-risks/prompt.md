---
schema: 1
id: review-diff-for-data-loss-risks
kind: prompt
title: Review a diff for data loss risks
description: Reviews application code for overwrites, cascading deletes, truncation, upserts that drop fields and lossy conversions that can silently destroy stored data.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [software-engineer, backend-engineer]
requires: [none]
inputs: [diff, schema]
output: [report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [data-integrity, deletes, pull-request, upserts]
pairs_with:
  personas: [code-reviewer]
  prompts: [review-sql-query-change, review-one-off-production-script, review-diff-for-risks]
args:
  - name: diff
    description: The change, with file paths and the code that reads and writes the stored records.
    type: text
    required: true
  - name: schema
    description: Table or document definitions, foreign keys with their ON DELETE rules, column sizes and ORM model definitions.
    type: text
  - name: context
    description: Backups and retention, soft-delete conventions, and which data is irreplaceable (user uploads, ledgers, audit records).
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Write paths, Findings, Recovery check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Data loss in product code rarely looks like a DELETE statement. It looks like a PUT handler that replaces the whole record with a partial payload and nulls the fields the client did not send; an ORM `save()` of a stale object loaded before another request changed it; an upsert whose update clause lists every column, including ones the source does not have; a foreign key with ON DELETE CASCADE that turns "remove a team" into "remove every invoice"; a string silently truncated to the column length by a non-strict database mode; a float column storing money; a JSON blob rewritten from a schema that dropped unknown keys; a "sync" that deletes local rows missing from a remote page that only failed to load; or a file overwritten in place. Each passes tests because tests do not look at the fields they did not touch. The questions that matter: what was in the record before, what is in it after, and can it be recovered.
</context>

<task>
<diff>
{{diff}}
</diff>

{{#schema}}
<schema>
{{schema}}
</schema>
{{/schema}}

{{#context}}
<context_given>
{{context}}
</context_given>
{{/context}}

1. List every write path the change adds or alters: inserts, updates, upserts, deletes, bulk operations, file writes, cache-to-database flushes, sync jobs and serialisation of stored blobs.
2. For each, compare before and after state and check:
   - **Partial overwrite:** full-record replace from a partial input, default values overwriting existing ones, fields missing from a DTO that the save writes as null.
   - **Lost updates:** read-modify-write without a version check or conditional update, stale objects saved after a long operation.
   - **Delete reach:** cascades through foreign keys or ORM relations, deletes keyed on a filter that can be empty or wrong (missing tenant id deletes across tenants), hard deletes where the codebase uses soft delete.
   - **Sync and reconciliation:** deleting or overwriting local records because a remote list is incomplete, paginated, errored or empty.
   - **Lossy conversion:** truncation to column length, precision loss (float money, timestamp precision, integer overflow), encoding loss, unknown JSON fields dropped on round trip, enum values mapped to a default.
   - **Order and atomicity:** delete-then-insert without a transaction, file overwritten before the new content is fully written.
3. For each finding, describe the concrete sequence (request, input or timing) that destroys data, what is lost, and whether it is recoverable from backups, history or audit logs.
4. Give the smallest fix: a patch semantics change, a conditional update, a guard against empty input, RESTRICT instead of CASCADE, a soft delete, a strict mode, a transaction.
</task>

<constraints>
- Every finding states what data is lost and the exact trigger; no general "be careful with deletes".
- Do not assume cascade rules, column sizes or database modes the schema does not show; list them as questions.
- Never suggest running a destructive command or a data fix against a real database as part of the review.
- Severity: critical (irrecoverable loss of user or financial data), high (recoverable only from backup), medium, low. At most 10 findings.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: approve | approve-with-nits | request-changes.
## Write paths
Table: path, operation, records affected, guarded (yes/no).
## Findings
Numbered: severity, `path:line`, trigger, what is lost, recoverable?, fix.
## Recovery check
Bullets: what backups, history or audit trail would restore each loss, and what to confirm before merging.
</output_format>

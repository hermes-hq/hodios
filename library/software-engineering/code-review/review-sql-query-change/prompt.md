---
schema: 1
id: review-sql-query-change
kind: prompt
title: Review SQL queries in a code change
description: Reviews new or changed SQL in application code for wrong results, such as NULL logic, join fan-out, missing tenant filters, unstable pagination, transaction and locking mistakes and injection.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [backend-engineer, software-engineer, dba]
stack: [sql]
requires: [none]
inputs: [diff, schema]
output: [report, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [query-correctness, null-semantics, transactions, pagination, pull-request]
pairs_with:
  personas: [code-reviewer]
  prompts: [optimize-sql-query, review-database-migration, review-pull-request]
args:
  - name: diff
    description: The diff containing the SQL or query builder or ORM code, with the calling code around it.
    type: text
    required: true
  - name: schema
    description: The relevant table definitions with keys, nullability, unique constraints and indexes, and the database engine and isolation level.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Findings, Data assumptions to confirm, Tests to add]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
SQL bugs return plausible wrong answers instead of crashing, so tests on small, tidy fixtures pass. The usual suspects: `NOT IN` with a subquery that can contain NULL returns no rows; `= NULL` never matches; a LEFT JOIN turned into an inner join by a WHERE condition on the right table; joins that fan out one-to-many and inflate SUM or COUNT; `COUNT(column)` versus `COUNT(*)`; `LIMIT/OFFSET` pagination without a unique ORDER BY that skips or repeats rows; a missing tenant or soft-delete filter; read-then-write without a lock or conditional update (lost updates under concurrency); and string-built SQL open to injection. Engine matters: upsert syntax, NULL sorting, case sensitivity, and isolation defaults differ between Postgres, MySQL, SQL Server and SQLite.
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

1. For each query, state in one sentence what it is meant to return or change, and which engine you assume if not given.
2. Check result correctness: NULL semantics (NOT IN, comparisons, aggregates, COALESCE defaults), join types and conditions that drop or duplicate rows, aggregation with fan-out, GROUP BY that hides non-aggregated columns, DISTINCT used to paper over a bad join, date and time zone boundaries in range filters (inclusive versus exclusive), and case or collation in comparisons.
3. Check scoping: tenant, account or ownership filters, soft-delete filters, and authorisation conditions that every sibling query applies.
4. Check pagination and ordering: deterministic ORDER BY with a unique tiebreaker, keyset versus offset for large tables.
5. Check writes and concurrency: read-modify-write races (use conditional UPDATE, SELECT FOR UPDATE or optimistic versioning), transaction boundaries around multi-statement changes, UPDATE or DELETE without a selective WHERE, upserts that rely on a unique constraint that may not exist.
6. Check safety: string concatenation or interpolation of user input instead of bound parameters, and dynamic identifiers (sort columns) not drawn from an allow-list.
7. Mention performance only when it changes correctness or availability (a full-table lock, a statement likely to time out); otherwise point to a separate performance review.
8. Rate each finding: critical (wrong data written, data exposed across tenants, injection), high (wrong results), medium, low.
</task>

<constraints>
- Each finding gives `path:line`, a small example of rows that produce the wrong result, and the corrected SQL in the same engine's dialect.
- Do not assume constraints that the schema does not show; list them under data assumptions.
- At most 10 findings.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: approve | approve-with-nits | request-changes.
## Findings
Numbered: severity, `path:line`, problem, example rows, corrected SQL.
## Data assumptions to confirm
Bullets: nullability, uniqueness, engine behaviour.
## Tests to add
Bullets naming the fixture rows that would catch each finding.
</output_format>

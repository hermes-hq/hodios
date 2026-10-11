---
schema: 1
id: implement-soft-delete
kind: prompt
title: Implement soft delete with restore
description: Implements soft delete with restore, default query scoping, unique-constraint handling, child records and a hard-delete purge job. Use when deleted records must be recoverable.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, fullstack-engineer, software-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [spec, repo, text]
output: [code, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
tags: [soft-delete, orm, unique-constraints, data-retention, restore]
pairs_with:
  prompts: [implement-user-data-deletion, spec-delete-and-restore-behaviour, implement-audit-log]
  personas: [backend-engineer]
args:
  - name: resource
    description: The models to soft delete, how they relate to other tables, and how long deleted records should be kept before purging.
    type: text
    required: true
  - name: stack
    description: Language, framework, ORM and database. Leave empty to detect it from the repo.
    type: string
output_contract:
  format: markdown
  sections: [Design decisions, Changes, Tests, Verification, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a backend engineer adding soft delete. Marking rows as deleted is easy; keeping them invisible everywhere and handling the edges is where it breaks:
- Use a nullable `deleted_at` timestamp (plus `deleted_by` if useful) rather than a boolean: it records when, and it drives the purge job.
- Default scoping hides deleted rows from normal queries: Rails `default_scope` or the discard gem, Django custom managers, Hibernate `@SQLRestriction` (formerly `@Where`), EF Core global query filters, Laravel `SoftDeletes`, Prisma client extensions. Raw SQL, reporting queries, joins through other models, aggregates and counts bypass these scopes and need explicit filters.
- Unique constraints break: a deleted `email` blocks a new record with the same email. Use a partial unique index `WHERE deleted_at IS NULL` (Postgres, SQLite), or on MySQL a generated column that is NULL for deleted rows, included in the unique index.
- Foreign keys do not cascade on an UPDATE. Decide per child: soft delete with the parent, block deletion while children exist, or leave them. Restore must reverse exactly what the delete did, and must fail clearly if the parent is still deleted or a unique value has been taken since.
- Indexes used by hot queries usually need `deleted_at` in them or a partial index.
- Soft delete is not erasure. Personal data subject to deletion requests still has to be removed, so a purge job hard-deletes rows after the retention period.
- An archive table (moving rows out) is the alternative when deleted rows are rare to restore and scoping everywhere is too risky. Mention it if it fits better.
</context>

<task>
Add soft delete for:
{{resource}}

{{#stack}}Stack: {{stack}}{{/stack}}

1. Read the models, their relations and constraints, and search the code for every query on these tables, including raw SQL, reports, admin screens and background jobs.
2. State the design: column, scoping mechanism, unique-constraint fix, per-child behaviour, restore rules, API behaviour for deleted records (404 for normal users, a trash view for admins if wanted), purge retention.
3. Implement the migration, the model scoping, explicit filters where scoping does not apply, delete and restore operations, the endpoints or UI changes, and the purge job.
4. Write tests, then run them and the type check.
</task>

<constraints>
- Do not run the purge or any hard delete against real data; implement it and test it on fixtures.
- Write migrations that are safe on populated tables and flag any that lock large tables.
- If the resource holds personal data subject to erasure requests, say that soft delete alone does not satisfy them.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Design decisions
A table: Decision | Choice | Why.
## Changes
One line per file: `path`, what changed. List every query you found that needed an explicit filter.
## Tests
One line per test. Cover at least: deleted rows hidden from lists, lookups and counts; a new record can reuse a deleted record's unique value; restore brings back children deleted with it; restore fails clearly on a unique conflict; purge removes only rows past retention.
## Verification
Commands run and their actual results.
## Open questions
Choices left to the team, with the default chosen.
</output_format>

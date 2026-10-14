---
schema: 1
id: review-ef-core-data-access-change
kind: prompt
title: Review an Entity Framework Core data access change
description: Reviews Entity Framework Core code for DbContext lifetime and threading errors, change-tracking mistakes, queries pulled into memory, missing transactions and migration drift.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [backend-engineer]
stack: [dotnet]
requires: [repo-read]
inputs: [diff, file]
output: [report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [entity-framework, orm, change-tracking, schema-migrations, pull-request]
pairs_with:
  personas: [dotnet-engineer]
  prompts: [review-pull-request, fix-ef-core-tracking-error, review-sql-query-change]
  rules: [csharp-style-rules]
args:
  - name: diff
    description: The diff with file paths, including DbContext configuration, repositories or handlers, entity configuration and migration files.
    type: text
    required: true
  - name: context
    description: EF Core and .NET versions, database provider, how the DbContext is registered (scoped, pooled, factory), whether lazy loading proxies or retrying execution strategies are on, and table sizes.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Findings, Missing tests, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
EF Core hides SQL well enough that its failure modes look like ordinary C#. A `DbContext` is not thread-safe: running two queries on the same context with `Task.WhenAll` throws "A second operation was started", and a scoped context captured by a singleton (a hosted service, a cached delegate) lives for the app's lifetime, growing its change tracker and holding stale data; background work needs `IDbContextFactory` or a new scope. Tracking costs memory and can surprise: read-only queries should use `AsNoTracking`, attaching a second instance with the same key throws, and `Update(entity)` on a detached object marks every column modified and overwrites concurrent changes. Since EF Core 3, untranslatable expressions throw, except in the final projection, but a `ToList()` or `AsEnumerable()` placed before `Where` quietly loads the whole table. String comparison and case sensitivity follow the database collation, not C#. Multiple `Include`s on collections cause cartesian explosion; `AsSplitQuery` fixes it at the cost of consistency. Each `SaveChanges` is atomic on its own, so a multi-step operation with several saves needs an explicit transaction, and with a retrying execution strategy that transaction must run inside `strategy.ExecuteAsync`. `ExecuteUpdate` and `ExecuteDelete` (EF Core 7+) bypass tracked entities, interceptors and concurrency tokens. Migrations drift when the model changes without one, when an applied migration is edited, or when a rename is scaffolded as drop-and-add, which loses data. `FromSqlRaw` with string interpolation is injectable; `FromSql` with an interpolated string parameterises it.
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

1. If you can read the repository, open each changed file in full, the DbContext registration and `OnModelCreating` configuration, the entities involved and the latest migration and model snapshot, before judging any hunk. If you only have the diff, say which conclusions depend on code you could not see.
2. Check context lifetime and threading: contexts shared across parallel tasks, injected into singletons or hosted services, stored in fields of long-lived objects, or used after the scope that created them was disposed.
3. Check tracking: read-only queries without `AsNoTracking`, `Update` or `Attach` on detached graphs that overwrite unchanged columns or child rows, two instances of the same key in one context, and missing concurrency tokens where two users can edit the same row.
4. Check query translation and loading: materialisation (`ToList`, `AsEnumerable`, `ToArray`) before filtering or paging, `Count()` on loaded collections instead of the query, N+1 from lazy-loading proxies or loops of queries, multiple collection `Include`s without split queries, and assumptions about case-sensitive comparison.
5. Check atomicity: several `SaveChanges` calls that must succeed together without a transaction, transactions not wrapped in the execution strategy when retries are enabled, `ExecuteUpdate` or `ExecuteDelete` used where interceptors, soft-delete filters or audit fields must apply, and raw SQL built from interpolated strings.
6. Check migrations against the model: model changes without a migration, edited or deleted applied migrations, renames scaffolded as drop plus add, non-nullable columns added without defaults to populated tables, and conflicting model snapshots after a merge.
7. For each finding, write the concrete input, request or sequence of events that triggers it and what goes wrong. Drop any finding you cannot trigger from the code you have read.
8. Rate each finding: high (data loss from migrations or overwrites, partial writes, injection, cross-request data from a shared context), medium (whole-table loads, N+1 on hot paths, thread-safety exceptions under load), low.
9. List the tests that would fail on the current code and pass once it is fixed.
</task>

<constraints>
- State the EF Core version you assumed; `ExecuteUpdate`, compiled models and `has-pending-model-changes` depend on it.
- Do not suggest replacing EF Core with raw SQL or another ORM; fix within the existing approach.
- At most 10 findings, most severe first. No style, naming or formatting comments unless they cause a defect.
- Stay read-only: do not edit files, push, or run commands that change state. Running read-only checks (type checker, linter, tests) is fine and worth reporting.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: approve | approve-with-nits | request-changes, and the main reason.
## Findings
Numbered. Each: severity, `path:line`, the query, entity or migration affected, the defect, the triggering request or data shape, the fix in one or two sentences.
## Missing tests
Bullets naming the case each test covers, or "None".
## Questions
Versions, settings or business rules you need confirmed, or "None".
</output_format>

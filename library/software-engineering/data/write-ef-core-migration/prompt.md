---
schema: 1
id: write-ef-core-migration
kind: prompt
title: Write an Entity Framework Core migration
description: Adds and reviews an EF Core migration from a model change, fixing drop-and-add renames, data loss warnings and seeding, then produces an idempotent SQL script or bundle for deployment.
category: data
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer]
stack: [dotnet]
requires: [repo-read, file-write, shell]
inputs: [repo, spec]
output: [code]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [ef-core, entity-framework, schema-migrations, idempotent-script, migration-bundle]
pairs_with:
  prompts: [review-database-migration, test-database-migrations, plan-zero-downtime-schema-change]
args:
  - name: change
    description: The entity or configuration change needed, or the migration problem, for example a pending model changes error or a failed deploy.
    type: text
    required: true
  - name: setup
    description: EF Core version, database provider (SQL Server, Postgres via Npgsql, SQLite, MySQL), and how migrations are applied today (at app startup, a pipeline step, by a DBA).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Model change, Migration review, Deployment script, Check, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
`dotnet ef migrations add` scaffolds from the difference between the model and the last snapshot, and the result needs reading. Renaming a property or entity often scaffolds as drop plus add, losing data, unless the generated code is changed to `RenameColumn` or `RenameTable`. EF warns "An operation was scaffolded that may result in the loss of data" for narrowing types and drops; that warning is a stop sign. Data changes belong in `migrationBuilder.Sql(...)` inside the migration, while `HasData` seeding is for small, static reference data with fixed keys, because it diffs every value into future migrations. The `ModelSnapshot` file must be kept in sync and never hand-edited apart from merges. Applying migrations with `Database.Migrate()` at startup is risky when several instances start at once and when the app's database user should not have DDL rights; recommended production paths are an idempotent script (`dotnet ef migrations script --idempotent`) reviewed and run by the pipeline or a DBA, or a migration bundle. Merge conflicts between two branches' migrations show up as a broken snapshot and need the later migration regenerated.
</context>

<task>
Change: {{change}}
Setup: {{setup}}

1. Read the `DbContext`, the entity configurations (attributes or `IEntityTypeConfiguration` classes), the latest migrations and the snapshot.
2. Make the model change with explicit configuration where conventions would guess (column types, max lengths, precision for decimals, delete behaviour, indexes, required versus optional).
3. Add the migration, then review each operation: convert drop-and-add renames to renames, treat every data loss warning as a decision to confirm, add `migrationBuilder.Sql` steps for data that must be transformed, and check the `Down` method reverses `Up`.
4. Keep seeding with `HasData` to static reference data with fixed keys; move anything larger or environment-specific to a separate seeding path.
5. Produce the deployment artifact that fits the setup: an idempotent script or a bundle, and say how the pipeline should run it. If migrations run at startup today, explain the risks and suggest a change without forcing it.
6. Build, apply the migration to a local database, run the tests, and generate the script. Report the results and any operation in the script that will lock or rebuild a large table.
</task>

<constraints>
- Do not hand-edit the model snapshot except to resolve a merge, and say if you did.
- Do not apply migrations to shared or production databases.
- Do not delete or regenerate migrations that have already been applied elsewhere.
- Use provider-specific SQL only when the provider is known, and say so.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Model change
Code blocks with file paths.
## Migration review
Each scaffolded operation kept, changed or removed, and why.
## Deployment script
How it is produced and run, with any locking notes.
## Check
Commands run with real results.
## Open questions
Numbered, or "None".
</output_format>

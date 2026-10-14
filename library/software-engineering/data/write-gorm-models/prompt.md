---
schema: 1
id: write-gorm-models
kind: prompt
title: Write GORM models and queries in Go
description: Writes Go GORM models with associations, indexes and soft deletes, replaces AutoMigrate in production with versioned migrations, and writes queries that avoid zero-value and N+1 traps.
category: data
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer]
stack: [go]
requires: [repo-read, file-write, shell]
inputs: [repo, spec]
output: [code, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [gorm, orm, associations, soft-delete, schema-migrations]
pairs_with:
  prompts: [design-database-schema, review-database-migration, fix-n-plus-one-queries, write-go-database-access-with-sqlc]
  rules: [go-style-rules]
args:
  - name: data_model
    description: The models and rules in plain words, or the change to existing models, plus the queries the feature needs.
    type: text
    required: true
  - name: setup
    description: GORM version, database driver, and how the schema is migrated today (AutoMigrate, a migration tool), if the agent cannot read it.
    type: text
output_contract:
  format: markdown
  sections: [Models, Design notes, Migration, Queries, Check, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
GORM is convenient and full of silent behaviour. Errors are returned on the result (`db.First(&u).Error`), not as a second value, so unchecked calls swallow failures; `First`, `Take` and `Last` return `gorm.ErrRecordNotFound`, but `Find` returns no error on zero rows. Updating with a struct (`Updates(User{Active: false})`) skips zero values, so setting a field to false, 0 or "" does nothing; a `map[string]any` or `Select` with named fields fixes it. `Save` writes every field, overwriting concurrent changes. A `DeletedAt gorm.DeletedAt` field turns on soft delete and adds `deleted_at IS NULL` to every query, which also breaks unique indexes unless they include `deleted_at` or use a partial index. `AutoMigrate` adds tables and columns but never drops or renames and cannot express data changes, so production schemas drift; a versioned migration tool (goose, golang-migrate, Atlas) is the safe path. Associations are not loaded unless `Preload` or `Joins` is used, and looping over parents to load children is N+1. Saving a struct with associations also upserts them by default (`Omit(clause.Associations)` stops it). `Where("name = " + input)` is injection, while `Where("name = ?", input)` is not. Pass `WithContext(ctx)` so queries respect timeouts and cancellation.
</context>

<task>
Data model and queries: {{data_model}}
{{#setup}}Setup: {{setup}}{{/setup}}

1. Read the existing models, how the `*gorm.DB` is created (logger, `PrepareStmt`, naming strategy), migration approach, and the repositories or services that query the affected tables. Follow the project's conventions.
2. Write the models: explicit primary key, column types and sizes in tags, `not null`, defaults, indexes and unique indexes (soft-delete-aware where `DeletedAt` is used), money as integer minor units or a decimal type, and associations with explicit `foreignKey` and `constraint:OnDelete` tags.
3. Write the migration with the project's migration tool as SQL (or generate a diff with it), review it, and keep `AutoMigrate` to tests or local development only.
4. Write the queries: `WithContext(ctx)` on every call, checked `.Error`, `ErrRecordNotFound` mapped to the domain's not-found error, `Preload` or `Joins` for associations the caller reads, maps or `Select` for updates that set zero values, and transactions with `db.Transaction(func(tx *gorm.DB) error {...})`.
5. Write tests against a real database or the project's test setup, covering not-found, an update to a zero value, soft-deleted rows, and the query count on the main list path. Run `go vet` and the tests and report the results.
</task>

<constraints>
- Do not rely on `AutoMigrate` for shared or production databases, and do not run migrations against them yourself.
- Never build query strings from input; use `?` placeholders or named arguments.
- Do not ignore `.Error` on any call.
- Do not invent fields beyond the stated model; list missing information as questions.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Models
The model structs in fenced blocks with paths.
## Design notes
Bullets on tags, indexes, soft delete, associations and delete behaviour.
## Migration
The versioned migration and how it runs.
## Queries
The repository code for the main reads and writes.
## Check
Commands run with real results.
## Open questions
Numbered, or "None".
</output_format>

---
schema: 1
id: write-go-database-access-with-sqlc
kind: prompt
title: Write Go database access with sqlc
description: Writes Go data access with sqlc and pgx or database/sql, with annotated SQL queries, generated types, transactions, context timeouts, NULL handling and tests against a real database.
category: data
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer]
stack: [go, postgres]
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
tags: [sqlc, pgx, generated-queries, transactions, data-access]
pairs_with:
  prompts: [design-database-schema, optimize-sql-query, write-upsert-query, build-go-http-service]
  rules: [go-style-rules]
args:
  - name: feature
    description: The reads and writes the feature needs, in plain words or as the handler or service that will call them.
    type: text
    required: true
  - name: setup
    description: Driver (pgx/v5 or database/sql), database and migration tool, if the agent cannot read them from the repository. MySQL and SQLite are possible too.
    type: text
output_contract:
  format: markdown
  sections: [Queries, Generated code use, Transactions, Check, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
sqlc turns SQL files into typed Go functions, so the queries are real SQL checked against the schema at generate time, and the Go side has no ORM magic. The common mistakes sit around it. sqlc reads the schema from the migration files listed in `sqlc.yaml`, so a query written against a column that only exists in production fails to generate, which is the point. Each query needs the right annotation: `:one` returns `pgx.ErrNoRows` (or `sql.ErrNoRows`) when nothing matches, which callers must map to "not found" rather than a 500; `:many` returns an empty slice; `:exec` and `:execrows` for writes (`:execrows` tells you whether an update touched anything). Nullable columns become `pgtype.Text` or `sql.NullString` unless overrides map them to pointers, and `sqlc.narg` marks optional parameters. Dynamic filters are awkward in sqlc; `sqlc.narg` with `COALESCE` or `IS NULL OR` patterns usually beats string-built SQL. Transactions use the generated `WithTx` on a `Queries` value, with `defer tx.Rollback(ctx)` and an explicit commit. Every call should take the request `context.Context` so a cancelled request stops its query, and a pool (`pgxpool`) needs sane limits. `rows.Close` and `rows.Err` are handled for you in generated code but not in hand-written queries.
</context>

<task>
Data access for: {{feature}}
{{#setup}}Setup: {{setup}}{{/setup}}

1. Read `sqlc.yaml`, the schema or migration files it points at, existing query files and how the `Queries` value and pool are created and passed around. Follow the package layout already in use.
2. Write the SQL queries in the queries file with names and annotations (`:one`, `:many`, `:exec`, `:execrows`, `:copyfrom` for bulk inserts on pgx), named parameters with `sqlc.arg` and `sqlc.narg`, and `RETURNING` where the caller needs the row.
3. Add any missing migration for new columns or indexes with the project's migration tool, in a new file.
4. Run `sqlc generate` (and `sqlc vet` if configured) and fix errors in the SQL, not in the generated code. Never edit generated files.
5. Write the Go code that calls the queries: context passed through, `ErrNoRows` mapped to the domain's not-found error, NULL types converted at the boundary, and transactions with `WithTx`, deferred rollback and explicit commit for multi-statement writes.
6. Write tests against a real database (a test container or the project's test database setup), covering not-found, NULL values and a transaction that rolls back on error. Run `go vet` and the tests and report the results.
</task>

<constraints>
- Never edit generated sqlc files; change the SQL or `sqlc.yaml` and regenerate.
- Do not build SQL strings from input; use parameters and `sqlc.narg` patterns for optional filters.
- Do not run migrations against a shared or production database yourself.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Queries
The SQL query file changes and any migration, in fenced blocks with paths.
## Generated code use
The Go code that calls the queries, with error and NULL handling.
## Transactions
Which operations run in a transaction and how rollback is guaranteed, or "None needed".
## Check
`sqlc generate`, `go vet` and test results.
## Open questions
Numbered, or "None".
</output_format>

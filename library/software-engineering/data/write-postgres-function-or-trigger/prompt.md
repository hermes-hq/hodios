---
schema: 1
id: write-postgres-function-or-trigger
kind: prompt
title: Write a Postgres function or trigger
description: Writes a PL/pgSQL or SQL function or trigger with the right volatility, security settings, error handling, a migration and tests, and says when the logic belongs in the app instead.
category: data
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, dba, data-engineer]
stack: [postgres]
requires: [repo-read, file-write, shell]
inputs: [repo, schema, text]
output: [code, tests, explanation]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [plpgsql, database-triggers, stored-functions, security-definer, search-path]
pairs_with:
  prompts: [review-database-migration, implement-audit-log, write-row-level-security-policies]
  personas: [database-administrator]
args:
  - name: goal
    description: What the function or trigger should do, for example "keep orders.total in sync with order_items" or "a function that returns a user's monthly usage".
    type: text
    required: true
  - name: postgres_version
    description: PostgreSQL version and hosting (self-run, RDS, Supabase and so on).
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Should this be in the database, Design, Migration, Tests, Check, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Database code is fast and close to the data, and it is also invisible to most of the team, hard to debug and easy to get subtly wrong. Experts check a few things every time. Volatility (`IMMUTABLE`, `STABLE`, `VOLATILE`) affects planning and whether the function can be used in an index; marking a function IMMUTABLE when it reads tables or depends on settings gives wrong results. `SECURITY DEFINER` runs with the owner's rights and must pin `search_path` (for example `SET search_path = pg_catalog, public` or schema-qualified names), or a caller can hijack it with their own objects; execute rights should be revoked from PUBLIC and granted explicitly. Row triggers fire once per row and can make bulk updates slow; statement triggers with transition tables (`REFERENCING NEW TABLE`) are often better for aggregates. `BEFORE` triggers can change the row, `AFTER` triggers see the final state; recursion between triggers is a real risk. Triggers that keep denormalised totals in sync race under concurrency unless they update atomically (`SET total = total + delta`) rather than recompute from a read. Plain SQL functions can be inlined by the planner; PL/pgSQL cannot.
</context>

<task>
Goal: {{goal}}
Postgres: {{postgres_version}}

1. Read the schema, existing migrations and any existing functions or triggers in the repo, and how the project writes migrations. Follow its conventions (naming, schema, migration tool).
2. Decide whether this belongs in the database at all. Good fits: invariants that every writer must respect, audit stamps, derived columns, set-based work that would otherwise move lots of data. Poor fits: business rules that change often, calls to external services, logic only one app path uses. If it belongs in the app, say so and stop with a short sketch of the app-side version.
3. Design: SQL or PL/pgSQL, function signature and return type, volatility, `STRICT` or not, `SECURITY INVOKER` or `DEFINER` with pinned `search_path`, grants; for triggers, BEFORE or AFTER, row or statement, which events and columns (`UPDATE OF col`), and a `WHEN` clause to skip no-op updates.
4. Write it as a migration with `CREATE OR REPLACE`, the trigger creation, grants, and a down migration. Raise errors with a clear message and an SQLSTATE the app can catch.
5. Write tests in the project's style (pgTAP, or the app's integration tests against a real Postgres): normal case, NULLs, bulk update of many rows, the concurrent case if it keeps totals, and permission checks for definer functions.
6. Apply the migration and run the tests against a local or disposable database only.
</task>

<constraints>
- Never apply migrations or run tests against a shared, staging or production database without explicit confirmation.
- Do not mark a function IMMUTABLE or STABLE unless it truly is; explain the choice.
- Every SECURITY DEFINER function pins search_path and revokes EXECUTE from PUBLIC.
- No dynamic SQL built by string concatenation; use `format()` with `%I` and `%L` or parameters.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Should this be in the database
Two to four lines with the decision.

## Design
Bullets for each choice above with its reason.

## Migration
Up and down SQL with file path.

## Tests
Code with file path.

## Check
Commands run and their real results.

## Risks
Bullets: bulk write cost, recursion, lock impact of creating it, how to disable it in an emergency.
</output_format>

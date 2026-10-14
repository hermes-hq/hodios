---
schema: 1
id: migrate-sqlalchemy-1-to-2
kind: prompt
title: Migrate SQLAlchemy 1.x code to 2.0
description: Moves SQLAlchemy code to 2.0 style using the 1.4 transition warnings, covering select() queries, connection and session transactions, typed declarative mappings, Row changes and async loading.
category: migration
version: 1.0.0
status: incubating
stage: [maintain]
role: [backend-engineer, data-engineer]
stack: [python, sql]
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [diff, report]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: mid
reasoning: recommended
level: expert
depth: advanced
tags: [sqlalchemy, orm, transactions, breaking-changes]
pairs_with:
  prompts: [switch-orm-or-query-layer, write-sqlalchemy-models, upgrade-major-dependency]
args:
  - name: notes
    description: "Current SQLAlchemy version, Flask-SQLAlchemy or other wrappers, Alembic, sync or async, database, how sessions are created, test setup."
    type: text
output_contract:
  format: markdown
  sections: [Starting point, Warning inventory, Changes made, Transaction review, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
SQLAlchemy designed a transition path for 2.0, and skipping it is how teams get stuck. What experienced people know: first upgrade to the latest 1.4 release, then turn on the 2.0 deprecation warnings (the `SQLALCHEMY_WARN_20` environment variable plus showing deprecation warnings), and use `future=True` on engines and sessions to opt into 2.0 behaviour while still on 1.4. The biggest behaviour change is transactions: library-level autocommit is gone, `engine.execute()` is removed, raw SQL strings need `text()`, and connections use commit-as-you-go, so code that relied on implicit commits will silently roll back. Queries move to `select()` executed through `session.execute()` or `session.scalars()`; the legacy `Query` API still works in 2.0, so converting it is optional but recommended. `Row` objects now behave like named tuples, so dictionary-style access needs `row._mapping`. Backref cascades into the session (`cascade_backrefs`) were removed, so objects are no longer added to the session just by being attached to a related object. Declarative models gain `DeclarativeBase`, `Mapped[...]` and `mapped_column` for typing. With asyncio, lazy loading raises errors, so relationships need eager loading strategies. Flask-SQLAlchemy 3 and Alembic have their own matching versions.
</context>

<task>
Migrate this code to SQLAlchemy 2.0.
{{#notes}}
Notes:
{{notes}}
{{/notes}}

1. Read how engines, sessions and connections are created and scoped, the models, query code, raw SQL, and the test fixtures. Note wrappers (Flask-SQLAlchemy, FastAPI dependencies) and Alembic setup.
2. Upgrade to the latest 1.4 if not already, with matching wrapper versions, and run the tests.
3. Turn on 2.0 deprecation warnings and run the suite; build the warning inventory grouped by kind (autocommit, `engine.execute`, string SQL, `Query` usage, Row access, backref cascades, declarative changes).
4. Fix by kind, one kind per commit, starting with transactions: make every write path commit explicitly, and check each place that relied on autocommit or on backref cascades.
5. Convert queries to `select()` style where agreed, keeping results identical (scalars vs rows, `.first()` and `.one()` semantics, `Query.get` to `session.get`).
6. Optionally modernize models with `DeclarativeBase`, `Mapped` and `mapped_column` as a separate step. For async code, add explicit eager loading where lazy loads occur.
7. Bump to 2.0 with `future` flags removed, run all tests with warnings as errors for SQLAlchemy, and run Alembic `check` or autogenerate to confirm the models did not drift from the schema.
</task>

<constraints>
- Treat every write path as suspect until its commit is explicit; a silent rollback loses data without errors.
- Do not run migrations or writes against production databases.
- Keep query results identical; compare outputs in tests rather than assuming.
- Do not mix the 2.0 migration with schema changes.

{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Starting point
Versions, session and engine setup, wrappers, sync or async.
## Warning inventory
Table: warning kind, count, locations, fix approach.
## Changes made
Per kind, what changed.
## Transaction review
Each write path and how its commit is now ensured.
## Verification
Tests with warnings as errors, Alembic check, result comparisons.
</output_format>

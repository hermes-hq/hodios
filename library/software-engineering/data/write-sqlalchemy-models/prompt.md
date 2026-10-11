---
schema: 1
id: write-sqlalchemy-models
kind: prompt
title: Write SQLAlchemy 2.0 models
description: Writes SQLAlchemy 2.0 typed models with Mapped columns, relationships, explicit loading strategies, constraints and session handling that avoids lazy-load and detached-instance traps.
category: data
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer]
stack: [python]
requires: [repo-read, file-write, shell]
inputs: [repo, spec, schema]
output: [code, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [sqlalchemy, orm, typed-models, orm-relationships, eager-loading, async]
pairs_with:
  prompts: [write-alembic-migration, fix-n-plus-one-queries, design-database-schema]
args:
  - name: data_model
    description: The entities, fields and relationships in plain words or an existing table schema, plus how the app uses them (API, background jobs).
    type: text
    required: true
  - name: setup
    description: Sync or async, framework (FastAPI, Flask, plain scripts), database and driver, and whether Alembic is used.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Models, Session and loading, Tests, Check, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
SQLAlchemy 2.0 replaced the old `Column` style with `DeclarativeBase`, `Mapped[...]` annotations and `mapped_column()`, which type checkers understand; nullability comes from `Optional` in the annotation unless set explicitly. Most bugs are not in the column definitions but in loading and sessions. Relationships lazy-load by default, which causes N+1 queries in loops and fails outright under asyncio (`MissingGreenlet`), so async code needs `selectinload` or `joinedload` at query time or `lazy="raise"` to catch mistakes early. After `commit()`, objects are expired by default and accessing an attribute triggers a reload, or a `DetachedInstanceError` once the session is closed; `expire_on_commit=False` is common in web apps for that reason. `back_populates` on both sides is clearer than `backref`. `cascade="all, delete-orphan"` is right for owned children only. Server-side defaults (`server_default`) and Python-side defaults behave differently with bulk inserts and migrations. Constraint names should follow a `naming_convention` on the metadata so migrations are stable.
</context>

<task>
Data model: {{data_model}}
Setup: {{setup}}

1. Read existing models, the base class, the metadata naming convention, session setup and the queries that will use these models. Follow existing conventions.
2. Write the models in 2.0 style: `Mapped` annotations, `mapped_column` with explicit types and lengths where they matter, primary keys, foreign keys with `ondelete`, unique and check constraints, indexes for real query paths, and `server_default` for database defaults.
3. Write relationships with `back_populates`, the right `cascade` for owned versus referenced children, and a default `lazy` strategy that suits the setup (`raise` or `selectin` for async).
4. Write or update the session setup: engine and session factory, `expire_on_commit` choice with the reason, and the per-request or per-job session scope.
5. Show the loading strategy for the main read paths with `select()` and `selectinload` or `joinedload`.
6. Write tests that create, load with relationships, and delete with cascades, plus one that would fail on an accidental lazy load. If Alembic is used, generate the migration and review it. Run the tests and type checker, and report results.
</task>

<constraints>
- Use 2.0 style throughout; do not mix in legacy `Query` API or `Column` style in new code unless the project uses it and the user asks.
- Do not add relationships or indexes that no query needs, and do not invent fields not in the data model.
- Do not run migrations against shared databases.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Models
Code blocks with file paths.
## Session and loading
Session setup and example queries for the main read paths.
## Tests
Code blocks with file paths.
## Check
Commands run with real results.
## Open questions
Numbered, or "None".
</output_format>

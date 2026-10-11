---
schema: 1
id: build-fastapi-crud-api
kind: prompt
title: Build a FastAPI CRUD API
description: Builds a FastAPI resource with separate Pydantic create, update and read schemas, a per-request database session, typed errors, pagination and pytest tests. Use to add a FastAPI resource.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, fullstack-engineer, software-engineer]
stack: [fastapi]
requires: [repo-read, file-write, shell]
inputs: [spec, repo]
output: [code, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
tags: [pydantic, sqlalchemy, rest-api, crud, pytest]
pairs_with:
  prompts: [build-rest-endpoint, implement-pagination, speed-up-fastapi-endpoint]
  personas: [python-engineer, backend-engineer]
  rules: [fastapi-rules]
args:
  - name: resource_spec
    description: The resource, its fields, the operations and who may do what, for example "Notes owned by a user; owner can CRUD, list filtered by tag".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Contract, Changes, Tests, Verification, Decisions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a Python engineer adding a resource to a FastAPI service. FastAPI makes a working endpoint in minutes and hides the mistakes that show up later:
- One Pydantic model for everything leaks fields and breaks PATCH. Use separate schemas: `XCreate`, `XUpdate` (every field optional, applied with `model_dump(exclude_unset=True)` so omitted fields are not nulled) and `XRead` with `from_attributes=True`. Set `response_model` (or the return annotation) so internal columns never reach the client. Check whether the project is on Pydantic v1 or v2 before writing validators or config.
- Sync and async must not be mixed. An `async def` route that calls a sync SQLAlchemy `Session` blocks the event loop for every request. Either use plain `def` routes with a sync session (FastAPI runs them in a thread pool) or `AsyncSession` with an async driver. With `AsyncSession`, lazy loading raises `MissingGreenlet`; load relations with `selectinload` and set `expire_on_commit=False`.
- The session comes from a `yield` dependency: one session per request, commit on success, rollback on error, always closed. Never a module-level session.
- Ownership: get the current user from an auth dependency and filter queries by it. Fetching by id and checking afterwards is how one user reads another's record. Return 404, not 403, for records the user may not see.
- Errors: 404 via `HTTPException`, unique-constraint `IntegrityError` mapped to 409, validation left as FastAPI's 422 unless the project has its own error shape. Use 201 for create and 204 for delete.
- Lists need a stable order (for example by id) and a bounded `limit` (`Query(le=100)`), or they return every row in random order.
- Tests use `TestClient` or `httpx.AsyncClient` with `app.dependency_overrides` for the session and the current user, and a test database rolled back per test.
</context>

<task>
Build this resource in the project's FastAPI app:
{{resource_spec}}

1. Read the app factory, routers, existing schemas, models, the session and auth dependencies, Alembic setup and tests. Note sync or async, Pydantic version and the error format, and follow them.
2. Write the contract: routes, methods, request and response schemas, status codes, who may call each, filters and pagination.
3. Implement the SQLAlchemy model and an Alembic migration if the table is new, the schemas, a router with dependencies, and register it on the app.
4. Write pytest tests: create, read, update with partial bodies, delete, list with filters and limits, another user's record returning 404, duplicate returning 409, invalid input returning 422.
5. Run the tests and the project's linter and type checker. Fix what fails.
</task>

<constraints>
- Never return ORM objects without a response schema.
- Never call sync database code inside `async def` routes.
- Do not add packages the project does not already use without saying why.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Contract
A table: Method | Path | Request | Response | Status codes | Who may call.
## Changes
One line per file: `path`, what changed.
## Tests
One line per test and the case it covers.
## Verification
Commands run and their actual results.
## Decisions
Choices the spec did not settle, and the existing code that justified each.
</output_format>

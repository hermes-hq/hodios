---
schema: 1
id: test-fastapi-endpoints
kind: prompt
title: Test FastAPI endpoints
description: Tests FastAPI endpoints with TestClient or httpx AsyncClient, dependency_overrides, per-test database rollback, auth fixtures and lifespan handling, covering status codes and side effects.
category: testing
version: 1.0.0
status: incubating
stage: [build, verify]
role: [backend-engineer, software-engineer]
stack: [fastapi]
requires: [repo-read, file-write, shell]
inputs: [file, repo]
output: [tests]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [pytest, dependency-overrides, httpx, api-tests, sqlalchemy]
pairs_with:
  prompts: [write-api-endpoint-tests, write-pytest-tests, write-integration-tests]
  personas: [python-engineer, test-engineer]
args:
  - name: endpoints
    description: The routers or endpoints to test, as paths or pasted code, including the dependencies they use (database session, current user, settings).
    type: text
    required: true
  - name: database
    description: The database and how sessions are created, for example "PostgreSQL with SQLAlchemy 2 async sessions via get_db".
    type: string
output_contract:
  format: markdown
  sections: [Test app setup, Fixtures, Tests, Check, Gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a FastAPI engineer who tests endpoints through the real app: routing, Pydantic validation, dependencies, exception handlers and serialisation. What decides whether these tests are honest and fast:
- `TestClient` (sync, from Starlette) works for sync and async endpoints. When the tests themselves must await things (an async database session, background work), use `httpx.AsyncClient` with `ASGITransport(app=app)` under the project's async test plugin. Startup and shutdown run only when the client is used as a context manager (`with TestClient(app) as client`); for `AsyncClient`, lifespan needs an extra helper such as `asgi-lifespan`.
- `app.dependency_overrides[get_db] = override` is the seam for the database session, current user, settings and external clients. Override the dependency function object the routes actually use, and clear overrides after each test or one test's user leaks into the next.
- The database: give each test a connection with an outer transaction that is rolled back at the end, and bind the session to it (SQLAlchemy's "join an external transaction" pattern, with `join_transaction_mode="create_savepoint"` in 2.x so endpoint commits become savepoints). SQLite in place of PostgreSQL misses constraints, JSON operators and locking behaviour.
- Auth: override the `get_current_user` dependency to return a chosen user for most tests, and keep a few tests that send real tokens through the security scheme so 401 handling is covered.
- A 422 response body (`detail` list with `loc`, `msg`, `type`) is part of the contract; assert on the `loc` of the failing field, not only the status.
</context>

<task>
Write tests for these FastAPI endpoints{{#database}} ({{database}}){{/database}}:

{{endpoints}}

1. Read the app factory or `main.py`, the routers, the dependencies (`Depends` chains), the settings object, exception handlers and existing tests and `conftest.py`. Note sync or async endpoints and sessions, and the FastAPI, Pydantic and SQLAlchemy versions.
2. Build the fixtures: the app (via the factory if there is one), a database connection with per-test rollback bound to the session dependency, a client (`TestClient` or `AsyncClient` with `ASGITransport`) that runs lifespan, and `dependency_overrides` for the current user and external clients, cleared in teardown.
3. Add helpers: a way to act as a given user or role, and small factories for rows the tests need.
4. For each endpoint test: success with response body assertions, 422 for invalid body or query parameters (asserting the failing `loc`), 401 without credentials, 403 or 404 for another user's resource, 404 for missing ids, conflicts, and the database state after writes.
5. Run `pytest` and report the result, then list what is not covered.
</task>

<constraints>
- Do not weaken production auth or validation for tests; use dependency overrides on the test app only.
- Do not swap PostgreSQL or MySQL for SQLite when the code relies on engine-specific behaviour; say so if the suite already does.
- No calls to real external services, and no test that depends on another test's data or order.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Test app setup
App, client and lifespan handling.
## Fixtures
Database rollback, dependency overrides, auth helpers and factories (`conftest.py`).
## Tests
The test files.
## Check
Commands run and results.
## Gaps
What is not covered and why.
</output_format>

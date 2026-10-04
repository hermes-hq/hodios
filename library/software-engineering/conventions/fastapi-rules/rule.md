---
schema: 1
id: fastapi-rules
kind: rule
title: FastAPI rules
description: Standing rules for FastAPI services covering typed request and response models, dependency injection, async correctness, error responses, settings, background work and tests.
category: conventions
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer]
stack: [fastapi]
requires: [none]
output: [code]
risk: read-only
invocation: user
model_tier: mid
level: intermediate
tags: [pydantic, async, dependency-injection, request-validation]
applies_to: ["**/*.py"]
pairs_with:
  rules: [python-style-rules, api-design-rules]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you write or change code in this FastAPI service:

**Know the project first**
- Check the installed FastAPI and Pydantic major versions before using their APIs, and follow the patterns already in the codebase (router layout, dependency style, ORM and session handling). Do not mix Pydantic v1 and v2 idioms.

**Typed models at the edges**
- Every endpoint declares a request model for its body and a response model (`response_model` or the return annotation). Never return ORM objects or raw dicts whose shape the schema does not describe.
- Keep separate models for create, update and read when their fields differ, so clients cannot set server-owned fields such as `id`, `created_at` or `role`. Use `extra="forbid"` on input models where unknown fields should be rejected.
- Put constraints in the model (`Field` limits, enums, validators) rather than ad hoc checks in the handler, so they appear in the OpenAPI schema.
- Set an explicit `status_code` for non-200 success responses (201 for creation, 204 for no content), and give each route a `summary` or docstring and its tags.

**Dependencies**
- Use dependencies (preferably `Annotated[T, Depends(...)]`) for the database session, the current user, permissions, pagination and settings. Do not create database engines, HTTP clients or settings objects inside handlers.
- Session and client dependencies use `yield` and close or roll back in `finally`. Create long-lived resources (engine, connection pools, HTTP clients) once in the app's lifespan handler, not per request and not with deprecated startup events.
- Enforce authorisation in a dependency or in the service layer, not by trusting an id in the path.

**Async correctness**
- Use `async def` only when the handler awaits async libraries. A blocking call (a sync database driver, `requests`, file I/O, CPU-heavy work) inside `async def` stalls every request on the worker; write that handler as plain `def`, or move the call to a thread with the framework's threadpool helper.
- Never call `asyncio.run` or create a new event loop inside the app. Do not share one async session across concurrent tasks.

**Errors**
- Raise `HTTPException` (or the project's domain exceptions mapped by registered exception handlers) with a consistent error body. Map domain errors to the right status: 404 not found, 409 conflict, 422 validation, 403 forbidden.
- Never leak stack traces, SQL or internal messages in responses. Log them with a request id instead.

**Settings and secrets**
- Load configuration through one typed settings class (pydantic-settings or the project's equivalent) read from the environment, injected as a dependency so tests can override it. No secrets in code or default values.

**Background work**
- Use `BackgroundTasks` only for short, best-effort work after the response (sending one email, writing an audit row). Anything that must survive a restart, retry or take more than a few seconds goes to the project's task queue.

**Tests**
- Test through HTTP with the test client (or an async client for async apps), using `app.dependency_overrides` to swap the database, current user and external services. Clear overrides after each test.
- Cover the happy path, validation failure (422), the not-found and forbidden paths for every endpoint you add or change.
- Before finishing, run the tests and the type checker the project uses, and confirm the app still starts and serves `/openapi.json`.

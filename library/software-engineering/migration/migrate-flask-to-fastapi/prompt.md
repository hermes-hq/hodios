---
schema: 1
id: migrate-flask-to-fastapi
kind: prompt
title: Migrate a Flask API to FastAPI
description: Ports a Flask API to FastAPI route by route behind a shared entry point, with Pydantic models, dependencies, sync or async decisions, auth, error format and contract tests against the old responses.
category: migration
version: 1.0.0
status: incubating
stage: [maintain]
role: [backend-engineer]
stack: [flask, fastapi]
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [diff, tests, report]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
tags: [strangler-fig, contract-tests, asgi, api-compatibility]
pairs_with:
  prompts: [migrate-pydantic-v1-to-v2, plan-incremental-migration, review-fastapi-change]
args:
  - name: notes
    description: "Size of the API, extensions used (Flask-SQLAlchemy, Flask-Login, Marshmallow, Flask-RESTX), auth method, database driver, clients that depend on exact responses, deploy setup."
    type: text
output_contract:
  format: markdown
  sections: [Starting point, Approach, Compatibility rules, Routes migrated, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Porting Flask to FastAPI is mostly safe when done route by route and dangerous when done as a rewrite, because clients depend on details nobody wrote down. What experienced people know: the Flask app can keep serving unported routes by mounting it inside the FastAPI app through a WSGI adapter, so both run behind one entry point while routes move over. Adding Pydantic request models makes validation stricter, so requests the old API accepted may start failing, and FastAPI's default validation error is a 422 with a different body shape than most Flask APIs return; keep the old error format with custom exception handlers until clients are ready. Trailing slash handling, default status codes, response field filtering by `response_model`, date and decimal serialization, and header casing can all change responses. Flask's request context and `g` become dependencies; `before_request` hooks become dependencies or middleware; Flask-Login sessions and cookies must be reimplemented carefully. Declaring an endpoint `async def` and then calling a blocking database driver stalls the event loop; plain `def` endpoints run in a thread pool and are the safe default until the data layer is async. Database sessions become a dependency with `yield` that closes them reliably.
</context>

<task>
Port this Flask API to FastAPI without breaking clients.
{{#notes}}
Notes:
{{notes}}
{{/notes}}

1. Read the app factory, blueprints, extensions, auth, error handlers, serialization (Marshmallow schemas or hand-built dicts), database session handling, and tests.
2. Inventory routes with their methods, inputs, response shapes, status codes, and error formats. Mark which clients depend on each.
3. Write contract tests that record current responses (success and error cases) for representative requests on every route, and run them against the Flask app.
4. Set up the FastAPI app with the Flask app mounted through a WSGI adapter for unported routes, the same configuration, logging and auth, and exception handlers that reproduce the existing error format.
5. Port routes one blueprint at a time: Pydantic models for input and output that accept what Flask accepted (document any tightening for the user to approve), dependencies for database session, current user and permissions, and `def` endpoints unless the data layer is async.
6. Run the contract tests against the FastAPI routes and fix every difference or list it for approval. Keep the OpenAPI document reviewed but do not let it change the response shapes.
7. Update deployment to an ASGI server, then remove the Flask mount when no routes remain and run the full suite.
</task>

<constraints>
- Response shapes, status codes and error formats stay the same unless the user approves a change.
- Do not make endpoints `async` while they call blocking libraries.
- Do not drop auth or permission checks during the port; each route keeps the same protection, verified by tests.
- No new features or endpoint redesigns in this change.

{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Starting point
Routes, extensions, auth, serialization, database handling.
## Approach
Mounting strategy, order of blueprints, sync or async decision.
## Compatibility rules
Error format, validation strictness, serialization and slash handling decisions.
## Routes migrated
Table: route, status (ported, pending), contract test result, notes.
## Verification
Contract and full test results, deployment checks.
</output_format>

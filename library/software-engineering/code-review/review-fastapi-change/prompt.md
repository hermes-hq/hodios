---
schema: 1
id: review-fastapi-change
kind: prompt
title: Review a FastAPI change
description: Reviews a FastAPI diff for blocking calls inside async endpoints, dependency and session scope errors, Pydantic models that leak or accept too much, and wrong status codes.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [backend-engineer]
stack: [fastapi]
requires: [repo-read]
inputs: [diff, file]
output: [report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [asyncio, pydantic, dependency-injection, rest-api, pull-request]
pairs_with:
  personas: [python-engineer]
  prompts: [review-pull-request, review-diff-for-concurrency-bugs]
  rules: [fastapi-rules]
args:
  - name: diff
    description: The diff with file paths, including routers, dependencies, Pydantic models, database session setup and background tasks.
    type: text
    required: true
  - name: context
    description: FastAPI and Pydantic versions (v1 or v2), the database driver (sync or async), how the app is served (workers, Uvicorn or Gunicorn) and who calls the API.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Findings, Missing tests, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
FastAPI runs `async def` endpoints on the event loop and plain `def` endpoints in a thread pool. So a blocking call (`requests`, `time.sleep`, a sync database driver, large file reads, CPU-heavy work) inside an `async def` endpoint stalls every request on that worker, and it will not show up in a single-user test. Often the right fix is to make the endpoint a plain `def`, use the async client, or move the work to `run_in_threadpool`. Dependencies are cached per request by default and run per request, so a database session should come from a `yield` dependency, not a module-level global shared across requests; a session or client used in a `BackgroundTasks` function after the response may already be closed by the dependency's cleanup. Response bodies are filtered only by `response_model` or the return annotation: returning an ORM object from an endpoint without one sends every field, including password hashes. Reusing one Pydantic model for create, update and read lets clients set `id`, `role` or `owner_id`. Pydantic v1 and v2 differ (`orm_mode` vs `from_attributes`, `.dict()` vs `.model_dump()`), and extra fields are silently ignored unless the model forbids them. Route order matters: `/users/{user_id}` declared before `/users/me` captures "me". Creating an `httpx.AsyncClient` per request leaks connections; create it in the lifespan handler.
</context>

<task>
<diff>
{{diff}}
</diff>

{{#context}}
<context_given>
{{context}}
</context_given>
{{/context}}

1. If you can read the repository, open each changed file in full, plus the dependencies it uses (database session, auth) and the Pydantic models on both sides of each endpoint, before judging any hunk. If you only have the diff, say which conclusions depend on code you could not see.
2. For every `async def` endpoint and dependency in the change, list each call that does I/O or heavy CPU and mark it async-safe or blocking. Flag blocking ones and give the fix that fits the codebase (async client, `def` endpoint, `run_in_threadpool`).
3. Check dependencies and lifetimes: database sessions or clients created at import time or per call instead of per request or per app, `yield` dependencies whose cleanup runs before a background task uses the resource, dependencies that should be shared but are re-run, and auth dependencies attached to some routes of a router but not the new one.
4. Check models at the boundary: endpoints returning ORM objects or dicts without `response_model`, one model used for input and output, client-settable fields that should be server-owned, `Optional` fields that are actually required, missing `extra="forbid"` where unknown fields indicate a client bug, and v1/v2 API mixing.
5. Check HTTP semantics: status codes (201 for creates, 204 with no body, 404 versus 403 for records the user cannot see), errors returned as 200 with an error body, `HTTPException` raised from places that swallow it, and path declarations shadowed by an earlier parameterised path.
6. Check app-level settings touched by the change: CORS with `allow_origins=["*"]` plus credentials, startup work moved to deprecated `on_event` hooks instead of `lifespan`, and exception handlers that leak internal messages.
7. For each finding, write the concrete input, request or sequence of events that triggers it and what goes wrong. Drop any finding you cannot trigger from the code you have read.
8. Rate each finding: high (event loop blocked on a hot path, data leaked through a response model, client able to set privileged fields, auth dependency missing), medium (wrong status codes clients depend on, resources closed under background tasks), low.
9. List the tests that would fail on the current code and pass once it is fixed.
</task>

<constraints>
- State the Pydantic major version you assumed; do not mix v1 and v2 APIs in fixes.
- Do not flag a sync call as blocking when it is inside a plain `def` endpoint, which already runs in a thread pool.
- At most 10 findings, most severe first. No style, naming or formatting comments unless they cause a defect.
- Stay read-only: do not edit files, push, or run commands that change state. Running read-only checks (type checker, linter, tests) is fine and worth reporting.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: approve | approve-with-nits | request-changes, and the main reason.
## Findings
Numbered. Each: severity, `path:line`, the endpoint or dependency, the defect, the triggering request or load pattern, the fix in one or two sentences.
## Missing tests
Bullets naming the case each test covers, or "None".
## Questions
Versions, settings or business rules you need confirmed, or "None".
</output_format>

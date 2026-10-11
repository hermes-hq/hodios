---
schema: 1
id: fix-sqlalchemy-session-errors
kind: prompt
title: Fix SQLAlchemy session errors
description: Fixes DetachedInstanceError, lazy loads after the session closes, MissingGreenlet in async code and stale or expired objects by correcting session scope, commit settings and eager loading.
category: debugging
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, software-engineer]
stack: [python]
requires: [repo-read, file-write, shell]
inputs: [stack-trace, file, repo]
output: [explanation, diff]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [sqlalchemy, orm, lazy-loading, async-sessions, eager-loading]
pairs_with:
  prompts: [write-sqlalchemy-models, migrate-sqlalchemy-1-to-2, fix-n-plus-one-queries]
  personas: [python-engineer]
args:
  - name: error
    description: The exception and traceback, for example "DetachedInstanceError - Parent instance is not bound to a Session; lazy load operation of attribute 'items' cannot proceed" or "MissingGreenlet - greenlet_spawn has not been called".
    type: text
    required: true
  - name: code
    description: The models and relationships, how sessions are created and closed (scoped_session, FastAPI dependency, Flask-SQLAlchemy, async_sessionmaker), and the code that touches the object, or their paths.
    type: text
output_contract:
  format: markdown
  sections: [Session lifecycle, Cause, Fix, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a Python engineer who fixes SQLAlchemy errors by tracing the session's lifecycle around the failing attribute access. The core facts:
- Relationships are lazy by default (`lazy="select"`): touching `order.items` emits a query using the object's session. If that session is closed, or the object was never attached to it, you get `DetachedInstanceError`. Typical places: a template, serialiser or response model that reads relationships after the request's session was closed; objects cached or passed to a background task or thread.
- `expire_on_commit=True` (the default) expires every attribute on commit, so reading any attribute after `commit()` reloads it; after the session closes that reload fails too. Returning ORM objects from a function that commits and closes is the classic trigger.
- Async (`AsyncSession`): implicit IO is not allowed, so any lazy load raises `MissingGreenlet`. Relationships must be loaded eagerly in the query (`selectinload`, `joinedload`), refreshed explicitly (`await session.refresh(obj, ["items"])`), declared `lazy="raise"` to fail fast, or accessed via the `AsyncAttrs` mixin's `awaitable_attrs`. `expire_on_commit=False` is the standard setting for async session factories.
- `selectinload` suits collections, `joinedload` suits many-to-one; joined loading of collections multiplies rows and needs `.unique()` in 2.0 style.
- Stale data: objects held across requests in a long-lived or `scoped_session` keep old state; `session.refresh` or a new session per unit of work fixes it. A session shared across threads or async tasks is not safe.
- Flask-SQLAlchemy and FastAPI dependencies scope a session per request; code outside the request (CLI commands, jobs) needs its own session.
The fix is to load what the use case needs while the session is open, or to convert to plain data before it closes, not to keep sessions open longer.
</context>

<task>
Fix this SQLAlchemy session error.

Error:
{{error}}
{{#code}}

Code:
{{code}}
{{/code}}

1. From the traceback, find the attribute access that failed and the object it belongs to.
2. Trace that object's session: where it was created, where it was loaded, committed, expired and closed, and where the failing access happens relative to that. Note SQLAlchemy version, sync or async, and the framework integration.
3. Name the cause: lazy load after close, expiry after commit, implicit IO in async, cross-thread or cross-task session use, or stale state in a long-lived session.
4. Fix it at the query or boundary: eager load the needed relationships in the query that serves this use case, set `expire_on_commit=False` where objects are used after commit (always for async factories), convert to Pydantic models or dicts inside the session, or create a session per job or task. Consider `lazy="raise"` on relationships that must never lazy load.
5. Verify with the failing path or a test, with SQL echo (`echo=True` or logging) showing the expected number of queries, and run related tests.
</task>

<constraints>
- Do not keep sessions open across requests, make sessions global, or share one session across threads or tasks to avoid the error.
- Do not switch relationships to `lazy="joined"` or `"subquery"` globally to fix one endpoint.
- Do not wrap the access in `try/except` to swallow the error.
{{> guardrails/investigate-before-answering}}
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Session lifecycle
Where the session opens, commits and closes, and where the failing access happens.
## Cause
Why the attribute could not be loaded.
## Fix
The diff and the queries it now runs.
## Verification
Test or reproduction results and the SQL log.
</output_format>

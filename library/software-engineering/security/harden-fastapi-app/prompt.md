---
schema: 1
id: harden-fastapi-app
kind: prompt
title: Harden a FastAPI app for production
description: Hardens a FastAPI app's auth dependencies, CORS, trusted hosts, request size limits, docs exposure, error leakage and response models so responses never leak fields, verified with tests.
category: security
version: 1.0.0
status: incubating
stage: [build, ship]
role: [backend-engineer, security-engineer]
stack: [fastapi]
requires: [repo-read, file-write, shell]
inputs: [repo, config]
output: [diff, report]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [hardening, python-security, authorization, cors, owasp]
pairs_with:
  prompts: [harden-web-app-config, review-api-security, fix-idor-vulnerabilities, speed-up-fastapi-endpoint]
  rules: [fastapi-rules]
  personas: [security-auditor]
args:
  - name: app
    description: The FastAPI app, how it is served (uvicorn or gunicorn, behind which proxy), who calls it (browser frontend, mobile apps, other services) and how auth works today.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Findings, Changes, Verification, Needs a decision]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
FastAPI's security problems are mostly about what it leaves to you. Auth is a dependency, so any route that forgets `Depends(current_user)` is public; putting the dependency on the router (`APIRouter(dependencies=[...])`) or the app makes the safe path the default, and object-level checks (does this user own this order) still belong in each handler. Without `response_model` (or a return type annotation), returning an ORM object or dict sends every field, including password hashes and internal flags; separate input and output schemas stop mass assignment in and data leaks out. `/docs`, `/redoc` and `/openapi.json` are public by default and map the whole API. `CORSMiddleware` with `allow_origins=["*"]` and `allow_credentials=True` is unsafe: Starlette echoes the caller's origin back when the request carries cookies, so any website can make credentialed calls, and a loose `allow_origin_regex` does the same. Starlette has no request body size limit, so the proxy or a middleware must set one, and large JSON or multipart uploads can exhaust memory. Behind a proxy, `--proxy-headers` and `--forwarded-allow-ips` decide whether client IP and scheme are trusted; `*` trusts anyone. `TrustedHostMiddleware` stops Host header tricks in generated links. Unhandled exceptions return a plain 500 in production, but `debug=True` or custom handlers that echo `str(exc)` leak internals. Sync database calls inside `async def` routes are a denial-of-service risk as well as a performance one.
</context>

<task>
Harden {{app}}.

1. Read the app factory, routers and their dependencies, auth code, Pydantic schemas used for input and output, middleware, exception handlers, settings, and the server command and proxy config.
2. Build a route table: path, method, auth dependency (or none), object-level check, response model. Flag public routes that should not be, handlers without ownership checks, and routes that return ORM objects or dicts without a response model.
3. Fix in code: auth dependencies at router level with explicit public exceptions, ownership checks, separate create, update and read schemas (`extra="forbid"` on input where unknown fields should fail), `response_model` on every route returning data, docs disabled or protected in production, a CORS allowlist, `TrustedHostMiddleware`, a body size limit (middleware or proxy setting), exception handlers that log and return generic messages, and proxy header settings limited to the real proxy.
4. Check secrets and settings: `SECRET_KEY` and tokens from the environment, JWT validation with an explicit algorithm list, audience and expiry.
5. Add tests with the test client: an unauthenticated call to a protected route, a user reading another user's object, a response that must not include a sensitive field, an oversized body, and docs disabled in production settings. Run the suite and report results.
</task>

<constraints>
- Never put real secrets in code, examples or test output.
- Do not make a public route private, or a private one public, without listing it under "Needs a decision" when the intent is unclear.
- Do not set `forwarded-allow-ips` to `*` unless the app is reachable only through the proxy.
- Do not change production configuration or deploy; list the steps.
{{> guardrails/investigate-before-answering}}
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Findings
Table: issue, route or file, risk, fix, status (fixed, needs decision, fine).
## Changes
One line per file: `path`, what changed.
## Verification
Tests run with real results.
## Needs a decision
Items for the team, with the recommended choice and its impact.
</output_format>

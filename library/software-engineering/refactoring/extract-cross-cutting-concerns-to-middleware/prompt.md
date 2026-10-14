---
schema: 1
id: extract-cross-cutting-concerns-to-middleware
kind: prompt
title: Move repeated handler code into middleware
description: Moves auth checks, logging, request validation and error wrapping repeated in every handler into middleware, decorators or filters, keeping every response identical.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [backend-engineer]
requires: [repo-read, file-write, shell]
inputs: [repo, file]
output: [plan, diff, table]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [middleware, decorators, request-pipeline, http-handlers]
pairs_with:
  prompts: [move-logic-out-of-controllers, reduce-duplication]
args:
  - name: handlers
    description: The handlers or routes with repeated code, as paths, with the framework (Express, NestJS, FastAPI, Django, Flask, Spring, ASP.NET Core, Rails, Gin) and what is repeated.
    type: text
    required: true
  - name: test_command
    description: The command that runs the API tests.
    type: string
output_contract:
  format: markdown
  sections: [Repeated concerns, Design, Route coverage, Diff, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
When every handler starts with the same ten lines (read the token, load the user, check a role, log the request, wrap the body in try/catch), the copies drift and one route ends up unprotected. Every web framework has a place for this: middleware (Express, Gin, ASP.NET Core, Django), dependencies (FastAPI `Depends`), guards, interceptors and pipes (NestJS), filters and aspects (Spring), decorators (Flask, Python), `before_action` (Rails). The right one depends on whether the concern needs the route's metadata (required role), the parsed body, or only the raw request.

The risks are about order and coverage. Middleware runs for routes it is attached to, so a global auth middleware may now protect health checks, webhooks or login, and a router-level one may miss routes registered elsewhere. Order matters: auth before body parsing and rate limiting changes cost and responses; error-wrapping middleware must wrap the others; logging placed before auth logs unauthenticated requests. Copies that drifted (one route allows an extra role, one returns 403 where others return 401) must be found and decided, because the shared version will make them identical. Tests are needed per route for the concern, not only for the middleware.
</context>

<task>
Extract the repeated code in {{handlers}}.

1. Read every handler and list the repeated concerns, with each route's exact variant: required roles, response status and body on failure, what is logged, which errors are caught. Mark routes that differ from the majority.
2. Design the shared units in the framework's idiom: what each does, how per-route options (roles, public routes) are declared, the order they run in, and where they attach. List routes that must be exempt (health, login, webhooks with their own signature check). Show the drifted variants for the user to decide. Wait for approval.
3. Pin current behaviour with tests per route for the concern: unauthenticated, wrong role, invalid input, internal error, with exact status and body.
4. Move one concern at a time: add the shared unit, remove the copies, run the tests{{#test_command}} with `{{test_command}}`{{/test_command}}.
5. Produce a route coverage table showing every route and which shared units apply before and after.
</task>

<constraints>
- No route may lose authentication, authorisation, validation or rate limiting; no public route may become protected unintentionally.
- Status codes, response bodies, headers and log fields stay the same, except for drift the user approved.
- Keep the order of checks where it affects responses or cost, and say where it changes.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Repeated concerns
Table: concern, routes, variants found.
## Design
Shared units, order, attachment points, per-route options and exemptions.
## Route coverage
Table: route, concerns before, concerns after.
## Diff
The change.
## Check
Tests run per concern and results.
</output_format>

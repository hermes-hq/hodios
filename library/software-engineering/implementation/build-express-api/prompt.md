---
schema: 1
id: build-express-api
kind: prompt
title: Build an Express API in TypeScript
description: Builds an Express API in TypeScript with routers per resource, schema validation, async error middleware, validated config, graceful shutdown and supertest tests. Use for an Express service.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, fullstack-engineer, software-engineer]
stack: [express, typescript]
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
tags: [rest-api, zod, error-middleware, supertest, graceful-shutdown]
pairs_with:
  prompts: [build-rest-endpoint, implement-graceful-shutdown, review-express-handler-change]
  personas: [backend-engineer, typescript-engineer]
  rules: [express-rules]
args:
  - name: api_spec
    description: The resources and operations to build, for example "users and orders; orders list filtered by status; JWT auth".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Structure, Contract, Changes, Tests, Verification, Decisions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a Node.js engineer building an Express API in TypeScript. Express is small, so every safety net has to be added on purpose:
- Express 4 does not catch rejected promises from `async` handlers. The request hangs and the process logs an unhandled rejection. Express 5 forwards them to the error middleware. Check the installed major version; on 4, wrap handlers or use the project's existing wrapper.
- One error middleware with four arguments, registered after all routes, turns known errors (validation, not found, conflict, unauthorised) into one JSON shape and logs unknown ones. Never send stack traces in production. Calling `res.json` after `next(err)` causes "headers already sent".
- Validate `req.body`, `req.params` and `req.query` at the edge with a schema (zod or what the project uses). Query values are strings or arrays, never numbers until parsed.
- Set `express.json({ limit })`, explicit CORS origins, and security headers. Behind a load balancer set `trust proxy` correctly, or `req.ip` and rate limits see only the proxy.
- Export a `createApp()` that builds the app without listening, so supertest can use it; `server.ts` loads config, listens and handles shutdown.
- Config is read once at startup and validated; a missing variable fails the boot, not the first request.
- Graceful shutdown on SIGTERM: stop accepting connections with `server.close()`, close idle keep-alive connections, wait for in-flight requests with a timeout, then close database pools.
- Keep routers thin: parse and validate, call a service, map the result. Business rules live in services that tests can call directly.
</context>

<task>
Build this API:
{{api_spec}}

1. Read `package.json` (Express major version, validation and test libraries), the existing app setup, routers, middleware, error handling and tests. Follow what exists; if the project is empty, propose the layout before writing.
2. Write the contract: routes, methods, request schemas, response shapes, status codes and auth per route.
3. Implement `createApp()`, one router per resource, validation middleware, services, the error middleware and a typed error class, config validation, and the server entry with graceful shutdown.
4. Write supertest tests per route: success, validation failure, not found, unauthorised, and an async error reaching the error middleware.
5. Run the tests, `tsc --noEmit` and the linter. Fix what fails.
</task>

<constraints>
- No `any` in request handling; infer types from the validation schemas.
- No unhandled promise in a route handler.
- Do not add packages the project does not already use without saying why.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Structure
The folder layout and what lives where.
## Contract
A table: Method | Path | Body or query | Response | Status codes | Auth.
## Changes
One line per file: `path`, what changed.
## Tests
One line per test and the case it covers.
## Verification
Commands run and their actual results.
## Decisions
Choices the spec did not settle, and why.
</output_format>

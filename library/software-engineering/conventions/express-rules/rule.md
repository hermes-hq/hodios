---
schema: 1
id: express-rules
kind: rule
title: Express rules
description: Standing rules for Express APIs covering a router per resource, input validation at the edge, async error handling, one error middleware, security middleware, config and graceful shutdown.
category: conventions
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer]
stack: [express]
requires: [none]
output: [code]
risk: read-only
invocation: user
model_tier: mid
level: intermediate
depth: specific
tags: [middleware, request-validation, error-middleware, graceful-shutdown, rest-api]
applies_to: ["**/*.js", "**/*.ts"]
pairs_with:
  rules: [api-design-rules, error-handling-rules, secure-coding-rules]
  prompts: [review-express-handler-change]
  personas: [backend-engineer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you write or change code in this Express app:

**Know the setup first**
- Check the Express major version. Express 5 forwards rejected promises from async handlers to the error middleware; Express 4 does not, so in v4 every async handler needs a wrapper (or the project's `asyncHandler` helper) or the request hangs and the error goes unhandled.
- Follow the existing structure for routers, controllers, services and validation. Express does not impose one, so consistency is on you.

**Structure**
- One `express.Router()` per resource, mounted in one place. Route handlers parse input, call a service, and send a response; business logic and database access live in services or modules that do not import `req` or `res`.
- Keep `app` creation separate from `listen()` (export the app from one module, start the server in another) so tests can use supertest without opening a port.

**Input and output**
- Validate `req.body`, `req.params` and `req.query` at the route with the project's schema library (zod, joi, express-validator, celebrate). Reject with 400 and a clear error body. Never pass `req.body` straight into a database query or model.
- Set body size limits on `express.json()` and only parse the body types a route accepts.
- Return explicit status codes (201 with a location for creates, 204 for empty). Send only the fields the client needs; never serialise database rows that include password hashes or internal fields.

**Errors**
- Have exactly one error-handling middleware (four arguments), registered last, that maps known error classes to status codes and returns a consistent error shape. Log the full error server-side with a request id; never send stack traces to clients in production.
- Call `next(err)` or throw (in async handlers on v5 or wrapped on v4); do not `res.status(500).send()` in every handler.
- Add a 404 handler for unmatched routes before the error middleware.
- Never send a response twice: return after `res.send` or `res.json`.

**Security and middleware**
- Use `helmet` (or equivalent headers), a CORS config with an explicit origin allow-list (never `origin: '*'` with credentials), and rate limiting on auth and expensive routes.
- Set `app.set('trust proxy', ...)` correctly when behind a load balancer, or IPs and secure cookies break.
- Session cookies are `httpOnly`, `secure` and `sameSite`. Disable `x-powered-by`.
- Use parameterised queries or the ORM; never build SQL or shell commands from request data.

**Config and lifecycle**
- Read config from environment variables in one validated config module at startup; fail fast if a required one is missing.
- Handle `SIGTERM`: stop accepting connections with `server.close()`, finish in-flight requests, close database pools, then exit, with a timeout.
- Use a structured logger (pino, winston) instead of `console.log`, with a request id per request.

**Before you finish**
- Run the linter, type check if TypeScript, and the tests, including a supertest case for the success path, a validation failure and an error path of the route you changed. Say what you ran.

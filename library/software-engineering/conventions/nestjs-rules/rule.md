---
schema: 1
id: nestjs-rules
kind: rule
title: NestJS rules
description: Standing rules for NestJS services covering module boundaries, DTO validation, thin controllers, typed config, exception filters, guards for auth, safe database transactions and testing modules.
category: conventions
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, fullstack-engineer]
stack: [nestjs]
requires: [none]
output: [code]
risk: read-only
invocation: user
model_tier: mid
level: intermediate
tags: [dependency-injection, dto-validation, guards, exception-filters, modules]
applies_to: ["src/**/*.ts", "test/**/*.ts"]
pairs_with:
  rules: [typescript-strict-rules, api-design-rules, error-handling-rules]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you write or change code in this NestJS service:

**Know the project first**
- Check the NestJS version, the HTTP adapter (Express or Fastify), the ORM or query layer and the validation library already in use, and follow them. Use the Nest CLI generators so files follow the project's naming.

**Modules**
- Organise by feature module. A module exports only the providers other modules need; do not import a module just to reach into its internals.
- Avoid circular module dependencies. If `forwardRef` seems necessary, the boundary is wrong; extract a shared module or event instead.

**Controllers and DTOs**
- Keep controllers thin: map the request to a DTO, call one service method, return the result. No business logic or database access in controllers.
- Validate every input with DTO classes and the global `ValidationPipe` configured with `whitelist: true` and `forbidNonWhitelisted: true` (or the project's schema validator). Transform and validate params and query strings too.
- Return response DTOs or serialised objects, never raw ORM entities that may carry password hashes or internal fields.

**Errors**
- Throw Nest HTTP exceptions (`NotFoundException`, `ConflictException`) or domain errors mapped by an exception filter. Never send stack traces or database errors to clients.
- Do not catch and swallow errors in services; let them reach the filter or rethrow with context.

**Configuration and security**
- Read configuration through `ConfigModule` with a validated schema at startup. Never read `process.env` directly in services or hard-code secrets.
- Protect routes with guards for authentication and authorisation, applied globally with explicit public routes, not remembered per handler.
- Keep request-scoped providers rare; they make the whole dependency chain request-scoped and slow.

**Data and async work**
- Wrap multi-step writes in a transaction through the ORM's transaction API, and keep external calls outside the transaction.
- Put slow or retryable work in a queue processor rather than in the request path, and make handlers idempotent.

**Tests**
- Unit test services with `Test.createTestingModule` and overridden providers for external dependencies. Write end-to-end tests for controllers with the real validation pipe and guards enabled.

---
schema: 1
id: build-ktor-service
kind: prompt
title: Build a Ktor HTTP service
description: Builds a Kotlin Ktor service with routing, kotlinx.serialization DTOs, authentication, request validation, StatusPages error mapping, non-blocking database access and testApplication tests.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, software-engineer]
stack: [kotlin]
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
tags: [ktor, coroutines, rest-api, kotlinx-serialization, jvm]
pairs_with:
  prompts: [build-rest-endpoint, build-spring-boot-rest-api]
  personas: [backend-engineer]
args:
  - name: api_spec
    description: The resources, operations and access rules, for example "bookings and rooms; staff manage rooms, members create and cancel their own bookings".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Contract, Changes, Tests, Verification, Decisions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a Kotlin engineer building a Ktor service. Ktor is a toolkit: nothing is on until you install a plugin, and coroutines change how blocking code hurts. The traps:
- Plugins: `ContentNegotiation` with kotlinx.serialization, `StatusPages` for error mapping, `RequestValidation` or explicit checks, `Authentication`, `CallLogging` and `CallId`. Check whether the project is on Ktor 2 or 3; some APIs and package names differ.
- Routes outside an `authenticate { }` block are public. Put protected routes inside it and read the principal there; ownership checks still belong in the service.
- Blocking JDBC calls inside a coroutine starve the request dispatcher. Use `withContext(Dispatchers.IO)`, Exposed's suspending transaction helper (`newSuspendedTransaction(Dispatchers.IO)` in Exposed 0.x; check the installed version's API), or an async driver, with a bounded connection pool (HikariCP).
- Use `@Serializable` request and response DTOs, separate from database rows. Decide `ignoreUnknownKeys` and `explicitNulls` deliberately; a non-null field with no default fails deserialisation and should map to 400, not 500.
- `StatusPages` maps domain exceptions (not found, conflict, validation, forbidden) to one error body; unknown exceptions are logged and returned as 500 without details. Bad JSON throws `BadRequestException` or `ContentTransformationException`; map it.
- Organise routes as extension functions per resource (`fun Route.bookingRoutes(service: BookingService)`), with services injected by the project's approach (constructor wiring or Koin).
- Configuration from `application.conf` or `application.yaml` with environment overrides, read in the module function; fail at startup when required values are missing.
- Tests with `testApplication { }`, a client with content negotiation installed, and test configuration for the database.
</context>

<task>
Build this API:
{{api_spec}}

1. Read `build.gradle.kts` (Ktor and Kotlin versions, plugins, database library), the application module, existing routes, auth setup and tests. Follow them.
2. Write the contract: routes, methods, DTOs, status codes and auth per route.
3. Implement DTOs, services with non-blocking database access, routes inside the right `authenticate` blocks, validation, `StatusPages` mappings and module wiring.
4. Write `testApplication` tests per route: success, invalid body, missing auth, another user's resource, not found, conflict.
5. Run the Gradle tests and the project's linters (ktlint or detekt). Fix what fails.
</task>

<constraints>
- No blocking database calls on the default dispatcher.
- Never return database entities directly; use DTOs.
- Do not add libraries the project does not already use without saying why.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Contract
A table: Method | Path | Request | Response | Status codes | Auth.
## Changes
One line per file: `path`, what changed.
## Tests
One line per test and the case it covers.
## Verification
Commands run and their actual results.
## Decisions
Choices the spec did not settle, and the existing code that justified each.
</output_format>

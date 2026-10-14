---
schema: 1
id: build-nestjs-module
kind: prompt
title: Build a NestJS feature module
description: Builds a NestJS feature module with controller, service, validated DTOs, guards, repository wiring, safe response serialisation, and unit plus e2e tests. Use when adding a feature to a NestJS app.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, fullstack-engineer, software-engineer]
stack: [nestjs]
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
depth: specific
tags: [dto-validation, guards, dependency-injection, e2e-tests, rest-api]
pairs_with:
  prompts: [build-rest-endpoint, implement-role-based-access]
  personas: [backend-engineer, typescript-engineer]
  rules: [nestjs-rules]
args:
  - name: feature_spec
    description: The feature, its entities, endpoints and access rules, for example "Teams module; admins create teams, members list their teams".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Module, Contract, Changes, Tests, Verification, Decisions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a NestJS engineer adding a feature module. Nest gives structure, and its failure modes come from that structure:
- Validation only runs if a `ValidationPipe` is applied, usually globally in `main.ts` with `whitelist: true`, `forbidNonWhitelisted: true` and `transform: true`. Nested DTOs need `@ValidateNested()` and `@Type(() => X)` or they are not validated at all.
- e2e tests that build the app with `Test.createTestingModule` do not run `main.ts`. Apply the same global pipes, filters, interceptors and prefixes in the test setup (ideally through a shared `configureApp(app)` function), or the tests pass against an app that differs from production.
- "Nest can't resolve dependencies" means a provider is not in the module's `providers` or not exported by the module that owns it. Export only what other modules need. Reaching for `forwardRef` usually signals a module boundary in the wrong place.
- Data access follows the project: TypeORM with `TypeOrmModule.forFeature([Entity])` and `@InjectRepository`, Prisma through a `PrismaService`, or another layer. Do not introduce a second one.
- Returning entities leaks columns such as password hashes. Return response DTOs, or use `ClassSerializerInterceptor` with `@Exclude`, consistently with the project.
- Authentication is a guard; roles use a custom decorator read with `Reflector` in a guard. Ownership ("may this user edit this team") belongs in the service query, not only in a guard.
- Throw Nest's HTTP exceptions (`NotFoundException`, `ConflictException`) from services or map ORM errors in an exception filter, so responses keep one shape.
- Avoid request-scoped providers unless needed; the scope spreads to every dependent and slows each request.
</context>

<task>
Build this feature module:
{{feature_spec}}

1. Read `main.ts`, `app.module.ts`, an existing feature module, the auth guards, data access layer, config and test setup. Follow their patterns.
2. Write the contract: routes, DTOs, response shapes, status codes and guards per route.
3. Implement the module, controller, service, DTOs with class-validator rules, response DTOs or serialisation, repository wiring and any entity and migration. Register the module.
4. Write unit tests for the service with mocked repositories, and e2e tests with supertest that use the same global setup as `main.ts`: success, validation errors including unknown fields, forbidden, not found.
5. Run the tests, the build and the linter. Fix what fails.
</task>

<constraints>
- Never return ORM entities that contain secrets or internal columns.
- Keep controllers thin: no data access in controllers.
- Do not add packages the project does not already use without saying why.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Module
Providers, imports and exports, and why each export is needed.
## Contract
A table: Method | Path | DTO | Response | Guards | Status codes.
## Changes
One line per file: `path`, what changed.
## Tests
One line per test and the case it covers.
## Verification
Commands run and their actual results.
## Decisions
Choices the spec did not settle, and the existing code that justified each.
</output_format>

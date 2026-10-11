---
schema: 1
id: build-aspnet-core-minimal-api
kind: prompt
title: Build an ASP.NET Core minimal API
description: Builds an ASP.NET Core minimal API with endpoint groups, dependency injection, EF Core, validation, typed results, problem details and OpenAPI. Use for a new .NET API or resource.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, software-engineer]
stack: [dotnet]
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
tags: [aspnet-core, minimal-api, ef-core, rest-api, openapi-docs]
pairs_with:
  prompts: [build-rest-endpoint, implement-pagination]
  personas: [dotnet-engineer]
args:
  - name: api_spec
    description: The resource, fields, operations, validation rules and who may call each operation.
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
You are a .NET engineer building endpoints with ASP.NET Core minimal APIs. Features differ by version, so check the target framework in the project file before choosing an approach. What good minimal API code looks like:
- Organise endpoints with `MapGroup` per resource in extension methods, applying shared configuration (prefix, `RequireAuthorization`, tags, filters) to the group, rather than one long `Program.cs`.
- Return `TypedResults` with a `Results<Ok<T>, NotFound, ValidationProblem>` return type so behaviour is testable and OpenAPI describes every response without extra attributes.
- Validation: .NET 10 adds built-in minimal API validation (`AddValidation` with data annotations); on earlier versions use an endpoint filter or the validation library the project already has. Return `ValidationProblem` with field errors.
- Errors: `AddProblemDetails` plus `UseExceptionHandler` (and an `IExceptionHandler` for domain exceptions) produce RFC 9457 responses without leaking exception details outside development.
- Dependency injection lifetimes: `DbContext` is scoped; never capture a scoped service in a singleton. Inject services as handler parameters.
- EF Core: project to DTOs with `Select` for reads (and `AsNoTracking` when loading entities only to read), avoid lazy-loading N+1, pass the request's `CancellationToken` to async calls, and change the schema through migrations.
- OpenAPI: on .NET 9 and later, `Microsoft.AspNetCore.OpenApi` with `AddOpenApi` and `MapOpenApi`; earlier projects often use Swashbuckle. Keep whatever the project already uses.
- Auth: authentication schemes and named authorization policies, plus a resource ownership check in the handler or service.
- Integration tests use `WebApplicationFactory<Program>` (the `Program` class must be visible to the test project, for example `public partial class Program {}`).
</context>

<task>
Build this API:
{{api_spec}}

1. Read the project file (target framework, packages), `Program.cs`, existing endpoint groups, DbContext, auth setup, error handling and tests. Follow their patterns.
2. Write the contract: routes, request and response records, validation, status codes, policies.
3. Implement the entity changes and migration, DTO records, the endpoint group with typed results, validation for this framework version, error mapping, authorization and OpenAPI metadata.
4. Write integration tests with `WebApplicationFactory` covering success, validation, authorization and not found.
5. Run `dotnet build` and `dotnet test` and report the results.
</task>

<constraints>
- Never return EF entities directly from endpoints.
- Do not apply migrations to a shared or production database; generate them and say how to apply.
- Never invent APIs for a framework version the project does not target; if unsure whether an API exists in that version, say so.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Contract
A table: Method and path | Request | Results | Policy.
## Changes
One line per file: `path`, what changed.
## Tests
One line per test: the case it covers.
## Verification
Commands run and their actual results.
## Decisions
Choices the spec did not settle, including version-specific ones, and the existing code that justified each.
</output_format>

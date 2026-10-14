---
schema: 1
id: test-aspnet-core-api
kind: prompt
title: Test an ASP.NET Core API
description: Writes integration tests for an ASP.NET Core API with WebApplicationFactory, swapped services, a real test database, authenticated test clients and isolated data per test.
category: testing
version: 1.0.0
status: incubating
stage: [build, verify]
role: [backend-engineer, software-engineer]
stack: [dotnet]
requires: [repo-read, file-write, shell]
inputs: [file, repo]
output: [tests, config]
risk: runs-commands
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [aspnet-core, webapplicationfactory, xunit, testcontainers, integration-tests]
pairs_with:
  prompts: [write-integration-tests, write-api-endpoint-tests]
  personas: [dotnet-engineer, test-engineer]
args:
  - name: api
    description: The API project or endpoints to test, as paths or pasted code, including Program.cs and how authentication and the database are configured.
    type: text
    required: true
  - name: test_stack
    description: The test framework and libraries if not obvious, for example "xUnit with FluentAssertions" or "NUnit".
    type: string
output_contract:
  format: markdown
  sections: [Test host setup, Data and auth, Tests, Check, Gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a .NET engineer who tests APIs through the real hosting pipeline. `WebApplicationFactory<Program>` from `Microsoft.AspNetCore.Mvc.Testing` starts the app in memory with its real middleware, routing, model binding, filters and serialisation, and `CreateClient()` returns an `HttpClient` wired to it. With minimal hosting the test project needs access to `Program` (a `public partial class Program` declaration or `InternalsVisibleTo`). `WithWebHostBuilder` and `ConfigureTestServices` replace specific services: external HTTP clients, clocks, email senders, message buses.

The two hard parts are the database and authentication. The EF Core in-memory provider is not a relational database (no constraints, transactions or SQL translation) and Microsoft's guidance discourages it for testing; SQLite in-memory is closer but still differs from SQL Server or PostgreSQL. A Testcontainers database matching production, with migrations applied once and data reset between tests (Respawn, or a transaction per test), gives honest results. For auth, register a test authentication handler that turns a header into a `ClaimsPrincipal` with chosen claims, so tests can act as different users and roles without disabling `[Authorize]`. Share one factory per test collection (`IClassFixture` or a collection fixture in xUnit) so the host starts once.
</context>

<task>
Write integration tests for this ASP.NET Core API{{#test_stack}} using {{test_stack}}{{/test_stack}}:

{{api}}

1. Read `Program.cs`, the endpoints or controllers, authentication and authorisation policies, the DbContext and existing tests. Note the .NET version and whether it uses minimal APIs or controllers.
2. Build the test host: a custom `WebApplicationFactory<Program>` that sets the environment to `Testing`, points the DbContext at a Testcontainers database matching production, applies migrations once, and replaces external services with fakes in `ConfigureTestServices`. Share it with a collection fixture.
3. Add data and auth helpers: a reset between tests (Respawn or equivalent), builders for test data, and a test authentication handler with a helper that creates a client acting as a given user with given roles or claims.
4. Write tests for each endpoint: success with response body assertions, validation problems (400 with ProblemDetails), unauthenticated (401), forbidden including another user's resource (403 or 404), not found, and side effects checked in the database.
5. Run `dotnet test` and report results, then list what is not covered.
</task>

<constraints>
- Do not remove or bypass `[Authorize]` or policies for tests; use a test authentication handler.
- Do not use the EF Core in-memory provider for tests that depend on relational behaviour; say so if the project already does.
- Tests must not depend on order and must not call real external services.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Test host setup
The factory class and fixture.
## Data and auth
Database reset, data builders and the test authentication handler.
## Tests
The test classes.
## Check
Commands run and results.
## Gaps
What is not covered and why.
</output_format>

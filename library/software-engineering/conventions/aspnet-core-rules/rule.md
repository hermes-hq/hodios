---
schema: 1
id: aspnet-core-rules
kind: rule
title: ASP.NET Core rules
description: Standing rules for ASP.NET Core services covering thin endpoints, the options pattern, DI lifetimes, EF Core usage, ProblemDetails errors, validation, cancellation tokens and logging.
category: conventions
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer]
stack: [dotnet]
requires: [none]
output: [code]
risk: read-only
invocation: user
model_tier: mid
level: intermediate
tags: [minimal-apis, dependency-injection, ef-core, problem-details, options-pattern]
applies_to: ["**/*.cs", "**/appsettings*.json"]
pairs_with:
  rules: [csharp-style-rules, api-design-rules]
  prompts: [build-aspnet-core-minimal-api, test-aspnet-core-api]
  personas: [dotnet-engineer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you write or change code in this ASP.NET Core service:

**Know the project first**
- Check the target framework in the `.csproj`, whether the project uses minimal APIs or controllers, and its validation, mapping and data access libraries. Follow that style; do not add a second one.

**Endpoints**
- Keep endpoints and controller actions thin: bind input, call an application service or handler, map the result to an HTTP response. No EF Core queries or business rules inline in the endpoint.
- Group minimal API endpoints with `MapGroup` per resource and put them in extension methods, not one long `Program.cs`. Use `TypedResults` so OpenAPI metadata is accurate.
- Accept request DTOs and return response DTOs; never bind directly to or return EF entities (over-posting, lazy-loading surprises, leaked fields).
- Accept a `CancellationToken` in every async endpoint and pass it to every async call down to EF Core and `HttpClient`.

**Validation and errors**
- Validate request DTOs with the project's approach (data annotations, FluentValidation or endpoint filters) before the handler runs.
- Register `AddProblemDetails()` and a global exception handler (`IExceptionHandler` or `UseExceptionHandler`) so all errors return RFC 7807 ProblemDetails. Map domain exceptions to 400, 404 or 409 in one place. Never return exception messages or stack traces in production.

**Dependency injection**
- Choose lifetimes deliberately: `DbContext` and per-request services are scoped; stateless helpers can be singletons. Never inject a scoped service into a singleton (captive dependency); use `IServiceScopeFactory` in background services.
- Use `IHttpClientFactory` (typed or named clients) instead of `new HttpClient()` per call.
- Depend on interfaces only where there is a real seam (external systems, tests); do not wrap every class in an interface by reflex.

**Configuration**
- Bind settings to classes with the options pattern (`services.AddOptions<T>().Bind(...).ValidateDataAnnotations().ValidateOnStart()`) and inject `IOptions<T>`; do not read `IConfiguration["Key"]` deep in services.
- Secrets come from user secrets in development and environment variables or a vault in production, never `appsettings.json` in the repository.

**EF Core**
- Use `AsNoTracking()` for read-only queries, project to DTOs with `Select`, and include related data deliberately to avoid N+1 queries. Never call `.ToList()` before filtering.
- Async all the way: `ToListAsync`, `SaveChangesAsync`; never `.Result` or `.Wait()`.
- Change the schema with migrations committed alongside the model change; review the generated migration for data loss before applying.

**Logging and security**
- Use `ILogger<T>` with message templates (`LogInformation("Order {OrderId} created", id)`), not string interpolation. Never log tokens, passwords or full request bodies with personal data.
- Protect endpoints with authorization policies (`RequireAuthorization("Policy")`) rather than ad hoc checks in handlers, and check resource ownership for every id from the client.

**Before you finish**
- Run `dotnet build` with warnings visible and `dotnet test`, including an integration test with `WebApplicationFactory` for endpoints you changed. Say what you ran.

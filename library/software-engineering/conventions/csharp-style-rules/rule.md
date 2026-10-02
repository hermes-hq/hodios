---
schema: 1
id: csharp-style-rules
kind: rule
title: C# style rules
description: Standing rules for C# an assistant writes, covering nullable reference types, async all the way with cancellation tokens, records and pattern matching, dependency injection and xUnit tests.
category: conventions
version: 1.0.0
status: experimental
stage: [build]
role: [software-engineer, backend-engineer]
stack: [dotnet]
requires: [none]
risk: read-only
tags: [nullable-reference-types, async-await, dependency-injection, xunit, records]
applies_to: ["**/*.cs"]
pairs_with:
  rules: [test-writing-rules, secure-coding-rules]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you write or change C# code in this project:

**Tooling and version**
- Use the target framework and `LangVersion` the project files declare, and only features they support. Do not change them on your own.
- Follow the repository's `.editorconfig` and analyzers, and keep the build free of new warnings. Use file-scoped namespaces and the project's existing conventions for `using` directives.
- Add NuGet packages only when the base class library cannot do the job in a few lines, through the project's central package management if it has it.

**Nullable reference types**
- Code assumes `<Nullable>enable</Nullable>`. Annotate every reference that can be null with `?` and handle it; never silence warnings with the null-forgiving operator unless a comment explains why the value cannot be null.
- Validate public arguments with `ArgumentNullException.ThrowIfNull(arg)` and the related `ThrowIf` helpers.
- Return empty collections, not `null`. Use the `Try` pattern (`bool TryGet(..., out T value)`) or a nullable return when absence is normal.

**Async**
- Async all the way: never block on tasks with `.Result`, `.Wait()` or `GetAwaiter().GetResult()`. Return `Task` or `Task<T>`; use `async void` only for event handlers.
- Every async method that does I/O takes a `CancellationToken cancellationToken` as its last parameter and passes it to every call that accepts one. Do not default it silently in public APIs that callers should cancel.
- Name async methods with the `Async` suffix. Use `ConfigureAwait(false)` in library code; it is not needed in ASP.NET Core application code.
- Use `ValueTask` only where a measurement shows allocation matters. Use `IAsyncEnumerable<T>` for streaming results, and `await using` for `IAsyncDisposable`.

**Types and language features**
- Use records (or `record struct`) for immutable data, `init` accessors and `required` members for object construction, and keep mutable state private.
- Prefer switch expressions and pattern matching over `if`/`else` chains on types or values, with a discard arm that throws for unexpected cases.
- Use `DateTimeOffset` for timestamps and inject `TimeProvider` where code needs the current time. Use `decimal` for money.
- Always pass a `StringComparison` to string comparisons and `IndexOf`/`StartsWith` calls; use `StringComparer.OrdinalIgnoreCase` for case-insensitive keys.

**Dependency injection and configuration**
- Use constructor injection (primary constructors if the project uses them). No service locator calls to `IServiceProvider` inside business code.
- Register lifetimes correctly: never inject a scoped service (such as a `DbContext`) into a singleton. Bind configuration to options classes with `IOptions<T>` and validate them at startup.
- Create HTTP clients through `IHttpClientFactory` or typed clients, never `new HttpClient()` per call.

**Errors and resources**
- Throw specific exceptions with useful messages. Rethrow with `throw;` to keep the stack trace, never `throw ex;`. Never catch `Exception` to ignore it; catch broadly only at a boundary that logs and translates.
- Dispose `IDisposable` resources with `using` declarations. Do not use exceptions for normal control flow.

**Data access and LINQ**
- Keep LINQ readable; avoid enumerating the same `IEnumerable` twice (materialise once with `ToList()` when needed).
- With Entity Framework Core, use async query methods with the cancellation token, `AsNoTracking()` for read-only queries, and projections or `Include` to avoid N+1 queries.

**Logging**
- Use `ILogger<T>` with message templates and named placeholders: `logger.LogInformation("Order {OrderId} shipped", orderId)`. Never string interpolation in log calls, and never log secrets or personal data. Use the `LoggerMessage` source generator on hot paths if the project does.

**Tests (xUnit)**
- Use `[Fact]` for single cases and `[Theory]` with `[InlineData]` or `[MemberData]` for input tables. Name tests `Method_Scenario_ExpectedResult` or follow the project's existing scheme.
- Put setup in the constructor and cleanup in `Dispose` or `IAsyncLifetime`; no shared static mutable state between tests.
- Use the assertion library the project already uses, and `await Assert.ThrowsAsync<TException>(...)` for async failures, checking the exception type and message.
- Mock only at boundaries (HTTP, storage, time) with the project's mocking library; use a fake `TimeProvider` for time. Never `Thread.Sleep` or `Task.Delay` to wait for work in tests.

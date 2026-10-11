---
schema: 1
id: write-xunit-tests
kind: prompt
title: Write xUnit tests for C# code
description: Writes .NET unit tests for a C# class with xUnit facts and theories, Moq or NSubstitute at the boundaries, async assertions, injected time and the project's assertion library.
category: testing
version: 1.0.0
status: incubating
stage: [build, verify]
role: [backend-engineer, software-engineer]
stack: [dotnet]
requires: [repo-read, file-write, shell]
inputs: [file, repo]
output: [tests]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [xunit, moq, nsubstitute, theories, unit-tests]
pairs_with:
  prompts: [write-unit-tests, test-aspnet-core-api, write-test-data-factories]
  personas: [dotnet-engineer, test-engineer]
args:
  - name: target
    description: The C# class or methods to test, as a path or pasted code, with the interfaces it depends on.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Cases, Doubles, Tests, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a .NET engineer who writes unit tests with xUnit that are fast and say exactly what broke. What matters in this stack:
- xUnit creates a new instance of the test class for every test: the constructor is per-test setup and `IDisposable` or `IAsyncLifetime` is teardown. Shared expensive setup goes in `IClassFixture<T>`; static fields shared across tests leak state.
- `[Fact]` for one scenario, `[Theory]` with `[InlineData]` for simple values and `[MemberData]` or `TheoryData<...>` for objects. Name tests `Method_Condition_Result` or the project's convention.
- Async: test methods return `async Task`, never `async void`. Assert exceptions with `await Assert.ThrowsAsync<T>(...)` (or `await act.Should().ThrowAsync<T>()`); a missing `await` makes the test pass while the exception is never observed. Avoid `.Result` and `.Wait()`.
- Doubles: use the library already in the project. Moq `Setup`/`Verify` with `It.Is<T>(...)`, NSubstitute `Returns`/`Received()` with `Arg.Is<T>(...)`; check what the class sends to a collaborator, not every call it makes. Mock interfaces the class depends on; use real records, DTOs and value objects. A class that news up `HttpClient` or calls `DateTime.UtcNow` needs a seam: `TimeProvider` (.NET 8+) or a clock interface, and `IHttpClientFactory` or a stub `HttpMessageHandler`.
- FluentAssertions 8 moved to a paid commercial licence (Xceed) for commercial use, while version 7 stays Apache-2.0; use what the project already references (FluentAssertions 7, Shouldly, AwesomeAssertions or plain `Assert`) rather than adding a dependency.
- `ILogger<T>` can be a `NullLogger<T>` unless the log is the behaviour.
</context>

<task>
Write xUnit unit tests for {{target}}.

1. Read the class, its dependencies, the existing test project (`.csproj` references, assertion and mocking libraries, naming) and the target framework. Follow what exists.
2. List the cases: normal paths, boundaries, null and empty inputs, invalid states with the exact exception type and message, async failure paths and cancellation if the method takes a `CancellationToken`.
3. Choose doubles: mock interfaces with behaviour or side effects using the project's library, use real values elsewhere, inject `TimeProvider` (with `FakeTimeProvider` from `Microsoft.Extensions.TimeProvider.Testing`) or the existing clock abstraction for time. If a seam is missing, propose the smallest constructor-injection change as a diff.
4. Write the tests: `[Theory]` for data variations, per-test setup in the constructor, `async Task` tests with awaited exception assertions, verification of commands sent to collaborators with argument matchers.
5. Run `dotnet test --filter` for the new tests, then the project, and report results.
</task>

<constraints>
- No `async void` tests, no `.Result` or `.Wait()` in tests.
- Do not add a new assertion or mocking library when the project already has one; ask before adding any.
- Do not mock concrete classes with virtual-method tricks when an interface seam is the right fix.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Cases
Table: test name, scenario, expected result or exception.
## Doubles
What is mocked or faked and why, and any seam diff.
## Tests
The test classes.
## Check
Commands run and results.
</output_format>

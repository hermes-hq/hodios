---
schema: 1
id: review-csharp-async-code
kind: prompt
title: Review C# async code
description: Reviews C# async code for async void, .Result and .Wait deadlocks, fire-and-forget tasks, ConfigureAwait misuse, early disposal and cancellation tokens that are never passed on.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [backend-engineer, software-engineer]
stack: [csharp]
requires: [repo-read]
inputs: [diff, file]
output: [report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [async-await, deadlocks, cancellation, idisposable, pull-request]
pairs_with:
  personas: [dotnet-engineer]
  prompts: [review-pull-request, review-diff-for-concurrency-bugs]
  rules: [csharp-style-rules]
args:
  - name: diff
    description: The diff with file paths, including the callers of any method whose signature changed between sync and async.
    type: text
    required: true
  - name: context
    description: Application type (ASP.NET Core, classic ASP.NET, WPF or WinForms, library, worker service) and .NET version, since synchronisation context and deadlock risk depend on it.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Findings, Missing tests, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Async bugs in C# depend on where the code runs. Blocking on a task with `.Result`, `.Wait()` or `GetAwaiter().GetResult()` deadlocks in UI apps and classic ASP.NET, where the continuation needs the thread that is blocked; in ASP.NET Core there is no synchronisation context, so it does not deadlock but starves the thread pool under load. `ConfigureAwait(false)` matters in library code that may be called from a UI or classic ASP.NET context; demanding it in ASP.NET Core application code is noise. `async void` is only for event handlers: exceptions from it cannot be caught by the caller and crash the process, and an async lambda passed where an `Action` is expected (`List.ForEach`, `Parallel.ForEach`, timer callbacks) is silently `async void`. Fire-and-forget tasks lose exceptions and outlive the request scope that owned their dependencies. Eliding `async`/`await` (returning the task directly) inside a `using` block disposes the resource before the task finishes. `IAsyncDisposable` resources need `await using`. A `CancellationToken` parameter that is not passed to the calls below it makes cancellation a lie, and catching `OperationCanceledException` as a failure turns normal cancellation into error logs. `lock` cannot contain `await`; `SemaphoreSlim` must be released in `finally`. A `ValueTask` must be awaited once only. `Task.Run` inside an ASP.NET Core request is fake async that only moves work to another pool thread. `new HttpClient()` per call exhausts sockets; use `IHttpClientFactory` or a shared instance.
</context>

<task>
<diff>
{{diff}}
</diff>

{{#context}}
<context_given>
{{context}}
</context_given>
{{/context}}

1. If you can read the repository, open each changed file in full and the callers and callees of every async method touched, before judging any hunk. Establish the application type first, because it decides which findings are real. If you only have the diff, say which conclusions depend on code you could not see.
2. Find every place the change blocks on a task (`.Result`, `.Wait()`, `GetAwaiter().GetResult()`, `Task.WaitAll`) and classify it for this application type: deadlock, thread-pool starvation, or acceptable (for example `Main` in a console app).
3. Find every `async void` method and every async lambda converted to a void-returning delegate, and every task that is started but not awaited, stored or observed. For each, say what happens to an exception and to scoped dependencies such as a DbContext.
4. Check resource lifetime across awaits: `using` blocks around elided awaits, `IAsyncDisposable` without `await using`, `HttpClient` created per call, and `SemaphoreSlim` or other locks not released in `finally`.
5. Check cancellation: tokens accepted but not passed down, missing tokens on long I/O in request or background paths, `OperationCanceledException` logged as an error or swallowed, and timeouts implemented with `Task.Delay` races that leave the losing task running.
6. Check context and composition: `ConfigureAwait(false)` missing in library code that UI or classic ASP.NET apps call, `Task.Run` wrapping I/O in ASP.NET Core, `ValueTask` awaited twice or stored, `Task.WhenAll` where only the first exception is inspected, and `lock` or thread-affine code around awaits.
7. For each finding, write the concrete input, request or sequence of events that triggers it and what goes wrong. Drop any finding you cannot trigger from the code you have read.
8. Rate each finding: high (deadlock, process crash from async void, lost exceptions on writes, disposed resource used mid-operation), medium (thread-pool starvation under load, cancellation ignored on long calls, socket exhaustion), low.
9. List the tests that would fail on the current code and pass once it is fixed.
</task>

<constraints>
- Tie every deadlock or `ConfigureAwait` finding to the application type; if it is unknown, ask and say which findings depend on it.
- Do not recommend making everything async in one change; propose the smallest fix for each call site and note any caller chain that must change with it.
- At most 10 findings, most severe first. No style, naming or formatting comments unless they cause a defect.
- Stay read-only: do not edit files, push, or run commands that change state. Running read-only checks (type checker, linter, tests) is fine and worth reporting.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: approve | approve-with-nits | request-changes, and the main reason.
## Findings
Numbered. Each: severity, `path:line`, the method, the defect, the context it runs in and the triggering sequence or load, the fix in one or two sentences.
## Missing tests
Bullets naming the case each test covers, or "None".
## Questions
Versions, settings or business rules you need confirmed, or "None".
</output_format>

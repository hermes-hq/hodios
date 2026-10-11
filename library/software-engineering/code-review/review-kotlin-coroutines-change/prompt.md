---
schema: 1
id: review-kotlin-coroutines-change
kind: prompt
title: Review a Kotlin coroutines change
description: Reviews Kotlin coroutine code for GlobalScope use, wrong dispatchers, broken structured concurrency, swallowed CancellationException and Flow collection that leaks or loses events.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [mobile-engineer, backend-engineer]
stack: [kotlin]
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
tags: [coroutines, kotlin-flow, structured-concurrency, cancellation, pull-request]
pairs_with:
  personas: [kotlin-android-engineer]
  prompts: [review-pull-request, review-diff-for-concurrency-bugs, review-mobile-app-change]
  rules: [kotlin-style-rules]
args:
  - name: diff
    description: The diff with file paths, including ViewModels, repositories, use cases, and where coroutine scopes and dispatchers are created or injected.
    type: text
    required: true
  - name: context
    description: Platform (Android, server with Ktor or Spring, multiplatform), kotlinx.coroutines version, and the lifecycle the code is tied to (screen, ViewModel, request, application).
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
Structured concurrency is the contract that makes coroutines safe: every coroutine has a parent scope, a failure cancels its siblings, and cancelling the scope stops everything inside. Code that breaks the contract leaks work. `GlobalScope.launch` or `CoroutineScope(Job()).launch` without anyone cancelling the scope keeps running after the screen or request is gone. `runBlocking` on the main thread or in a request handler blocks a thread the app needs. Dispatchers carry the threading rules: blocking I/O on `Dispatchers.Default` starves CPU work, on `Main` it freezes the UI, and hard-coded dispatchers make tests flaky, so inject them. Cancellation is cooperative and travels as `CancellationException`: `catch (e: Exception)` or `runCatching` around a suspend call swallows it and the coroutine keeps going after it was cancelled; CPU loops need `ensureActive()` or `yield()`, and cleanup that suspends in `finally` needs `withContext(NonCancellable)`. Exception handling differs by builder: `async` holds its exception until `await`, `CoroutineExceptionHandler` only works on a root `launch`, and `SupervisorJob` passed to a child `launch` does not make it a supervisor. Flows: collecting in `lifecycleScope.launch` without `repeatOnLifecycle` keeps collecting in the background; a `SharedFlow` with no replay drops events emitted before collection, while `StateFlow` conflates and drops repeated equal values (bad for one-off events); `catch` only covers upstream; `callbackFlow` needs `awaitClose` or the listener leaks. `synchronized` cannot guard state across suspension points; `Mutex` can, but is not reentrant.
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

1. If you can read the repository, open each changed file in full and find where every scope and dispatcher used by the change is created, injected and cancelled, before judging any hunk. If you only have the diff, say which conclusions depend on code you could not see.
2. For every `launch`, `async` and flow collection the change adds, name its scope and what cancels that scope. Flag `GlobalScope`, ad hoc `CoroutineScope(...)` without cancellation, `runBlocking` outside `main` or tests, and work that must outlive the screen launched in a screen scope (or the reverse).
3. Check dispatchers: blocking calls (file, JDBC, legacy SDKs, `Thread.sleep`) on `Main` or `Default`, CPU-heavy work on `Main`, hard-coded dispatchers in classes that tests need to control, and `withContext` switching missing around blocking calls.
4. Check cancellation and exceptions: `catch (Exception)`, `catch (Throwable)` and `runCatching` around suspend calls that swallow `CancellationException`, long loops without cancellation checks, suspending cleanup in `finally` without `NonCancellable`, `async` whose result is never awaited, and `CoroutineExceptionHandler` or `SupervisorJob` used where they have no effect.
5. Check flows: collection not tied to the lifecycle, one-off events (navigation, toasts) modelled with `StateFlow` or a `SharedFlow` that drops them, `flowOn` placed after the operators it should cover, `catch` expected to handle downstream errors, `stateIn` or `shareIn` with `Eagerly` where it keeps upstream alive, and `callbackFlow` without `awaitClose`.
6. Check shared state: mutable state touched from coroutines on different threads without `Mutex` or confinement, `synchronized` around suspension points, and re-entrant `Mutex` use that deadlocks.
7. For each finding, write the concrete input, request or sequence of events that triggers it and what goes wrong. Drop any finding you cannot trigger from the code you have read.
8. Rate each finding: high (work that keeps running after cancellation, writes repeated or lost, UI freezes, deadlocks), medium (events dropped, collection in the background wasting battery or quota), low.
9. List the tests that would fail on the current code and pass once it is fixed.
</task>

<constraints>
- Tie API advice to the platform and library versions given (`repeatOnLifecycle`, `collectAsStateWithLifecycle`, `Dispatchers.IO.limitedParallelism`); ask when unknown.
- Do not replace coroutines with another concurrency model; fix scope, dispatcher or flow usage in place.
- At most 10 findings, most severe first. No style, naming or formatting comments unless they cause a defect.
- Stay read-only: do not edit files, push, or run commands that change state. Running read-only checks (type checker, linter, tests) is fine and worth reporting.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: approve | approve-with-nits | request-changes, and the main reason.
## Findings
Numbered. Each: severity, `path:line`, the coroutine or flow, its scope and dispatcher, the defect, the triggering lifecycle event or interleaving, the fix in one or two sentences.
## Missing tests
Bullets naming the case each test covers, or "None".
## Questions
Versions, settings or business rules you need confirmed, or "None".
</output_format>

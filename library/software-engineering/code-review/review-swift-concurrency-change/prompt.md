---
schema: 1
id: review-swift-concurrency-change
kind: prompt
title: Review a Swift concurrency change
description: Reviews Swift async code for MainActor violations, silenced Sendable checks, actor reentrancy bugs, misused continuations, retain cycles and unstructured tasks that are never cancelled.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [mobile-engineer]
stack: [swift]
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
tags: [async-await, actors, sendable, main-actor, pull-request]
pairs_with:
  personas: [swift-ios-engineer]
  prompts: [review-pull-request, review-diff-for-concurrency-bugs, review-swiftui-view-change]
  rules: [swift-style-rules]
args:
  - name: diff
    description: The diff with file paths, including the types whose isolation changed and any bridging code between completion handlers, Combine or GCD and async/await.
    type: text
    required: true
  - name: context
    description: Swift language mode (5 or 6) and strict concurrency setting, minimum iOS or macOS version, and whether the code is app code or a shared package.
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
Swift concurrency moves race detection to compile time, which tempts developers to silence the compiler instead of fixing the design. `@unchecked Sendable`, `nonisolated(unsafe)` and `@preconcurrency` imports each assert something the compiler could not prove; each needs a reason and, for `@unchecked Sendable`, a lock or other synchronisation that actually protects every mutable field. Actors protect against data races, not against logic races: an actor method that checks state, awaits, and then acts on the earlier check is reentrant, so a second call can run during the await. The classic case is a cache that checks for a value, awaits a download and stores it, letting two callers download twice; the fix is to store the in-flight `Task` and await it. `Task { }` inherits the current actor, so inside a `@MainActor` view model heavy work in the task still runs on the main thread; `Task.detached` drops priority, task-locals and isolation and is rarely what is wanted. Unstructured tasks are not cancelled when their owner goes away: a `Task` looping over an `AsyncSequence` with a strong `self` keeps the object alive forever. Continuations must be resumed exactly once: twice crashes with a checked continuation, never leaves the caller suspended for good. Blocking the cooperative thread pool with `DispatchSemaphore.wait` or synchronous I/O inside async code can deadlock or starve it. Cancellation is cooperative, so long work needs `Task.checkCancellation()` or `Task.isCancelled` checks.
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

1. If you can read the repository, open each changed file in full and check the isolation of every type involved (actor, `@MainActor`, nonisolated) and the build settings for the language mode and strict concurrency, before judging any hunk. If you only have the diff, say which conclusions depend on code you could not see.
2. Map isolation: for each changed function, say which actor it runs on and where it crosses to another. Flag UI state touched off the main actor, heavy synchronous work running on the main actor (including inside `Task { }` started from a `@MainActor` context), and `MainActor.run` sprinkled where an annotation belongs.
3. Check every `@unchecked Sendable`, `nonisolated(unsafe)`, `@preconcurrency` and `@Sendable` closure the change adds or relies on: what makes it safe, and whether all mutable state is actually protected.
4. Check actors for reentrancy: state read before an `await` and used after it, duplicate work started by concurrent callers, and invariants that only hold if no other call interleaves.
5. Check task lifetime and memory: unstructured `Task`s stored nowhere or never cancelled, `Task.detached` without a reason, strong `self` captures in long-running tasks or async sequences, task groups whose child errors are ignored, and missing cancellation checks in long loops.
6. Check bridging code: continuations resumed twice or on some paths never, completion handlers called on unexpected queues, `DispatchSemaphore` or `DispatchQueue.sync` used to wait on async work, and Combine or GCD code mixed with actors in ways that bypass isolation.
7. For each finding, write the concrete input, request or sequence of events that triggers it and what goes wrong. Drop any finding you cannot trigger from the code you have read.
8. Rate each finding: high (data races hidden by unchecked conformances, crashes from double resume, deadlocks, UI updated off the main thread), medium (duplicate work from reentrancy, leaked tasks and objects, main-thread hitches), low.
9. List the tests that would fail on the current code and pass once it is fixed.
</task>

<constraints>
- Tie advice to the Swift language mode and deployment target given (Swift 6 strict checking, `@Observable`, typed throws); ask when unknown.
- Do not fix a compiler diagnostic by adding `@unchecked Sendable`, `nonisolated(unsafe)` or `@preconcurrency`; propose a design fix or explain why the escape hatch is safe.
- At most 10 findings, most severe first. No style, naming or formatting comments unless they cause a defect.
- Stay read-only: do not edit files, push, or run commands that change state. Running read-only checks (type checker, linter, tests) is fine and worth reporting.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: approve | approve-with-nits | request-changes, and the main reason.
## Findings
Numbered. Each: severity, `path:line`, the function and its isolation, the defect, the triggering interleaving or lifecycle event, the fix in one or two sentences.
## Missing tests
Bullets naming the case each test covers, or "None".
## Questions
Versions, settings or business rules you need confirmed, or "None".
</output_format>

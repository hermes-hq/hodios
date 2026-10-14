---
schema: 1
id: adopt-swift-6-strict-concurrency
kind: prompt
title: Adopt Swift 6 strict concurrency checking
description: Moves a Swift codebase to Swift 6 data-race safety module by module, fixing Sendable, actor isolation and global state errors with minimal escape hatches and runtime checks.
category: migration
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [mobile-engineer, software-engineer]
stack: [swift]
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [diff, report, checklist]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [swift-6, sendable, actor-isolation, main-actor, data-race-safety]
pairs_with:
  prompts: [review-swift-concurrency-change, write-swift-testing-tests, convert-callbacks-to-async-await]
  personas: [swift-ios-engineer]
args:
  - name: project
    description: Swift and Xcode versions, modules or packages, how much code uses async/await versus callbacks and GCD, and key Apple or third-party frameworks used.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Module order, Diagnostics by cause, Changes made, Runtime checks, Remaining risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Swift 6 language mode turns data-race diagnostics into errors, and it can be adopted per target or package. The low-risk path is to stay in Swift 5 mode, turn strict concurrency checking to complete, fix warnings module by module from the leaves upward, and only then switch each module's language mode. Most errors fall into a few groups: types crossing isolation boundaries that are not `Sendable`, UI code that needs `@MainActor`, mutable global and static state that must become isolated or immutable, and closures captured across tasks. Escape hatches exist (`@preconcurrency import` for modules not yet annotated, `@unchecked Sendable`, `nonisolated(unsafe)`), and each one is a promise the compiler can no longer check, so it needs a real lock or invariant behind it. Newer Swift versions add an option to make a module's code main-actor isolated by default, which suits app UI targets. The failure that tests often miss is runtime: a closure the compiler treats as main-actor isolated may be called by an Objective-C or C framework on a background thread, and the runtime isolation check then crashes the app.
</context>

<task>
Project: {{project}}

1. Read the package and project settings and list modules with their language mode and checking level. Order them leaves first.
2. For the first module, enable complete checking in Swift 5 mode and collect diagnostics. Group them by cause, not by file.
3. Fix by cause: make value types `Sendable`, isolate UI types and view models to the main actor, turn shared mutable state into actors or isolated properties, and restructure closures that cross tasks. Use `@preconcurrency import` only for dependencies that are not yet annotated, and note them.
4. Use `@unchecked Sendable` or `nonisolated(unsafe)` only with a lock or invariant you can name; list each one.
5. When a module is clean, switch it to Swift 6 mode, build, run tests, then move to the next.
6. Exercise flows that receive callbacks from system or third-party frameworks (notifications, delegates, completion handlers) in a debug build to catch runtime isolation failures.
</task>

<constraints>
- Do not mark whole types or modules `@MainActor` just to silence errors when the work belongs off the main thread.
- Do not add `@unchecked Sendable` without a stated synchronization mechanism.
- Do not switch every module to Swift 6 mode at once.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Module order
Modules in migration order with current mode and checking level.
## Diagnostics by cause
Grouped errors: Sendable, isolation, global state, preconcurrency imports.
## Changes made
Per module, with each escape hatch listed and justified.
## Runtime checks
Flows exercised to catch dynamic isolation failures, with results.
## Remaining risks
Bullets, or "None".
</output_format>

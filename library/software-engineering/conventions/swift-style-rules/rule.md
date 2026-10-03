---
schema: 1
id: swift-style-rules
kind: rule
title: Swift style rules
description: Standing rules for Swift an assistant writes, covering value types, optionals without force unwraps, structured concurrency, access control and API Design Guidelines naming.
category: conventions
version: 1.0.0
status: incubating
stage: [build]
role: [mobile-engineer, software-engineer, backend-engineer]
stack: [swift]
requires: [none]
risk: read-only
tags: [optionals, structured-concurrency, sendable, access-control, api-naming]
applies_to: ["**/*.swift"]
pairs_with:
  rules: [test-writing-rules]
  personas: [mobile-engineer]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you write or change Swift code in this project:

**Tooling and versions**
- Use the Swift language version and concurrency checking level the project already sets (in `Package.swift` or the Xcode build settings). Do not raise or lower them as a side effect.
- Follow the project's formatter and linter (swift-format or SwiftLint) if configured. Do not reformat code you are not changing.

**Types and values**
- Prefer `struct` and `enum` for models and values. Use a `class` only for identity, shared mutable state or framework requirements, and mark it `final` unless it is designed for subclassing.
- Prefer `let` over `var`. Keep mutation local and explicit with `mutating` methods.
- Model closed sets of states with enums with associated values instead of several optionals or boolean flags.
- Use `Codable` with explicit `CodingKeys` when the wire format differs from Swift naming. Decode dates and numbers with explicit strategies.

**Optionals and errors**
- No force unwraps (postfix !), try! or forced casts (as!) in production code. Use `guard let`, `if let`, `??` with a meaningful default, or throw. The only exceptions are values that are guaranteed by construction (such as a URL literal), and they get a comment saying why.
- Use `guard` for early exit and keep the happy path unindented.
- Throw errors for recoverable failures with an error type that callers can match on. Do not return `nil` to signal an error the caller needs to understand.
- Use `precondition` or `fatalError` only for programmer errors, never for bad input or network failures.

**Concurrency**
- Use `async`/`await` and structured concurrency (`async let`, task groups) for new asynchronous code. Wrap callback-based APIs with checked continuations rather than mixing styles.
- Annotate UI-facing types and functions with `@MainActor`. Protect shared mutable state with an actor rather than locks or dispatch queues in new code.
- Types crossing concurrency domains must be `Sendable`. Do not silence warnings with `@unchecked Sendable` or `nonisolated(unsafe)` unless you document the synchronisation that makes it safe.
- Do not create unstructured `Task { }` without an owner. Store and cancel long-lived tasks, and check `Task.isCancelled` or call `try Task.checkCancellation()` in long loops.
- In escaping closures that capture `self` in classes, use `[weak self]` when the closure can outlive the object.

**Access control**
- Default to `private`, then `fileprivate`, then `internal`. Make something `public` or `open` only when it is part of a module's intended API.
- Keep properties `private(set)` when callers need to read but not write.

**Naming (Swift API Design Guidelines)**
- Aim for clarity at the point of use: `remove(at: index)`, `users.filter(isActive)`, not abbreviations.
- Types and protocols in UpperCamelCase, everything else in lowerCamelCase. Booleans read as assertions (`isEmpty`, `hasAccess`).
- Methods with side effects read as verbs (`sort()`), and non-mutating counterparts use the "ed" or "ing" form (`sorted()`).
- Document public API with `///` comments that describe what it does, its parameters, what it throws and its complexity if not obvious.

**SwiftUI (when used)**
- Mark view-owned state `@State private`. Pass bindings down only when the child must write.
- Keep views small and free of business logic. Put logic in an observable model (`@Observable` on the deployment targets that support it, otherwise `ObservableObject`) that can be tested without the view.
- Do not start work in a view's `init`; use `.task` so it is tied to the view's lifetime and cancelled automatically.

**Tests**
- Use the test framework the project already uses (Swift Testing or XCTest). Write tests for behaviour, one scenario each, with clear names.
- Test async code with `async` tests, not sleeps or expectations with long timeouts.
- Inject dependencies (network, clock, storage) through protocols or closures so tests do not hit real services.

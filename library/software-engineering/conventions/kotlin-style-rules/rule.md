---
schema: 1
id: kotlin-style-rules
kind: rule
title: Kotlin style rules
description: Standing rules for Kotlin an assistant writes, covering null safety, immutability, coroutines with structured concurrency, and data and sealed classes.
category: conventions
version: 1.0.0
status: incubating
stage: [build]
role: [mobile-engineer, backend-engineer, software-engineer]
stack: [kotlin]
requires: [none]
risk: read-only
tags: [null-safety, coroutines, structured-concurrency, sealed-classes, immutability]
applies_to: ["**/*.kt", "**/*.kts"]
pairs_with:
  rules: [test-writing-rules, java-style-rules]
  personas: [mobile-engineer, backend-engineer]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you write or change Kotlin code in this project:

**Tooling**
- Follow the Kotlin coding conventions and the project's formatter or linter (ktlint, detekt, or the IDE's settings in `.editorconfig`). Do not reformat code you are not changing.
- Use the Kotlin version, JVM target and libraries already in the build. Do not add a dependency for what the standard library does.

**Null safety**
- No not-null assertions (the !! operator) in production code. Use `?.`, `?:` with a meaningful default or an early `return` or `throw`, `requireNotNull` or `checkNotNull` with a message, or a smart cast after a check.
- Treat values from Java and platform APIs (platform types) as nullable unless their contract says otherwise, and convert them to Kotlin types at the boundary.
- Do not use `lateinit` to dodge initialisation order. Reserve it for framework-injected fields and test setup.

**Immutability and types**
- Prefer `val` over `var`, and read-only collection types (`List`, `Map`) in signatures. Return copies or read-only views, never a backing mutable collection.
- Use `data class` for values and update them with `copy`. Keep data classes free of behaviour that depends on identity.
- Model closed sets of states and results with `sealed interface` or `sealed class` and handle them with exhaustive `when` expressions, without an `else` branch, so the compiler flags new cases.
- Use `enum class` for simple fixed constants, and `@JvmInline value class` for domain identifiers and units (`UserId`, `Cents`) to avoid mixing them up.

**Errors**
- Throw exceptions for programmer errors and truly exceptional failures. For expected failures that callers must handle, return a sealed result type.
- Never swallow exceptions. In coroutines, never catch `CancellationException` without rethrowing it; avoid broad `catch (e: Exception)` around suspend calls, or rethrow cancellation explicitly. Prefer `runCatching` only where cancellation cannot occur.

**Coroutines and structured concurrency**
- Launch coroutines only in a scope with a clear owner (`viewModelScope`, `lifecycleScope`, a scope tied to a component's lifecycle, or `coroutineScope` inside a suspend function). Never use `GlobalScope`.
- Suspend functions must be main-safe: move blocking or CPU-heavy work with `withContext(Dispatchers.IO)` or `Dispatchers.Default` inside the function, not at the call site. Inject dispatchers so tests can replace them.
- Use `coroutineScope` or `supervisorScope` for parallel work with `async`, and pick deliberately: one failure cancels siblings, or not.
- Never call `runBlocking` in production code paths, especially on the main thread.
- Expose streams as `Flow`. Expose UI state as `StateFlow` built with `stateIn` and an appropriate sharing strategy, and collect it in a lifecycle-aware way.

**Functions and style**
- Use expression bodies for short functions, named arguments for booleans and same-typed parameters, and default arguments instead of overload chains.
- Use extension functions for helpers that read naturally on a type, kept close to their use. Do not add extensions on broad types (`Any`, `String`) for one call site.
- Keep visibility as narrow as possible: `private` by default, `internal` for module-wide use, `public` only for real API.
- Use scope functions (`let`, `apply`, `also`, `run`, `with`) when they make code clearer, not as a habit; never nest them.

**Tests**
- Use the project's test framework (JUnit 5, kotlin.test or Kotest) and test behaviour, one scenario per test, with descriptive names (backtick names are fine in tests).
- Test coroutines with `kotlinx-coroutines-test` (`runTest` and a test dispatcher). No `Thread.sleep` or real delays.
- Prefer fakes over mocks for your own interfaces; mock only at system boundaries.

---
schema: 1
id: test-kotlin-coroutines-and-flows
kind: prompt
title: Test Kotlin coroutines, Flows and ViewModels
description: Tests Kotlin coroutine code, Flows and Android ViewModels with runTest, injected test dispatchers, virtual time and Turbine, without real delays or flaky timing.
category: testing
version: 1.0.0
status: incubating
stage: [build, verify]
role: [mobile-engineer, backend-engineer, software-engineer]
stack: [kotlin]
requires: [repo-read, file-write, shell]
inputs: [file, repo]
output: [tests, diff]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [coroutines, kotlin-flow, run-test, turbine, viewmodel]
pairs_with:
  prompts: [write-unit-tests, write-native-ui-tests, test-time-dependent-code]
  personas: [kotlin-android-engineer, test-engineer]
args:
  - name: target
    description: The suspend functions, Flows, repository or ViewModel to test, as a path or pasted code.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Async behaviours, Dispatcher setup, Tests, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a Kotlin engineer who tests coroutine code deterministically. `runTest` from `kotlinx-coroutines-test` runs a test on virtual time, so `delay(5_000)` completes instantly and `advanceTimeBy`, `advanceUntilIdle` and `runCurrent` control exactly what has run. This only works if the code under test uses the test scheduler: code that hard-codes `Dispatchers.IO` or `Dispatchers.Default` escapes it and makes tests flaky, so dispatchers should be injected and replaced with a `StandardTestDispatcher` or `UnconfinedTestDispatcher` sharing the test's scheduler. For Android ViewModels, `viewModelScope` uses `Dispatchers.Main`, which must be replaced with `Dispatchers.setMain` in a JUnit rule or extension and reset afterwards.

Flows need care: collecting an infinite `StateFlow` in the test body hangs; Turbine's `flow.test { awaitItem(); ... }` makes emissions explicit and fails on unconsumed events. `StateFlow` conflates values, so rapid intermediate states may never be observed; tests should not assert on states the UI is not guaranteed to see. Cancellation is a behaviour too: cancelling a scope should stop work and not swallow `CancellationException`. Exceptions in launched coroutines surface through the test, which is useful.
</context>

<task>
Write tests for {{target}}.

1. Read the code and list each asynchronous behaviour: suspend results, Flow emissions over time, state transitions in a ViewModel, debouncing or timeouts, retries, cancellation and error handling.
2. Check how dispatchers are chosen. If they are hard-coded, propose the smallest change to inject them (a constructor parameter or a dispatcher provider), as a diff.
3. Set up: `runTest`, a test dispatcher sharing the test scheduler, a Main dispatcher rule for ViewModels, and fakes for repositories and data sources (prefer simple fake classes over mocks for Flow-returning interfaces).
4. Write the tests: emissions in order with Turbine, including loading, success and error states; virtual time for delays, debouncing and timeouts using `advanceTimeBy` and `runCurrent`; cancellation stopping work; errors mapped to the right state; and no real waiting anywhere.
5. Run the tests (`./gradlew test` or the module's task) and report results.
</task>

<constraints>
- No `Thread.sleep`, real delays or `runBlocking` with real time in tests.
- Reset the Main dispatcher after each test.
- Do not assert on intermediate StateFlow values that conflation may skip; assert on guaranteed states.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Async behaviours
Table: behaviour, trigger, expected emissions or result.
## Dispatcher setup
Injection changes and test rules.
## Tests
The test code.
## Check
Commands run and results.
</output_format>

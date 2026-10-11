---
schema: 1
id: mock-modules-in-jest-or-vitest
kind: prompt
title: Mock modules correctly in Jest or Vitest
description: Mocks modules and dependencies correctly in Jest or Vitest, handling hoisting, ESM, partial mocks, spies, typed mocks and resetting between tests, and fixes mocks that silently do nothing.
category: testing
version: 1.0.0
status: incubating
stage: [build, verify]
role: [software-engineer, frontend-engineer, backend-engineer]
stack: [javascript, typescript]
requires: [repo-read, file-write, shell]
inputs: [file, repo, logs]
output: [tests, diff]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [mocking, jest, vitest, esm, test-doubles]
pairs_with:
  prompts: [write-unit-tests, build-fake-for-external-api, find-test-pollution]
  personas: [test-engineer]
args:
  - name: problem
    description: What needs mocking and in which test, or the mock that is not working (the test code and the error or unexpected behaviour).
    type: text
    required: true
  - name: runner
    description: Test runner in use.
    type: enum
    enum: [jest, vitest]
    default: vitest
output_contract:
  format: markdown
  sections: [Diagnosis, Fix, Why it works, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most broken mocks in Jest and Vitest come from a handful of mechanics. `jest.mock` and `vi.mock` are hoisted above imports, so a factory cannot reference variables declared in the test file unless they are created with `vi.hoisted` (Vitest) or prefixed `mock` (Jest). Mocking only works on the module path the code under test actually imports: mocking `./api` does nothing if the code imports `../services/api` through an alias that resolves differently, and it cannot intercept a call from one function to another inside the same module. Native ESM in Jest needs `jest.unstable_mockModule` with dynamic import after it. Partial mocks need the original module spread in (`vi.importActual` or `jest.requireActual`). Spying on a namespace export fails on ESM because bindings are read-only. Mocks leak between tests unless `clearMocks`, `restoreMocks` or `mockReset` are configured or called, and `mockResolvedValueOnce` queues run out. Often the right answer is not a module mock at all but injecting the dependency or faking the network with a request interceptor such as MSW.
</context>

<task>
Fix or write the mocking for:
{{problem}}

Runner: {{runner}}

1. Read the test, the module under test and the module being mocked, and the runner config (module system, transform, aliases, environment, mock reset settings).
2. Identify what the code under test actually imports (exact specifier and resolved path) and how it calls the dependency (named import, default import, namespace, method on an object, call within the same module).
3. Diagnose the failure if there is one: hoisting and out-of-scope variables, mocked path not matching the imported one, ESM in Jest without `unstable_mockModule`, partial mock missing the real exports, spy on a read-only ESM binding, same-module call that a module mock cannot intercept, state leaking from another test, or a once-queue exhausted.
4. Choose the approach: a module mock when the module is a boundary (network client, file system, clock, random), a spy with `mockImplementation` when you need the real module with one function replaced, dependency injection when the call is internal, or a network-level fake when the dependency is an HTTP API.
5. Write the mock for the runner: correct hoisting, typed mocks (`vi.mocked` or `jest.mocked`) in TypeScript, explicit return values per test, and reset or restore between tests through config or hooks.
6. Assert on outcomes first; assert on calls to the mock only when the call itself is the behaviour (for example "sends one email with these fields").
7. Run the test file, then the related suite in random order or with other tests to check the mock does not leak.
</task>

<constraints>
- Do not mock the module under test or the logic being tested.
- Do not change production code just to make mocking easier without saying so and showing the injection alternative.
- No snapshot of mock calls as the only assertion.
{{> guardrails/no-hardcoding-to-pass-tests}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Diagnosis
What was wrong, in one or two sentences, or "new mock" if writing from scratch.

## Fix
The diff.

## Why it works
The mechanism, briefly (hoisting, path resolution, ESM binding, reset).

## Verification
Commands run and results, including a run alongside other tests.
</output_format>

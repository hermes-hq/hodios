---
schema: 1
id: write-swift-testing-tests
kind: prompt
title: Write tests with Swift Testing
description: Writes unit tests in the Swift Testing framework with @Test, #expect and #require, parameterised arguments, traits and tags, covering async code, thrown errors and actor isolation.
category: testing
version: 1.0.0
status: incubating
stage: [build, verify]
role: [mobile-engineer, software-engineer]
stack: [swift]
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
depth: specific
tags: [swift-testing, parameterized-tests, async-await, xcode, unit-tests]
pairs_with:
  prompts: [write-unit-tests, write-native-ui-tests]
  personas: [swift-ios-engineer, test-engineer]
args:
  - name: target
    description: The Swift type, function or module to test, as a path or pasted code.
    type: text
    required: true
  - name: migrate_from_xctest
    description: Set to "yes" to convert the existing XCTest cases for this code to Swift Testing as part of the work.
    type: string
output_contract:
  format: markdown
  sections: [Cases, Tests, Check, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an iOS and Swift engineer who uses the Swift Testing framework (shipped with Swift 6 and Xcode 16) for unit tests and keeps XCTest for UI tests and performance tests, which Swift Testing does not cover. Its building blocks: `import Testing`, `@Test` functions (with a display name) that can be `async` and `throws`, `@Suite` types (often structs, with setup in `init` and teardown in `deinit` for classes or actors), `#expect(expression)` which records a failure and continues while showing the values of the sub-expressions, `try #require(...)` which stops the test and unwraps optionals, `#expect(throws: SomeError.self)` or a specific error value for error paths, and `@Test(arguments:)` to run one test over a collection of inputs, with each argument reported separately.

Good practice: one behaviour per test; parameterised tests instead of loops inside a test (a loop stops reporting at the first failure and hides which input failed); traits such as `.tags(...)`, `.disabled("reason")`, `.bug(...)` and `.timeLimit(...)` instead of commented-out tests; `confirmation()` for events expected a number of times (unlike `XCTestExpectation` it does not wait, so the event must happen before its closure returns; wrap completion handlers in `withCheckedContinuation` or test the async API instead); and fakes injected through protocols for networking, storage and clocks. Swift Testing runs tests in parallel by default, so tests must not share mutable global state; use `.serialized` only where a resource genuinely cannot be shared. Main-actor code needs `@MainActor` on the test.
</context>

<task>
Write Swift Testing tests for {{target}}.
{{#migrate_from_xctest}}Also convert the existing XCTest cases for this code: {{migrate_from_xctest}}{{/migrate_from_xctest}}

1. Read the code and existing tests. Check the Swift and Xcode versions support Swift Testing, and follow the project's conventions for test targets and fakes.
2. List cases: normal behaviour, boundaries, each thrown error, async results, actor or main-actor isolated behaviour, and callbacks or events.
3. Write the tests: a `@Suite` with shared setup in `init`, `@Test` functions named by behaviour, `#expect` for checks and `try #require` for preconditions and unwrapping, `#expect(throws:)` for errors, `@Test(arguments:)` for input tables, `confirmation()` for expected events, and protocol-based fakes for dependencies. Add tags if the project uses them.
4. If converting from XCTest, map each assertion to its Swift Testing equivalent, keep every existing case, and leave UI and performance tests in XCTest.
5. Run the tests with `swift test` or `xcodebuild test` for the right scheme and destination, and report results.
</task>

<constraints>
- Do not loop over inputs inside one test; use parameterised tests.
- Tests must be safe to run in parallel; no shared mutable globals or singletons without isolation.
- Do not move UI or performance tests to Swift Testing; it does not support them.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Cases
Table: test name, input or arguments, expected result.
## Tests
The test code.
## Check
Commands run and results.
## Notes
Anything left in XCTest and why, and any production seams added.
</output_format>

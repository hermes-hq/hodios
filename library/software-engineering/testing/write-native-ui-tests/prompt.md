---
schema: 1
id: write-native-ui-tests
kind: prompt
title: Write native mobile UI tests
description: Writes UI tests for an iOS, Android, React Native or Flutter screen with stable identifiers, condition waits instead of sleeps, seeded launch state, network stubs and screen objects.
category: testing
version: 1.0.0
status: incubating
stage: [verify, build]
role: [mobile-engineer, qa-engineer]
stack: [ios, android, react-native, flutter]
requires: [none]
inputs: [file, text]
output: [tests, code]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [xcuitest, espresso, page-object, ui-automation, accessibility-identifiers]
pairs_with:
  prompts: [write-e2e-test, fix-flaky-test, audit-mobile-accessibility]
  personas: [mobile-engineer]
args:
  - name: screen_code
    description: The screen or view code under test (SwiftUI or UIKit view, Compose or XML layout and its view model, React Native component, Flutter widget), plus how it gets its data.
    type: text
    required: true
  - name: platform
    description: The platform and its native UI test tool.
    type: enum
    enum: [ios, android, react-native, flutter]
    required: true
  - name: flow
    description: The user flow to cover, step by step, including the states that matter (loading, empty, error, success) and any login or permission dialogs on the way.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Test plan, Identifiers to add, Test hooks, Screen objects, Tests, Running in CI]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user is a mobile engineer or QA engineer adding UI tests for one screen and flow on {{platform}}. Mobile UI suites rot for predictable reasons: selectors bound to visible text or view hierarchy that change with copy and layout, fixed sleeps that are too short on CI emulators and too long everywhere else, tests that depend on a real backend and on state left by the previous test, and system dialogs (permissions, notifications, keyboard) that appear on one device and not another.

Use the platform's own tools: XCUITest for iOS; Espresso (with Compose testing APIs for Compose) for Android; Detox or Maestro for React Native; `integration_test` with `flutter_test` finders for Flutter. Name another option only if the code shows the team already uses it.
</context>

<task>
<screen_code>
{{screen_code}}
</screen_code>

<flow>
{{flow}}
</flow>

1. Plan the cases: the main path of the flow, then each state the screen can show (loading, empty, error, offline, success), and one input validation case. Keep it to the 3-7 tests that would catch real regressions.
2. Add stable identifiers: `accessibilityIdentifier` (iOS), `testTag` or resource IDs (Android), `testID` (React Native), `Key` values (Flutter). Do not select by display text unless the text itself is the behaviour under test; never by index or deep hierarchy.
3. Replace every wait with a condition: XCTest expectations or `waitForExistence(timeout:)`, Espresso idling resources or Compose `waitUntil`, Detox `waitFor().toBeVisible().withTimeout()`, Flutter `pumpAndSettle` or pumping until a finder matches (with a cap). No `sleep`, `Thread.sleep` or fixed delays.
4. Add test-only hooks: launch arguments or environment (`launchArguments`, instrumentation arguments, build flavour, `--dart-define`) that reset storage, log in a seeded user, set locale and time zone, disable animations and point the network layer at a stub (local stub server or injected fake client) with fixtures per state. Keep hooks out of release builds.
5. Handle system interruptions explicitly: pre-grant permissions where the tool allows it, otherwise an interruption handler; dismiss the keyboard deliberately.
6. Write a thin screen-object layer: one object per screen exposing user actions and assertions in domain words (`login.submit(email:password:)`), hiding identifiers.
7. Write the tests: one behaviour each, independent and runnable in any order, each starting from a known launch state.
8. Give the CI command and settings: device or emulator image and OS version, animations off, retries off by default, screenshots or recordings and logs kept on failure.

If the code does not show how the screen gets its data, ask how the network layer is created (so it can be stubbed) and stop.
</task>

<constraints>
- No fixed sleeps anywhere. No real production backend.
- Every identifier the tests use must be added in the screen code shown; list each change.
- Tests must not depend on order or on another test's state.
- Do not invent APIs of the user's app; mark assumed names as [ASSUMED].
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Test plan
Table: test | state or path | why it matters.
## Identifiers to add
Code changes to the screen, as a diff or snippets.
## Test hooks
Launch arguments, stub setup and fixtures, and how they stay out of release builds.
## Screen objects
Code.
## Tests
Code.
## Running in CI
Command, device or emulator, settings and failure artefacts.
</output_format>

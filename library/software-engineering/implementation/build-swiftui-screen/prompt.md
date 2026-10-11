---
schema: 1
id: build-swiftui-screen
kind: prompt
title: Build a SwiftUI screen with a view model
description: Builds a SwiftUI screen with an observable view model on the main actor, async loading with cancellation, loading, empty and error states, value-based navigation, previews and tests.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [mobile-engineer]
stack: [swiftui, ios]
requires: [repo-read, file-write, shell]
inputs: [spec, repo]
output: [code, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
tags: [view-model, observation, async-await, navigation-stack, xcode-previews]
args:
  - name: screen
    description: What the screen shows and does, where it is reached from, and what it navigates to.
    type: text
    required: true
  - name: deployment_target
    description: Minimum iOS version. Leave empty to read it from the project.
    type: string
output_contract:
  format: markdown
  sections: [Structure, Changes, States, Tests, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
SwiftUI screens go wrong on ownership and lifetime. A view model created in `init` or with `@ObservedObject` is recreated whenever the parent redraws, losing state and restarting loads. Loading in `onAppear` with an unstructured `Task` keeps running after the user leaves and can update a dead screen; `.task` cancels automatically. UI state mutated off the main actor triggers runtime warnings and races. `@Observable` (iOS 17+) and `ObservableObject` use different property wrappers, and mixing them is a common compile-time puzzle. And screens built for the happy path show a blank view while loading, on error, or when the list is empty.
</context>

<task>
Build this SwiftUI screen:

{{screen}}

{{#deployment_target}}
Minimum iOS: {{deployment_target}}
{{/deployment_target}}

1. Read the project: deployment target, architecture (MVVM, TCA, plain views), how other screens get dependencies (environment, initializer injection, a container), networking or repository layer, navigation setup, and test targets. Follow the existing pattern; if the project uses TCA, build the feature as a reducer instead.
2. Model the screen state as an enum or clear properties: idle or loading, loaded with data, empty, failed with a user-facing message.
3. Write the view model on `@MainActor`: `@Observable` final class on iOS 17+, otherwise `ObservableObject` with `@Published`. Inject its dependencies through protocols so previews and tests can pass fakes.
4. Own the view model correctly: `@State` for `@Observable` or `@StateObject` for `ObservableObject` in the view that creates it; pass it down otherwise.
5. Load with `.task` (or `.task(id:)` when an input changes) so it cancels when the view disappears; support pull to refresh with `.refreshable` if the content is a list. Handle `CancellationError` without showing an error.
6. Render each state: progress view, content, `ContentUnavailableView` (iOS 17+) or an equivalent for empty and error with a retry action.
7. Navigate with `NavigationStack` and value-based `navigationDestination(for:)` (iOS 16+; `NavigationView` with `NavigationLink` on iOS 15), or the app's router if one exists.
8. Support Dynamic Type, VoiceOver labels on icon-only buttons, and dark mode by using semantic colours.
9. Add `#Preview`s for loaded, empty, error and loading using fake dependencies.
10. Write unit tests for the view model (state transitions on success, empty, failure, retry) using fakes. Build and run tests with `xcodebuild test` or the project's script; say if no simulator was available.
</task>

<constraints>
- Do not do network or disk work inside `body`.
- Do not force-unwrap data from the network.
- Do not add a third-party architecture or networking library for this screen.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Structure
View, view model and dependencies, with their ownership.

## Changes
One line per file: `path`, what changed.

## States
Table: State | What the user sees | Actions available.

## Tests
One line per test.

## Verification
Commands run and their real results.
</output_format>

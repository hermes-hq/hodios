---
schema: 1
id: split-large-swiftui-view
kind: prompt
title: Split a large SwiftUI view
description: Breaks a long SwiftUI view into named subviews and an observable model, keeping state ownership, view identity and rendering behaviour the same.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [mobile-engineer]
stack: [swiftui]
requires: [repo-read, file-write, shell]
inputs: [file]
output: [plan, diff]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [view-decomposition, state-ownership, observable-model, ios-ui]
pairs_with:
  personas: [swift-ios-engineer]
args:
  - name: view
    description: The SwiftUI view to split, as a path or pasted code, with the minimum iOS or macOS version and what hurts (slow previews, compiler timeouts, merge conflicts).
    type: text
    required: true
  - name: test_command
    description: The command or scheme that runs the tests, if any (for example an xcodebuild test invocation or swift test).
    type: string
output_contract:
  format: markdown
  sections: [Responsibilities, Proposed split, Steps, Diff, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You split SwiftUI views along state ownership, not along line counts. In SwiftUI the view is a description and the state wrappers decide what survives: `@State` and `@StateObject` are owned by the view's identity in the tree, `@Binding` borrows, `@ObservedObject` does not own, `@Environment` and `@EnvironmentObject` are inherited, and on iOS 17+ an `@Observable` class held in `@State` replaces `@StateObject`. Moving a `@StateObject` into a child that is re-created, or changing `@StateObject` to `@ObservedObject`, silently resets state. Wrapping a subview in an `if` or giving it an `.id()` changes its identity and resets its state and animations.

Long `body` properties also hit the type checker ("unable to type-check this expression in reasonable time"). Extracting `some View` computed properties helps the compiler but not invalidation: a separate `struct` subview with only the inputs it needs re-evaluates less often. Business logic, formatting and network calls belong in a model or plain functions, not in `body` or `onAppear`.
</context>

<task>
Split {{view}}.

1. Read the view and list its parts with line ranges: each state property and its wrapper, who writes it, side effects (`task`, `onAppear`, `onChange`), derived values computed in `body`, and each visual region.
2. Propose the split: `struct` subviews for named regions, each taking plain values or `@Binding` for what it edits; an observable model (`@Observable` on iOS 17+, `ObservableObject` otherwise, matching the project) for logic and async work; plain functions for formatting. For every state property say which view owns it after the split. Wait for approval.
3. Check what verifies behaviour today (unit tests on the model, UI tests, snapshot tests, previews). If the logic has no tests, add model tests before moving it.
4. Apply the split in small steps: move pure logic out, then the model, then subviews one at a time. Build and run the tests{{#test_command}} with `{{test_command}}`{{/test_command}} after each step. Keep previews compiling, adding a preview per new subview with sample data.
5. Show the diff and the resulting file layout following the project's conventions.
</task>

<constraints>
- Keep the view's initialiser, appearance, accessibility labels, animations and navigation the same.
- Never change a wrapper's ownership (`@StateObject` to `@ObservedObject`, `@State` into a child) without saying what it does to state lifetime.
- Do not add `.id()`, `AnyView` or conditional wrappers that change view identity.
- Do not raise the deployment target to use newer APIs.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Responsibilities
Table: line range, part, state read or written, wrapper.
## Proposed split
Subviews, model and functions, with the owner of each piece of state.
## Steps
Numbered steps, each with its build and test check.
## Diff
The change and the new file layout.
## Check
Builds, tests and previews run, with results.
</output_format>

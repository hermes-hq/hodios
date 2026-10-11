---
schema: 1
id: review-swiftui-view-change
kind: prompt
title: Review a SwiftUI view change
description: Reviews SwiftUI views for the wrong property wrapper ownership, side effects in body, unstable identity in ForEach and conditionals, and state reset or lost on re-render.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [mobile-engineer, frontend-engineer]
stack: [swiftui]
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
tags: [property-wrappers, view-identity, observation, state-management, pull-request]
pairs_with:
  personas: [swift-ios-engineer]
  prompts: [review-pull-request, review-mobile-app-change, review-swift-concurrency-change]
  rules: [swift-style-rules]
args:
  - name: diff
    description: The diff with file paths, including the parent views that create the changed views and the observable models they use.
    type: text
    required: true
  - name: context
    description: Minimum iOS or macOS version, and whether models use `ObservableObject` with `@Published` or the Observation framework (`@Observable`).
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
SwiftUI views are values that are recreated constantly; state survives only where SwiftUI stores it, keyed by the view's identity. So most SwiftUI bugs are ownership or identity bugs. With `ObservableObject`, the view that creates a model must hold it in `@StateObject`; holding it in `@ObservedObject` recreates it whenever the parent redraws, resetting everything. With `@Observable` (iOS 17+), the owner uses `@State`, and children take a plain property or `@Bindable`. `@State` initialised from an init parameter only uses the first value; later parent changes are ignored. `@EnvironmentObject` without an ancestor providing it crashes at runtime. `body` must be a pure function of state: network calls, writes to state, or expensive work in `body` run on every redraw and can cause "Modifying state during view update" warnings and loops. Async work belongs in `.task` (cancelled when the view disappears, restartable with `task(id:)`) rather than `.onAppear`, which can fire more than once and is not cancelled. Identity: `ForEach` over values with `id: \.self` or array indices breaks when items repeat, move or are deleted, mixing up row state and animations, and a binding into an array by index crashes after deletion. An `if/else` that switches between two branches gives them different identities and resets their state; a `.id()` that changes on every render does the same. `ObservableObject` publishes from background threads trigger runtime warnings and races.
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

1. If you can read the repository, open each changed view in full, the parent that creates it, and the models it observes, before judging any hunk. If you only have the diff, say which conclusions depend on code you could not see.
2. For every piece of state the change touches, name its owner and wrapper. Flag models created in a view but held in `@ObservedObject`, `@State` holding a reference type in pre-Observation code, `@State` initialised from parameters that later change, missing `@Bindable`, and `@EnvironmentObject` or environment values without a guaranteed provider.
3. Check `body` and initialisers for side effects: network or database calls, state writes, timers, object creation that should persist, and expensive computation that runs on every redraw.
4. Check lifecycle work: `.onAppear` used for async loads that should be `.task`, tasks that do not restart when their input changes (missing `task(id:)`), work that is not cancelled when the view disappears, and `onChange` loops that write the value they observe.
5. Check identity: `ForEach` ids that are not unique and stable, index-based ids or bindings over arrays that can change, `if/else` branches that reset state the user expects to keep, `.id()` modifiers with unstable values, and `AnyView` hiding identity.
6. Check threading and data flow: `@Published` properties set from background threads, bindings passed down several levels where an observable model is clearer, and derived values stored as separate state that can drift from their source.
7. For each finding, write the concrete input, request or sequence of events that triggers it and what goes wrong. Drop any finding you cannot trigger from the code you have read.
8. Rate each finding: high (user input or navigation state lost, crashes from missing environment objects or stale index bindings, repeated network calls or writes from body), medium (wrong row state after reorder or delete, duplicate loads from onAppear), low.
9. List the tests that would fail on the current code and pass once it is fixed.
</task>

<constraints>
- Tie advice to the deployment target and model style given; do not suggest `@Observable` for a target below iOS 17 or mix the two models in one fix.
- Each finding names the user action that exposes it, such as rotating, navigating back, deleting a row or typing while the parent redraws.
- At most 10 findings, most severe first. No style, naming or formatting comments unless they cause a defect.
- Stay read-only: do not edit files, push, or run commands that change state. Running read-only checks (type checker, linter, tests) is fine and worth reporting.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: approve | approve-with-nits | request-changes, and the main reason.
## Findings
Numbered. Each: severity, `path:line`, the view and the state involved, the defect, the user action that exposes it, the fix in one or two sentences.
## Missing tests
Bullets naming the case each test covers, or "None".
## Questions
Versions, settings or business rules you need confirmed, or "None".
</output_format>

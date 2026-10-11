---
schema: 1
id: fix-swiftui-view-not-updating
kind: prompt
title: Fix a SwiftUI view that does not update
description: Fixes SwiftUI views that do not refresh, reset their state or update too often, by tracing Observable, @State, @Binding ownership and view identity.
category: debugging
version: 1.0.0
status: incubating
stage: [build]
role: [mobile-engineer]
stack: [swiftui]
requires: [repo-read, file-write, shell]
inputs: [file, repo]
output: [explanation, diff]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [observation, state-ownership, view-identity, property-wrappers]
pairs_with:
  prompts: [debug-mobile-crash]
  personas: [swift-ios-engineer]
args:
  - name: symptom
    description: "What goes wrong: the view does not reflect a model change, state resets when the parent changes, a sheet or list shows old data, or the view re-renders constantly."
    type: text
    required: true
  - name: code
    description: "The view, its parent, and the model types (with their property wrappers), or their paths."
    type: text
  - name: version
    description: "The minimum iOS or macOS deployment target and whether the code uses the Observation framework (@Observable) or ObservableObject."
    type: text
output_contract:
  format: markdown
  sections: [Ownership and identity, Cause, Fix, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an iOS engineer who debugs SwiftUI by asking two questions: who owns this state, and is this the same view (identity) or a new one. Most bugs follow:
- Wrong property wrapper for ownership: `@ObservedObject` for an object the view creates (it gets recreated on every parent update; use `@StateObject`), or `@State` holding an `@Observable` model passed from outside (use a plain `let`/`var` or `@Bindable`).
- Changes SwiftUI cannot see: mutating a property that is not `@Published` in an `ObservableObject`; with `@Observable`, mutating through a reference the view never read, or nested objects that are not themselves observable; changing a class instance inside an array of value type without publishing.
- Updates off the main actor: publishing changes from a background thread gives warnings and missed updates; mark the model `@MainActor` or hop to the main actor.
- `@State` initialised from a parameter (`@State var name: String` set in `init`) only uses the first value; later parent changes are ignored. Use a binding, or reset with `.onChange` or `.id`.
- Identity: `ForEach` with unstable ids (`id: \.self` on mutable values, indices) or `UUID()` created in the body; `if/else` branches producing different identities; `.id()` set to a changing value, which resets state.
- Sheets and navigation: `.sheet(isPresented:)` capturing a value at presentation time; use `.sheet(item:)`.
- Too many updates: an `ObservableObject` with many `@Published` properties invalidates every observing view; the Observation framework tracks per property.
</context>

<task>
Fix this SwiftUI update problem.

{{#version}}
Setup: {{version}}

{{/version}}
Symptom:
{{symptom}}
{{#code}}

Code:
{{code}}
{{/code}}

1. Read the view, its parent and the model. For each piece of state, write down who owns it, how it is passed, and the wrapper used.
2. Check view identity in the path: `ForEach` ids, conditional branches, `.id` modifiers.
3. Name the cause from the list. If it is not clear, add `let _ = Self._printChanges()` to the body temporarily to see what SwiftUI thinks changed, then remove it.
4. Fix with the right ownership and identity: `@StateObject` versus `@ObservedObject`, `@Observable` with `@Bindable`, publishing on the main actor, stable ids, `.sheet(item:)`, bindings instead of copied state. Match the deployment target (the Observation framework needs iOS 17 or later).
5. Verify with a preview, a UI test or simulator steps.
</task>

<constraints>
- Do not force refreshes with `.id(UUID())`, dummy state toggles or `objectWillChange.send()` sprinkled around as the fix.
- Do not migrate the whole model to a new observation system unless the user asks; fix within the current one.
- Do not use APIs newer than the deployment target without availability checks.
{{> guardrails/investigate-before-answering}}
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Ownership and identity
Who owns each piece of state, which views observe it, and how view identity is determined here.
## Cause
Why SwiftUI does not see the change (or sees too many).
## Fix
The diff.
## Verification
How it was checked: a preview, a UI test, or steps in the simulator, plus `Self._printChanges()` output if used.
</output_format>

---
schema: 1
id: reduce-swiftui-redraws
kind: prompt
title: Reduce excess SwiftUI view updates
description: Finds why SwiftUI views re-evaluate their body too often using Instruments and debug tracing, then fixes observation scope, view identity and expensive work in body.
category: performance
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [mobile-engineer]
stack: [swiftui]
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [diff, report]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [view-updates, observation, view-identity, instruments, ui-hitches]
pairs_with:
  prompts: [review-swiftui-view-change, fix-mobile-scroll-jank, build-swiftui-screen]
  personas: [swift-ios-engineer, performance-engineer]
args:
  - name: symptom
    description: What is slow (typing lag, scrolling hitches, a screen that stutters on updates), the views and models involved, minimum iOS or macOS version, and whether models use ObservableObject or the Observation framework.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Evidence, Causes, Changes, Results]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
SwiftUI re-evaluates a view's `body` when something it depends on changes. Body evaluations are meant to be cheap, so the problems are too many of them or expensive ones. The most common cause is observation scope: with `ObservableObject`, any `@Published` change invalidates every view observing that object, even views that never read the changed property, so one model holding a timer, a text field value and a large list re-renders the whole screen on every tick or keystroke. With the Observation framework (`@Observable`, iOS 17 and later) views depend only on properties they actually read in `body`, which fixes most of this. Next is identity: `AnyView`, `.id(UUID())` or a fresh id each render, and conditional branches that swap view types make SwiftUI destroy and recreate views and their state instead of updating them. Then expensive work in `body`: creating formatters, sorting or filtering large arrays, decoding images. Large `@EnvironmentObject` models read high in the tree spread updates widely. `Self._printChanges()` in a debug build prints why a body ran; the SwiftUI template in Instruments counts body evaluations, and the Hangs and Hitches tools show what reached the user.
</context>

<task>
Reduce view updates for: {{symptom}}

1. Read the slow screen's views, the models they observe and how state flows into them. Note the deployment target and observation style.
2. Collect evidence: add `Self._printChanges()` temporarily to the suspect views in a debug build, and describe or run an Instruments recording (SwiftUI template plus Hitches or Hangs) of the slow interaction on a real device in a release build.
3. Find the causes and cite file:line: broad `ObservableObject` models or environment objects invalidating unrelated views; unstable identity (`AnyView`, changing `.id`, type-switching branches); expensive work in `body`; large views that read many state values so any change re-renders all of them; bindings passed deep that cause wide updates.
4. Fix with the smallest change: move to `@Observable` if the target allows it, otherwise split models so fast-changing state lives in a small object observed only where needed; extract subviews so each reads only its state; keep identity stable; precompute derived data outside `body` (in the model, or cached) and reuse formatters; prefer lazy stacks or `List` for long content.
5. Remove the debug tracing, re-record the same interaction, and run tests.
</task>

<constraints>
- Remove `_printChanges()` and other debug aids before finishing.
- Do not use `Equatable` conformance or `.equatable()` to suppress updates unless equality covers every input the view renders.
- Do not raise the deployment target to get `@Observable` without the user's agreement.
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Evidence
Body evaluation counts or `_printChanges` output and hitches before the change.
## Causes
Ranked, with file:line.
## Changes
One line per file: `path`, what changed.
## Results
Counts and hitches after the change, plus test results.
</output_format>

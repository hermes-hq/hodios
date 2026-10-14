---
schema: 1
id: fix-compose-state-bug
kind: prompt
title: Fix a Jetpack Compose state bug
description: Fixes Jetpack Compose UI that does not update, loses state on rotation or process death, or recomposes in loops, tracing remember, keys and StateFlow.
category: debugging
version: 1.0.0
status: incubating
stage: [build]
role: [mobile-engineer]
stack: [android]
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
depth: specific
tags: [jetpack-compose, recomposition, stateflow, viewmodel]
pairs_with:
  prompts: [debug-mobile-crash, fix-mobile-build-failure]
  personas: [kotlin-android-engineer]
args:
  - name: symptom
    description: "What goes wrong: the UI does not reflect new data, state is lost on rotation or when returning to the screen, a LaunchedEffect runs too often, or the screen recomposes constantly."
    type: text
    required: true
  - name: code
    description: "The composables, ViewModel and state classes involved, or their paths."
    type: text
output_contract:
  format: markdown
  sections: [State ownership, Cause, Fix, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an Android engineer who knows Compose recomposes when a `State` object it read changes, and that `remember` only lives as long as the composable stays in the composition. The usual bugs:
- Mutable data Compose cannot observe: a `mutableListOf` or a data class mutated in place inside `mutableStateOf`; use immutable copies (`list + item`, `copy()`) or `mutableStateListOf`.
- State lost: `remember` does not survive configuration changes or process death; use `rememberSaveable` for small UI state and a `ViewModel` with `SavedStateHandle` for screen state.
- State not reset: `remember` without keys keeps a value when its input changes; use `remember(key)`.
- Flows: collecting with `collectAsState` without lifecycle awareness, or collecting in `LaunchedEffect` and copying into local state; prefer `collectAsStateWithLifecycle`. A `StateFlow` emits only when the value is not equal to the previous one, so mutating an object and re-emitting it does nothing.
- Effects: `LaunchedEffect(Unit)` that should restart when an id changes, or a key that changes every recomposition (a new lambda or object), restarting the effect constantly.
- Recomposition loops and excess: writing state during composition (backwards writes), reading a fast-changing state (scroll offset) high in the tree instead of in a lambda modifier, unstable parameters (plain `List`, classes from modules without the Compose compiler) preventing skipping. Strong skipping mode in recent Compose compiler versions changes some of this.
- Lists: `LazyColumn` items without stable `key`s lose item state when the list changes.
</context>

<task>
Fix this Compose state problem.

Symptom:
{{symptom}}
{{#code}}

Code:
{{code}}
{{/code}}

1. Read the composables, the ViewModel and how state flows between them. Note where each value is created and how long it should live.
2. Name the cause from the list, with the line.
3. Fix it idiomatically: immutable updates or snapshot collections, `rememberSaveable` or ViewModel state, `remember` and effect keys tied to the right inputs, `collectAsStateWithLifecycle`, `key` in lazy lists, deferring fast reads with lambda modifiers, or stable types.
4. Verify with a Compose UI test if the project has them, or exact steps (rotate the device, enable "Don't keep activities", use Layout Inspector recomposition counts).
</task>

<constraints>
- Do not fix it by disabling configuration changes in the manifest (`android:configChanges`) unless the app already handles them itself.
- Do not wrap everything in `derivedStateOf`, `remember` or `@Stable` annotations without a reason tied to the bug.
- Do not move state into a global singleton.
{{> guardrails/investigate-before-answering}}
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## State ownership
Where each piece of state lives (composition, rememberSaveable, ViewModel, data layer) and how it flows into the composable.
## Cause
Why Compose does not see the change, loses it, or keeps recomposing.
## Fix
The diff.
## Verification
How it was checked: a Compose UI test, rotation in the emulator, "Don't keep activities", or Layout Inspector recomposition counts.
</output_format>

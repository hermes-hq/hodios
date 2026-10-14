---
schema: 1
id: split-large-composable
kind: prompt
title: Split a large Compose screen
description: Splits an oversized Jetpack Compose screen into stateless composables with hoisted state and a ViewModel, keeping UI behaviour and saved state identical.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [mobile-engineer]
stack: [android]
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
tags: [jetpack-compose, state-hoisting, recomposition, ui-state]
pairs_with:
  personas: [kotlin-android-engineer]
args:
  - name: screen
    description: The composable screen to split, as a path or pasted code, and what hurts (for example "900 lines, previews broken, cannot test").
    type: text
    required: true
  - name: test_command
    description: The Gradle task that runs the tests, if not the usual one (for example ./gradlew :app:testDebugUnitTest).
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
You split Compose screens using state hoisting: a stateful screen-level composable collects state from the ViewModel and passes plain values and lambdas to stateless composables that only render and emit events. Stateless composables are previewable and testable; the screen keeps one `UiState` and one place that handles events.

Splitting can change behaviour. `remember` loses state when a composable leaves composition; `rememberSaveable` survives configuration change and process death, so changing one into the other, or moving it into a child shown conditionally, changes what users keep. Business state belongs in the ViewModel (with `SavedStateHandle` if it must survive process death), UI element state (scroll, expanded) can stay in composables. Passing unstable parameters (mutable lists, classes from modules without the compiler plugin) to new children makes them skip less, and lambdas that capture changing values cause extra recompositions. `LaunchedEffect` keys must be copied exactly or effects rerun or go stale. Collect flows with `collectAsStateWithLifecycle`, matching what the screen does now.
</context>

<task>
Split {{screen}}.

1. Read the screen and list its parts with line ranges: each `remember`/`rememberSaveable` state, ViewModel calls, effects and their keys, derived values, and each visual region.
2. Propose the split: one stateful screen composable, stateless children per region taking values and event lambdas, a `UiState` data class and event functions on the ViewModel for business state. Say where each piece of state lives afterwards and whether it survives rotation and process death as it does today. Wait for approval.
3. Make sure Compose UI tests or ViewModel tests cover the main flows; add ViewModel tests for logic you will move.
4. Apply the split in steps: move logic into the ViewModel, then extract children one at a time with a `@Preview` each. Run the tests{{#test_command}} with `{{test_command}}`{{/test_command}} after each step. Copy effect keys exactly.
5. Show the diff and file layout following the project's package conventions.
</task>

<constraints>
- Keep the screen's navigation arguments, visuals, semantics (content descriptions, test tags) and saved-state behaviour the same.
- Do not swap `remember` and `rememberSaveable`, or move state into a conditional child, without saying what changes.
- Do not introduce a new architecture library, DI framework or navigation change in this refactor.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Responsibilities
Table: line range, part, state, survives rotation (yes or no).
## Proposed split
Composables, UiState and ViewModel events, with where state lives.
## Steps
Numbered steps, each with its test check.
## Diff
The change and the new layout.
## Check
Tests and previews run, with results.
</output_format>

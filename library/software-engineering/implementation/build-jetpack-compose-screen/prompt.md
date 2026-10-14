---
schema: 1
id: build-jetpack-compose-screen
kind: prompt
title: Build a Jetpack Compose screen with a ViewModel
description: Builds a Jetpack Compose screen with a ViewModel exposing StateFlow UI state, a stateless content composable, lifecycle-aware collection, events, previews and tests.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [mobile-engineer]
stack: [android]
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
depth: specific
tags: [jetpack-compose, viewmodel, stateflow, state-hoisting, coroutines]
args:
  - name: screen
    description: What the screen shows and does, its inputs (for example an id from navigation), and what it navigates to.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Structure, Changes, UI state, Tests, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Compose screens stay testable when state flows one way: the ViewModel owns a single UI state, the screen collects it, and a stateless content composable renders it. Common mistakes: collecting with `collectAsState()` so flows keep running in the background (use `collectAsStateWithLifecycle()`); passing the ViewModel deep into child composables, which kills previews; one-off events sent through a `SharedFlow` that drops them during configuration changes (Android's guidance is to model them as state and consume them); starting loads from a `LaunchedEffect` that reruns on recomposition; and lists without stable keys, which lose scroll position and animate wrongly.
</context>

<task>
Build this Compose screen:

{{screen}}

1. Read the project: module structure, DI (Hilt, Koin or manual), navigation (Navigation Compose, type-safe routes), repository layer, theme, and an existing screen to copy patterns from.
2. Define the UI state as an immutable data class or sealed interface (loading, content, empty, error) and the user actions as functions or a sealed event type.
3. Write the ViewModel: inject the repository, read navigation arguments from `SavedStateHandle`, expose `StateFlow<UiState>` built with `stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), initial)` or a `MutableStateFlow`, and launch work in `viewModelScope`. Map errors to user-facing messages.
4. Split the UI: `XRoute` or `XScreen` gets the ViewModel and collects state with `collectAsStateWithLifecycle()`; `XContent(state, onAction)` is stateless and previewable.
5. Render each state; use `LazyColumn` with stable `key`s for lists, `rememberSaveable` for UI-only state such as text input, and the app's Material theme. Handle one-off results (navigate after save, show a snackbar) as state the UI consumes and then reports back.
6. Add content descriptions for icons, touch targets of at least 48dp, and support for font scaling.
7. Add `@Preview`s for each state, including dark theme and a large font scale.
8. Write tests: ViewModel tests with `runTest`, a test dispatcher and a fake repository (Turbine if the project uses it), and a Compose UI test with `createComposeRule` for the content composable. Run `./gradlew test` and the relevant lint.
</task>

<constraints>
- Do not pass the ViewModel or `NavController` into child composables.
- Do not do I/O on the main thread or inside composition.
- Do not add a new DI or navigation library for this screen.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Structure
Route, content composable, ViewModel and dependencies, and how navigation arguments arrive.

## Changes
One line per file: `path`, what changed.

## UI state
The UI state type in a code block.

## Tests
One line per test.

## Verification
Commands run and their real results.
</output_format>

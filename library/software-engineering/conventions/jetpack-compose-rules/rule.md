---
schema: 1
id: jetpack-compose-rules
kind: rule
title: Jetpack Compose rules
description: Standing rules for Jetpack Compose UI covering state hoisting, stable parameters, remember and effect APIs, modifier conventions, ViewModel boundaries, lazy lists and previews.
category: conventions
version: 1.0.0
status: incubating
stage: [build]
role: [mobile-engineer]
stack: [android]
requires: [none]
output: [code]
risk: read-only
invocation: user
model_tier: mid
level: intermediate
depth: specific
tags: [jetpack-compose, state-hoisting, recomposition, side-effects, compose-previews]
applies_to: ["**/*.kt"]
pairs_with:
  rules: [kotlin-style-rules]
  prompts: [build-jetpack-compose-screen, fix-compose-state-bug]
  personas: [mobile-engineer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you write or change Jetpack Compose code in this project:

**Know the project first**
- Read the Compose BOM or library versions and the Kotlin version in the Gradle files before using newer APIs. Follow the project's existing navigation library, dependency injection (Hilt, Koin or manual) and theme.

**State hoisting and the screen boundary**
- Split each screen into a stateful route composable that talks to the ViewModel and a stateless screen composable that takes `uiState` and event lambdas. Only the route knows about the ViewModel; previews and tests use the stateless one.
- Expose UI state from the ViewModel as one immutable `StateFlow<UiState>` (a data class or sealed interface for loading, content and error). Collect it with `collectAsStateWithLifecycle()`, not `collectAsState()`, on Android.
- Send events up as lambdas named for what happened (`onRetryClick`, `onQueryChange`). Do not pass the ViewModel, `NavController` or a `MutableState` into child composables.
- One-off effects (navigation, snackbars) come from state the UI consumes or a dedicated channel, handled in a `LaunchedEffect`, not from calling navigation inside the ViewModel.

**Remember and state APIs**
- Wrap state created in a composable in `remember { mutableStateOf(...) }`; use `rememberSaveable` for user input that must survive rotation and process death.
- Use `derivedStateOf` when state is computed from other state that changes more often than the result (for example "show the scroll-to-top button").
- Use `mutableIntStateOf` and friends for primitives. Never hold a mutable collection in state and mutate it in place; replace it, or use `mutableStateListOf`.

**Side effects**
- No side effects in the composition itself: no network calls, logging, analytics or writes in the composable body.
- Use `LaunchedEffect(key)` with the real keys the effect depends on. `LaunchedEffect(Unit)` means "once per entering composition"; use it only when that is what you mean.
- Use `DisposableEffect` for listeners and callbacks that need cleanup, and `rememberUpdatedState` for lambdas captured by long-running effects.
- Launch coroutines from event handlers with `rememberCoroutineScope()`, not `GlobalScope`.

**Stability and recomposition**
- Pass immutable data to composables: data classes with `val` properties and immutable collection types. Unstable parameters (mutable lists, classes from modules without the Compose compiler) cause needless recomposition. Check with the Compose compiler reports before reaching for `@Stable` or `@Immutable`, and only annotate when the contract really holds.
- Defer reads of fast-changing state: use lambda modifiers such as `Modifier.offset { }` and `graphicsLayer { }` for scroll- or animation-driven values.

**Modifiers and layout**
- Every reusable composable takes `modifier: Modifier = Modifier` as its first optional parameter and applies it to its root, once.
- Remember that modifier order matters (`padding` then `clickable` is not the same as `clickable` then `padding`). Put size and click handling where the touch target is meant to be; touch targets are at least 48dp.
- Use `MaterialTheme` colours, typography and shapes, not hard-coded colours or `sp` values.

**Lists**
- Use `LazyColumn` or `LazyRow` for lists, with stable `key`s from item ids and a `contentType` when items differ. Never put a lazy list inside a vertically scrolling parent of the same direction.

**Accessibility, previews and tests**
- Give icons a `contentDescription` (or `null` when decorative) and merge semantics for compound rows.
- Add `@Preview` functions for the stateless screen with fake state for loading, content, error and large font, in light and dark.
- Test ViewModels with plain unit tests and screens with Compose UI tests that find nodes by semantics, not by test tags alone.

**Before you finish**
- Build, run lint and the tests that cover the change, and fix warnings you introduced. Say what you ran.

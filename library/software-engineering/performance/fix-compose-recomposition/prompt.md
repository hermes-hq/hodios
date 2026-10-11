---
schema: 1
id: fix-compose-recomposition
kind: prompt
title: Fix excess Compose recomposition
description: Finds excess Jetpack Compose recompositions with Layout Inspector counts and compiler stability reports, then fixes unstable types, early state reads, lambdas and missing keys.
category: performance
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [mobile-engineer]
stack: [android]
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [diff, report]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: expert
tags: [jetpack-compose, recomposition, compose-stability, layout-inspector, derivedstateof]
pairs_with:
  prompts: [fix-mobile-scroll-jank, split-large-composable, fix-compose-state-bug]
  personas: [kotlin-android-engineer, performance-engineer]
args:
  - name: symptom
    description: What is slow (scroll stutter, an animation that drops frames, typing lag), the composables and state holders involved, Kotlin and Compose versions, and whether strong skipping is enabled.
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
Compose re-runs a composable when state it read changes, and skips a child when its parameters are equal and stable. Excess recomposition comes from a few causes. Unstable parameters: classes from other modules without Compose compiler support, `var` properties, and standard `List`/`Map` interfaces are treated as unstable, so children cannot be skipped; strong skipping mode (the default from Kotlin 2.0.20) relaxes this but compares unstable values by instance, so a new list each time still recomposes. Reading state too early: reading a scroll offset or animated value in composition recomposes every frame, while reading it inside a lambda modifier (`Modifier.offset { }`, `graphicsLayer { }`, `drawBehind { }`) defers the read to layout or draw. Values derived from fast-changing state (for example "show the button when the first visible item is above 0") belong in `derivedStateOf` so they change only when the result changes. Lazy lists without `key` lose item identity on reorder. Writing state during composition after reading it ("backwards writes") loops. Measure on a release build with R8 and baseline profiles; debug builds are much slower and their counts mislead about cost.
</context>

<task>
Fix recomposition for: {{symptom}}

1. Read the slow composables, their state holders (ViewModel, `remember`ed state), and the data classes passed as parameters. Note Kotlin and Compose versions and compiler options.
2. Collect evidence: Layout Inspector recomposition and skip counts for the slow interaction, and the Compose compiler reports or metrics (which classes are unstable, which composables are not skippable). Run the compiler reports if you can; otherwise give the Gradle configuration to enable them.
3. Find the causes and cite file:line: unstable parameter types and new instances each recomposition; state read in composition that could be deferred to layout or draw; derived values that should use `derivedStateOf`; lambdas capturing unstable values; lazy items without `key` or `contentType`; backwards writes; expensive calculations not `remember`ed.
4. Fix with the smallest change: make models stable (immutable `val`s, immutable collections, or `@Immutable`/`@Stable` only when the contract is true); defer reads with lambda modifiers; add `derivedStateOf`; `remember` expensive values with correct keys; add keys and content types to lazy items.
5. Re-check counts and frame timing on a release build and run the tests.
</task>

<constraints>
- Only annotate a class `@Immutable` or `@Stable` when it truly meets the contract; a false annotation makes the UI miss updates.
- Do not judge performance from debug builds; say when the user's observation comes from one.
- Do not add `remember` around values that must change with their inputs without listing those inputs as keys.
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Evidence
Recomposition and skip counts, unstable classes from the compiler report.
## Causes
Ranked, with file:line.
## Changes
One line per file: `path`, what changed.
## Results
Counts and frame timing after the change on a release build, plus tests.
</output_format>

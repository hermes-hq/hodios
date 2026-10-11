---
schema: 1
id: split-bloated-viewmodel
kind: prompt
title: Split a bloated mobile ViewModel
description: Breaks an oversized Android or iOS ViewModel into use cases and smaller state holders, keeping screen behaviour, lifecycle handling and tests the same.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [mobile-engineer]
stack: [android, ios]
requires: [repo-read, file-write, shell]
inputs: [file]
output: [plan, diff]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [mvvm, use-cases, state-holders, ui-state]
pairs_with:
  personas: [kotlin-android-engineer, swift-ios-engineer]
args:
  - name: viewmodel
    description: The ViewModel to split, as a path or pasted code, the platform (Android Kotlin or iOS Swift) and what hurts (size, untestable, every feature touches it).
    type: text
    required: true
  - name: test_command
    description: The command that runs the ViewModel tests, if not the usual one.
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
You split ViewModels by what they do, keeping the ViewModel as the single owner of screen state and lifecycle. A bloated ViewModel usually mixes: calls to several repositories, business rules (validation, pricing, permission checks), mapping domain data to UI models, several independent pieces of screen state (a form, a list with paging, a dialog), and one-off events (navigation, toasts). Business rules and multi-repository orchestration move into use cases (plain classes with one public operation, testable without the UI). Independent state groups move into plain state-holder classes that the ViewModel owns. Mapping moves into pure mapper functions.

What must not change: the coroutine or task scope (on Android work runs in `viewModelScope` and is cancelled in `onCleared`; on iOS tasks are tied to the model's lifetime and must be cancelled the same way), the threading of state updates (main thread or main actor), saved state (`SavedStateHandle` on Android, state restoration on iOS), and the order in which state is emitted, because screens and tests often depend on intermediate loading states. Extracted classes must not hold a reference to a View, Activity, Context or view controller.
</context>

<task>
Split {{viewmodel}}.

1. Read the ViewModel and list its responsibilities with line ranges: dependencies, state fields, public functions, coroutines or tasks launched, events emitted. Group them into independent clusters.
2. Propose the split: use cases for business operations, state holders for independent state groups, mappers for UI models. Show the new constructor of the ViewModel and how each extracted class is created, following the project's existing dependency injection. Wait for approval.
3. Check existing ViewModel tests. Where a cluster has none, add tests that pin the emitted state sequence before moving it.
4. Extract one cluster at a time: write the class, delegate from the ViewModel, run the tests{{#test_command}} with `{{test_command}}`{{/test_command}}, then the next. Keep the ViewModel's public API and emitted state unchanged.
5. Add focused tests for each new use case and show the diff and file layout.
</task>

<constraints>
- The screen-facing API, emitted state sequence, cancellation behaviour and saved state stay the same.
- Extracted classes never hold UI or Context references and never launch work in a scope longer-lived than the ViewModel.
- Do not create a use case that only forwards to one repository call; say when a direct repository call is clearer.
- Do not change the DI framework or architecture library.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Responsibilities
Table: line range, responsibility, cluster.
## Proposed split
New classes with their single job, and the new ViewModel constructor.
## Steps
Numbered steps, each with its test check.
## Diff
The change and file layout.
## Check
Tests run and results, including new tests.
</output_format>

---
schema: 1
id: build-flutter-feature-screen
kind: prompt
title: Build a Flutter feature screen
description: Builds a Flutter feature screen with the project's state-management approach, a repository behind an interface, explicit loading, empty and error states, and widget tests with fakes.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [mobile-engineer]
stack: [flutter]
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
tags: [riverpod, bloc, widget-tests, repository-pattern, async-state]
args:
  - name: screen
    description: What the screen shows and does, the data it needs, and where it navigates.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Structure, Changes, States, Tests, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Flutter projects pick one state-management approach (Riverpod, Bloc or Cubit, Provider, or plain `ChangeNotifier`) and a screen that brings in another one makes the codebase harder for everyone. Other frequent problems: using `BuildContext` after an `await` without checking `mounted`; controllers (`TextEditingController`, `AnimationController`, `ScrollController`) never disposed; a `FutureBuilder` whose future is created inside `build`, so it refetches on every rebuild; a `ListView` with `children:` for long lists instead of a builder; and API calls made directly from widgets, so nothing can be tested without a network.
</context>

<task>
Build this Flutter screen:

{{screen}}

1. Read `pubspec.yaml` and the `lib/` structure: state management, routing (go_router, auto_route, Navigator), HTTP or data layer, dependency injection, folder conventions (feature-first or layer-first), lints, and an existing screen to mirror.
2. Use the project's state approach only. Model screen state explicitly: loading, data, empty, error (for example `AsyncValue` with Riverpod, sealed state classes with Bloc).
3. Put data access behind a repository interface with an implementation using the existing client; the state layer depends on the interface.
4. Write the widget tree with `const` constructors where possible, `ListView.builder` or slivers for long lists, and small private widgets for sections. Never create futures or streams inside `build`.
5. Handle each state in the UI: progress indicator, content, empty message with a next step, error message with retry. Support pull to refresh if it is a list.
6. Dispose every controller and subscription; check `context.mounted` (or `mounted`) after each `await` before using context to navigate or show a snackbar.
7. Use the app theme's colours and text styles, add `Semantics` or tooltips for icon-only buttons, and make sure layouts survive large text scale.
8. Write widget tests with a fake repository covering loading, data, empty, error and retry, plus unit tests for the state notifier, Bloc or Cubit. Run `flutter analyze` and `flutter test`.
</task>

<constraints>
- Do not add a second state-management or routing package.
- Do not call HTTP or storage APIs directly from widgets.
- Do not use `setState` for state that the project keeps in its state layer.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Structure
Widget, state class, repository interface and implementation, and the files they live in.

## Changes
One line per file: `path`, what changed.

## States
Table: State | What the user sees | Actions.

## Tests
One line per test.

## Verification
Commands run and their real results.
</output_format>

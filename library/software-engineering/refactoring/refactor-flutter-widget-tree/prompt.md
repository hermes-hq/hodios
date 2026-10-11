---
schema: 1
id: refactor-flutter-widget-tree
kind: prompt
title: Refactor a deep Flutter widget tree
description: Breaks deeply nested Flutter build methods into widget classes, adds const constructors and moves logic out of build, with no visible UI change.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [mobile-engineer]
stack: [flutter]
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
tags: [widget-extraction, const-constructors, build-method, widget-tests]
pairs_with:
  personas: [flutter-engineer]
  rules: [flutter-rules]
args:
  - name: widget
    description: The widget file to refactor, as a path or pasted code, the state management in use (setState, Provider, Riverpod, Bloc) and what hurts.
    type: text
    required: true
  - name: test_command
    description: The test command, if not flutter test.
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
You refactor Flutter UI the way the Flutter team recommends: extract regions into small `StatelessWidget` or `StatefulWidget` classes, not helper methods returning `Widget`. A helper method rebuilds whenever its parent rebuilds and cannot be `const`; a widget class gets its own `BuildContext`, can be `const` and is skipped when its inputs are identical. `const` constructors and `const` literals let Flutter reuse elements instead of rebuilding them.

Moving code changes behaviour when state moves: a `StatefulWidget`'s `State` is tied to its position and type in the tree, so wrapping a widget in a new parent or reordering siblings without keys resets controllers, scroll positions and animations. `TextEditingController`, `AnimationController` and `ScrollController` must stay created in `initState` and disposed in `dispose` of the same owner. Lookups like `Theme.of(context)` or `context.watch` in an extracted widget subscribe that widget instead of the parent, which is usually better but changes what rebuilds. Work in `build` (sorting, formatting, network calls, creating futures) belongs in the state layer, because `build` can run many times per second.
</context>

<task>
Refactor {{widget}}.

1. Read the file and list its parts: nesting depth, helper methods returning widgets, controllers and where they are created and disposed, work done in `build`, state reads.
2. Propose the change: widget classes for each named region with only the inputs they need, `const` where possible, logic moved to the existing state management layer or plain functions, controller ownership after the change. Wait for approval.
3. Check widget tests and golden tests that cover this screen; add a widget test for the main interactions if none exist.
4. Refactor in steps: move logic out of `build`, then extract widgets one at a time, adding `const`. Run `flutter analyze` and the tests{{#test_command}} with `{{test_command}}`{{/test_command}} after each step.
5. Show the diff and the new file layout following the project's folder conventions.
</task>

<constraints>
- Layout, semantics, keys, animations and controller lifetimes stay the same; golden tests must pass unchanged.
- Do not replace the state management approach or add packages.
- Do not extract widgets used once purely to reduce indentation when the region has no meaningful name; say so.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Responsibilities
Table: line range, part, state or controller involved.
## Proposed split
Widget classes, const opportunities, logic moved, controller owners.
## Steps
Numbered steps, each with its analyze and test check.
## Diff
The change and new layout.
## Check
Analyzer and test results.
</output_format>

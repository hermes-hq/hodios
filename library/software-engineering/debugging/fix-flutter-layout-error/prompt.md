---
schema: 1
id: fix-flutter-layout-error
kind: prompt
title: Fix a Flutter layout error
description: Fixes Flutter RenderFlex overflow, unbounded height or width, and "RenderBox was not laid out" errors by reading the constraint chain from parent to child.
category: debugging
version: 1.0.0
status: incubating
stage: [build]
role: [mobile-engineer, frontend-engineer]
stack: [flutter]
requires: [repo-read, file-write, shell]
inputs: [stack-trace, file, repo]
output: [explanation, diff]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [layout-constraints, renderflex, widgets, overflow]
pairs_with:
  prompts: [fix-mobile-build-failure, debug-mobile-crash]
  personas: [flutter-engineer]
args:
  - name: error
    description: "The error from the debug console, including the widget creation chain and the constraints it prints."
    type: text
    required: true
  - name: code
    description: "The build method of the failing widget and its parents up to a known-sized ancestor, or their paths."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [The constraint chain, Cause, Fix, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a Flutter engineer who fixes layout errors by applying the rule "constraints go down, sizes go up, parent sets position". Every error is a widget receiving constraints it cannot satisfy:
- Unbounded height in a scrollable or flex: a `ListView`, `GridView` or `Column` with `Expanded` children placed inside another `Column` or `ListView` gets infinite height ("Vertical viewport was given unbounded height", "RenderFlex children have non-zero flex but incoming height constraints are unbounded"). Wrap the inner one in `Expanded`/`Flexible`, give it a fixed height, or use slivers (`CustomScrollView`) for nested scrolling. `shrinkWrap: true` works but lays out every child, which is slow for long lists.
- Unbounded width: a `TextField` or `ListTile` inside a `Row` without `Expanded` ("InputDecorator cannot have an unbounded width").
- RenderFlex overflowed by N pixels: content larger than the space, typically long text in a `Row` (use `Expanded` or `Flexible` with `overflow`/`softWrap`), a `Column` that should scroll (`SingleChildScrollView`), or the keyboard reducing height (`resizeToAvoidBottomInset`).
- "RenderBox was not laid out": usually a consequence of an earlier constraint error in the log; fix the first error.
- `Expanded` used outside a `Row`, `Column` or `Flex` ("Incorrect use of ParentDataWidget").
- Sizes that only work on one device: hard-coded heights, large text scale settings, landscape orientation.
The first error in the log is the one to fix; the rest are usually cascades.
</context>

<task>
Fix this Flutter layout error.

Error:
{{error}}

Code:
{{code}}

1. Find the first layout error in the log and the widget it names, using the creation chain.
2. Walk from the nearest ancestor with bounded constraints (the screen, a `SizedBox`, an `Expanded`) down to the failing widget, writing what constraints each passes and what size each wants.
3. Name where the chain breaks: unbounded constraints passed to a widget that wants to fill them, or content larger than the bounded space.
4. Fix it at that point with the smallest change that also works on small phones and large text scale: `Expanded`/`Flexible`, a scrollable wrapper, slivers, `LayoutBuilder` for responsive sizes, text overflow handling.
5. Verify on a small screen and a large one, with a large text scale and with the keyboard open where relevant. Run widget tests if the project has them.
</task>

<constraints>
- Do not fix overflow by hard-coding pixel heights or clipping content that users need to read, unless the design says so.
- Do not add `shrinkWrap: true` to long or unbounded lists without mentioning the performance cost.
- Fix the first error before others.
{{> guardrails/investigate-before-answering}}
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## The constraint chain
From the nearest bounded ancestor down to the failing widget: what constraints each passes and what size each wants.
## Cause
The widget that receives infinite or too-small constraints, and why.
## Fix
The diff, and how the layout now behaves on small and large screens.
## Verification
How it was checked: screen sizes, text scale and orientation tested.
</output_format>

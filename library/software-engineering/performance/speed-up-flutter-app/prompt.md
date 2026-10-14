---
schema: 1
id: speed-up-flutter-app
kind: prompt
title: Fix Flutter jank and slow screens
description: Fixes Flutter jank and slow screens from a profile-mode DevTools timeline by scoping rebuilds, removing costly layout and raster work, and moving heavy computation to isolates.
category: performance
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [mobile-engineer]
stack: [flutter]
requires: [repo-read, file-write, shell]
inputs: [repo, text, logs]
output: [diff, report]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [jank, flutter-devtools, widget-rebuilds, isolates, raster-thread]
pairs_with:
  prompts: [fix-mobile-scroll-jank, speed-up-app-cold-start, reduce-memory-footprint]
  personas: [flutter-engineer, performance-engineer]
args:
  - name: symptom
    description: What is janky or slow (scrolling, an animation, opening a screen, typing), the widgets and state management involved, Flutter version, and the devices where it happens.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Timeline, Causes, Changes, Results]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Debug builds run Dart in JIT mode with extra checks and are not representative; performance work happens in profile mode on a real device, ideally a low-end Android phone. The DevTools Performance view shows each frame split into the UI thread (build, layout, Dart code) and the raster thread (painting the layer tree on the GPU). The fix depends on which one is over budget. UI-thread jank: `setState` high in the tree rebuilding large subtrees (scope rebuilds with smaller widgets, `const` constructors, `ValueListenableBuilder` or state-management selectors), building all list items instead of using `ListView.builder`, nested `shrinkWrap` lists and intrinsic sizing, and heavy synchronous work such as JSON parsing of large payloads or image processing (move it to `Isolate.run` or `compute`). Raster-thread jank: `saveLayer` calls from `Opacity` (use `FadeTransition` or `AnimatedOpacity`), `ShaderMask`, `BackdropFilter`, clipping with anti-aliasing on many items, many shadows, and decoding images far larger than displayed (`cacheWidth`/`cacheHeight`). Shader compilation jank on first run is largely addressed by the Impeller renderer where it is enabled; check which renderer the app uses.
</context>

<task>
Fix the performance problem: {{symptom}}

1. Read the screen's widgets, state management and any heavy work in build methods, `initState` or callbacks. Note the Flutter version and the renderer in use.
2. Record evidence in profile mode on a real device: DevTools Performance frames (UI versus raster time, janky frames), "Track widget rebuilds", and for raster problems the layer and `saveLayer` checks. If you cannot run it, give the exact steps and list code-level suspects.
3. Classify each slow frame as UI-thread or raster-thread and find the cause, citing file:line.
4. Fix with the smallest change: split widgets so state changes rebuild less; add `const`; use builders for long lists; replace costly layout patterns; move parsing or computation off the UI isolate; replace `Opacity` and costly effects in animations; size image decoding to display size.
5. Re-record the same interaction in profile mode, compare janky frame counts and frame times, and run the tests.
</task>

<constraints>
- Never report numbers from debug mode or a simulator; say when the user's observation comes from one.
- Keep visual output the same; note where an effect is simplified.
- Do not move work to an isolate when the data copy costs more than the work; say how you judged it.
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Timeline
Frame times and which thread is over budget, before the change.
## Causes
Ranked, with file:line.
## Changes
One line per file: `path`, what changed.
## Results
Janky frames and frame times after the change, plus tests.
</output_format>

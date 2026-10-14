---
schema: 1
id: fix-mobile-scroll-jank
kind: prompt
title: Fix scroll jank in a mobile list
description: Finds why scrolling a list stutters on Android, iOS or cross-platform apps from frame timing and traces on a low-end device, and fixes cell binding, image decoding, layout and recycling.
category: performance
version: 1.0.0
status: incubating
stage: [maintain, verify]
role: [mobile-engineer]
stack: [android, ios, react-native, flutter]
requires: [repo-read, file-write, shell]
inputs: [repo, logs, text]
output: [diff, report]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [scroll-performance, frame-drops, recycling, image-decoding, jank]
pairs_with:
  prompts: [speed-up-app-cold-start, reduce-mobile-battery-drain, hit-game-frame-budget]
  personas: [performance-engineer]
args:
  - name: target
    description: The screen and list (feed, chat, catalogue grid), the platform and UI framework, what each cell shows, and the devices where it stutters.
    type: text
    required: true
  - name: evidence
    description: Frame timing stats, a system trace or profiler capture, if any.
    type: text
output_contract:
  format: markdown
  sections: [Result, Where frames are lost, Fixes, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Scroll jank is frames missing their deadline (about 16.7 ms at 60 Hz, 8.3 ms at 120 Hz) while new cells come on screen. It almost never shows on a flagship phone in a debug build, so measurement must be on a low-end device with a release or profile build. The usual causes are per-cell work on the main or UI thread: decoding full-size images, creating formatters or parsing dates or rich text in bind or build, synchronous disk or database reads, deep or nested layouts that measure twice, and expensive effects like shadows, blurs and rounded clipping that force offscreen rendering. Framework specifics matter: views not recycled or a recycler with stable IDs missing; lazy lists without stable keys causing recomposition or rebuilds of every item; cross-platform lists rendering items too eagerly or with inline functions re-creating props; and work on the JavaScript or Dart thread competing with the UI thread.
{{#evidence}}
Evidence:
{{evidence}}
{{/evidence}}
</context>

<task>
Target: {{target}}

1. Measure on the slowest supported device with a release or profile build: dropped or slow frame percentage and frame time percentiles while flinging through the list, using the platform tooling (system traces, frame timing metrics, the framework's performance overlay or devtools). Record the scenario so it can be repeated.
2. Find where frames are lost: in a trace of a slow frame, see whether time goes to binding or building cells, layout and measure, image decode, rendering on the GPU thread, or the JavaScript or Dart thread. Tie each to code with `path:line`.
3. Fix in order of time saved: decode and resize images off the main thread to the displayed size with caching; move parsing and formatting out of bind into the data layer; reuse formatters; flatten layouts and give fixed sizes where possible; enable recycling or stable keys; replace offscreen-rendered effects with pre-rendered assets or cheaper equivalents; prefetch the next cells' data.
4. Re-run the same scenario on the same device and compare frame stats. Run the screen's tests.
</task>

<constraints>
- Never measure only on a fast device or a debug build; say if that is all that is available.
- Keep the visual design unchanged unless the user agrees to a change (for example a cheaper shadow); call out any visible difference.
- Report measured frame numbers, not impressions.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Result
One line: slow or dropped frames before and after, device and build type.
## Where frames are lost
Table: cause | `path:line` | time per frame.
## Fixes
The diff summary, one sentence per change.
## Verification
Same scenario results and test results.
</output_format>

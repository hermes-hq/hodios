---
schema: 1
id: speed-up-react-native-app
kind: prompt
title: Speed up a slow React Native app
description: Fixes slow screens, laggy lists and dropped frames in a React Native app by profiling JS and UI threads in a release build, then cutting re-renders, list costs, bridge traffic and heavy startup work.
category: performance
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [mobile-engineer, frontend-engineer]
stack: [react-native]
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [diff, report]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [frame-rate, flatlist, re-renders, hermes, mobile-performance]
pairs_with:
  prompts: [fix-mobile-scroll-jank, speed-up-app-cold-start, fix-react-rerenders, speed-up-long-list-rendering]
  personas: [react-native-engineer, performance-engineer]
args:
  - name: problem
    description: What feels slow (a screen, a list, navigation, startup, typing), on which devices and OS versions, React Native version, whether Expo is used, and the architecture (old bridge or new architecture).
    type: text
    required: true
  - name: evidence
    description: Performance monitor readings, React DevTools profiler output, Perfetto or Instruments traces, or timings.
    type: text
output_contract:
  format: markdown
  sections: [Result, Diagnosis, Changes, Verification, Further options]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
React Native has two frame budgets to watch: the JavaScript thread, where React renders and app logic runs, and the UI thread, where native views lay out and draw. The performance monitor shows both; a JS FPS drop with a steady UI FPS means too much JavaScript work, the reverse means heavy native views, shadows, large images or layout. Development builds are many times slower than release builds, so measure in a release or profile build on a mid-range Android device, which is where problems show first. The common culprits are re-rendering whole screens from a context or store change, FlatList without stable keys, memoised rows or `getItemLayout`, inline functions and objects breaking memoisation, large unresized images, animations driven from JavaScript instead of the native driver or Reanimated worklets, `console.log` left in production, and heavy synchronous work at startup or on navigation. On the old architecture, chatty traffic across the bridge also costs frames.
</context>

<task>
Problem: {{problem}}
{{#evidence}}
Evidence:
{{evidence}}
{{/evidence}}

1. Read the slow screen or flow: components, state sources, list setup, images and animations. Note the React Native version, Hermes and architecture.
2. Reproduce in a release or profile build on the slowest target device. Record JS and UI frame rates during the slow interaction, or time-to-interactive for a screen, and capture a React DevTools profile of renders.
3. Classify the problem as JS-thread, UI-thread or both, and list the specific causes with `path:line`: components re-rendering without need, list configuration, image sizes, JS-driven animations, startup work, bridge traffic.
4. Fix in order of measured impact with small changes: narrow state subscriptions and memoise rows, configure lists (stable `keyExtractor`, `getItemLayout` for fixed rows, sensible window size, or a recycling list library if the team agrees), resize and cache images, move animations to the native driver or Reanimated, defer non-critical work until after the transition.
5. Re-measure the same interaction on the same device after each change, run the tests, and check the screen still behaves the same.
</task>

<constraints>
- Never draw conclusions from a development build; say so if that is all the user measured.
- Report measured frame rates or timings with device and build type; label estimates.
- Adding a dependency (a list or animation library) needs the user's agreement.
- Keep behaviour and visuals the same unless the user agrees.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Result
Frame rates or timings before and after, device and build type.
## Diagnosis
JS-thread or UI-thread, causes with `path:line`.
## Changes
The diff, one sentence per change and its measured effect.
## Verification
What was run and on which devices.
## Further options
Bigger changes not made (new architecture migration, list library, native modules), or "None".
</output_format>

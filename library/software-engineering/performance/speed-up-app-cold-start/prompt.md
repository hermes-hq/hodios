---
schema: 1
id: speed-up-app-cold-start
kind: prompt
title: Speed up app cold start
description: Measures and cuts mobile app cold start by deferring SDK setup, removing main-thread I/O and using baseline profiles, measured on a low-end device. Use when an app is slow to open.
category: performance
version: 1.0.0
status: incubating
stage: [maintain, verify]
role: [mobile-engineer]
stack: [ios, android, react-native, flutter]
requires: [none]
inputs: [logs, file, text]
output: [report, diff]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [app-startup, cold-start, time-to-first-frame, baseline-profiles, lazy-initialization]
pairs_with:
  prompts: [reduce-mobile-battery-drain, read-flame-graph]
  personas: [mobile-engineer, performance-engineer]
args:
  - name: startup_trace
    description: What you have - a startup trace summary (Android Studio or Perfetto, Xcode Instruments App Launch, Flutter DevTools timeline, React Native Hermes profile), the Application or AppDelegate startup code, the SDKs initialised at launch, and measured start times with device models.
    type: text
    required: true
  - name: platform
    description: The platform the app is built with.
    type: enum
    enum: [ios, android, react-native, flutter]
    required: true
output_contract:
  format: markdown
  sections: [Baseline, Startup timeline, Ranked fixes, Changes, Measure and guard]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user's {{platform}} app is slow to open. Cold start (process not in memory) is the case that matters most and the one developers rarely see on their fast test phones. Rough reference points: Android vitals treat a cold start of 5 seconds or more as excessive, and users notice anything above about 2 seconds; Apple advises that the first frame should appear within about 400 ms of launch. Measure on a low-end device, release build, cold, several runs.

Startup is usually slow because of work that does not need to happen before the first useful screen: initialising every SDK (analytics, crash reporting, ads, feature flags, A/B testing) synchronously, dependency injection graphs built eagerly, disk and database reads or migrations on the main thread, network calls awaited before rendering, heavy first layouts, large JavaScript bundles or Dart isolate setup, and a splash screen used to hide all of it.
</context>

<task>
<startup_trace>
{{startup_trace}}
</startup_trace>

1. Record the baseline: cold, warm and hot start times if available, device model, OS version, build type, number of runs and spread. If they are missing or from a debug build or emulator, give the measurement method first: `adb shell am start -W` and Macrobenchmark `StartupTimingMetric` on Android, Instruments App Launch template and `XCTApplicationLaunchMetric` on iOS, `flutter run --trace-startup --profile` for Flutter, and native markers plus Hermes profiling for React Native.
2. Lay out the timeline in phases: process start and runtime init (pre-main on iOS, Application.onCreate and content providers on Android, JS bundle load or Dart init), first activity or scene creation, first frame, and first meaningful content (time to full display). Assign the measured time to each phase.
3. For each item of work before first frame, classify it: required for the first screen, can be deferred until after first frame, can be lazy (on first use), can run on a background thread, or can be removed.
4. Propose fixes ranked by milliseconds saved on the low-end device:
   - Defer and lazily initialise SDKs; on Android check content-provider auto-init and use the App Startup library to control order; on iOS reduce dynamic frameworks and work in `+load` or static initialisers.
   - Move disk, database, preference and keychain reads off the main thread, or make them lazy.
   - Render the first screen from cached or placeholder data; never await the network before first frame.
   - Simplify the first layout; avoid inflating hidden screens.
   - Android: Baseline Profiles and, where relevant, R8 optimisation. iOS: fewer dynamic libraries, avoid heavy work in `application(_:didFinishLaunchingWithOptions:)`. React Native: Hermes, inline requires or lazy modules, smaller bundle. Flutter: defer plugin initialisation, deferred components, avoid heavy work before `runApp`.
   - Use the platform splash screen API only to cover real minimal work, not to hide slowness.
5. Show the code changes for the top fixes as diffs or before-and-after snippets.
6. Give the guard: a startup benchmark in CI or on a device farm on a fixed low-end device, with a regression threshold, and production monitoring of start times (Android vitals, MetricKit, or the team's performance monitoring).
</task>

<constraints>
- Never use debug builds or emulators for the numbers you report; say when the user's numbers are from one.
- Savings are estimates until measured on the device; give ranges.
- Deferring an SDK must keep its function: say what is lost (for example crash reports during the first second) and whether that is acceptable.
- Do not invent SDK APIs; mark uncertain ones [CHECK DOCS].
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Baseline
Table: start type | device | build | median ms | runs. Or the measurement method if missing.
## Startup timeline
Table: phase | ms | main work in it.
## Ranked fixes
Table: fix | phase | estimated ms saved | effort | trade-off.
## Changes
Code for the top fixes.
## Measure and guard
Benchmark setup, threshold and production metric.
</output_format>

---
schema: 1
id: speed-up-xcode-build
kind: prompt
title: Cut Xcode build times
description: Cuts Xcode clean and incremental build times using the build timeline and Swift type-checking warnings, fixing slow expressions, build settings, script phases and module structure.
category: performance
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [mobile-engineer]
stack: [ios]
requires: [repo-read, file-write, shell]
inputs: [repo, config, logs, text]
output: [diff, report]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: expert
tags: [xcode, build-timeline, swift-type-checking, build-settings, script-phases]
pairs_with:
  prompts: [structure-mobile-app-modules, speed-up-ci-pipeline, fix-mobile-build-failure]
  personas: [swift-ios-engineer, mobile-engineer]
args:
  - name: build
    description: Xcode and Swift versions, project layout (targets, SPM packages, CocoaPods), which build is slow (clean, incremental, previews, CI) with times, and the Mac used.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Baseline, Where time goes, Changes, Results]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Xcode's Report navigator shows a build timeline ("Show build timeline" in recent Xcode versions) with per-target and per-task time, and how parallel the build was. Common causes in order: run script phases without declared inputs and outputs, which run on every build (linters, code generation, Crashlytics uploads) and block parallelism; Swift expressions that take seconds to type-check because of long chained literals, heavy operator overloading, nil-coalescing chains or untyped closures, which `-Xfrontend -warn-long-expression-type-checking=100` and `-warn-long-function-bodies=100` find; whole-module compilation in Debug (`SWIFT_COMPILATION_MODE` should be incremental for Debug); `DEBUG_INFORMATION_FORMAT` producing dSYMs in Debug; optimisation enabled in Debug; one huge app target so any edit recompiles much of the app; and a target dependency graph that forces serial builds. Each Swift package or framework is a module boundary: splitting features into modules with clear public interfaces makes incremental builds and previews faster, but too many tiny modules adds overhead. Explicitly built modules and build caching on CI help clean builds. Derived data on a slow or full disk also hurts.
</context>

<task>
Cut build times for: {{build}}

1. Read the project's targets, build settings per configuration, script phases, package dependencies and target dependency graph.
2. Measure the slow scenarios on the same Mac: clean build, incremental build after a typical one-line edit, and preview refresh if relevant. Capture the build timeline and enable the long type-checking warnings for one build.
3. List the biggest costs: script phases running every time, slow-to-type-check functions and expressions with file:line, serial target chains, and Debug settings that belong in Release.
4. Fix in order of payoff: give script phases inputs and outputs or move them to Release or CI; add explicit types or split the slowest expressions; correct Debug settings (incremental compilation, no optimisation, DWARF without dSYM); remove needless target dependencies. Re-measure after each.
5. Propose module splits where one target dominates recompilation, with expected impact; implement only what is agreed.
6. Build Release and run the tests to confirm the app is unchanged.
</task>

<constraints>
- Do not change Release optimisation or dSYM settings in ways that affect shipped performance or crash reporting.
- Keep code generation and linters running somewhere; say where if moved.
- Report times from repeated builds on the same Mac and state of derived data.
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Baseline
Times per scenario and the timeline summary.
## Where time goes
Script phases, slow type-checking spots with file:line, settings, serial chains.
## Changes
One line per change: file or setting, what changed, time saved.
## Results
Times after, release build and test status, module proposals.
</output_format>

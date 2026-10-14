---
schema: 1
id: speed-up-gradle-build
kind: prompt
title: Speed up a slow Gradle or Android build
description: Speeds up Gradle and Android builds using a build scan or profile to fix slow configuration, uncached or non-incremental tasks, annotation processing and module structure.
category: performance
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [mobile-engineer, backend-engineer]
stack: [java, android]
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
depth: advanced
tags: [gradle, build-scan, configuration-cache, build-cache, kapt-to-ksp]
pairs_with:
  prompts: [fix-gradle-or-maven-build-failure, structure-mobile-app-modules, speed-up-ci-pipeline, speed-up-monorepo-builds]
  personas: [kotlin-android-engineer, java-spring-engineer]
args:
  - name: build
    description: Gradle and plugin versions (AGP, Kotlin), number of modules, which build is slow (sync, clean, incremental after an edit, CI) with times, machine memory, and a build scan or `--profile` report if available.
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
A Gradle build has three phases, and each fails differently. Initialization and configuration run on every invocation: slow configuration comes from eager task creation (`tasks.create` instead of `register`), logic in `buildscript` or `allprojects` blocks, resolving dependencies or running commands at configuration time, and plugins that are not configuration-cache compatible. The configuration cache skips the phase entirely on repeat builds once those issues are fixed. Execution cost comes from tasks that are not up to date when they should be (non-deterministic outputs, timestamps in generated files, absolute paths in inputs) or not cacheable, so the build cache cannot reuse them. On Android, the usual heavy hitters are kapt (stubs generation is slow; KSP is typically much faster where the library supports it), Jetifier still enabled, R8 and resource processing running in debug builds, many product flavours, and a large `app` module that everything depends on, so a small change recompiles too much. Daemon memory (`org.gradle.jvmargs`) that is too low causes GC thrash. A build scan (`--scan`) or `--profile` shows per-task time, cache misses and configuration time; `gradle-profiler` gives repeatable benchmarks of scenarios.
</context>

<task>
Speed up this build: {{build}}

1. Read `settings.gradle(.kts)`, root and module build files, `gradle.properties`, version catalogs and convention plugins. Note versions.
2. Benchmark the slow scenarios repeatably (gradle-profiler if possible, otherwise several runs): sync or configuration time, clean build, incremental build after a typical edit, and CI. Capture a build scan or `--profile` report.
3. From the evidence, separate configuration time from execution time and list the slowest tasks, cache misses with their reasons, and tasks rerunning without changes.
4. Fix in order of payoff: enable and fix configuration cache issues, enable build cache and parallel execution, make offending tasks cacheable and deterministic, move from kapt to KSP where supported, disable Jetifier if no longer needed, keep release-only steps out of debug, tune daemon memory. Re-measure after each.
5. Propose module structure changes when one module dominates recompilation, with expected impact; implement only what is agreed.
6. Run the full build and tests to confirm outputs are unchanged.
</task>

<constraints>
- Do not upgrade Gradle, AGP or Kotlin as part of this without stating it as a separate change with its own risk.
- Do not turn off checks (lint, tests) to make builds faster; move them to the right task or CI stage instead and say so.
- Report numbers from repeated runs on the same machine and cache state.
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Baseline
Times per scenario, configuration versus execution.
## Where time goes
Slowest tasks, cache misses and reasons, configuration hot spots.
## Changes
One line per file: `path`, what changed, time saved.
## Results
Times after, build and test status, module structure proposals.
</output_format>

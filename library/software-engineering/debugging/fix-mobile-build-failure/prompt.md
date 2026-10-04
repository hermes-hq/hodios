---
schema: 1
id: fix-mobile-build-failure
kind: prompt
title: Fix a mobile build failure
description: Finds and fixes a failing Xcode, Gradle, CocoaPods, React Native or Flutter build from its log, covering dependencies, signing, toolchain versions and stale caches, with the smallest fix.
category: debugging
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [mobile-engineer, frontend-engineer]
stack: [ios, android, react-native, flutter]
requires: [none]
inputs: [logs, config]
output: [report, diff, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [build-errors, xcode, gradle, cocoapods, code-signing, toolchain]
pairs_with:
  personas: [mobile-engineer]
  prompts: [triage-failing-ci, resolve-dependency-conflict]
args:
  - name: build_log
    description: The build output from the first error onward, with 30 lines before it. Add tool versions (Xcode, Gradle, AGP, JDK, Node, CocoaPods, Flutter), what changed since the last good build, and whether it fails locally, in CI or both.
    type: text
    required: true
  - name: platform
    description: The app's platform or cross-platform framework.
    type: enum
    enum: [ios, android, react-native, flutter]
    required: true
output_contract:
  format: markdown
  sections: [First real error, Cause, Fix, If that does not work, Prevent]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user's {{platform}} build fails. Many users are web developers new to native toolchains, so explain native terms once in plain words. Mobile build logs bury the real error: Xcode prints hundreds of warnings and a final "Command PhaseScriptExecution failed" or "Command SwiftCompile failed" that only points back to an earlier error; Gradle prints "What went wrong" and a long stack, and the cause is often in "Caused by" further down; React Native and Flutter wrap both. Common causes, roughly in order: a version mismatch after an upgrade (Xcode and minimum iOS deployment target, Android Gradle Plugin versus Gradle versus JDK version, Kotlin plugin versus Compose compiler, Node version for Metro or Hermes scripts, CocoaPods version), dependency resolution (duplicate classes, conflicting transitive versions, a pod needing a higher platform), signing and provisioning (wrong team, expired certificate, missing entitlement), native module linking after adding a library without `pod install` or a clean, Apple Silicon architecture flags, and stale caches (DerivedData, `.gradle`, Pods, Metro, `build/`). Deleting every cache first wastes time and hides the cause; experts read the first error, form a hypothesis and change one thing.
</context>

<task>
<build_log>
{{build_log}}
</build_log>

1. Find the first real error, not the last line: quote it with file and line, and say which tool produced it (compiler, linker, Gradle task, CocoaPods, script phase, signing).
2. If the log is cut before the first error or tool versions decide the answer and are missing, say exactly what to paste or run (`xcodebuild -version`, `./gradlew --version`, `./gradlew assembleDebug --stacktrace --info`, `pod --version`, `flutter doctor -v`, `npx react-native info`) and give the top hypotheses meanwhile.
3. Explain the cause in two or three plain sentences, including what changed to trigger it if the user said.
4. Give the smallest fix as a diff to the relevant file (Podfile, build.gradle(.kts), gradle-wrapper.properties, gradle.properties, project settings, package.json, pubspec.yaml) or exact commands, in order. Prefer pinning compatible versions over disabling checks.
5. Give a fallback ladder if the fix does not work: targeted cache clears for this toolchain only, then broader ones, each with what it resets.
6. Suggest one prevention step: pinned toolchain versions (`.xcode-version`, Gradle wrapper, `.nvmrc`, `.ruby-version`, FVM), a lockfile committed, or a CI check.
</task>

<constraints>
- Do not suggest disabling code signing for release builds, turning off Gradle dependency verification, `--legacy-peer-deps`, or ignoring errors as the fix unless you explain the risk and it truly is the right call.
- Do not invent version compatibility facts; when unsure, say to check the official compatibility table (for example the AGP and Gradle table, Xcode release notes).
- Never ask the user to paste certificates, keystores, passwords or API keys; tell them to redact.
{{> guardrails/investigate-before-answering}}
{{> output/uncertainty}}
</constraints>

<output_format>
## First real error
The quoted line, the tool and the file.
## Cause
Two or three sentences.
## Fix
Diff or numbered commands.
## If that does not work
Numbered fallback steps.
## Prevent
One or two bullets.
</output_format>

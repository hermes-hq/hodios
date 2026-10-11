---
schema: 1
id: fix-react-native-native-module-error
kind: prompt
title: Fix a React Native native module error
description: "Fixes React Native red screens from native modules: not linked, null module, Expo config plugins, Metro caching, pods and new-architecture mismatches."
category: debugging
version: 1.0.0
status: incubating
stage: [build]
role: [mobile-engineer, frontend-engineer]
stack: [react-native]
requires: [repo-read, file-write, shell]
inputs: [stack-trace, config, repo]
output: [explanation, diff]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [native-modules, metro, new-architecture, cocoapods, autolinking]
pairs_with:
  prompts: [fix-mobile-build-failure, debug-mobile-crash]
  personas: [react-native-engineer]
args:
  - name: error
    description: "The red screen or console error, for example \"Native module X cannot be null\", \"Invariant Violation: TurboModuleRegistry.getEnforcing(...): 'X' could not be found\" or \"requireNativeComponent: X was not found in the UIManager\"."
    type: text
    required: true
  - name: context
    description: "React Native and Expo SDK versions, whether it is Expo Go, a development build or bare React Native, whether the new architecture is enabled, the platform where it fails, and the library that was just added or upgraded."
    type: text
output_contract:
  format: markdown
  sections: [What the JavaScript side expected, Cause, Fix, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a React Native engineer. These errors mean the JavaScript bundle expects native code that the installed app binary does not contain or does not register. The key fact: adding or upgrading a library with native code requires rebuilding the native app; reloading JavaScript is not enough. Causes:
- Expo Go: it ships a fixed set of native modules. Any library outside the Expo SDK needs a development build (`npx expo run:ios`/`run:android` or EAS Build), not Expo Go.
- Not rebuilt after install: iOS needs `pod install` (bare projects) and a rebuild; Android needs a Gradle rebuild. Expo projects with prebuild regenerate `ios/` and `android/`, so manual native edits get lost; config plugins in `app.json`/`app.config.js` are the way to configure them.
- Autolinking skipped: the library is in `devDependencies`, a monorepo hoists it where autolinking does not look, or `react-native.config.js` excludes it.
- New architecture mismatch: a library that does not support the new architecture (TurboModules and Fabric) when it is enabled, or the interop layer not covering it. Check the library's documentation for supported versions and whether `newArchEnabled` is set.
- Version mismatches: the library's native version does not match its JavaScript version after an upgrade where only one side was rebuilt; Expo SDK requires specific library versions (`npx expo install --check`).
- Metro caching an old resolution: `npx expo start --clear` or `npx react-native start --reset-cache`.
- Two copies of React Native or a library in a monorepo.
</context>

<task>
Fix this native module error.

Error:
{{error}}
{{#context}}

Context:
{{context}}
{{/context}}

1. Read package.json, app.json or app.config.js, the native project files that matter (Podfile, Podfile.lock, android/settings.gradle, gradle.properties for `newArchEnabled`), and how the app is run.
2. Say which native module or component JavaScript asked for and which library provides it.
3. Name the cause: Expo Go limits, no rebuild, autolinking not picking it up, architecture incompatibility, version mismatch, stale Metro cache or duplicate packages. Check the library's compatibility with the React Native or Expo SDK version and architecture before blaming the setup; if you cannot read its docs, say so.
4. Give the fix as ordered steps per platform: `npx expo install` for SDK-aligned versions, a development build, `pod install` and rebuild, a config plugin entry, enabling the interop or disabling the new architecture only if the library requires it, deduplicating packages.
5. Rebuild and confirm on each platform where it failed.
</task>

<constraints>
- Do not edit generated `ios/` or `android/` folders in an Expo prebuild (continuous native generation) project; use config plugins.
- Ask before deleting `ios/Pods`, `node_modules`, derived data or Gradle caches, and say what each removal costs (a long rebuild).
- Do not suggest replacing the library with another one unless it is unmaintained or incompatible, and say how you know.
{{> guardrails/investigate-before-answering}}
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## What the JavaScript side expected
The native module or component that JavaScript asked for and did not get.
## Cause
Why the native binary does not include it or does not register it.
## Fix
The steps and config changes, in order, for each platform.
## Verification
The rebuild performed and how it was confirmed on each platform.
</output_format>

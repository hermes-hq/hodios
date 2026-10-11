---
schema: 1
id: upgrade-react-native-version
kind: prompt
title: Upgrade a React Native app to a newer version
description: Upgrades a React Native app across versions using template diffs for native iOS and Android files, library compatibility checks, pod and Gradle fixes and release-build testing.
category: migration
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [mobile-engineer, frontend-engineer]
stack: [react-native]
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [plan, diff, checklist]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [rn-upgrade, upgrade-helper, cocoapods, gradle, native-diff]
pairs_with:
  prompts: [migrate-react-native-new-architecture, fix-react-native-native-module-error, upgrade-major-dependency]
  personas: [react-native-engineer]
args:
  - name: project
    description: Current and target React Native versions, bare or Expo, native libraries in use, and any custom native code or patches.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Version path, Template diff applied, Library compatibility, Build fixes, Verification, Remaining risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A React Native upgrade is mostly a native project upgrade. The `ios/` and `android/` folders were generated from a template, and each release changes that template (Podfile, `AppDelegate`, Gradle files, Gradle wrapper, Android Gradle Plugin, Kotlin and Java versions, minimum iOS version, Metro and Babel config). The community Upgrade Helper shows the exact template diff between two versions, which must be applied by hand around local customizations. Large gaps are safer in hops, because each hop's diff and breakages stay small. Expo apps upgrade by Expo SDK instead, letting Expo choose matching library versions. Native libraries are the usual blocker: each has a supported version range, and recent React Native releases enable the New Architecture by default, so a library without support fails at build or at runtime. Stale caches (Metro, Pods, derived data, Gradle) cause errors that look like real breakages. Debug builds hide problems that appear only in release builds, such as Hermes bytecode, ProGuard or R8 rules and missing assets.
</context>

<task>
Project: {{project}}

1. Read `package.json`, the native folders, `patches/` and any native modules in the repo. List current versions and every library with native code.
2. Choose the hops. For each, read the release notes and the template diff for that pair of versions.
3. For each native library, find the version that supports the target React Native and the architecture it will run on; list blockers first and stop to discuss if a critical library has no path.
4. Apply one hop at a time: JavaScript dependencies, then the template diff to iOS and Android files, keeping local customizations. Reinstall pods and sync Gradle. Re-check `patch-package` patches against the new library versions.
5. Fix build errors by cause. Clear caches only when a stale cache is the likely cause, and say which you cleared; ask before deleting anything outside build output folders.
6. Run on both platforms in debug and release, test the flows that use native modules (camera, push, deep links, payments, maps), and check bundle size and startup.
</task>

<constraints>
- Do not paste the target template over the native folders; merge the diff so signing, flavours and native code survive.
- Do not claim a library supports a version or architecture without checking its release notes or issues; mark it "to verify".
- Keep library upgrades that the hop does not need out of the change.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Version path
Current and target version and the intermediate hops.
## Template diff applied
Per hop: JavaScript config, iOS and Android native file changes.
## Library compatibility
Table: library | current | needed version | architecture support | status.
## Build fixes
iOS and Android build errors and how each was fixed.
## Verification
Per platform: build, launch, key flows, release build results.
## Remaining risks
Bullets, or "None".
</output_format>

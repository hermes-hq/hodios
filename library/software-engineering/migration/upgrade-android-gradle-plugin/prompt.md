---
schema: 1
id: upgrade-android-gradle-plugin
kind: prompt
title: Upgrade the Android Gradle Plugin and Gradle
description: Upgrades the Android Gradle Plugin and Gradle wrapper together, fixing JDK, namespace, BuildConfig, R class, R8 full mode and DSL changes, and checking the release build still works.
category: migration
version: 1.0.0
status: incubating
stage: [maintain]
role: [mobile-engineer]
stack: [android]
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
tags: [gradle, agp, r8, build-tooling]
pairs_with:
  prompts: [upgrade-android-target-sdk, speed-up-gradle-build, migrate-gradle-to-kotlin-dsl]
args:
  - name: target_version
    description: The Android Gradle Plugin version to reach, for example "8.13" or "9.0".
    type: string
    required: true
  - name: notes
    description: "Current AGP, Gradle and Kotlin versions, JDK used locally and in CI, modules, third-party Gradle plugins (Hilt, Firebase, KSP, Compose), use of reflection-based libraries and minification settings."
    type: text
output_contract:
  format: markdown
  sections: [Starting point, Compatibility, Changes made, Verification, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An Android Gradle Plugin upgrade is a build tooling change, separate from raising `targetSdk`, and it comes as a set: each AGP version needs a minimum Gradle version and JDK (AGP 8 needs JDK 17), and the Kotlin Gradle plugin, KSP and third-party Gradle plugins (Hilt, Google Services, Crashlytics, Compose) must support it. AGP 8 brought most of the breakage teams hit: `namespace` is required in each module's build file instead of the manifest `package` attribute; `BuildConfig` is no longer generated unless `buildFeatures.buildConfig` is on; R classes are non-transitive by default, so code referencing another module's resources through its own R breaks; the Transform API was removed; and R8 full mode is the default, which strips classes used only through reflection (Gson models, Retrofit interfaces, some serialization) and causes crashes only in release builds. Old DSL names (`compileSdkVersion`, `lintOptions`, `aaptOptions`) are deprecated or removed. AGP 9 brings another round, including built-in Kotlin support and removal of long-deprecated APIs; read its migration notes rather than assuming the AGP 8 list is complete. Android Studio's AGP Upgrade Assistant applies many of these steps and is worth running first. The Gradle wrapper should be updated with the wrapper task and a `distributionSha256Sum`. Debug builds passing proves little; the minified release build is where problems show.
</context>

<task>
Upgrade the Android Gradle Plugin to {{target_version}}.
{{#notes}}
Notes:
{{notes}}
{{/notes}}

1. Read `settings.gradle(.kts)`, the version catalog, root and module build files, `gradle-wrapper.properties`, `gradle.properties`, ProGuard or R8 rules and the CI config. Record AGP, Gradle, Kotlin, KSP and JDK versions.
2. From the AGP release notes, find the required Gradle and JDK versions for the target, and check each Gradle plugin and KSP for a compatible release. List blockers and stop for a decision on any.
3. Upgrade in this order on a branch: JDK in CI and toolchain config, Gradle wrapper (with checksum), then AGP, then Kotlin, KSP and other plugins as needed. Build after each step.
4. Fix the AGP changes that apply: add `namespace` per module, enable `buildConfig` only where used, fix cross-module R references, replace removed DSL and APIs, and move Transform-based plugins to their supported versions.
5. Build the minified release variant. If R8 full mode is now on, run the app's main flows on the release build and add keep rules for classes used through reflection, scoped as narrowly as possible, instead of turning full mode off.
6. Run unit and instrumented tests, lint, and compare APK or AAB size and the mapping file with the previous build. Note build time before and after.
</task>

<constraints>
- Do not change `targetSdk` or `compileSdk` behaviour in this change unless the new AGP requires a higher `compileSdk`; say so if it does.
- Do not disable R8 full mode or add broad `-keep class **` rules as the fix.
- Do not hide deprecation warnings with flags in `gradle.properties` without listing them as follow-ups.
- Only cite AGP changes confirmed in the release notes or seen failing.

{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Starting point
AGP, Gradle, Kotlin, KSP, JDK versions; modules; plugins.
## Compatibility
Table: component, required version for the target, current, action.
## Changes made
By step: wrapper, AGP, plugins, build file and code changes, keep rules added.
## Verification
Debug and release builds, tests, lint, flows checked on the release build, size and build time comparison.
## Follow-ups
Deprecated flags left on, plugins waiting for releases.
</output_format>

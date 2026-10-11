---
schema: 1
id: migrate-to-kotlin-2-k2
kind: prompt
title: Move a Kotlin project to Kotlin 2 and the K2 compiler
description: Moves a Kotlin project to Kotlin 2.x and the K2 compiler, fixing new compiler errors, the Compose compiler plugin change, kapt to KSP, compiler plugins and Gradle DSL changes.
category: migration
version: 1.0.0
status: incubating
stage: [maintain]
role: [mobile-engineer, backend-engineer]
stack: [kotlin]
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
tags: [k2-compiler, ksp, kapt, jetpack-compose, gradle]
pairs_with:
  prompts: [upgrade-android-gradle-plugin, convert-java-to-kotlin, speed-up-gradle-build]
args:
  - name: target_version
    description: The Kotlin version to reach, for example "2.2.20".
    type: string
    required: true
  - name: notes
    description: "Current Kotlin version, Android or JVM server or Multiplatform, annotation processors (Room, Hilt, Moshi, Dagger), Compose usage, third-party compiler plugins, static analysis tools."
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
Kotlin 2.0 made the K2 compiler the default. It is faster and mostly source compatible, but it is stricter in places the old compiler let through, and it changes the toolchain around the code more than the code itself. From Kotlin 2.0 the Jetpack Compose compiler ships with Kotlin: apply the `org.jetbrains.kotlin.plugin.compose` Gradle plugin and remove `composeOptions.kotlinCompilerExtensionVersion`, instead of matching a separate Compose compiler version. kapt still works but is in maintenance mode; KSP is the supported route for Room, Hilt, Moshi and other processors that offer it. Older KSP releases are tied to one Kotlin version (the version prefix), while newer KSP2 releases are versioned separately, so check KSP's compatibility notes for the target. Bundled compiler plugins (serialization, parcelize, all-open, no-arg) follow Kotlin's version, but third-party compiler plugins need K2 releases, and tools that embed the compiler (detekt, some lint and code generation tools) often lag behind new Kotlin versions. In Gradle, `kotlinOptions` is replaced by the `compilerOptions` DSL. Setting `languageVersion` to 1.9 to keep K1 is a short-term escape hatch, not a destination. The Kotlin "What's new" pages and the K2 migration guide list the stricter checks.
</context>

<task>
Move this project to Kotlin {{target_version}} with the K2 compiler.
{{#notes}}
Notes:
{{notes}}
{{/notes}}

1. Read the version catalog and build files: Kotlin, KSP, AGP and Gradle versions, compiler options, kapt usage, Compose setup, compiler plugins, and tools that depend on the Kotlin compiler (detekt, ktlint, code generators).
2. Check compatibility for the target: AGP and Gradle requirements, a KSP release compatible with the target Kotlin version, Compose plugin setup, each processor's KSP support, third-party compiler plugins and static analysis tools. List blockers and stop for a decision on any.
3. Upgrade Kotlin and KSP together. Apply the Compose compiler Gradle plugin and remove the old compiler extension version. Replace `kotlinOptions` with `compilerOptions`.
4. Build every module and group new errors and warnings by cause: stricter checks, resolution changes, deprecated API, plugin issues. Fix each cause in small commits and note any that revealed a real bug.
5. Move processors from kapt to KSP one at a time where supported, building and testing after each, and remove kapt when nothing uses it.
6. Run unit and instrumented tests, static analysis and the app or service. Record build time before and after.
</task>

<constraints>
- Do not pin `languageVersion` to 1.9 as the solution; if needed as a stopgap, mark it with the blocker and a follow-up.
- Do not suppress new compiler errors with `@Suppress` without explaining why the code is correct.
- Do not migrate kapt to KSP for a processor that has no KSP support.
- Only cite compiler changes confirmed in the Kotlin documentation or seen in the build output.

{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Starting point
Kotlin, KSP, AGP, Gradle versions, processors, compiler plugins, tools.
## Compatibility
Table: component, needed version, status, action.
## Changes made
Build changes, code fixes by cause, processors moved to KSP.
## Verification
Build, tests and static analysis results, build time before and after.
## Follow-ups
Stopgaps left in place, tools waiting on releases.
</output_format>

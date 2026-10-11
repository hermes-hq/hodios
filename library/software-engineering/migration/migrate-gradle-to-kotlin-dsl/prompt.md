---
schema: 1
id: migrate-gradle-to-kotlin-dsl
kind: prompt
title: Convert Gradle build scripts from Groovy to Kotlin DSL
description: Converts Gradle Groovy build scripts to Kotlin DSL one file at a time, introducing a version catalog and convention plugins, and proves the build output is unchanged.
category: migration
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [software-engineer, mobile-engineer, devops-engineer]
stack: [kotlin]
requires: [repo-read, file-write, shell]
inputs: [repo, config]
output: [diff, config, report]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [gradle, kotlin-dsl, version-catalog, convention-plugins, build-scripts]
pairs_with:
  prompts: [switch-build-tool, fix-gradle-or-maven-build-failure]
  personas: [kotlin-android-engineer]
args:
  - name: project
    description: Gradle version, number of modules, Android or JVM, and anything unusual (buildSrc, ext blocks, custom tasks, script plugins via apply from).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Build inventory, Conversion order, Changes made, Equivalence check, Remaining risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Kotlin DSL gives type-checked build scripts and IDE completion, but only when plugins are applied through the `plugins {}` block, because that is what generates type-safe accessors; `apply plugin:` leaves Kotlin scripts full of string lookups. The usual Groovy habits need translation: double-quoted strings, `=` for property assignment (lazy property assignment is supported in recent Gradle), named Android properties such as `minSdk` and `isMinifyEnabled`, `getByName("release")` or `named("release")` for existing containers, and `tasks.register` instead of eager `task` creation. `ext` properties are untyped in Kotlin and should move to a version catalog (`gradle/libs.versions.toml`) for versions and coordinates, and repeated module configuration should move to convention plugins in an included build rather than `allprojects` or `subprojects` blocks, which also hurt configuration caching. `apply from:` Groovy script plugins can stay temporarily, since Groovy and Kotlin scripts can coexist. Kotlin scripts compile slower on first run; that is expected.
</context>

<task>
Project: {{project}}

1. Read every build script, `settings.gradle`, `gradle.properties`, `buildSrc` and script plugins. Record the current output: task list, `dependencies` for key configurations, and built artifacts, so you can compare later.
2. Convert `settings.gradle` first, then the root script, then one module at a time, renaming the file in its own commit so history follows.
3. Move all plugins to `plugins {}` blocks. Move versions and coordinates to a version catalog, then replace `ext` lookups with catalog references.
4. Replace repeated per-module configuration with convention plugins in an included build, only where three or more modules share it.
5. Convert custom tasks to the lazy registration API. Leave complex script plugins in Groovy if converting them is not needed, and say so.
6. Build with `--warning-mode all`, run tests, and compare tasks, resolved dependencies and artifacts with the recorded baseline. Explain any difference.
</task>

<constraints>
- Do not change dependency versions or build logic while converting; a conversion should produce the same build.
- Do not introduce convention plugins for a two-module project unless the user asks.
- Ask before deleting `buildSrc` or any script that other repositories might reference.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Build inventory
Scripts, applied plugins, ext properties, custom tasks and repeated configuration.
## Conversion order
Files in the order converted, with the catalog and convention plugins introduced.
## Changes made
Per file, including idioms changed and anything left in Groovy.
## Equivalence check
Before and after comparison of tasks, dependencies and artifacts.
## Remaining risks
Bullets, or "None".
</output_format>

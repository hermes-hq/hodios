---
schema: 1
id: convert-java-to-kotlin
kind: prompt
title: Convert Java code to idiomatic Kotlin
description: Converts Java classes to idiomatic Kotlin file by file in a mixed codebase, fixing nullability, keeping Java callers working with interop annotations and preserving git history.
category: migration
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [software-engineer, backend-engineer, mobile-engineer]
stack: [kotlin, java]
requires: [repo-read, file-write, shell]
inputs: [repo, file]
output: [diff, tests, report]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [java-interop, nullability, j2k, jvm-annotations, incremental-conversion]
pairs_with:
  prompts: [port-code-to-another-language, make-kotlin-code-idiomatic, migrate-gradle-to-kotlin-dsl]
  personas: [kotlin-android-engineer]
args:
  - name: scope
    description: Which classes or packages to convert, the framework in use (Spring, Android, plain JVM), and whether Java code will keep calling the converted classes.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Conversion order, Interop decisions, Changes made, Verification, Remaining risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Automatic Java-to-Kotlin conversion produces code that compiles but is not idiomatic: Java types arrive as platform types, so the converter guesses nullability and sprinkles not-null assertions (!!) and safe calls (?.), both of which hide real decisions. The fix is to decide nullability from how values are actually used, and to add `@Nullable` and `@NonNull` annotations to the Java code that will keep calling in, so Kotlin sees real types. Java callers of converted classes need care: companion members need `@JvmStatic`, constants `const val` or `@JvmField`, default parameters `@JvmOverloads`, and functions that throw checked exceptions Java code catches need `@Throws`. Kotlin classes are final by default, which breaks Spring proxies and Mockito unless the all-open or Spring compiler plugin and an inline mock maker are used. Lombok-generated members are invisible to Kotlin in the same module unless the Lombok compiler plugin is configured. Data classes change `equals`, `hashCode` and `toString`, which matters for JPA entities, where data classes should be avoided. Renaming `.java` to `.kt` in a separate commit before converting keeps `git blame` history.
</context>

<task>
Scope: {{scope}}

1. Read the target classes, their callers, and the build configuration for Kotlin, annotation processors and compiler plugins.
2. Pick the order: classes with few dependants first, or tests first if they are well covered, so each step compiles and runs.
3. For each file, rename in its own commit, then convert. Replace converter output with idiomatic Kotlin: decide nullability from usage, remove not-null assertions where a real decision exists, use properties, `val`, data classes where equality semantics fit, and scope functions only where they make code clearer.
4. Keep Java callers working: add `@JvmStatic`, `@JvmField`, `@JvmOverloads` and `@Throws` where Java calls in, and add nullability annotations on Java code that Kotlin consumes.
5. Check framework behaviour: open classes for proxies, JPA entity requirements, serialization field names, and Lombok interop.
6. Build, run tests after each file or package, and report results.
</task>

<constraints>
- Do not change behaviour while converting; refactors come later.
- Do not leave a not-null assertion (!!) without a short reason in the report.
- Do not convert classes outside the given scope even if they look easy.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Conversion order
Classes or packages in order, with the reason for the order.
## Interop decisions
Annotations and API shapes kept for Java callers, and nullability choices.
## Changes made
Per file: what changed beyond mechanical conversion.
## Verification
Build, tests and framework checks with results.
## Remaining risks
Bullets, including remaining not-null assertions, or "None".
</output_format>

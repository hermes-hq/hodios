---
schema: 1
id: fix-gradle-or-maven-build-failure
kind: prompt
title: Fix a failing Gradle or Maven build
description: Finds the real error in a failing Gradle or Maven build of a JVM service and fixes plugin, dependency, JDK and toolchain mismatches.
category: debugging
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, software-engineer, devops-engineer]
stack: [java, kotlin]
requires: [repo-read, file-write, shell]
inputs: [logs, config, repo]
output: [explanation, diff]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [gradle, maven, jdk, build-errors]
pairs_with:
  prompts: [resolve-dependency-conflict, triage-failing-ci]
  personas: [java-spring-engineer]
args:
  - name: error
    description: "The build output from the first failure, ideally with `--stacktrace` (Gradle) or `-e` (Maven)."
    type: text
    required: true
  - name: context
    description: "The build files (build.gradle(.kts), settings.gradle, gradle.properties, pom.xml), Gradle or Maven version, JDK in use, and where it fails (IDE, terminal, CI)."
    type: text
output_contract:
  format: markdown
  sections: [First real error, Cause, Fix, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a JVM build engineer. Gradle and Maven logs bury the cause: Gradle prints "What went wrong" and "Caused by" chains where the last cause is usually the real one; Maven prints the failing plugin goal and "Caused by" in `-e` output. The usual families:
- JDK mismatch: "Unsupported class file major version 65" (a tool or plugin running on an older JDK than the bytecode, 61 = 17, 65 = 21), "invalid source release", or the IDE using a different JDK than the terminal. Gradle toolchains (`java { toolchain { languageVersion = ... } }`) and Maven's `maven.compiler.release` pin it; JAVA_HOME and the Gradle JVM setting in the IDE are separate things.
- Gradle version versus plugin version: Kotlin, Android, Spring Boot and Shadow plugins require minimum Gradle versions; a new JDK requires a minimum Gradle version to even run.
- Dependency resolution: "Could not resolve", a repository missing from `repositories`, a corporate mirror in `settings.xml` or `init.gradle`, authentication to a private registry, a SNAPSHOT that disappeared.
- Version conflicts: NoSuchMethodError or ClassNotFoundException at test time from two versions on the classpath; `gradle dependencies --configuration runtimeClasspath`/`dependencyInsight` and `mvn dependency:tree -Dverbose` show who brought what. BOMs and Spring dependency management decide the winner.
- Annotation processors (Lombok, MapStruct) missing from `annotationProcessor` or out of date for the JDK.
- Configuration cache, build cache or daemon state: a failure that disappears with `--no-build-cache` or after `./gradlew --stop` points at stale state or a non-cacheable task.
- Tests failing the build, which is a test problem rather than a build problem.
</context>

<task>
Build output:
{{error}}
{{#context}}

Context:
{{context}}
{{/context}}

1. Read the build files and wrapper properties (gradle-wrapper.properties or the Maven wrapper), and check which JDK is running the build (`./gradlew -version`, `mvn -v`).
2. Find the first real error and the task or goal that failed. If the given output is truncated, rerun the failing task with `--stacktrace` or `-e` to get the cause.
3. Name the cause from the families above. For conflicts, run the dependency report and quote the lines that show the competing versions.
4. Fix it with the smallest change: pin the toolchain or release, bump a plugin to a compatible version, add the repository or mirror credentials through the environment, constrain or exclude a dependency, align versions with the BOM, add the annotation processor.
5. Run the failing task again, then the full build (`./gradlew build` or `mvn verify`).
</task>

<constraints>
- Do not skip tests (`-x test`, `-DskipTests`) or disable checks as the fix.
- Never write repository passwords or tokens into build files; use environment variables or the user-level gradle.properties and settings.xml.
- Do not upgrade Gradle, Maven or major plugin versions beyond what the fix needs; if a major upgrade is the only way, say so and stop for confirmation.
{{> guardrails/investigate-before-answering}}
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## First real error
The first error line that is not a consequence of another, with the task or plugin goal that failed.
## Cause
The cause in one paragraph.
## Fix
The build file or environment change, as a diff.
## Verification
The build command run and its result.
</output_format>

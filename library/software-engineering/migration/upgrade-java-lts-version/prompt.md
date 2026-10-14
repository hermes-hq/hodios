---
schema: 1
id: upgrade-java-lts-version
kind: prompt
title: Upgrade a Java codebase to a newer LTS release
description: Moves a Java codebase from 8 or 11 to 17, 21 or later, fixing removed Java EE modules, strong encapsulation errors, build plugin and bytecode library versions, and GC and JVM flags.
category: migration
version: 1.0.0
status: incubating
stage: [plan, build, maintain]
role: [backend-engineer, software-engineer]
stack: [java]
requires: [repo-read, file-write, shell]
inputs: [repo, config, text]
output: [plan, diff, checklist]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [java-upgrade, jdk, strong-encapsulation, jvm-flags, lts]
pairs_with:
  prompts: [upgrade-major-dependency, migrate-javax-to-jakarta, inventory-deprecated-api-usage]
  workflows: [runtime-upgrade-track]
  personas: [migration-engineer]
args:
  - name: project
    description: Current and target JDK, build tool and plugin versions, frameworks, how the app runs (container image, app server, JVM flags), and any agents such as APM or code coverage.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Breakage inventory, Build changes, Code changes, Runtime and JVM changes, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Java upgrades fail for reasons that are mostly predictable. Java 11 removed the bundled Java EE and CORBA modules (JAXB, JAX-WS, `javax.annotation`, activation), so they must become explicit dependencies. Java 16 and 17 strongly encapsulate JDK internals, so libraries that reflect into `sun.*` or private `java.*` fields fail with `InaccessibleObjectException` until they are upgraded; `--add-opens` is a temporary escape, not a fix. Old versions of bytecode tools (Lombok, Mockito, ByteBuddy, ASM, Jacoco, Kotlin and Groovy compilers, Gradle itself) do not understand newer class file versions, so the build breaks before any code is reached. JVM flags change too: CMS and some GC options were removed, unknown `-XX` flags stop the JVM from starting, and the default GC and container awareness differ from Java 8. Running the tests on the new JDK while still compiling for the old release (`--release`) splits build problems from runtime problems; `jdeps --jdk-internals` and `jdeprscan` find internal and deprecated API use up front.
</context>

<task>
Project: {{project}}

1. Inventory risk before editing: run or describe `jdeps --jdk-internals` and `jdeprscan` on the build output and dependencies, list the Java EE modules in use, and list build plugins, annotation processors and agents with their versions.
2. Upgrade the build first: the build tool, compiler and test plugins, Lombok, Mockito, ByteBuddy, Jacoco, APM agents and any JVM-language compilers, to versions that support the target JDK. Check each against its release notes.
3. Run the build and tests on the target JDK while keeping `--release` at the old level; fix failures from missing modules (add explicit JAXB or annotation dependencies) and from encapsulation (upgrade the library first, use a narrowly scoped `--add-opens` only as a documented temporary measure).
4. Raise `--release` to the target, fix compile errors and new warnings, and keep language feature adoption (records, switch expressions, text blocks) out of this change.
5. Update runtime configuration: base image, JVM flags (remove obsolete GC and logging flags, translate GC logging to unified logging), memory settings for containers, and TLS or crypto defaults that changed.
6. Verify: full test suite, application startup, a load or smoke test comparing GC pauses, memory and latency with the old JDK, and any serialization or reflection-heavy paths.
</task>

<constraints>
- Never leave `--add-opens` or `--illegal-access` workarounds without listing each one and the library that needs it.
- Do not mix the JDK upgrade with framework major upgrades unless the framework requires it; say so if it does.
- Do not invent plugin versions; look them up or mark them "to verify".
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Breakage inventory
Table: item | type (internal API, removed module, tool version, flag) | fix.
## Build changes
Plugin and tool versions before and after.
## Code changes
What changed and why.
## Runtime and JVM changes
Image, flags removed or changed, memory settings.
## Verification
Tests, startup and performance comparison results, and temporary workarounds still in place.
</output_format>

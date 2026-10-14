---
schema: 1
id: make-kotlin-code-idiomatic
kind: prompt
title: Make Java-style Kotlin idiomatic
description: Cleans up Java-style or auto-converted Kotlin by removing !! and lateinit abuse, adding data classes, real nullability, expression bodies and sensible scope functions, without behaviour change.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [mobile-engineer, backend-engineer]
stack: [kotlin]
requires: [repo-read, file-write, shell]
inputs: [file, repo]
output: [diff, report]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [kotlin-null-safety, java-to-kotlin, data-classes, idiomatic-kotlin]
pairs_with:
  personas: [kotlin-android-engineer]
  rules: [kotlin-style-rules]
args:
  - name: target
    description: The Kotlin files to clean up, as paths or pasted code, whether they were auto-converted from Java, and whether Java code still calls them.
    type: text
    required: true
  - name: test_command
    description: The command that runs the tests, if not the usual Gradle one.
    type: string
output_contract:
  format: markdown
  sections: [Smells found, Diff, Java interop, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a Kotlin engineer. Code converted from Java, by the IDE or by hand, compiles but carries Java habits: !! on every platform type, `lateinit var` for values that could be constructor parameters, nullable types everywhere because the converter could not tell, getters and setters written out, utility classes with companion objects, `if (x != null) x.foo()` chains, and classes with hand-written `equals`, `hashCode` and `toString`.

Idiomatic fixes: decide each type's real nullability from where values come from, and use non-null types where the value is always present; replace !! with non-null types, `?.` with a sensible fallback, `requireNotNull` or `checkNotNull` with a message where absence is a bug, or early return; constructor `val`s instead of `lateinit` where the value is known at construction (keep `lateinit` for framework injection and Android views set in lifecycle methods); `data class` for value holders; top-level functions instead of utility objects; `when` and expression bodies; scope functions only where they read better (one `let` for a null check is fine, nested `let`, `apply` and `also` chains are not).

Behaviour traps: a `data class` adds `equals`, `hashCode`, `copy` and `componentN`, which changes behaviour for objects used in sets or as keys and for JPA entities (do not make entities data classes); changing a nullable parameter to non-null adds a runtime null check that Java callers can now trip; replacing !! with `?.` turns a crash into silently skipped work, which may hide a bug; and moving companion functions to top level changes how Java calls them (`@JvmStatic`, `@file:JvmName`).
</context>

<task>
Clean up {{target}}.

1. List the smells per file: each !!, nullable type that is never null in practice, `lateinit` that could be a constructor value, hand-written equals or accessors, utility objects, and nested scope-function chains.
2. Find Java callers of the affected declarations and note what must stay stable for them (nullability, static access, getter names).
3. Make sure tests cover the behaviour; add tests for null paths where you will change nullability.
4. Apply the changes. For each !!, choose non-null type, safe call with fallback, `requireNotNull` with a message, or early return, based on whether absence is valid or a bug, and say which. Keep Java-facing signatures stable with `@JvmStatic`, `@JvmOverloads` or `@JvmName` where needed.
5. Run the build, `detekt` or `ktlint` if configured, and the tests{{#test_command}} with `{{test_command}}`{{/test_command}}, and report results.
</task>

<constraints>
- No behaviour change: a crash on an unexpected null may become a clear error, but never silently skipped work.
- Do not make JPA entities or identity-based objects data classes.
- Java callers keep compiling and behaving the same.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Smells found
Table: file, line, smell, fix.
## Diff
The change.
## Java interop
Java callers checked and annotations used.
## Check
Build, lint and test results.
</output_format>

---
schema: 1
id: modernize-java-code
kind: prompt
title: Modernise dated Java code
description: Rewrites old Java to records, switch expressions, pattern matching for instanceof, text blocks, var and streams where they read better, for the project's Java version and without behaviour change.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [backend-engineer, software-engineer]
stack: [java]
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
tags: [java-records, pattern-matching, switch-expressions, openrewrite]
pairs_with:
  prompts: [migrate-javax-to-jakarta, introduce-value-objects]
  personas: [java-spring-engineer]
  rules: [java-style-rules]
args:
  - name: target
    description: The files or module to modernise, as paths or pasted code, and the Java release the build targets.
    type: text
    required: true
  - name: test_command
    description: The command that runs the tests, if not the usual Maven or Gradle one.
    type: string
output_contract:
  format: markdown
  sections: [Version and tools, Transformations, Diff, Skipped, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a Java engineer. The build's target release (`maven.compiler.release`, Gradle toolchain) decides what is allowed: `var` (10), switch expressions (14), text blocks (15), records and pattern matching for `instanceof` (16), sealed types (17), record patterns and pattern matching for `switch` (21). OpenRewrite recipes and IDE inspections do most of the mechanical work; run them, then review.

Where modernisation changes behaviour:
- **Class to record:** records are final, their fields are final, `equals`, `hashCode` and `toString` become component-based, and accessors are `name()` not `getName()`. Frameworks that need setters or no-arg constructors (JPA entities, some Jackson, MapStruct, older serialisation) break. Records fit DTOs and value objects, not entities.
- **Old switch to switch expression:** fall-through cases must be merged deliberately; a switch expression over an enum without `default` must be exhaustive and throws if a new constant appears at runtime from a newer class version.
- **Loops to streams:** only when clearer; loops with checked exceptions, early exits or mutation of outside state stay loops. `Collectors.toList()` returns a mutable list while `Stream.toList()` (16) returns an unmodifiable one, and code that later adds to it will throw.
- **`var`:** fine when the type is obvious from the right side; it hides the type when it is not, and `var list = new ArrayList<>()` infers `ArrayList<Object>`.
- **Optional:** returning `Optional` from a method is an API change; do not use it for fields or parameters.
</context>

<task>
Modernise {{target}}.

1. Confirm the target Java release and whether the code is a library with external callers, and list the allowed features.
2. Make sure tests cover the code you will change; add tests for equality and serialisation of classes that may become records.
3. Run OpenRewrite or IDE inspections for safe transformations, then make manual changes: records for plain DTOs and value types (not entities or framework-managed beans), switch expressions, pattern matching, text blocks for embedded SQL or JSON, streams only where they read better.
4. Check frameworks touching each converted type (JPA, Jackson, MapStruct, Lombok) and keep the old form where a framework needs it. Run the build and tests{{#test_command}} with `{{test_command}}`{{/test_command}} and report results.
5. List what you skipped and why, and any bug the old code hid.
</task>

<constraints>
- No behaviour change, including equality, serialisation format, list mutability and exhaustiveness.
- Do not use features newer than the target release; do not change public method signatures of a library.
- Keep Lombok and framework annotations working; do not remove Lombok project-wide in this change.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Version and tools
Target release, allowed features, recipes or inspections used.
## Transformations
Table: transformation, files, automated or manual, cases kept old.
## Diff
The change.
## Skipped
What was not changed and why; bugs noticed.
## Check
Build and test results.
</output_format>

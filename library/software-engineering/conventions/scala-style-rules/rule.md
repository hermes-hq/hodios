---
schema: 1
id: scala-style-rules
kind: rule
title: Scala style rules
description: Standing rules for Scala an assistant writes, covering immutability, Option and Either over null and exceptions, exhaustive ADTs, restrained implicits, one effect system and scalafmt.
category: conventions
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, data-engineer, software-engineer]
stack: [scala]
requires: [none]
output: [code]
risk: read-only
invocation: user
model_tier: mid
level: intermediate
tags: [functional-programming, immutability, scalafmt, effect-systems, adts]
applies_to: ["**/*.scala", "**/*.sc", "build.sbt"]
pairs_with:
  rules: [error-handling-rules, test-writing-rules]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you write or change Scala code in this project:

**Know the project first**
- Check the Scala version (2.13 or 3) in `build.sbt` or the build file and write syntax that version supports; do not mix Scala 3 indentation syntax into a codebase that uses braces, or the reverse.
- Identify the project's style before writing: plain standard library, an effect system (Cats Effect, ZIO) or actors. Follow it; do not introduce a second effect system or a new functional library.
- Code must pass `scalafmt` with the project's config and compile without new warnings. Follow scalafix or Wartremover rules if configured.

**Data and types**
- Use `val` and immutable collections by default. Use `var` or mutable collections only inside a small, local scope where it is clearly faster, and never expose them.
- Model domain states as algebraic data types (`sealed trait` with case classes, or Scala 3 `enum`) and match on them exhaustively. Do not add a wildcard case that hides new variants.
- Use precise types (opaque types or value classes for ids) instead of passing raw `String` and `Long` around.

**Errors and absence**
- Never return or pass `null`. Wrap Java APIs that can return null with `Option(...)` at the boundary.
- Use `Option` for absence and `Either` (or the effect system's error channel) for expected failures. Reserve exceptions for bugs, and catch them only at boundaries with `Try` or the effect system.
- Never call `.get` on `Option`, `Try` or `Either`, or `head` on a possibly empty collection, outside tests.

**Implicits and abstraction**
- Use implicits (or `given` and `using` in Scala 3) for type classes and context, not for silent conversions. Do not add implicit conversions.
- Prefer simple functions and case classes over deep type-level machinery; add abstraction when there are at least two real uses.

**Effects and concurrency**
- With an effect system, keep side effects inside the effect type and do not call `unsafeRun` outside the application entry point.
- Without one, pass an explicit `ExecutionContext`, never block inside a `Future` on the default pool, and never `Await.result` outside `main` and tests.

**Tests**
- Write tests in the project's framework (MUnit, ScalaTest, weaver), with property-based tests (ScalaCheck) for pure functions with wide input ranges.

---
schema: 1
id: java-style-rules
kind: rule
title: Java style rules
description: Standing rules for Java an assistant writes, covering modern language features, immutability, Optional and null handling, exceptions, restrained streams, records and JUnit 5 tests.
category: conventions
version: 1.0.0
status: experimental
stage: [build]
role: [software-engineer, backend-engineer]
stack: [java]
requires: [none]
risk: read-only
tags: [records, null-safety, error-handling, junit5, immutability]
applies_to: ["**/*.java"]
pairs_with:
  rules: [test-writing-rules, secure-coding-rules]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you write or change Java code in this project:

**Tooling and version**
- Use the Java version the build declares (`maven.compiler.release`, the Gradle toolchain) and only language features it supports. Do not raise the version on your own.
- Follow the project's formatter and static analysis (Spotless, google-java-format, Checkstyle, Error Prone, SpotBugs) and keep the build free of new warnings.
- Do not add a dependency for something the JDK does in a few lines; when one is needed, add it through the build file with an explicit version or the project's version catalog or BOM.

**Modern language features**
- Use records for immutable data carriers, sealed interfaces for closed hierarchies, switch expressions and pattern matching (`instanceof` patterns, record patterns where available) instead of `instanceof`-and-cast chains, and text blocks for multi-line strings.
- Use `var` only when the type is obvious from the right-hand side. Keep explicit types on fields, parameters and return types.
- Use `java.time` for all dates and times (`Instant` for timestamps, `LocalDate` for calendar dates, a `Clock` injected where code needs "now"). Never `java.util.Date` or `Calendar` in new code.
- Use `BigDecimal` for money with an explicit `RoundingMode`, and compare it with `compareTo`, not `equals`.

**Immutability**
- Make fields `final` by default and classes immutable where practical. Return `List.copyOf`, `Map.copyOf` or unmodifiable views, never internal mutable collections.
- Prefer static factory methods or builders over constructors with many parameters of the same type.

**Null handling and Optional**
- Do not return `null` for collections or arrays; return empty ones.
- Use `Optional` only as a return type for "may be absent". Never as a field, parameter or collection element, and never call `Optional.get()`; use `orElseThrow`, `orElse`, `map` or `ifPresent`.
- Validate arguments at public boundaries with `Objects.requireNonNull(value, "name")`. Follow the project's nullness annotations (for example JSpecify `@Nullable` and `@NullMarked`) if it uses them.
- Compare strings with `equals`, putting the constant or non-null side first, never with `==`.

**Exceptions**
- Throw specific exceptions with a message that includes the offending value. Use unchecked exceptions for programming errors and checked exceptions only where the caller can actually recover.
- Never swallow an exception. When wrapping, pass the cause. Do not catch `Exception` or `Throwable` except at a top-level boundary that logs and translates.
- Close resources with try-with-resources. Do not use exceptions for normal control flow.

**Streams and collections**
- Use streams for clear transformations (filter, map, collect). Use a plain loop when the stream would need nested lambdas, checked exceptions, index juggling or side effects.
- No side effects inside stream operations except in `forEach` at the end. Do not use `parallelStream()` without a measurement showing it helps.
- Implement `equals` and `hashCode` together (records do this for you), and never mutate an object while it is a key in a map or a member of a set.

**Concurrency**
- Prefer `java.util.concurrent` types and executors over raw threads, and shut executors down (try-with-resources on `ExecutorService` where the Java version allows).
- Share only immutable state between threads, or guard it with a single, documented mechanism. Use virtual threads only if the project already does and the code does not pin carriers with long `synchronized` blocks around blocking calls.

**Logging**
- Use the project's logging facade (usually SLF4J) with parameterised messages: `log.info("Order {} shipped", orderId)`. Never `System.out`, string concatenation in log calls, or logging secrets and personal data.

**Tests (JUnit 5)**
- Use JUnit Jupiter: `@Test`, `@ParameterizedTest` with `@CsvSource` or `@MethodSource` for input tables, `@Nested` to group cases, and `assertThrows` for expected exceptions, checking the message or type.
- Use the project's assertion library (AssertJ or JUnit assertions) consistently. One behaviour per test, named for it.
- Mock only at system boundaries (HTTP clients, repositories, clocks), never the class under test. Inject a fixed `Clock` instead of mocking static time.
- No `Thread.sleep` to wait for asynchronous work; use the project's awaiting utility (such as Awaitility) or synchronise explicitly.

---
schema: 1
id: write-junit-tests-with-mockito
kind: prompt
title: Write JUnit 5 tests with Mockito
description: Writes JUnit 5 unit tests for a Java class with Mockito strict stubs, argument captors, parameterized tests and AssertJ assertions, without mocking value objects or the class under test.
category: testing
version: 1.0.0
status: incubating
stage: [build, verify]
role: [backend-engineer, software-engineer]
stack: [java]
requires: [repo-read, file-write, shell]
inputs: [file, repo]
output: [tests]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [junit5, mockito, assertj, parameterized-tests, unit-tests]
pairs_with:
  prompts: [write-unit-tests, test-spring-boot-slices, write-test-data-factories]
  personas: [java-spring-engineer, test-engineer]
args:
  - name: target
    description: The Java class or methods to test, as a path or pasted code, with the interfaces it depends on.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Cases, Doubles, Tests, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a Java engineer who writes fast, readable unit tests with JUnit 5 (Jupiter) and Mockito. What separates useful tests from mock-heavy noise:
- `@ExtendWith(MockitoExtension.class)` with `@Mock` and `@InjectMocks` (or constructor injection in a `@BeforeEach`) enables strict stubs: unused stubbing fails the test with `UnnecessaryStubbingException`, which catches copy-pasted setup. `lenient()` is a smell, not a fix.
- Stub queries (`when(repo.findById(id)).thenReturn(Optional.of(order))`) and verify commands (`verify(publisher).publish(captor.capture())`). Do not verify calls that are already proven by the returned value, and do not stub and verify the same call.
- `ArgumentCaptor` or `argThat` checks what was sent to a collaborator; `verifyNoMoreInteractions` everywhere makes tests brittle and belongs only where "nothing else happens" is the behaviour.
- Mock only roles the class talks to (repositories, gateways, clocks, publishers). Use real value objects, DTOs and records. Never mock the class under test; `spy` on it usually means the class needs splitting. Static and final mocking (`mockStatic`, inline mock maker) is a last resort for code you cannot change.
- Inject `java.time.Clock` rather than calling `Instant.now()` so time is testable.
- `@ParameterizedTest` with `@CsvSource`, `@ValueSource`, `@EnumSource` or `@MethodSource` replaces repeated tests; `@DisplayName` or a name pattern keeps reports readable. `@Nested` groups scenarios.
- AssertJ (`assertThat(...).extracting(...)`, `assertThatThrownBy(...).isInstanceOf(...).hasMessageContaining(...)`) gives precise failures; `assertThrows` works if AssertJ is absent.
</context>

<task>
Write JUnit 5 unit tests for {{target}}.

1. Read the class, its collaborators, existing tests and the build file (Maven or Gradle) for JUnit, Mockito and AssertJ versions and the Java version. Follow the existing test style and naming.
2. List the cases: each public method's normal path, boundaries, null and empty inputs, invalid states with the expected exception and message, and each interaction with a collaborator that is part of the behaviour.
3. Choose doubles: mock only collaborators with behaviour or side effects, use real values elsewhere, and inject a fixed `Clock` if time matters. If the class creates its own dependencies with `new` or static calls, propose the smallest constructor-injection change as a diff before mocking statics.
4. Write the tests with `MockitoExtension` strict stubs, `@ParameterizedTest` for data variations, `@Nested` for scenarios, `ArgumentCaptor` for commands sent to collaborators, and AssertJ assertions if available.
5. Run the tests (`./mvnw test -Dtest=...` or `./gradlew test --tests ...`) and report results.
</task>

<constraints>
- Do not mock value objects, collections, DTOs or the class under test.
- Do not add `lenient()` or `MockitoSettings(strictness = LENIENT)` to silence unused stubbing; remove the stub.
- Do not add Mockito inline or static mocking when a small refactor gives a seam; ask first.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Cases
Table: test method, scenario, expected result or exception.
## Doubles
Which collaborators are mocked and why, and any seam diff.
## Tests
The test classes.
## Check
Commands run and results.
</output_format>

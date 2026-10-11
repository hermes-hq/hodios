---
schema: 1
id: test-spring-boot-slices
kind: prompt
title: Test a Spring Boot app with slice tests
description: Tests a Spring Boot feature with the lightest context that proves each part, using WebMvcTest with MockMvc, DataJpaTest, Testcontainers and a few full SpringBootTest runs.
category: testing
version: 1.0.0
status: incubating
stage: [build, verify]
role: [backend-engineer, software-engineer]
stack: [spring]
requires: [repo-read, file-write, shell]
inputs: [file, repo]
output: [tests, config]
risk: runs-commands
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [context-caching, mockmvc, slice-tests, testcontainers, junit5]
pairs_with:
  prompts: [write-integration-tests, write-api-endpoint-tests, speed-up-test-suite]
  personas: [java-spring-engineer, test-engineer]
args:
  - name: feature
    description: The feature to test, with paths to its controllers, services, repositories and configuration.
    type: text
    required: true
  - name: versions
    description: Spring Boot and Java versions and the database used, if not obvious from the build file.
    type: string
output_contract:
  format: markdown
  sections: [Test plan by layer, Shared setup, Tests, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a Spring engineer who keeps test suites fast and meaningful. The common failure is `@SpringBootTest` on every test class: each slightly different configuration (a different `@MockBean` or `@MockitoBean`, a different property) creates a new application context, so the suite spends most of its time starting Spring. The fix is to test each layer with the slice that loads only what it needs: plain JUnit and Mockito for services with no Spring at all; `@WebMvcTest(Controller.class)` with `MockMvc` (or `@WebFluxTest` with `WebTestClient`) for request mapping, validation, serialisation, exception handlers and security rules; `@DataJpaTest` (or `@DataJdbcTest`, `@DataMongoTest`) for queries and mappings against a real database through Testcontainers, using `@ServiceConnection` on Spring Boot 3.1 and later rather than an embedded H2 that behaves differently from production; and a handful of `@SpringBootTest` tests for wiring and the main flows.

Other details matter: `@DataJpaTest` wraps each test in a transaction that rolls back, which can hide flush-time constraint errors unless you flush, and older Boot versions replace the DataSource with an embedded one unless the test sets `@AutoConfigureTestDatabase(replace = Replace.NONE)`, so check what the project's version does; security must be tested with `spring-security-test` (`@WithMockUser`, `jwt()` request post-processors) instead of disabling it; and a shared base class or a reused Testcontainers container keeps context caching effective.
</context>

<task>
Write tests for this Spring Boot feature{{#versions}} ({{versions}}){{/versions}}:

{{feature}}

1. Read the controllers, services, repositories, security configuration and existing tests. Note how existing tests start Spring and which configurations differ between them.
2. Plan by layer: service logic as plain unit tests; controllers with `@WebMvcTest` and `MockMvc`; custom queries with `@DataJpaTest` and a Testcontainers database matching production; one or two `@SpringBootTest` tests for the end-to-end flow. Explain each choice.
3. Write controller slice tests covering mapping, validation errors (400 with the error body), not found, exception handler output, and security: unauthenticated, wrong role, and correct role, using `spring-security-test`.
4. Write repository tests for custom queries, constraints (calling `flush` so violations surface), and pagination or sorting; then the service unit tests and the few full-context tests.
5. Put shared setup (container, base class, test properties) where all tests reuse the same context. Run the tests, report results and the number of contexts started if the logs show it.
</task>

<constraints>
- Do not disable security in tests to make them pass; use the security test support.
- Do not use an embedded database that differs from production for query tests unless the user accepts the trade-off.
- Avoid unique combinations of mocked beans per class that break context caching without a reason.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Test plan by layer
Table: class, test type (unit, WebMvcTest, DataJpaTest, SpringBootTest), cases.
## Shared setup
Base classes, containers and properties.
## Tests
The test classes.
## Check
Commands run, results and context count.
</output_format>

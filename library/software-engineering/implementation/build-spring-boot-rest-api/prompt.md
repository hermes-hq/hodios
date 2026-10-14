---
schema: 1
id: build-spring-boot-rest-api
kind: prompt
title: Build a Spring Boot REST API
description: Builds a Spring Boot REST API with controller, service and repository layers, validated DTOs, ProblemDetail errors and JPA mappings without N+1 queries. Use for a new Spring resource.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, software-engineer]
stack: [spring]
requires: [repo-read, file-write, shell]
inputs: [spec, repo]
output: [code, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [layered-architecture, rest-api, jpa, bean-validation, problem-details]
pairs_with:
  prompts: [build-rest-endpoint, implement-optimistic-locking]
  rules: [spring-boot-rules]
  personas: [java-spring-engineer]
args:
  - name: api_spec
    description: The resource, its fields and relations, the operations, validation rules and who may call each operation.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Contract, Changes, Tests, Verification, Decisions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a Java engineer adding a REST resource to a Spring Boot 3 application. The recurring mistakes in Spring APIs:
- Returning JPA entities from controllers couples the API to the schema, triggers lazy-loading exceptions or extra queries during JSON serialisation, risks infinite recursion on bidirectional relations, and enables mass assignment on input. Use request and response DTOs (Java records work well) and map explicitly.
- Validation: Jakarta Bean Validation annotations on request DTOs with `@Valid` on the controller parameter. Constraints on path and query parameters are validated natively since Spring Framework 6.1 (Boot 3.2); older versions need `@Validated` on the controller class. Business rules that need the database belong in the service.
- Errors: a `@RestControllerAdvice` mapping domain exceptions to `ProblemDetail` responses (RFC 9457); `spring.mvc.problemdetails.enabled=true` covers Spring's own exceptions. Do not leak stack traces or SQL.
- Transactions: `@Transactional` on service methods, read-only where possible. It works through proxies, so a call from another method in the same class bypasses it, and it is ignored on private methods.
- N+1 queries: lazy collections loaded per row. Fetch what the response needs with `@EntityGraph`, a fetch join, or a DTO projection query. Set `spring.jpa.open-in-view=false` if the project allows it, so lazy loading cannot hide in the web layer.
- Pagination with `Pageable` needs a maximum page size (`spring.data.web.pageable.max-page-size`), and sort properties should be allowlisted.
- Security: secure by default in the `SecurityFilterChain`, method security (`@PreAuthorize`) for role rules, and an explicit ownership check on the loaded resource.
- Schema changes go through Flyway or Liquibase, with `ddl-auto` set to `validate` or `none` outside local development.
- Tests: `@WebMvcTest` with `MockMvc` for controller behaviour, `@DataJpaTest` for queries, and Testcontainers for a real database when the project uses it.
</context>

<task>
Build this resource:
{{api_spec}}

1. Read the build file (Spring Boot and Java versions), existing controllers, services, repositories, DTO mappers, exception handlers, security configuration, migrations and tests. Follow their patterns.
2. Write the contract: routes, methods, request and response DTOs, validation, status codes and error responses, permissions.
3. Implement the migration, entity, repository with fetch strategy, service with transactions, DTOs and mapping, controller, exception mapping and security rules.
4. Write controller and repository tests covering validation, permissions, not found and query count or fetch behaviour where the project measures it.
5. Run the build with tests (`./mvnw verify` or `./gradlew build`, whichever the project uses) and report the result.
</task>

<constraints>
- Never return or accept JPA entities in controller signatures.
- Never set `ddl-auto` to `update` or `create` outside local development.
- Do not add a mapping library the project does not already use without saying why.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Contract
A table: Method and path | Request | Success | Errors | Who may call.
## Changes
One line per file: `path`, what changed.
## Tests
One line per test: the case it covers.
## Verification
Commands run and their actual results.
## Decisions
Choices the spec did not settle, and the existing code that justified each.
</output_format>

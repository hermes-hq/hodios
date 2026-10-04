---
schema: 1
id: spring-boot-rules
kind: rule
title: Spring Boot rules
description: Standing rules for Spring Boot services covering package structure, constructor injection, typed configuration, transaction boundaries, error responses, actuator and slice tests.
category: conventions
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer]
stack: [spring]
requires: [none]
output: [code]
risk: read-only
invocation: user
model_tier: mid
level: intermediate
tags: [dependency-injection, transactions, jpa, actuator, slice-tests]
applies_to: ["src/main/**/*.java", "src/main/**/*.kt", "src/test/**/*.java", "src/test/**/*.kt", "src/main/resources/application*.yml", "src/main/resources/application*.properties"]
pairs_with:
  rules: [java-style-rules, kotlin-style-rules]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you write or change code in this Spring Boot service:

**Know the project first**
- Check the Spring Boot and Java (or Kotlin) versions in the build file and use APIs that exist in those versions (for example the `jakarta.*` namespace, records, `RestClient`). Follow the existing package layout and naming.

**Structure**
- Organise by feature (`orders`, `billing`), each package holding its controller, service, repository and DTOs, unless the codebase is already layered by technical role. Keep classes package-private when nothing outside the feature uses them.
- Controllers translate HTTP to calls on services and back. Business rules live in services or the domain model, never in controllers or repositories.
- Expose DTOs (records are ideal) in the API, never JPA entities. Map explicitly at the boundary.

**Dependency injection**
- Use constructor injection with `final` fields (or Kotlin `val`s), one constructor, no `@Autowired` on fields or setters. A constructor with many parameters is a sign the class does too much; say so rather than hiding it.
- Do not call `new` on Spring-managed collaborators or look beans up from the `ApplicationContext` in business code.

**Configuration**
- Bind settings with `@ConfigurationProperties` on a record or class, annotated `@Validated` with constraints, rather than scattered `@Value` strings. Give every property a documented default or make it required.
- Keep secrets out of `application.yml` in the repository; read them from the environment or the project's secret store. Use profiles only for real environment differences.

**Transactions and persistence**
- Put `@Transactional` on public service methods that form one unit of work, with `readOnly = true` for queries. Remember that self-invocation and private methods bypass the proxy, so annotations there do nothing.
- Do not call remote services, send messages or do slow I/O inside a database transaction; publish the side effect after commit (for example a transactional event listener with the after-commit phase).
- Avoid N+1 queries: use fetch joins, entity graphs or projections for the associations a use case needs, and keep `spring.jpa.open-in-view` disabled so lazy loading cannot leak into the web layer.
- Change the schema only through the project's migration tool (Flyway or Liquibase); never rely on `ddl-auto=update` outside throwaway local setups.

**Errors**
- Handle exceptions in one `@RestControllerAdvice` that returns `ProblemDetail` (RFC 9457) responses with the right status: 400 for validation, 404 not found, 409 conflicts. Validate request bodies with `@Valid` and Bean Validation constraints.
- Never return stack traces or exception messages from internals to clients; log them with a correlation id.

**Operations**
- Expose only the actuator endpoints you need (health, info, metrics, readiness and liveness probes) and secure the rest. Never expose `env`, `heapdump` or `configprops` publicly.
- Log through SLF4J with parameterised messages; never log secrets, tokens or full personal data.

**Tests**
- Prefer slice tests: `@WebMvcTest` (or the WebFlux slice) for controllers, `@DataJpaTest` for repositories, plain unit tests for services. Use `@SpringBootTest` sparingly for end-to-end wiring.
- Test against the real database engine with Testcontainers when queries are database-specific, not an in-memory substitute that behaves differently.
- Before finishing, run the build with tests (`./mvnw verify` or `./gradlew check`) and report the result.

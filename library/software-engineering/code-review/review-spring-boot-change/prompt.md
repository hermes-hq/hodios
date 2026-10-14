---
schema: 1
id: review-spring-boot-change
kind: prompt
title: Review a Spring Boot change
description: Reviews a Spring Boot diff for @Transactional proxy pitfalls, bean scope and lifecycle errors, JPA lazy loading outside a session and configuration binding mistakes.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [backend-engineer]
stack: [spring]
requires: [repo-read]
inputs: [diff, file]
output: [report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [transactional, jpa, hibernate, dependency-injection, pull-request]
pairs_with:
  personas: [java-spring-engineer]
  prompts: [review-pull-request, review-java-code-change]
  rules: [spring-boot-rules]
args:
  - name: diff
    description: The diff with file paths, including services, repositories, entities, controllers, configuration classes and `application` properties or YAML.
    type: text
    required: true
  - name: context
    description: Spring Boot and Java versions, database, whether `spring.jpa.open-in-view` is set, and the business rule the change implements.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Findings, Missing tests, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most Spring bugs come from proxies. `@Transactional`, `@Async`, `@Cacheable` and `@Retryable` work by wrapping the bean, so a call from one method to another on the same object (`this.save()`) skips the proxy and the annotation does nothing; on private methods it is ignored too. By default a transaction rolls back only on unchecked exceptions, so a checked exception commits half the work unless `rollbackFor` says otherwise. Catching an exception from an inner `@Transactional` call marks the outer transaction rollback-only and the commit then throws `UnexpectedRollbackException`. `REQUIRES_NEW` opens a second connection and can deadlock against the outer transaction or exhaust the pool. Singleton beans are shared across threads, so a field that holds request data is a race; a prototype bean injected into a singleton is created once. With JPA, touching a lazy association after the transaction closed throws `LazyInitializationException`, unless `open-in-view` is on (the default, with a startup warning), which hides the problem and runs extra queries during view rendering. `save()` on a detached entity merges and returns a new instance, and the old reference is not managed. `@Modifying` queries leave the persistence context stale without `clearAutomatically`. `@Value` without a default fails startup when a property is missing, `Duration` properties without a unit are milliseconds, and `@RequestBody` without `@Valid` skips bean validation.
</context>

<task>
<diff>
{{diff}}
</diff>

{{#context}}
<context_given>
{{context}}
</context_given>
{{/context}}

1. If you can read the repository, open each changed class in full, the callers of changed `@Transactional` methods, the entities and their mappings, and the relevant configuration properties, before judging any hunk. If you only have the diff, say which conclusions depend on code you could not see.
2. Check proxy-based annotations: `@Transactional`, `@Async`, `@Cacheable` and similar on private or final methods or reached through self-invocation, and class-level versus method-level settings that conflict.
3. Check transaction semantics: rollback on checked exceptions, exceptions caught inside a transactional call chain, `REQUIRES_NEW` or `NESTED` use, `readOnly` methods that write, remote calls or long work inside a transaction holding a connection, and events or messages sent before commit (use `@TransactionalEventListener` or an outbox).
4. Check beans: mutable fields on singletons written per request, prototype or request-scoped beans injected into singletons without a provider, work in constructors or `@PostConstruct` that needs transactions or other beans, and `@Async` or `@Scheduled` without a configured executor where concurrency matters.
5. Check JPA: lazy associations accessed outside a transaction or relied on via open-in-view, N+1 from lazy collections in loops, `equals` and `hashCode` on entities based on generated ids or all fields, cascade and `orphanRemoval` that delete more than intended, `@Modifying` queries without clearing the context, and entities returned directly from controllers.
6. Check configuration and web input: properties without defaults or validation, unit-less durations and sizes, profile-specific values that differ silently, secrets in committed property files, and request bodies without `@Valid` or with entity types that allow mass assignment.
7. For each finding, write the concrete input, request or sequence of events that triggers it and what goes wrong. Drop any finding you cannot trigger from the code you have read.
8. Rate each finding: high (partial commits, writes that silently run without a transaction, data shared between requests, mass assignment, cascading deletes), medium (LazyInitializationException on a path, N+1, startup failures from config), low.
9. List the tests that would fail on the current code and pass once it is fixed.
</task>

<constraints>
- Say which Spring Boot version you assumed for version-dependent behaviour (for example circular references disallowed by default since 2.6, virtual threads in 3.2).
- Fix within Spring's model (move the method to another bean, use `TransactionTemplate`, fetch joins or entity graphs) rather than disabling features globally.
- At most 10 findings, most severe first. No style, naming or formatting comments unless they cause a defect.
- Stay read-only: do not edit files, push, or run commands that change state. Running read-only checks (type checker, linter, tests) is fine and worth reporting.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: approve | approve-with-nits | request-changes, and the main reason.
## Findings
Numbered. Each: severity, `path:line`, the bean or entity affected, the defect, the triggering call path or concurrent requests, the fix in one or two sentences.
## Missing tests
Bullets naming the case each test covers, or "None".
## Questions
Versions, settings or business rules you need confirmed, or "None".
</output_format>

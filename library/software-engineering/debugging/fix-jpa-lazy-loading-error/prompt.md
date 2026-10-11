---
schema: 1
id: fix-jpa-lazy-loading-error
kind: prompt
title: Fix a JPA lazy loading error
description: Fixes LazyInitializationException and related JPA or Hibernate fetch errors with fetch joins, entity graphs or DTO projections, not open-in-view or eager fetching.
category: debugging
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, software-engineer]
stack: [spring]
requires: [repo-read, file-write, shell]
inputs: [stack-trace, file, repo]
output: [explanation, diff]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [jpa, hibernate, lazy-loading, transactions]
pairs_with:
  prompts: [fix-n-plus-one-queries, fix-spring-bean-creation-error]
  personas: [java-spring-engineer]
args:
  - name: error
    description: "The exception and stack trace, for example \"LazyInitializationException: failed to lazily initialize a collection of role: ... could not initialize proxy - no Session\"."
    type: text
    required: true
  - name: code
    description: "The entities and relationships involved, the repository or query, the service method and where the entity is used (controller, mapper, JSON serialisation, async task), or their paths."
    type: text
output_contract:
  format: markdown
  sections: [Where the session ends, Cause, Fix, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a JPA engineer. A `LazyInitializationException` means code touched a lazy association (a `@OneToMany`, `@ManyToMany`, or a `@ManyToOne` declared lazy) after the persistence context that loaded the entity closed. It shows up when:
- An entity is returned from a `@Transactional` service and the controller, a mapper or Jackson serialisation walks its associations.
- Spring's open-session-in-view is disabled (`spring.jpa.open-in-view=false`, which is recommended), so the session no longer stays open during rendering.
- Entities are passed to async tasks, caches or other threads.
- `@Transactional` is not applied: self-invocation inside the same class bypasses the proxy, or the method is private or final.
The right fixes load exactly what the use case needs, inside the transaction:
- A fetch join in JPQL (`join fetch`) or an `@EntityGraph` on the repository method, for the specific query that needs the association. Fetch-joining two collections at once causes `MultipleBagFetchException` or a cartesian product; use `Set`, separate queries, or batch fetching.
- DTO projections (constructor expressions, interface or record projections) so the API never serialises entities.
- Mapping to DTOs inside the transactional service method.
- `@BatchSize` or `hibernate.default_batch_fetch_size` to load lazy collections in batches when they are touched inside the transaction.
Switching associations to `FetchType.EAGER`, enabling open-in-view or `hibernate.enable_lazy_load_no_trans` make the exception go away while causing N+1 queries, long-held connections or hidden queries outside transactions.
</context>

<task>
Fix this lazy loading error.

Error:
{{error}}
{{#code}}

Code:
{{code}}
{{/code}}

1. From the stack trace, find the line that touches the lazy association, and from the code find where the transaction ends.
2. Explain why the association is not loaded at that point (outside a transaction, self-invocation, serialisation after return, another thread).
3. Choose the fix for this use case: a fetch join or `@EntityGraph` on the query this endpoint uses, a DTO projection, mapping inside the transaction, or batch fetching. Avoid fetching collections the caller does not need.
4. Apply it, keeping the entity mappings lazy.
5. Enable SQL logging in a test (`spring.jpa.show-sql` or a datasource proxy) and confirm the number of queries is what you expect, then run the related tests.
</task>

<constraints>
- Do not change associations to `FetchType.EAGER`, enable `spring.jpa.open-in-view`, or set `hibernate.enable_lazy_load_no_trans=true` as the fix.
- Do not add `@Transactional` to controllers or widen transactions to include remote calls or serialisation.
- Do not fix it with `@JsonIgnore` unless the field genuinely should not be in the response; say so if that is the case.
{{> guardrails/investigate-before-answering}}
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Where the session ends
Where the transaction and persistence context close, and where the lazy association is touched after that.
## Cause
Why the association was not loaded while the session was open.
## Fix
The diff, and the queries it now runs.
## Verification
The test run and the SQL log showing the number of queries.
</output_format>

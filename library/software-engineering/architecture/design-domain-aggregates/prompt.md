---
schema: 1
id: design-domain-aggregates
kind: prompt
title: Design DDD aggregates
description: Designs domain-driven design aggregates, entities and value objects inside one bounded context, with invariants, transaction boundaries and repository interfaces.
category: architecture
version: 1.0.0
status: incubating
stage: [design]
role: [backend-engineer, architect, tech-lead]
requires: [none]
inputs: [spec, text, repo]
output: [plan, code, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [domain-driven-design, aggregates, value-objects, invariants, transaction-boundaries, domain-model]
pairs_with:
  personas: [software-architect, backend-engineer]
  prompts: [find-service-boundaries, run-event-storming]
args:
  - name: domain
    description: The bounded context and its business rules, in the business's own words, including the rules that must never be broken.
    type: text
    required: true
  - name: language
    description: Programming language and persistence, for example C# with EF Core, Java with JPA, TypeScript with an ORM, or Go with SQL.
    type: string
  - name: current_model
    description: Existing classes or tables if this is a redesign, and the problems seen (huge entities, concurrency conflicts, rules scattered in services).
    type: text
output_contract:
  format: markdown
  sections: [Aggregates, Model sketch, Consistency rules, References and size, Repositories and persistence, Open questions for domain experts]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An aggregate is a consistency boundary: the cluster of objects that must change together in one transaction to keep a business rule true, accessed only through its root. The most common mistake is making aggregates too large (an Order that contains the Customer, Products and Inventory), which causes lock contention and loading huge graphs; the second is making them anaemic, with all rules in service classes and public setters on every field. Good aggregates are as small as the true invariants allow, reference other aggregates by id rather than object, expose behaviour ("add line", "submit") instead of setters, and enforce their invariants in those methods. Rules spanning aggregates ("reserve stock when an order is submitted") are usually eventually consistent, connected by domain events, unless the business genuinely cannot tolerate the gap. Value objects (Money, Address, DateRange) are immutable, validated on creation, and remove primitive obsession. One repository per aggregate root loads and saves the whole aggregate, with optimistic concurrency via a version field. The right boundaries come from asking domain experts which rules must hold immediately and what happens if two people act at once.
</context>

<task>
<domain>
{{domain}}
</domain>
{{#language}}
Language and persistence: {{language}}
{{/language}}
{{#current_model}}
<current_model>
{{current_model}}
</current_model>
{{/current_model}}

1. If a repository is available, read the existing entities, services and tables for this context before proposing anything, and keep names that match the business language.
2. List the invariants: rules that must be true after every transaction. For each, decide whether it truly needs immediate consistency or can tolerate a short delay; ask when the description does not say.
3. Group the objects that share an immediate invariant into aggregates and pick each root. Keep aggregates small; reference other aggregates by id.
4. Identify value objects and make them immutable with validation on creation.
5. Sketch the main aggregate in the given language with behaviour methods that enforce invariants, no public setters for invariant-bearing state, and domain events raised on meaningful changes.
6. Define cross-aggregate rules as domain events and handlers, and say where a transactional outbox is needed to publish them reliably.
7. Define one repository per root, the concurrency control (version field), and how the persistence mapping avoids leaking into the domain model where the language and ORM allow.
</task>

<constraints>
- Do not put rules in service classes that belong in the aggregate.
- Do not create one large aggregate to avoid eventual consistency without naming the contention cost.
- Code must be idiomatic for the given language; do not invent ORM features.
- Domain rules come from the user; mark any rule you infer and ask domain experts to confirm it.
{{> output/uncertainty}}
</constraints>

<output_format>
## Aggregates
Table: aggregate, root, entities and value objects inside, invariants it protects.
## Model sketch
Code in the given language for the root aggregate: fields, constructor or factory, the main behaviour methods, invariant checks.
## Consistency rules
What is consistent in one transaction and what is eventually consistent, with the domain events that connect them.
## References and size
How aggregates refer to each other (by id) and why each aggregate is this size.
## Repositories and persistence
Repository interfaces and concurrency control.
## Open questions for domain experts
Bullets.
</output_format>

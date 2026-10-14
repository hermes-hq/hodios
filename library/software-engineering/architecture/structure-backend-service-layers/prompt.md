---
schema: 1
id: structure-backend-service-layers
kind: prompt
title: Structure a backend service's layers
description: Chooses layered, hexagonal or vertical-slice structure for a backend service and specifies the package layout, dependency rules, where transactions and validation live, and how tests map to it.
category: architecture
version: 1.0.0
status: incubating
stage: [design]
role: [backend-engineer, tech-lead, architect]
requires: [none]
inputs: [spec, repo, text]
output: [docs, table, code]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [hexagonal-architecture, vertical-slices, layered-architecture, package-structure, dependency-rule]
pairs_with:
  personas: [software-architect, backend-engineer]
  prompts: [write-architecture-fitness-functions, review-codebase-architecture, find-service-boundaries]
args:
  - name: service
    description: What the service does, its main use cases, its integrations (database, queues, third-party APIs) and how complex the business rules are.
    type: text
    required: true
  - name: stack
    description: Language and framework, for example "Kotlin with Spring Boot" or "TypeScript with NestJS" or "Go with chi".
    type: string
    required: true
  - name: team
    description: Team size, experience with the patterns, and the existing structure if this is a restructure.
    type: text
output_contract:
  format: markdown
  sections: [Recommendation, Package layout, Dependency rules, Where things live, Testing map, Trade-offs]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The internal structure of a service decides how expensive every later change is. Classic layering (controller, service, repository) is familiar but tends to produce anaemic "service" classes and changes that touch every layer for one feature. Hexagonal (ports and adapters) puts business rules in a core that depends on nothing and pushes the framework, database and third parties to replaceable adapters; it pays off when rules are complex or integrations change, and is ceremony for a thin CRUD service. Vertical slices organise by feature or use case, keep each change in one folder and tolerate different styles per slice; they need discipline to stop slices reaching into each other. The right answer depends on rule complexity, integration churn and team familiarity, and mixing them (vertical slices with a hexagonal core for the complex slices) is common and fine.
</context>

<task>
<service>
{{service}}
</service>

Stack: {{stack}}

{{#team}}
<team>
{{team}}
</team>
{{/team}}

1. Classify the service: how much real business logic it has versus data shuttling, how many integrations and how likely they are to change, and how many use cases it has.
2. Recommend layered, hexagonal, vertical slices or a named combination, with the reason tied to that classification. Say what you would pick for the opposite profile so the reader sees the trade-off.
3. Give the package or folder layout as a tree, using the idioms of {{stack}} (for example Go favours flat packages by responsibility, Spring and NestJS have module conventions). Show where one representative use case lives end to end.
4. Write the dependency rules as a short list: which packages may import which, and which must never import the framework, ORM or HTTP types.
5. Say where each concern lives: input validation versus business invariants, transactions and their boundaries, mapping between transport, domain and persistence models (and when to skip a mapping layer), error translation to HTTP or RPC codes, authorisation checks, and outbound calls.
6. Map tests to the structure: what is unit tested in isolation, what is tested against a real database, and which few tests go through the full HTTP stack.
7. If the team gave an existing structure, list the smallest steps to move toward the target without a big-bang rewrite.
</task>

<constraints>
- Do not prescribe hexagonal architecture for a thin CRUD service without naming the overhead.
- Follow the idioms of the given stack; do not transplant Java-style layering into Go or vice versa.
- Keep the layout to what the described service needs today; no placeholder folders for hypothetical features.
- Do not invent framework APIs; when you name an annotation or decorator, it must be a real one for that framework, otherwise describe the mechanism.
{{> output/uncertainty}}
</constraints>

<output_format>
## Recommendation
The structure and why, in at most 5 lines.
## Package layout
A tree in a code block, then the walk-through of one use case.
## Dependency rules
Numbered rules.
## Where things live
Table: concern, location, note.
## Testing map
Table: test type, what it covers, location.
## Trade-offs
Bullets: what this structure costs and when to revisit it.
</output_format>

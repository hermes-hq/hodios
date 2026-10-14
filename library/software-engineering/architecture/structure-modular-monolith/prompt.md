---
schema: 1
id: structure-modular-monolith
kind: prompt
title: Structure a modular monolith
description: Structures a codebase as a modular monolith with module boundaries, a public interface per module, data ownership per module, in-process events, and dependency rules enforced by a check in CI.
category: architecture
version: 1.0.0
status: incubating
stage: [design, build]
role: [architect, tech-lead, backend-engineer]
requires: [repo-read]
inputs: [repo, spec, text]
output: [docs, diagram, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [modular-monolith, module-boundaries, bounded-contexts, dependency-rules, data-ownership]
pairs_with:
  prompts: [decide-microservices-or-monolith, find-service-boundaries, write-architecture-fitness-functions, fix-layering-violations, split-shared-database]
  personas: [software-architect]
args:
  - name: system
    description: The application (new or existing), its main business capabilities, language and framework, and team size. For an existing codebase, the repository or its current folder layout.
    type: text
    required: true
  - name: pain
    description: What hurts today, for example "every change touches five folders", "tests take 40 minutes", "teams block each other", or plans to extract services later.
    type: text
output_contract:
  format: markdown
  sections: [Modules, Module interfaces, Data ownership, Communication, Enforcement, Migration steps, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A modular monolith keeps one deployable and gets most of the independence people want from microservices, but only if the modules are real. The usual failure is folders named after modules while any code imports any other module's internals and any query joins any table, which is a big ball of mud with nicer directory names. What makes modules real: boundaries drawn around business capabilities (billing, catalog, fulfilment), not technical layers (controllers, services, repositories); a small public interface per module (a facade, application service or published functions and DTOs) with everything else internal and enforced by the language or a tool (Java modules or ArchUnit, Spring Modulith, .NET assemblies with internal visibility and NetArchTest, Go `internal/` packages, Nx or dependency-cruiser boundaries in TypeScript, import-linter in Python, Packwerk in Rails); data owned by one module, so other modules read it through the interface or a read model, not with joins across module tables (separate schemas help); and in-process events for reactions that should not couple the sender to the receiver, with an outbox if they must survive crashes. Cycles between modules mean the boundary is wrong or a shared concept needs its own module. A shared kernel should stay tiny. Done this way, extracting a module to a service later is mostly mechanical; done loosely, it is a rewrite.
</context>

<task>
<system>
{{system}}
</system>

{{#pain}}
<pain>
{{pain}}
</pain>
{{/pain}}

1. If a repository is available, read its structure, the import graph between top-level folders, and which tables each area reads and writes. Say what you read. For a new system, work from the capabilities given.
2. Propose modules by business capability, each with its responsibility in one line and what it does not own. Keep the count small enough for the team.
3. Define each module's public interface: the operations and data types other modules may use, and what stays internal. Show the folder or package layout that makes internals unreachable in this language.
4. Assign data ownership: which tables or collections each module owns, how other modules get that data (interface call, event-fed read model), and whether to separate schemas. List current cross-module joins and foreign keys to remove.
5. Define communication: synchronous interface calls for queries and commands that need an answer, in-process events for reactions, an outbox where events must not be lost, and how transactions across modules are avoided or handled.
6. Define enforcement: the tool for this stack, the dependency rules (allowed module dependencies, no cycles, no access to internals), and the CI check that fails on violations, with an allowlist for existing violations that shrinks over time.
7. For an existing codebase, give migration steps in order, smallest risk first, each leaving the system working.
</task>

<constraints>
- Do not draw module boundaries by technical layer.
- Do not allow modules to read other modules' tables directly in the target design; existing violations go on a shrinking allowlist.
- Do not recommend splitting into services as part of this work; note which modules could be extracted later and what would trigger it.
- Do not invent the repository's structure; if you could not read it, say so.
{{> output/uncertainty}}
</constraints>

<output_format>
## Modules
Table: module, responsibility, owns, does not own. Then a Mermaid diagram of allowed dependencies.
## Module interfaces
Per module: public operations and types, and the folder layout.
## Data ownership
Tables per module and the cross-module access to remove.
## Communication
Calls versus events, outbox use, and cross-module transactions.
## Enforcement
Tool, rules and the CI check.
## Migration steps
Numbered, smallest risk first, or "New system" if not applicable.
## Open questions
Numbered.
</output_format>

---
schema: 1
id: fix-layering-violations
kind: prompt
title: Fix layering and dependency direction violations
description: Finds imports that point the wrong way between layers or modules, like domain code importing the web framework or database, fixes each with inversion or a move, and adds a check that keeps them out.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [software-engineer, architect, tech-lead]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo]
output: [report, diff, config]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
tags: [layered-architecture, dependency-rule, import-rules, hexagonal-architecture, module-boundaries]
pairs_with:
  prompts: [untangle-circular-dependencies, review-codebase-architecture]
  personas: [refactoring-specialist, software-architect]
args:
  - name: codebase
    description: The repository or package to examine, and the intended layers or modules with their allowed direction, for example "domain must not import api or infra; api may import application; infra implements domain ports". If there is no written rule, say so.
    type: text
    required: true
  - name: test_command
    description: The command that runs the tests and build, if not the usual one.
    type: string
output_contract:
  format: markdown
  sections: [Intended rule, Violations, Fix per violation, Enforcement, Diff, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an engineer who keeps dependency direction honest, because once the core imports the edges, every change to a framework, database or API leaks into business logic and tests need the whole stack. Common violations: domain or core modules importing the ORM, HTTP framework or request types; shared utility packages importing feature modules; one feature reaching into another's internals instead of its public entry point; and infrastructure types (database rows, API DTOs) used as the domain model.

The fixes, in order of preference: move the code to the layer it really belongs to; introduce a port (an interface owned by the inner layer) that the outer layer implements, and pass it in; map at the boundary so inner code receives its own types; or expose a narrow public entry point from the module being reached into. A fix is only durable with an automated check: import-linter for Python, dependency-cruiser or ESLint boundary rules for JavaScript and TypeScript, ArchUnit for Java and Kotlin, `depguard` or package visibility in Go, internal visibility and project references in .NET, Cargo workspace crates in Rust.
</context>

<task>
Fix the layering in {{codebase}}.

1. State the intended rule as a short list of allowed directions. If none is written, propose one from the folder structure and how the code is used, and ask the user to confirm it before going further.
2. Find every import that breaks the rule, using the language's tooling or a search, with file and line. Group them by pattern (domain imports ORM, feature imports another feature's internals, utils import features).
3. For each group, choose the fix: move, invert with a port, map at the boundary, or use a public entry point. Show one representative fix in full and list the rest. Order the work so each step builds and passes tests.
4. Add an enforcement check in the project's tooling that encodes the rule, starting in a mode that records existing violations as a baseline if they cannot all be fixed now, so no new ones get in. Wire it into the test or lint command.
5. Apply the fixes agreed with the user, run the build and tests{{#test_command}} with `{{test_command}}`{{/test_command}}, and report the remaining violations count.
</task>

<constraints>
- Behaviour must not change; this is about where code lives and what it imports.
- Do not move whole folders or rename packages beyond what a violation needs; list larger restructures as follow-ups.
- Do not invent configuration syntax for a tool you are unsure of; say what to check in its documentation.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Intended rule
Allowed directions, marked confirmed or proposed.
## Violations
Table: file:line, from layer, to layer, pattern.
## Fix per violation
Pattern, chosen fix, and one full example.
## Enforcement
The check configuration and how it runs.
## Diff
The change.
## Check
Build, tests and remaining violation count.
</output_format>

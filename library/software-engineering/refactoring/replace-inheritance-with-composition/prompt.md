---
schema: 1
id: replace-inheritance-with-composition
kind: prompt
title: Replace inheritance with composition
description: Flattens a fragile class hierarchy, with deep chains, overridden template methods or subclasses that disable parent behaviour, into composed collaborators, step by step with behaviour kept.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [software-engineer, backend-engineer, tech-lead]
stack: []
requires: [repo-read, file-write, shell]
inputs: [file, repo]
output: [plan, diff]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
tags: [composition, inheritance, class-hierarchy, delegation, object-oriented-design]
pairs_with:
  prompts: [apply-design-pattern, add-characterization-tests]
  personas: [refactoring-specialist]
args:
  - name: hierarchy
    description: The base class and its subclasses, as paths or code, and what keeps going wrong with them (for example "every new report type copies half of its sibling" or "a fix in BaseExporter broke two subclasses").
    type: text
    required: true
  - name: test_command
    description: The command that runs the relevant tests.
    type: string
output_contract:
  format: markdown
  sections: [Hierarchy map, What varies, Target design, Steps, Diff, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an engineer who removes inheritance only where it causes damage. Inheritance hurts when subclasses reuse code rather than model a true "is a" relationship, when a hierarchy varies along two independent axes (format and destination, say) and multiplies into a class per combination, when subclasses override a method only to turn parent behaviour off, when a change in the base class breaks subclasses that relied on its internal call order (the fragile base class problem), and when `super` calls are spread through template methods so nobody can follow the flow.

Composition separates each axis of variation into its own small collaborator behind an interface, which the main class receives and calls. The move is done in small steps: pin current behaviour with tests, extract one varying piece into a strategy or collaborator that the base class delegates to, move subclasses to pass that collaborator instead of overriding, and delete a subclass only when nothing distinguishes it any more. Inheritance can stay where it fits: framework base classes you must extend, true subtype relationships, and shallow abstract types with no shared state.
</context>

<task>
Refactor this hierarchy toward composition.

Hierarchy and problem:
{{hierarchy}}

1. Map the hierarchy: each class, what it overrides, what it calls on `super`, which protected fields it touches, and who constructs each subclass. Note overrides that only disable behaviour.
2. Identify the independent axes of variation and the code that is only shared for reuse. If the hierarchy is a true subtype relationship that causes no real problem, say so and stop with a short recommendation instead of refactoring.
3. Propose the target design: the core class, one interface per axis, the implementations, and how callers construct them (a factory or the existing construction site). Show how each current subclass maps to a combination.
4. Plan small steps, each keeping tests green: add characterisation tests where coverage is thin, extract one axis at a time behind delegation, switch construction sites, then delete empty subclasses. Wait for approval of the plan.
5. Apply the steps, running the tests{{#test_command}} with `{{test_command}}`{{/test_command}} after each, and show the diff.
</task>

<constraints>
- Keep behaviour identical, including the order of side effects that subclasses relied on; write a test first for any order that matters.
- Keep the public API and serialised forms stable, or list every change and its callers.
- Do not introduce a dependency injection framework or a generic plugin system to solve a two-subclass problem.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Hierarchy map
Table: class, overrides, super calls, protected state used, constructed by.
## What varies
The axes of variation, and code shared only for reuse.
## Target design
Interfaces, implementations, and how each old subclass maps onto them.
## Steps
Numbered steps, each with its test check.
## Diff
The change.
## Check
Tests run after each step and results.
</output_format>

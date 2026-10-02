---
schema: 1
id: split-large-module
kind: prompt
title: Plan splitting a large module
description: Maps the responsibilities and internal dependencies of an oversized file or class and plans its split into cohesive modules, in small steps that keep tests green. Use before breaking up a god class.
category: refactoring
version: 1.0.0
status: incubating
stage: [plan, maintain]
role: [software-engineer, tech-lead]
stack: []
requires: [repo-read]
inputs: [file, repo]
output: [plan, diagram]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [god-class, modularity, cohesion, dependency-map]
pairs_with:
  prompts: [add-characterization-tests]
args:
  - name: file
    description: The oversized file or class, pasted or as a path, plus how it is imported elsewhere if you know.
    type: text
    required: true
  - name: constraints
    description: Limits on the split, for example a public API that must not change, a deadline, one PR per week, or modules the team already has.
    type: text
output_contract:
  format: markdown
  sections: [Responsibilities, Dependency map, Target modules, Step plan, Risks]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A file grows large because several responsibilities share it, and they are usually tangled through shared private state and helper functions. Splitting by line count or alphabetically produces modules that still depend on each other in both directions. A good split groups code by the data it touches and the reasons it changes, follows the real dependency graph so the new modules have no cycles, and happens in steps small enough that each one can be reviewed, merged and reverted on its own.
</context>

<task>
Plan how to split:
{{file}}
{{#constraints}}Constraints: {{constraints}}{{/constraints}}

1. Inventory the members (functions, methods, fields, constants, types). For each, record what state it reads and writes, what it calls, and who calls it from outside the file (search the repository if you can).
2. Cluster members into responsibilities by shared data and shared reasons to change. Name each cluster by what it does in the domain, not by technical layer. Flag members that belong to no cluster or to several.
3. Draw the dependency map between clusters, marking each edge with the members that create it. Find cycles and the shared state that causes them.
4. Propose target modules: name, responsibility in one sentence, public surface, and the state it owns. Break each cycle explicitly: move the shared piece to the lower module, pass it as a parameter, or introduce a small interface. Keep the original file as a facade that re-exports the old public API, so callers do not change until a final, optional step.
5. Order the steps so that every step compiles, passes tests and changes one thing: extract leaf clusters (no outgoing dependencies) first, move one cluster per step, update internal references, and remove the facade last. For each step, say what moves, the verification command, and how to revert.
6. Check the safety net: if the tests do not cover a cluster's behaviour, add a step before moving it to add characterization tests for that cluster.
</task>

<constraints>
- This is a plan. Do not perform the moves or rewrite the code.
- No step may change behaviour. Renames, signature changes and bug fixes are separate, later steps if they are needed at all.
- Prefer fewer, cohesive modules over many tiny ones; justify any module with fewer than three members.
- If the file is not available in full, say which parts you could not see and how that limits the plan.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Responsibilities
Table: Cluster | Members | State it owns | Reason it changes.
## Dependency map
A Mermaid flowchart of clusters with labelled edges, then the cycles found and how each is broken.
## Target modules
Table: Module (path) | Responsibility | Public surface | Depends on.
## Step plan
Numbered steps. Each: what moves, verification command, revert, approximate diff size.
## Risks
Bullets: dynamic access, reflection, serialization or import side effects that could break, plus gaps in test coverage.
</output_format>

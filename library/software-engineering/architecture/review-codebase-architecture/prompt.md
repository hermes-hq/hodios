---
schema: 1
id: review-codebase-architecture
kind: prompt
title: Review an existing codebase's architecture
description: Reviews the architecture of an existing codebase from its real dependencies, finding coupling, weak cohesion, layering violations and scaling limits, and proposes ranked, incremental changes.
category: architecture
version: 1.0.0
status: incubating
aliases: [arch-review]
stage: [review, maintain]
role: [architect, tech-lead, software-engineer]
stack: []
requires: [repo-read, shell]
inputs: [repo]
output: [report, diagram]
risk: runs-commands
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [coupling, cohesion, architecture-smells, dependency-graph, modularity]
pairs_with:
  personas: [software-architect, staff-engineer]
  prompts: [review-system-design, untangle-circular-dependencies, split-large-module, write-architecture-overview, plan-large-refactor]
args:
  - name: target
    description: The repository or part of it to review.
    type: text
    required: true
  - name: goals
    description: What the architecture needs to support next (for example "a second product line", "10x traffic", "three teams working in parallel").
    type: text
output_contract:
  format: markdown
  sections: [Architecture as built, Findings, Recommendations, What works, Open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
This reviews the architecture that exists in the code, not a proposal on paper (for a design document, review the design instead). The intended architecture in a README and the real one in the import graph often differ, and the real one is what slows the team down. Findings have to come from evidence in the repository: dependency directions, change patterns, module sizes, and the paths requests actually take.
</context>

<task>
Review the architecture of {{target}}.
{{#goals}}It needs to support next: {{goals}}
{{/goals}}
1. Reconstruct the architecture as built: the main modules or services, their responsibilities, the dependencies between them (from imports, calls and shared databases), and the path of one or two typical requests. Draw it as a small diagram in text or Mermaid. Note where it differs from any documented architecture.
2. Gather evidence: dependency cycles, modules that everything imports, modules that import everything, very large files or packages, shared mutable state, and, if git history is available, files that always change together across module boundaries.
3. Evaluate:
   - coupling: changes that ripple across modules, shared database tables used by several modules, leaking internal types;
   - cohesion: modules that mix unrelated responsibilities, or one responsibility scattered across many modules;
   - layering: domain logic depending on frameworks, UI or infrastructure; layers skipped;
   - scalability and operability: synchronous chains, single points of failure, state that blocks horizontal scaling;
   - fitness for the stated goals.
4. Name architectural smells with their evidence (for example a god module, a cyclic dependency, a distributed monolith, feature envy across modules) and their cost to the team.
5. Recommend changes ranked by value for effort, each small enough to do incrementally, and say what to leave as it is.
</task>

<constraints>
- Every finding cites evidence from the repository: files, import counts, cycles or co-change history.
- Do not recommend a rewrite or a move to microservices unless the evidence and goals clearly demand it, and then give an incremental path.
- Do not flag a pattern as a smell without its concrete cost here.
- Keep to at most 10 findings.
{{> guardrails/investigate-before-answering}}
{{> output/uncertainty}}
</constraints>

<output_format>
## Architecture as built
A short description, a diagram, and differences from the documented architecture.
## Findings
Numbered, most costly first. Each: **[high | medium | low]** smell or problem — evidence — cost to the team — affected modules.
## Recommendations
Ranked changes, each with the first incremental step and how to check it worked.
## What works
Parts of the structure to keep.
## Open questions
Questions whose answers would change the recommendations.
</output_format>

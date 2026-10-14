---
schema: 1
id: explain-design-patterns-in-code
kind: prompt
title: Explain the patterns a codebase uses
description: Identifies the design and architectural patterns a codebase already uses, where each appears and why it was likely chosen, so newcomers write code that fits instead of fighting it.
category: learning
version: 1.0.0
status: incubating
stage: [learn, discover]
role: [software-engineer, tech-lead]
stack: []
requires: [repo-read]
inputs: [repo]
output: [explanation, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [design-patterns, code-reading, architecture-overview, house-style]
pairs_with:
  prompts: [explain-codebase, apply-design-pattern]
args:
  - name: area
    description: A folder or feature to focus on, if not the whole repo.
    type: text
  - name: task
    description: What you are about to build, so the answer shows which patterns it should follow.
    type: text
output_contract:
  format: markdown
  sections: [Overall shape, Patterns in use, Inconsistencies, How to add code here, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Every mature codebase has a house style of patterns, often unnamed: a repository layer in front of the ORM, service objects for business logic, a middleware chain, an event bus, dependency injection through constructors, a result type instead of exceptions, adapters around third-party APIs, feature folders versus layer folders. Newcomers who do not see these write code that works but does not fit, and reviewers push back. The patterns are recognised by structure and repetition, not by class names: something called `UserManager` may be a plain module, and a real strategy pattern may be a dictionary of functions. Codebases also contain abandoned patterns from earlier eras, and a newcomer must know which one is current.
</context>

<task>
Identify the patterns in use in the codebase in the working directory{{#area}}, focused on {{area}}{{/area}}.
{{#task}}
The reader is about to build: {{task}}
{{/task}}

1. Describe the overall shape: layered, hexagonal, modular monolith by feature, MVC, microservices, a plugin host, or a mix. Name the evidence (folder layout, import directions, entry points).
2. Find the recurring patterns at the design level (repository, service layer, factory, strategy, adapter, observer or event bus, middleware or pipeline, dependency injection, command or job objects, result or error types, builders, state machines). For each, require at least two instances before calling it a pattern.
3. For each pattern: where it lives (two or three file paths), what problem it solves in this codebase, and the convention to copy (naming, folder, how it is wired and registered, how it is tested).
4. Note inconsistencies: places that do the same job a different way, older patterns being phased out, and which version is current. Use git history dates, deprecation comments or the newest files as evidence.
5. If a task was given, say step by step which patterns it should use and point to the closest existing example to copy.
</task>

<constraints>
- Name a pattern only when the code shows its structure; do not label by class or file names alone.
- Cite file paths for every pattern and inconsistency. Mark anything drawn from names alone as "(inferred)".
- Do not recommend refactoring the codebase. The goal is fitting in, not judging.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Overall shape
Three or four sentences with evidence.
## Patterns in use
A table: pattern, where (paths), problem it solves here, convention to copy.
## Inconsistencies
Bullets: the two ways, which is current, the evidence.
## How to add code here
Numbered steps for the task, or a general recipe, with the example file to copy.
## Questions
What to confirm with the team.
</output_format>

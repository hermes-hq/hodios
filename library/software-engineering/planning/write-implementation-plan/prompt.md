---
schema: 1
id: write-implementation-plan
kind: prompt
title: Write an implementation plan
description: Reads the codebase and writes an ordered implementation plan in small verifiable steps, with files to touch, tests, rollout and risks. Use before coding any change that spans several files.
category: planning
version: 1.0.0
status: experimental
stage: [plan]
role: [software-engineer, tech-lead]
stack: []
requires: [repo-read]
inputs: [ticket, spec, repo]
output: [plan]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [spec-driven, task-breakdown, rollout]
pairs_with:
  workflows: [feature-track]
  prompts: [break-down-epic]
args:
  - name: goal
    description: The feature, change or ticket to plan, with any acceptance criteria.
    type: text
    required: true
  - name: constraints
    description: Limits the plan must respect (deadline, no schema changes, must stay backward compatible, and so on).
    type: text
output_contract:
  format: markdown
  sections: [Understanding, Touchpoints, Steps, Rollout, Risks, Out of scope]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A good implementation plan is written against the real code, not an imagined one. Each step is small enough to review, leaves the build and tests green, and says how it will be verified, so the work can stop or change direction at any step without leaving a mess.
</context>

<task>
Plan the implementation of: {{goal}}
{{#constraints}}
Constraints:
{{constraints}}
{{/constraints}}

1. Read the code this change touches: entry points, the modules and data involved, existing tests, and similar features you can copy patterns from. Do not plan from file names alone.
2. If an open question would change the plan (behaviour, data model, compatibility), list those questions first and stop. Ask only questions the code cannot answer.
3. List the touchpoints: every file, module, table, config or public interface that will change, with real paths. Mark new files as new.
4. Write the steps in order. Each step makes one coherent change, includes its tests, leaves the build green, and fits in a single reviewable commit. Prefer an order that gets a thin end-to-end path working early.
5. For each step, give the verification: the test to add or the command to run, and the expected result.
6. Plan the rollout: feature flags, data migrations (expand, migrate, then contract), backward compatibility for clients and running instances, and how to roll back.
</task>

<constraints>
- Plan only. Do not edit files or write full implementations; signatures and short snippets are fine where they remove ambiguity.
- Cite only paths, functions and commands that exist, or mark them as new. Never guess a test command; find it in the repo's scripts or docs.
- Follow the patterns the codebase already uses unless the goal requires a change; say so when it does.
{{> guardrails/investigate-before-answering}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Understanding
Three to five lines: what will change and how it fits the current design.
## Touchpoints
Bullets: `path` — what changes.
## Steps
Numbered. Each: title — files — the change — verification (command or test, expected result).
## Rollout
Flags, migrations, compatibility, rollback.
## Risks
Bullets: risk — mitigation.
## Out of scope
Bullets.
</output_format>

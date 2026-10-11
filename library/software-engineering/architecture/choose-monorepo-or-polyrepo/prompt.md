---
schema: 1
id: choose-monorepo-or-polyrepo
kind: prompt
title: Choose monorepo or multiple repositories
description: Decides between a monorepo and multiple repositories from team layout, release coupling, shared code, tooling and CI cost, with the setup each choice needs.
category: architecture
version: 1.0.0
status: incubating
stage: [plan, design]
role: [tech-lead, architect, devops-engineer, engineering-manager]
requires: [none]
inputs: [text, repo]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [monorepo, polyrepo, code-ownership, build-tooling, release-coupling, trade-offs]
pairs_with:
  personas: [software-architect, staff-engineer]
  prompts: [plan-monorepo-migration, extract-shared-package]
args:
  - name: situation
    description: What code exists or is planned (apps, services, libraries), languages, number of teams, how they release, and what hurts today.
    type: text
    required: true
  - name: constraints
    description: CI provider and budget, tooling preferences, access control or open-source needs.
    type: text
output_contract:
  format: markdown
  sections: [Recommendation, Comparison, Required setup, Risks, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The choice is about coupling, not fashion. A monorepo makes cross-cutting changes atomic (change a shared library and every consumer in one reviewed commit), keeps tooling and versions consistent, and makes code discovery easy; it needs build tooling that only builds and tests what a change affects, clear ownership per folder, and CI that scales. Multiple repositories give strong boundaries, independent versioning and simple per-repo access control; they make shared code a versioned package with release overhead, and cross-repo changes become a sequence of coordinated pull requests. Teams that share a lot of code and release together suffer in many repositories; teams with independent products, different languages, or open-source and private code mixed suffer less. A hybrid is common: one monorepo per product or language family. The largest real costs are CI time and build tooling in a monorepo, and dependency drift plus release coordination in many repositories. Moving between the two is possible but takes planned migration work.
</context>

<task>
<situation>
{{situation}}
</situation>
{{#constraints}}
Constraints: {{constraints}}
{{/constraints}}

1. If repositories are available, look at how much code is shared, how often changes span more than one repository or package, and current CI times. State what you checked.
2. Identify the coupling: shared libraries, shared types or API contracts, coordinated releases, and cross-team changes per month.
3. Compare monorepo and multiple repositories on the factors that matter for this situation.
4. Recommend one or a hybrid, tied to the coupling found.
5. List the setup the choice requires: for a monorepo, workspace and build tooling suited to the languages, affected-only builds with caching, code owners, and a release process per app; for multiple repositories, shared packages with semantic versioning, automated dependency updates, and contract tests.
6. Give next steps, and if this means migrating, point to planning the migration as a separate task.
</task>

<constraints>
- Do not recommend a monorepo without addressing build tooling and CI cost, or multiple repositories without addressing shared code versioning.
- Do not invent build tool features; name the capability needed (affected detection, remote caching) and say to check tools for it.
- Keep it a decision; detailed migration plans are a separate job.
{{> output/uncertainty}}
</constraints>

<output_format>
## Recommendation
Monorepo, multiple repositories or a hybrid, with the main reason, in at most five lines.
## Comparison
Table: factor (atomic changes, shared code, versioning, CI time, access control, tooling, onboarding), monorepo, multiple repos.
## Required setup
What the chosen layout needs to work well: build tool, affected-only CI, ownership, release process.
## Risks
Bullets with mitigations.
## Next steps
Numbered steps.
</output_format>

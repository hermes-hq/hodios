---
schema: 1
id: plan-monorepo-migration
kind: prompt
title: Plan a monorepo migration
description: Plans moving several repositories into a monorepo, covering history preservation, build tooling, CI, code ownership and a staged rollout. Use before consolidating repositories.
category: migration
version: 1.0.0
status: incubating
stage: [plan, design]
role: [tech-lead, devops-engineer, architect, engineering-manager]
stack: [git]
requires: [none]
inputs: [text, config]
output: [plan, checklist, config]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [monorepo, git-history, build-tooling, codeowners, ci]
pairs_with:
  personas: [devops-engineer]
  prompts: [speed-up-ci-pipeline, choose-branching-strategy, plan-incremental-migration]
args:
  - name: repos
    description: The repositories to merge, with language, size, build system, how they depend on each other (published packages, git submodules, copy-paste), release process, owning teams and anything that must stay separate.
    type: text
    required: true
  - name: tooling
    description: Preferred or existing monorepo tooling, if any (for example pnpm workspaces, Nx, Turborepo, Bazel, Pants, Gradle composite builds, Go workspaces).
    type: string
output_contract:
  format: markdown
  sections: [Decision check, Target layout, Tooling, History, CI and releases, Ownership, Rollout, Risks, Open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A monorepo pays off when code that changes together lives together: atomic cross-project changes, one dependency version per library, shared tooling. It costs build and CI work: without affected-only builds and caching, every pull request runs everything and the team blames the monorepo. Migrations fail when history is squashed and blame is lost, when CI is ported job by job without change detection, when release processes that assumed one repo per artifact break silently, and when everything moves in one weekend. A good plan checks the decision, moves one repository at a time and keeps the old repositories read-only until the new path is proven.
</context>

<task>
Plan the migration of these repositories:
<repos>
{{repos}}
</repos>
{{#tooling}}
Tooling preference: {{tooling}}
{{/tooling}}

1. **Decision check.** In a few bullets, say whether the repositories share enough change, dependencies and ownership to justify a monorepo, and name any repository that should stay out (different access needs, open source with an external community, very large binaries, a separate compliance boundary). If the input lacks what you need to judge, say so.
2. **Target layout.** A directory tree (`apps/`, `packages/` or `services/`, `libs/`, `tools/`), naming conventions, and how internal dependencies are referenced (workspace protocol, path dependencies) instead of published versions.
3. **Tooling.** Recommend the build tool from the languages, size and preference, with the reason and what it must provide: a project graph, affected-only builds and tests, local and remote caching, and task pipelines. Show the root configuration skeleton.
4. **History.** Preserve history by importing each repository into its subdirectory (for example with `git filter-repo --to-subdirectory-filter` and a merge with `--allow-unrelated-histories`), keep or prefix tags, and handle large files and secrets found in history before import. Say how `git log --follow` and blame will work afterwards.
5. **CI and releases.** Path-based or graph-based change detection, required checks per project, cache strategy, and a CI time budget. For releases: per-project versioning and tags, changelog generation, and how each artifact's existing release pipeline is pointed at its subdirectory.
6. **Ownership.** CODEOWNERS per directory, branch protection, and review rules for shared libraries.
7. **Rollout.** Order the repositories (start with the one with the fewest dependents or the most cross-repo changes, say which and why), a pilot, a freeze window per repository, the cutover steps, redirects (archive the old repository with a pointer in its README, move open pull requests and issues), and rollback while the old repository is still intact.
8. Name risks with mitigation, and the metrics that show success (CI time per pull request, cross-project change lead time).
</task>

<constraints>
- Commands that rewrite history only ever run on fresh clones; say so next to them. Never on the original repositories.
- Do not recommend a tool feature you are not sure exists; describe the capability and say "check the tool's documentation".
- Do not invent repository sizes, team names or dependency versions.
- Keep each rollout step reversible until the old repository is archived.
{{> output/uncertainty}}
</constraints>

<output_format>
## Decision check
Bullets, ending with go, go with exclusions, or reconsider.
## Target layout
A tree in a fenced block, plus conventions.
## Tooling
Recommendation, reasons, root config skeleton.
## History
Numbered commands per repository, with the fresh-clone warning.
## CI and releases
Bullets and a pipeline sketch.
## Ownership
A CODEOWNERS sketch and rules.
## Rollout
A table: phase, repositories, steps, exit criteria, rollback.
## Risks
A table: risk, likelihood, mitigation.
## Open questions
Numbered.
</output_format>

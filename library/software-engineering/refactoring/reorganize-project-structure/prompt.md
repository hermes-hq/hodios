---
schema: 1
id: reorganize-project-structure
kind: prompt
title: Reorganize a project's folder structure
description: Moves a codebase from a messy or layer-based folder layout to a clear one, often grouped by feature, in scripted batches that update imports, keep git history and leave every commit building.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain, plan]
role: [software-engineer, tech-lead, frontend-engineer]
stack: []
requires: [repo-read, file-write, shell, git]
inputs: [repo]
output: [plan, diff]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [folder-structure, feature-folders, file-moves, import-paths, codebase-layout]
pairs_with:
  prompts: [fix-layering-violations, split-large-module]
  personas: [refactoring-specialist]
args:
  - name: project
    description: The repository or package, its current layout (paste a `tree -d -L 3` or describe it), and what is wrong with it, for example "everything in components/, services/ and utils/; one feature touches six folders".
    type: text
    required: true
  - name: target_layout
    description: Optional. The layout you want, if you already know. Otherwise one will be proposed.
    type: text
output_contract:
  format: markdown
  sections: [Current layout problems, Target layout, File mapping, Move plan, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an engineer who reorganises codebases so a reader can find a feature's code in one place. Layer-based layouts (`controllers/`, `services/`, `models/`, `components/`, `hooks/`, `utils/`) are easy to start with but scatter every feature across many folders, and `utils/` or `common/` grows into a junk drawer. Feature-based layouts group what changes together (`features/billing/` with its components, hooks, API calls and tests), keep a small shared core, and make module boundaries visible. The right layout follows the framework's conventions where they are strong (Rails, Django apps, Next.js routing directories, Android modules) rather than fighting them.

The move itself is where projects get hurt: big-bang moves conflict with every open branch, broken relative imports only show up at runtime in dynamic languages, path aliases, test configs, build globs, code owners files, Docker `COPY` lines and CI path filters all hard-code paths, and git loses track of history when a file is moved and heavily edited in the same commit. Safe moves are scripted, batched by feature, done with `git mv` in commits that contain only moves and import fixes, and verified by the build, the type check and the tests after each batch.
</context>

<task>
Reorganise {{project}}.

{{#target_layout}}Target layout requested: {{target_layout}}{{/target_layout}}

1. Describe the problems with the current layout using evidence from the repository: how many folders a typical feature touches, the size and contents of catch-all folders, and imports that cross between unrelated areas.
2. Propose the target layout (or check the requested one) as a tree, with a one-line rule for what goes where, following the framework's conventions. Note what stays where it is. Wait for approval.
3. Produce the file mapping: every file's current and new path, grouped into batches by feature or area, with shared code moved last.
4. List every place that hard-codes paths and must change with the moves: path aliases, test and build config globs, linters, code owners files, Dockerfiles, CI path filters, documentation links, dynamic imports and string-based module references.
5. For each batch, give a script that runs `git mv` and updates imports (with the language's tooling where possible, such as the IDE or a codemod, otherwise a reviewed search and replace), then runs the build, type check and tests. Keep each batch to moves and import fixes only, so git tracks the renames.
6. Recommend timing: merge or rebase open branches first, announce a short freeze, and land batches quickly; give the command teammates can use to rebase across the moves.
</task>

<constraints>
- No behaviour changes and no code edits beyond import paths and path configuration in the move commits.
- Do not move generated files, framework-mandated paths or public package entry points without saying what depends on them.
- Run the full check after each batch and report results; never batch the whole repository into one unverified commit.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Current layout problems
Evidence-based list.
## Target layout
A tree and placement rules.
## File mapping
Table by batch: current path, new path.
## Move plan
Hard-coded path locations to update, the batch scripts, and timing.
## Check
Build, type check and test results per batch.
</output_format>

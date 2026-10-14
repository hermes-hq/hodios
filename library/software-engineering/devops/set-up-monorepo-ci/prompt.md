---
schema: 1
id: set-up-monorepo-ci
kind: prompt
title: Set up monorepo CI for affected packages
description: Configures monorepo CI that builds and tests only the packages a change affects, using path filters or the Nx or Turborepo graph, with a remote cache and one stable required check.
category: devops
version: 1.0.0
status: incubating
stage: [build, verify]
role: [devops-engineer, software-engineer, tech-lead]
stack: [github-actions, gitlab-ci]
requires: [repo-read, file-write]
inputs: [repo, config]
output: [config, plan]
risk: edits-files
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [monorepo, affected-builds, nx, turborepo, build-cache, required-checks]
pairs_with:
  prompts: [speed-up-ci-pipeline, write-github-actions-workflow, configure-branch-protection]
args:
  - name: repo_layout
    description: How the monorepo is organised, which tool manages it (Nx, Turborepo, pnpm or npm workspaces, Bazel, plain folders) and what CI does today.
    type: text
    required: true
  - name: pain
    description: What is wrong now, for example "every PR runs all 40 packages for 35 minutes" or "required checks get stuck as pending".
    type: text
output_contract:
  format: markdown
  sections: [Approach, Config, Correctness checks, Verify, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Affected-only CI is easy to get almost right and dangerous to get wrong. The failure that matters is a false skip: a change to a shared package, a root lockfile, a tsconfig base or the CI file itself that does not trigger the packages that depend on it, so main goes red after merge. The second classic failure is required checks: when a whole job is skipped by a path filter at the workflow level, branch protection waits forever for a check that never reports. Graph-aware tools (Nx `affected`, Turborepo `--filter=...[base]`) compute dependents correctly but need the right base commit, which means full enough git history in CI and the merge base with the target branch, not the previous commit. A remote cache then makes unaffected work nearly free, but only if task inputs and environment variables are declared, otherwise it serves stale results.
</context>

<task>
Set up affected-only CI for this monorepo:
<layout>
{{repo_layout}}
</layout>
{{#pain}}
Current pain: {{pain}}
{{/pain}}

1. Read the workspace configuration (`nx.json`, `turbo.json`, `pnpm-workspace.yaml`, workspace `package.json`, Bazel files) and the existing CI files. Map which packages depend on which.
2. Choose the mechanism: the monorepo tool's own affected command when one is in use; path filters per package only for small repos without a dependency graph. Say why.
3. Compute the base correctly: on pull requests the merge base with the target branch; on main the last successful commit or the previous commit. Fetch enough history for that (a full fetch or a depth that covers it), and fall back to running everything when the base cannot be found.
4. List the global inputs that must trigger everything: root lockfile, root config (tsconfig base, lint config, toolchain versions), CI files, shared scripts. Wire them as "run all" triggers.
5. Configure the remote or CI cache for task outputs, declaring task inputs, outputs and the environment variables that change results, so a cache hit is never stale.
6. Keep one always-running summary job with a fixed name that succeeds when affected jobs pass or were correctly skipped. Do not put path filters at the workflow trigger level for jobs that are required checks.
7. Write the configuration and run the tool's dry-run (for example `nx show projects --affected` or `turbo run build --dry-run`) against a sample change to a leaf package and to a shared package, if a shell is available.
</task>

<constraints>
- Prefer a full run over a risky skip; any uncertainty about the dependency graph goes to "run all".
- Do not invent Nx, Turborepo or CI options; if unsure an option exists, say so instead of writing it.
- Remote cache credentials are secrets; reference them by name only and say which ones must be created.
- Do not restructure packages or move code as part of this change.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Approach
Mechanism chosen, how the base commit is found, and the expected time for a leaf change versus a shared change.

## Config
Every changed file with its path and full contents or a diff.

## Correctness checks
The global "run all" triggers and the dry-run results for a leaf and a shared change, or "not run".

## Verify
How to confirm on a real PR that skipped checks still report and branch protection is satisfied.

## Follow-ups
Secrets to create, branch protection changes, and cache inputs to review. "None" if empty.
</output_format>

---
schema: 1
id: set-up-ci-test-matrix
kind: prompt
title: Set up a CI test matrix
description: Writes a CI test matrix across language versions, operating systems and service versions, with include and exclude rules, a fail-fast choice and one summary job to require.
category: devops
version: 1.0.0
status: incubating
stage: [build, verify]
role: [devops-engineer, software-engineer, maintainer]
stack: [github-actions, gitlab-ci]
requires: [repo-read, file-write]
inputs: [repo, spec]
output: [config]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [ci, build-matrix, compatibility, required-checks]
pairs_with:
  prompts: [write-github-actions-workflow, speed-up-ci-pipeline, configure-branch-protection]
args:
  - name: support_targets
    description: What the project promises to support, for example "Python 3.10 to 3.13 on Linux and macOS, Postgres 14 and 16".
    type: text
    required: true
  - name: ci_provider
    description: CI system if the repo does not make it obvious, for example GitHub Actions or GitLab CI.
    type: string
output_contract:
  format: markdown
  sections: [Matrix, Config, Decisions, Verify, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A test matrix is how a project proves the support promise in its README. Done badly it does one of two things: it runs the full cross product (every version on every OS against every database), burning minutes on combinations nobody uses, or it tests only the newest version, so users on the oldest supported one find the breakage. Two quieter problems cause most pain: matrix job names change whenever a version is added, which silently breaks branch protection that required the old names, and `fail-fast` cancels sibling jobs so a single flaky OS hides whether the other combinations pass. The usual fix is a deliberate matrix (oldest and newest of each axis fully, the middle sparsely) plus one stable summary job that is the only required check.
</context>

<task>
Set up a CI test matrix for this support promise:
<support>
{{support_targets}}
</support>
{{#ci_provider}}
CI provider: {{ci_provider}}
{{/ci_provider}}

1. Read the repository first: existing CI files, the test command, version files and package metadata that already declare supported versions (`engines`, `python_requires`, `go.mod`, `rust-version`, target frameworks). If the support promise conflicts with what the metadata declares, point out the conflict and ask which wins.
2. List the axes (runtime version, OS, dependency or service version) and choose the combinations: full coverage for the oldest and newest supported value of each axis, sparse coverage for values in between, and slow or expensive combinations (macOS, Windows) only for the primary runtime unless a platform-specific code path exists. Show the job count before and after compared with the full cross product.
3. Express the choice with the provider's own matrix features (`strategy.matrix` with `include` and `exclude` in GitHub Actions, `parallel: matrix` in GitLab CI). Use service containers or images pinned to the exact service version per row.
4. Set `fail-fast: false` for test matrices so one failure does not hide the others, and say when `true` is the better choice (cost-sensitive, deterministic failures).
5. Mark a pre-release runtime row as allowed to fail (`continue-on-error` or `allow_failure`) when the user wants early warning without blocking merges.
6. Add a final summary job that depends on every matrix job, fails if any required row failed, and has a fixed name. That job is the one to require in branch protection.
7. Keep caching keyed per row (runtime version and OS in the cache key) so rows do not poison each other's caches.
8. Write the file and run the provider's linter if it is available (`actionlint`, `glab ci lint`).
</task>

<constraints>
- Never add support for a version the project does not claim to support, and never drop one silently; changes to the promise go under Follow-ups.
- Do not invent action names, image tags or matrix keywords; use only ones you are certain exist.
- Keep matrix row names readable (`py3.12-ubuntu`), since they appear in the checks list.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Matrix
A table of the rows that run, with job count compared with the full cross product.

## Config
The file path and the complete CI configuration.

## Decisions
One bullet each for fail-fast, allowed failures, the rows left out and why.

## Verify
Linter output or "not run", and how to trigger a first run.

## Follow-ups
Branch protection change to require the summary job, and any support-promise conflicts. "None" if empty.
</output_format>

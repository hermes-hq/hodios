---
schema: 1
id: write-github-actions-workflow
kind: prompt
title: Write a GitHub Actions workflow
description: Writes a secure, cached and least-privilege GitHub Actions workflow that fits the repository's real build and test commands. Use when adding CI, a release job or a scheduled task.
category: devops
version: 1.0.0
status: experimental
stage: [build, ship]
role: [devops-engineer, software-engineer]
stack: [github-actions]
requires: [repo-read, file-write]
inputs: [spec, repo]
output: [config]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [ci, least-privilege, supply-chain]
pairs_with:
  prompts: [speed-up-ci-pipeline]
args:
  - name: goal
    description: What the workflow must do and when, for example "run lint and tests on every PR and on pushes to main".
    type: text
    required: true
  - name: requirements
    description: Extra constraints such as OS or runtime versions, required secrets, deploy targets, or "must finish under 10 minutes".
    type: text
output_contract:
  format: markdown
  sections: [Workflow, Decisions, Verify, Follow-ups]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most CI workflows are copied from a template and then patched until they pass. The usual results are a token with write access to everything, unpinned third-party actions, no caching, and untrusted pull request data flowing into shell scripts. A workflow that is right the first time is short, uses the project's own commands, and grants only what each job needs.
</context>

<task>
Write a GitHub Actions workflow that does this: {{goal}}
{{#requirements}}
Requirements: {{requirements}}
{{/requirements}}

1. Inspect the repository first: languages, package manager and lockfile, the scripts or make targets that lint, build and test, runtime version files (`.nvmrc`, `.python-version`, `go.mod`, `rust-toolchain.toml`), and the workflows already in `.github/workflows/`. Reuse existing commands instead of inventing new ones.
2. Choose triggers that match the goal, including `paths` or `branches` filters when they avoid useless runs.
3. Set `permissions` at the workflow level to `contents: read`, and grant more only on the job that needs it, with a comment saying why.
4. Use the official setup action for the runtime with its built-in dependency cache keyed on the lockfile. Install with the lockfile-respecting command (`npm ci`, `pip install -r` with hashes, `cargo --locked`).
5. Add `concurrency` that cancels superseded runs on the same branch, and a `timeout-minutes` on every job.
6. Use a matrix only when the goal needs several versions or operating systems.
7. Write the file to `.github/workflows/<name>.yml`. If `actionlint` is available, run it and fix what it reports.
</task>

<constraints>
- Pin every third-party action to a full commit SHA with the version in a trailing comment. If you cannot look up the SHA, use the major version tag and list that action under Follow-ups.
- Use only actions you are certain exist. Never invent an action name or an input.
- Never place pull request titles, branch names, commit messages or other event fields directly inside a `run:` script. Pass them through `env:` and quote the variable.
- Do not use `pull_request_target` or expose secrets to jobs that run code from forks.
- Reference secrets by name only, and list every secret the user must create.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Workflow
The path, then the complete YAML file.

## Decisions
One bullet per non-obvious choice (trigger filters, permissions, cache key, matrix), each with the reason.

## Verify
How you checked the file (actionlint output, or "not run") and how the user can trigger a first run.

## Follow-ups
Secrets to create, actions still to pin, and branch protection settings to update. "None" if empty.
</output_format>

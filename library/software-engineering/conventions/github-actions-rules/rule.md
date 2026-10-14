---
schema: 1
id: github-actions-rules
kind: rule
title: GitHub Actions rules
description: Standing rules for GitHub Actions workflows covering least-privilege permissions, actions pinned to SHAs, no untrusted input in run steps, safe triggers, concurrency, caching and timeouts.
category: conventions
version: 1.0.0
status: incubating
stage: [build]
role: [devops-engineer, software-engineer]
stack: [github-actions]
requires: [none]
output: [config]
risk: read-only
invocation: user
model_tier: mid
level: intermediate
depth: specific
tags: [workflow-permissions, script-injection, action-pinning, oidc, concurrency-groups]
applies_to: [".github/workflows/*.yml", ".github/workflows/*.yaml", ".github/actions/**"]
pairs_with:
  rules: [dependency-hygiene-rules]
  prompts: [write-github-actions-workflow, fix-github-actions-workflow-error]
  personas: [devops-engineer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you write or change GitHub Actions workflows in this project:

**Know the setup first**
- Read the existing workflows, reusable workflows and composite actions before adding a new one. Reuse them instead of copying steps. Check whether jobs run on GitHub-hosted or self-hosted runners.

**Permissions**
- Set `permissions:` explicitly at the workflow level, starting from `contents: read`, and grant extra scopes per job only where needed (`pull-requests: write`, `id-token: write`). Never use `write-all`.
- Use OIDC (`id-token: write` with the cloud provider's login action) for cloud deployments instead of long-lived cloud keys in secrets.
- Reference secrets only in the steps that need them, pass them through `env:`, and never echo them or write them to files that become artefacts.

**Third-party actions**
- Pin third-party actions to a full commit SHA with the version in a comment (`uses: owner/action@<40-char-sha> # v4.2.0`). First-party `actions/*` may follow the project's policy, but SHA pinning is safer everywhere. Never reference a branch like `@main`.
- Prefer well-maintained actions with few permissions; a short shell step is often better than an unknown action.

**Untrusted input**
- Never interpolate untrusted event data directly into a `run:` script with the expression syntax: pull request titles and bodies, branch names, issue comments, commit messages and head refs can contain shell code. Pass them through an `env:` variable and quote it in the script (`"$PR_TITLE"`).
- Do not use `pull_request_target` or `workflow_run` to check out and build code from a fork; those run with secrets and write tokens. If such a trigger is unavoidable, never run the untrusted code and keep permissions minimal.
- Self-hosted runners must not run workflows from public forks.

**Reliability and cost**
- Add `timeout-minutes` to every job. Add a `concurrency` group to cancel superseded runs on pull requests (`cancel-in-progress: true`), but not on deploys to production, which should queue.
- Cache dependencies with the setup action's built-in cache or `actions/cache` keyed on the lockfile hash. Do not cache build outputs that hide real failures.
- Use `paths` or `paths-ignore` filters to skip irrelevant runs, but keep required status checks able to report (a skipped required check blocks merges).
- Pin language and tool versions (`node-version-file`, `python-version`) instead of floating on whatever the runner image has.
- Use a matrix only for combinations you actually support.

**Deployments**
- Deploy through `environment:` with protection rules and required reviewers for production. Keep deploy jobs separate from build and test jobs and pass artefacts between them, so what was tested is what ships.

**Readability**
- Name every job and non-obvious step. Keep long scripts in files in the repository instead of large inline `run:` blocks. Use `set -euo pipefail` in bash steps that run several commands.

**Before you finish**
- Lint workflows with actionlint if available, check YAML and expression syntax, and run the workflow on a branch or with `workflow_dispatch` before relying on it. Say what you checked and what can only be verified on GitHub.

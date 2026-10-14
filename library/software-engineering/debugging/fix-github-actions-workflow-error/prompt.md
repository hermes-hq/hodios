---
schema: 1
id: fix-github-actions-workflow-error
kind: prompt
title: Fix a GitHub Actions workflow error
description: Fixes GitHub Actions workflows that do not trigger, are skipped or fail on configuration, covering triggers and filters, if expressions, token permissions, secrets in forks, caching and matrix logic.
category: debugging
version: 1.0.0
status: incubating
stage: [build, ship]
role: [devops-engineer, software-engineer, maintainer]
stack: [github-actions]
requires: [none]
inputs: [config, logs, text]
output: [explanation, diff]
risk: read-only
invocation: user
effort: quick
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [github-token, workflow-yaml, workflow-triggers, token-permissions, ci-caching]
pairs_with:
  prompts: [triage-failing-ci, write-github-actions-workflow]
args:
  - name: symptom
    description: What goes wrong, for example "workflow never runs on pull requests", "job is skipped", "Resource not accessible by integration", "secret is empty on PRs from forks", "cache never hits", with the run log lines.
    type: text
    required: true
  - name: workflow
    description: The workflow YAML, plus how it is triggered (branch, PR from a fork, tag, schedule, manual) and the repository's Actions settings if relevant.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What GitHub did and why, Cause, Fix, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a CI engineer who knows how GitHub Actions decides what to run. Configuration bugs, not test failures, are the subject here:
- Not triggering: the workflow file is not on the default branch (for `schedule`, `workflow_dispatch` and some events), `paths` or `branches` filters exclude the change, YAML parsing errors (the Actions tab shows them), events created with the default `GITHUB_TOKEN` do not trigger other workflows, scheduled workflows are paused after 60 days without repository activity on public repos.
- Skipped: an `if:` expression that is false, or one that mixes literal text with an expression so it becomes a non-empty string that is always truthy, `needs` on a job that was skipped, so dependents skip too unless they use `always()` or `!cancelled()`.
- Expressions: comparing strings to booleans from `workflow_dispatch` inputs, `github.ref` being `refs/heads/main` not `main`, `contains()` on a string versus an array.
- Permissions: "Resource not accessible by integration" means the `GITHUB_TOKEN` lacks a scope; the `permissions:` block sets it per workflow or job, and the repository or organisation default may be read-only.
- Secrets: not passed to workflows triggered by `pull_request` from forks; `pull_request_target` gives access but runs with the base repository's privileges, so checking out and running the fork's code there is dangerous. Reusable workflows need `secrets: inherit` or explicit secrets.
- Caching: the key changes every run (includes a timestamp or the commit SHA), the path is wrong, or caches from other branches are not visible except from the default branch.
- Matrix: `include` and `exclude` semantics, `fail-fast` cancelling siblings, too many combinations.
- Concurrency groups cancelling runs, and runner images updated underneath the workflow.
</context>

<task>
Fix this workflow problem.

Symptom:
{{symptom}}

Workflow and trigger:
{{workflow}}

1. If you can read the repository, open the workflow files, any reusable workflows or composite actions they call, and the branch the event came from before answering.
2. Explain what GitHub did with this event and why: whether the workflow was triggered, which jobs and steps were evaluated, and which condition, filter, permission or setting decided it.
3. Name the cause. If it depends on a repository or organisation setting or a log you do not have, say where to look in the run's page or the settings, and stop.
4. Give the fix as a YAML diff, the smallest change that makes the intended behaviour explicit: corrected trigger or filter, a working `if:` expression, a `permissions:` block with the narrowest scopes needed, `secrets: inherit` or explicit secrets, a stable cache key from the lock file hash, or matrix and `needs` adjustments.
5. Give the check: the event to fire (push, PR, `workflow_dispatch`) and what the run should show.
</task>

<constraints>
- Do not grant `permissions: write-all` or broad scopes; grant only what the failing step needs.
- Never suggest checking out and running untrusted fork code under `pull_request_target` with secrets; explain the risk if the user proposes it.
- Do not suggest storing secrets in the workflow file, and do not print secrets in logs.
- Pin third-party actions to a version or commit as the workflow already does; do not downgrade pinning.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## What GitHub did and why
The decision path for this event.
## Cause
The cause, or where to look.
## Fix
YAML diff.
## Check
The event to fire and the expected run.
</output_format>

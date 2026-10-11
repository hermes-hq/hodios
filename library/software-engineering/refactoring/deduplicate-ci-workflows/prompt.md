---
schema: 1
id: deduplicate-ci-workflows
kind: prompt
title: Deduplicate copy-pasted CI pipelines
description: Merges copy-pasted CI jobs into reusable workflows, composite actions or templates, and proves each pipeline still runs the same steps with the same triggers and secrets.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [devops-engineer, software-engineer]
stack: [github-actions, gitlab-ci]
requires: [repo-read, file-write]
inputs: [repo, config]
output: [plan, diff, table]
risk: edits-files
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [ci-pipelines, reusable-workflows, composite-actions, ci-templates]
pairs_with:
  prompts: [write-github-actions-workflow, write-gitlab-ci-pipeline, speed-up-ci-pipeline]
args:
  - name: pipelines
    description: The CI files to deduplicate, as paths or pasted YAML, the CI system, and whether runners are hosted or self-hosted.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Duplication found, Plan, Diff, Equivalence table, Rollout]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
CI duplication grows by copying a working job and changing two lines. The tools to share it differ by system and have sharp edges. In GitHub Actions, a reusable workflow (`workflow_call`) shares whole jobs, but secrets are not inherited unless passed or `secrets: inherit` is used, `env` at the caller's workflow level does not flow in, and nesting is limited; a composite action shares steps inside a job, but cannot use `secrets` directly and needs `shell:` on every `run` step. In GitLab CI, `extends`, `!reference` and `include` share configuration, and YAML anchors only work within one file. Matrices remove duplication between near-identical jobs but change job names, which breaks required status checks in branch protection.

The risk is a pipeline that is shorter but does something different: a missed `if:` condition, a different trigger or path filter, a secret no longer available, different permissions (`permissions:` default to the caller's), a changed cache key, or a job renamed so a required check never reports and merges block or, worse, the check is silently dropped. Equivalence is shown by listing, for each pipeline and event, the jobs, conditions, steps, secrets and permissions before and after.
</context>

<task>
Deduplicate {{pipelines}}.

1. Read all pipeline files and list duplicated jobs and step sequences, with the differences between copies (inputs, versions, conditions, secrets, environments).
2. Propose the sharing mechanism per duplicate (reusable workflow, composite action, matrix, `extends`, `include`) with the reason, the inputs each takes, and how secrets, permissions and environment variables reach it. Name job ids so required checks keep their names, or list the branch protection changes needed. Wait for approval.
3. Write the shared units and rewrite callers. Pin third-party actions the way the repo already does (commit SHA or tag).
4. Build an equivalence table: for each pipeline and trigger, the jobs, conditions, steps, secrets and permissions before and after, marking every difference.
5. Give a rollout plan: validate with the CI system's linter (actionlint, GitLab CI Lint) if available, run on a branch, compare job logs and durations with a recent run, then merge.
</task>

<constraints>
- No change to triggers, path filters, conditions, environments, deployment approvals, secrets exposure or permissions unless listed as an intended difference.
- Never widen permissions or pass `secrets: inherit` to a workflow that does not need every secret; pass only what is used.
- Do not claim the pipelines were run; say what the user must run.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Duplication found
Table: duplicate, files, differences between copies.
## Plan
Shared units with inputs, secrets and permissions.
## Diff
The change.
## Equivalence table
Per pipeline and trigger: jobs, steps, secrets, permissions, before and after.
## Rollout
Lint, branch run and comparison steps, plus branch protection changes.
</output_format>

---
schema: 1
id: set-up-terraform-ci-workflow
kind: prompt
title: Set up a Terraform CI workflow
description: Writes CI that runs fmt, validate and plan on pull requests, posts the plan for review and applies the reviewed plan on merge, with locking, approvals and per-environment credentials.
category: devops
version: 1.0.0
status: incubating
stage: [build, ship]
role: [devops-engineer, sre]
stack: [terraform, github-actions, gitlab-ci]
requires: [repo-read, file-write]
inputs: [repo, config]
output: [config, checklist]
risk: edits-files
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [infrastructure-as-code, terraform-plan, plan-review, pull-request, drift-detection]
pairs_with:
  prompts: [review-iac-plan, set-up-keyless-ci-deploys, write-terraform-module]
args:
  - name: layout
    description: How the Terraform code is laid out (root modules per environment, workspaces), where state lives, which clouds, and how plans and applies are run today.
    type: text
    required: true
  - name: approval
    description: Who must approve applies and for which environments, for example "prod needs a second reviewer".
    type: text
output_contract:
  format: markdown
  sections: [Flow, Config, Credentials, Safety checks, Verify, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Running Terraform from laptops leads to applies nobody reviewed, state locks left behind, and drift between what is merged and what is deployed. Moving it to CI has its own traps. Applying a fresh plan on merge can apply something different from what reviewers saw, because main or the real infrastructure moved in between; the safer pattern applies the saved plan file from the reviewed commit, or re-plans and stops if it differs. Plans from pull requests can leak secrets in their output and, with untrusted forks, can run arbitrary code through providers and external data sources, so plan jobs need read-only credentials and must never run for forks with secrets. Each root module needs its own job so one environment's failure does not block others, and concurrency must be serialised per state to avoid lock fights.
</context>

<task>
Set up CI for this Terraform code:
<layout>
{{layout}}
</layout>
{{#approval}}
Approval rules: {{approval}}
{{/approval}}

1. Read the repository: root modules, backend configuration, provider and Terraform version constraints, `.terraform.lock.hcl`, and any existing CI or wrapper scripts.
2. On pull requests: detect which root modules changed (plus modules they use), and for each run `terraform fmt -check`, `init`, `validate` and `plan -out`, with `-lock-timeout` set. Post a readable plan summary to the pull request, with the full plan as an artifact, and mark a failed or destructive plan clearly.
3. Use read-only cloud credentials for plans and write credentials only for applies, both through OIDC federation scoped to the branch or environment.
4. On merge to main: apply per root module, serialised with concurrency per state, behind a protected environment with the approval rules. Apply the saved plan from the reviewed run if the CI system can pass it safely, or re-plan and fail if the plan differs from the reviewed one. Explain which you chose.
5. Pin the Terraform version and commit the provider lock file; cache provider plugins.
6. Never run plan with secrets for pull requests from forks.
7. Add a scheduled drift check that runs `plan -detailed-exitcode` and reports drift without applying.
8. Write the files and run the CI linter if available.
</task>

<constraints>
- Never auto-apply without a review step on production.
- Never print sensitive values; rely on Terraform's sensitive marking and do not echo variables.
- Do not use `-auto-approve` on a fresh plan that reviewers have not seen, unless the team accepts it explicitly for a non-production environment.
- Do not invent third-party actions; prefer plain CLI steps when unsure.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Flow
Pull request, merge and scheduled drift paths in numbered steps.

## Config
Workflow files with paths and full contents.

## Credentials
The roles needed (plan read-only, apply write) and their trust scope.

## Safety checks
Fork handling, plan-to-apply consistency, locking and concurrency.

## Verify
Linter output or "not run", and how to test with a no-op change.

## Follow-ups
Cloud roles to create, environments and approvals to configure. "None" if empty.
</output_format>

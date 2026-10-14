---
schema: 1
id: configure-github-actions-environments
kind: prompt
title: Configure GitHub Actions deployment environments
description: Configures GitHub Actions deployment environments with required reviewers, branch and tag rules, scoped secrets and variables, OIDC subjects per environment and safe concurrency for deploy jobs.
category: devops
version: 1.0.0
status: incubating
stage: [ship]
role: [devops-engineer, tech-lead]
stack: [github-actions]
requires: [repo-read, file-write]
inputs: [repo, config, text]
output: [config, checklist]
risk: edits-files
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [deployment-environments, approvals, secrets, oidc, branch-protection]
pairs_with:
  prompts: [write-github-actions-workflow, set-up-keyless-ci-deploys, design-ci-cd-pipeline]
args:
  - name: environments
    description: The environments and their rules, for example "staging deploys from main automatically, production needs approval from the platform team and only from release tags".
    type: text
    required: true
  - name: notes
    description: "Public or private repository and GitHub plan, cloud provider, how secrets are stored today, who may approve, and whether settings should be managed as code (Terraform or the API)."
    type: text
output_contract:
  format: markdown
  sections: [Environment design, Settings, Workflow changes, Cloud trust, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A GitHub Actions environment is the gate between a workflow and a deployment target, and it only protects what it is attached to. A job gets an environment's secrets and variables only when it declares `environment:`, and only after the protection rules pass, so production credentials should live in the production environment, never as repository secrets every job can read. Protection rules: required reviewers (people or teams; one approval is enough, and "prevent self-review" stops the person who triggered the run from approving it), a wait timer, deployment branch and tag rules (without them any branch, including a feature branch, can target production), and custom protection rules from apps. Repository admins can bypass rules unless that is turned off. When a job uses an environment, the OIDC token's subject becomes `repo:<owner>/<repo>:environment:<name>`, so the cloud trust policy should match the environment, not a branch. Deploy jobs need a `concurrency` group per environment with `cancel-in-progress: false`, so two deploys never run at once and a queued one is not cancelled mid-flight. Workflows triggered from forks do not get secrets, and `pull_request_target` jobs that check out fork code with environment access are a known way to leak them. Availability of environment features on private repositories depends on the GitHub plan.
</context>

<task>
Configure deployment environments for this repository:
<environments>
{{environments}}
</environments>
{{#notes}}
Notes:
{{notes}}
{{/notes}}

1. Read the workflows: which jobs deploy, how they authenticate to the cloud, which secrets and variables they read and where those are defined today, triggers (push, tags, `workflow_dispatch`, `pull_request_target`), and existing `environment:` and `concurrency` settings.
2. Design each environment: reviewers (teams over individuals), prevent self-review, admin bypass setting, wait timer if useful, allowed branches and tags, secrets and variables it holds. Check the plan supports these features for this repository.
3. Write the settings as code if the user wants it (Terraform `github_repository_environment` and related resources, or API calls), otherwise as an exact checklist for the settings page.
4. Change the workflows: add `environment:` (with a URL if useful) to deploy jobs only, move production secrets from repository to environment scope, add a `concurrency` group per environment with `cancel-in-progress: false`, set least-privilege `permissions` including `id-token: write` only where OIDC is used.
5. If the cloud uses OIDC, update the trust policy to match the environment subject, and remove broader branch-based conditions once the environment is in place.
6. Flag risky patterns found: production deploys reachable from untrusted triggers, secrets at repository level that only deploys need, jobs that bypass the environment.
7. Describe how to verify: a run from a disallowed branch is rejected, a production run waits for approval, the triggering user cannot self-approve, and the deploy job can still authenticate.
</task>

<constraints>
- Do not delete repository-level secrets until the environment-scoped replacements are in place and a run has used them; list the order.
- Do not weaken existing protection (for example removing reviewers) without the user's confirmation.
- Do not claim a feature is available on the user's plan without saying it must be checked.
- Do not put secret values in files or logs.

{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Environment design
Table: environment, reviewers, self-review, branches and tags, wait timer, secrets and variables.
## Settings
Terraform or API code, or a step-by-step settings checklist.
## Workflow changes
Diffs to workflow files.
## Cloud trust
Trust policy changes per environment, or "not applicable".
## Verification
Tests to run and expected results; risky patterns found.
</output_format>

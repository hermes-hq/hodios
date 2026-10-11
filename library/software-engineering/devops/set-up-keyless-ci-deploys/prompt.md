---
schema: 1
id: set-up-keyless-ci-deploys
kind: prompt
title: Set up keyless CI deploys
description: Replaces long-lived cloud keys in CI with OIDC workload identity federation, writing trust policies scoped to repo, branch and environment, least-privilege roles and a key-removal plan.
category: devops
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [devops-engineer, security-engineer]
stack: [github-actions, gitlab-ci, aws, gcp, azure]
requires: [none]
inputs: [config, text]
output: [config, code, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [oidc, workload-identity-federation, ci-credentials, least-privilege, trust-policy, secretless]
pairs_with:
  prompts: [plan-secrets-management, write-github-actions-workflow, respond-to-leaked-secret]
  personas: [devops-engineer]
args:
  - name: pipeline
    description: The CI workflow or pipeline that deploys today, how it authenticates to the cloud (stored keys, service account JSON), and what it deploys.
    type: text
    required: true
  - name: target
    description: CI system and cloud, for example "GitHub Actions to AWS" or "GitLab CI to GCP".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Trust design, Cloud setup, Pipeline changes, Permissions, Cutover]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Long-lived cloud keys in CI secrets are among the most commonly leaked credentials: they never expire, are often over-privileged, and are readable by anyone who can change a workflow. Major CI systems can issue a short-lived OIDC token per job that a cloud trusts directly (AWS IAM OIDC identity providers and role trust policies, GCP workload identity federation pools and providers, Azure federated credentials on an app registration or managed identity). The security of the result is entirely in the trust conditions. A trust policy that checks only the audience, or the organisation, lets any repository or any branch in that organisation assume the deploy role, including from a pull request. Conditions should pin the subject claim to the repository and to a protected branch, tag or deployment environment, and production should only trust the production environment, which has required reviewers. Pull requests from forks must never reach deploy roles. Each pipeline stage should get its own role with the permissions it needs, and the old keys must be deleted, not just left unused.
</context>

<task>
Target: {{target}}

<pipeline>
{{pipeline}}
</pipeline>

1. Design the trust: which jobs need cloud access, one role or identity per environment and purpose (plan versus apply, staging versus production), and the exact claims each trusts (issuer, audience, subject format for this CI system with repository, ref or environment).
2. Write the cloud-side setup as infrastructure code where possible (Terraform or the provider's CLI): the identity provider or pool, the roles or identities, and trust conditions using exact matches, not broad wildcards.
3. Write the pipeline changes: job permissions to request an ID token, the official authentication step or action for this cloud, the role per job, and removal of the stored key variables.
4. Scope permissions: least-privilege policies for each role based on what the pipeline deploys, with read-only roles for plan or pull request jobs.
5. Add protections: deployment environments with required reviewers for production, branch protection, and a check that fork pull requests cannot run privileged jobs.
6. Plan the cutover: run both in parallel briefly, confirm the new path in staging, switch production, then deactivate and delete the old keys and check audit logs for any remaining use.
</task>

<constraints>
- Never use wildcard subject conditions that cover all branches or all repositories for deploy roles.
- Mark the subject claim format and action or step versions as "to verify" against the CI system's current documentation.
- Do not output real account ids, project numbers or tenant ids; use placeholders.
{{> output/uncertainty}}
</constraints>

<output_format>
## Trust design
Table: Job | Environment | Role or identity | Trusted subject.

## Cloud setup
Code blocks.

## Pipeline changes
The updated workflow or pipeline.

## Permissions
Policy per role.

## Cutover
Numbered checklist ending with key deletion.
</output_format>

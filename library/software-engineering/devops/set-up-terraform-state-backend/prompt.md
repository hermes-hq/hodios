---
schema: 1
id: set-up-terraform-state-backend
kind: prompt
title: Set up a remote Terraform state backend
description: Sets up remote Terraform or OpenTofu state on S3, GCS or Azure Blob with locking, encryption, versioning, per-environment keys and a safe migration from local state.
category: devops
version: 1.0.0
status: incubating
stage: [build]
role: [devops-engineer, sre, architect]
stack: [terraform]
requires: [repo-read, file-write]
inputs: [repo, config, spec]
output: [code, config, checklist]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [iac, terraform-state, state-locking]
pairs_with:
  prompts: [structure-terraform-environments, write-terraform-module, resolve-terraform-drift]
args:
  - name: cloud
    description: Where state will live.
    type: enum
    enum: [aws, gcp, azure]
    default: aws
  - name: current_setup
    description: How state is handled today (local files, committed tfstate, one shared backend), how many environments and root modules there are, and the Terraform or OpenTofu version.
    type: text
    required: true
  - name: access
    description: Who and what needs state access (CI role, engineers, other teams reading outputs).
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, Bootstrap, Backend config, Access, Migration, Verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Terraform state holds every resource ID and often secrets in plain text (database passwords, private keys), so it needs the protection of a secret and the durability of a database. The common failures are: state committed to git, one state file for all environments so a dev plan can touch prod, no locking so two applies corrupt state, and a bucket without versioning so a bad write cannot be rolled back. The backend bucket is a chicken-and-egg problem: it must exist before `terraform init`, so it is created by a small separate bootstrap configuration (or by hand, documented), never by the configuration that uses it. On S3, recent Terraform (1.10 experimental, 1.11 and later) and OpenTofu (1.10 and later) versions support native lock files (`use_lockfile = true`) and Terraform has deprecated DynamoDB locking; older versions still need a DynamoDB table; GCS and Azure Blob lock natively. Backend blocks cannot use variables, so per-environment values go in partial configuration files passed with `-backend-config`.
</context>

<task>
Set up remote state on {{cloud}} for this setup:
{{current_setup}}
{{#access}}
Access needs: {{access}}
{{/access}}

1. If a repository is available, read every `backend` block, `*.tfstate` file location, `.gitignore`, version constraints and CI workflow first. Report whether any state or `.tfvars` with secrets is committed.
2. Bootstrap: a small separate root module (or documented manual steps) that creates the state bucket or container with versioning, encryption (customer-managed key if the org requires it), public access blocked, TLS-only access policy, lifecycle rules for old versions, and deletion protection. Locking: native lock file on S3 if the version supports it (say which version is needed), otherwise a DynamoDB table; GCS and Azure lock natively.
3. Key layout: one state per environment and per root module, e.g. `<env>/<component>/terraform.tfstate`, so the blast radius of a plan is one component in one environment.
4. Backend config: a `backend` block with only the fixed settings, plus a partial config file per environment (`backend/<env>.hcl`), and the exact `terraform init -backend-config=...` command.
5. Access: CI gets read-write to its environment's keys only; engineers get read on non-prod and break-glass for prod; consumers of outputs use `terraform_remote_state` read access or, better, published outputs (SSM parameters or similar).
6. Migration from the current setup, step by step: freeze applies, back up the current state file outside git, `terraform init -migrate-state`, confirm `terraform plan` shows no changes, then remove committed state from the repo and say that git history still holds it and the secrets in it must be rotated.
</task>

<constraints>
- Never tell the user to delete or overwrite a state file without a verified backup first.
- Do not run `init -migrate-state`, `apply` or any state command yourself; write them for the user to run, in order.
- State contains secrets: treat any committed state as a leaked-secret incident and say so.
- If the Terraform or OpenTofu version is unknown, state which features (native S3 locking) depend on it instead of assuming.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Assumptions
Bullets.
## Bootstrap
The bootstrap configuration as fenced `hcl` blocks with file paths, or the manual steps.
## Backend config
The `backend` block, one partial config per environment, and the init command.
## Access
Table: principal | environments | permission | how granted.
## Migration
Numbered steps with the command for each and the check that must pass before the next.
## Verify
How to prove locking works (two concurrent plans), versioning works (a restorable older version), and that no state remains in git.
</output_format>

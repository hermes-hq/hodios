---
schema: 1
id: iac-style-rules
kind: rule
title: Infrastructure as code style rules
description: Standing rules for Terraform, OpenTofu and similar IaC, covering pinned providers and modules, no hard-coded secrets or IDs, tags on every resource, validated variables, small state and plan review.
category: conventions
version: 1.0.0
status: incubating
stage: [build, review]
role: [devops-engineer, sre, architect]
stack: [terraform]
requires: [none]
risk: read-only
level: intermediate
tags: [infrastructure-as-code, state-management, resource-tagging, least-privilege, plan-review]
applies_to: ["**/*.tf", "**/*.tfvars", "**/*.tftest.hcl", "**/terragrunt.hcl"]
pairs_with:
  prompts: [write-terraform-module, review-iac-plan, reduce-cloud-spend]
  rules: [shell-script-rules]
  personas: [devops-engineer, platform-engineer]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you write or change infrastructure as code (Terraform, OpenTofu or a similar declarative tool):

**Versions**
- Pin the tool version in `required_version` and every provider in `required_providers` with a source and a pessimistic constraint (`~> 5.40`). Commit the dependency lock file (`.terraform.lock.hcl`).
- Pin modules to a release tag or exact version, never a branch. Upgrade providers and modules in their own change, with the plan reviewed.
- Match the versions and patterns the repository already uses; do not upgrade as a side effect.

**No secrets or hard-coded identifiers**
- Never write secrets, passwords, tokens or private keys in code, `.tfvars` committed to the repo, or outputs. Read them from a secret manager or generate them in the provider and store them there; mark sensitive variables and outputs `sensitive = true`.
- Remember that state files contain secret values in plain text: state lives in a remote backend with encryption, locking and restricted access, never in the repository.
- Do not hard-code account or project IDs, regions, ARNs, AMI or image IDs, IP addresses or domain names. Use variables, data sources or lookups.

**Variables and outputs**
- Give every variable a `type`, a `description`, and a `validation` block where values are constrained (allowed environments, CIDR format, name length). Use defaults only for values that are safe everywhere.
- Prefer object types for related settings over many loose strings. Avoid `any`.
- Give every output a description, and output only what callers need.

**Resources**
- Apply a standard set of tags or labels to every resource that supports them (for example owner, environment, service, cost centre, managed-by), through provider default tags where available, plus resource-specific tags.
- Name resources consistently with the project's convention; use `snake_case` for Terraform identifiers.
- Use `for_each` with stable keys rather than `count` for collections, so removing one item does not recreate the others.
- Secure defaults: encryption at rest, no public access unless the variable says so, least-privilege IAM written as explicit policy documents with no wildcard actions on wildcard resources, logging enabled.
- Use `lifecycle { prevent_destroy = true }` on stateful resources (databases, buckets with data, key material) and say so in a comment.

**Structure and state**
- Keep state small: one state per environment and per component (network, data, application), not one state for everything. Pass values between states through outputs and data sources, not copy-paste.
- Keep environments in separate directories or workspaces with the same modules and different variables; do not branch logic on environment names inside modules.
- Write reusable modules with a README, an example, and inputs and outputs only; no provider configuration inside modules.
- Use `moved` and `import` blocks for refactors and adoptions instead of manual state commands, and explain each.

**Changes and review**
- Run the formatter and validator (`fmt`, `validate`) and the project's linters or policy checks before proposing a change.
- Show the plan for every change and point out every destroy, replace and change to IAM, network exposure or data stores. Never suggest applying without a reviewed plan, and never suggest `-auto-approve` against production.
- Never edit resources by hand in the console to "fix" drift; change the code, or import the change, and say which.
- Ask before any change that destroys or replaces stateful resources, and give the backup or migration step first.

---
schema: 1
id: upgrade-terraform-provider-version
kind: prompt
title: Upgrade a Terraform provider across major versions
description: Upgrades a Terraform provider such as AWS, Azure or Google across major versions with no unplanned replacements, using the upgrade guide, moved and import blocks, and plan review.
category: migration
version: 1.0.0
status: incubating
stage: [maintain, operate]
role: [devops-engineer, sre]
stack: [terraform]
requires: [repo-read, file-write, shell]
inputs: [repo, config]
output: [diff, plan, checklist]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [provider-upgrade, terraform-plan, moved-blocks, lock-file, state-upgrade]
pairs_with:
  prompts: [refactor-terraform-without-recreating, review-iac-plan, fix-terraform-error]
  personas: [migration-engineer]
args:
  - name: project
    description: Provider and current and target versions, Terraform version, how many roots and environments, module sources, and how plans and applies run (local, CI, Terraform Cloud).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Upgrade path, Breaking changes that apply, Code changes, Plan review, Apply and rollback, Remaining risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Provider majors remove deprecated arguments, rename or split resources, and change defaults; the provider's upgrade guide lists them, and the plan shows where they hit. The rule is that the upgrade plan should contain no replacements or destroys that nobody can explain. Splits are the classic case: when a provider moves settings out of one resource into separate resources (as the AWS provider did with S3 bucket settings), the new resources must be imported, or the next apply tries to create them or drops settings. `moved` blocks handle renames without recreation, `import` blocks bring split-out resources under management, and `removed` blocks drop resources from state without destroying them. The provider upgrades the stored schema of each resource on the first apply, which is one-way for that state file, so state must be backed up and rollback means restoring it with the old provider pinned. Fixing all deprecation warnings on the current major first makes the jump smaller. The lock file must be updated for every platform that runs Terraform, or CI fails with checksum errors. Shared modules may pin the provider and block the upgrade.
</context>

<task>
Project: {{project}}

1. Read `required_providers`, the lock file, module sources and pins, and CI config. Run or ask for a plan on the current version to confirm a clean baseline with no drift.
2. Read the upgrade guide for each major crossed and list only the changes that touch resources and arguments used here.
3. Fix deprecation warnings on the current major first. Then raise the constraint, update the lock file for all platforms, and update modules that pin the provider.
4. Make code changes for each applicable breaking change, using `moved`, `import` and `removed` blocks so nothing is recreated or orphaned.
5. Run plans per environment and explain every update, replacement and destroy. Iterate until the plan contains only expected, explained changes, ideally none.
6. Give the apply order (lowest environment first), state backup steps and rollback. Do not run apply; leave it to the user.
</task>

<constraints>
- Never run `apply`, `state rm`, `state mv` or `import` commands against real state; write blocks and give commands for the user to run after review.
- Do not accept a replacement of a stateful resource (databases, buckets, volumes, DNS zones, keys) without explicit user confirmation.
- Do not claim a breaking change applies without checking the upgrade guide; mark it "to verify".
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Upgrade path
Current and target provider versions, hops, and the Terraform version required.
## Breaking changes that apply
Table: change | resources affected | fix (code, moved, import, removed block).
## Code changes
Per module or root, with files touched.
## Plan review
Per environment: summary of the plan and an explanation for every update, replace or destroy.
## Apply and rollback
Order of environments, state backups and how to go back.
## Remaining risks
Bullets, or "None".
</output_format>

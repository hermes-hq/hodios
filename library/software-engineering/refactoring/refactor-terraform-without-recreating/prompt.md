---
schema: 1
id: refactor-terraform-without-recreating
kind: prompt
title: Refactor Terraform without recreating resources
description: Restructures Terraform code into modules, renames resources or switches count to for_each using moved and import blocks or state moves, so the plan shows no destroy or replace.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [devops-engineer, sre]
stack: [terraform]
requires: [repo-read, file-write, shell]
inputs: [config, repo]
output: [diff, plan, config]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
tags: [infrastructure-as-code, terraform-state, moved-blocks, import-blocks, module-refactoring]
pairs_with:
  prompts: [write-terraform-module, review-iac-plan]
  personas: [devops-engineer]
  rules: [iac-style-rules]
args:
  - name: change
    description: The restructure you want, for example "move the VPC, subnets and NAT into a modules/network module", "rename aws_s3_bucket.b to aws_s3_bucket.assets", "switch the subnets from count to for_each keyed by AZ".
    type: text
    required: true
  - name: code_and_plan
    description: The current Terraform code involved, the Terraform or OpenTofu version, the backend, and the output of `terraform plan` after a first attempt if you have one.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Address mapping, Code changes, State moves, Plan check, Rollout]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a platform engineer who knows that Terraform tracks resources by address, so a refactor that changes an address looks to Terraform like "destroy the old, create the new" unless state is told otherwise. For a database, a bucket or a DNS zone that means data loss or an outage. The tools:
- `moved` blocks (Terraform 1.1 and later, and OpenTofu) declare `from` and `to` addresses in code, are reviewed like code, apply on the next plan, and work across module boundaries within the same state. They cannot move resources between separate states.
- `terraform state mv` does the same imperatively; it changes state immediately, outside review, so it needs a state backup and a lock.
- `import` blocks (Terraform 1.5 and later) bring existing resources into a new state, combined with `removed` blocks (1.7 and later) or `terraform state rm` to drop them from the old one, when splitting a state.
- `count` to `for_each` changes every address from an index to a key; each needs its own `moved` entry.
Some changes force replacement no matter what: changing a resource's type, or arguments marked as forcing new resources. Those cannot be refactored away and need a separate migration plan. The plan must show zero destroy and replace actions before anything is applied, in every workspace or environment that shares the code.
</context>

<task>
Plan this Terraform refactor.

Change:
{{change}}

Current code, version and plan:
{{code_and_plan}}

1. List every resource and module address that changes, old to new, including each `count` index or `for_each` key. Check the Terraform or OpenTofu version supports the blocks you will use.
2. Write the code change: the new module or names, and `moved` blocks for every changed address, kept in a file such as `moved.tf`. If the refactor splits or merges states, use `import` and `removed` blocks or a scripted `state mv` with a backup step, and explain why `moved` alone cannot do it.
3. If a first plan was given, read it and explain each destroy, replace or create, and add the missing mapping for it. Flag any change that forces replacement regardless of moves, with the argument responsible.
4. Give the plan check: run `terraform plan` (with `-detailed-exitcode` or a JSON plan check) in every workspace or environment and confirm zero destroys and replaces, and that remaining in-place updates are expected. Ask for the plan output and stop if you do not have it.
5. Give the rollout: apply order across environments, state backup before any imperative move, and when it is safe to delete the `moved` blocks (after every state that uses this code has applied, and never for published modules used by others).
</task>

<constraints>
- Never suggest applying while the plan shows any destroy or replace on a stateful resource, and never suggest `-target`, `-replace` or state edits as a shortcut without a backup and a stated reason.
- Do not invent resource arguments, provider behaviour or version numbers; say what to check in the provider documentation.
- Treat state files as sensitive; do not ask the user to paste them, only addresses and plan summaries.
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Address mapping
Table: old address, new address, mechanism (moved, import and removed, state mv).
## Code changes
The diff including moved, import or removed blocks.
## State moves
Imperative steps with backups, or "None needed".
## Plan check
Commands, and the analysis of any plan given.
## Rollout
Order across environments and when to remove moved blocks.
</output_format>

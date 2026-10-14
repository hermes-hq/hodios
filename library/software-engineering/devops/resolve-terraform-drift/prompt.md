---
schema: 1
id: resolve-terraform-drift
kind: prompt
title: Resolve Terraform drift
description: Works through drift between Terraform state and real infrastructure, deciding per resource whether to adopt or revert, and fixes code and state safely, then adds scheduled drift detection.
category: devops
version: 1.0.0
status: incubating
stage: [operate, maintain]
role: [devops-engineer, sre]
stack: [terraform]
requires: [repo-read, file-write]
inputs: [logs, repo]
output: [diff, report, checklist]
risk: edits-files
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [iac, drift-detection, terraform-state, clickops]
pairs_with:
  prompts: [import-infrastructure-into-terraform, review-iac-plan, fix-terraform-error]
args:
  - name: plan_output
    description: The output of `terraform plan -refresh-only` and/or a normal `terraform plan` showing the drift, with secrets redacted.
    type: text
    required: true
  - name: context
    description: What is known about how the drift happened (console change during an incident, another tool, autoscaling, a provider upgrade) and which environment this is.
    type: text
output_contract:
  format: markdown
  sections: [Drift inventory, Decisions, Changes, Commands, Prevention]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Drift is any difference between what Terraform's code and state say and what exists. Not all of it is a mistake: a security group rule added by hand during an incident may be the fix production now depends on, so running `apply` to "clean up" can cause a second outage. Each drifted attribute needs a decision: adopt it (change the code to match reality, then accept the refreshed state), revert it (keep the code and let apply restore it), or ignore it (attributes legitimately owned by something else, such as an autoscaler's desired count or tags added by a cost tool, belong in `lifecycle { ignore_changes }`). Some drift is noise from the provider: normalised JSON policies, default values filled in, or a provider upgrade changing a schema. `terraform plan -refresh-only` shows what reality changed without proposing infrastructure changes, and `apply -refresh-only` writes reality into state. Resources deleted outside Terraform need either re-creation or removal from state (a `removed` block or `state rm`); resources created outside it need `import`.
</context>

<task>
Resolve this drift:
<plan>
{{plan_output}}
</plan>
{{#context}}
Context: {{context}}
{{/context}}

1. If the repository is available, read the configuration for every drifted resource, including modules and `ignore_changes` already present.
2. Build an inventory: one row per drifted resource and attribute, classified as changed outside Terraform, deleted outside Terraform, created outside Terraform, provider noise, or owned by another system.
3. For each row, recommend adopt, revert, ignore or remove-from-state, with the reason and the risk of the opposite choice. Where the change may be an incident fix or the owner is unknown, mark it "confirm with owner" and do not decide it.
4. Write the code changes: updated arguments for adopted values, `ignore_changes` only for attributes truly owned elsewhere (never whole resources), `import` blocks for resources created outside, `removed` blocks for resources that should leave management.
5. Give the command sequence for the user to run: refresh-only plan, review, `apply -refresh-only` if adopting, then a normal plan that must show only the intended reverts, then apply.
6. Prevention: a scheduled drift check in CI (`terraform plan -detailed-exitcode` per root, alerting on exit code 2), and the access change that stops the source of drift (read-only console roles, break-glass with a follow-up ticket).
</task>

<constraints>
- Never recommend `apply` that reverts a manual change before the owner confirms it is not load-bearing.
- Never suggest `ignore_changes = all` or deleting state to make drift disappear.
- Do not run apply, import, state rm or any state-changing command yourself; you may only edit configuration files.
- Base each decision on the plan text given; if an attribute's meaning is unclear, say so rather than guessing.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Drift inventory
Table: resource | attribute | in code | in reality | class.
## Decisions
Table: resource | decision | reason | risk if wrong. Rows needing an owner say so.
## Changes
The configuration diff, as fenced blocks per file.
## Commands
Numbered commands for the user with what to check after each.
## Prevention
Bullets: the scheduled check and the access change.
</output_format>

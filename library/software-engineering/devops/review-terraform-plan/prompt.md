---
schema: 1
id: review-terraform-plan
kind: prompt
title: Review a Terraform plan before apply
description: Reads a Terraform or OpenTofu plan and flags destroys, replacements, drift, security exposure, cost jumps and changes outside the stated intent. Use before running apply, especially in production.
category: devops
version: 1.0.0
status: experimental
aliases: [review-iac-plan]
stage: [review, ship]
role: [devops-engineer, sre, software-engineer]
stack: [terraform]
requires: [none]
inputs: [logs, config]
output: [report, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [infrastructure-as-code, change-review, drift, blast-radius]
pairs_with:
  prompts: [write-terraform-module]
args:
  - name: plan
    description: Output of `terraform plan`, or of `terraform show -json` on a saved plan file.
    type: text
    required: true
  - name: intent
    description: What this change is supposed to do, for example "add a read replica to the orders database".
    type: text
  - name: environment
    description: Environment the plan targets.
    type: enum
    enum: [production, staging, development, unknown]
    default: unknown
output_contract:
  format: markdown
  sections: [Verdict, Summary, Dangerous changes, Unexpected changes, Cost, Before you apply]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
`terraform apply` does what the plan says, not what the author meant. Outages from infrastructure as code usually come from lines nobody read in a long plan: a database marked for replacement because one attribute changed, a bucket destroyed by a renamed resource, or drift that the apply silently reverts. Your job is to read every line so the person applying does not have to guess.
</context>

<task>
Review this plan for the {{environment}} environment.
{{#intent}}The change is meant to: {{intent}}{{/intent}}

{{plan}}

1. If you were given only the summary line ("Plan: 4 to add, 2 to change, 1 to destroy") or an excerpt with no resource blocks, ask for the full output or `terraform show -json` and stop. Do not guess which resources change.
2. Count the actions: create, update in place, replace (destroy then create, or create then destroy) and destroy. Check your counts against the plan's own summary line.
3. List every destroy and replace. For each, name the attribute that forces replacement if the plan shows it, say whether the resource holds state or traffic (databases, volumes, buckets, DNS records, load balancers, encryption keys, IAM roles in use, queues), and name what references it. Settings that remove the safety net, such as `skip_final_snapshot = true` or `deletion_protection = false`, make a destroy worse; call them out.
4. Flag security exposure: ingress open to `0.0.0.0/0` or `::/0`, public buckets or ACLs, IAM policies with wildcard actions or resources, encryption or logging turned off, deletion protection removed.
5. Compare every change against the intent. Changes the intent does not explain are likely drift, a provider upgrade or a mistake; list them. Read the "Objects have changed outside of Terraform" block if present, and say when applying would revert a manual hotfix someone made during an incident.
6. Note values that are `(known after apply)` on attributes other resources depend on, and any sensitive values the plan prints in clear text.
7. Cost: flag changes that move the bill, such as new or larger instances and databases, NAT gateways, load balancers, provisioned IOPS or throughput, higher counts and cross-region replication. Give a monthly figure only when you can justify it from the plan; otherwise name the line item to price.
8. Give the checks to run before applying: backups or snapshots to take, `moved` blocks or state moves that would turn a replace into an in-place change, `lifecycle` settings such as `prevent_destroy` or `create_before_destroy`, and whether to split the apply.
</task>

<constraints>
- Report only what is in the plan. Never invent resources, attributes or values.
- If the plan is truncated or you cannot tell whether an action is a replace, say so and treat it as a replace.
- Quote resource addresses exactly as they appear (`module.db.aws_db_instance.main`).
- Do not suggest running apply or any state-changing command yourself.
{{> output/uncertainty}}
</constraints>

<output_format>
## Verdict
One line: `apply`, `apply-with-care` (state the condition) or `do-not-apply`, and the main reason.

## Summary
`N to add, N to change, N to replace, N to destroy`, and whether it matches the plan's summary.

## Dangerous changes
Numbered, most dangerous first: resource address — action — why it is dangerous — how to make it safe. "None" if empty.

## Unexpected changes
Changes the intent does not explain, each with its likely cause. "None" if empty or if no intent was given.

## Cost
Bullets naming each cost-moving change, or "No material change".

## Before you apply
A short checklist of concrete actions.
</output_format>

---
schema: 1
id: review-iac-plan
kind: prompt
title: Review an infrastructure plan before apply
description: Reviews a Terraform plan or other IaC preview for destructive changes, drift, cost surprises and security misconfigurations. Use before running apply, especially in production.
category: devops
version: 1.0.0
status: incubating
stage: [review]
role: [devops-engineer, sre, security-engineer]
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
tags: [iac, terraform-plan, drift, blast-radius]
pairs_with:
  prompts: [write-terraform-module]
args:
  - name: plan_output
    description: Full output of terraform plan, terraform show -json, pulumi preview --diff or a CloudFormation change set.
    type: text
    required: true
  - name: environment
    description: Which environment this applies to, e.g. prod, staging, shared networking.
    type: string
output_contract:
  format: markdown
  sections: [Verdict, Destructive changes, Security, Cost, Drift and surprises, Before you apply]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A plan is the last cheap moment to stop an outage. Reviewers skim the summary line ("2 to add, 1 to change, 1 to destroy") and miss that the one destroy is the production database, or that an innocent rename forces replacement of a load balancer and everything that references its ID. Your job is to read every resource change the way an experienced platform engineer does and say plainly whether it is safe to apply.
</context>

<task>
Review this plan{{#environment}} for the {{environment}} environment{{/environment}}:
{{plan_output}}

1. If you were given only the summary line or a truncated plan, ask for the full output (or `terraform show -json`) and stop.
2. Classify every resource change: create, update in place, replace (destroy then create, or create before destroy), destroy, move, import, or read.
3. Destructive changes: list every destroy and replace. For each, name the attribute that forces replacement, whether the resource holds state (databases, buckets, volumes, queues, DNS zones, KMS keys, IAM roles in use), and what depends on it. Flag values shown as "known after apply" on IDs that other resources reference, because they cascade into further replacements.
4. Drift: report anything under "Objects have changed outside of Terraform" and any in-place update to attributes the code change does not explain. Say whether applying would revert a manual hotfix.
5. Security: public ingress (0.0.0.0/0 or ::/0) on non-HTTP ports, public buckets or ACLs, IAM wildcards, encryption or logging turned off, secrets in plain attributes, deletion protection removed.
6. Cost: new or larger instances, NAT gateways, provisioned IOPS or throughput, load balancers, increased counts, cross-region replication. Give an order-of-magnitude monthly estimate only when you can justify it; otherwise name the line item to price.
7. Give a verdict.
</task>

<constraints>
- Only report what is in the plan. Do not invent resources, attributes or values; quote the resource address for every finding.
- Treat a production-environment destroy of a stateful resource as blocking unless the plan shows a `moved` block or the user says it is intended.
- Keep findings to what changes the apply decision. No style comments on the code.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: safe to apply | apply after changes | do not apply. Then one sentence why.
## Destructive changes
A table: resource address, action, forcing attribute, holds state (yes/no), dependents. "None" if empty.
## Security
Numbered findings: resource address, the problem, the fix.
## Cost
Bullets, or "No material change".
## Drift and surprises
Bullets, or "None".
## Before you apply
A checklist: backups or snapshots to take, `moved` blocks or `lifecycle` settings to add, people to notify, and the `-target` or staged apply to use if the change should be split.
</output_format>

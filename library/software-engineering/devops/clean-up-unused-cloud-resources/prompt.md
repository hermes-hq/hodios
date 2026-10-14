---
schema: 1
id: clean-up-unused-cloud-resources
kind: prompt
title: Clean up unused cloud resources safely
description: Finds orphaned volumes, snapshots, IPs, load balancers and idle instances with evidence, then runs a safe tag, notify, stop, snapshot and delete process with a recovery path.
category: devops
version: 1.0.0
status: incubating
stage: [operate, maintain]
role: [devops-engineer, sre]
stack: [aws, gcp, azure]
requires: [none]
inputs: [dataset, text]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [finops, orphaned-resources, resource-cleanup, cost-hygiene]
pairs_with:
  prompts: [reduce-cloud-spend, set-up-cloud-cost-allocation, resolve-terraform-drift]
args:
  - name: inventory
    description: A resource listing or cost export (CLI output, CSV, inventory tool report) with types, IDs, creation dates, tags, attachment state and recent utilisation if available.
    type: text
    required: true
  - name: cloud
    description: Provider.
    type: enum
    enum: [aws, gcp, azure]
    default: aws
  - name: policy
    description: Any rules the organisation has, such as notice periods, environments that must not be touched, or retention rules for snapshots.
    type: text
output_contract:
  format: markdown
  sections: [Candidates, Evidence gaps, Process, Commands, Prevention]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Unused resources are easy to find and dangerous to delete. An unattached volume may be the only copy of data from a terminated instance; an "idle" instance may be a quarterly batch host or a disaster recovery standby; an old snapshot may be the one a compliance rule requires; an elastic IP may be allow-listed by a partner; a resource created outside Terraform may still be referenced by it. Safe cleanup is a process, not a script: collect evidence (attachment state, last activity metrics, last API access in audit logs, references in IaC and DNS), find an owner, tag the resource with a deletion date, notify, then make the change reversible before it is permanent (stop before terminate, snapshot before deleting a volume, release IPs last). The real win is prevention: required owner tags, TTL tags on non-production resources, and automatic cleanup of known waste such as incomplete multipart uploads and old images.
</context>

<task>
Plan a safe cleanup on {{cloud}} from this inventory:
{{inventory}}
{{#policy}}
Policy: {{policy}}
{{/policy}}

1. Classify candidates: unattached volumes or disks, snapshots and images with no recent use, unassociated static IPs, load balancers with no healthy targets or traffic, idle instances or databases (low CPU and network over a stated window), empty or stale buckets, old container images, unused NAT gateways and endpoints, and resources in regions the organisation does not use.
2. For each candidate, give the evidence from the inventory, the evidence still missing (owner, audit-log activity, IaC or DNS references, backup or compliance role), and a confidence level. Do not mark anything safe to delete on the inventory alone when key evidence is missing.
3. Rank by confidence first and by likely saving second. Name the cost driver of each; do not invent prices.
4. Process: tag with `cleanup-candidate` and a date, notify owners through the stated channel, wait the notice period, apply a reversible step (stop, detach, snapshot, remove from load balancer), wait again, then delete. Resources managed by IaC are removed in code, not in the console.
5. Write the commands or IaC changes for each step, grouped so they can be reviewed; destructive commands are listed separately and marked for the user to run after confirmation.
6. Prevention: required owner and TTL tags, a scheduled report of new candidates, and lifecycle rules for snapshots, images and multipart uploads.
</task>

<constraints>
- Never recommend deleting anything without a reversible step or backup first, unless it holds no data (an unassociated IP) and the owner has confirmed.
- Never touch production or anything the policy excludes without explicit owner confirmation.
- Do not run commands; list them. Mark every destructive command clearly.
- Use only CLI commands and flags that exist; mark any you are unsure of.
{{> output/uncertainty}}
</constraints>

<output_format>
## Candidates
Table: resource | type | evidence | missing evidence | confidence | cost driver.
## Evidence gaps
Bullets: what to check for the medium and low confidence items and how.
## Process
Numbered stages with waiting periods.
## Commands
Fenced blocks per stage; destructive ones under a "Run only after confirmation" heading.
## Prevention
Bullets.
</output_format>

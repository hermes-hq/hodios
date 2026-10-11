---
schema: 1
id: write-cloudformation-template
kind: prompt
title: Write a CloudFormation template
description: Writes an AWS CloudFormation template with parameters, conditions, outputs, least-privilege IAM, deletion and update policies, cfn-lint checks and a change-set based deploy.
category: devops
version: 1.0.0
status: incubating
stage: [build]
role: [devops-engineer, backend-engineer]
stack: [aws]
requires: [repo-read, file-write]
inputs: [spec, repo]
output: [config, checklist]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [cloudformation, infrastructure-as-code, change-sets, stack-policy, cfn-lint]
pairs_with:
  prompts: [review-iac-plan, review-cloud-iam-policy, write-terraform-module]
args:
  - name: resources
    description: What the template must create (for example "an SQS queue with a dead-letter queue and an IAM role for a consumer"), per-environment differences and how stacks are deployed today.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Template, Decisions, Deploy, Verify, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
CloudFormation is still the native way many AWS teams manage infrastructure, and its traps are specific. Some property changes replace a resource rather than update it, which for a database or bucket means data loss unless `DeletionPolicy` and `UpdateReplacePolicy` are set to `Retain` or `Snapshot`. Hard-coded physical names block replacement and collide across environments. Deploying with `update-stack` directly hides what will change; change sets show replacements before they happen. Stacks that fail during creation roll back to `ROLLBACK_COMPLETE` and must be deleted before a retry; stacks that fail during update can get stuck in `UPDATE_ROLLBACK_FAILED`. An export cannot be changed or deleted while another stack imports it, so exports freeze the exporting stack's interface. IAM written with wildcards to "make it work" stays forever. `cfn-lint` catches most invalid properties before deploy, and `cfn-guard` or similar can check policy rules.
</context>

<task>
Write a CloudFormation template for:
<resources>
{{resources}}
</resources>

1. Read the repository: existing templates, naming and tagging conventions, how parameters and environments are handled, and the deploy scripts or pipeline. Follow existing conventions and do not introduce a second IaC tool. If the team uses SAM or CDK, say so and ask whether raw CloudFormation is still wanted.
2. Write the template in YAML: `Parameters` with allowed values or patterns, `Conditions` for environment differences, `Mappings` only where a table is clearer, and `Outputs` for values other stacks or apps need (exports only when cross-stack references are really needed).
3. Let CloudFormation generate physical names unless a fixed name is required; when it is, include the environment and explain the replacement consequence.
4. For stateful resources (databases, buckets, tables, queues with important messages) set `DeletionPolicy` and `UpdateReplacePolicy`, and enable encryption, backups or versioning as fits.
5. IAM: one role per consumer, actions and resource ARNs scoped with `!GetAtt` and `!Sub`, no `*` on actions or resources unless the service requires it, in which case comment why.
6. Tag every taggable resource with the project's tags.
7. Deploy: use change sets (`aws cloudformation deploy` creates them; `--no-execute-changeset` to review first; `--capabilities CAPABILITY_IAM` or `CAPABILITY_NAMED_IAM` when the template creates IAM resources), stack termination protection for production, and a stack policy for critical resources if wanted.
8. Run `cfn-lint` on the template if available and fix what it reports.
</task>

<constraints>
- Do not invent resource types, properties or intrinsic function behaviour; mark anything you are unsure of.
- Never put secrets in parameters defaults or the template; use dynamic references to Secrets Manager or SSM SecureString.
- Do not deploy anything; changes are to files only.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Template
The path and full YAML template.

## Decisions
One bullet each for naming, retention policies, IAM scope, and conditions or parameters.

## Deploy
The change-set based deploy commands per environment and the review step.

## Verify
`cfn-lint` output or "not run", and what to check in the change set (replacements especially).

## Follow-ups
Termination protection, stack policy, and resources that should move to separate stacks. "None" if empty.
</output_format>

---
schema: 1
id: convert-infrastructure-between-iac-tools
kind: prompt
title: Convert infrastructure code between IaC tools
description: Moves live infrastructure from one IaC tool to another, such as CloudFormation or CDK to Terraform, with retain policies, imports and no-change plans so nothing is recreated.
category: migration
version: 1.0.0
status: incubating
stage: [plan, build, maintain]
role: [devops-engineer, sre, architect]
stack: [terraform, aws]
requires: [repo-read, file-write, shell]
inputs: [repo, config]
output: [code, plan, checklist]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [cloudformation, cdk, pulumi, resource-import, iac-conversion]
pairs_with:
  prompts: [import-infrastructure-into-terraform, refactor-terraform-without-recreating, review-iac-plan]
  personas: [migration-engineer]
args:
  - name: source
    description: The current tool (CloudFormation, CDK, Pulumi, Terraform), stacks or projects involved, and how deployments run.
    type: text
    required: true
  - name: target
    description: The target tool and its conventions (state backend, module layout, naming).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Inventory, Hand-off design, Converted code, Cutover steps, Rollback, Remaining risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Rewriting infrastructure code in a new tool is the easy half; the hard half is moving ownership of live resources without either tool deleting or recreating them. Each tool deletes what disappears from its code: removing a resource from a CloudFormation or CDK stack deletes it unless `DeletionPolicy: Retain` (and `UpdateReplacePolicy`) is set and deployed first; Pulumi and Terraform need a state removal without destroy (`pulumi state delete` or a Terraform `removed` block with destroy disabled). The target tool must then import each resource by its physical id, and its first plan must show no changes; any difference means the code does not match reality. CDK generates physical names with hashes and creates resources implicitly (roles, policies, log groups, custom resource Lambdas), so the inventory must come from the synthesized template or deployed stack, not the CDK source. Cross-stack exports block stack deletion while something imports them. Conversion tools produce a draft that needs cleanup into modules and variables. Both tools must never manage the same resource at the same time, or each deploy will fight the other.
</context>

<task>
Source: {{source}}
Target: {{target}}

1. Read the source code and, for CDK, the synthesized templates. Build the inventory from deployed resources, including implicit ones, and mark stateful resources.
2. Design the hand-off per resource: retain or state removal in the source, import in the target. Order stacks so cross-stack references and exports are handled.
3. Write the target code, starting from a converter's output if useful, then clean it into the target's conventions. Match every attribute to the deployed value.
4. Write import blocks or commands for each resource. Produce a plan and iterate until it shows no changes.
5. Write the cutover steps: deploy retain policies in the source, confirm them, import in the target with a no-change plan, then remove resources from the source and delete the now-empty stack. Pause for user confirmation before each step that changes either tool's state.
6. Write rollback for each step and update CI so only the target tool deploys these resources.
</task>

<constraints>
- Never run deploy, apply, destroy, stack deletion or state commands; give them to the user with the check that must pass first.
- Do not proceed past a step whose plan shows changes to stateful resources.
- Do not drop implicit or generated resources from the inventory because they are not in the source code.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Inventory
Table: resource | logical id or address | physical name or id | stateful | target address.
## Hand-off design
How each resource leaves the source tool without deletion and enters the target tool.
## Converted code
The target code, cleaned up, with differences from the generated output.
## Cutover steps
Ordered steps with the check after each, ending with a no-change plan in the target.
## Rollback
How to return management to the source tool at each step.
## Remaining risks
Bullets, or "None".
</output_format>

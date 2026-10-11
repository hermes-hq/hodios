---
schema: 1
id: import-infrastructure-into-terraform
kind: prompt
title: Import infrastructure into Terraform
description: Brings cloud resources created by hand under Terraform or OpenTofu management with import blocks, matching configuration, a zero-change plan, state layout and a guard against later drift.
category: devops
version: 1.0.0
status: incubating
stage: [maintain, build]
role: [devops-engineer, sre]
stack: [terraform]
requires: [none]
inputs: [text, config]
output: [code, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [iac, terraform-import, drift-detection, state-management, click-ops, moved-blocks]
pairs_with:
  personas: [devops-engineer]
  prompts: [review-iac-plan, write-terraform-module]
args:
  - name: resources
    description: The existing resources to import with their identifiers and current settings (CLI describe output or console details), and how they relate to each other.
    type: text
    required: true
  - name: setup
    description: Terraform or OpenTofu version, provider and version, backend for state, and any existing Terraform code or modules the resources should join.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Inventory, Import plan, Configuration, Zero-change check, Drift guard]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Importing click-ops infrastructure is risky because the first `apply` after an import enforces the configuration on a live resource. If the written configuration differs from reality (a missing tag, a default the provider sets differently, an inline rule versus a separate rule resource) Terraform will change or even replace production. The safe method is: inventory what exists, decide the target structure (which state, which module, resource addresses), use declarative `import` blocks (Terraform 1.5 and later, and OpenTofu) so imports are reviewed in a plan rather than run as one-off commands, optionally generate starting configuration with `-generate-config-out` and then clean it, and iterate until `plan` shows zero changes before anything is applied. Watch for resources represented two ways (security group rules inline and as separate resources, bucket settings split across several resources in newer AWS providers), fields that force replacement, sensitive values that end up in state, and dependencies that were created implicitly by the console. After import, drift returns unless console changes stop and drift is detected on a schedule.
</context>

<task>
Setup: {{setup}}

<resources>
{{resources}}
</resources>

1. Build an inventory: each resource with its provider resource type, import ID format, target address in Terraform, and dependencies. Flag resources that map to several Terraform resources or that should stay unmanaged.
2. Propose where they live: state boundaries (by environment and blast radius), modules, and naming of addresses so later refactors use `moved` blocks rather than re-imports.
3. Write `import` blocks for each resource, and the configuration that matches current reality exactly, including tags and settings that look like defaults. Call out attributes that force replacement if they differ.
4. Describe the iteration: run plan, read every proposed change, adjust configuration (not the resource) until the plan shows only imports and no changes, and what to do with attributes the provider cannot read back.
5. Handle secrets that will appear in state and how the state backend is protected.
6. Add a drift guard: scheduled plan in CI that alerts on changes, a policy or permission change that stops console edits in production, and a process for emergency manual changes.
</task>

<constraints>
- Never suggest `apply` before a zero-change plan has been reviewed.
- Use the import ID formats and resource types of the stated provider version; mark any you are unsure of to verify in the provider documentation.
- Do not invent resource settings; if the given details are incomplete, list the describe commands needed to fetch them.
{{> output/uncertainty}}
</constraints>

<output_format>
## Inventory
Table: Resource | Type | Import ID | Target address | Notes.

## Import plan
State boundaries, modules and order.

## Configuration
HCL code blocks: import blocks and resources.

## Zero-change check
Steps and what to do with each kind of diff.

## Drift guard
Bullets.
</output_format>

---
schema: 1
id: deploy-to-azure-app-service
kind: prompt
title: Deploy a web app to Azure App Service
description: Deploys a web app to Azure App Service with deployment slots and swap, settings from Key Vault through managed identity, health check, scale rules and a CI deploy without stored credentials.
category: devops
version: 1.0.0
status: incubating
stage: [ship, operate]
role: [backend-engineer, devops-engineer, fullstack-engineer]
stack: [azure]
requires: [repo-read, file-write]
inputs: [repo, text]
output: [config, checklist]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [app-service, deployment-slots, key-vault, managed-identity, slot-swap]
pairs_with:
  prompts: [write-azure-devops-pipeline, set-up-keyless-ci-deploys, choose-app-hosting]
args:
  - name: app
    description: The app (runtime and version, code or container deploy, startup command), its database and dependencies, and existing Azure resources.
    type: text
    required: true
  - name: iac
    description: Bicep, Terraform, Azure CLI scripts or portal; the user's choice.
    type: string
output_contract:
  format: markdown
  sections: [Setup, Config, Slots and swap, Verify, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
App Service is quick to start and easy to run badly. Deploying straight into production restarts the app and drops requests; deployment slots fix this, but only if slot-specific settings (connection strings that must not move during a swap) are marked as sticky and the staging slot is warmed before the swap. Free and Basic tiers lack slots and autoscale, which decides the plan tier more than CPU does. Secrets pasted into app settings are visible to anyone with portal access; Key Vault references resolved through the app's managed identity avoid that. The health check path takes unhealthy instances out of rotation only when more than one instance runs. "Always On" matters for apps with background work or slow first requests. Publish profiles are long-lived credentials; federated identity from CI is better.
</context>

<task>
Deploy this app to Azure App Service:
<app>
{{app}}
</app>
{{#iac}}
Infrastructure as code: {{iac}}
{{/iac}}

1. Read the repository: runtime and version, build output, startup command, port handling for containers, health endpoint, configuration and secrets used, and existing infrastructure or pipeline files.
2. Plan and tier: pick a tier that supports slots and autoscale if the app needs zero-downtime deploys (say which tiers), Linux or Windows from the runtime, and the region.
3. App settings: runtime stack, startup command, Always On, HTTPS only, minimum TLS version, health check path, and settings marked slot-sticky where they must not swap.
4. Identity and secrets: a system-assigned or user-assigned managed identity with access to Key Vault (RBAC role scoped to the vault), and app settings that use Key Vault references instead of values.
5. Slots: a staging slot, deploy there, warm it with the health check or application initialization paths, then swap. Explain what swaps and what stays.
6. Scale: instance count of at least two for production if the health check should matter, and autoscale rules on CPU or HTTP queue length with min and max.
7. CI deploy: workload identity federation (GitHub Actions or Azure Pipelines service connection) instead of a publish profile, deploying to the staging slot and swapping after a smoke check.
8. Write the files and validate them (`az bicep build`, `terraform validate` or the CI linter) if available.
</task>

<constraints>
- Do not store secrets as plain app settings or in the repo; use Key Vault references.
- Do not deploy straight to the production slot when a slot-capable tier is used.
- Do not invent resource properties or tier capabilities; say when unsure and tell the reader to confirm against the current tier comparison.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Setup
Plan tier, OS, runtime, identity and scale, with reasons.

## Config
Infrastructure and pipeline files with paths and full contents.

## Slots and swap
Sticky settings, warm-up, swap and swap-back commands.

## Verify
Validation results and the checks after the first swap.

## Follow-ups
Key Vault access to grant, DNS and certificates, and alerts. "None" if empty.
</output_format>

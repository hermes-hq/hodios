---
schema: 1
id: write-azure-bicep-template
kind: prompt
title: Write an Azure Bicep template
description: Writes Azure infrastructure in Bicep with modules, decorated parameters, per-environment parameter files, unique naming, managed identities with role assignments, linting and a what-if deploy.
category: devops
version: 1.0.0
status: incubating
stage: [build]
role: [devops-engineer, backend-engineer]
stack: [azure]
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
depth: specific
tags: [bicep, infrastructure-as-code, arm, managed-identity, what-if]
pairs_with:
  prompts: [review-iac-plan, deploy-to-azure-app-service, write-terraform-module]
args:
  - name: resources
    description: What the template must create (for example "a storage account, a Key Vault and a Function App that reads both through a managed identity"), the environments, and how deployments run today.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Files, Decisions, Deploy, Verify, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Bicep compiles to ARM JSON and deploys at a scope set by `targetScope` (resource group by default, or subscription, management group or tenant). Its traps are Azure's. Many names are global and strict: storage accounts must be 3 to 24 lowercase letters and digits, Key Vault names 3 to 24 characters, so names are built with an environment token plus `uniqueString(resourceGroup().id)` and checked against each type's rules. Every resource declares an API version; inventing one fails at deploy, so use versions from the documentation or existing templates and let the linter flag outdated ones. Deployments are incremental by default; complete mode deletes resources not in the template, which is rarely what anyone wants. `az deployment group what-if` shows creates, changes and deletes before they happen. Access should use managed identities plus role assignments, named with `guid()` over scope, principal and role so redeploys are idempotent, and built-in role definition ids must be the real GUIDs, not guesses. Parameters take decorators (`@secure()`, `@allowed`, `@minLength`, `@description`), per-environment values go in `.bicepparam` files, secrets come from Key Vault with `getSecret()` when passed to modules, and outputs must never contain secrets (the linter checks this). Azure Verified Modules in the public registry cover many resources and are worth using if the team allows them. Deployment stacks can manage lifecycle and deny manual changes.
</context>

<task>
Write Bicep for:
<resources>
{{resources}}
</resources>

1. Read the repository: existing Bicep or ARM, `bicepconfig.json`, module layout, naming and tagging conventions, parameter files, and the pipeline that deploys. Follow existing conventions and do not introduce a second IaC tool; if the team uses Terraform, say so and ask whether Bicep is still wanted.
2. Choose the scope and structure: a `main.bicep` that wires modules, one module per logical component, and `.bicepparam` files per environment. Say whether you use Azure Verified Modules or local modules and why.
3. Write parameters with types and decorators, and build names from a prefix, the environment and `uniqueString` where the resource type needs global uniqueness; check each name against its type's length and character rules.
4. Write the resources with API versions you can source, secure defaults (HTTPS only, TLS 1.2 or later, public network access off where the design allows, diagnostic settings if a workspace is given), and tags on everything taggable.
5. Use managed identities and role assignments with `guid()` names and the correct built-in role ids; mark any role id you could not confirm.
6. Reference secrets with Key Vault `getSecret()` or `@secure()` parameters; output only non-secret values such as ids, names and endpoints.
7. Run `az bicep build` or the linter if available and fix what it reports.
</task>

<constraints>
- Do not use complete deployment mode unless the user asks and accepts the deletion risk.
- Never put secrets in parameter files, defaults or outputs.
- Do not invent API versions, property names or role definition ids; mark anything unconfirmed.
- Do not deploy anything; changes are to files only.

{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Files
Each file's path and full contents: main template, modules, parameter files.
## Decisions
One bullet each for scope, module choice, naming, identity and roles, network exposure.
## Deploy
What-if and deploy commands per environment, and the review step between them.
## Verify
Build or lint output or "not run", and what to check in the what-if output.
## Follow-ups
Deployment stacks, policy, private endpoints or anything left out. "None" if empty.
</output_format>

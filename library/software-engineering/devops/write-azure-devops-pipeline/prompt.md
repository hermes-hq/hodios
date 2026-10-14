---
schema: 1
id: write-azure-devops-pipeline
kind: prompt
title: Write an Azure DevOps pipeline
description: Writes an azure-pipelines.yml with stages, templates, variable groups, service connections, deployment jobs with environment approvals and caching, using the repo's real build commands.
category: devops
version: 1.0.0
status: incubating
stage: [build, ship]
role: [devops-engineer, software-engineer]
stack: [azure]
requires: [repo-read, file-write]
inputs: [repo, spec]
output: [config]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [azure-pipelines, yaml-templates, ci, deployment-approvals]
pairs_with:
  prompts: [design-ci-cd-pipeline, set-up-keyless-ci-deploys, migrate-ci-provider]
args:
  - name: goal
    description: What the pipeline must do, for example "build and test the .NET solution on PRs, deploy to dev on main and to prod after approval".
    type: text
    required: true
  - name: azure_setup
    description: What exists in the Azure DevOps project - agent pools, service connection names, variable groups, environments.
    type: text
output_contract:
  format: markdown
  sections: [Pipeline, Templates, Decisions, Assumptions, Verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Azure Pipelines has features that are easy to misuse. Approvals and checks are not configured in YAML at all: they live on Environments and service connections, so a `deployment` job targeting an environment is what makes a prod approval possible. Compile-time template expressions (dollar sign plus double braces) and runtime macros `$(var)` and `$[ ]` are evaluated at different times, which is the most common source of "variable is empty" bugs. Secret variables are not mapped into scripts automatically; they must be passed through `env:`. PR builds for Azure Repos are triggered by branch policies, not the `pr:` key, while GitHub-hosted repos use `pr:`. Classic release pipelines are being replaced by multi-stage YAML, so new work should be YAML.
</context>

<task>
Write an Azure DevOps YAML pipeline that does this: {{goal}}
{{#azure_setup}}
Azure DevOps setup: {{azure_setup}}
{{/azure_setup}}

1. Read the repository: solution or project files, build and test commands, existing pipeline YAML or templates. Note where the repo is hosted (Azure Repos or GitHub), since PR triggers differ.
2. Lay out stages (build, then one stage per environment) with `dependsOn` and `condition` so deploys run only from the right branch.
3. Build stage: use the matching tasks or scripts for the stack, cache packages with the `Cache@2` task keyed on the lockfile, publish test results and code coverage, and publish one pipeline artifact that later stages download instead of rebuilding.
4. Deploy stages: `deployment` jobs targeting named Environments, with the `runOnce` or rolling strategy, and the service connection referenced by name. State that approvals and checks must be added to the Environment in the UI.
5. Extract repeated steps into templates with typed `parameters` when the same steps run for more than one environment.
6. Variables: non-secret values in YAML or variable groups; secrets in a variable group linked to Key Vault where possible, passed to scripts through `env:`. Explain any compile-time versus runtime expression used.
7. Write the files. If the Azure CLI with the DevOps extension is available, say how to validate the pipeline before merging; otherwise give the preview run approach.
</task>

<constraints>
- Do not invent task names or versions; use only tasks you are sure exist, and prefer script steps when unsure.
- Do not put secrets in YAML; reference variable groups or Key Vault by name.
- Do not claim approvals are enforced by the YAML; they are configured on Environments.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Pipeline
The path and full `azure-pipelines.yml`.

## Templates
Each template file with path and contents, or "None".

## Decisions
One bullet each for stage layout, caching, artifact passing and variable handling.

## Assumptions
Agent pools, service connections, variable groups and environments the file references, and the approvals to configure.

## Verify
How the YAML was or can be validated and what to check on the first run.
</output_format>

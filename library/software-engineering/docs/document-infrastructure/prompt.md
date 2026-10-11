---
schema: 1
id: document-infrastructure
kind: prompt
title: Document cloud infrastructure
description: Documents cloud infrastructure from Terraform and notes, with a resource inventory per environment, network diagram, access paths, environment differences and what code does not manage.
category: docs
version: 1.0.0
status: incubating
stage: [discover, operate, maintain]
role: [devops-engineer, sre, architect]
stack: [terraform]
requires: [repo-read, file-write]
inputs: [repo, config, notes]
output: [docs, diagram, table]
risk: edits-files
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [infrastructure-inventory, network-diagram, environments, cloud-access, cost-drivers]
pairs_with:
  prompts: [write-architecture-overview, import-infrastructure-into-terraform, write-ownership-handover-doc]
args:
  - name: notes
    description: What the code cannot show, such as resources created by hand in the console, billing figures, who has admin access and the break-glass process.
    type: text
output_contract:
  format: markdown
  sections: [Files written, Not managed by code, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Infrastructure docs are read by the person who just got paged, the new platform engineer and the auditor. They want to know what exists in each environment, how traffic gets in, what talks to what, who and what can access it, how it was created, and what it costs. Terraform is the best source but it is not the whole truth. Resources created in the console never appear in it. `data` sources point at things managed somewhere else. Environments differ through tfvars, workspaces or copied folders. Hardcoded IDs hint at shared resources. Costs cannot be read from code, and a guessed monthly figure is worse than none, so only use billing data the user gives.
</context>

<task>
Document the infrastructure defined in this repository.
{{#notes}}
Notes from the team: {{notes}}
{{/notes}}

1. Read the Terraform layout: root modules, shared modules, backend and state configuration, providers and regions, and how environments are separated (workspaces, tfvars, folders). Read related config such as Helm values or CI deploy jobs only where they define infrastructure.
2. Build an inventory per environment: resource or module, purpose in plain words, file, key settings (size, region, replicas, backups), and dependencies.
3. Map the network: VPCs or virtual networks, public and private subnets, load balancers and other entry points, peering and VPN, DNS zones and records, egress paths. Draw it as a Mermaid flowchart.
4. Map access: IAM roles and policies, what can assume them (people, CI, workloads), service accounts, where secrets are stored (names only), and any break-glass path from the notes.
5. Table the differences between environments: sizes, regions, features turned off, missing resources.
6. Costs: if billing data is in the notes, summarise it by service. Otherwise list the main cost drivers by resource type with no figures.
7. List what is not managed by this code: data sources, hardcoded ARNs or IDs, and resources from the notes.
8. Write it to `docs/infrastructure.md` (or the repo's existing docs location) with a "last checked against commit" line.
</task>

<constraints>
- Read only. Do not run `terraform plan`, `apply`, `import` or any cloud CLI command.
- Never copy secret values, keys or full connection strings. If the repo is public, replace account IDs and internal hostnames with placeholders and say so.
- Do not invent prices, sizes or resources. Mark anything from the notes rather than the code as "per team notes".
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Files written
Path and a one-line summary of each section.
## Not managed by code
Bullets: resources referenced or described but not created by this repo.
## Open questions
Gaps for the team, such as unclear ownership or missing environments, as a checklist.
</output_format>

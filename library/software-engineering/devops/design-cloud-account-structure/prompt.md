---
schema: 1
id: design-cloud-account-structure
kind: prompt
title: Design cloud account structure
description: Designs the account, subscription or project layout for a company's cloud, covering environment and workload separation, organisation policies, identity and SSO, networking, logging and billing.
category: devops
version: 1.0.0
status: incubating
stage: [plan, design]
role: [devops-engineer, architect, security-engineer]
stack: [aws, gcp, azure]
requires: [none]
inputs: [text, spec]
output: [plan, diagram, code]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [landing-zone, multi-account, organization-policies, single-sign-on, blast-radius, cost-allocation]
pairs_with:
  personas: [platform-engineer, devops-engineer]
  prompts: [plan-cloud-migration, write-terraform-module, plan-secrets-management]
args:
  - name: company
    description: Team size and structure, products and environments, current cloud setup (for example "everything in one account, shared root credentials"), compliance needs, and growth expected over two years.
    type: text
    required: true
  - name: provider
    description: Cloud provider.
    type: enum
    enum: [aws, gcp, azure]
    required: true
output_contract:
  format: markdown
  sections: [Assumptions, Hierarchy, Guardrails, Identity and access, Shared services, Migration steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The account boundary (an AWS account, an Azure subscription, a GCP project) is the strongest isolation and billing unit a cloud offers. Teams that start in one account eventually find that a developer with admin rights in staging also has them in production, that one runaway job hits a shared service quota, and that the bill cannot be split by product. A sound structure separates production from non-production, separates security tooling and logs from workloads so an attacker in a workload cannot erase evidence, and groups accounts under organisational units, management groups or folders where preventive policies apply (AWS service control policies, Azure Policy, GCP organisation policies): deny disabling audit logging, restrict regions, block public storage, protect the root or break-glass identities. People sign in through a central identity provider with SSO and short-lived role sessions, never long-lived user keys. Shared networking, DNS and CI identities need their own place. The right size depends on the company: a ten-person startup needs a handful of accounts, not fifty, and a vending process matters more than a perfect tree.
</context>

<task>
Provider: {{provider}}

<company>
{{company}}
</company>

1. State assumptions about team growth, compliance scope and regions.
2. Design the hierarchy for {{provider}}: the management or root level, organisational units, management groups or folders, and the accounts, subscriptions or projects in each (security and log archive, shared networking, CI or tooling, production and non-production per product or team, sandboxes). Size it for the next two years, not for a hypothetical enterprise.
3. Define guardrails per level: preventive policies (with example policy statements or definitions), detective controls, region restrictions, budget alerts, and tagging or labelling rules for cost allocation.
4. Define identity and access: central identity provider and SSO, permission sets or roles per job, break-glass access with monitoring, CI identities using workload federation instead of stored keys, and how production access is requested and logged.
5. Define shared services: central audit logs and their retention, network layout (hub and spoke or shared VPC), DNS, and where shared tooling lives.
6. Describe how a new account or project is created (vending) and who approves it.
7. Write migration steps from the current setup to the target in an order that never breaks production, starting with logging and identity.
8. Give infrastructure-as-code pointers for the structure, marking provider-specific tooling (for example AWS Control Tower or Azure landing zone accelerators) as optional with trade-offs.
</task>

<constraints>
- Fit the size of the company; say explicitly what to postpone until it grows.
- Do not invent compliance requirements; if a regime is named, map only the structural controls and recommend confirming with the compliance owner.
- Use the provider's correct terms and mark service names or policy syntax you are unsure of.
{{> output/uncertainty}}
</constraints>

<output_format>
## Assumptions
Bullets.

## Hierarchy
An indented tree, then a table: Account or project | Purpose | Who has access.

## Guardrails
Table: Level | Control | Type (preventive or detective) | Example.

## Identity and access
Bullets.

## Shared services
Bullets.

## Migration steps
Numbered, with a rollback note where relevant.
</output_format>

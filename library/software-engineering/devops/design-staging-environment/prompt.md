---
schema: 1
id: design-staging-environment
kind: prompt
title: Design a staging environment
description: Designs a long-lived staging environment with the production parity that matters, safe test data, access control, external-service handling, cost limits and the checks staging must catch.
category: devops
version: 1.0.0
status: incubating
stage: [plan, design]
role: [devops-engineer, tech-lead, sre]
stack: []
requires: [none]
inputs: [text, spec]
output: [plan, checklist]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [staging, pre-production, environment-parity, test-data, data-masking]
pairs_with:
  prompts: [set-up-preview-environments, build-test-data-from-production, design-build-artifact-promotion]
args:
  - name: system
    description: The production system (services, databases, queues, third-party integrations, infrastructure), how releases flow today and what has slipped through to production before.
    type: text
    required: true
  - name: limits
    description: Budget, compliance rules on data, and team size.
    type: text
output_contract:
  format: markdown
  sections: [Purpose, Parity, Data, External services, Access and cost, Release flow, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most staging environments drift into one of two failures: a neglected copy that differs from production in versions, configuration and scale, so it passes things production then rejects; or a production clone full of real customer data, with weaker access controls and a full production bill. A staging environment earns its cost by catching a specific list of problems: migrations against realistic data volumes, configuration and infrastructure changes, integration behaviour with third parties in sandbox mode, and release mechanics. Parity matters in what the release touches (same images, same infrastructure code, same database engine and major version, same deploy process); it rarely needs to match production scale. Real personal data in staging is a privacy and compliance problem in many jurisdictions; masked or synthetic data is the norm.
</context>

<task>
Design a staging environment for:
<system>
{{system}}
</system>
{{#limits}}
Limits: {{limits}}
{{/limits}}

1. If the system's components or the release flow are unclear, ask up to five questions and stop.
2. Write the purpose: the specific failure classes staging must catch, taken from past incidents where given, and what it is not for (load testing, demos, personal sandboxes) unless the user wants that.
3. Parity: list what must match production exactly (images by digest, infrastructure code with environment variables only, database engine and version, feature flag defaults, deploy process) and what may differ (instance sizes, replica counts, region count), with reasons.
4. Data: choose masked production snapshots, synthetic data or a mix; describe the refresh schedule, masking of personal and secret fields before data leaves production, and migration testing against realistic volume.
5. External services: sandbox accounts for payments, email and SMS with delivery to test inboxes only; stubs where no sandbox exists; separate credentials from production.
6. Access and cost: who can access, single sign-on, no production credentials in staging, network separation, scheduled scale-down outside working hours, and a budget alert.
7. Release flow: how a build moves from CI to staging to production (same artifact promoted), the checks run in staging (smoke, end-to-end, migration timing), and who signs off.
8. List the risks of this design and how to keep staging from drifting (infrastructure code shared with production, drift checks).
</task>

<constraints>
- Never recommend copying unmasked personal data into staging; note that rules differ by jurisdiction and the user should confirm with their privacy lead.
- Do not quote prices as facts; cost statements are estimates.
- Do not recommend building separate infrastructure code for staging.
</constraints>

<output_format>
## Purpose
What staging must catch and what it is not for.

## Parity
A table: aspect, must match or may differ, reason.

## Data
Source, masking, refresh and migration testing.

## External services
Each integration and how staging handles it.

## Access and cost
Access rules, network separation, scale-down and budget.

## Release flow
Numbered steps from CI to production with checks and sign-off.

## Risks
Risks and drift prevention, as bullets.
</output_format>

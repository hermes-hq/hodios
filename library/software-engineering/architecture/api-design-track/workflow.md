---
schema: 1
id: api-design-track
kind: workflow
title: API design track
description: Takes a new API from consumer needs to a resource model, a reviewed contract, error and versioning rules, and a mock with contract tests, pausing for approval between steps.
category: architecture
version: 1.0.0
status: incubating
stage: [discover, design, verify]
role: [backend-engineer, architect, tech-lead, fullstack-engineer]
requires: [none]
inputs: [spec, text, ticket]
output: [questions, docs, code, tests]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [api-design, contract-first, openapi-spec, versioning, public-api]
pairs_with:
  personas: [software-architect, backend-engineer]
  prompts: [design-api-contract, write-contract-tests, document-public-api, migrate-api-version]
args:
  - name: consumers
    description: Who will call the API (public developers, partners, mobile apps, internal services) and what each needs to accomplish with it.
    type: text
    required: true
  - name: constraints
    description: Fixed constraints such as existing conventions, auth system, data residency, SLAs, launch date or systems the API must sit in front of.
    type: text
  - name: style
    description: API style for the contract.
    type: enum
    enum: [rest, graphql, grpc]
    default: rest
steps:
  - {id: consumer-needs, file: steps/01-consumer-needs.md, stage: discover, gate: approve}
  - {id: resource-model, file: steps/02-resource-model.md, stage: design, gate: approve}
  - {id: contract, file: steps/03-contract.md, stage: design, gate: approve}
  - {id: errors-and-versioning, file: steps/04-errors-and-versioning.md, stage: design, gate: approve}
  - {id: mock-and-contract-tests, file: steps/05-mock-and-contract-tests.md, stage: verify, gate: none}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
Designs a {{style}} API for these consumers, one approved step at a time:

<consumers>
{{consumers}}
</consumers>

{{#constraints}}
<constraints>
{{constraints}}
</constraints>
{{/constraints}}

A public or partner API is expensive to change once clients depend on it, so the contract is designed from the consumers' side and reviewed before any server code exists. Each step produces one artifact and stops for the API owner's approval; later steps build on approved versions instead of re-asking. Never invent business rules, limits, permissions or prices: mark them as assumptions or questions. Given constraints and conventions override the defaults in the steps.

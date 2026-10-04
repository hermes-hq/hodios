---
schema: 1
id: design-golden-path-template
kind: prompt
title: Design a golden path template
description: Designs a paved-road service template for an internal platform, with repo skeleton, CI, deployment, observability and security defaults, ownership metadata, override rules and adoption measures.
category: devops
version: 1.0.0
status: incubating
stage: [design, plan]
role: [devops-engineer, sre, architect, tech-lead]
stack: []
requires: [none]
inputs: [text, notes]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [golden-path, paved-road, service-template, platform-engineering, developer-experience, service-catalog]
pairs_with:
  prompts: [design-ci-cd-pipeline, instrument-service-observability, write-helm-chart]
  personas: [platform-engineer]
args:
  - name: platform_context
    description: The organisation and platform today - number of teams and services, how a new service is created now and how long it takes, the deploy target, CI, observability and secrets tools in use, the developer portal or catalog if any, and the main complaints from teams.
    type: text
    required: true
  - name: stack
    description: The language and framework the first template targets, for example "Go HTTP service" or "Spring Boot API". One stack per template.
    type: string
output_contract:
  format: markdown
  sections: [Problem and scope, What the template creates, Defaults and guardrails, Overrides, Lifecycle and updates, Adoption and measures, Rollout, Open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design one golden path: the supported, opinionated way to create and run a new service, so that doing the right thing (tests, CI, safe deploys, logs, metrics, ownership, security scanning) is also the easiest thing. Golden paths fail when they are mandated rather than chosen, when they are a one-time scaffold that drifts the day after creation, when they hide so much that teams cannot debug their own service, and when the platform team measures templates shipped instead of time to first production deploy.

{{#stack}}Template stack: {{stack}}{{/stack}}
</context>

<task>
<platform_context>
{{platform_context}}
</platform_context>

1. Problem and scope: who the template is for (which kind of service), the current time and steps from "new idea" to "first production deploy", and the target (for example under one day, with no tickets to other teams). Say what is out of scope (data pipelines, frontends) for this first template.
2. What the template creates, as a file tree: service skeleton with a health endpoint and graceful shutdown, tests and a test command, a build file and container image definition, CI pipeline, deployment manifests or infrastructure module, dashboards and alerts as code, a runbook stub, ownership and catalog metadata (owner team, on-call, tier, data classification), a README with the three commands a developer needs, and dependency update configuration.
3. Defaults and guardrails, each with why it exists: structured logs and trace propagation, golden-signal metrics, SLO starter values, non-root image with a pinned base, secrets from the secret store, dependency and image scanning, branch protection, progressive deploy with automatic rollback. Separate hard guardrails (cannot be turned off, such as secret scanning) from defaults.
4. Overrides: what teams may change freely, what needs a short justification, and what they cannot change. Show how an override works in the template (configuration, not forking).
5. Lifecycle: how services created from the template receive later improvements (versioned shared CI components, base images and libraries referenced rather than copied, automated update pull requests). Treat "copy once and drift" as the failure to avoid.
6. Adoption and measures: lead time from creation to first production deploy, share of new services on the path, number of overrides and why, developer satisfaction from a short survey, support requests per service. Include the signal that the path is wrong (high override or abandonment rate) and what the platform team does then.
7. Rollout: build it with one or two pilot teams, document as you go, offer migration help for existing services only after new-service adoption works.
</task>

<constraints>
- Use the tools and constraints given; if the deploy target, CI or observability stack is missing, ask instead of picking one silently.
- Adoption is voluntary; make the path attractive, not mandatory, except for named security and compliance guardrails.
- Keep the template small enough to understand in an hour; every file must earn its place.
- Do not invent internal tool names or team names; use placeholders.
</constraints>

<output_format>
## Problem and scope
Five lines or fewer.
## What the template creates
A file tree in a code block with a one-line purpose per item.
## Defaults and guardrails
Table: item | default | hard guardrail or default | why.
## Overrides
Table: setting | free, justify, or fixed | how to override.
## Lifecycle and updates
Bullets.
## Adoption and measures
Table: measure | how collected | target.
## Rollout
Numbered phases with exit criteria.
## Open questions
Bullets, or "None".
</output_format>

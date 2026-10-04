---
schema: 1
id: design-internal-developer-platform
kind: prompt
title: Design an internal developer platform
description: Designs an internal developer platform from real developer pain points, with capabilities, build versus buy, the thinnest viable platform first and adoption measures. Use before building one.
category: architecture
version: 1.0.0
status: incubating
stage: [design, plan]
role: [devops-engineer, sre, tech-lead, engineering-manager]
requires: [none]
inputs: [text, notes]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [platform-engineering, golden-paths, developer-experience, self-service]
pairs_with:
  personas: [staff-engineer, software-architect]
  prompts: [write-design-doc, compare-design-options]
args:
  - name: pain_points
    description: What slows developers down today, ideally with evidence - survey quotes, ticket counts, lead times, onboarding time, incidents. Also the current tooling (CI, cloud, deploy method, service catalogue if any).
    type: text
    required: true
  - name: org_size
    description: Number of engineers and teams, number of services, and the size of the platform team you have or plan.
    type: string
    default: not stated
output_contract:
  format: markdown
  sections: [Problem framing, Capabilities, Build versus buy, Thinnest viable platform, Adoption and measures, Risks and questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design an internal developer platform (IDP) the way a platform lead who has seen several succeed and fail would. Platforms fail when they start from a tool ("we bought a portal") instead of developer pain, try to cover every capability in year one, are mandated rather than chosen so teams route around them, have no product owner, and measure output (templates shipped) instead of outcomes (lead time, time to first deploy, tickets avoided). A platform is a product for internal users: a few paved, well-supported golden paths, self-service through an API or portal, and an escape hatch for teams with real special needs.

Organisation: {{org_size}}
</context>

<task>
<pain_points>
{{pain_points}}
</pain_points>

1. Frame the problem: group the pain points into themes (getting started, environments, deploys, observability, compliance and access, discovery of services and owners). For each, note the evidence given and estimate who is affected and how often. Flag pains a platform does not fix (unclear ownership, missing tests) as out of scope.
2. Map capabilities to themes: service catalogue with ownership, software templates and golden paths, environment provisioning (preview or ephemeral environments), deploy and release pipeline, secrets and configuration, observability defaults, access requests, documentation. Mark each as now, next or later, by pain size and dependency.
3. Build versus buy for each "now" capability: open source to adopt and run, a managed product, or a thin internal layer over existing tools (often the cheapest start). Compare on fit, operating cost in team time, lock-in and extensibility, without quoting prices.
4. Define the thinnest viable platform: often a documented golden path plus one template plus a catalogue page per service, delivered in about one quarter. Describe the first golden path end to end (from "new service" to "running in production with dashboards") and the first two pilot teams.
5. Plan adoption as a product: an owner, user research with developers, voluntary adoption with the path made easier than the alternative, migration help, support channel and service levels, and a deprecation policy for old ways.
6. Choose measures: DORA metrics (deployment frequency, lead time for changes, change failure rate, time to restore), time to first deploy for a new service, onboarding time, developer satisfaction survey, share of services on the golden path, and tickets to the platform team. Give a baseline to capture before starting.
7. Size the platform team the plan needs and compare it with the organisation above; if the organisation is not stated, ask for engineer count and current platform staffing, and say what to cut if the team is smaller.
</task>

<constraints>
- Use only the evidence given; mark estimates. If pain points lack any evidence, still proceed but list the three cheapest ways to collect it (short survey, ticket analysis, shadowing a new hire).
- Do not quote vendor prices or claim market share; name products only as examples and say they must be evaluated.
- Do not recommend a mandate as the adoption strategy.
- If the organisation is small (for example under about 30 engineers), say whether a dedicated platform team is justified or whether shared conventions and a few scripts are enough.
{{> output/uncertainty}}
</constraints>

<output_format>
## Problem framing
Table: theme | evidence | who and how often | in scope.

## Capabilities
Table: capability | themes served | now, next or later | why.

## Build versus buy
Table: capability | options | recommendation | operating cost in team time | lock-in.

## Thinnest viable platform
The first golden path step by step, pilot teams and a one-quarter scope.

## Adoption and measures
Bullets on adoption, then a table: measure | baseline to capture | target direction.

## Risks and questions
Bullets, including the team size check.
</output_format>

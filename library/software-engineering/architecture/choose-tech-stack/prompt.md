---
schema: 1
id: choose-tech-stack
kind: prompt
title: Choose a tech stack for a new product
description: Recommends a stack for a new product (language, framework, database, hosting) from requirements, team skills, hiring and time to market, favouring boring defaults.
category: architecture
version: 1.0.0
status: incubating
stage: [plan, design]
role: [founder, tech-lead, architect, engineering-manager]
requires: [none]
inputs: [text, spec]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [greenfield, technology-choice, boring-technology, hosting, team-skills, trade-offs]
pairs_with:
  personas: [software-architect, staff-engineer]
  prompts: [choose-database-for-workload, decide-microservices-or-monolith, compare-design-options]
args:
  - name: product
    description: What the product does, who uses it, platforms (web, mobile, API), expected users in the first year, and any hard requirements such as real time, heavy data, AI features or compliance.
    type: text
    required: true
  - name: team
    description: Who will build and maintain it, their skills, and hiring plans.
    type: text
    required: true
  - name: constraints
    description: Budget, deadline, existing company standards, cloud credits, or data residency.
    type: text
output_contract:
  format: markdown
  sections: [Recommendation, Why this fits, Alternatives considered, What to avoid at this stage, Day-one setup, When to revisit]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
For a new product, the stack the team already knows well almost always beats the theoretically best one. Speed of the first year comes from familiarity, mature libraries, easy hiring and managed hosting, not from novel technology; each unfamiliar piece adds a learning tax and unknown failure modes ("innovation tokens" are limited). A relational database such as Postgres covers most products, including JSON documents, full-text search and queues at small scale. A single deployable application (a modular monolith) is easier to build, test and operate than services. Managed hosting and managed databases remove operations work a small team cannot afford. Real requirements can override defaults: hard real-time features, heavy data processing, specific AI libraries, mobile-first needs, or compliance rules on where data lives. Choosing a niche language for performance a product does not yet need is a common and costly mistake, as is splitting into microservices before there are teams to own them. Authentication, payments and email are usually bought, not built.
</context>

<task>
<product>
{{product}}
</product>

Team: {{team}}
{{#constraints}}
Constraints: {{constraints}}
{{/constraints}}

1. Identify the few requirements that genuinely constrain the stack (real time, data volume, AI or ML libraries, mobile, offline, compliance, integrations) and the ones any mainstream stack handles.
2. Start from the team's strongest language and framework. Change it only for a requirement it cannot meet, and say which.
3. Choose each layer: backend language and framework, frontend approach, database, background jobs, file storage, hosting, authentication, observability. Prefer managed services and one deployable unit.
4. For each layer, give one alternative and why it is not chosen now.
5. List tempting choices to avoid at this stage and why.
6. Give the day-one setup checklist so the stack is production-ready from the start.
7. State the signals that would justify revisiting a layer later.
</task>

<constraints>
- Do not pick technology the team does not know without a requirement that forces it.
- Do not recommend microservices, Kubernetes or multiple databases for a new product without a concrete need.
- Do not quote hosting prices or free-tier limits as facts; say what to check.
- If the team's skills are unknown, ask before recommending.
{{> output/uncertainty}}
</constraints>

<output_format>
## Recommendation
The stack in one table: layer, choice, one-line reason.
## Why this fits
Five to eight lines tying the choices to team, requirements and timeline.
## Alternatives considered
Table: layer, alternative, why not now.
## What to avoid at this stage
Bullets of tempting choices that would cost more than they give.
## Day-one setup
Checklist: repository, CI, environments, error tracking, backups, auth approach.
## When to revisit
Signals that would justify changing a layer.
</output_format>

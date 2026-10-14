---
schema: 1
id: design-system-architecture
kind: prompt
title: Design a system's architecture
description: Designs the architecture for a new system or a big new part of one, starting from the requirements that drive it, with components, a diagram, key decisions and risks. Use when starting to design.
category: architecture
version: 1.0.0
status: incubating
stage: [design]
role: [software-engineer, architect, tech-lead]
requires: [none]
inputs: [spec, text]
output: [report, diagram, table]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: beginner
depth: basic
tags: [high-level-design, components, scalability, trade-offs, greenfield]
pairs_with:
  prompts: [choose-tech-stack, compare-design-options, write-adr, review-system-design]
  personas: [software-architect]
args:
  - name: system
    description: What the system must do, for whom, and the main things users do with it.
    type: text
  - name: constraints
    description: Scale, budget, team size and skills, deadline, compliance, or anything already decided.
    type: text
  - name: existing
    description: What already exists that the design must fit with (current services, databases, hosting), or "nothing, greenfield".
    type: text
output_contract:
  format: markdown
  sections: [Driving requirements, Architecture, Key flows, Decisions, Risks and next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-14
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a pragmatic software architect. Naive architecture answers fail in two ways: they draw a fashionable diagram (microservices, queues, Kubernetes) that no requirement asked for, or they list generic components without saying why each exists. A good design starts from the few requirements that really shape it, uses the simplest structure that meets them, and makes every added piece earn its place.

{{#system}}
<system>
{{system}}
</system>
{{/system}}
{{#constraints}}
<constraints_given>
{{constraints}}
</constraints_given>
{{/constraints}}
{{#existing}}
<existing>
{{existing}}
</existing>
{{/existing}}
</context>

<task>
1. If you do not know what the system does, roughly how much it is used, or what it must fit with, ask up to three short numbered questions and stop. For example:
   1. What does it do, and what are the two or three main things users do with it? (e.g. "customers book appointments, staff manage calendars")
   2. Rough scale and team: users, requests, data size, people building it? (default: under 10,000 users, a team of 2–5)
   3. Is anything already decided or existing: language, cloud, database, services it must talk to? (default: nothing, greenfield)
   Say that if they answer "just do it", you will use the defaults. If you already have enough, skip this step.
2. Driving requirements: list the main use cases, then rank the three quality attributes that matter most here (for example time to market, cost, reliability, latency, scale, security or compliance, offline use). Do a back-of-envelope estimate of load and data size, with the arithmetic shown.
3. Start from the simplest architecture that could work, usually one deployable application with clear internal modules, one relational database and managed hosting. Add a piece (cache, queue, search engine, separate service, extra datastore) only when a named requirement needs it, and say which.
4. Describe the components: each one's responsibility, the data it owns, and how it talks to the others. Draw it as a Mermaid diagram.
5. Walk the two or three most important flows through the design step by step, including one failure (a dependency down, a slow call, a retry).
6. List the key decisions with the alternative you rejected and why. Mark the ones that are hard to reverse, such as the data model, a public API or the choice of datastore.
7. Name the biggest risks and the one thing to prototype or measure first.
Done means: every component traces to a requirement, every main flow is walked through, and every hard-to-reverse decision has its alternative written down.
</task>

<constraints>
- Do not introduce microservices, event sourcing, Kubernetes or multiple databases without a requirement that needs them; if you think they will be needed later, say when.
- Stay technology-neutral unless the user named a stack; when you name a product, give the category it stands for.
- Mark estimates and assumptions as such. Do not invent requirements; put open questions under Risks and next steps.
{{> output/uncertainty}}
</constraints>

<output_format>
## Driving requirements
Use cases (bullets), top three quality attributes in order, and the load estimate with its arithmetic.

## Architecture
A Mermaid diagram, then a table: Component | Responsibility | Data it owns | Talks to.

## Key flows
Numbered steps per flow, including the failure case.

## Decisions
Table: Decision | Chosen | Rejected alternative | Why | Hard to reverse?

## Risks and next steps
Risks with mitigations, open questions, and what to prototype first.

End with one line: "Go deeper: Choose a tech stack for a new product, Compare design options, Write an architecture decision record, or Review a system design."
</output_format>

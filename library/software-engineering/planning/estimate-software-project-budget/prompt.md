---
schema: 1
id: estimate-software-project-budget
kind: prompt
title: Estimate a software project budget
description: Estimates the full cost of building and running a software project, including people, cloud, licences, third-party services, contingency and year-one maintenance.
category: planning
version: 1.0.0
status: incubating
stage: [plan]
role: [engineering-manager, founder, project-manager, tech-lead]
stack: []
requires: [none]
inputs: [spec, notes, text]
output: [table, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [project-budget, total-cost-of-ownership, cost-estimation, contingency, business-case, maintenance-cost]
pairs_with:
  prompts: [estimate-with-ranges, estimate-team-size-for-project, estimate-from-past-projects]
args:
  - name: project
    description: What is being built, the main components and integrations, the effort estimate if you have one, expected users and data volumes.
    type: text
    required: true
  - name: rates
    description: Your own cost inputs, for example loaded cost per engineer-month by role or contractor day rates, currency, known licence or cloud prices.
    type: text
  - name: horizon
    description: How far to cost the running phase.
    type: enum
    enum: [build-only, build-plus-year-one, build-plus-three-years]
    default: build-plus-year-one
output_contract:
  format: markdown
  sections: [Budget summary, Build costs, Running costs, Contingency, Assumptions and inputs needed, What drives the number]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Software budgets are usually the engineering estimate multiplied by a day rate, which leaves out much of the real cost: product, design, QA and project management time; security review and penetration testing; environments and tooling; third-party services priced per user or per call that grow with usage; data migration; launch support; and, most often forgotten, running and maintaining the system after launch, where hosting, monitoring, on-call, security patching, dependency upgrades and small fixes commonly cost a meaningful fraction of the build every year. Salaries understate people cost unless they are loaded with benefits, taxes, equipment and overheads. A budget is a range with named contingency, and its value is in exposing the cost drivers someone can decide on.
</context>

<task>
Project: {{project}}
{{#rates}}Cost inputs: {{rates}}{{/rates}}
Horizon: {{horizon}}.

1. If there is no effort estimate, build a rough one by workstream in person-months as a range, and say it is rough.
2. Build costs: people by role (engineering, product, design, QA, project management, DevOps, security), using the user's rates; where none are given, show the formula and leave the rate as an input rather than inventing one. Add environments and tooling, third-party services and licences during build, security testing, data migration, and launch support.
3. Running costs for the horizon: hosting and cloud (with the usage drivers), third-party services that scale with users or calls, monitoring and logging, on-call and support time, maintenance (patching, dependency and platform upgrades, bug fixing), and planned improvements. Express maintenance both as people time and as a share of build cost, and say the share is a planning assumption.
4. Contingency: a named line sized to the uncertainty (wider for new technology, unclear scope, many integrations), not hidden in other lines.
5. Summarise as low, expected and high, split into one-off and recurring per year.
6. List the assumptions and the inputs the user must supply to firm up the number, and the three to five drivers that move it most (scope items, team model, usage growth, build versus buy).
</task>

<constraints>
- Never invent salaries, day rates, cloud prices or licence fees; use the user's figures or leave them as named inputs with the formula.
- Show arithmetic so the user can change any input.
- Present ranges, not a single number, and label every assumption.
{{> output/uncertainty}}
</constraints>

<output_format>
## Budget summary
Table: | Low | Expected | High | for one-off build and recurring per year.
## Build costs
Table: Item | Basis (quantity times rate) | Low | Expected | High.
## Running costs
Table: Item | Driver | Per year low, expected, high.
## Contingency
## Assumptions and inputs needed
## What drives the number
</output_format>

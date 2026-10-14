---
schema: 1
id: write-department-strategy
kind: prompt
title: Write a department strategy
description: Writes a strategy for one department, such as IT, finance, HR, marketing or operations, that serves the company strategy, with priorities, service levels and resources.
category: business-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, executive, operations-manager]
requires: [none]
inputs: [text, document]
output: [docs, plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [functional-strategy, department-plan, support-functions, service-levels, resource-planning]
pairs_with:
  prompts: [cascade-strategy-to-team-goals, write-three-year-strategic-plan, prioritize-strategic-initiatives, write-engineering-strategy]
args:
  - name: department
    description: The department, its remit, team size and budget, what internal customers say about it, its current projects and its biggest problems.
    type: text
    required: true
  - name: company_strategy
    description: The company strategy or priorities the department must serve, with time horizon.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Diagnosis, What the company needs from us, Our priorities, Service commitments, What we will stop, Resources and roadmap, Measures, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a department head write a functional strategy. Department strategies usually go wrong by being a wish list of the department's own projects ("new system", "more headcount") with no link to what the company is trying to do, or by ignoring the day-to-day service the rest of the business depends on. A good one starts from the company's priorities and asks what each one needs from this function, is honest about the department's current performance as internal customers see it, balances "keep the lights on" with change work, commits to service levels, and says what the department will stop doing or do less of. For engineering, use a dedicated engineering strategy instead.
</context>

<task>
Write a department strategy:

<department>
{{department}}
</department>

<company_strategy>
{{company_strategy}}
</company_strategy>

1. Diagnosis: the department's current state - service quality as internal customers see it, capacity, skills, systems, costs - and the two or three issues that matter most. Use the material; label opinions.
2. What the company needs from us: for each company priority, the specific contribution the department must make, and the core services the business relies on regardless of strategy.
3. Our priorities: three or four, each linked to company priorities or to a service gap, with key initiatives.
4. Service commitments: the levels the department will commit to for its core services (response times, accuracy, close dates, availability), as proposals to agree with internal customers.
5. What we will stop or reduce, and how requests will be prioritised.
6. Resources and roadmap: people, skills, systems and budget needed, phased by quarter or half-year; distinguish run costs from change investment.
7. Measures: a short set covering service, cost and contribution to priorities.
8. Risks and dependencies on other departments.
</task>

<constraints>
- Use only facts given; do not invent budgets, headcount or service levels. Mark estimates as `assumption` and unknowns as [X].
- Every priority must trace to a company priority or a named service problem.
- Keep business-as-usual explicitly resourced; do not plan change work as if the team had no day job.
- If the company strategy is missing or vague, say what the department must assume and ask for confirmation.
{{> output/uncertainty}}
</constraints>

<output_format>
## Diagnosis
Short paragraphs.

## What the company needs from us
Table: Company priority | What it needs from us.

## Our priorities
Numbered, each with link, initiatives and owner.

## Service commitments
Table: Service | Current | Proposed level.

## What we will stop
Bullets and the request prioritisation rule.

## Resources and roadmap
Table: Period | Initiative | People | Cost (run or change).

## Measures
Table.

## Risks
Bullets including dependencies.
</output_format>

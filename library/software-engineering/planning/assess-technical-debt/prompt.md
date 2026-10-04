---
schema: 1
id: assess-technical-debt
kind: prompt
title: Assess technical debt
description: Catalogues the technical debt in a codebase or system, scores each item by its cost to the team against the effort to fix it, and turns the result into a paydown plan with quick wins first.
category: planning
version: 1.0.0
status: incubating
aliases: [planning-techdebt]
stage: [plan, maintain]
role: [tech-lead, engineering-manager, architect, software-engineer]
stack: []
requires: [repo-read]
inputs: [repo, notes, ticket]
output: [table, plan, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [technical-debt, impact-effort, maintainability, paydown-plan]
pairs_with:
  prompts: [write-tech-debt-proposal, write-technical-roadmap, plan-large-refactor]
  personas: [staff-engineer]
args:
  - name: scope
    description: The codebase, service or area to assess, and what prompted the assessment.
    type: text
    required: true
  - name: known_pain
    description: Pain the team already feels - slow builds, flaky tests, incidents, areas people avoid, outdated dependencies - with any numbers you have.
    type: text
  - name: capacity
    description: How much time the team can spend on debt, for example 20% of each sprint.
    type: string
output_contract:
  format: markdown
  sections: [Debt register, Impact and effort, Paydown plan, Leave alone]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Technical debt is only worth paying when it costs something now: slower delivery, incidents, security exposure or onboarding pain. A list of everything that is not how you would write it today is not a debt register. The useful output ranks each item by the interest the team pays on it and the effort to remove it, so the team can fix the expensive items cheaply first and consciously leave the rest.
{{#capacity}}
Capacity for debt work: {{capacity}}
{{/capacity}}
</context>

<task>
Assess {{scope}}.
{{#known_pain}}
Known pain:
{{known_pain}}
{{/known_pain}}

1. If you can read the repository, gather evidence before judging: dependency versions and end-of-life dates, test coverage and flaky tests, build and CI times, files with high churn and many bug fixes, duplicated or dead code, TODO and workaround comments, missing docs for critical paths. Say what you looked at.
2. List each debt item across code, architecture, infrastructure, dependencies, tests and docs. For each, describe the interest: what it costs the team today, with evidence (a number, an incident, a file).
3. Score each item 1 to 5 on impact (delivery speed, reliability, security, onboarding) and on effort, and say how confident you are in each score.
4. Place the items in an impact-versus-effort quadrant: quick wins, major projects, fill-ins and items to leave alone.
5. Build a paydown plan that fits the stated capacity: quick wins first, then major projects split into steps that each ship value, with the signal that shows each step worked.
6. Name the items to leave alone and why, so the team stops relitigating them.
</task>

<constraints>
- Every item needs a concrete cost today. Drop items whose only argument is taste or fashion.
- Do not invent metrics; mark estimates as estimates and say how to measure them.
- Prefer incremental paydown over rewrites. Recommend a rewrite only with the evidence that incremental change cannot work.
- Read only; do not change code during the assessment.
{{> output/uncertainty}}
</constraints>

<output_format>
## Debt register
A table: item, area, interest paid today, evidence, impact score, effort score, confidence.
## Impact and effort
The four quadrants with the items in each.
## Paydown plan
Ordered steps sized to the capacity, each with the success signal.
## Leave alone
Items not worth paying down now, with the reason and what would change that.
</output_format>

---
schema: 1
id: build-project-risk-register
kind: prompt
title: Build an engineering project risk register
description: Builds a risk register for an engineering project with causes, likelihood, impact, early warning signs, owners, responses and a review cadence.
category: planning
version: 1.0.0
status: incubating
stage: [plan]
role: [tech-lead, engineering-manager, project-manager]
stack: []
requires: [none]
inputs: [spec, notes, text]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [risk-management, risk-register, mitigation, early-warning-signs, project-governance]
pairs_with:
  prompts: [write-project-kickoff-brief, replan-slipping-project, plan-around-blocked-dependency]
args:
  - name: project
    description: The project, its plan or milestones, the team, technology, dependencies and anything that already worries you.
    type: text
    required: true
  - name: deadline
    description: The key date and how fixed it is.
    type: string
output_contract:
  format: markdown
  sections: [Top risks, Register, Watch list, Review cadence]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most project risk registers are lists of vague worries ("resourcing", "technical complexity") scored once and never read again. A useful register states each risk as cause, event and effect ("because the payments provider's sandbox lacks refunds, we may find integration bugs only in production, delaying launch by weeks"), names one owner, picks a response (avoid, reduce, transfer, accept), and gives an early warning sign that can be checked weekly, so the team acts before the risk becomes an issue. In software projects the risks that bite are usually dependencies on other teams or vendors, unknowns in integration and data migration, single experts, environments not ready, approvals with long lead times (security, legal, app stores), and the gap between estimate and reality.
</context>

<task>
Project: {{project}}
{{#deadline}}Deadline: {{deadline}}{{/deadline}}

1. Identify 10 to 15 risks across: scope and requirements, technical unknowns, integration and data, dependencies on other teams and vendors, people and knowledge, environments and tooling, security and compliance approvals, operations and launch, and estimation. Prefer specific risks from the input over generic ones.
2. Write each as "because [cause], [event] may happen, leading to [effect]".
3. Score likelihood and impact on 1 to 5 with a one-line reason; the score is likelihood times impact. Say the scores are judgements.
4. For each, pick a response and concrete actions with an owner role and a date or trigger; add a contingency plan for the top five.
5. Give an early warning sign for each that can be checked weekly (a metric, a date missed, a reply not received).
6. Separate issues (already happening) from risks and list them apart.
7. Propose a review cadence and how risks are closed or escalated.
</task>

<constraints>
- No generic risks without a project-specific cause.
- One owner role per risk.
- Do not invent vendor names, people or dates; use [X] where needed.
{{> output/uncertainty}}
</constraints>

<output_format>
## Top risks
The five highest scores, one line each with the action this week.
## Register
Table: ID | Risk (cause, event, effect) | L | I | Score | Response and actions | Owner | Early warning sign | Contingency.
## Watch list
Issues already happening, and lower risks to recheck.
## Review cadence
Bullets.
</output_format>

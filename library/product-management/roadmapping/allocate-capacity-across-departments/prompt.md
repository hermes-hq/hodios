---
schema: 1
id: allocate-capacity-across-departments
kind: prompt
title: Allocate capacity across departments
description: Splits an internal tools or platform team's capacity across requesting departments with a scored intake, a run-the-business share, a buffer and a published allocation others can challenge.
category: roadmapping
version: 1.0.0
status: incubating
stage: [plan]
role: [product-manager, operations-manager, manager, engineering-manager]
requires: [none]
inputs: [text, notes, dataset]
output: [table, plan, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [intake-scoring, keep-the-lights-on, shared-services, demand-management, allocation-rules]
pairs_with:
  prompts: [prioritize-features, push-back-on-roadmap-request, decline-feature-request]
  personas: [internal-tools-product-manager]
args:
  - name: requests_and_departments
    description: The requests on the table, which department asked, what each is for (hours saved, errors avoided, risk, revenue, deadlines) and any size estimate. A pasted tracker export is fine.
    type: text
    required: true
  - name: team_capacity
    description: Team size and real availability (holidays, support rota, maintenance and incidents), in people, person-weeks or points.
    type: text
    required: true
  - name: period
    description: The period the allocation covers.
    type: enum
    enum: [quarter, half, year]
    default: quarter
output_contract:
  format: markdown
  sections: [Capacity available, Allocation rule, Scored requests, Allocation by department, What does not fit, Published version, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help the owner of a shared internal team (internal tools, business systems, a platform or data team) decide how its capacity is split between the departments that depend on it. Without a rule, the queue is run by whoever escalates loudest, departments learn to inflate urgency, and maintenance never happens until something breaks. A good allocation is boring and visible: run-the-business work is reserved first, a buffer protects the plan from surprises, the rest is split by a published rule, and every department can see why it got what it got.

Period: one {{period}}.
</context>

<task>
Requests and departments:

<requests>
{{requests_and_departments}}
</requests>

Team capacity:

<team_capacity>
{{team_capacity}}
</team_capacity>

1. Convert capacity to one unit (person-weeks unless the user uses points) for the {{period}}. Remove holidays, support rota and meetings the user named; if they gave none, state the assumption.
2. Reserve run-the-business work first (maintenance, upgrades, licence and security work, small fixes, incident support): use the user's history if given, otherwise propose 25-40% and say why. Then reserve a buffer of 10-20% for urgent, unplanned requests, with a rule for who may draw on it.
3. Propose an allocation rule and say why it fits. Options: a guaranteed floor per department plus a shared pool for the highest-scoring work; weights agreed by leadership; or pure scoring. Recommend one.
4. Score each request on a short, published rubric: value (hours saved per year x people affected, errors or compliance risk avoided, revenue protected), urgency (a fixed external date, not a wish), size, strategic fit with stated company goals, and readiness (a named owner on the department side, data and process ready). Use 1-5 per criterion, show the arithmetic, and mark scores you inferred.
5. Fill the allocation in score order within each department's floor, then the shared pool. Do not split one request across periods unless it can ship usable value in this one.
6. List what does not fit, with the reason and what would change it (bigger allocation, smaller scope, department-side effort).
7. Write a short published version departments can read: the rule, each department's share, what is in and out, how to challenge a score, and when the allocation is revisited.
</task>

<constraints>
- Score requests on the information given. Missing value or size becomes a question or a labelled assumption, not an invented figure.
- Never let the allocation exceed capacity; totals must add up.
- A request with no named owner in the requesting department is not ready, whatever its score.
- Call out any request that is really a policy or process decision dressed as a tool request.
- Keep the tone neutral about departments: the rule decides, not opinions about who deserves more.
- If capacity or the request list is missing, ask for it and stop.
</constraints>

<output_format>
## Capacity available
Arithmetic from gross to net capacity, then the run-the-business reserve and buffer.

## Allocation rule
The chosen rule in three to five sentences and the scoring rubric as a table.

## Scored requests
Table: request | department | value | urgency | size | fit | readiness | total | notes.

## Allocation by department
Table: department | floor or share | requests in | capacity used.

## What does not fit
Bullets with reason and what would change it.

## Published version
A short note (under 250 words) ready to send to department heads.

## Questions
Open questions and assumptions to confirm.
</output_format>

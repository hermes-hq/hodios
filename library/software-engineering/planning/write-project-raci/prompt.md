---
schema: 1
id: write-project-raci
kind: prompt
title: Write a RACI for an engineering project
description: Builds a RACI matrix for an engineering project across engineering, product, design, QA, security and ops, and flags decisions with no owner or too many approvers.
category: planning
version: 1.0.0
status: incubating
stage: [plan]
role: [engineering-manager, tech-lead, project-manager]
stack: []
requires: [none]
inputs: [notes, text]
output: [table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [raci, decision-rights, accountability, stakeholders, roles-and-responsibilities]
pairs_with:
  prompts: [write-project-kickoff-brief, build-project-risk-register]
args:
  - name: project
    description: The project, its main activities and decisions if known, and anything already contested.
    type: text
    required: true
  - name: people
    description: The roles or teams involved (for example PM, tech lead, design, QA, security, SRE, legal, support).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Matrix, Problems found, Fixes, Decision rules]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A RACI is useful only for decisions and deliverables where ownership is unclear or contested; a matrix of every task is ignored. The rules that make it work: exactly one Accountable per row (the person who says yes or no and answers for the outcome); at least one Responsible doing the work; Consulted means two-way input before the decision, so keep it short because each C adds latency; Informed means told after. Common failures are rows with several A's (decision by committee), rows with no A (nobody decides, so it stalls), one person accountable for everything (a bottleneck), security or support consulted too late, and Consulted lists so long that nothing ships.
</context>

<task>
Project: {{project}}
People and teams: {{people}}

1. List the 12 to 25 rows that matter: key decisions (scope changes, architecture choice, launch go or no-go, rollback, data model, API contract, design sign-off, security exceptions, pricing or user-facing copy) and key deliverables (designs, test plan, runbook, docs, launch comms). Skip routine tasks with obvious owners.
2. Fill R, A, C, I for each role, using the names given. Where you have to guess, mark the cell with a question mark.
3. Check each row and column: no A or more than one A; no R; more than three C's; one role with A on most rows; a role that is never C or I but should be (security on data changes, support on launches, SRE on new services).
4. Propose fixes for each problem and explain the trade-off.
5. Add decision rules: how disagreements escalate, the response time expected from C's, and where decisions are recorded.
</task>

<constraints>
- Exactly one A per row in the final matrix.
- Do not invent people; use the roles given and mark assumptions with a question mark.
- Keep the matrix to decisions and deliverables people would otherwise argue about.
{{> output/uncertainty}}
</constraints>

<output_format>
## Matrix
Table: Decision or deliverable | one column per role, with R, A, C, I or blank.
## Problems found
Bullets, each naming the row or role.
## Fixes
Bullets with the change and the trade-off.
## Decision rules
Escalation path, C response time, decision log location.
</output_format>

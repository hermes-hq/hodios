---
schema: 1
id: write-project-kickoff-brief
kind: prompt
title: Write an engineering project kickoff brief
description: Writes the kickoff brief for an engineering project with goals, scope and non-goals, team and roles, milestones, risks, ways of working and open questions.
category: planning
version: 1.0.0
status: incubating
stage: [plan]
role: [tech-lead, engineering-manager, project-manager]
stack: []
requires: [none]
inputs: [spec, notes, text]
output: [docs, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [project-kickoff, project-brief, non-goals, ways-of-working, alignment]
pairs_with:
  prompts: [write-project-raci, build-project-risk-register, plan-project-milestones]
args:
  - name: project
    description: What the project is, why now, who asked for it, and any spec, design doc or notes you have.
    type: text
    required: true
  - name: team
    description: Who is on the project and the stakeholders around it.
    type: text
  - name: constraints
    description: Known dates, budgets, dependencies on other teams, compliance or technology constraints.
    type: text
output_contract:
  format: markdown
  sections: [Why, Goals and success measures, Scope and non-goals, Team and roles, Milestones, Risks and dependencies, Ways of working, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A kickoff brief exists so that everyone starts with the same picture and disagreements surface in week one, not in week eight. The parts that do the work are the ones people skip: measurable goals instead of activity, explicit non-goals, a single named decision maker, dependencies on other teams with names and dates, and the open questions listed with owners. A brief that reads well but hides uncertainty is worse than none. Keep it to what fits on two pages so people actually read it.
</context>

<task>
Project: {{project}}
{{#team}}Team and stakeholders: {{team}}{{/team}}
{{#constraints}}Constraints: {{constraints}}{{/constraints}}

1. Why: the problem and why it matters now, in three sentences, tied to a user or business outcome.
2. Goals and success measures: two to four goals, each with how you will know it worked (a metric, a date, an observable behaviour). Mark targets you do not have as [X].
3. Scope and non-goals: what is in, and at least three things a reasonable person might assume are in but are not.
4. Team and roles: who builds, who decides on scope, who approves technically, who must be consulted (security, design, data, support), and who is informed.
5. Milestones: three to six dated or relative milestones, each ending in something demonstrable.
6. Risks and dependencies: the top risks with an owner, and each dependency on another team with the contact and the date needed.
7. Ways of working: rituals and cadence, where decisions and docs live, how status is reported and to whom, and how scope changes are handled.
8. Open questions: each with an owner and a date to answer it by.
</task>

<constraints>
- Do not invent names, dates or metrics; use [X] and list them under Open questions.
- If no single decision maker is identifiable, say so as the first open question.
- Keep the brief under about two pages; link detail rather than including it.
{{> output/uncertainty}}
</constraints>

<output_format>
## Why
## Goals and success measures
Table: Goal | Measure | Target.
## Scope and non-goals
## Team and roles
Table: Role | Person | Responsibility.
## Milestones
Table: Milestone | Demonstrable result | Date.
## Risks and dependencies
Table: Item | Owner | Date needed or trigger.
## Ways of working
## Open questions
Table: Question | Owner | Answer by.
</output_format>

---
schema: 1
id: build-career-ladder
kind: prompt
title: Build a career ladder
description: Builds a career ladder or competency matrix for a role family with levels, expectations per dimension and examples of evidence. Use when defining levels for promotion, hiring or pay.
category: people-management
version: 1.0.0
status: incubating
stage: [design]
role: [manager, engineering-manager, executive, recruiter]
requires: [none]
inputs: [notes, document]
output: [table, docs, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [career-ladder, competency-matrix, levelling, career-framework, promotion-criteria]
pairs_with:
  prompts: [prepare-promotion-case, write-performance-review, write-job-description]
  personas: [hr-business-partner, leadership-coach]
args:
  - name: role_family
    description: The role family (for example software engineering, customer success, design), and whether it needs an individual-contributor track, a management track, or both.
    type: string
    required: true
  - name: levels
    description: How many levels the ladder should have.
    type: number
    default: 5
  - name: company_context
    description: Company size and stage, current titles and levels, what the ladder will be used for (promotion, hiring, pay bands), company values, and any existing framework. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Design choices, Level summary, Competency matrix, Evidence examples, Using the ladder, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an organisational design and people-practices lead who has built levelling frameworks for growing companies. A good ladder describes how the scope, autonomy, complexity and influence of the work grow from level to level, so that people can see what the next level looks like and managers apply the same bar. Ladders fail when they use years of experience as a criterion, describe personality instead of behaviour, change wording between levels without changing substance ("good", "very good", "excellent"), become checklists that people game, or are so long nobody reads them.

Role family: {{role_family}}
Levels: {{levels}}
{{#company_context}}
<company_context>
{{company_context}}
</company_context>
{{/company_context}}
</context>

<task>
1. Design choices: propose four to six dimensions for this role family (for example impact and scope, craft or technical skill, execution and ownership, collaboration and communication, leadership and influence), with one line on why each matters. Decide whether a separate management track is needed and at which level it branches, and name the levels with neutral titles. State each choice so the user can change it.
2. Level summary: for each of the {{levels}} levels, a one-sentence summary of the scope of impact (task, project, team, multiple teams, organisation), the autonomy expected, and the typical kind of problem.
3. Competency matrix: for each dimension and level, two or three observable expectations. Each level must differ in substance from the one below (bigger scope, more ambiguity, more people influenced), not just stronger adjectives. Expectations at a level include those below it unless stated.
4. Evidence examples: for each dimension, one or two concrete examples of evidence at two adjacent levels, showing what crossing that boundary looks like in this role family.
5. Using the ladder: how to use it for promotion (sustained performance at the next level across most dimensions, not a checklist), for hiring (mapping interview evidence to a level), and for development; how to calibrate across managers; and how often to revise it.
6. Open questions for the user before adoption, and a short rollout plan (draft with managers, test on a few anonymised real cases, adjust, communicate).
</task>

<constraints>
- No years of experience, degrees or personality traits as criteria.
- Write expectations as behaviour and outcomes a manager could observe.
- Keep each matrix cell to at most three short bullet points.
- Use only the company facts given; where you assume a context (for example a startup of about 100 people), say so.
- Do not attach pay figures; if pay bands are a goal, say what data to collect.
</constraints>

<output_format>
## Design choices
## Level summary
Table: Level | Title | Scope | Autonomy | Typical problems.
## Competency matrix
One table per dimension: Level | Expectations.
## Evidence examples
## Using the ladder
## Open questions
</output_format>

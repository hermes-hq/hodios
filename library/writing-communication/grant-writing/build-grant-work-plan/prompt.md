---
schema: 1
id: build-grant-work-plan
kind: prompt
title: Build the work plan and timeline for a grant proposal
description: Turns a project's activities into a grant work plan with work packages, a month-by-month timeline, milestones, deliverables, leads and dependencies, checked against the budget and the funder's dates.
category: grant-writing
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, researcher, project-manager, writer]
requires: [none]
inputs: [text, document]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [work-plan, project-timeline, milestones, deliverables, work-packages]
pairs_with:
  prompts: [build-grant-budget, write-grant-risk-register, write-grant-key-personnel-section]
  personas: [grant-writer]
args:
  - name: activities
    description: What the project will do, who does it, any partners, and the outputs and outcomes expected.
    type: text
    required: true
  - name: duration_and_start
    description: The grant length and expected start date, plus known fixed dates (school terms, seasons, events, reporting deadlines).
    type: text
    required: true
  - name: funder_requirements
    description: How the funder wants the work plan shown (Gantt chart, table, work packages, milestones per year) and any limits. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Work packages, Timeline, Milestones and deliverables, Dependencies and critical path, Consistency checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a grant writer with project management experience. Reviewers use the work plan to judge feasibility, and the common failures are easy to spot: delivery starting in month one when staff have not been recruited, everything finishing in the last month, ethics or permissions missing, summer holidays or harvest seasons ignored, evaluation squeezed in at the end, and a timeline that does not match the budget (staff paid for months with no activity, or activity with no staff). A realistic plan allows a start-up period (recruitment often takes two to four months), puts approvals before the activities that depend on them, spreads milestones so progress can be checked, builds in buffer, and lines up reporting dates with milestones the funder will want to see.

<activities>
{{activities}}
</activities>

<duration_and_start>
{{duration_and_start}}
</duration_and_start>
{{#funder_requirements}}
<funder_requirements>
{{funder_requirements}}
</funder_requirements>
{{/funder_requirements}}
</context>

<task>
1. Group the activities into three to seven work packages (including project management and evaluation), each with an objective, a lead role and the main tasks.
2. Build the timeline by month or quarter as a text Gantt table (rows are tasks, columns are periods, filled cells marked with an X), including start-up, recruitment, approvals, delivery, evaluation, dissemination and close-down.
3. List milestones (points where progress can be checked) and deliverables (things produced), each with a due month and how it will be evidenced. Aim for at least one milestone every three to six months.
4. Dependencies and critical path: which tasks cannot start until others finish, the chain that sets the end date, and where buffer has been placed.
5. Consistency checks: staff months in the plan against staff costs in the budget if given; holidays, seasons and fixed dates; reporting dates against milestones; anything that looks impossible in the time.
6. Gaps: missing facts, marked [NEEDED: ...].
</task>

<constraints>
- Do not invent activities, partners or dates that the input does not support; propose additions as suggestions.
- Keep the timeline inside the grant period; flag anything that would need to happen before the start date or after the end.
- Use the funder's format if specified.
</constraints>

<output_format>
## Work packages
## Timeline
Gantt table by month or quarter.
## Milestones and deliverables
Table: ID | Milestone or deliverable | Month | Evidence.
## Dependencies and critical path
## Consistency checks
Including gaps.
</output_format>

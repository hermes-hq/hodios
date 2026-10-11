---
schema: 1
id: design-issue-tracker-structure
kind: prompt
title: Design an issue tracker setup
description: Designs a Jira, Linear or GitHub Issues setup for engineering teams with projects, issue types, workflow states, fields, labels and conventions people will keep up.
category: planning
version: 1.0.0
status: incubating
stage: [plan, design]
role: [engineering-manager, tech-lead, project-manager]
stack: []
requires: [none]
inputs: [notes, text]
output: [plan, table, docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [issue-tracker, linear, github-issues, workflow-states, labels, team-conventions]
pairs_with:
  prompts: [design-kanban-workflow, write-bug-severity-policy, choose-scrum-or-kanban]
args:
  - name: teams
    description: The teams, what they work on, how they plan (sprints, kanban, none), and who else files work (support, product, other teams).
    type: text
    required: true
  - name: tool
    description: The tracker in use or being considered, for example Jira, Linear, GitHub Issues, GitLab, Azure Boards.
    type: string
    required: true
  - name: pain_points
    description: What is wrong with the current setup, if any (duplicate statuses, fields nobody fills, lost bugs, unreadable reports).
    type: text
output_contract:
  format: markdown
  sections: [Principles, Structure, Issue types and fields, Workflow, Labels and conventions, Reporting, Migration and cleanup]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Trackers decay in the same way everywhere: every team adds statuses and required fields, labels multiply with spelling variants, nobody can tell a bug from a task, and the reports managers want need data that engineers never enter. The setups that last are minimal: few issue types with clear meanings, a workflow that mirrors how work actually flows (with a clear definition of each state), as few required fields as possible because required fields get junk values, a controlled label list with an owner, and one intake path for requests from outside the team. Every field should exist because a decision or report depends on it.
</context>

<task>
Teams: {{teams}}
Tool: {{tool}}
{{#pain_points}}Current problems: {{pain_points}}{{/pain_points}}

1. State three to five principles for this setup, drawn from the input (for example "one intake for support bugs").
2. Structure: projects, teams or boards, and how work is grouped above the issue level (epics, initiatives, milestones, cycles). Use the tool's own terms and say where a feature depends on the tool's plan or edition.
3. Issue types and fields: each type with its meaning and when to use it; each field with who fills it, when, and the decision or report that needs it. Keep required fields to the minimum.
4. Workflow: states with entry and exit definitions, who moves issues between them, and automation worth enabling (linking pull requests, closing on merge, stale reminders). Keep to about five to seven states.
5. Labels and conventions: a controlled label list grouped by purpose, title and description conventions, how priority and severity are set, and who owns the configuration.
6. Reporting: the three to five reports or views each audience needs and the fields they depend on.
7. Migration and cleanup: how to move from the current setup (map old states and fields, archive dead labels, bulk-close stale issues after a notice period), and a quarterly hygiene check.
</task>

<constraints>
- Do not claim the tool has features you are not sure of; say "check whether your plan supports this".
- Prefer removing configuration over adding it.
- Bulk changes such as closing or deleting issues happen only after the team agrees and has a notice period; never suggest deleting history.
{{> output/uncertainty}}
</constraints>

<output_format>
## Principles
## Structure
## Issue types and fields
Tables: Type | Meaning | Use when; Field | Filled by | When | Needed for.
## Workflow
Table: State | Entry rule | Exit rule | Owner. Then automations.
## Labels and conventions
## Reporting
Table: Audience | View or report | Fields used.
## Migration and cleanup
Numbered steps, then the quarterly check.
</output_format>

---
schema: 1
id: design-content-production-pipeline
kind: prompt
title: Design a content production pipeline
description: Designs a content production pipeline for a small team or volunteer group, with stages, owners, status definitions, approval limits, templates, file homes and a weekly 20-minute stand-up.
category: content-strategy
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [content-creator, editor, manager, operations-manager]
subject: [nonprofit]
requires: [none]
inputs: [text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [editorial-workflow, approvals, kanban, raci, standup, file-management]
pairs_with:
  prompts: [plan-content-calendar, write-editorial-guidelines, plan-content-repurposing-system]
  personas: [content-strategist]
args:
  - name: team
    description: Who is involved, their roles, hours or days per week, whether they are paid or volunteers, and who currently approves content.
    type: text
    required: true
  - name: content_types
    description: What you publish and how often, for example "weekly blog post, 3 social posts a week, monthly newsletter, quarterly report".
    type: text
    required: true
  - name: tools
    description: Tools you already use for tasks, files and chat, for example "shared drive, a spreadsheet, group chat". Leave empty if none.
    type: string
    default: a shared drive, a spreadsheet and a group chat
output_contract:
  format: markdown
  sections: [Pipeline at a glance, Stages and status definitions, Owners, Approval rules, Templates and file homes, Weekly stand-up, First two weeks]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design how content moves from idea to published and reused for a small team, agency pod or volunteer group. Small teams rarely lack ideas; they lose time in the gaps: drafts that live in someone's inbox, one senior person who must approve everything and is never available, statuses nobody agrees on ("done" meaning drafted to one person and published to another), and finished pieces that are never repurposed. A good pipeline has few stages with clear exit criteria, one owner per piece at every moment, approval only where risk justifies it with a time limit, one home for files, and a short weekly check that moves stuck items.

Tools in use: {{tools}}
</context>

<task>
<team>
{{team}}
</team>

<content_types>
{{content_types}}
</content_types>

1. Pipeline at a glance: five to seven stages, for example Idea, Brief, Drafting, Review, Ready, Published, Repurposed. Give each a one-line exit criterion ("Brief: audience, goal, key message, format and due date written").
2. Status definitions: what each status means, who moves an item into it, and the maximum days an item should sit there before it is raised at stand-up.
3. Owners: a table for each content type showing who drafts, who reviews, who approves, who publishes and who repurposes. Exactly one owner per piece at each stage; flag anyone who owns too much for their hours.
4. Approval rules: tier content by risk. Low risk (routine social posts, event reminders) is approved by the drafter or a peer; medium (newsletter, blog) by an editor; high (statements, sensitive topics, fundraising claims, anything legal or about people's stories) by a named senior person, with a deputy. Set a response time limit (for example two working days) after which the deputy decides. Remove single-approver bottlenecks.
5. Templates and file homes: the briefs, checklists and templates to create (brief, pre-publish checklist, image specs, repurposing checklist), one folder structure and a file-naming pattern (date_type_title_version), and where final versions live.
6. Weekly stand-up: a 20-minute agenda (stuck items first, this week's publishing, approvals due, next week's briefs, one improvement), who runs it and how it works for volunteers who cannot attend (async update by a fixed time).
7. First two weeks: steps to switch over without stopping publishing.
</task>

<constraints>
- Design around the hours people actually have; volunteers get small, clearly bounded tasks and a back-up for every regular duty.
- Use the tools they already have unless something essential is missing; name a type of tool, not a brand.
- No more than seven stages; fewer is better for teams under five people.
- If team members, roles or content volumes are missing, ask for them and stop or mark [X].
</constraints>

<output_format>
## Pipeline at a glance
A one-line flow (Idea → Brief → ...) then a table: stage | exit criterion | max days.

## Stages and status definitions
Bullets.

## Owners
Table: content type | drafts | reviews | approves | publishes | repurposes.

## Approval rules
Table: risk tier | examples | approver | deputy | time limit.

## Templates and file homes
Bullets for each template, then the folder tree and naming pattern.

## Weekly stand-up
Timed agenda.

## First two weeks
Numbered steps.
</output_format>

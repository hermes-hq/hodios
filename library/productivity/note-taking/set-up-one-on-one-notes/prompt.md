---
schema: 1
id: set-up-one-on-one-notes
kind: prompt
title: Set up one-on-one notes for your team
description: Sets up a manager's running notes for each direct report - a shared agenda doc, private notes, goals, feedback given, commitments both ways and a quarterly look-back - in the tool you already use.
category: note-taking
version: 1.0.0
status: incubating
stage: [plan, build]
role: [manager, engineering-manager, executive, operations-manager]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
depth: specific
tags: [one-on-ones, direct-reports, running-agenda, feedback-log, manager-notes]
pairs_with:
  prompts: [plan-one-on-one, prepare-for-one-on-one, write-note-templates, set-up-work-logbook]
args:
  - name: team
    description: How many direct reports, how often you meet, remote or in person, and anything notable, for example "6 reports, weekly 30 minutes, two are new, one remote".
    type: text
    required: true
  - name: tool
    description: Where you keep notes, for example "Google Docs and Notion", "OneNote", "Confluence", "paper".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Structure, Shared agenda template, Private notes template, Feedback log, Weekly rhythm, Quarterly look-back, Handling rules]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Managers with several reports lose track of what was said, promised and agreed, which shows up at review time as vague feedback and forgotten commitments. The pattern that works is two documents per report: a shared running agenda (one document per person, newest meeting at the top, both people add topics before the meeting, actions recorded with owners) and private manager notes kept separately for things not yet ready to share. Alongside sit goals or development areas, a log of feedback given with dates and examples, and a quarterly look-back that turns the year's notes into review evidence instead of recency bias. Private notes about employees can be requested by them in many jurisdictions, may be disclosable in disputes, and are covered by the employer's data rules: write them factually, as if the person might read them, and keep health or personal matters to what the organisation's policy allows.

Team: {{team}}
Tool: {{tool}}
</context>

<task>
1. Lay out the structure per report in the chosen tool: shared running agenda, private notes, goals, feedback log, and where each lives with sharing settings.
2. Write the shared running agenda template: date, their topics first, your topics, progress on goals, actions with owner and due date, carried-over items.
3. Write the private note template with prompts for observations written as facts and examples.
4. Write the feedback log format: date, situation, behaviour, impact, what was said, response.
5. Give the weekly rhythm: five minutes before each one-on-one to review last actions and add topics, two minutes after to record actions.
6. Give the quarterly look-back steps that turn notes into themes, wins and growth areas for reviews.
7. Note handling rules: factual wording, separating sensitive matters per employer policy, what to do if a report leaves or moves teams.
</task>

<constraints>
- Keep templates short enough to use weekly.
- Advise writing private notes factually and without speculation about health, personal life or protected characteristics.
- Do not give legal advice; say that HR or the employer's policy governs retention and access to employee records.
- Do not suggest recording meetings without consent.
</constraints>

<output_format>
## Structure
## Shared agenda template
## Private notes template
## Feedback log
## Weekly rhythm
## Quarterly look-back
## Handling rules
</output_format>

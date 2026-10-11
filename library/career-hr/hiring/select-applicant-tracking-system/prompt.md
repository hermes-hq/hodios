---
schema: 1
id: select-applicant-tracking-system
kind: prompt
title: Select an applicant tracking system
description: Turns a team's hiring process into requirements for an applicant tracking system, a weighted scoring sheet, a scripted demo plan and the data, integration and cost questions to put to vendors.
category: hiring
version: 1.0.0
status: incubating
stage: [plan]
role: [recruiter, operations-manager, founder]
requires: [none]
inputs: [notes, text]
output: [table, checklist, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [applicant-tracking-system, recruiting-software, vendor-selection, software-evaluation, demo-script]
pairs_with:
  prompts: [select-hr-system, audit-candidate-experience]
  personas: [recruiter]
args:
  - name: hiring_setup
    description: How many hires per year, roles and locations, who is involved in hiring, the current tools (spreadsheets, email, an old system), and the main pain points.
    type: text
    required: true
  - name: constraints
    description: Budget, systems it must connect to (HR system, calendar, job boards, background checks), data residency needs, the country, and the deadline. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Needs, Requirements, Scoring sheet, Demo script, Vendor questions, Decision and rollout]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help talent teams choose recruiting software. Applicant tracking system choices go wrong when teams compare feature lists in vendor-led demos, buy for an enterprise process they do not have, or discover after signing that the system does not connect to their calendar or HR system, that hiring managers find it too hard to use, or that the price rises sharply with users or job slots. A sound selection starts from the team's real hiring workflow and volume, separates must-haves from nice-to-haves, makes vendors demonstrate the team's own scenarios with their own sample data, checks data protection (candidate data retention, consent, deletion) and any automated screening features carefully, and looks at total cost over three years, including setup and migration.

<hiring_setup>
{{hiring_setup}}
</hiring_setup>
{{#constraints}}
<constraints_from_user>
{{constraints}}
</constraints_from_user>
{{/constraints}}
</context>

<task>
1. Needs: summarise the current workflow, the pain points, and the size category that fits (a simple tool for a few hires a year, a mid-market system, or an enterprise platform), and whether an ATS is needed at all yet.
2. Requirements: must-haves and nice-to-haves grouped by area (job posting and careers page, application and screening, pipeline and collaboration, scheduling, scorecards and feedback, offers, candidate communication, reporting, integrations, data protection and retention, accessibility, admin and permissions), each tied to a pain point.
3. Scoring sheet: weighted criteria (fit to workflow, ease of use for hiring managers, integrations, reporting, data protection, support, total cost) with a 1-5 scale and what each score means.
4. Demo script: four to six scenarios from the team's real process that each vendor must show live (for example, post a role, move a candidate through stages with a hiring manager on a phone, schedule a panel, collect scorecards, send an offer, delete a candidate's data on request).
5. Vendor questions: about pricing model and increases, contract length and exit, data location and retention, consent and deletion, any AI or automated ranking features and how they are tested for bias, integrations, migration, security certifications, and support.
6. Decision and rollout: a timeline from shortlist to go-live, who should be on the selection group, a pilot, migration of open candidates, training, and adoption measures.
</task>

<constraints>
- Do not name, rank or recommend specific vendors or quote their prices; describe what to compare.
- If the hiring volume is low, say honestly if a simpler tool or spreadsheet with good process would do.
- Treat automated screening or ranking features as a risk to evaluate, not a selling point.
- Keep requirements tied to the stated workflow; do not pad the list.
</constraints>

<output_format>
## Needs
## Requirements
Table: Area | Requirement | Must or nice | Pain point it solves.
## Scoring sheet
Table: Criterion | Weight | What 1, 3 and 5 look like.
## Demo script
## Vendor questions
## Decision and rollout
</output_format>

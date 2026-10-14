---
schema: 1
id: prepare-funder-site-visit
kind: prompt
title: Prepare for a funder site visit
description: Prepares an organisation for a visit from a funder or assessor - agenda, who they meet, likely questions with honest answers, consent and dignity for participants, and follow-up.
category: grant-writing
version: 1.0.0
status: incubating
stage: [plan]
role: [executive, manager, founder]
requires: [none]
inputs: [text, notes]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [site-visit, funder-relations, programme-officer, assessment-visit, stakeholder-prep]
pairs_with:
  prompts: [prepare-grant-panel-interview, write-grant-report]
  personas: [grant-writer]
args:
  - name: visit_details
    description: Who is visiting, from which funder, whether it is before a decision or during a grant, how long, and what they asked to see.
    type: text
    required: true
  - name: organisation_and_project
    description: What you do, the project in question, recent results, current challenges, and finances in brief.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Purpose of the visit, Agenda, People and roles, Likely questions, Consent and logistics, Follow-up]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a development director who has hosted many funder visits. Funders visit to check that the organisation is real, well run and able to deliver, to see the work, and to understand risks they read about in the application. Experienced hosts plan a visit that shows the work as it normally happens rather than a staged show; they let the visitor meet front-line staff and, with genuine consent, participants who want to speak; they prepare honest answers about challenges and finances, because programme officers trust organisations that name problems and their responses; and they never put vulnerable people on display. A visit before a decision is part of the assessment; a visit during a grant is part of the relationship.

<visit_details>
{{visit_details}}
</visit_details>

<organisation_and_project>
{{organisation_and_project}}
</organisation_and_project>
</context>

<task>
1. Purpose of the visit: what the visitor most likely needs to learn, given the visit type, and the three things you want them to leave knowing.
2. Agenda: a timed plan within the visit length: welcome and short overview (no long slide deck), seeing the work in action, conversation with front-line staff, optional conversation with participants or partners, a frank session on finances, risks and plans with the leader, and a wrap-up with next steps. Leave buffer time.
3. People and roles: who attends each part, who leads, who answers finance, delivery and data questions, and a short briefing for each person (what the funder cares about, what not to overclaim).
4. Likely questions: ten to twelve questions, including hard ones (sustainability after the grant, reserves and financial health, staff turnover, why targets were missed, what you would do with less money, governance), each with an honest answer drawn from the facts given or a note on what to prepare.
5. Consent and logistics: how participants are invited and can decline without consequence, what they are told, privacy and photos (none without consent), safeguarding for children or vulnerable adults, accessibility, travel and parking, and documents to have ready (latest accounts, budget versus actual, outcome data).
6. Follow-up: a thank-you email within a few days, any documents promised, and a note of what was learned.
</task>

<constraints>
- Do not stage activities or coach participants on what to say; participants speak for themselves or do not take part.
- Do not invent results, finances or answers; mark items to prepare.
- Prefer honesty about challenges, with the response to each, over a polished picture.
- Protect privacy: no case files, names or photos of participants shared without consent.
</constraints>

<output_format>
## Purpose of the visit
## Agenda
A table: Time | Activity | Who | Purpose.
## People and roles
## Likely questions
A table: Question | Who answers | Answer or what to prepare.
## Consent and logistics
## Follow-up
</output_format>

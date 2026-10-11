---
schema: 1
id: start-new-job-notebook
kind: prompt
title: Start a new-job notebook
description: Sets up a notebook for the first months in a new job - people and who does what, acronyms, systems, processes, open questions and early wins - with templates and a daily ten-minute habit.
category: note-taking
version: 1.0.0
status: incubating
stage: [plan, build]
role: [individual, job-seeker, manager]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [new-starter, new-job, glossary, people-notes, first-90-days]
pairs_with:
  prompts: [set-up-work-logbook, build-personal-crm, write-note-templates, plan-first-90-days]
args:
  - name: role
    description: The new role, organisation type and size, for example "senior nurse joining a large hospital ward" or "first marketing hire at a 20-person startup".
    type: text
    required: true
  - name: tools
    description: Where the notes will live, for example "OneNote on my work laptop" or "a paper notebook plus Notion".
    type: string
    required: true
  - name: start_date
    description: Optional - when you start, so the plan can be laid out by week.
    type: string
output_contract:
  format: markdown
  sections: [Structure, Templates, Daily habit, First four weeks, Using it at reviews, Do not write down]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The first months in a job are when the most new information arrives and when it is most embarrassing to ask twice. New starters who do well keep a structured notebook rather than scattered jottings: a people page (names, roles, who to ask about what, how they like to communicate), a glossary of acronyms and internal names, a systems page (tools, logins handled elsewhere, where things live), process notes written as steps the first time they do something, a running list of questions with answers, and a log of early wins and feedback for probation and reviews. The notebook also feeds a handover document later. Work notes belong in tools the employer allows: confidential information, client data and personal data about colleagues should follow the organisation's rules, and nothing sensitive goes in a personal app without permission.

Role: {{role}}
Notes tools: {{tools}}
{{#start_date}}
Start date: {{start_date}}
{{/start_date}}
</context>

<task>
1. Propose the notebook structure for the role and tool, as sections or pages.
2. Write templates for: a person note, a glossary entry, a process note, a meeting note with actions, and the questions list.
3. Tailor the glossary and systems pages to the kind of organisation with starter headings (not invented terms).
4. Give a daily ten-minute habit: capture new names and terms, move answered questions, log one win or piece of feedback.
5. Give a week-by-week plan for the first four weeks of what to capture, including a list of good questions to ask a manager and teammates.
6. Explain how this notebook feeds a 30, 60, 90-day check-in and probation review.
7. Add a short note on what not to write down (passwords, confidential client or patient details, opinions about colleagues they would not want read).
</task>

<constraints>
- Do not invent the employer's terms, systems or processes; provide headings for the person to fill.
- Keep the structure light; at most seven sections.
- Respect workplace confidentiality and data rules; recommend the employer's approved tools for work content.
- Person notes cover work-relevant details only.
</constraints>

<output_format>
## Structure
## Templates
Each in a fenced block.
## Daily habit
## First four weeks
## Using it at reviews
## Do not write down
</output_format>

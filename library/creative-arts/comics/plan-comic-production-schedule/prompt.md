---
schema: 1
id: plan-comic-production-schedule
kind: prompt
title: Plan a comic production schedule
description: Plans the production of a comic from script to print-ready files, with a per-page time budget by stage, a dated schedule with buffer, a hand-off pipeline for teams, and weekly tracking.
category: comics
version: 1.0.0
status: incubating
stage: [plan]
role: [artist, writer]
requires: [none]
inputs: [text, preferences]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [production-schedule, page-rate, pipeline, deadlines, burnout-prevention]
pairs_with:
  prompts: [plan-webcomic-series, plan-comic-anthology]
  workflows: [graphic-novel-track]
args:
  - name: project
    description: What is being made (page count, colour or black and white, format), what is done already, and who does each stage (script, thumbnails, pencils, inks, flats, colours, letters, production).
    type: text
    required: true
  - name: deadline
    description: The date the files are due, and why (printer, publisher, crowdfunding promise, convention).
    type: string
    required: true
  - name: capacity
    description: Hours per week each person can give, and any measured times per page per stage. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, Time budget per page, Schedule, Team pipeline, Buffer and risks, Weekly tracking]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a comics production manager. Comics are late for predictable reasons: page rates are guessed instead of timed, revision rounds are not scheduled, the colourist and letterer are booked to start the day the last inks arrive, and the final production pass (covers, front matter, file checks, proofs) is forgotten. A schedule works when it is built backwards from the real deadline, uses measured times per stage, overlaps stages so later people start on early pages, and keeps a buffer of about 15 to 20 percent that is not spent on new ambition.

Project: {{project}}
Deadline: {{deadline}}
{{#capacity}}Capacity: {{capacity}}{{/capacity}}
</context>

<task>
1. Assumptions: today's starting point, the stages in this project and who owns each. If times per page are not measured, give a rough provisional estimate per stage marked as a guess, and tell each person to time three pages before the schedule is trusted.
2. Time budget per page: hours per page for each stage and in total, and the resulting pages per week per person given their hours.
3. Schedule: work backwards from {{deadline}}: final delivery, proofs and corrections, production pass (covers, front and back matter, file checks), lettering, colours, inks, pencils, thumbnails and script approvals. Give dated milestones and how many pages must be finished each week.
4. Team pipeline: if more than one person works on it, the hand-off order in batches (for example every five pages), when each person starts, and where approvals sit. If one person does everything, say whether to work stage by stage across all pages or page by page, and why.
5. Buffer and risks: where the buffer sits, what happens if the project falls a week behind (cut what, simplify what, ask for what), and the first signs of burnout to watch for.
6. Weekly tracking: a simple table the team updates each week.
</task>

<constraints>
- If the work cannot fit before the deadline at the stated capacity, say so with the numbers and offer options (simplify rendering, add help, reduce pages, move the date) instead of a schedule that only works on paper.
- Do not invent printer lead times or publisher rules; ask, or mark them to confirm.
- Leave weekends and rest in the plan unless the creator says otherwise.
</constraints>

<output_format>
## Assumptions
## Time budget per page
A table: Stage | Owner | Hours per page | Pages per week.
## Schedule
A table: Week or date | Milestone | Pages due | Owner.
## Team pipeline
## Buffer and risks
## Weekly tracking
A blank table: Week | Planned pages by stage | Done | Behind by | Action.
</output_format>

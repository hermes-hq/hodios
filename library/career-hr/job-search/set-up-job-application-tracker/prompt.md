---
schema: 1
id: set-up-job-application-tracker
kind: prompt
title: Set up a job application tracker
description: Builds a job application tracker in a spreadsheet, Notion or on paper with stages, follow-up dates, contact notes and weekly targets, plus a weekly review that shows which channels work.
category: job-search
version: 1.0.0
status: incubating
stage: [plan]
role: [job-seeker]
stack: [excel, google-sheets, notion]
requires: [none]
inputs: [preferences]
output: [table, code, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [application-tracker, job-pipeline, follow-ups, conversion-rates, weekly-review]
pairs_with:
  prompts: [plan-job-search, write-follow-up-email, analyze-job-posting]
  personas: [career-coach]
args:
  - name: tool
    description: Where the tracker will live. spreadsheet gives columns and formulas that work in common spreadsheet apps; notion gives database properties and views; paper gives a notebook layout and a weekly tally.
    type: enum
    enum: [spreadsheet, notion, paper]
    default: spreadsheet
  - name: applications_per_week
    description: How many applications you aim to send each week.
    type: number
    default: 10
  - name: search_context
    description: Optional details that shape the tracker - target roles, whether you also network or use recruiters, hours per week for the search, a date you need a job by.
    type: text
output_contract:
  format: markdown
  sections: [Stages, Columns, Build it, Follow-up rules, Weekly targets, Weekly review]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A job search without a tracker leaks: follow-ups are forgotten, the same company is applied to twice, interview notes are lost, and after six weeks nobody can say whether referrals or job boards are working. A good tracker is small enough to update in two minutes a day, records the source of every application so conversion rates by channel can be compared, and turns follow-up dates into a daily to-do list. It is not a search plan (which companies, which roles); it is the instrument that tells you whether the plan is working.

Tool: {{tool}}
Applications per week: {{applications_per_week}}
{{#search_context}}
<search_context>
{{search_context}}
</search_context>
{{/search_context}}
</context>

<task>
1. Stages: define a short list of stages with a one-line definition and exit rule each: Saved, Applied, Screen, Interview, Final, Offer, and the closed states Rejected, Withdrawn and No response (after a set number of days without reply, default 21).
2. Columns: the fields to track, each with type, allowed values and why it matters. Include at least: company, role, link, date found, date applied, source (job board, company site, referral, recruiter, networking, other), contact name and channel, stage, next action, next action date, salary range if posted, notes, and date closed with reason.
3. Build it for {{tool}}:
   - spreadsheet: the header row in order, data-validation lists for stage and source, and formulas written for both common spreadsheet apps where they differ: a "follow-up due" flag (next action date on or before today and stage not closed), days since applied, a count per stage, and response rate by source (applications that reached Screen or later divided by applications from that source). Name the column letters you assume and keep them consistent with the header row. Suggest conditional formatting for overdue follow-ups.
   - notion: database properties with types, select options, a formula property for "follow-up due", and three views (board by stage, table filtered to due follow-ups, table grouped by source).
   - paper: a two-page notebook spread layout, a daily line format, colour or symbol codes for stage, and a weekly tally table for counting by source and stage.
4. Follow-up rules: default timings to adapt - follow up on an application after about a week to ten days if there is a contact, send a thank-you within a day of an interview, check in a couple of days after a promised decision date, and move to No response after the set period. Explain how the next action date implements each.
5. Weekly targets: break {{applications_per_week}} applications into daily actions alongside other activities if the context mentions networking or recruiters, and sanity-check the number against the hours available, saying if it looks too high to do well.
6. Weekly review: a 20-minute routine with the questions to answer each week (what moved, response rate by source, which roles get screens, what to change next week) and a rule of thumb for when there is enough data to compare channels (for example at least ten applications from a source).
7. Before answering, check every formula references the correct columns from the header row and that stage names match exactly between the list and the formulas.
</task>

<constraints>
- Keep it simple: no more columns than someone will maintain daily. Mark optional columns as optional.
- Use only standard functions that work in the major spreadsheet apps; if a function differs, give both versions.
- Do not invent application data. Example rows, if shown, are clearly labelled as examples.
- Remind the user to keep personal data of contacts minimal and private, since the tracker holds other people's names and details.
</constraints>

<output_format>
## Stages
Table: Stage | Means | Moves on when.
## Columns
Table: Column | Type | Allowed values | Why.
## Build it
Instructions for {{tool}}, with formulas or properties in code blocks.
## Follow-up rules
## Weekly targets
## Weekly review
Checklist of review questions.
</output_format>

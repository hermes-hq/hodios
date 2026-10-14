---
schema: 1
id: design-homeschool-record-system
kind: prompt
title: Design a homeschool record system
description: Designs a light daily and weekly record-keeping system for homeschooling, with what to log, templates, where samples and photos go, and a monthly tidy so reviews and reports take hours not weeks.
category: homeschooling
version: 1.0.0
status: incubating
stage: [build]
role: [parent]
requires: [none]
inputs: [preferences]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [record-keeping, attendance-log, work-samples, templates, organising]
pairs_with:
  prompts: [build-homeschool-portfolio, write-homeschool-progress-report, write-homeschool-transcript]
args:
  - name: family
    description: "Children's ages and how you homeschool."
    type: text
    required: true
  - name: purpose
    description: "What the records are for: a review or report, a portfolio, a transcript, possible return to school, or your own tracking."
    type: text
    required: true
  - name: preferences
    description: "Optional: paper, digital or both, devices you use, and how much time you will give it."
    type: string
output_contract:
  format: markdown
  sections: [What to record, Format and home, Templates, Routine, Rolling up, Privacy and backup, Confirm with your authority]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help homeschooling parents keep records as they go, so that portfolios, annual reports, reviews, transcripts or a return to school are easy, and so they can see progress themselves. Parents usually fail in one of two ways: they record nothing and then reconstruct a year from memory in a panic, or they build a system so detailed it collapses by October. A system that lasts takes two minutes a day: a dated log of what each child did (a line per subject or activity, or a photo with a caption), a running reading list, dated work samples kept monthly rather than everything, a place for outside classes and trips, and a short weekly note on progress and concerns. Digital, paper and hybrid all work if there is one home for everything. Some places require specific records (attendance days, hours, subjects) and others require none; the system should capture what is required where the family lives, checked with the official authority.

Family: {{family}}
What you will need records for: {{purpose}}
{{#preferences}}Preferences: {{preferences}}{{/preferences}}
</context>

<task>
1. List what to record, per child, based on the purpose: daily log items, reading list, samples, outside learning, hours or days if required, and weekly notes.
2. Choose a format (paper, digital, hybrid) that fits the family's preferences and explain the single home for everything.
3. Give templates: a daily log line format, a weekly note, a reading list entry, and a sample label (date, subject, what it shows).
4. Set the routine: what happens daily (two minutes), weekly (ten minutes) and monthly (choose samples, back up photos, tidy).
5. Show how the records roll up into a term review, annual report or portfolio.
6. Note privacy and backup: where files are stored, who can see them, and keeping copies.
7. List what to confirm with the official authority about required records.
</task>

<constraints>
- Do not state what the law requires; list questions to confirm with the official authority.
- Keep the daily load to a couple of minutes; cut anything that will not be used.
- Do not recommend a specific paid app as necessary; describe features to look for and free options in general terms.
- Keep children's personal data private; avoid public sharing of records by default.
</constraints>

<output_format>
## What to record
Table: Item | How often | Why.
## Format and home
## Templates
## Routine
Daily, weekly, monthly checklist.
## Rolling up
## Privacy and backup
## Confirm with your authority
</output_format>

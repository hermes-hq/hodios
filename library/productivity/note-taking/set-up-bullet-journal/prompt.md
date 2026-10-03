---
schema: 1
id: set-up-bullet-journal
kind: prompt
title: Set up a bullet journal
description: Designs a bullet journal or paper planner setup for the person's needs - a key, collections, future, monthly and daily logs and a migration routine that fits their time.
category: note-taking
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, student, parent]
requires: [none]
inputs: [preferences, text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [bullet-journal, paper-planner, rapid-logging, analog-planning, task-migration]
pairs_with:
  prompts: [set-up-task-system, design-habit-plan, run-weekly-review]
args:
  - name: needs
    description: What you want the journal to do for you, for example "track uni deadlines and shifts, plan meals, see my habits", plus what went wrong with planners before.
    type: text
    required: true
  - name: time_per_day
    description: How much time you can give the journal on a normal day, for example "5 minutes" or "15 minutes morning and evening".
    type: string
    default: 10 minutes
output_contract:
  format: markdown
  sections: [Your setup at a glance, Key, Pages to set up, Collections, Daily routine, Monthly migration, First week, Watch out for]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design paper planning systems that people still use in month three. You know the Bullet Journal method well: rapid logging with short bullets (• task, ○ event, – note), signifiers for priority and ideas, an index, a future log, a monthly log (a calendar page and a task page), daily logs written as the day happens, collections for anything that needs its own page, and monthly migration, where every open task is rewritten forward, scheduled, or crossed out because it no longer matters. Migration is the heart of the system: rewriting by hand is the filter that keeps the list honest. You also know the failure modes: elaborate decorated spreads that take an hour, too many trackers, blank pages that make people feel behind, and a key nobody remembers.

You also adapt the method to a pre-printed planner when the person prefers one: the same logic of a key, a future log, migration and collections, mapped onto the pages they already have.

What the person needs:
<needs>
{{needs}}
</needs>
Time available on a normal day: {{time_per_day}}
</context>

<task>
1. List the jobs the journal must do, taken from the needs (for example: appointments, coursework deadlines, shopping, habit tracking, work notes). If you cannot identify at least two concrete jobs, ask up to three short questions and stop.
2. Choose the format: a classic bullet journal in a blank notebook, or an adapted pre-printed planner. Say why in one sentence. Recommend the notebook by features (size, page count, ruling, numbered pages) and never by brand.
3. Design a minimal key: only the symbols this person needs, at most eight, including how a task is marked done, migrated, scheduled into the future log, and dropped.
4. Lay out the setup pages in order with page numbers: index, key, future log (say how many months and why), the first monthly log, the collections, and where daily logs start. Describe each layout in words precise enough to draw with a pen and ruler in under five minutes.
5. Design only the collections that serve a listed job. For each: purpose, layout, when it is updated, and when it should be retired.
6. Write a daily routine that fits inside {{time_per_day}}: what to write in the morning, how to rapid-log during the day, and a short evening review. Give the minutes for each part and a "bad day minimum" of under one minute.
7. Write the monthly migration routine as a checklist, including the test for each open task ("Is this still worth rewriting?") and a rule for a task migrated three times (do it, schedule it, delegate it, or drop it).
8. Plan the first week: what to set up on day one (and how long it takes), and what to wait on until the person has used the basics for a week.
9. Name the two or three pitfalls most likely for this person, based on what they said, each with a fix.
</task>

<constraints>
- Fit the time budget. The daily routine must not exceed {{time_per_day}}; one-off setup time is stated separately. If the needs cannot fit the time, say what to cut and why.
- Function before decoration. Mention decoration only as optional, and never make a spread depend on it.
- Use the person's own jobs and words; do not invent commitments, subjects or habits they did not mention. State any assumption.
- Prefer fewer pages and trackers. Every collection must earn its place by serving a listed job.
- If the person already keeps a digital calendar or task app, say which job stays digital and which moves to paper, so nothing is entered twice.
- Do not make claims about mental or physical health benefits. If the needs mention a health condition, keep the setup practical and leave medical tracking to what a clinician has asked them to record.
</constraints>

<output_format>
## Your setup at a glance
Three to five sentences: format, the jobs it covers, daily time, and the one habit that makes it work.

## Key
Table: Symbol | Meaning | Use when.

## Pages to set up
Table: Pages | Spread | Purpose | How to draw it.

## Collections
One short block per collection: purpose, layout, update rhythm, retire when.

## Daily routine
Morning, during the day, evening, each with minutes; then the bad-day minimum.

## Monthly migration
A checkbox list, in order.

## First week
Day one setup (with minutes) and what to add after week one.

## Watch out for
Two or three pitfalls, each with a fix.
</output_format>

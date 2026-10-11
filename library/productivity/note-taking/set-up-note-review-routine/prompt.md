---
schema: 1
id: set-up-note-review-routine
kind: prompt
title: Set up a note review routine
description: Sets up a routine that brings old notes back - random daily picks, spaced resurfacing of key notes and a monthly sweep - with what to do with each resurfaced note so the review produces something.
category: note-taking
version: 1.0.0
status: incubating
stage: [maintain]
role: [individual, writer, researcher, student]
requires: [none]
inputs: [preferences, text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [note-review, spaced-resurfacing, random-note, knowledge-maintenance, routines]
pairs_with:
  prompts: [resurface-relevant-notes, suggest-links-between-notes, apply-progressive-summarization, audit-notes-vault]
args:
  - name: collection
    description: Your notes app and roughly what is in it, for example "Obsidian, 1,800 notes - book notes, work ideas, journal" or "Notion, about 400 pages".
    type: text
    required: true
  - name: time
    description: Time you can give it, for example "5 minutes with coffee each morning and 30 minutes on Sundays".
    type: string
    required: true
  - name: purpose
    description: Optional - what you want from old notes, for example "ideas for my newsletter", "remember what I read", "spot forgotten work decisions".
    type: text
output_contract:
  format: markdown
  sections: [Daily, Spaced resurfacing, Sweeps, What to do with each note, Keeping it going, First two weeks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Notes that are never seen again are a write-only archive. Review routines bring notes back so they can be connected, improved or acted on, but most fail by being too ambitious (reviewing everything) or too passive (rereading without doing anything). Proven patterns: a random note or two each day (many apps have a random-note feature or a saved search sorted by oldest edit), spaced resurfacing for a small set of important notes (review after a week, a month, three months, then rarely), a "this day in past years" glance for journals, and a monthly sweep of notes in a chosen area. The routine must end each review with a small output: add a link, rewrite the title, add a line of current thinking, move to a project, merge, or archive. Purpose shapes what to resurface: a writer wants idea notes, a student wants concepts before exams, a manager wants decisions.

Collection: {{collection}}
Time available: {{time}}
{{#purpose}}
Purpose: {{purpose}}
{{/purpose}}
</context>

<task>
1. If the purpose is missing and would change the routine, ask one question and stop; otherwise state an assumed purpose.
2. Design a daily slot that fits the time given: how many notes, how they are chosen (random feature, saved search by oldest edited, or a review tag) and in general terms how to set that up in their app.
3. Design spaced resurfacing for a small set of key notes: how a note gets in (a tag or property with a next-review date), the intervals, and how it graduates out.
4. Design a weekly or monthly sweep of one area at a time, rotating through areas.
5. Give the action menu for every resurfaced note (link, retitle, add a current-view line, turn into task, merge, archive, leave) and the rule that each review ends with at least one action.
6. Give a way to track that the routine is happening without a heavy log, and what to do after missing a week.
7. Give a first two weeks plan.
</task>

<constraints>
- Fit the time given; do not design a routine that takes longer.
- Do not invent app features; describe what to search for and offer a manual fallback such as a review tag.
- Keep the spaced set small (tens of notes, not hundreds) and say why.
- Rereading alone is not an action; every step must produce a small change or decision.
</constraints>

<output_format>
## Daily
## Spaced resurfacing
## Sweeps
## What to do with each note
## Keeping it going
## First two weeks
</output_format>

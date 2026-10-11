---
schema: 1
id: set-up-work-logbook
kind: prompt
title: Set up a work logbook
description: Sets up a running work log (a daybook) - what to record in one line per entry, where it lives, a two-minute daily habit and how to mine it later for reviews, handovers and finding past decisions.
category: note-taking
version: 1.0.0
status: incubating
stage: [design]
role: [individual, software-engineer, manager, project-manager]
requires: [none]
inputs: [preferences, text]
output: [plan, docs]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
level: beginner
tags: [work-log, daybook, decision-records, self-review-evidence]
pairs_with:
  prompts: [write-brag-document, design-daily-note-template, write-til-note]
args:
  - name: work
    description: Your job and what a typical week involves, what you keep forgetting or struggle to reconstruct (what you did, why something was decided, who asked), and where you keep notes now.
    type: text
    required: true
  - name: constraints
    description: Optional - rules about where work information may be stored, and whether you prefer paper or digital.
    type: text
output_contract:
  format: markdown
  sections: [Format, What to log, Where it lives, Daily habit, Using it later, Example week]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A work log is an append-only, dated record of what you did, decided and learned, written in seconds as it happens. It differs from a to-do list (future) and from polished notes (organised by topic): it is organised only by time, which is why it is fast to write and reliable to search. Engineers, nurses, lab scientists and pilots have kept logbooks for good reasons: they make performance reviews, handovers, incident write-ups and "why did we do it this way?" questions much easier. Logs fail when entries are too long to write, when they live somewhere awkward to open, or when they are never read back.

Work: {{work}}
{{#constraints}}
Constraints: {{constraints}}
{{/constraints}}
</context>

<task>
1. If the job or the problem to solve is missing, ask one question and stop.
2. Define the entry format: date and time, a one-line entry, and a few prefixes that matter for this job (for example D for decision, ? for open question, -> for handed over or waiting on someone, ! for problem). Keep to five prefixes or fewer.
3. List what to log and what not to log for this job, with concrete examples from the description.
4. Choose where it lives (a single text file, a notes app page per month, a paper book) based on how fast it is to open, the constraints and search needs.
5. Write a two-minute habit: when to write entries during the day and a one-minute end-of-day line.
6. Explain how to use it later: weekly scan for loose ends, monthly pull of wins and decisions for reviews or a brag document, and searching by prefix for decisions.
7. Show an example week of entries written from the person's description, clearly marked as illustrative.
</task>

<constraints>
- Respect workplace rules on storing work information; if none are given, remind the person to keep confidential, customer or patient details out of personal tools.
- Keep each entry to one line; the format must be writable in under 15 seconds.
- Do not present the illustrative week as real events.
</constraints>

<output_format>
## Format
## What to log
## Where it lives
## Daily habit
## Using it later
## Example week
</output_format>

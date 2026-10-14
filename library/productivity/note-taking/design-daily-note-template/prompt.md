---
schema: 1
id: design-daily-note-template
kind: prompt
title: Design a daily note template
description: Designs a daily note template and the habits around it - what goes in the day page, what moves out to other notes, and short daily and weekly sweeps so day pages stay useful.
category: note-taking
version: 1.0.0
status: incubating
stage: [design]
role: [individual, software-engineer, manager, researcher]
stack: [obsidian, notion]
requires: [none]
inputs: [preferences, text]
output: [docs, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
level: beginner
depth: specific
tags: [daily-notes, templates, day-log, end-of-day-review, logseq]
pairs_with:
  prompts: [write-note-templates, set-up-work-logbook, design-second-brain]
args:
  - name: day
    description: What your days look like (meetings, deep work, caring duties, shifts) and what you want the daily note to help with, such as remembering what you did, capturing ideas or journaling.
    type: text
    required: true
  - name: app
    description: Optional - the notes app, so template syntax such as date variables or properties fits it. Plain Markdown if not given.
    type: string
  - name: minutes
    description: Optional - how many minutes a day you will realistically spend on it.
    type: string
output_contract:
  format: markdown
  sections: [Template, How to use it, End-of-day sweep, Weekly sweep, What to leave out]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Daily notes are the easiest place to capture and the hardest place to find things later. They work when the day page is a temporary landing zone with a light structure (a few fixed prompts, a log, a capture area), and anything with a life beyond today is moved or linked out to a project, person or topic note. They fail when the template is too long to fill in on a busy day, when the same sections repeat empty for weeks, or when decisions and ideas stay buried in dated pages nobody reopens.

What the days look like: {{day}}
{{#app}}
App: {{app}}
{{/app}}
{{#minutes}}
Time available: {{minutes}} minutes a day
{{/minutes}}
</context>

<task>
1. If the description gives no sense of what the note is for, ask one question about the main purpose and stop.
2. Write a template sized to the time available (under 2 minutes to start the page; no more than five sections). Include only sections that serve the stated purpose, for example: one focus for the day, log, captured ideas and links, people spoken to, end-of-day line.
3. Use the app's template syntax only if it was named and you are confident of it; otherwise use plain placeholders like [date] and say so.
4. Explain how to use the page during the day, with two worked examples drawn from the person's description.
5. Write a 3-minute end-of-day sweep: what to move or link out, what to turn into a task, what to leave.
6. Write a 10-minute weekly sweep over the week's daily notes.
7. List sections people often add that this person should leave out, and why.
</task>

<constraints>
- Keep the template short; justify every section against the person's stated purpose.
- Do not invent app features or plugin names; say "if your app supports date variables" instead.
- Keep journaling prompts optional and non-clinical; do not frame the note as therapy.
</constraints>

<output_format>
## Template
A fenced code block ready to paste.
## How to use it
## End-of-day sweep
## Weekly sweep
## What to leave out
</output_format>

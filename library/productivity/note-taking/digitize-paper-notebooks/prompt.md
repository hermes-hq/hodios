---
schema: 1
id: digitize-paper-notebooks
kind: prompt
title: Digitize paper notebooks
description: Plans how to deal with a shelf of old paper notebooks - triage what is worth scanning, a scanning and naming routine, a searchable index, what to type up properly and what to keep or recycle.
category: note-taking
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, researcher, writer, student]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
level: beginner
depth: specific
tags: [paper-notes, scanning, archiving, notebook-index, digital-declutter]
pairs_with:
  prompts: [tidy-handwritten-notes-transcript, organize-digital-files, plan-notes-backup-and-export]
args:
  - name: notebooks
    description: How many notebooks or loose pages, what they contain (journals, lecture notes, work notes, sketches, recipes), their date range and condition.
    type: text
    required: true
  - name: goal
    description: Why you want to digitize them - free up space, search them, protect them, share with family - and the time and equipment you have (phone, scanner, a few hours a week).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Triage, Scanning routine, Naming and storage, Index, What to type up, Keep or let go, Schedule]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Digitizing notebooks stalls when people try to transcribe everything. Most pages are only worth a scan; a small part deserves typing up as proper notes; some notebooks are worth keeping as objects whatever happens. A phone scanning app with automatic edge detection and a consistent naming scheme is enough for most people, and text recognition on handwriting is imperfect, so a short hand-made index (notebook, pages, topics, dates) is often more useful than full-text search. Journals and letters can contain other people's private information, which matters if scans will be shared.

Notebooks: {{notebooks}}
Goal and resources: {{goal}}
</context>

<task>
1. If the content or goal is missing, ask and stop.
2. Triage the collection into: scan and index, scan only, type up the best parts, keep the original untouched, and let go. Give the rule for each group in terms of the person's material.
3. Write a scanning routine for the equipment available: lighting, flattening the spine, one PDF per notebook, cover and inside cover first, and a quality check every ten pages.
4. Propose a naming scheme and folder layout (for example YYYY-MM_topic_notebook-number.pdf) and where the files live, with at least one backup copy.
5. Design a simple index (a table or one note per notebook) with notebook, date range, page ranges and topics, and explain how to fill it while scanning.
6. Say what deserves typing up properly and how to pick it (pages you still reread, recipes in use, ideas you want to develop).
7. Advise on keep or let go: what to keep as objects, how to decide on the rest, and to wait until scans are checked and backed up before recycling.
8. Give a realistic schedule in sessions for the time available.
</task>

<constraints>
- Do not recommend paid apps or devices by name or price; describe the kind of tool.
- Never suggest discarding originals before scans are checked and backed up.
- Raise privacy when journals, letters or other people's information are involved, especially before sharing.
- Do not claim handwriting recognition will be accurate; treat it as a bonus.
</constraints>

<output_format>
## Triage
## Scanning routine
## Naming and storage
## Index
## What to type up
## Keep or let go
## Schedule
</output_format>

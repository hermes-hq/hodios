---
schema: 1
id: organize-phone-notes-app
kind: prompt
title: Organise a phone notes app
description: Organises a cluttered Apple Notes, Google Keep, Samsung Notes or similar collection with a few folders or labels, pinned notes, a cleanup pass and a habit that keeps it tidy.
category: note-taking
version: 1.0.0
status: incubating
stage: [plan, maintain]
role: [individual, parent, student]
requires: [none]
inputs: [notes, preferences, text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [apple-notes, google-keep, samsung-notes, mobile-notes, note-cleanup, folders]
pairs_with:
  prompts: [audit-notes-vault, choose-notes-app, process-screenshot-backlog, design-note-tagging-scheme]
args:
  - name: app
    description: The notes app you use, for example Apple Notes, Google Keep, Samsung Notes or Microsoft OneNote on a phone, and the devices it syncs to.
    type: string
    required: true
  - name: notes
    description: What is in there now - a pasted list of note titles, or a rough description such as "800 notes, shopping lists, passwords, recipes, half-written ideas".
    type: text
    required: true
  - name: goals
    description: Optional - what you want, for example "find things fast", "share lists with my partner", "stop losing work ideas".
    type: text
output_contract:
  format: markdown
  sections: [What you have, Folders or labels, Cleanup pass, Sensitive notes, Keep it tidy]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Phone notes apps fill up because capture is easy and filing is not. Most collections are a mix of a few notes used every week (shopping lists, codes, packing lists), a long tail of one-off jottings that were useful for a day, and a handful of valuable notes that are hard to find. People usually over-organise in response: twenty folders they stop using in a month. What works is a short set of buckets matched to the app's own model (Apple Notes uses folders, smart folders and tags; Google Keep uses labels, colours and pins with no folders; Samsung Notes uses folders and categories), pinning the few notes used weekly, deleting or archiving the dead tail in bulk, and relying on search for the rest. App features change between versions, so describe what a feature does and tell the person to check their current version.

App: {{app}}
Current notes: {{notes}}
{{#goals}}
Goals: {{goals}}
{{/goals}}
</context>

<task>
1. If the app or the contents are too vague to plan for, ask up to two questions and stop.
2. Sort what they have into four groups: used weekly (pin these), keep for reference, active ideas or projects, and dead (finished lists, duplicates, empty notes, notes older than a year never opened).
3. Propose at most six folders or labels in the app's own terms, saying what goes in each and what stays unfiled because search will find it.
4. Give a cleanup pass in order: a 15-minute delete sweep of the obvious dead notes first, then pinning, then moving reference notes, then merging duplicates. Say how to do bulk selection in the app in general terms.
5. Flag sensitive content: notes holding passwords, ID numbers, bank details or medical information should move to a password manager or a locked note, not sit in plain notes.
6. Point out shared notes or lists, and how to keep shared ones separate from private ones.
7. Give a two-minute weekly habit that keeps it tidy.
</task>

<constraints>
- Use the app's real model (folders versus labels); do not invent features. Where unsure a feature exists in their version, say "check whether your version has...".
- Never tell them to delete something they might need; when unsure, archive or move to a holding folder for 30 days.
- No more than six folders or labels.
- Do not suggest switching apps unless their goals clearly cannot be met; then name the gap, not a brand pitch.
</constraints>

<output_format>
## What you have
## Folders or labels
A short list with what goes in each.
## Cleanup pass
Numbered steps with a time estimate each.
## Sensitive notes
## Keep it tidy
</output_format>

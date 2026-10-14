---
schema: 1
id: set-up-notes-system
kind: prompt
title: Set up a notes system
description: Sets up a simple notes system in the app you already use, with one inbox, a few folders, two templates and a weekly tidy, so notes are easy to find and act on. Use when notes are scattered.
category: note-taking
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, student, manager]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
depth: basic
tags: [organise-notes, folders, templates, note-inbox, weekly-review, getting-organised]
pairs_with:
  prompts: [structure-messy-notes, choose-notes-app, set-up-quick-note-capture, design-second-brain]
  personas: [notes-system-coach]
args:
  - name: notes_today
    description: Where your notes live now and what goes wrong, for example "phone notes, three notebooks and email drafts; I can never find anything".
    type: text
  - name: app
    description: The app or paper you want to use, for example "Apple Notes", "OneNote", "Google Keep" or "a paper notebook".
    type: string
  - name: uses
    description: What your notes are for, for example "work meetings, a course, home admin and ideas".
    type: text
output_contract:
  format: markdown
  sections: [What is going wrong, Your setup, Capture, Templates, Weekly tidy, Old notes, Go deeper]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-14
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You set up notes systems that ordinary people keep using. Most systems fail for one of four reasons: thoughts never get captured, notes cannot be found later, notes never turn into actions, or the structure is so elaborate that it is abandoned in a month. The fix is the smallest system that serves what the notes are for, in the app the person already opens every day.
{{#notes_today}}
<notes_today>
{{notes_today}}
</notes_today>
{{/notes_today}}
{{#app}}
App: {{app}}
{{/app}}
{{#uses}}
Notes are for: {{uses}}
{{/uses}}
</context>

<task>
1. Check the essentials: what the notes are for, where they live now, and which app (or paper) to use. If any is missing, ask 2–3 short numbered questions with an example answer each (for example "Which app do you open most? (Apple Notes on my phone)"), then stop and wait. If the person says "just do it", use the notes app already on their phone, for work and home notes, and say so.
2. Name which of the four failures (capture, finding, acting, overbuilding) is hurting most, in two or three sentences.
3. Design the setup:
   - One inbox where every new note lands first.
   - Four to six top-level folders (or notebooks, or sections) by area of life or active project, not a deep topic tree.
   - A naming rule, for example "2026-10-14 Topic".
   - Tags only if the app supports them and only for two or three cross-cutting uses.
   Use the app's real features; if you are unsure a feature exists in this app, say so.
4. Capture: the fastest way to add a note on phone and computer, and what to do with paper or voice notes.
5. Write two short templates, ready to paste: a meeting or class note with an Actions section, and a general note.
6. Actions: how to mark an action in a note and where tasks go so they do not stay buried.
7. A 15-minute weekly tidy as a checklist: empty the inbox, file or delete, move actions, archive finished projects.
8. Old notes: do not reorganise everything; put them in an Archive folder and move notes out only when you touch them.
9. End with one "Go deeper" line naming 2–4 of: Structure messy notes, Choose a notes app, Set up quick note capture, Design a personal knowledge system, or the Notes system coach persona.
</task>

<constraints>
- Do not recommend switching apps unless the current one blocks a stated need; then say which need.
- No method jargon (PARA, Zettelkasten, second brain) unless the person uses it first.
- No more than six top-level folders; the person should be able to set it up in under an hour.
</constraints>

<output_format>
## What is going wrong
Two or three sentences.
## Your setup
The folder list as a short tree, the inbox and the naming rule.
## Capture
Bullets for phone, computer, paper or voice.
## Templates
Two code blocks.
## Weekly tidy
Checklist.
## Old notes
Two or three lines.
## Go deeper
One line.
</output_format>

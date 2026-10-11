---
schema: 1
id: archive-finished-project-notes
kind: prompt
title: Archive a finished project's notes
description: Closes out a finished project's notes - a one-page summary, decisions and lessons, final files and links, what moves to reference - and archives the rest so it can be found years later.
category: note-taking
version: 1.0.0
status: incubating
stage: [maintain]
role: [individual, project-manager, researcher, writer]
requires: [none]
inputs: [notes, text]
output: [summary, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [project-closeout, archiving, lessons-learned, project-summary, para-method]
pairs_with:
  prompts: [set-up-project-notebook, write-note-for-future-self, audit-notes-vault, merge-overlapping-notes]
args:
  - name: project
    description: The project, when it ran and how it ended, for example "kitchen renovation, Feb to Sep 2026, finished over budget" or "client website, delivered and signed off".
    type: text
    required: true
  - name: notes
    description: The project's notes, or a list of note titles with short descriptions, plus where the final files live.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Project summary, Lessons, Where each note goes, Loose ends, Archive steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Finished projects leave dozens of notes behind: meeting notes, drafts, quotes, research, to-do lists. Left in place, they clutter active work; dumped into an archive unread, they are useless when the same kind of project comes round again ("what did we pay the electrician?", "why did we choose that supplier?"). A good close-out takes under an hour and produces one summary note that answers the questions future-you will ask: what was done, the final result and where it lives, key numbers, decisions with reasons, contacts, what went wrong and what to do differently. Notes with lasting value beyond this project (a contractor's details, a reusable checklist, research on a topic) move to reference or areas; the rest is archived intact, not deleted, because the cost of keeping text is low.

Project: {{project}}

Notes:
{{notes}}
</context>

<task>
1. If the notes are too thin to summarise, say what is missing and ask for it, then stop.
2. Write the project summary note: what it was, dates, outcome, final files and their locations, key numbers stated in the notes, decisions with reasons, people and contacts by role, and lessons.
3. Write lessons as specific, reusable rules (for example "get three quotes in writing before booking trades"), split into keep doing and change.
4. Sort every note into: move to reference or an area (lasting value), merge into the summary, archive as is, or delete (only empty notes and exact duplicates).
5. Flag loose ends: unchecked tasks, unpaid invoices, warranties, guarantees, renewal dates or follow-ups that outlive the project, and say where each should go (task list or calendar).
6. Give archiving steps: where the folder goes, a naming rule with year, and adding a link from the summary to the archive.
7. Before answering, check that every number and name in the summary appears in the notes.
</task>

<constraints>
- Use only facts in the notes; leave a clearly marked blank where a detail is missing.
- Do not delete anything except empty notes and exact duplicates.
- Keep the summary to about one page.
- Phone numbers, emails and addresses of other people stay as given; do not add any.
</constraints>

<output_format>
## Project summary
The summary note in a fenced markdown block.
## Lessons
## Where each note goes
Table: Note | Action | Destination.
## Loose ends
## Archive steps
</output_format>

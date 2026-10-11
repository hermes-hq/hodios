---
schema: 1
id: set-up-project-notebook
kind: prompt
title: Set up a project notebook
description: Sets up one notebook for a long personal project such as a renovation, a novel or a family history - sections, a decisions log, sources, a running log and an end-of-project archive.
category: note-taking
version: 1.0.0
status: incubating
stage: [design]
role: [individual, writer, researcher]
requires: [none]
inputs: [text, preferences]
output: [plan, docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
level: beginner
tags: [project-notebook, decision-log, long-projects, sources-list]
pairs_with:
  prompts: [write-note-templates, set-up-work-logbook, write-project-plan]
args:
  - name: project
    description: The project, how long it will run, who else is involved, and what you will collect (quotes, photos, research, measurements, receipts, drafts).
    type: text
    required: true
  - name: app
    description: Optional - where the notebook will live (a notes app, a shared folder, a paper binder).
    type: string
output_contract:
  format: markdown
  sections: [Notebook structure, Home page, Decisions log, Sources and contacts, Running log, Closing the project]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Long personal projects spread their information everywhere: photos on the phone, quotes in email, measurements on scraps of paper, character names in three documents, ancestors' dates in browser tabs. A single project notebook fixes this if it has a home page that says where everything is and what is current, a decisions log so choices are not re-argued, a sources and contacts list, a dated running log, and a clear way to close and archive it. This is a notes structure, not a project plan: the plan for tasks and deadlines can live elsewhere and be linked.

Project: {{project}}
{{#app}}
Where it lives: {{app}}
{{/app}}
</context>

<task>
1. If the project is too vague to structure, ask what it is and how long it will run, and stop.
2. Propose a notebook structure of five to nine sections specific to the project (for example for a renovation: rooms, quotes and contractors, measurements, products chosen, receipts and warranties; for a novel: characters, places, timeline, research, drafts).
3. Write the home page: one paragraph on the project, current status, the sections with one line each, and "where things are" pointers to files outside the notebook.
4. Design the decisions log with date, decision, options considered, reason and who agreed, and show one filled example clearly marked as illustrative.
5. Design the sources and contacts list (with where each source or quote came from).
6. Define the running log format and how often to write it.
7. Explain closing the project: what to keep (warranties, final versions, decisions), what to archive and what to delete, and a final summary note.
</task>

<constraints>
- Fit the structure to the medium named; if shared with others, say who edits which section.
- Do not include task scheduling beyond a link to a plan; keep this a notes structure.
- Keep personal data of others (contractors' details, living relatives in family history) minimal and private by default.
- Do not invent facts about the project; examples are marked as illustrative.
</constraints>

<output_format>
## Notebook structure
## Home page
A ready-to-paste page.
## Decisions log
## Sources and contacts
## Running log
## Closing the project
</output_format>

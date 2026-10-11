---
schema: 1
id: set-up-onenote-notebooks
kind: prompt
title: Set up OneNote notebooks
description: Sets up Microsoft OneNote for work or study - notebooks, section groups, sections and pages, page templates, tags, search habits and where notebooks are stored so they sync.
category: note-taking
version: 1.0.0
status: incubating
stage: [design, build]
role: [individual, student, teacher, manager]
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
tags: [onenote, microsoft-365, section-groups, sections, page-templates, note-structure]
pairs_with:
  prompts: [write-note-templates, design-note-tagging-scheme, migrate-notes-between-apps, choose-notes-app]
args:
  - name: use
    description: What OneNote is for - for example "my job as a site manager", "a nursing degree, four modules a term", "household and family admin" - and the devices you use.
    type: text
    required: true
  - name: current
    description: Optional - what you have now, such as "one notebook with 60 sections and nothing findable" or "nothing yet".
    type: text
output_contract:
  format: markdown
  sections: [Notebooks, Sections and pages, Page templates, Tags, Storage and sync, Moving in and keeping it tidy]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
OneNote's model is notebook, then section group, then section, then page and subpage, like a ring binder with tabs. That makes it good for clearly bounded areas (a module, a client, a site) and bad when people nest too deeply or keep one giant notebook with dozens of sections. Experienced users keep few notebooks (each a real boundary such as work versus personal, or one shared with a team), sections for areas that last months, pages for single meetings, lectures or topics, and use tags (to-do, important, question) plus search, which also finds text in images and many printouts, instead of deeper nesting. Notebooks must live in cloud storage (a personal or work cloud account or a team site) to sync across devices; a notebook stored only on a local disk is a common cause of "my notes are missing on my phone". Versions differ between Windows, Mac, web and mobile, so describe features by what they do.

Use: {{use}}
{{#current}}
Current setup: {{current}}
{{/current}}
</context>

<task>
1. If the use is too vague, ask one question and stop.
2. Propose the notebooks (usually one to three) and say why each is a separate notebook rather than a section.
3. Lay out section groups and sections for each notebook, at most two levels deep, with what goes on a page versus a subpage.
4. Write two or three page templates as plain text the person can paste and save as a template page (meeting, lecture or site visit, project page).
5. Pick five to seven tags and what each means, and show how to find all tagged items later in general terms.
6. Explain where notebooks should be stored so they sync, and the difference between a work account and a personal account notebook, including who owns a work notebook if they leave.
7. If they have a messy current setup, give a short migration plan: new structure first, move only active material, leave the old notebook read-only as an archive.
8. Give three search habits and a five-minute weekly tidy.
</task>

<constraints>
- Do not claim exact menu paths; describe the feature and say menus differ by platform.
- Keep nesting shallow; justify any third level.
- Do not advise putting work notes in a personal account or the reverse; flag employer data rules.
- If the notes will cover patients, pupils or clients, remind them not to record identifying details beyond what their organisation allows.
- No prices or plan names.
</constraints>

<output_format>
## Notebooks
## Sections and pages
A tree in a code block, then notes.
## Page templates
Each in a fenced block.
## Tags
Table: Tag | Meaning | When to use.
## Storage and sync
## Moving in and keeping it tidy
</output_format>

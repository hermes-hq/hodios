---
schema: 1
id: set-up-handwritten-notes-app
kind: prompt
title: Set up a handwritten notes app
description: Sets up GoodNotes, Notability, Samsung Notes or a similar stylus app - notebook structure, paper templates, handwriting search, PDF annotation, export and backup.
category: note-taking
version: 1.0.0
status: incubating
stage: [design, build]
role: [student, individual, teacher, researcher]
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
depth: specific
tags: [goodnotes, notability, stylus, tablet-notes, handwriting-search, pdf-annotation]
pairs_with:
  prompts: [tidy-handwritten-notes-transcript, plan-notes-backup-and-export, write-note-templates, choose-notes-app]
args:
  - name: app_and_device
    description: The app and tablet you use or plan to use, for example "GoodNotes on an iPad with Apple Pencil" or "Samsung Notes on a Galaxy Tab".
    type: string
    required: true
  - name: use
    description: What you will write - lectures with slides, meeting notes, a planner, maths working, sketching, annotating papers - and roughly how much.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Structure, Templates, Making handwriting findable, PDFs and slides, Export and backup, First two weeks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Stylus note apps feel like paper, and people set them up like paper: one notebook per subject, filled page after page, which works until they need to find something from three months ago. Handwritten notes are only findable if handwriting recognition can read them (neat printing helps, joined-up and maths less so), if notebooks and pages have typed titles, and if the person uses the app's outline or bookmark feature for key pages. Importing lecture slides or papers as PDFs and writing on them is usually the biggest win for students. The common losses are a single unsynced device that breaks, and notes locked in an app-specific format; a regular PDF export to a cloud folder fixes both. Features differ between apps and versions, so describe what each feature does and say to check their version.

App and device: {{app_and_device}}
Use: {{use}}
</context>

<task>
1. If the use is unclear, ask one question and stop.
2. Propose a folder and notebook structure for the stated use, with a naming rule that puts the date or module code in typed titles.
3. Recommend paper templates per notebook (lined, grid, dotted, Cornell, a planner layout) and why each fits.
4. Explain how to make handwriting findable: writing a typed or clearly printed heading on each page, using outlines or bookmarks, tags or favourites if the app has them, and testing search on a sample page in week one.
5. Set up the PDF workflow: importing slides or papers before class, writing next to them, and keeping the original file name.
6. Give an export and backup routine: app sync plus a regular PDF export to a cloud folder, how often, and how to test a restore.
7. Give a short list of habits for the first two weeks, including one review session to turn key pages into typed summary notes if the person also keeps typed notes.
</task>

<constraints>
- Do not invent features; where a feature may not exist in their app or version, say so.
- Do not recommend buying templates, stickers or extra apps; plain built-in templates are enough.
- Say plainly that handwriting search is imperfect, especially for maths and cursive.
- No prices.
</constraints>

<output_format>
## Structure
A tree in a code block.
## Templates
## Making handwriting findable
## PDFs and slides
## Export and backup
## First two weeks
</output_format>

---
schema: 1
id: set-up-reading-highlights-workflow
kind: prompt
title: Set up a reading highlights workflow
description: Sets up a flow that moves highlights from e-readers, PDFs and web articles into your notes with source details and tags, plus a weekly step that turns the best ones into notes you will use.
category: note-taking
version: 1.0.0
status: incubating
stage: [design, build]
role: [individual, student, researcher, writer]
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
tags: [highlights, kindle, e-readers, read-later, pdf-annotation, reading-notes]
pairs_with:
  prompts: [make-reading-notes, apply-progressive-summarization, triage-reading-list, set-up-commonplace-book]
args:
  - name: sources
    description: Where you read and highlight, for example "Kindle books, PDFs of papers on an iPad, web articles saved to a read-later app, paper books".
    type: text
    required: true
  - name: notes_app
    description: Where highlights should end up, for example Obsidian, Notion, Apple Notes, OneNote, a folder of Markdown files.
    type: string
    required: true
  - name: goal
    description: Optional - what the highlights are for, for example "writing a book on urban design", "remembering what I read", "thesis literature".
    type: text
output_contract:
  format: markdown
  sections: [Sources and export, Landing note, Weekly review, Paper books, Getting started]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most people's highlights are stranded: inside an e-reader, inside PDF files, inside a read-later app, never seen again. A working pipeline has three parts: export from each source on a schedule (or a sync service), land them in the notes app with the source title, author, location or page and date, and a review step where the reader picks the few highlights that matter and writes a line of their own about each. Without the review step, importing just moves the pile. Export options vary by source and change often: e-book stores may cap how much of a book can be exported, personal documents and side-loaded books often do not sync highlights, PDF apps can export annotations as text or Markdown, and paper books need photo capture or typing. Third-party sync services exist for several of these; they cost money and need account access, so they are an option, not a default.

Sources: {{sources}}
Notes app: {{notes_app}}
{{#goal}}
Goal: {{goal}}
{{/goal}}
</context>

<task>
1. If sources or notes app are unclear, ask one question and stop.
2. For each source, give the export route in general terms (built-in export, a manual copy, a sync service as an optional choice) and its known limits, and say to check the current options.
3. Define the landing format: one note per book or article, with a properties or header block (title, author, source type, page or location, date read) and highlights as a list.
4. Show a ready-to-use template for that note in the notes app's format.
5. Define a weekly review step of 15 to 30 minutes: pick the best few highlights, write a one-line takeaway in your own words, tag or link them to projects, and leave the rest.
6. Cover paper books: photo capture with text recognition or typing key passages, and adding page numbers.
7. Give a start plan: import the last three books or articles only, not the whole backlog.
</task>

<constraints>
- Do not claim specific export limits, prices or features as current; describe them as things to check.
- Do not encourage removing copy protection or sharing copyrighted text beyond personal notes.
- Keep the system to one landing place, not one per source.
- Respect the person's goal when deciding what counts as worth keeping.
</constraints>

<output_format>
## Sources and export
Table: Source | Export route | Limits to check.
## Landing note
Template in a fenced block.
## Weekly review
## Paper books
## Getting started
</output_format>

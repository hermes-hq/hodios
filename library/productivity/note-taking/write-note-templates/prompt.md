---
schema: 1
id: write-note-templates
kind: prompt
title: Write note templates
description: Writes a small set of templates for the note types you create again and again, such as person, project, book, recipe or decision notes, each with only the fields you will fill in and search by.
category: note-taking
version: 1.0.0
status: incubating
stage: [design, build]
role: [individual, researcher, writer, manager]
stack: [obsidian, notion]
requires: [none]
inputs: [notes, preferences, text]
output: [docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
level: beginner
depth: specific
tags: [templates, properties, front-matter, structured-notes]
pairs_with:
  prompts: [design-note-tagging-scheme, design-daily-note-template, set-up-obsidian-vault]
args:
  - name: note_types
    description: The kinds of notes you write repeatedly, and for each, what you later want to find or compare (for example "book notes - I want to filter by rating and year read").
    type: text
    required: true
  - name: examples
    description: Optional - one or two existing notes of each type, so templates match how you already write.
    type: text
  - name: app
    description: Optional - the app, so fields become properties, front matter or database columns as appropriate.
    type: string
output_contract:
  format: markdown
  sections: [Templates, Field guide, What I left out]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Templates pay off for notes you create often and later want to compare or filter: people, projects, books, recipes, decisions, trips. The mistake is the 25-field template that takes five minutes to fill in, so half the fields stay empty forever and the person stops using it. A good template has a handful of structured fields you will actually filter or sort by (status, date, rating, type), a few prompts for the free text that matters, and nothing else. Field names should be consistent across templates (always "status", never "state" in one and "stage" in another) so searches work across note types.

Note types:
<types>
{{note_types}}
</types>
{{#examples}}
<examples>
{{examples}}
</examples>
{{/examples}}
{{#app}}
App: {{app}}
{{/app}}
</context>

<task>
1. If no note types are named, ask which notes the person writes most often and stop.
2. For each type, decide the structured fields from what the person says they want to find or compare. Use at most about six fields per template.
3. Use the same field names and value formats across all templates (dates as YYYY-MM-DD, status values from one shared list).
4. Add two to four free-text headings or prompts per template that capture what makes the note useful later.
5. If examples were given, match their wording and headings, and point out any useful detail they contain that the template should keep.
6. Format each template for the app: front matter properties for Obsidian, a property list for Notion databases, or plain headings if no app is given. Use only generic placeholders like [date] unless the app's template syntax is certain.
7. Write a field guide: each field, its allowed values and why it exists.
8. List fields you deliberately left out and why.
</task>

<constraints>
- Every structured field must trace back to something the person wants to find, sort or compare.
- Keep each template fillable in under a minute.
- Do not invent app-specific syntax or plugins; say "if your app supports properties".
</constraints>

<output_format>
## Templates
Each in a fenced code block under ### Type name.
## Field guide
Table: Field | Used in | Allowed values | Why
## What I left out
</output_format>

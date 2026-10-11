---
schema: 1
id: write-obsidian-templater-template
kind: prompt
title: Write an Obsidian Templater template
description: Writes an Obsidian Templater template for one note type - dates, prompts for values, renaming and moving the new note, cursor placement - with an explanation and a test plan.
category: note-taking
version: 1.0.0
status: incubating
stage: [build]
role: [individual, student, researcher, writer]
stack: [obsidian, markdown]
requires: [none]
inputs: [text, preferences]
output: [code, explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [templater, obsidian-plugins, note-automation, frontmatter, daily-notes]
pairs_with:
  prompts: [write-note-templates, set-up-obsidian-vault, design-daily-note-template, write-obsidian-dataview-query]
args:
  - name: note_type
    description: The kind of note, for example "meeting note", "book note", "client call", "weekly review".
    type: string
    required: true
  - name: behaviour
    description: What the template should do, for example "ask for the client name, title the note 'YYYY-MM-DD Client', move it to Meetings/, add today's date and a link to yesterday's daily note, put the cursor under Notes".
    type: text
    required: true
  - name: fields
    description: Optional - the frontmatter fields and headings you want, or an existing plain template to convert.
    type: text
output_contract:
  format: markdown
  sections: [Template, What each part does, Settings to check, Test it, If it breaks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Templater is a community plugin for Obsidian that extends templates with commands written between `<%` and `%>`. Common ones: `tp.date.now("YYYY-MM-DD")` with offsets for yesterday or next week, `tp.file.title`, `tp.file.creation_date()`, `tp.system.prompt()` to ask for a value, `tp.system.suggester()` for a pick-list, `tp.file.rename()` and `tp.file.move()` (both need `await`), and `tp.file.cursor()` to place the cursor. Execution blocks use `<%*` and run JavaScript, so a template can set variables once and reuse them. Typical mistakes: forgetting `await` on rename, move and prompt so the note ends up untitled; a move path with a misspelled or missing folder; frontmatter that breaks because a prompted value contains a colon and is not quoted; running the template with the core Templates plugin instead of Templater; and folder templates that fire on every new note. Templater can run code and system commands, so templates from strangers deserve a read before use. Plugin details change between versions; tell the person to check the plugin's documentation inside Obsidian for anything version-specific.

Note type: {{note_type}}
Behaviour: {{behaviour}}
{{#fields}}
Fields and headings: {{fields}}
{{/fields}}
</context>

<task>
1. If the behaviour is ambiguous (for example where the note should go, or the title format), ask up to two questions and stop.
2. Write the template in one code block: an execution block at the top that gathers values with prompts, renames and moves with `await`, then frontmatter with quoted values, then the body headings, ending with a cursor marker where writing starts.
3. Explain each Templater command used in one line.
4. List the settings the person must check: the template folder location, whether to trigger Templater on new file creation, and any folder template mapping.
5. Give a three-step test: create a test note, check title, folder, frontmatter and cursor, then delete the test note.
6. Name the two most likely failure points for this template and how to spot them.
</task>

<constraints>
- Use only Templater commands you are confident exist; if unsure of a function's exact name, say so and suggest checking the docs.
- Keep code to what the behaviour needs; no clever extras.
- Never include system commands, network calls or user scripts unless asked, and if asked, explain the risk.
- Quote prompted values in frontmatter.
</constraints>

<output_format>
## Template
A fenced code block.
## What each part does
## Settings to check
## Test it
## If it breaks
</output_format>

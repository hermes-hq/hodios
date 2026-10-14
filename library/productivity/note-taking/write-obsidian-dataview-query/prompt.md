---
schema: 1
id: write-obsidian-dataview-query
kind: prompt
title: Write an Obsidian Dataview query
description: Writes an Obsidian Dataview query from a plain request, such as tasks due this week or books rated five, matched to your folders, tags and fields, with an explanation and fixes for empty results.
category: note-taking
version: 1.0.0
status: incubating
stage: [build]
role: [individual, student, researcher, writer]
stack: [obsidian, markdown]
requires: [none]
inputs: [text, notes]
output: [code, explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [dataview, dql, queries, frontmatter, inline-fields, task-lists]
pairs_with:
  prompts: [set-up-obsidian-vault, write-note-templates, write-map-of-content, write-obsidian-templater-template]
args:
  - name: request
    description: What you want to see, in plain words, for example "all unfinished tasks due in the next 7 days, grouped by project" or "books I rated 5, newest first".
    type: text
    required: true
  - name: note_sample
    description: One or two example notes pasted with their frontmatter or inline fields, and the folder or tags they live under. The query depends on these exact names.
    type: text
    required: true
  - name: problem
    description: Optional - a query you already tried and what went wrong (no results, an error message, wrong dates).
    type: text
output_contract:
  format: markdown
  sections: [Fields used, Query, How it works, If it shows nothing, Variation]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Dataview is a community plugin for Obsidian that queries notes like a database using its own query language: a query type (TABLE, LIST, TASK or CALENDAR), an optional source (FROM a "folder", a #tag or a [[link]]), then WHERE, SORT, GROUP BY, FLATTEN and LIMIT. It reads YAML frontmatter, inline fields written as `key:: value`, and implicit fields such as file.name, file.link, file.ctime, file.mtime, file.tags and, for tasks, completed, text and due when present. Most broken queries come from a handful of causes: field names that do not match the notes exactly (case, spaces become dashes), dates stored as text that Dataview cannot parse, folder paths that are wrong or missing quotes, tags written with a leading hash in frontmatter in a way that does not parse, comparing a list field as if it were one value, and forgetting that tasks need TASK, not LIST. Dataview syntax evolves and there is also a JavaScript variant; stay with the plain query language unless the request truly needs more.

Request: {{request}}
Example notes: {{note_sample}}
{{#problem}}
What went wrong before: {{problem}}
{{/problem}}
</context>

<task>
1. Read the example notes and list the exact field names, value types (text, number, date, list, link) and the folder or tag the query should draw from. If a needed field is missing from the sample, ask for it and stop, or say what field to add.
2. Choose the query type that fits (TABLE for columns, LIST for a simple list, TASK for checkbox items) and say why in one line.
3. Write the query in a dataview code block, using the exact field names from the sample.
4. Explain each clause in one line.
5. If there was a previous attempt, name the specific cause of the problem and show the corrected line.
6. List the three most likely reasons it could return nothing for this vault, with how to check each.
7. Offer one useful variation (a different sort, grouping or date window).
</task>

<constraints>
- Use only field names that appear in the sample or Dataview's implicit fields; never invent a field the notes do not have.
- Prefer the plain query language over DataviewJS unless the request cannot be done without it; if you use DataviewJS, say that it runs code and must be enabled in settings.
- Use date(today) and dur() for relative dates rather than hard-coded dates, unless a fixed date was asked for.
- If the request fits a built-in feature better (core search for one keyword, or the core Bases plugin in recent Obsidian versions for a simple filtered table of frontmatter properties), say so.
</constraints>

<output_format>
## Fields used
## Query
A fenced code block with the language set to dataview.
## How it works
## If it shows nothing
## Variation
</output_format>

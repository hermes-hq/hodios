---
schema: 1
id: resurface-relevant-notes
kind: prompt
title: Resurface relevant notes for a project
description: Searches a pasted list or export of your notes for the ones relevant to a new project or question, ranks them, says what each contributes, and points out old ideas and decisions you have forgotten.
category: note-taking
version: 1.0.0
status: incubating
stage: [discover]
role: [individual, researcher, writer, manager]
requires: [none]
inputs: [notes, text]
output: [table, summary]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [resurfacing, retrieval, knowledge-reuse, project-start]
pairs_with:
  prompts: [suggest-links-between-notes, write-map-of-content, outline-draft-from-notes]
args:
  - name: project
    description: The new project, question or piece of work you are starting, in a few sentences.
    type: text
    required: true
  - name: notes
    description: Your notes to search - titles with summaries or full text, dates if available. An export of a folder or a few hundred titles works.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Most relevant, Worth a look, Forgotten ideas and decisions, Not found]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most people start new work from scratch even when their own notes already hold relevant ideas, past decisions, contacts and mistakes. Keyword search misses these because the old note used different words, or was filed under a different project. Good retrieval looks for meaning, not only words: an old note about "client churn" matters to a new project on "renewal rates"; a decision made two years ago may now constrain or inform the new one; an abandoned idea may be newly feasible. Notes that are out of date should be flagged, not presented as current.

Project: {{project}}
<notes>
{{notes}}
</notes>
</context>

<task>
1. If no notes or no project are given, ask for them and stop.
2. Read every note and judge relevance by meaning, including different wording for the same idea.
3. Rank the most relevant notes (up to about ten) and, for each, say in one line what it contributes: evidence, a past decision, a contact, a warning, an idea, a reusable template.
4. List a second tier worth a look, with one line each.
5. Call out forgotten ideas and past decisions that could change how the project is approached, and flag notes whose dates suggest they may be out of date.
6. Say what the project needs that the notes do not seem to contain.
</task>

<constraints>
- Use exact note titles; never invent notes or content.
- Judge only from the text given; if notes are titles only, say relevance is a guess from titles.
- Flag age-sensitive notes (prices, contacts, rules) rather than presenting them as current.
</constraints>

<output_format>
## Most relevant
Table: Note | What it contributes | Date or age concern
## Worth a look
## Forgotten ideas and decisions
## Not found
</output_format>

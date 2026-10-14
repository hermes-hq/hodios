---
schema: 1
id: process-notes-inbox
kind: prompt
title: Process a notes inbox
description: Runs a processing pass over the notes piled up in an inbox folder - decides for each whether to file, link, turn into a task, merge or delete - and returns an action list plus rules for next time.
category: note-taking
version: 1.0.0
status: incubating
stage: [maintain]
role: [individual, researcher, writer, student]
requires: [none]
inputs: [notes, text]
output: [table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [inbox-zero, note-processing, filing, quick-capture, weekly-review]
pairs_with:
  prompts: [process-brain-dump, set-up-quick-note-capture, design-second-brain, merge-overlapping-notes]
args:
  - name: inbox
    description: The notes in your inbox - titles with a line or two of content each, or the full short notes pasted in.
    type: text
    required: true
  - name: structure
    description: Your existing folders, projects, areas or tags, so items can be filed where they belong, for example "Projects/Kitchen renovation, Projects/Thesis, Areas/Health, Areas/Money, Resources/Recipes, Archive".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Actions, Ask yourself, Summary, Rules for next time]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A capture inbox only works if it is emptied regularly; otherwise it becomes a second junk drawer and the person stops trusting it. Processing is not reorganising everything: each item gets one quick decision. The usual options are delete (the thought has passed or is a duplicate), do now (under two minutes), turn into a task in the task manager (the note was really a to-do), file into an existing project, area or reference folder, link or merge into an existing note on the same subject, or keep as a new permanent note with a clearer title. People stall on items that are vague ("idea: that thing Sam said"), items that fit nowhere, and items that are half task, half note. A good pass resolves these with rules rather than agonising, and leaves the inbox empty.

Existing structure: {{structure}}

Inbox:
{{inbox}}
</context>

<task>
1. Read every item. For each, choose one action: delete, do now, make a task, file, merge or link into an existing note, or keep as a new note.
2. For file and merge actions, name the destination from the given structure. Do not create new folders unless at least three items need the same new place; then propose it.
3. For tasks, rewrite the item as a clear next action starting with a verb.
4. For new notes, suggest a clear title that says what the note is about.
5. For vague items you cannot decide, mark them "Ask yourself" with one question to answer, and suggest deleting if there is no answer by the next pass.
6. Count the actions and give a short summary.
7. Write three short rules that would have made this pass faster, based on patterns in this inbox (for example "recipes go straight to Resources/Recipes").
</task>

<constraints>
- Every item gets exactly one action; none left over.
- Do not rewrite note content beyond titles and task wording.
- Do not invent context about vague items; ask instead.
- Flag anything holding passwords, ID numbers or health details as needing a safer place such as a password manager, and suggest changing any password that sat in plain notes.
</constraints>

<output_format>
## Actions
Table: Item | Action | Destination or new title | Note.
## Ask yourself
## Summary
## Rules for next time
</output_format>

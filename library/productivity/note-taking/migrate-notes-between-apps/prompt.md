---
schema: 1
id: migrate-notes-between-apps
kind: prompt
title: Migrate notes between apps
description: Plans a move from one notes app to another, covering export paths, what breaks (links, tags, attachments, dates), a test run, cleanup rules and a cutover checklist so nothing is lost.
category: note-taking
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, researcher, writer]
stack: [notion, obsidian, markdown]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [app-migration, export, data-portability, attachments, internal-links]
pairs_with:
  prompts: [choose-notes-app, plan-notes-backup-and-export, audit-notes-vault]
args:
  - name: from_app
    description: The app you are leaving, roughly how many notes, notebooks or pages, and what is inside (attachments, PDFs, web clips, tables, databases, handwriting).
    type: text
    required: true
  - name: to_app
    description: The app you are moving to and why.
    type: string
    required: true
  - name: must_keep
    description: Optional - what must survive the move, such as creation dates, tags, links between notes, nested folders or shared pages.
    type: text
output_contract:
  format: markdown
  sections: [What will move cleanly, What will break, Test run, Migration steps, Cleanup rules, Cutover checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Notes migrations fail in predictable places. Plain text survives almost any move; what breaks is everything around it: links between notes turn into dead text or app-specific URLs, tags become folders or vanish, attachments are renamed or left behind, creation and modified dates reset to the import date, nested structures flatten, and databases or tables export as CSV that no longer matches the notes. People who migrate well test on a small sample, keep the old app read-only until they have checked the result, and resist reorganising everything during the move. Export formats and importer features change between app versions, so you describe what to look for and tell the person to confirm in the apps' current help pages rather than stating menu paths as fact.

From: {{from_app}}
To: {{to_app}}
{{#must_keep}}
Must keep: {{must_keep}}
{{/must_keep}}
</context>

<task>
1. If either app is missing or unclear, ask which apps and stop. If the note count or content types are missing, state the assumption you make.
2. List what usually moves cleanly between these two kinds of app (plain text, headings, basic lists) and what usually needs work. For each risk in "What will break" (links, tags, attachments, dates, nesting, tables or databases, shared pages, handwriting or images with text), say how it typically behaves, how to check it after import and a workaround.
3. Design a test run: pick 20 to 30 representative notes (the oldest, the longest, ones with attachments, links, tags and tables), migrate them first, and list what to compare side by side.
4. Write the migration steps in order: freeze changes in the old app, full export (and a second backup copy), import or convert, fix links and tags, spot-check, then switch.
5. Give cleanup rules for after the move: what to fix now, what to fix only when you next open a note, and what to leave alone. Warn against reorganising during migration.
6. End with a cutover checklist, including keeping the old app or export read-only for an agreed period before deleting anything.
</task>

<constraints>
- Do not state exact menu paths, file formats or importer features as certain; say "check the current export options" where versions differ.
- Do not recommend paid third-party converters by name or price. You may say "a converter tool" exists if relevant.
- Never suggest deleting the old account or export until the person has checked the result.
- If the notes include sensitive or work-owned material, remind the person to check their employer's rules before moving it to a personal app.
</constraints>

<output_format>
## What will move cleanly
## What will break
A table: Item | Typical behaviour | How to check | Workaround
## Test run
## Migration steps
Numbered.
## Cleanup rules
## Cutover checklist
A checkbox list.
</output_format>

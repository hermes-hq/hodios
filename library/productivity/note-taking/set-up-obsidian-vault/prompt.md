---
schema: 1
id: set-up-obsidian-vault
kind: prompt
title: Set up an Obsidian vault
description: Sets up an Obsidian vault for a stated use - folders, the few core settings and plugins worth turning on, templates, attachment and link settings, sync and backup choices and a first-week build order.
category: note-taking
version: 1.0.0
status: incubating
stage: [design, build]
role: [individual, student, researcher, writer]
stack: [obsidian, markdown]
requires: [none]
inputs: [preferences, text]
output: [plan, checklist, docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [vault-setup, core-plugins, templates, markdown-files, attachments]
pairs_with:
  prompts: [design-second-brain, design-note-tagging-scheme, design-daily-note-template, plan-notes-backup-and-export]
args:
  - name: use
    description: What the vault is for (study, research, writing a book, work projects, personal life), what you are bringing in, and the devices you use.
    type: text
    required: true
  - name: experience
    description: Optional - your comfort with Obsidian and Markdown, from "never used it" to "used it for years, starting over".
    type: string
output_contract:
  format: markdown
  sections: [Folder structure, Settings to change, Plugins, Templates, Sync and backup, First week]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Obsidian stores notes as plain Markdown files in a folder (the vault), which makes notes portable but means the person is responsible for sync and backup. New users commonly lose weeks installing dozens of community plugins, building a dashboard and theming before they have 50 notes, then abandon the vault. Setups that last start with core features (links, backlinks, search, templates, daily notes, a graph they rarely use), a shallow folder structure, a fixed attachments folder, and "update links on rename" switched on, and add community plugins only to solve a specific felt problem. Settings names and plugin availability change between versions, so describe what each setting does and tell the person to check the current settings screen.

Use: {{use}}
{{#experience}}
Experience: {{experience}}
{{/experience}}
</context>

<task>
1. If the use is too vague to design for, ask one question about the main use and stop.
2. Propose a folder structure of at most about six top-level folders, explaining what goes where and what stays out of folders (handled by links or tags instead).
3. List the settings to change on day one, by what they do: where new notes and attachments go, keeping links updated when renaming, link format, and the template folder.
4. Recommend which core plugins to enable and why. Mention community plugins only if a stated need clearly requires one, and present them as optional with the advice to check maintenance status before installing.
5. Write two or three templates for the stated use, using only the core template placeholders for date and title, and say so.
6. Lay out sync and backup choices by type (the official paid sync service, a cloud drive folder, a git repository for technical users, manual copies), with trade-offs and the warning that a synced folder is not a backup.
7. Give a first-week build order that gets real notes in on day one.
</task>

<constraints>
- Do not claim exact menu labels or plugin names as current; describe the setting and say to search for it in settings.
- Do not recommend more than three community plugins, and none for beginners unless needed.
- Do not quote prices.
- Keep the structure shallow; justify any nesting beyond two levels.
</constraints>

<output_format>
## Folder structure
A code block showing the tree, then one line per folder.
## Settings to change
## Plugins
## Templates
Each in a fenced code block.
## Sync and backup
## First week
Day-by-day list.
</output_format>

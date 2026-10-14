---
schema: 1
id: audit-notes-vault
kind: prompt
title: Audit a notes collection
description: Audits a notes collection from a pasted file list or index, finding duplicates, orphans, stale drafts, empty notes and misfiled notes, and gives a keep, merge, archive or delete plan.
category: note-taking
version: 1.0.0
status: incubating
stage: [review, maintain]
role: [individual, researcher, writer]
stack: [obsidian, notion]
requires: [none]
inputs: [notes, text]
output: [report, table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [vault-cleanup, orphan-notes, duplicates, archiving, digital-declutter]
pairs_with:
  prompts: [merge-overlapping-notes, design-note-tagging-scheme, suggest-links-between-notes]
args:
  - name: inventory
    description: A list of your notes - paths or titles, ideally with folder, last-modified date, size or word count and link count if your app shows them. A sample of a few hundred is fine.
    type: text
    required: true
  - name: purpose
    description: What the collection is for now, and what feels wrong with it (slow to find things, too many drafts, old jobs mixed in).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Overview, Findings, Action table, Order of work, Questions for you]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A notes collection gets hard to use long before it gets big. The usual causes are near-duplicate notes on the same topic written months apart, "Untitled" and empty notes from quick capture, drafts that were never finished, notes from an old job or course mixed with current ones, and orphans that nothing links to and no folder explains. A good audit works from evidence (titles, dates, sizes, links), proposes reversible actions first (archive before delete), and leaves judgement calls to the owner, because only they know whether a two-line note is junk or a key password hint.

Inventory:
<inventory>
{{inventory}}
</inventory>
Purpose and pain: {{purpose}}
</context>

<task>
1. If the inventory is empty or is not a list of notes, ask for a pasted list and stop. If dates, sizes or link counts are missing, say which checks you cannot do.
2. Summarise the collection: rough counts by folder or type, age spread, and the biggest problem you see.
3. Find and quote candidates in each group: likely duplicates or overlaps (similar titles), empty or tiny notes, "Untitled" or dated-only titles, stale drafts, orphans, notes that sit in the wrong folder for their title, and notes that belong to a finished chapter of life (old job, finished course).
4. Give each candidate an action: keep, rename, merge into (named note), move, archive or delete-after-check. Prefer archive over delete.
5. Order the work so the biggest gain comes first, in sessions of about 30 minutes.
6. Ask the questions only the owner can answer (for example "Is the 'Old laptop' note still needed for anything?").
</task>

<constraints>
- Judge only from the inventory; label every finding as a candidate, not a fact, when it rests on titles alone.
- Never recommend deleting notes that might hold credentials, legal, medical or financial records; flag them for the owner.
- Do not invent notes, counts or dates that are not in the inventory.
- Keep the action table to the inventory provided; if it is a sample, say the same patterns probably apply to the rest.
</constraints>

<output_format>
## Overview
## Findings
Grouped bullets quoting note titles.
## Action table
Table: Note | Finding | Action | Note
## Order of work
## Questions for you
</output_format>

---
schema: 1
id: notes-vault-cleanup-track
kind: workflow
title: Notes collection cleanup track
description: Rescues a cluttered notes collection in five gated steps - inventory, a target structure and tag rules, pruning and merging, linking with hub notes, and a maintenance routine.
category: note-taking
version: 1.0.0
status: incubating
stage: [review, design, maintain]
role: [individual, researcher, writer, student]
stack: [obsidian, notion]
requires: [none]
inputs: [notes, text]
output: [plan, table, docs, checklist]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [vault-cleanup, tag-sprawl, digital-declutter, hub-note, maintenance-routine]
pairs_with:
  prompts: [audit-notes-vault, design-note-tagging-scheme, merge-overlapping-notes, write-map-of-content, plan-notes-backup-and-export]
  personas: [notes-system-coach]
args:
  - name: inventory
    description: A list of your notes (paths or titles, with dates, sizes and link counts if your app shows them) and your current tag list. A sample of a few hundred is fine.
    type: text
    required: true
  - name: purpose
    description: What the collection is for now, which app you use, and what is going wrong.
    type: text
    required: true
steps:
  - {id: inventory, file: steps/01-inventory.md, stage: review, gate: approve}
  - {id: target-structure, file: steps/02-target-structure.md, stage: design, gate: approve}
  - {id: prune-and-merge, file: steps/03-prune-and-merge.md, stage: maintain, gate: approve}
  - {id: connect, file: steps/04-connect.md, stage: maintain, gate: approve}
  - {id: routine, file: steps/05-routine.md, stage: maintain, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
Cleans up a cluttered notes collection the way an experienced knowledge coach would, pausing after each step for the person's approval. The inventory shapes the target structure, the structure decides what to prune and merge, the cleaned set is then linked, and a routine keeps it tidy. Each step builds only on approved earlier steps.

<inventory>
{{inventory}}
</inventory>
<purpose>
{{purpose}}
</purpose>

Throughout: work only from the notes and tags the person gives; never invent notes, dates or counts. Prefer reversible actions: archive before delete, rename before restructure, and make a full backup before step 3. Never suggest deleting notes that may hold credentials, legal, health or financial records; flag them for the person. Do not state app menu paths or plugin names as current fact. If the person asks to skip the pauses, confirm once that later steps will rest on unchecked choices; if they agree, run the remaining steps in one reply and mark each assumption.

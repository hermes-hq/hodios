---
schema: 1
id: process-screenshot-backlog
kind: prompt
title: Process a screenshot backlog
description: Sorts a backlog of phone or computer screenshots into notes worth keeping, tasks, things to file and deletions, with a batch method, what to extract from each kind, and a habit to stop the pile.
category: note-taking
version: 1.0.0
status: incubating
stage: [maintain]
role: [individual, student, parent]
requires: [none]
inputs: [text, image, preferences]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [screenshots, camera-roll, text-extraction, capture-backlog, digital-clutter]
pairs_with:
  prompts: [process-notes-inbox, organize-phone-notes-app, organize-recipe-collection, set-up-quick-note-capture]
args:
  - name: backlog
    description: What the screenshots are - a rough count and the kinds, for example "2,000 on my phone - recipes, outfits, memes, receipts, tickets, quotes, chat messages, error messages" - or descriptions of a sample.
    type: text
    required: true
  - name: tools
    description: Your phone or computer and notes or task app, for example "iPhone, Apple Notes, Reminders" or "Android, Google Keep, Google Photos".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Kinds and actions, Batch method, Sensitive screenshots, Session plan, Stop the pile]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Screenshots are the fastest capture tool on a phone and the worst for retrieval: they sit in the camera roll among photos, are not searchable unless the photo app reads text in images, and pile up into thousands. Most are disposable once their moment passed (tickets used, codes used, memes), a minority hold something worth keeping (a recipe, a quote, an address, a receipt for a warranty, a useful chat message), and some are really tasks ("book this", "buy this"). Processing works in batches by kind rather than one by one: photo apps can usually filter to screenshots, and many can find text inside images. The useful part should be extracted into a note, task or the right folder with its source, and then the screenshot deleted. Screenshots of other people's private messages, IDs and bank details need special care.

Backlog: {{backlog}}
Tools: {{tools}}
</context>

<task>
1. If the kinds of screenshot are unknown, ask the person to describe a sample of twenty and stop.
2. Group the backlog by kind and give each kind a default action: delete, extract to a note, make a task, file (receipts, tickets, documents), or keep as an image (outfits, design inspiration) in a dedicated album.
3. Give the batch method for their tools: filtering to screenshots, sorting oldest first, text search inside images if available, and selecting many at once, described in general terms.
4. For each "extract" kind, say exactly what to capture into the note (for example a recipe's ingredients, steps and source; a quote with who said it; an address with what it is for).
5. Flag sensitive screenshots (ID documents, bank or card details, passwords, private messages from others, medical results) and what to do: move to a secure place or delete, and remove from shared or synced albums.
6. Set a pace: a time-boxed session plan, starting with the oldest year or the biggest disposable group to show quick progress.
7. Give a habit for new screenshots: a weekly two-minute sweep and an alternative to screenshotting for common cases (share sheet to notes, save links).
</task>

<constraints>
- Do not claim features exist in their exact app version; describe what to look for.
- Remind them that deleted photos often sit in a recently deleted folder for a while and synced deletions apply to every device.
- Never help collect other people's private messages for leverage or to share around. If screenshots are evidence of harassment or abuse, suggest keeping them privately and securely and getting appropriate help.
- Keep the plan doable in short sessions.
</constraints>

<output_format>
## Kinds and actions
Table: Kind | Action | What to extract.
## Batch method
## Sensitive screenshots
## Session plan
## Stop the pile
</output_format>

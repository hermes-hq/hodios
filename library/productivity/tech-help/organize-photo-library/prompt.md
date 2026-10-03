---
schema: 1
id: organize-photo-library
kind: prompt
title: Organise a photo library
description: Plans organising a large family photo library scattered across phones, drives and clouds, with deduplication, folders or albums, naming, faces and dates, and a backup that survives.
category: tech-help
version: 1.0.0
status: incubating
stage: [plan, maintain]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [photo-library, family-photos, deduplication, photo-metadata, digital-archive]
pairs_with:
  prompts: [set-up-backups, free-up-storage, digitize-paper-documents]
args:
  - name: current_situation
    description: Where the photos are now and the state they are in, for example "two old laptops, an external drive, Google Photos and three phones; lots of duplicates; scanned prints with wrong dates".
    type: text
    required: true
  - name: tools
    description: Apps and services you use or prefer, for example Apple Photos, Google Photos, Lightroom, a Windows PC, a network drive. Optional.
    type: text
  - name: photo_count
    description: Rough total number of photos and videos, if known. Optional.
    type: number
output_contract:
  format: markdown
  sections: [The target setup, Phase 1 Gather and protect, Phase 2 Deduplicate, Phase 3 Organise, Phase 4 Back up, Keep it tidy]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a digital archivist who helps families turn decades of scattered photos into one library they can search and pass on. You know the traps: deduplicating before making a safety copy, organising inside a cloud app that later changes its plans, losing dates and locations by exporting the wrong way, folder schemes too elaborate to keep up, and projects abandoned halfway because they were planned as one heroic weekend.

Current situation: {{current_situation}}
{{#tools}}Tools: {{tools}}{{/tools}}
{{#photo_count}}Approximate count: {{photo_count}}{{/photo_count}}
</context>

<task>
1. The target setup: propose one "home" for the master library that fits the tools (a photo app library, or a plain year/month folder structure on a computer or network drive), and explain the trade-off between an app (faces, search, convenience) and plain folders (portable, app-independent). Recommend one and say why for this family. Ask one question if the choice depends on something unknown, such as whether everyone uses the same platform.
2. Phase 1, gather and protect: copy everything from every source into one staging place without deleting anything, keep the originals untouched until the end, and export from cloud services in a way that keeps original files and dates (for example a full-resolution export or takeout). Estimate the storage needed with room for duplicates.
3. Phase 2, deduplicate: use a deduplication feature or tool that compares content rather than file names, review before deleting, prefer keeping the highest-resolution copy, and move duplicates to a holding folder rather than deleting them outright.
4. Phase 3, organise: a simple structure (for example Year/Year-Month or Year/Event), a naming convention if folders are used, fixing wrong dates on scans in batches, adding faces and a small set of albums or keywords for what the family actually searches for (people, holidays, milestones). Keep it to what they will maintain.
5. Phase 4, back up: the master library in at least two places besides the computer, one off-site, and a restore check.
6. Keep it tidy: a monthly or quarterly routine for importing new phone photos, and how to share with family without duplicating the library again.
7. Size the work to the photo count: break it into sessions of an hour or two with a sensible order (newest phone first or oldest box first) so it can stop and restart.
</task>

<constraints>
- Never delete originals or duplicates until the master library is backed up in two places. State this rule at the top.
- Name tools generically (the photo app's duplicate finder, a deduplication tool) and present any named product as an example to compare; features and prices change.
- Warn where common exports strip dates, locations or edits, and what to check after export.
- Do not promise that faces or automatic dating will be accurate; tell them to spot-check.
</constraints>

<output_format>
State the golden rule in bold first, then:
## The target setup
## Phase 1 Gather and protect
## Phase 2 Deduplicate
## Phase 3 Organise
## Phase 4 Back up
## Keep it tidy
Each phase: numbered steps and a rough number of sessions.
</output_format>

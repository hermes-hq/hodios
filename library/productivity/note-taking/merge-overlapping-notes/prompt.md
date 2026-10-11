---
schema: 1
id: merge-overlapping-notes
kind: prompt
title: Merge overlapping notes
description: Merges two or more notes on the same topic into one clean note, keeping every fact once, marking where the notes disagree or changed over time, and listing what to redirect or archive.
category: note-taking
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [individual, researcher, writer, student]
requires: [none]
inputs: [notes, text]
output: [docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
level: beginner
tags: [duplicates, consolidation, vault-cleanup, conflicting-information]
pairs_with:
  prompts: [audit-notes-vault, split-note-into-atomic-notes]
args:
  - name: notes
    description: The full text of each note to merge, with its title and, if you know it, the date it was written or last changed.
    type: text
    required: true
  - name: keep_title
    description: Optional - the title you want the merged note to have, or the note that should survive.
    type: string
output_contract:
  format: markdown
  sections: [Merged note, Conflicts and changes, What was dropped, Housekeeping]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Overlapping notes happen when the same topic is captured at different times: a meeting note and a project note that both record a decision, two book notes from two readings, an old and a new version of a how-to. Merging them is risky in two ways: dropping a detail that only one note had, and blending two contradicting statements into a confident one. Experienced note keepers keep the newest fact as current, keep the older one as history when it matters, and record where each piece came from.

<notes>
{{notes}}
</notes>
{{#keep_title}}
Title to keep: {{keep_title}}
{{/keep_title}}
</context>

<task>
1. If only one note is given, or the notes are clearly about different topics, say so and stop; suggest linking them instead if they are related.
2. Build an outline from all notes, grouping the same points together.
3. Write the merged note: a clear title (the requested one if given), each fact stated once in the best wording from the sources, the more recent version first where they differ, and sources or dates kept.
4. List every conflict or change over time: what each note said, which date it came from, and which you treated as current. If dates are unknown, mark the conflict as unresolved and ask.
5. List anything deliberately dropped (exact duplicates, empty headings) so the person can check.
6. Housekeeping: which old titles to keep as aliases or redirects, which links point to them and should be updated, and which note to archive.
</task>

<constraints>
- No fact from any note may disappear without appearing in "What was dropped".
- Never resolve a conflict silently; every contradiction appears in "Conflicts and changes".
- Do not add information that is in none of the notes.
- Keep personal opinions and first-person reflections from the originals as they are.
</constraints>

<output_format>
## Merged note
The full note, ready to paste.
## Conflicts and changes
Table: Point | Note A said | Note B said | Treated as current
## What was dropped
## Housekeeping
</output_format>

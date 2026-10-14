---
schema: 1
id: standardise-batch-of-short-texts
kind: prompt
title: Standardise a batch of short texts
description: Edits a batch of short items written by different people, such as staff bios, product, course or event descriptions, to one consistent pattern, length, person and style, flagging items missing facts.
category: editing
version: 1.0.0
status: incubating
stage: [review]
role: [editor, marketer, operations-manager, content-creator]
requires: [none]
inputs: [text, dataset]
output: [rewrite, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [batch-editing, bios, descriptions, consistency, templates]
pairs_with:
  prompts: [write-professional-bio, unify-voice-in-multi-author-document, write-house-style-guide]
  personas: [editor]
args:
  - name: items
    description: The short texts, each clearly separated and labelled (for example by name or product code).
    type: text
    required: true
  - name: pattern
    description: "The pattern to follow if you have one, for example \"third person, 60 to 80 words: role, what they work on, one personal line\". Leave empty to derive one from the best items."
    type: text
output_contract:
  format: markdown
  sections: [Pattern, Edited items, Missing information, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Team pages, course catalogues, product listings, speaker lists and member directories are written item by item by different people, and it shows: one bio is 20 words in first person, the next is 200 in third person with a list of degrees; one course description starts with the outcome, another with the timetable. Readers compare items side by side, so inconsistency looks careless and makes comparison hard. The fix is a pattern: a fixed order of elements, a length range, one person and tense, one format for titles, dates, prices and credentials. Then each item is edited into the pattern using only its own facts. Items that lack a required element should be flagged, not padded with invented detail.
</context>

<task>
Standardise these items to one pattern.

<items>
{{items}}
</items>
{{#pattern}}Pattern to follow: {{pattern}}{{/pattern}}

1. If there are fewer than two items, say batch standardising needs several and stop.
2. If no pattern was given, derive one from the strongest items: element order, length range, person, tense, and formats for names, titles, credentials, dates, prices and units. State it.
3. For each item, map its facts onto the pattern's elements. Note elements it is missing.
4. Edit each item into the pattern using only its own facts. Trim items that are too long by removing the lowest-priority content; do not pad short items.
5. Apply the same formats everywhere (for example "Dr" or "Dr.", 24-hour or 12-hour times, currency style).
6. Flag items that cannot meet the pattern without more information.
</task>

<constraints>
- Never move a fact from one item to another or invent facts, credentials, hobbies or outcomes to fill the pattern.
- Keep each item's names, numbers, prices and dates exactly.
- Keep the items in their original order and labels.
- Personal details in bios stay only if the person included them.
</constraints>

<output_format>
## Pattern
Element order, length range, person and tense, and formats, as bullets.
## Edited items
Each item under its label.
## Missing information
A table: Item | Missing element | Question to ask. "None" if none.
## Notes
Anything trimmed that the owner may want back. "None" if none.
</output_format>

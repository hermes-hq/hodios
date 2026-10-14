---
schema: 1
id: write-map-of-content
kind: prompt
title: Write a map of content
description: Writes a hub note (a map of content) for a topic from a list of your note titles - grouped into sections, ordered so it reads as a path, with one-line summaries and the gaps worth writing next.
category: note-taking
version: 1.0.0
status: incubating
stage: [build]
role: [individual, researcher, writer, student]
stack: [obsidian, markdown]
requires: [none]
inputs: [notes, text]
output: [docs, outline]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
level: intermediate
depth: specific
tags: [map-of-content, hub-note, index-note, wikilinks]
pairs_with:
  prompts: [suggest-links-between-notes, split-note-into-atomic-notes, outline-draft-from-notes]
args:
  - name: topic
    description: The topic the hub note is for, and what you want it to help with (finding notes, studying, planning a piece of writing).
    type: string
    required: true
  - name: notes
    description: The titles of your notes on this topic, ideally with a one-line summary or the first lines of each.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Map note, Gaps, Notes that may not belong]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A map of content (MOC) is a note whose job is to organise links to other notes on a topic. A good one is more than an alphabetical list: it groups notes into a few meaningful sections, orders them so a reader can follow a line of thought, says in a few words why each note is there, and shows tensions and open questions. It is written for future you, who has forgotten the details. It should only link notes that exist, and it should make the gaps visible so the next note to write is obvious.

Topic: {{topic}}
<notes>
{{notes}}
</notes>
</context>

<task>
1. If fewer than about five notes are given, say a hub note is premature, suggest linking them directly, and stop.
2. Group the notes into three to seven sections that reflect how the topic is understood (for example basics, mechanisms, practice, debates), not by note format.
3. Order sections and notes so the map reads as a path from foundations to open questions.
4. Write each entry as a [[wikilink]] using the exact title given, followed by a few words on what it adds or how it relates to its neighbours. Mark notes that contradict or answer each other.
5. Add a short opening paragraph saying what the topic covers and how to use the map.
6. List gaps: notes the structure suggests are missing, as proposed titles. List notes that seem not to belong here.
</task>

<constraints>
- Use only titles from the list; never invent a link to a note that does not exist. Proposed new notes go in Gaps, clearly marked as not yet written.
- Keep exact titles, including capitalisation, so links resolve.
- Describe a note only from its title and summary; if only a title is given, keep the description cautious.
</constraints>

<output_format>
## Map note
The full hub note, ready to paste, with sections as ### headings.
## Gaps
## Notes that may not belong
</output_format>

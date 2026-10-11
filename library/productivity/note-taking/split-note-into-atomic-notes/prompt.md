---
schema: 1
id: split-note-into-atomic-notes
kind: prompt
title: Split a long note into atomic notes
description: Breaks one long, sprawling note into small single-idea notes with claim titles, keeps every fact and source, adds links between them and leaves a short index note in place of the original.
category: note-taking
version: 1.0.0
status: incubating
stage: [build]
role: [individual, researcher, writer, student]
stack: [obsidian, markdown]
requires: [none]
inputs: [notes, text]
output: [docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
level: intermediate
tags: [atomic-notes, zettelkasten, refactoring-notes, evergreen-notes]
pairs_with:
  prompts: [write-map-of-content, merge-overlapping-notes, make-reading-notes]
args:
  - name: note
    description: The full text of the long note you want to split, including any links, sources and headings.
    type: text
    required: true
  - name: style
    description: Optional - how your notes are titled and linked today (for example "claim titles, [[wikilinks]], a Source line"), so the new notes match.
    type: text
output_contract:
  format: markdown
  sections: [Split plan, New notes, Index note, Left over]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Long notes collect several ideas that later need to be found and linked separately. Splitting works when each new note holds one idea that makes sense on its own, has a title stating that idea, keeps the source or context it came from, and links to its siblings. The common mistakes are cutting by heading rather than by idea, losing the context that made a fragment meaningful ("this" with no referent), dropping sources, and splitting so finely that notes become single sentences with no explanation. Some material is not an idea at all (a to-do, a quote list, a log) and belongs in a different kind of note.

<note>
{{note}}
</note>
{{#style}}
House style: {{style}}
{{/style}}
</context>

<task>
1. If the note holds only one idea, say it does not need splitting (whatever its length), suggest a better title if useful, and stop.
2. Read the whole note and list the distinct ideas, decisions, facts and other material it contains. Write a split plan: proposed note titles, one line each, and what does not belong in an idea note (tasks, logs, raw quotes).
3. Write each new note: a title that states the idea, a body in plain words that stands alone (replace "this", "above" and "as mentioned" with what they refer to), the source or origin carried over, and links to sibling notes with a few words on why.
4. Write a short index note to replace the original, listing the new notes in a sensible order.
5. List what was left over (tasks, open questions, fragments) and where it should go.
</task>

<constraints>
- Keep every fact, figure, quote and source from the original; nothing may disappear. If something does not fit a note, put it in Left over.
- Do not add claims that are not in the original; mark any bridging sentence you add as "(added)".
- Give each new note enough explanation to stand alone; do not split into bare single sentences.
- Follow the house style if given; otherwise use plain Markdown with [[wikilinks]].
</constraints>

<output_format>
## Split plan
## New notes
Each note as its own block starting with ### Title.
## Index note
## Left over
</output_format>

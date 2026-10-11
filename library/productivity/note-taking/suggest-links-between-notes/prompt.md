---
schema: 1
id: suggest-links-between-notes
kind: prompt
title: Suggest links between notes
description: Reads a set of your notes and suggests meaningful links between them - which note supports, contradicts, extends or applies another - with the sentence to add, plus clusters that deserve a hub note.
category: note-taking
version: 1.0.0
status: incubating
stage: [build, review]
role: [individual, researcher, writer, student]
stack: [obsidian, markdown]
requires: [none]
inputs: [notes, text]
output: [table, docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [backlinks, wikilinks, connected-notes, zettelkasten, knowledge-graph]
pairs_with:
  prompts: [write-map-of-content, audit-notes-vault]
args:
  - name: notes
    description: The notes to connect - titles and full text or at least a few lines of each. Between about 5 and 40 notes works best.
    type: text
    required: true
  - name: focus
    description: Optional - a question or project you are working on, so links that serve it come first.
    type: string
output_contract:
  format: markdown
  sections: [Suggested links, Clusters, Tensions worth a note, Skipped]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Links are what turn a pile of notes into something you can think with, but only links with a reason. "Related to" links pile up and stop meaning anything. Useful links say why: this note is evidence for that one, contradicts it, is an example of it, is a cause of it, or applies it to a new area. Experienced note keepers write the link inside a sentence ("This is one reason [[X]] fails in small teams") rather than in a "related" list, and they value surprising connections across topics more than obvious ones within a topic.

<notes>
{{notes}}
</notes>
{{#focus}}
Current focus: {{focus}}
{{/focus}}
</context>

<task>
1. If fewer than three notes are given, ask for more and stop.
2. Read every note. For each pair worth linking, name the relation type: supports, contradicts, example of, cause of, applies to, defines, or answers.
3. For each suggested link, write the exact sentence to add to the source note, with the [[wikilink]] inside it.
4. Rank links: those serving the focus first, then cross-topic connections, then within-topic ones. Keep to the strongest 10 to 25.
5. Identify clusters of three or more tightly connected notes and suggest a hub note title for each.
6. List tensions: notes that disagree, with a proposed title for a note that would work out the disagreement.
7. List notes you skipped because nothing linked meaningfully, so the person knows they were read.
</task>

<constraints>
- Every link must rest on content in both notes; quote or paraphrase the part that justifies it.
- Do not suggest "related" links without a stated relation.
- Use exact note titles so links resolve. Do not invent notes; new notes go only as proposed titles.
</constraints>

<output_format>
## Suggested links
Table: From | To | Relation | Sentence to add | Why
## Clusters
## Tensions worth a note
## Skipped
</output_format>

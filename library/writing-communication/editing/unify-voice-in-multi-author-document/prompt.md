---
schema: 1
id: unify-voice-in-multi-author-document
kind: prompt
title: Unify the voice of a multi-author document
description: Edits a document written by several people into one consistent voice, aligning terms, tense, person, formality, heading style and level of detail across sections while keeping each section's content.
category: editing
version: 1.0.0
status: incubating
stage: [review]
role: [editor, writer, manager, technical-writer]
requires: [none]
inputs: [document]
output: [rewrite, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [voice-consistency, collaborative-writing, terminology, harmonise, single-voice]
pairs_with:
  prompts: [build-style-sheet, capture-writing-voice, edit-for-structure]
  personas: [editor]
args:
  - name: document
    description: The full document, ideally with a note of who wrote which section.
    type: text
    required: true
  - name: target_voice
    description: The voice to align to, for example "match section 2", "formal, third person" or a short style note. Optional; if omitted, the edit follows the majority style.
    type: text
output_contract:
  format: markdown
  sections: [Voice decisions, Edited document, Changes by section, Content issues for the authors]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You edit documents that several people wrote, such as proposals, reports, handbooks, grant applications and policy documents, so they read as if one person wrote them. Readers notice the seams: one section says "we", the next "the company", the third "you"; one author writes formally, another chats; terms change ("customers", "clients", "users"); some sections use numbered headings with full sentences, others fragments; one section is a page of detail and the next two lines. The editor's job is to choose the voice decisions explicitly, apply them evenly, and keep each author's content intact. Some seams are not voice problems but content problems: sections that repeat each other, contradict each other or leave gaps; those go back to the authors rather than being silently fixed.

<document>
{{document}}
</document>

{{#target_voice}}Target voice: {{target_voice}}{{/target_voice}}
</context>

<task>
1. Diagnose the differences between sections: person (we, you, they), tense, formality, sentence length, terminology, heading style, list style, number and date style, and depth of detail.
2. Decide the voice: use the target voice if given, otherwise the majority or most appropriate style for the document's apparent reader, and record each decision in a short table.
3. Edit every section to the decisions. Keep facts, claims, commitments and section content; change wording, terms, person, tense and formatting only.
4. Where detail levels differ greatly, keep the content but flag the imbalance rather than cutting or padding.
5. List content issues for the authors: repetition between sections, contradictions, missing transitions or gaps, and terms used with different meanings.
6. Summarise the changes by section so each author can see what happened to their part.
</task>

<constraints>
- Do not add or remove facts, claims or commitments; flag content problems instead of fixing them silently.
- Keep quoted material, legal wording and defined terms exactly as written unless the definition itself is inconsistent, in which case flag it.
- Apply the decisions consistently; do not leave one section in a different voice without saying why.
</constraints>

<output_format>
## Voice decisions
Table: Dimension | Variants found | Decision.

## Edited document
The full edited text.

## Changes by section
Bullets per section.

## Content issues for the authors
Numbered list with locations.
</output_format>

---
schema: 1
id: make-diagram-labelling-flashcards
kind: prompt
title: Make diagram labelling flashcards
description: Turns a labelled diagram such as an anatomy figure, cell, circuit or map into one-label-per-card occlusion flashcards with function prompts and an import-ready list.
category: studying
version: 1.0.0
status: incubating
stage: [learn]
role: [student]
stack: [anki]
requires: [none]
inputs: [image, text]
output: [table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [image-occlusion, diagrams, labelling, spaced-repetition]
pairs_with:
  prompts: [make-flashcards, tidy-flashcard-deck, make-dual-coding-notes]
args:
  - name: diagram
    description: The labelled diagram as an image, or a list of its labels with where each sits (for example "1, top left - right atrium"). Include the caption or figure title.
    type: text
    required: true
  - name: subject_context
    description: Optional course and level, and what the exam asks about this diagram (label only, label and function, or draw and label).
    type: string
  - name: format
    description: Output format. anki-image-occlusion gives a mask plan for the Image Occlusion note type; csv gives text cards that describe positions, for apps without image support.
    type: enum
    enum: [anki-image-occlusion, csv]
    default: anki-image-occlusion
output_contract:
  format: markdown
  sections: [Labels found, Occlusion cards, Function cards, Import list, Setup steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Diagram labelling questions are common in biology, anatomy, geography, physics and engineering, and text flashcards handle them badly: "what is the structure at the top left of the heart" depends on the picture. The method that works is image occlusion: hide one label at a time on the real diagram and recall it from position, with the rest visible as context ("hide one, guess one"). Hiding all labels at once ("hide all, guess one") is harder and better once the basics are known. Labelling alone is often not enough for exams, so each structure should also get a card on its function or role. Common mistakes are cards that hide two labels in one mask, masks that give the answer away by size or leader-line position, and labels misread from a low-quality image.
</context>

<task>
Make labelling flashcards from this diagram in {{format}} format.

<diagram>
{{diagram}}
</diagram>
{{#subject_context}}
Context: {{subject_context}}
{{/subject_context}}

1. List every label you can read with its position on the diagram. Mark any label you cannot read clearly as uncertain; do not guess silently.
2. Plan the occlusion cards: one mask per label, numbered in a sensible order (for example following blood flow, a pathway or top to bottom). Say which mode to use first ("hide one, guess one") and when to switch to "hide all, guess one". Group labels that are always learned together (left and right versions of a structure) and say whether to mask them as one or two cards.
3. Write function cards for each structure that the exam needs beyond its name: one question and one short answer per card, based on the diagram's caption and context. If the function is not in the diagram or context, write the card from standard textbook knowledge and mark it "(check against your notes)".
4. Produce the import list in the requested format:
   - anki-image-occlusion: a table of mask number, label, position and extra text for the back of the card.
   - csv: semicolon-separated lines "Front;Back;Tags" where the front describes the position in words precisely enough to answer from the diagram, plus Anki header lines `#separator:Semicolon`, `#html:false`, `#tags column:3`.
5. Give short setup steps: crop or redraw the diagram without labels if the image is low quality, create the masks, and suggest reviewing new cards daily for the first week.
</task>

<constraints>
- Use only labels present in the diagram. Never add structures that are not labelled, even if they usually appear on such diagrams.
- Do not create cards that test two labels at once.
- Mark any label read with doubt, and any function written from general knowledge.
- If no labels can be read (no image, or the image is unreadable), ask for a clearer image or a typed label list rather than producing cards.
</constraints>

<output_format>
## Labels found
A table: No. | Label | Position | Confidence.
## Occlusion cards
The mask plan and order, with the mode to start in.
## Function cards
A table: Front | Back.
## Import list
In the requested format, in a code block.
## Setup steps
</output_format>

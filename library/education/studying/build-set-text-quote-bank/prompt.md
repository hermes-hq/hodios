---
schema: 1
id: build-set-text-quote-bank
kind: prompt
title: Build a quote bank for a set text
description: Builds a bank of short, memorisable quotations from extracts of a set text the student pastes, organised by theme and character with an analysis hook each, plus a recall drill.
category: studying
version: 1.0.0
status: incubating
stage: [learn]
role: [student]
subject: [literature]
requires: [none]
inputs: [text, document]
output: [table, quiz]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [quotations, close-reading, closed-book-exam, gcse-english]
pairs_with:
  prompts: [make-flashcards, create-memory-aids]
  personas: [literature-tutor]
args:
  - name: text_title
    description: The set text and author, e.g. "Macbeth by William Shakespeare" or "An Inspector Calls by J.B. Priestley".
    type: string
    required: true
  - name: text_extracts
    description: The passages to draw quotations from, copied from your edition, with act and scene or chapter references if you have them.
    type: text
    required: true
  - name: themes
    description: Optional themes or characters your course focuses on, e.g. "ambition, guilt, the supernatural, Lady Macbeth".
    type: text
output_contract:
  format: markdown
  sections: [Quote bank, Multi-purpose quotes, Gaps, Recall drill, Answer key]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
In closed-book literature exams, students need a small set of exact quotations they can recall and analyse under time pressure. Long quotations get misremembered; a quotation with nothing to say about it wastes time. The best bank uses short quotations (often 2 to 8 words) that each work for several themes or characters and contain a word worth zooming in on. Quotations from memory, or from a different edition, are a common source of misquoting, so this bank uses only the text the student pasted.

Text: {{text_title}}.
</context>

<task>
<extracts>
{{text_extracts}}
</extracts>
{{#themes}}

<themes>
{{themes}}
</themes>
{{/themes}}

1. Identify the themes and characters to cover: the ones listed, or the main ones evident in the extracts.
2. Choose 12 to 20 quotations from the extracts. Prefer short ones (aim for under 8 words, never over 15) that contain a striking word, image or technique and apply to more than one theme or character. Use ellipses sparingly and never in a way that changes meaning.
3. Copy each quotation exactly as pasted: same spelling, punctuation and capitalisation.
4. For each, record who says it and where (act, scene, chapter or line if given in the extracts; otherwise "extract N"), the themes and characters it serves, the technique (only if clearly present), and a one-sentence analysis hook naming the key word and what it suggests.
5. Pick 3 to 5 multi-purpose quotations that cover the most themes, and explain how each could be used in two different essay questions.
6. List themes or characters with fewer than 2 quotations and suggest which part of the text to look in, without quoting it.
7. Write a recall drill: 6 cloze items (key word blanked), 4 "give a quotation that shows..." prompts, 4 "who says this and when?" items and 3 "zoom in" questions on a single word.
</task>

<constraints>
- Quote only from the pasted extracts. Never add a quotation from memory, even a famous one; if an important moment is missing, say so under Gaps and ask the student to paste it.
- Do not add context claims (biography, historical background) unless they appear in the extracts; if context would help, mark it [check with your teacher or notes].
- Analysis hooks are starting points of one sentence, not essay paragraphs.
- If the extracts are missing or only a line or two, ask for the passages and stop.
</constraints>

<output_format>
## Quote bank
Table: # | Quotation | Who and where | Themes and characters | Technique | Analysis hook. Group rows by theme.

## Multi-purpose quotes
Bullets: quotation, then two essay uses.

## Gaps
Bullets: theme or character, and where to look.

## Recall drill
The four parts, numbered, no answers.

## Answer key
Answers to each drill item, with quotation numbers.
</output_format>

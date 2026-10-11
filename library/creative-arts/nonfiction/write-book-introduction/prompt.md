---
schema: 1
id: write-book-introduction
kind: prompt
title: Write a nonfiction book introduction
description: Writes the introduction to a nonfiction book that opens on a story or problem, earns the author's authority, states the promise and gives a short roadmap, without spending the best material up front.
category: nonfiction
version: 1.0.0
status: incubating
stage: [build]
role: [writer]
requires: [none]
inputs: [notes, text]
output: [docs]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [book-introduction, opening-chapter, reader-promise, chapter-roadmap, front-matter]
pairs_with:
  prompts: [outline-nonfiction-book, draft-nonfiction-chapter, write-book-conclusion]
  workflows: [nonfiction-book-track]
args:
  - name: book_outline
    description: The book's promise, thesis and chapter list with one line each. The finished outline is best.
    type: text
    required: true
  - name: opening_material
    description: The story, scene, statistic or personal moment you might open with, and why you came to write the book. Your own words and facts only.
    type: text
    required: true
  - name: length
    description: Target length in words.
    type: number
    default: 3000
output_contract:
  format: markdown
  sections: [Introduction draft, What this introduction promises, Claims to source, Revision notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You draft nonfiction introductions. Many readers decide in a bookshop or a free sample whether to buy, and they read the introduction to decide; so it must hook, show why this matters to the reader now, show why the author can be trusted, and say what the reader will get. Common failures: a long throat-clearing history of the field, an author biography before the reader cares, a chapter-by-chapter summary so complete the reader feels no need to continue, and claims the book never delivers. Experienced authors write or rewrite the introduction last, after the chapters exist.

<book_outline>
{{book_outline}}
</book_outline>
<opening_material>
{{opening_material}}
</opening_material>
Target length: about {{length}} words.
</context>

<task>
1. Check the outline gives a promise and chapters. If the chapters are not written yet, say the draft will need revisiting once they are, and proceed.
2. Choose the opening from the material: a concrete scene or problem, not a definition or dictionary quote. Say why you chose it.
3. Draft the introduction in this movement: opening story or problem; the stakes for the reader; the central idea or argument in plain words; why the author (earned credibility in a paragraph, shown through experience rather than listed titles); who the book is for and not for; how the book is organised, in a light roadmap that teases rather than summarises; how to read it.
4. Mark every factual claim, statistic or quotation with [source needed] unless the author supplied the source.
5. List what the introduction promises so the author can check each promise is kept in a chapter.
</task>

<constraints>
- Use only the stories and facts in the input. Do not invent anecdotes, studies, numbers or quotations; leave a bracketed slot where one would help.
- Keep the roadmap to a paragraph or a short list; never more than a sentence per chapter.
- Write in the author's voice as shown in the material; plain, direct sentences, no hype.
- Do not promise results the outline does not support.
</constraints>

<output_format>
## Introduction draft
The draft with [source needed] markers.

## What this introduction promises
Table: Promise | Chapter that delivers it | Delivered? (yes / check).

## Claims to source
Numbered list.

## Revision notes
Three to five notes, including what to revisit once all chapters are drafted.
</output_format>

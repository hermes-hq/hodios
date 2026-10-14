---
schema: 1
id: generate-nonfiction-book-titles
kind: prompt
title: Generate nonfiction book titles
description: Generates title and subtitle pairs for a nonfiction book where the title is memorable and the subtitle states the promise and reader, then tests each against search, spoken use and existing books.
category: nonfiction
version: 1.0.0
status: incubating
stage: [plan, ship]
role: [writer]
requires: [none]
inputs: [notes, text]
output: [ideas, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
depth: specific
tags: [book-title, subtitle, title-ideas, book-positioning, discoverability]
pairs_with:
  prompts: [write-nonfiction-book-proposal, choose-book-categories-and-keywords]
args:
  - name: book_summary
    description: What the book argues or teaches, who it is for, its tone, and any working title or phrases you like or hate.
    type: text
    required: true
  - name: count
    description: How many title and subtitle pairs to produce.
    type: number
    default: 12
output_contract:
  format: markdown
  sections: [Promise in one line, Title options, Shortlist, Checks before choosing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You name nonfiction books. In most nonfiction the title and subtitle split the work: the title is short and sticky (a phrase, an image, a coined term), and the subtitle says plainly what the reader gets and sometimes who it is for, because the subtitle carries the search words and the sales pitch. Experienced editors test titles out loud (can someone say it on a podcast and be found), at thumbnail size (a long title cannot be read on a phone), and against existing books (titles are not usually protected, but sharing one with a known book confuses readers).

<book_summary>
{{book_summary}}
</book_summary>
</context>

<task>
1. Write the book's promise in one line: reader, change, method. If the summary does not let you, ask.
2. Generate {{count}} title and subtitle pairs across distinct approaches: coined term, metaphor, the reader's own words, a provocative claim, a number or method name, a question. Label each with its approach.
3. Score each on: memorable when heard, clear subtitle promise, contains the words a reader would search, fits the tone, length at thumbnail size.
4. Pick a shortlist of three with one sentence each on why, and the risk of each.
5. List the checks the author must do before choosing, since you cannot see current listings.
</task>

<constraints>
- Do not claim a title is unused or available; you cannot check retailer or library catalogues. Tell the author to search them.
- Avoid titles that promise outcomes the book cannot deliver (medical cures, guaranteed income).
- Subtitles under about 12 words. No subtitles stacked with colons and semicolons.
- Respect the author's dislikes and tone.
</constraints>

<output_format>
## Promise in one line

## Title options
Table: # | Title | Subtitle | Approach | Heard | Promise | Search words | Length.

## Shortlist
Three picks with why and risk.

## Checks before choosing
Bulleted: catalogue and retailer search, say it aloud, thumbnail test, ask five target readers.
</output_format>

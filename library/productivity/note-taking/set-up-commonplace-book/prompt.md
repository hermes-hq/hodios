---
schema: 1
id: set-up-commonplace-book
kind: prompt
title: Set up a commonplace book
description: Sets up a commonplace book for collecting quotes, passages and ideas from reading, listening and conversation - headings, entry format, an index, a habit for adding entries and ways to reuse them.
category: note-taking
version: 1.0.0
status: incubating
stage: [design]
role: [individual, writer, student]
requires: [none]
inputs: [preferences, text]
output: [plan, docs]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
level: beginner
tags: [commonplace-book, quotes, reading-life, index-cards]
pairs_with:
  prompts: [make-reading-notes, set-up-bullet-journal]
args:
  - name: interests
    description: What you read, listen to or care about, what you want to collect (quotes, lines for speeches, recipes, arguments, words) and what you hope to do with it.
    type: text
    required: true
  - name: medium
    description: The medium you want to use.
    type: enum
    enum: [paper-notebook, index-cards, digital, undecided]
    default: undecided
output_contract:
  format: markdown
  sections: [Headings, Entry format, Index, Habit, Reusing entries, First ten entries]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A commonplace book is a personal collection of passages, quotes and ideas, gathered under headings so they can be found and reused. Readers, writers, speakers and preachers have kept them for centuries. It differs from a reading journal (organised by book) and from a slip-box of atomic notes (organised by links): it is organised by theme. What makes one useful is a small set of evolving headings, an exact source on every entry (author, work, page or time stamp), a line of the keeper's own response, and an index so entries resurface. What kills it is copying too much and never rereading.

Interests: {{interests}}
Medium: {{medium}}
</context>

<task>
1. If no interests are given, ask what the person reads and wants to collect, and stop.
2. If the medium is undecided, recommend one based on the stated use, with the trade-off in one sentence.
3. Propose 8 to 15 starting headings drawn from the person's interests, with a rule for adding new ones and splitting crowded ones.
4. Define the entry format: the passage (exact words, marked as a quote), source with page or time stamp, the heading, the date added and one line of the keeper's own response.
5. Design the index for the medium: numbered pages with an index at the back for paper, a card-file system for cards, tags or a hub note for digital.
6. Write a habit for adding entries (for example mark while reading, copy in once a week) and a short rereading routine.
7. Show ways to reuse entries tied to the person's goals (a speech, an essay, a gift, teaching).
8. Suggest how to fill the first ten entries from what the person is already reading; do not supply quotes yourself.
</task>

<constraints>
- Do not invent or supply quotations, and do not attribute quotes to anyone; the person collects their own from sources they read.
- If the person wants to share or publish entries, mention that long passages may be protected by copyright and short quotes with attribution are safer.
- Keep the system light enough to keep for years.
</constraints>

<output_format>
## Headings
## Entry format
## Index
## Habit
## Reusing entries
## First ten entries
</output_format>

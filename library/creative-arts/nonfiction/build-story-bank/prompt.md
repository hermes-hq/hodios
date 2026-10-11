---
schema: 1
id: build-story-bank
kind: prompt
title: Build a story bank for a nonfiction book
description: Turns an author's notes, talks and memories into a story bank for a nonfiction book, with each story's point, permissions status and best chapter, so ideas get illustrated and no story is used twice.
category: nonfiction
version: 1.0.0
status: incubating
stage: [plan]
role: [writer]
requires: [none]
inputs: [notes, transcript, text]
output: [table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [anecdotes, examples, storytelling, chapter-planning, permissions]
pairs_with:
  prompts: [outline-nonfiction-book, draft-nonfiction-chapter, write-composite-case-study]
args:
  - name: raw_material
    description: Notes, talk transcripts, old posts, client or student examples and personal memories. Anonymise other people as you prefer.
    type: text
    required: true
  - name: chapters
    description: The chapter list with the main idea of each.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Story bank, Chapter coverage, Gaps, Permissions to sort]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You build story banks for nonfiction authors. In idea-led books, stories carry the argument: readers remember the person and the moment, then the point. Authors who draft without a bank reuse their two favourite stories in several chapters, lean on themselves as the hero of every example, or reach for borrowed famous anecdotes that every reader has heard. A bank lists each story once with the single point it proves best, whose story it is and whether the author has the right to tell it.

<raw_material>
{{raw_material}}
</raw_material>
<chapters>
{{chapters}}
</chapters>
</context>

<task>
1. Extract every distinct story, example or case in the material. Give each a short label, a two-line summary (who, what happened, the turn), and its source in the material.
2. For each story, name the single point it illustrates best and the chapter it fits best, with a second-choice chapter if any.
3. Note whose story it is (the author's, a named person, a client, a public figure) and its permissions status: author's own, needs consent, needs anonymising, public record, or unclear.
4. Check coverage: chapters with no story or only one, chapters where every story features the author, and stories assigned to more than one chapter.
5. List gaps: the kinds of story each thin chapter needs (for example "a failure case", "someone unlike the author"), without inventing them.
</task>

<constraints>
- Use only stories present in the material. Never invent or embellish an anecdote, and do not fill gaps with made-up examples.
- Keep details as given; if a detail is ambiguous, note it instead of choosing.
- Flag stories about identifiable people that could embarrass or harm them.
</constraints>

<output_format>
## Story bank
Table: Label | Summary | Source | Point it proves | Best chapter | Alt chapter | Whose story | Permissions.

## Chapter coverage
Table: Chapter | Stories assigned | Issue.

## Gaps
Per chapter, the kind of story needed and where the author might find one.

## Permissions to sort
List with the action needed.
</output_format>

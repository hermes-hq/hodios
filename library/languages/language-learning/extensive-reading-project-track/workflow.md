---
schema: 1
id: extensive-reading-project-track
kind: workflow
title: Read a whole book in a new language
description: Runs a project to read a full book in a target language, from choosing a title at the right level and pre-teaching key words to chapter-by-chapter reading loops and a closing words-to-keep list.
category: language-learning
version: 1.0.0
status: incubating
stage: [plan, learn, review]
role: [language-learner, student]
requires: [none]
inputs: [text, preferences]
output: [plan, table, quiz, summary]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: optional
level: intermediate
tags: [extensive-reading, graded-readers, vocabulary-coverage, reading-fluency, first-novel, book-project]
pairs_with:
  prompts: [write-graded-reader, gloss-authentic-text, mine-sentences-for-flashcards, review-vocabulary-spaced, level-down-text-for-learner]
  personas: [language-learning-strategist]
args:
  - name: target_language
    description: The language you want to read a book in.
    type: string
    required: true
  - name: level
    description: Your current reading level (CEFR).
    type: enum
    enum: [A1, A2, B1, B2, C1, C2]
    default: B1
  - name: interests
    description: Optional. Genres, topics, books or films you love, books you already know in your own language, and how much reading time you have per week.
    type: text
steps:
  - {id: choose, file: steps/01-choose-book.md, stage: plan, gate: approve, artifact: "book-project/01-book-choice.md"}
  - {id: prepare, file: steps/02-pre-teach.md, stage: learn, gate: approve, artifact: "book-project/02-key-words.md"}
  - {id: read, file: steps/03-chapter-loop.md, stage: learn, gate: approve, artifact: "book-project/03-reading-log.md"}
  - {id: close, file: steps/04-close.md, stage: review, gate: none, artifact: "book-project/04-words-to-keep.md"}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Takes a {{target_language}} learner at level {{level}} through their first complete book. Extensive reading works when the text is easy enough to read for meaning: research on vocabulary coverage suggests readers need to know roughly 95 percent of the running words to follow a text with some help, and about 98 percent to read comfortably alone. So the project chooses the book carefully, prepares the few words that matter most, then reads in steady loops with light checks rather than translating every line.
{{#interests}}

<interests>
{{interests}}
</interests>
{{/interests}}

Rules for every step:
- Never invent books, authors, editions or plot details. Suggest only titles you are confident exist and fit the level; otherwise describe the kind of book (graded reader series at a level, a known children's or young-adult classic, a translation of a book they know) and how to check it.
- Do not reproduce copyrighted text beyond a short quotation; work from what the learner pastes or describes.
- Keep checks light: the aim is enjoyment and volume, not exam questions.
- Ask for missing essentials (reading time per week, format, whether they have the book) and mark gaps as [X].

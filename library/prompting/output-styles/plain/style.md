---
schema: 1
id: plain
kind: style
title: Plain language
description: Lowers the reading effort of any answer, from swapping jargon for everyday words to a grade 6 reading level, keeping every fact accurate. Use for the general public or second-language readers.
category: output-styles
version: 1.0.0
status: incubating
output: [rewrite]
risk: read-only
tags: [plain-english, readability, accessibility-writing, jargon-free]
pairs_with:
  styles: [{id: skimmable, level: 2}, {id: warm, level: 1}]
levels:
  - label: Jargon light
    instruction: "Replace jargon and acronyms with everyday terms where an accurate one exists (\"high blood pressure\" not \"hypertension\", \"pay\" not \"remuneration\"); when a technical term is needed, define it in a few words the first time. Keep sentence structure and length as they would otherwise be."
  - label: Everyday words
    instruction: "Prefer common, concrete words (use instead of utilise, help instead of facilitate, start instead of commence). Use active voice and address the reader as \"you\". Define any unavoidable technical term the first time."
  - label: Short sentences
    instruction: "Use everyday words, active voice, and sentences of about 15 to 20 words on average, one idea each. Put the main point first. Break long lists of conditions into bullets."
  - label: Grade 8
    instruction: "Write so a typical 13- to 14-year-old could follow: sentences of about 12 to 15 words, mostly one- and two-syllable words, one idea per sentence, and a concrete example for any abstract idea. Explain every term a general reader might not know."
  - label: Grade 6
    instruction: "Write so an 11- to 12-year-old could follow: short sentences of about 8 to 12 words, the most common words, no idioms, one idea per sentence, and an everyday example for each key point. Use short bullet steps for anything the reader must do."
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
Make the answer easier to read without making it wrong. This style changes words and sentences, not how much background is explained: an expert reading in a second language should still get the full answer, just in simpler words. Keep every fact, number, warning and condition that matters; simplify the words, not the truth. If something cannot be simplified without losing accuracy, keep the precise term and explain it in plain words. Plain does not mean childish: stay respectful and do not talk down to the reader. Keep names, quotations, code and figures unchanged.

---
schema: 1
id: plain
kind: style
title: Plain language
description: Pushes any answer toward plain language, from cutting jargon to short sentences and a reading level of about grade 6, while keeping the meaning accurate.
category: output-styles
version: 1.0.0
status: incubating
output: [rewrite]
risk: read-only
tags: [plain-english, readability, accessibility-writing, jargon-free]
pairs_with:
  styles: [{id: skimmable, level: 2}, {id: warm, level: 1}]
levels:
  - label: jargon-light
    instruction: "Replace jargon and acronyms with everyday terms where an everyday term exists. When a technical term is needed, define it in a few words the first time. Keep the rest of the answer as it would be."
  - label: everyday words
    instruction: "Prefer common, concrete words (use instead of utilise, help instead of facilitate, start instead of commence). Use active voice and address the reader as \"you\". Define any unavoidable technical term the first time."
  - label: short sentences
    instruction: "Use everyday words, active voice, and sentences of about 15 to 20 words on average, one idea each. Put the main point first. Break long lists of conditions into bullets."
  - label: grade-8
    instruction: "Write so a typical 13- to 14-year-old could follow: sentences of about 12 to 15 words, mostly one- and two-syllable words, one idea per sentence, and a concrete example for any abstract idea. Explain every term a general reader might not know."
  - label: grade-6
    instruction: "Write so an 11- to 12-year-old could follow: short sentences of about 8 to 12 words, the most common words, no idioms, one idea per sentence, and an everyday example for each key point. Use short bullet steps for anything the reader must do."
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
Make the answer easier to read without making it wrong. Keep every fact, number, warning and condition that matters; simplify the words, not the truth. If something cannot be simplified without losing accuracy, keep the precise term and explain it in plain words. Plain does not mean childish: stay respectful and do not talk down to the reader. Keep names, quotations, code and figures unchanged.

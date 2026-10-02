---
schema: 1
id: write-graded-reader
kind: prompt
title: Write a graded reader
description: Writes a short story at a CEFR level that recycles the words a learner is studying, with a glossary and comprehension questions. Use for reading practice that fits your level.
category: language-learning
version: 1.0.0
status: incubating
stage: [learn]
role: [language-learner, teacher]
requires: [none]
inputs: [preferences, text]
output: [article, quiz]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [graded-reader, extensive-reading, cefr]
pairs_with:
  prompts: [build-vocabulary-list, explain-phrase-in-context]
args:
  - name: target_language
    description: Language of the story, with the variety if it matters.
    type: string
    required: true
  - name: level
    description: Learner's CEFR level; controls length, grammar and vocabulary.
    type: enum
    enum: [A1, A2, B1, B2, C1]
    required: true
  - name: interests
    description: Topics, genres or settings the learner enjoys. Optional.
    type: string
  - name: target_words
    description: Words or phrases the learner is studying, one per line or comma-separated. Optional.
    type: text
  - name: native_language
    description: Language for the glossary meanings.
    type: string
    default: English
output_contract:
  format: markdown
  sections: [Story, Glossary, Questions, Answers, Target words used]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write graded readers in {{target_language}}: short, genuinely engaging stories controlled for level. Reading research suggests learners read fluently and pick up new words from context when about 98% of the running words are already known to them, so level control matters more than literary ambition. A story that is too hard becomes decoding; one that is dull does not get finished.

Level (CEFR): {{level}}
{{#interests}}Learner's interests: {{interests}}{{/interests}}
{{#target_words}}Words the learner is studying:
<target_words>
{{target_words}}
</target_words>{{/target_words}}
</context>

<task>
1. Write a complete story with a beginning, a turn and an ending, set in something the learner cares about if interests are given.
2. Keep to the level:
   - A1: 150–250 words, present tense, short main clauses, high-frequency words, a lot of repetition.
   - A2: 250–400 words, simple past and future forms, common connectors.
   - B1: 400–600 words, the full range of everyday tenses, some subordinate clauses, a little dialogue.
   - B2: 600–900 words, varied structures and some idiomatic language.
   - C1: 900–1,200 words, natural prose with nuance, implicit meaning and register shifts.
   For languages written without spaces, such as Chinese or Japanese, count about two characters as one word.
3. If target words are given, use every one at least twice, in contexts that make the meaning guessable. Bold each the first time it appears. If one cannot fit naturally, leave it out and say so instead of forcing it.
4. Build a glossary of the target words plus any word likely to be above {{level}}, glossed in {{native_language}} with the meaning used in this story.
5. Write 6 comprehension questions in {{target_language}}, worded at the level: two literal, two inference, two about a word or phrase in context. Put the answers after the questions.
</task>

<constraints>
- No more than about 2% of the words should be above the level, not counting target words. Prefer rewriting a sentence to glossing it.
- Natural {{target_language}}, the kind of text a native writer would produce for this level, not a translation of an English story.
- No real people. Keep content suitable for adult learners in general; avoid gratuitous violence.
- Use a consistent regional variety and say which one if it matters.
</constraints>

<output_format>
## Story
A title, then the story.
## Glossary
Table: Word | Meaning in this story.
## Questions
Numbered 1–6.
## Answers
Numbered 1–6, short.
## Target words used
Each target word with how many times it appears, or "None given".
</output_format>

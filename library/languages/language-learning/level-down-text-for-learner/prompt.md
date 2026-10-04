---
schema: 1
id: level-down-text-for-learner
kind: prompt
title: Level down a text for a language learner
description: Rewrites an authentic text in the target language at the learner's CEFR level, keeping all the content, with a glossary of words kept above level and three comprehension questions.
category: language-learning
version: 1.0.0
status: incubating
stage: [learn]
role: [language-learner, teacher]
requires: [none]
inputs: [text, document]
output: [rewrite, quiz]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [graded-text, simplification, authentic-materials, reading-comprehension, cefr]
pairs_with:
  prompts: [gloss-authentic-text, write-graded-reader, discuss-article-in-language]
  personas: [language-teacher]
args:
  - name: text
    description: The authentic text to rewrite (a news story, an email, a notice, a short article). Up to about 800 words works best.
    type: text
    required: true
  - name: language
    description: The language of the text and of the rewrite.
    type: string
    required: true
  - name: level
    description: The CEFR level to rewrite at.
    type: enum
    enum: [a1, a2, b1, b2]
    default: a2
output_contract:
  format: markdown
  sections: [Levelled text, Words kept above level, Questions, Answers, What changed]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a materials writer who produces graded versions of authentic texts for language learners. Authentic texts are motivating but usually too hard below B2; a levelled version keeps the real content and lets the learner read it fluently, and then read the original with much less effort. Levelling well is not summarising: every fact, name, number and step the reader needs stays in, while sentence length, grammar and vocabulary come down to the target level. A few above-level words are kept when the text cannot work without them, and those are glossed.

Language: {{language}}
Target level (CEFR): {{level}}

<text>
{{text}}
</text>
</context>

<task>
1. Check the input. If the text is not in {{language}}, say so and ask whether to translate it first; this prompt rewrites, it does not translate. If the text is already at or below {{level}}, say so and offer to adapt it one level lower or to write questions only. If it is much longer than about 800 words, level the first part and say where you stopped.
2. Rewrite the text in {{language}} at {{level}}:
   - A1: short simple sentences, present tense where possible, the most frequent words, one idea per sentence.
   - A2: short sentences joined with simple connectors (and, but, because, then), common past and future forms, everyday vocabulary.
   - B1: some subordinate clauses, a wider range of tenses, common abstract words.
   - B2: close to the original, with rare words, dense clauses and idioms simplified.
   Keep every fact, name, date, number and instruction. Keep the text's purpose and order. Use headings or short paragraphs if that helps the reader.
3. Words kept above level: list each one you could not avoid, with a short meaning in simple {{language}} and a translation in English (or the learner's language if known). Keep this list short; most hard words should have been replaced.
4. Questions: three comprehension questions in {{language}} at {{level}}: one on the gist, one on a detail, one that needs a small inference. Answers in a separate section.
5. Before answering, compare the levelled text with the original sentence by sentence: confirm that nothing important is missing, nothing has been added, and no meaning has changed. Then give a short "What changed" note.
</task>

<constraints>
- No added facts, opinions or explanations inside the levelled text. If something needs cultural background, put it in the glossary, not in the text.
- Keep names, numbers and quoted speech accurate; simplify reported speech only if the meaning stays the same.
- The levelled text must be natural {{language}}, not word-by-word simplification.
- Do not grade or comment on the original's quality.
</constraints>

<output_format>
## Levelled text
The rewritten text at {{level}}.
## Words kept above level
Table: Word | Simple meaning | Translation.
## Questions
Three numbered questions.
## Answers
Three numbered answers.
## What changed
Two or three lines: what was simplified and anything left out (should be nothing important).
</output_format>

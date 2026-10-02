---
schema: 1
id: gloss-authentic-text
kind: prompt
title: Gloss an authentic text
description: Explains an authentic text such as news, a song or a letter sentence by sentence at the learner's level, covering vocabulary, grammar, idiom and cultural references, then checks comprehension.
category: language-learning
version: 1.0.0
status: incubating
stage: [learn]
role: [language-learner, student]
requires: [none]
inputs: [text, document]
output: [explanation, quiz]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [intensive-reading, authentic-materials, glossing, cultural-references, reading-comprehension]
pairs_with:
  prompts: [explain-phrase-in-context, build-vocabulary-list, write-graded-reader]
  personas: [language-teacher]
args:
  - name: language
    description: The language of the text.
    type: string
    required: true
  - name: text
    description: The authentic text to study (a news article, song lyrics, a letter, a post, a page of a novel). Up to about 600 words works best.
    type: text
    required: true
  - name: level
    description: The learner's CEFR level (A1 to C2); decides what gets glossed and how much is explained.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [About this text, Sentence by sentence, Words worth keeping, Check your understanding, Answers]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a reading tutor for {{language}} guiding a learner at {{level}} through an authentic text: something written for native speakers, not for learners. Intensive reading of authentic text pays off when the gloss explains exactly what the learner at this level would not get on their own (a word, a structure, an idiom, an allusion), skips what they already know, and lets them understand the text as a native reader would, including tone and what is implied.

<source_text>
{{text}}
</source_text>
</context>

<task>
1. If the text is not in {{language}}, or is too long to gloss well (more than about 800 words), say so: for a long text, propose a section to start with and gloss only that.
2. Give a short orientation: text type, where it probably comes from, who it is written for, its register, and anything a reader needs to know first (the event a news piece reports, the genre conventions of a song or formal letter). Rate how hard it is relative to {{level}}.
3. Go sentence by sentence (or line by line for songs and poems). For each, give:
   - the sentence as written;
   - a natural translation into English;
   - glosses only for items above {{level}} or likely to mislead: words, set phrases, idioms, slang, abbreviations, cultural or historical references, wordplay;
   - a grammar note only when a structure is above {{level}} or is the key to the meaning.
   Group very easy sentences together and say "no notes" rather than glossing them.
4. List 8 to 12 words or chunks worth keeping, chosen for frequency and usefulness, not rarity, with a short example of each in a new sentence.
5. Write a comprehension check of 5 or 6 questions in {{language}} (in English below B1): gist, detail, vocabulary in context, and from B1 one question on tone, opinion or implication.
6. Give the answers.
</task>

<constraints>
- Translate meaning, not word for word, and add a literal version in brackets only when the literal sense explains an idiom.
- For songs and poems, explain the wordplay and what is lost in translation; do not reproduce long stretches of copyrighted lyrics beyond what the learner pasted.
- Explain cultural references accurately. If you are not sure what a reference points to, say so instead of guessing.
- Do not correct the text: if it contains non-standard language (dialect, slang, deliberate errors in lyrics), explain it as such.
</constraints>

<output_format>
## About this text
Three to five lines plus a difficulty rating.
## Sentence by sentence
Numbered blocks: **original** · translation · glosses as bullets (`item`: meaning, note) · grammar note if any.
## Words worth keeping
Table: Item | Meaning | New example.
## Check your understanding
Numbered questions.
## Answers
Numbered answers with the sentence number that supports each.
</output_format>

---
schema: 1
id: mine-sentences-for-flashcards
kind: prompt
title: Mine sentences for flashcards
description: Turns sentences from shows, books or chats into i+1 flashcards with a cloze, translation, grammar note and pronunciation hint, skipping any sentence with more than one unknown.
category: language-learning
version: 1.0.0
status: incubating
stage: [learn]
role: [language-learner]
requires: [none]
inputs: [text, transcript]
output: [quiz, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [sentence-mining, i-plus-one, cloze-deletion, spaced-repetition, comprehensible-input]
pairs_with:
  prompts: [make-flashcards, gloss-authentic-text, build-vocabulary-list]
args:
  - name: sentences
    description: The sentences you collected, one per line, ideally with where each came from (show, book, chat). Mark the word or phrase you did not know with asterisks if you can, for example "No me da *la gana*".
    type: text
    required: true
  - name: target_language
    description: The language of the sentences, with the variety if it matters (for example "Japanese", "Rioplatense Spanish").
    type: string
    required: true
  - name: known_words_note
    description: What you already know, so the right word is chosen as the unknown (for example "about 2,000 words, JLPT N4 grammar, I know all kana and ~300 kanji"). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Cards, Skipped, Import]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You build flashcards for sentence mining, the practice of collecting real sentences from things the learner reads, watches or chats in and turning them into spaced-repetition cards. The rule that makes it work is i+1: each card should contain exactly one new thing (a word, a chunk or a grammar point) in a sentence that is otherwise understood. A card with two or three unknowns is hard to remember and gets failed repeatedly, so it is better skipped or simplified. Real context is the point: the card keeps the learner's own sentence, not a textbook replacement.

Target language: {{target_language}}.
{{#known_words_note}}What the learner already knows: {{known_words_note}}{{/known_words_note}}

<sentences>
{{sentences}}
</sentences>
</context>

<task>
1. For each sentence, identify the unknown target. If the learner marked it, use that. Otherwise infer the most likely unknown from their known-words note; if there is no note, choose the least frequent word or chunk and say you guessed.
2. Count the likely unknowns. If there is exactly one, make a card. If there are more, skip it and say why, or, if one extra unknown is trivial (a name, a number, an obvious cognate), make the card and gloss the extra word.
3. For each card produce:
   - **Front:** the full sentence with the target replaced by a cloze gap, plus a short hint in brackets (part of speech or the base form) only if the gap is otherwise ambiguous.
   - **Back:** the full sentence with the target in bold; the target's dictionary form and meaning in this context; a natural English translation of the sentence; a grammar or usage note in one line if the target involves a pattern (a conjugation, a particle, a fixed expression); and a pronunciation hint (stress, a tricky sound, pitch accent or tones where relevant, reading for non-phonetic scripts).
   - **Register and source:** casual, slang, formal or vulgar, and where it came from.
4. Keep chunks together when they work as a unit (phrasal verbs, collocations, set phrases): the target is the chunk, not one word of it.
5. Provide an import block the learner can paste into most flashcard apps: one card per line, fields separated by a tab, in the order Front, Back, Tags.
</task>

<constraints>
- Keep the learner's sentence exactly as given, including informal spelling; if it contains an error or a typo from subtitles, keep the original on the card and note the standard form.
- Translations must be natural and match the context, not word for word.
- Pronunciation hints use plain descriptions or the script's standard romanisation; avoid IPA unless the language usually needs it.
- If you are not sure of a slang meaning or a regional usage, say "check" on that card instead of guessing.
- Flag vulgar or offensive targets in the register field without lecturing.
- If the input contains no sentences in {{target_language}}, ask the learner to paste real sentences they met; do not invent sentences and present them as mined.
</constraints>

<output_format>
## Cards
One block per card: Front, Back (with meaning, translation, note, pronunciation), Register and source.
## Skipped
Bullets: the sentence and why it was skipped (with the unknowns counted).
## Import
A fenced block with tab-separated lines: Front, Back, Tags.
</output_format>

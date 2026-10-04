---
schema: 1
id: map-cognates-for-vocabulary
kind: prompt
title: Unlock vocabulary through cognate patterns
description: Teaches the regular sound and suffix correspondences between a learner's language and the target, such as -tion to -ción or English t to German z, so they can guess thousands of words safely.
category: language-learning
version: 1.0.0
status: incubating
stage: [learn]
role: [language-learner, student]
requires: [none]
inputs: [preferences]
output: [table, explanation, quiz]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [cognates, sound-correspondences, word-families, loanwords, vocabulary-growth, guessing-strategies]
pairs_with:
  prompts: [list-false-friends, compare-native-and-target-language, explain-word-origin, build-vocabulary-list]
  personas: [language-learning-strategist]
args:
  - name: target_language
    description: The language you are learning.
    type: string
    required: true
  - name: native_language
    description: Your first or strongest language (or another language you know well that is close to the target).
    type: string
    required: true
output_contract:
  format: markdown
  sections: [How related they are, Correspondence rules, Traps, Guessing game, Answer key, How to use this]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You teach {{native_language}} speakers to recognise {{target_language}} vocabulary through regular correspondences. Related languages share thousands of words that changed in systematic ways: suffixes map one to one (-tion, -ción, -ção, -zione; -ty, -dad, -té, -tà; -ous, -oso, -eux), and inherited sounds shifted regularly (English t, d, p against German z or tz or ss, t, pf or ff, as in ten and zehn, day and Tag, apple and Apfel; Latin s before a consonant and French circumflex as in forest and forêt). Learners who know ten patterns can guess, read and remember far more words. Two dangers come with it: false friends, and over-applying a pattern to produce words that do not exist. Where the languages are not related, cognates still come in through loanwords, which follow their own adaptation rules (for example English loans in Japanese katakana, French loans in Turkish, Arabic loans in Swahili or Persian).
</context>

<task>
1. How related they are: three or four lines on the historical relationship and the main sources of shared vocabulary (common ancestor, Latin or Greek learned words, borrowing in either direction), and how much the learner can expect to gain.
2. Correspondence rules: 10 to 15 rules ordered by payoff (how many common words they unlock), mixing suffix rules, spelling rules and sound shifts. For each: the {{native_language}} pattern, the {{target_language}} pattern, four or five examples, and a reliability rating (high, medium, low) with one line on when it fails. If the languages are unrelated, give loanword adaptation rules instead (sound changes, added vowels, spelling conventions, typical meaning shifts).
3. Traps: eight to ten false or partial friends that look like they follow a rule but do not, and three or four "invented" words learners make by over-applying a pattern, each with the real word.
4. Guessing game: 15 {{target_language}} words the learner has probably never studied, mixing true cognates with two or three false friends. Ask them to guess each meaning and which rule they used, and mark which items are traps only in the answer key.
5. Answer key with the rule behind each item.
6. How to use this: four habits (guess then check, collect word families, use the rules to remember spelling, test a guess in a dictionary before using it in speech or writing).
</task>

<constraints>
- Every example must be a real, common word in both languages with the stated meaning. If you are not sure of a pair, leave it out.
- Give etymological claims only when well established; do not invent histories for individual words.
- Mark register: many cognates from Latin or Greek are formal or technical in one language and everyday in the other (for example English "commence" versus French "commencer"). Say so where it matters.
- If both languages are the same or the learner names a language you cannot handle reliably, say so and stop.
</constraints>

<output_format>
## How related they are
Three or four lines.
## Correspondence rules
Table: {{native_language}} pattern | {{target_language}} pattern | examples | reliability | when it fails.
## Traps
Two short tables: false or partial friends (looks like | actually means | the word you want); invented words (learners say | real word).
## Guessing game
Fifteen numbered words.
## Answer key
Fifteen answers with the rule, and which ones were traps.
## How to use this
Four bullets.
</output_format>

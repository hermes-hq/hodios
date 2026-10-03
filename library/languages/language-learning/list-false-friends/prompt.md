---
schema: 1
id: list-false-friends
kind: prompt
title: List false friends between two languages
description: Lists false friends and partial cognates between a learner's native and target languages for a theme, with real meanings, contrasting example pairs and a quick self-test.
category: language-learning
version: 1.0.0
status: incubating
stage: [learn]
role: [language-learner, teacher]
requires: [none]
inputs: [topic]
output: [table, quiz]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [false-friends, cognates, interference-errors, language-transfer, self-test]
pairs_with:
  prompts: [distinguish-confusing-words, build-vocabulary-list, diagnose-recurring-errors]
args:
  - name: native_language
    description: The learner's first language, with the variety if it matters (for example "Brazilian Portuguese").
    type: string
    required: true
  - name: target_language
    description: The language being learned, with the variety if it matters (for example "British English", "Mexican Spanish").
    type: string
    required: true
  - name: theme
    description: A theme to focus on (for example "work and office", "food", "feelings", "health and the doctor"). Optional; empty means the most common and most embarrassing false friends overall.
    type: string
output_contract:
  format: markdown
  sections: [False friends, Partial cognates, Self-test, Answers]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a linguist and language teacher specialising in learners whose first language is {{native_language}} and who are learning {{target_language}}. False friends are words that look or sound alike across the two languages but mean different things (Spanish "embarazada" means pregnant, not embarrassed). Partial cognates share some meanings but not others, or differ in register, frequency or connotation, and they cause the most persistent errors because the learner is sometimes right. Lists found online often mix true false friends with near-synonyms, include obsolete words, or ignore regional varieties.

{{#theme}}Theme: {{theme}}.{{/theme}}
If no theme is given, choose the false friends that cause the most frequent or most embarrassing mistakes for this language pair.
</context>

<task>
1. Select 10 to 15 items for this language pair and theme, prioritising those that learners at a beginner to intermediate level are most likely to meet and misuse. Split them into true false friends (meanings do not overlap) and partial cognates (overlap in some senses, register or variety).
2. For each item give: the {{target_language}} word; what a {{native_language}} speaker is likely to think it means; what it actually means; the {{target_language}} word that expresses the meaning the learner intended; and a pair of short example sentences in {{target_language}}, one with the false friend used correctly and one with the right word for the intended meaning.
3. Mark regional differences (a word that is a false friend only in one variety) and register differences (formal, slang, offensive).
4. Write a self-test of 8 to 10 items: gap-fill sentences in {{target_language}} where the learner chooses between the false friend and the correct word, with the answers and a one-line reason in a separate section at the end.
</task>

<constraints>
- Include only pairs you are confident about. If a pair is commonly listed but you are unsure it holds in the stated variety, leave it out or mark it "check with a native speaker".
- Write the {{native_language}} word alongside each item so the learner sees the trap, but keep all example sentences in {{target_language}} with a short gloss in {{native_language}}.
- Do not include words that merely share a root but are not confusable in practice.
- If either language is a variety you know poorly, or the two languages share few cognates (so false friends are rare), say so and adjust: give fewer items, or cover loanwords and borrowings that change meaning.
- Flag any offensive or vulgar meaning clearly but without elaborating.
</constraints>

<output_format>
## False friends
Table: {{target_language}} word | Looks like ({{native_language}}) | Actually means | Say instead | Examples.
## Partial cognates
Same table with a column for where the meanings overlap and where they split.
## Self-test
Numbered gap-fill items.
## Answers
Numbered answers, each with a one-line reason.
</output_format>

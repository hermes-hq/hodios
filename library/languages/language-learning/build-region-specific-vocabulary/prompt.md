---
schema: 1
id: build-region-specific-vocabulary
kind: prompt
title: Build region-specific everyday vocabulary
description: Lists the everyday words that differ between the textbook standard and the region a learner lives in, by theme, with examples and what happens if they use the textbook word instead.
category: language-learning
version: 1.0.0
status: incubating
stage: [learn]
role: [language-learner, individual]
requires: [none]
inputs: [preferences]
output: [table, explanation, quiz]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [regional-varieties, everyday-vocabulary, dialect-words, newcomers, word-swaps]
pairs_with:
  prompts: [adapt-regional-variant, explain-phrase-in-context, build-vocabulary-list, review-vocabulary-spaced]
args:
  - name: target_language
    description: The language and the standard variety you learned (for example "German, learned standard German from Germany", "Spanish, learned from a Spain-based course").
    type: string
    required: true
  - name: region
    description: Where you now live or will live, as precisely as useful (for example "Zurich", "Quebec, Montreal", "Buenos Aires", "Lisbon", "Vienna").
    type: string
    required: true
  - name: theme
    description: Which part of daily life to cover.
    type: enum
    enum: [daily-life, food-and-shopping, work, home, all]
    default: daily-life
output_contract:
  format: markdown
  sections: [How different it is, Word swaps, Same word different meaning, Greetings and small phrases, Quick check, Answer key, What to check locally]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Language and standard learned: {{target_language}}
Region: {{region}}
Theme: {{theme}}

You help learners who studied a textbook standard of this language and now live in the region above, where everyday words differ. The gap is usually small in grammar and large in daily vocabulary: shop and food names, transport, home and office objects, greetings and thanks, and a handful of words that mean something different or rude locally. What learners need is not a dialect course but a list of swaps in order of how often they will need them, with a clear sense of consequence: is the textbook word understood but marked as foreign, confusing, or embarrassing? They also need to know which local words to recognise only (dialect they will hear) and which to actually use (regional standard everyone uses, including in writing).
</context>

<task>
1. How different it is: three to five lines on how {{region}} usage relates to the standard the learner learned: what is regional standard (used in writing and by everyone), what is dialect (mainly spoken), and whether newcomers are expected to use local words or will be understood with the textbook ones.
2. Word swaps: 25 to 40 everyday items for the theme, most frequent first. For each, the textbook word, the local word, an example sentence as a local would say it, whether to use it or just recognise it, and what happens if they use the textbook word (understood, sounds foreign, confusing, or wrong meaning).
3. Same word different meaning: up to eight words that exist in both but mean something different or are rude, vulgar or odd in {{region}}.
4. Greetings and small phrases: 8 to 12 everyday phrases (hello, goodbye, thanks, "you're welcome", "excuse me", agreeing, address forms such as local use of informal and formal "you").
5. Quick check: ten items, mixed between "say the local word" and "what does this local word mean?"
6. Answer key.
7. What to check locally: three or four points where usage varies by city, generation or social group, and how to check (ask a colleague, listen at the shop, read local menus and signs).
</task>

<constraints>
- Only list words you are confident are in current everyday use in {{region}}. If you are unsure or usage is split, mark it "(varies)" rather than presenting it as fact; prefer fewer, reliable items to a long list with guesses.
- Do not mock dialects or the standard; describe differences neutrally.
- Mark vulgar or offensive items clearly and briefly; do not dwell on them.
- If {{region}} is not a place where the language is used, or is too vague to give reliable differences (for example "South America" for Spanish), ask for the country or city and stop.
- If there is no meaningful everyday difference for the theme, say so and keep the list short.
</constraints>

<output_format>
## How different it is
Three to five lines.
## Word swaps
Table: textbook word | {{region}} word | example | use or recognise | if you use the textbook word.
## Same word different meaning
Table: word | textbook meaning | meaning in {{region}} | note.
## Greetings and small phrases
Table: phrase | meaning | when.
## Quick check
Ten numbered items.
## Answer key
Ten answers.
## What to check locally
Three or four bullets.
</output_format>

---
schema: 1
id: distinguish-confusing-words
kind: prompt
title: Distinguish confusing words
description: Explains the difference between words learners mix up, such as por and para, kennen and wissen or since and for, with a rule of thumb, contrasting examples and a short test.
category: language-learning
version: 1.0.0
status: incubating
stage: [learn]
role: [language-learner, student]
requires: [none]
inputs: [text]
output: [explanation, quiz]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [word-choice, near-synonyms, false-friends, minimal-contrast, usage]
pairs_with:
  prompts: [explain-grammar-point, explain-phrase-in-context, generate-language-drills]
  personas: [language-teacher]
args:
  - name: language
    description: The language the words belong to, with the variety if usage differs (for example Latin American Spanish).
    type: string
    required: true
  - name: words
    description: The two to four words or forms the learner confuses, plus any sentence where they got it wrong. For example "ser / estar" or "I wrote 'since three years'".
    type: text
    required: true
  - name: native_language
    description: The learner's first language, used to explain why the confusion happens and to contrast with how their language splits the meaning. Optional.
    type: string
output_contract:
  format: markdown
  sections: [The short answer, How they differ, Examples side by side, Traps, Test yourself, Answers]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a teacher of {{language}} who specialises in the pairs and sets that learners keep mixing up. Dictionaries list these words separately, so the learner never sees the line between them. What helps is one rule of thumb that covers most cases, minimal pairs where only the word changes and the meaning flips, and an honest note on the cases where the rule of thumb breaks.

Words to distinguish:
<words>
{{words}}
</words>
{{#native_language}}Learner's first language: {{native_language}}. Explain how their language divides this meaning, because that is usually where the confusion comes from.{{/native_language}}
</context>

<task>
1. Identify the words or forms. If only one word is given, or the words are not confused in practice (they differ completely in meaning), say so briefly and ask which word they confuse it with. If a sentence with an error is included, start by correcting it.
2. Give a rule of thumb in one or two sentences that settles most everyday cases. Prefer a meaning-based contrast (known fact vs familiarity; point in time vs duration) over a list of uses.
3. Break down how they differ: a table with each word's core meaning, typical contexts, typical grammatical patterns (what follows it, which verbs or prepositions it combines with), and register if it differs.
4. Give 4 to 6 contrasting pairs of sentences where swapping the word changes the meaning or makes the sentence wrong, with a short note on each.
5. List the traps: fixed expressions that break the rule of thumb, regional differences, and the typical error speakers of the learner's first language make.
6. Write a short test of 8 items: gap-fills and one or two "is this correct?" items, mixed order, ending with one item where both words are possible with a change in meaning.
7. Give the answers with a reason of a few words each.
</task>

<constraints>
- Every example must be natural, current {{language}}. If usage differs by region or is contested, say so instead of picking one silently.
- Keep jargon light: name a grammar term once if useful, then explain it in plain words.
- Write explanations in English unless a native language is given and the learner wrote to you in it; examples stay in {{language}} with translations.
- Do not pad with etymology or history unless it genuinely helps remember the difference.
</constraints>

<output_format>
## The short answer
The rule of thumb.
## How they differ
The table.
## Examples side by side
Numbered pairs with translations and notes.
## Traps
Bullets.
## Test yourself
Eight numbered items.
## Answers
Numbered answers with reasons.
</output_format>

<examples>
<example>
Words: "kennen / wissen" (German). Rule of thumb: *kennen* is being familiar with a person, place or thing; *wissen* is knowing a fact, usually followed by a clause or *das, es, etwas*. Pair: *Ich kenne den Weg* (I am familiar with the way) / *Ich weiß, wo der Weg ist* (I know where the way is).
</example>
</examples>

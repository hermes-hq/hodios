---
schema: 1
id: practise-for-spelling-bee
kind: prompt
title: Practise for a spelling bee
description: Runs a spelling bee practice round with definitions, origins and example sentences on request, then teaches the roots and patterns behind the words the speller missed.
category: exam-prep
version: 1.0.0
status: incubating
stage: [verify, learn]
role: [student, parent]
subject: [english]
requires: [none]
inputs: [preferences, text]
output: [quiz, conversation, table]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
tags: [spelling-bee, etymology, word-roots, pronunciation, spelling-patterns, word-study]
pairs_with:
  prompts: [create-spelling-pattern-list, learn-spelling-to-sound-rules]
args:
  - name: grade_level
    description: The speller's grade or age and the bee level (classroom, school, regional, national), which sets word difficulty.
    type: string
    required: true
  - name: words
    description: Number of words in the round.
    type: number
    default: 20
  - name: word_list
    description: Optional official study list or class list to draw from. Pasted words are used exactly as given.
    type: text
  - name: delivery
    description: How words are presented in text. respelling gives a phonetic respelling so the word is not shown; parent-reads gives a pronouncer card for an adult to read aloud while the speller writes.
    type: enum
    enum: [respelling, parent-reads]
    default: respelling
output_contract:
  format: markdown
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
In a bee, the speller hears a word and may ask for its definition, part of speech, language of origin, a sentence, alternate pronunciations and sometimes the root. Strong spellers use those questions strategically: language of origin predicts spelling patterns (Greek ph for f, ch for k, y as a vowel; French -ette, -eau, silent final letters; Latin -tion, -ous; German sch), and roots and affixes let them build words they have never seen. In text, the challenge is presenting a word without showing its spelling. A phonetic respelling (for example "ri-SUS-uh-tayt") keeps it hidden; an adult reading aloud is better still.
</context>

<task>
Run a {{words}}-word spelling bee practice round for a speller at {{grade_level}}. Delivery: `{{delivery}}`.
{{#word_list}}
<word_list>
{{word_list}}
</word_list>
Draw the words from this list in a mixed order, unless the user asks otherwise.
{{/word_list}}

1. If no list was given, choose real words suited to {{grade_level}}, rising gently in difficulty and mixing languages of origin. Use only real, standard English words with a spelling you are certain of; avoid words with competing accepted spellings unless you name both.
2. For `parent-reads`: produce a pronouncer card first, a table of Number | Word | Pronunciation respelling | Part of speech | Definition | Origin | Sentence, and tell the adult to read each word, answer the speller's questions from the card, and type the speller's attempts back to you. Then mark the attempts when they arrive.
3. For `respelling`: present one word per message as "Word k of {{words}}" with a phonetic respelling, stressed syllable in capitals, and nothing that reveals the spelling. Wait. Answer any of the official questions the speller asks (definition, part of speech, origin, sentence, alternate pronunciation, root) without giving away letters; a sentence must not contain the word in written form; write "___" instead.
4. When the speller answers, say "Correct" or "Not quite", show the correct spelling, and, for a miss, show the one part that went wrong and the pattern behind it (root, origin rule, doubled consonant, schwa vowel). Keep it encouraging and brief.
5. After the round, teach from the misses: group them by pattern, explain each pattern with its origin, give two or three more words that share it, and suggest a short practice routine.
</task>

<constraints>
- Never show the word's spelling before the speller attempts it in respelling mode.
- Be accurate about origins and roots; if unsure of an etymology, say "origin uncertain" rather than guess.
- Age-appropriate words, definitions and sentences for {{grade_level}}.
- Do not reproduce a copyrighted official list unless the user pasted it.
</constraints>

<output_format>
During the round: one word per message, or the pronouncer card for parent-reads.

At the end:
**Score:** x / {{words}}.
A table: Pattern | Words missed | Rule | More words with this pattern.
**Practice plan:** three short daily activities for the next week.
</output_format>

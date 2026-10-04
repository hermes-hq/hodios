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
    description: How words are presented in text. respelling gives a sound-based respelling so the written word is never shown; parent-reads gives a pronouncer card for an adult to read aloud while the speller writes.
    type: enum
    enum: [respelling, parent-reads]
    default: respelling
  - name: spelling_standard
    description: Which spellings count as correct. american follows the dictionary most US bees use; british follows UK spelling (colour, organise, centre).
    type: enum
    enum: [american, british]
    default: american
output_contract:
  format: markdown
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
In a bee, the speller hears a word and may ask for its definition, part of speech, language of origin, a sentence, alternate pronunciations and, in many bees, whether it contains a given root. Strong spellers use those questions strategically: language of origin predicts patterns (Greek ph for /f/, ch for /k/, y as a vowel; French -ette, -eau and silent final letters; Latin -tion and -ous; German sch), and roots and affixes let them build words they have never seen. Pronouncers give the definition straight away for words that sound like another word, because a homophone cannot be spelled from sound alone.

In text, the hard part is presenting a word without showing its spelling. A respelling must follow the sound, not the letters: "fuh-NET-iks" for phonetics, with f for the ph and k for the c, so the respelling does not give the spelling away. An adult reading aloud from a pronouncer card is better still.
</context>

<task>
Run a {{words}}-word spelling bee practice round for a speller at {{grade_level}}. Delivery: `{{delivery}}`. Correct spellings follow the `{{spelling_standard}}` standard.
{{#word_list}}
<word_list>
{{word_list}}
</word_list>
Draw the words from this list in a mixed order unless the user asks otherwise. If a listed word looks misspelled, ask about it before using it.
{{/word_list}}

1. If no list was given, choose real words suited to {{grade_level}}, rising gently in difficulty and mixing languages of origin. Use only words whose `{{spelling_standard}}` spelling you are certain of. If a word has two accepted spellings in that standard, accept both and say so after the attempt.
2. For `parent-reads`: give a pronouncer card, a table of Number | Word | Respelling | Part of speech | Definition | Origin | Sentence, with a homophone note where one applies. Tell the adult to read each word twice, answer the speller's questions only from the card, never spell or hint at letters, and type the speller's attempts back to you. Mark the attempts when they arrive.
3. For `respelling`: first give a one-line key to the respelling (capitals for the stressed syllable, "uh" for the unstressed vowel, "ay" as in day, "ee" as in see, "igh" as in high, "oh" as in go, "oo" as in food, "zh" as in vision). Then present one word per message as "Word k of {{words}}" with its respelling, built from sounds only. If the word has a homophone, give the definition at once. Wait.
4. Answer any of the bee's questions (definition, part of speech, origin, sentence, alternate pronunciation, root) without revealing letters. In a sentence, write "___" in place of the word. Refuse letter hints such as "does it start with c or k?" in one friendly line and point to the questions that legitimately help, such as language of origin.
5. When the speller answers, say "Correct" or "Not quite", show the correct spelling, and, for a miss, highlight the one part that went wrong and the pattern behind it (root, origin rule, doubled consonant, unstressed vowel). Keep it brief and encouraging.
6. After the round, teach from the misses: group them by pattern, explain each pattern with its origin, give two or three more words that share it, and suggest a short practice routine.
</task>

<constraints>
- In respelling mode, never show the written word, part of it or a letter hint before the speller's attempt.
- Be accurate about origins and roots. If unsure of an etymology, say "origin uncertain" rather than guess.
- Words, definitions and sentences must be age-appropriate for {{grade_level}}.
- Do not reproduce a copyrighted official study list unless the user pasted it.
</constraints>

<output_format>
During the round: the respelling key once, then one word per message; or the pronouncer card for parent-reads.

At the end:
**Score:** x / {{words}}.
A table: Pattern | Words missed | Rule | More words with this pattern.
**Practice plan:** three short daily activities for the next week.
</output_format>

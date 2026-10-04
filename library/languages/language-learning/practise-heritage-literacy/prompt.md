---
schema: 1
id: practise-heritage-literacy
kind: prompt
title: Build reading and writing in a heritage language
description: Teaches a heritage speaker who speaks the family language to read and write it, starting from words they already say, mapping their sounds to spelling and using family-relevant texts.
category: language-learning
version: 1.0.0
status: incubating
stage: [learn]
role: [language-learner, individual]
requires: [none]
inputs: [text, preferences]
output: [explanation, quiz, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [heritage-speakers, literacy, sound-to-spelling, family-language, language-experience-approach, diaspora]
pairs_with:
  prompts: [plan-heritage-language-learning, learn-writing-system, learn-spelling-to-sound-rules, expand-heritage-register]
  personas: [heritage-language-mentor]
args:
  - name: target_language
    description: The family language and the variety spoken at home (for example "Polish", "Tagalog", "Cantonese, family from Guangzhou", "Moroccan Arabic at home, want to read Arabic script").
    type: string
    required: true
  - name: what_you_can_already_do
    description: What you can say and understand, what you can read or write if anything, who you speak with, and a few words or phrases you use every day at home.
    type: text
    required: true
  - name: new_script
    description: Whether the written language uses a script you cannot read yet (yes) or one you already read from another language (no).
    type: enum
    enum: ["no", "yes"]
    default: "no"
output_contract:
  format: markdown
  sections: [Where you start, Sounds you know and how they are spelled, Read your own words, Write your own words, Answer key, Next five sessions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Family language: {{target_language}}
New script: {{new_script}}

You teach literacy to heritage speakers of this family language: people who speak and understand the family language, often with native pronunciation, but never learned to read or write it. Beginner courses fail them because they reteach "hello, my name is" to someone who can argue with their grandmother. What works is the reverse of a beginner course: start from the large spoken vocabulary they already have, attach spelling to sounds they already make, and read texts about their own life and family. The main traps are spelling where the ear does not help (silent letters, letters that sound the same, accents, vowel marks), differences between the home pronunciation and the standard spelling (dialect features, dropped sounds, and in some cases a home language that is written through a different standard, such as Cantonese speakers and standard written Chinese), and embarrassment at being "fluent but illiterate".

<what_you_can_already_do>
{{what_you_can_already_do}}
</what_you_can_already_do>
</context>

<task>
1. Where you start: in three or four lines, name their strengths, the literacy gap, and any mismatch between how they speak at home and how the standard language is written. Never describe them as a beginner in the language.
2. Sounds you know and how they are spelled: map 10 to 15 sounds they already produce to their spelling, using their own everyday words as the examples. If New script is "yes", introduce the script in a first chunk of 8 to 12 high-payoff characters chosen so they can already spell family words (names, mum, dad, food, home), with stroke or letter-formation notes, and say how the rest will follow. If it is "no", focus on the sound-spelling rules where the ear misleads (for example b and v in Spanish, nasal vowels in Portuguese, ż and rz in Polish), with the rule or memory trick for each.
3. Read your own words: write a short text of 60 to 120 words in standard spelling as if they had dictated it, about a family scene that fits what they shared (a meal, a visit, a phone call with relatives). Add three comprehension questions and mark in bold five words whose spelling surprises speakers.
4. Write your own words: five tasks from easiest to hardest (copy, fill the missing letters, spell from a description, write a three-sentence message to a relative, write a short memory), each built on words they use.
5. Answer key for steps 3 and 4.
6. Next five sessions: a short plan, one line each, moving from family words to real family texts (messages, recipes, songs, signs, letters) and naming one real thing to read each time.
</task>

<constraints>
- Treat the home variety as legitimate. When home pronunciation differs from standard spelling, explain it as "how it is written in the standard" versus "how your family says it", not as an error.
- Use only the facts the learner gave about their family and life; do not invent relatives' names or stories, and keep the reading text generic where they gave few details.
- If what they can already do is too vague to start (no examples of words they use, unclear which variety), ask for five everyday words they say at home and which region the family comes from, then stop.
- If the written standard for their home variety is contested or there are several (for example several romanisation systems or written forms), name the options and use the one most useful for reading real family material, saying why.
- Keep explanations in plain English unless the learner asks for them in the target language.
</constraints>

<output_format>
## Where you start
Three or four lines.
## Sounds you know and how they are spelled
Table: sound or letter | how it is written | your words that use it | trap or trick.
## Read your own words
The text, then three questions.
## Write your own words
Five numbered tasks.
## Answer key
Answers for the reading questions and the five tasks.
## Next five sessions
Five lines: focus | real thing to read.
</output_format>

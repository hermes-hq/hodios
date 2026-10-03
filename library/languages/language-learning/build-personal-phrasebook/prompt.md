---
schema: 1
id: build-personal-phrasebook
kind: prompt
title: Build a personal phrasebook
description: Builds a personal phrasebook about the learner's own life, such as job, hobbies, family and routines, at their level, with pronunciation hints, swap-in variations and practice prompts.
category: language-learning
version: 1.0.0
status: incubating
stage: [learn]
role: [language-learner]
requires: [none]
inputs: [preferences, text]
output: [table, quiz]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [phrasebook, personalised-learning, chunks, self-introduction, speaking-prep]
pairs_with:
  prompts: [learn-survival-phrases, build-vocabulary-list, mine-sentences-for-flashcards]
  personas: [language-exchange-partner, language-teacher]
args:
  - name: target_language
    description: The language of the phrasebook, with the variety if it matters.
    type: string
    required: true
  - name: level
    description: The learner's CEFR level; sets sentence length and grammar.
    type: enum
    enum: [a1, a2, b1]
    required: true
  - name: life_details
    description: Facts about the learner's life to build phrases from (job, where they live, family, hobbies, daily routine, why they learn the language, plans). Share only what you are comfortable with.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Phrasebook, Questions you will be asked, Practice]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You build personal phrasebooks for language learners. Generic phrasebooks teach "Where is the railway station?"; what learners actually need first is to talk about themselves, because every conversation with a new person, teacher or colleague starts there. Sentences that are true for the learner are easier to remember and immediately usable, and a sentence frame with swap-in words lets one phrase cover many situations.

Language: {{target_language}}
Level (CEFR): {{level}}

<life_details>
{{life_details}}
</life_details>
</context>

<task>
1. Read the life details and group them into four to seven sections, for example: about me, work or studies, family and home, free time, my day, why I am learning {{target_language}}, plans. Only create sections the details support.
2. Write 30 to 50 phrases in total, all true for this learner, at {{level}}:
   - A1: short sentences and fixed chunks, present tense, no subordinate clauses.
   - A2: add past and future for routines and plans, simple reasons with "because".
   - B1: add opinions, comparisons and short explanations of their job or hobbies.
   Include the matching question for each topic, so the learner can ask it back.
3. For each phrase give the meaning, a pronunciation hint (stress marked; simple respelling or IPA for sounds learners usually get wrong), and one or two swap-in alternatives where the frame is reusable ("I work as a [nurse / teacher]", "On weekends I usually [go hiking]").
4. Choose the register most learners need first (usually polite with strangers, informal with friends where the language marks it) and say which forms you used.
5. Questions you will be asked: the ten questions people will most likely ask the learner about the life they described, in {{target_language}} with meanings, each pointing to the phrase that answers it.
6. Practice: a five-minute daily routine (read aloud, cover and recall, answer the questions aloud), and a mini-test of six prompts in the learner's language that they must answer in {{target_language}} from memory.
</task>

<constraints>
- Do not add facts the learner did not give. Where a phrase needs a detail they left out, use a [placeholder] and point it out.
- Vocabulary for their job and hobbies must be the term actually used in that country (job titles, sports, school types).
- Explanations and meanings in English unless the learner writes in another language.
- Leave out sensitive details (exact address, health conditions, salary) even if given, unless the learner asks for them; mention once that you left them out.
</constraints>

<output_format>
## Phrasebook
One ### heading per section, each with a table: Phrase | Meaning | Say it | Swap in. Note on register after the first table.
## Questions you will be asked
Numbered list: question, meaning, answer phrase reference.
## Practice
Routine, then the mini-test with an **Answers** block.
</output_format>

---
schema: 1
id: write-concept-checking-questions
kind: prompt
title: Write concept-checking questions
description: Writes concept-checking questions for grammar or vocabulary and instruction-checking questions for activities, with expected answers and a timeline or visual where useful, for language teachers.
category: language-learning
version: 1.0.0
status: incubating
stage: [build]
role: [teacher, student]
requires: [none]
inputs: [text]
output: [questions, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [ccqs, icqs, checking-understanding, timelines, grammar-meaning]
pairs_with:
  prompts: [analyse-target-language-for-lesson, review-trainee-language-lesson-plan]
  personas: [language-teacher-trainer]
args:
  - name: target_language
    description: The language being taught.
    type: string
    required: true
  - name: language_items
    description: The items to check, one per line, each in an example sentence (for example "used to - I used to live in Paris"), and any activity instructions you want ICQs for. Add the class level.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Concept-checking questions, Instruction-checking questions, Notes]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a {{target_language}} teacher or trainee write concept-checking questions (CCQs) and instruction-checking questions (ICQs). A CCQ checks that learners understood the meaning of a new item; an ICQ checks they know what to do in an activity. "Do you understand?" checks nothing. Weak CCQs use the target item in the question, use words harder than the item, can be answered by guessing without understanding, or test general knowledge instead of the concept.

<items>
{{language_items}}
</items>
</context>

<task>
For each language item:
1. Break the meaning into its core concepts in 2-4 short statements (for "I used to live in Paris": past; repeated or long-lasting state; not true now).
2. Write one CCQ per concept, 2-4 per item, in simple {{target_language}} below the level of the item. Use yes/no, either/or, or short-answer questions ("Do I live in Paris now?" No. "Did I live there for a long time or one day?" A long time.). Order them from the core concept outwards.
3. Do not use the target item in the question. Include at least one question whose correct answer is "no" so learners cannot just nod.
4. Give the expected answer for each and what a wrong answer reveals (a likely confusion and what to do: re-show the context, contrast with a known form).
5. Where useful, add a visual: a timeline in text (past --X--X--X-- now | not now), a cline (never ... always), or a quick board drawing description. Timelines are most useful for tenses and aspect; clines for degrees (often, quite, a bit).
6. For vocabulary, check the features that matter: connotation, register, whether it is countable, and the boundary with a confusing near-synonym ("Is a cottage big or small? In the city or the country?").

For each activity instruction:
7. Write 2-3 ICQs that check the key decisions: alone or with a partner, writing or speaking, how long, what to produce ("Do you write or speak? Do you show your partner your card? How many minutes?").

Then:
8. Notes: how to ask (after the context and model, not before; one learner at a time or the whole group), and any item where CCQs are a poor fit (very concrete nouns better checked with a picture; fixed social phrases better checked with "when do you say this?").
</task>

<constraints>
- Questions and answers are in {{target_language}}; notes are in the language the teacher wrote in.
- Keep every CCQ under about 10 words and below the item's level.
- If an item has no example sentence or context, write one, mark it as your assumption, and check the meaning that sentence shows, because the same word can have several meanings.
- If you are unsure about a nuance in {{target_language}}, say so in Notes rather than build a CCQ on it.
</constraints>

<output_format>
## Concept-checking questions
For each item: ### heading with the example sentence, the concepts, then a table: CCQ | Expected answer | If they get it wrong. Timeline or visual below when useful.
## Instruction-checking questions
For each activity: the instruction and its ICQs with answers.
## Notes
</output_format>

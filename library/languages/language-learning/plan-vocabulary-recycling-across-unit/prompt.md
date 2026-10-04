---
schema: 1
id: plan-vocabulary-recycling-across-unit
kind: prompt
title: Plan vocabulary recycling across a unit
description: Plans how a unit's target vocabulary returns at spaced intervals across lessons, with retrieval starters, games and productive tasks, and a tracker showing when each word reappears and how.
category: language-learning
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
requires: [none]
inputs: [text, notes]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [vocabulary-recycling, spaced-practice, retrieval-practice, lexis, unit-planning]
pairs_with:
  prompts: [build-vocabulary-list, review-vocabulary-spaced, adapt-coursebook-unit-to-learners]
args:
  - name: target_language
    description: The language being taught.
    type: string
    required: true
  - name: word_list
    description: The unit's target words and chunks, in the order they are introduced if you know it (for example "lesson 1 - rent, deposit, landlord..."), plus the class level and anything you know about which words are hard.
    type: text
    required: true
  - name: number_of_lessons
    description: How many lessons the unit runs over (and the gap between lessons, if not one a few days apart).
    type: string
    default: "6"
output_contract:
  format: markdown
  sections: [Word groups, Recycling tracker, Lesson-by-lesson activities, End-of-unit check]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a {{target_language}} teacher or course writer make a unit's vocabulary stick. Learners need many encounters with a word, spread out over time and in different modes (recognise, recall, use), before they can use it. Coursebooks usually present a word once and test it at the end. Recycling plans fail when every review is the same matching exercise, when all words get equal time although some are much harder, and when the plan is too elaborate to run in a real lesson.

Lessons in the unit: {{number_of_lessons}}

<words>
{{word_list}}
</words>
</context>

<task>
1. Group the words: high-priority (frequent, useful beyond the unit, or hard because of form, false friends or spelling) and lower-priority (recognition is enough). Add the collocations or chunks each high-priority word is used in, because learners should recycle chunks, not isolated words.
2. Schedule encounters with expanding gaps: each high-priority word appears in the lesson it is taught, the next lesson, two or three lessons later and in the end-of-unit check, at least 5-6 times overall; lower-priority words 3 times. If the unit is short, carry the last words into the first lessons of the next unit and say so.
3. Move each word through modes over time: meaning recognition (match, choose), form recall (gap-fill with first letter, translation from first language), and productive use in speaking or writing (personalised questions, a story, a role-play). A word should not be used productively before it has been recalled.
4. For each lesson, write a 5-7 minute retrieval starter and one longer recycling activity (games such as back to the board, odd one out with a reason, collocation dominoes, a "find someone who" using the chunks, a story chain), naming the exact words used. Vary activity types; no activity type more than twice in the unit.
5. Build the tracker: one row per high-priority word, one column per lesson, and a code in each cell (T taught, R recognise, C recall, U use).
6. End-of-unit check: a short mixed test (recognition, recall, use in a sentence) and how to carry forward the words most learners missed.
</task>

<constraints>
- Use only the words given; if you add a chunk, mark it as an addition.
- Keep starters runnable with a board and paper; add an online option only as an alternative.
- If the word list has no level, assume one from the words and state it.
- If there are more than about 40 words for the unit, say that learners are unlikely to learn them all productively and recommend which to keep for recognition only.
</constraints>

<output_format>
## Word groups
High-priority with chunks, lower-priority, assumptions.
## Recycling tracker
Table: Word or chunk | L1 | L2 | ... (one column per lesson) | Check, with T, R, C, U codes. A key below.
## Lesson-by-lesson activities
### Lesson N: starter (words, steps, minutes) and recycling activity (words, steps, minutes).
## End-of-unit check
Items with answers, and the carry-forward rule.
</output_format>

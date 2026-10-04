---
schema: 1
id: write-retrieval-practice-starters
kind: prompt
title: Write retrieval practice starters
description: Writes a set of low-stakes lesson starters that mix last lesson, last week and last term content, with answers and a quick tracker to spot the gaps across the class.
category: teaching
version: 1.0.0
status: incubating
stage: [build]
role: [teacher]
requires: [none]
inputs: [text, notes]
output: [quiz, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [retrieval-practice, do-now, spaced-practice, interleaving, starters]
pairs_with:
  prompts: [write-multiple-choice-questions, analyze-class-assessment-results, create-review-game]
args:
  - name: units
    description: 'The topics taught so far, in teaching order if possible, with roughly when, e.g. "Term 1: cells, organisation. Last week: enzymes. Last lesson: factors affecting enzyme activity." Key facts or vocabulary help.'
    type: text
    required: true
  - name: age_group
    description: Age or year group and subject, e.g. "Year 10 biology".
    type: string
    required: true
  - name: lessons
    description: How many starters to write, one per lesson.
    type: number
    default: 5
output_contract:
  format: markdown
  sections: [Assumptions, Starters, Answers, Gap tracker, How to run it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Retrieval practice, pulling knowledge out of memory rather than rereading it, is one of the best-supported strategies for long-term learning, especially when it is spaced over time and mixes topics. A short starter at the beginning of each lesson does this cheaply, if the questions are low stakes, quick to mark, and spread across recent and older content so forgotten material resurfaces before it is lost.

Learners: {{age_group}}. Starters needed: {{lessons}}.
</context>

<task>
<units>
{{units}}
</units>

1. **Sort the content.** Group the units into last lesson, last week (or the current unit) and last term (or earlier). If the teaching order or timing is unclear, make a reasonable assumption and state it at the top.
2. **Write {{lessons}} starters**, one per lesson, each with five questions that can be answered in about five minutes without notes:
   - two questions from last lesson,
   - two from last week or the current unit,
   - one from last term or earlier.
   Across the set, each starter shifts forward as if one more lesson has passed, so content from early starters recurs later in the set, and every listed unit appears at least once.
3. **Vary the question types** across each starter: short recall, fill the gap, true or false with a correction, label or complete a diagram described in words, "what's the link between X and Y", and one question that needs explanation rather than a single word. Keep each answerable in a sentence or less.
4. **Write the answers** for each question, with the acceptable variations and the common wrong answer to listen for.
5. **Build a gap tracker:** a table with one row per question, its topic, and a column for the number or share of pupils who got it right, so the teacher can see which topics need re-teaching across the week.
6. **Add how to run it:** silent start on entry, self or peer marking with the answers shown, no grades recorded, a show of hands or mini-whiteboard count for the tracker, and a two-minute re-explain for any question most pupils missed.
</task>

<constraints>
- Low stakes: no scores that count, no trick questions, and wording a struggling reader can manage.
- Questions test understanding that matters for the course, not trivia; prefer the key facts, vocabulary and processes listed in {{units}}.
- Accuracy matters more than variety. Use only facts you are sure of for this subject and level; if the units are thin on detail, keep questions to what is clearly within them and say so.
- Avoid repeating the same wording across starters; when a topic recurs, ask about it differently.
- These are starters, not games: no teams, points or competition.
- Before finishing, check the mix in each starter (2, 2, 1), that every unit appears, and that every answer is correct.
</constraints>

<output_format>
## Assumptions
How the units were sorted by time, in a line or two.
## Starters
For each: **Starter N**, then numbered questions 1-5, each tagged (last lesson / last week / last term).
## Answers
For each starter, numbered answers with acceptable variations and the common wrong answer.
## Gap tracker
Table: Starter | Q | Topic | Pupils correct (blank) | Re-teach? (blank).
## How to run it
Four or five bullets.
</output_format>

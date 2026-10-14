---
schema: 1
id: write-multiple-choice-trivia
kind: prompt
title: Write multiple-choice trivia questions
description: Writes multiple-choice trivia for quiz apps, game shows or printed quizzes, with plausible wrong options, no giveaway patterns, balanced answer positions, a difficulty tag and a one-line explanation.
category: trivia
version: 1.0.0
status: incubating
stage: [build]
role: [individual, content-creator, teacher, gamer]
requires: [none]
inputs: [topic, preferences]
output: [quiz, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [multiple-choice, wrong-options, quiz-app, answer-balance, question-writing]
pairs_with:
  prompts: [review-quiz-questions, host-trivia-night]
args:
  - name: topic
    description: The subject, or "general knowledge" with any areas to include.
    type: text
    required: true
  - name: count
    description: Number of questions.
    type: number
    default: 20
  - name: options
    description: Options per question.
    type: number
    default: 4
  - name: audience
    description: Who plays and where (app, live game, printed sheet), so difficulty and length fit. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Questions, Answer balance, Verify before use]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write multiple-choice trivia. The quality of a multiple-choice question lives in its wrong options: they should come from the same category as the answer and be plausible to someone who half-knows, without being arguably correct. Weak questions leak the answer through patterns players learn fast: the longest option is right, "all of the above" is right, the odd one out in form is right, the answer is often in position B or C, or a joke option halves the choice.

Topic: {{topic}}
Questions: {{count}}, {{options}} options each
{{#audience}}Audience and setting: {{audience}}{{/audience}}
</context>

<task>
1. Write {{count}} questions across the topic with a difficulty mix (about 30 percent easy, 50 percent medium, 20 percent hard), each with exactly one correct option.
2. Build wrong options from the same category as the answer (other capitals for a capital, nearby years for a year, contemporaries for a person), using known misconceptions where they exist, since those make good distractors.
3. Keep options parallel in form and similar in length; no "all of the above", "none of the above" or joke options; no overlapping numeric ranges.
4. Spread the correct answer evenly across positions and avoid long runs of the same letter.
5. Add a one-line explanation per question saying why the answer is right and, where useful, why the most tempting wrong option is wrong.
6. Tag each question easy, medium or hard and with a sub-topic.
7. Mark time-sensitive or less certain answers [verify] and give the date your knowledge reflects.
</task>

<constraints>
- Never make a wrong option true under a reasonable reading; if unsure whether a distractor might also be right, replace it.
- Avoid negative stems ("Which is NOT...") unless the word NOT is in capitals and the question needs it.
- Keep stems short enough to read in a few seconds for live or app use.
- Nothing offensive and no questions on matters of opinion.
</constraints>

<output_format>
## Questions
Table: # | Question | A | B | C | D... | Answer | Difficulty | Sub-topic | Why.
## Answer balance
Count of correct answers per position, and the longest run of one letter.
## Verify before use
[verify] items with the kind of source to check.
</output_format>

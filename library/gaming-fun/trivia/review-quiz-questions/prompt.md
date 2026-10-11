---
schema: 1
id: review-quiz-questions
kind: prompt
title: Review quiz questions before the night
description: Checks a quiz you have written for wrong or outdated answers, ambiguous wording, more than one correct answer, giveaways and uneven difficulty, and suggests a fixed version of each problem question.
category: trivia
version: 1.0.0
status: incubating
stage: [review]
role: [individual, teacher, gamer]
requires: [none]
inputs: [text]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [pub-quiz, question-writing, ambiguity, answer-key, quality-check, myth-busting]
pairs_with:
  prompts: [host-trivia-night, rule-on-disputed-quiz-answer]
args:
  - name: quiz
    description: The questions with your answers, pasted as text. Round headings help.
    type: text
    required: true
  - name: audience
    description: Who will play, for example "adults at a pub in Ireland" or "mixed-age family, US". Optional.
    type: string
output_contract:
  format: markdown
  sections: [Verdict, Problems, Difficulty and balance, Fixed questions, Verify before use]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You review quizzes the way an experienced quiz editor does before a live night. Most disputes come from a small set of faults: the answer is wrong or a popular myth; the question allows a second correct answer ("Which planet has rings?"); the wording hinges on a definition players read differently (tallest building with or without spires, largest by area or population); the fact has changed since it was written (record holders, "current" anything, "the newest"); the question gives its own answer away; or a round favours one kind of player. Catching these before the night saves the host from arguments.

<quiz>
{{quiz}}
</quiz>
{{#audience}}Audience: {{audience}}{{/audience}}
</context>

<task>
1. Read every question and answer. For each, decide: OK, or one of these faults: wrong answer, likely myth, second valid answer, ambiguous wording, time-sensitive, giveaway, too local or niche for the audience, offensive or unkind.
2. For each faulty question, say in one line what goes wrong at the table (for example "a team will say Saturn and Uranus; both are right").
3. Rate each question easy, medium or hard for the audience, then look at each round: flag rounds with no gettable questions, a run of the same subject, or too many questions that depend on one region or generation.
4. Rewrite each faulty question so it has one answer, and add the "also accept" list where spellings or partial answers will come up.
5. List everything that still needs checking against a reliable reference before the night, with the kind of source to use (an official body, the record's governing organisation, a standard reference work), and the date your knowledge reflects.
</task>

<constraints>
- Do not mark an answer wrong unless you are confident; when unsure, say "verify" and why, instead of overruling the author.
- Never invent a source, statistic or date to support a correction.
- Keep the author's voice and round structure; fix questions, do not rewrite the quiz.
- If the text has no answers, review the questions and say the answer key is missing.
</constraints>

<output_format>
## Verdict
Two or three lines: how many questions are fine, how many need fixing, and the biggest risk on the night.
## Problems
Table: # | Question (short) | Fault | What happens at the table.
## Difficulty and balance
Per round: easy/medium/hard counts and any balance issues.
## Fixed questions
Each rewritten question with its answer and "also accept".
## Verify before use
Checklist of facts to confirm and the kind of source for each.
</output_format>

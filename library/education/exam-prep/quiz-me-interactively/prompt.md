---
schema: 1
id: quiz-me-interactively
kind: prompt
title: Quiz me interactively
description: Runs an adaptive quiz one question at a time, adjusts difficulty to the learner's answers and ends with a summary of weak areas to review. Use for quick self-testing on any topic.
category: exam-prep
version: 1.0.0
status: incubating
stage: [verify, learn]
role: [student, language-learner, individual]
requires: [none]
inputs: [topic, notes]
output: [quiz, conversation, summary]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
tags: [retrieval-practice, adaptive-quiz, self-testing]
pairs_with:
  prompts: [generate-practice-exam]
  personas: [study-coach]
args:
  - name: topic
    description: The topic to be quizzed on, or pasted notes to quiz from. Notes give the most accurate questions.
    type: text
    required: true
  - name: question_count
    description: Number of questions in the session.
    type: number
    default: 10
  - name: difficulty
    description: adaptive moves up and down with your answers; easy and hard stay fixed.
    type: enum
    enum: [adaptive, easy, hard]
    default: adaptive
output_contract:
  format: markdown
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Self-testing is one of the most effective ways to study, but only when the learner has to produce the answer before seeing it and gets immediate, specific feedback. A good quiz master asks one question at a time, never leaks the answer in the question, mixes question types, and keeps track of which sub-topics are shaky so the learner knows what to review.
</context>

<task>
Quiz the learner on the following, {{question_count}} questions, difficulty `{{difficulty}}`.

<topic>
{{topic}}
</topic>

1. If the topic is too broad to cover meaningfully in {{question_count}} questions ("biology", "history"), ask once which part and what level, then start. If notes were pasted, quiz only from the notes.
2. Plan privately: list the sub-topics you will cover and spread the questions across them.
3. Ask exactly one question per message, numbered "Question k of {{question_count}}". Vary the type: short recall, explain-why, apply to a new example, spot the error, compare two ideas. Use multiple choice sparingly; free recall works better.
4. After each answer:
   - Mark it Correct, Partly correct or Incorrect.
   - In two or three sentences, explain the key point, including why a wrong answer is wrong.
   - Then ask the next question in the same message.
5. Difficulty:
   - `adaptive`: start at medium. After two correct answers in a row, step up (application, multi-step, unfamiliar context). After an incorrect answer, step down one level and, later in the session, return to the missed idea from a different angle.
   - `easy`: recall and basic understanding throughout. `hard`: application and analysis throughout.
6. Treat "I don't know" or "skip" as incorrect: give the answer and a one-line explanation, without judgement.
7. After the last question, give the summary.
</task>

<constraints>
- Never reveal or hint at the answer in the question itself, and never ask two questions at once.
- Accept answers that are correct in substance even if worded differently or misspelled, unless exact wording is the point.
- Do not move on until the learner has answered or skipped.
- If you are not sure an answer is correct, say so rather than guessing a verdict.
- If the learner says "stop", go straight to the summary for the questions answered so far.
</constraints>

<output_format>
During the quiz: short messages, each with the verdict and explanation for the last answer (if any), then the next question.

At the end:
**Score:** x / {{question_count}}
A table: Sub-topic | Questions | Correct | Status (Solid / Shaky / Review).
**Review first:** the 2 or 3 weakest ideas, each with one sentence on what to revisit.
**Next session:** one suggestion, e.g. which sub-topic to quiz on at what difficulty.
</output_format>

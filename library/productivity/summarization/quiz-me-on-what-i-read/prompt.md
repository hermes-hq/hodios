---
schema: 1
id: quiz-me-on-what-i-read
kind: prompt
title: Quiz me on what I just read
description: Quizzes the reader on an article, chapter or report they just read, one question at a time, mixing recall and application, and explains each miss with the passage that answers it.
category: summarization
version: 1.0.0
status: incubating
stage: [learn]
role: [student, individual]
requires: [none]
inputs: [document, text]
output: [quiz, conversation]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
tags: [retrieval-practice, reading-comprehension, self-testing, active-recall]
pairs_with:
  prompts: [make-flashcards, quiz-me-interactively, extract-wisdom-from-content]
args:
  - name: content
    description: The article, chapter, report or notes you just read, as text.
    type: text
    required: true
  - name: questions
    description: How many questions to ask.
    type: number
    default: 8
  - name: difficulty
    description: easy = mostly recall of main points; medium = recall plus explaining why; hard = more application to new cases and subtle distinctions.
    type: enum
    enum: [easy, medium, hard]
    default: medium
output_contract:
  format: markdown
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Rereading feels productive but fades quickly; answering questions from memory makes reading stick. This quiz is grounded entirely in the text the reader supplied, so every question can be answered from it and every miss can be traced back to the exact passage to reread.

<content>
{{content}}
</content>
Questions: {{questions}}
Difficulty: {{difficulty}}
</context>

<task>
1. If the text is too short to support {{questions}} distinct questions, say how many it supports and use that number.
2. Plan the questions silently before asking any. Cover the main ideas across the whole text, not just the opening. Mix types according to difficulty:
   - **Recall:** a main point, definition, figure or sequence that matters (not trivia).
   - **Understanding:** why something is the case, or how two ideas connect, as the text explains it.
   - **Application:** a short new scenario the reader must analyse using the text's ideas.
   - **Spot the misreading:** a statement that subtly distorts the text (overstated, reversed cause, dropped condition); the reader says what is wrong.
   Easy leans on recall; medium balances recall and understanding with one application; hard leans on application and misreadings.
3. Tell the reader the number of questions and that they should answer from memory. Ask one question at a time and wait.
4. Mark each answer: correct, partly correct or not yet. Accept answers in the reader's own words if the meaning is right. For anything short of correct, give the right answer and quote the passage that holds it, with its location.
5. After the last question, give the score, the ideas they knew well, the ideas to reread with locations, and one question to try again tomorrow.
</task>

<constraints>
- Every question must be answerable from the text alone. Do not test outside knowledge.
- No trick questions on incidental details (a name in an anecdote, an exact page number).
- Do not reveal answers in the wording of a question or a later question.
- Keep feedback short and specific. Encourage without empty praise.
- Before asking each question, check that the text supports one clear correct answer.
- If the reader asks to stop, give the summary for the questions answered so far.
</constraints>

<output_format>
**Start:** one line on how the quiz works.

**Each question:**
**Question N of {{questions}}** (type)
The question. Wait.

**Feedback:** Correct, Partly correct or Not yet; the right answer if needed; > "passage" (location).

**End:** score; what you know well; what to reread (with locations); one question for tomorrow.
</output_format>

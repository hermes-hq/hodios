---
schema: 1
id: generate-elaborative-questions
kind: prompt
title: Generate why and how questions from notes
description: Turns study notes into why, how and what-if questions with model answers drawn from the notes, so a student builds connected understanding rather than single-fact recall.
category: studying
version: 1.0.0
status: incubating
stage: [learn]
role: [student]
requires: [none]
inputs: [notes, text]
output: [questions, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [elaborative-interrogation, self-explanation, deep-understanding, active-recall]
pairs_with:
  prompts: [run-feynman-check, build-concept-map, make-flashcards]
  personas: [study-coach]
args:
  - name: notes
    description: Your notes, a textbook section or lecture slides as text. A page or two works best.
    type: text
    required: true
  - name: depth
    description: basic asks why and how about single ideas; connected links ideas across the notes; challenge adds what-if, boundary and transfer questions.
    type: enum
    enum: [basic, connected, challenge]
    default: connected
output_contract:
  format: markdown
  sections: [How to use these questions, Questions, Model answers, Gaps in your notes]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Flashcards test whether a student can retrieve a fact. Elaborative interrogation ("Why is this true?") and self-explanation ("How does this step follow from the last?") test whether they understand why it holds and how it connects to the rest. They work best when the answer has to be built from the material, not copied from one line of it.

Common failures this avoids:
- "Why" questions whose answer is a single sentence lifted from the notes, which is recall in disguise.
- Model answers that bring in material the notes never covered, so the student cannot check them.
- Vague prompts ("Discuss photosynthesis") that do not tell the student what a good answer contains.
- Building questions on top of an error in the notes.

Depth: {{depth}}.
</context>

<task>
<notes>
{{notes}}
</notes>

1. Pick out the 6 to 12 central claims, processes or definitions in the notes. Ignore trivia.
2. Check each against what you know. If a claim looks wrong or garbled, do not build on it; list it under Gaps.
3. Write questions by depth:
   - basic: one "why is this true?" or "how does this work?" per central claim, 6 to 10 questions.
   - connected: as basic, plus questions that link two ideas from different parts of the notes ("How does X explain Y?", "What do X and Y have in common, and where do they differ?"), 8 to 12 questions.
   - challenge: as connected, plus "what would change if...", "when does this stop being true?" and "where else would this apply?", 10 to 14 questions.
4. Label each question with its type: Why, How, Link, Contrast, What-if or Apply.
5. Write a model answer of 2 to 4 sentences for each, built from the notes. Where the answer needs reasoning the notes do not state, write it and tag it [beyond your notes: check in your textbook].
6. After each model answer, list 2 or 3 key points a good answer must include, so the student can self-mark.
7. List claims the notes state without any explanation; these are the places to read further.
</task>

<constraints>
- Questions must require reasoning, not copying one line from the notes.
- Never invent sources, data or facts; mark anything not supported by the notes as above.
- Flag apparent errors in the notes plainly and do not reinforce them in questions or answers.
- If the notes are a single word, a heading or too short to reason about (under about 80 words), ask for fuller notes or the relevant textbook section and stop.
</constraints>

<output_format>
## How to use these questions
3 bullets: answer out loud or in writing from memory first, then compare with the model answers, then reread only what you missed.

## Questions
Numbered, each with its type label in brackets. No answers here.

## Model answers
Same numbering. Each: the model answer, then "A good answer includes:" with 2 or 3 bullets.

## Gaps in your notes
Bullets: claims without explanation, and any apparent errors, with what to check.
</output_format>

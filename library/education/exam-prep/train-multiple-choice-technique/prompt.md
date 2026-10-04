---
schema: 1
id: train-multiple-choice-technique
kind: prompt
title: Train multiple-choice technique
description: Teaches evidence-based multiple-choice technique on the student's own subject with original items and confidence ratings, then separates knowledge errors from technique errors.
category: exam-prep
version: 1.0.0
status: incubating
stage: [verify, learn]
role: [student]
requires: [none]
inputs: [preferences]
output: [quiz, conversation, table]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
tags: [multiple-choice, elimination, confidence-rating, answer-changing, guessing-strategy, test-taking]
pairs_with:
  prompts: [plan-exam-day-strategy, analyze-exam-mistakes, generate-practice-exam]
args:
  - name: subject
    description: The subject and level, such as "GCSE biology", "first-year psychology", "AWS Cloud Practitioner", "nursing pharmacology".
    type: string
    required: true
  - name: questions
    description: Number of practice items.
    type: number
    default: 10
  - name: negative_marking
    description: Whether wrong answers lose marks, for example "no", "-0.25 per wrong answer", "not sure".
    type: string
    default: not sure
output_contract:
  format: markdown
  sections: [Results, Knowledge or technique, Calibration, Your routine]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Many multiple-choice marks are lost by students who knew the content. The technique that helps, and that research on testing supports:
- Read the stem as a question and predict an answer before reading the options (cover them), so a plausible distractor cannot steer you.
- Read every option; eliminate the clearly wrong ones and choose between what remains.
- Watch qualifiers (not, except, most, first, always, never) in the stem; absolute words in options are only a weak clue on well-written tests, never a rule.
- Change an answer when you have a specific reason: studies of answer changes find they go from wrong to right more often than the reverse, so "always stick with your first instinct" is a myth.
- Guessing depends on the marking: with no penalty, never leave a blank; with a penalty, guess once you can eliminate enough options for the expected value to be positive.
Separating knowledge errors from technique errors tells the student whether to revise content or practise method.
</context>

<task>
Train multiple-choice technique on {{subject}} with {{questions}} original items. Negative marking: {{negative_marking}}.

1. Open with the five-step routine in five short lines: read the stem and underline the qualifier, predict, read all options, eliminate, choose and rate confidence. Ask them to use it on every item.
2. Write every item yourself at the subject's level, solved privately, with one defensible answer and distractors built from real misconceptions, partial truths, true statements that do not answer the stem, and qualifier traps. Include at least two items with NOT or EXCEPT and one where a tempting option is true but irrelevant.
3. Ask one item per message, labelled "Item k of {{questions}}", and ask for: their prediction (before options, if they can), the options they eliminated, their answer and a confidence rating (sure, unsure, guess).
4. After each answer:
   - Mark it and give the answer.
   - Classify any error: knowledge (did not know the fact) or technique (missed the qualifier, skipped prediction, picked a true-but-irrelevant option, eliminated the right answer, changed a right answer without a reason). Explain the step of the routine that would have caught it.
   - Explain briefly why each distractor attracts.
5. After the last item, give the review, including the guessing rule for their marking scheme: with +1 for right and -p for wrong and k options left, a guess is worth (1 - (k - 1) x p) / k on average; guess when that is above zero. If the marking is "not sure", give the rule for both cases and tell them to check.
</task>

<constraints>
- Original items only.
- Do not teach tricks that rely on badly written tests (longest answer is right, C is most common) except to say they are unreliable.
- If they want content teaching instead, finish the item, then suggest a separate study session.
</constraints>

<output_format>
During the set: verdict, error type and explanation, then the next item, in one message.

At the end, under these headings:
## Results
x / {{questions}}.
## Knowledge or technique
A table: Item | Right or wrong | Error type | Routine step that would have helped. Then the counts of each type.
## Calibration
A table of confidence (sure, unsure, guess) by percent correct, and what it shows (for example "your 'sure' answers were wrong a third of the time: slow down on familiar-looking items").
## Your routine
The five-step routine adjusted for their weak step, and their guessing rule.
</output_format>

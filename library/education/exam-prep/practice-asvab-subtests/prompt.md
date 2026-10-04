---
schema: 1
id: practice-asvab-subtests
kind: prompt
title: Practise ASVAB subtests
description: Drills original ASVAB-style questions by subtest with explanations, and shows which subtests feed the AFQT and which feed the job line scores the recruit should check.
category: exam-prep
version: 1.0.0
status: incubating
stage: [verify, learn]
role: [individual, student]
requires: [none]
inputs: [preferences]
output: [quiz, conversation, table]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [asvab, afqt, military-enlistment, arithmetic-reasoning, mechanical-comprehension, word-knowledge]
pairs_with:
  prompts: [prepare-standardized-test, analyze-exam-mistakes, make-flashcards]
args:
  - name: subtest
    description: Which subtest to drill. mixed rotates through them, weighting the four that make up the AFQT.
    type: enum
    enum: [mixed, arithmetic-reasoning, word-knowledge, paragraph-comprehension, math-knowledge, general-science, mechanical, electronics, auto-shop]
    default: mixed
  - name: questions
    description: Number of questions in the set.
    type: number
    default: 15
  - name: goal
    description: Optional. The branch and jobs you are interested in, or a target score your recruiter gave you.
    type: text
output_contract:
  format: markdown
  sections: [Score, By subtest, What counts for you, Next set]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The ASVAB is the entry test for the US armed forces. Its subtests include Arithmetic Reasoning, Mathematics Knowledge, Word Knowledge, Paragraph Comprehension, General Science, Electronics Information, Auto and Shop Information, Mechanical Comprehension and Assembling Objects. Four of them (Arithmetic Reasoning, Mathematics Knowledge, Word Knowledge and Paragraph Comprehension) make up the AFQT score, which decides whether someone can enlist; each branch then combines subtests into line scores or composites that decide which jobs are open. Minimum scores and composites differ by branch and change, so the recruit must confirm them with a recruiter or the branch's official sources. Calculators are not allowed, and the computer version adapts to the test-taker's answers.

Practical teaching points: arithmetic reasoning is word problems (rates, percentages, ratios, simple interest, averages), so translating words into a set-up is the core skill; word knowledge rewards learning roots and using context; mechanical comprehension tests levers, pulleys, gears and simple machines using a few principles.
</context>

<task>
Run {{questions}} original ASVAB-style questions. Subtest: `{{subtest}}`.
{{#goal}}
<goal>
{{goal}}
</goal>
{{/goal}}

1. Open with one line on the no-calculator rule and ask them to work on paper.
2. Write every item yourself; never reproduce items from official practice tests or study guides. Solve each privately. Four options, one correct. For `mixed`, give about two thirds of items to the four AFQT subtests.
3. Ask one question per message, labelled with the subtest and "Question k of {{questions}}".
4. After each answer:
   - Mark it and give the answer.
   - Explain the method in plain steps: for maths, the set-up then the arithmetic, with a quick check (estimate or plug back); for words, the root or context clue; for mechanical and electronics, the principle (mechanical advantage, gear direction and speed, series versus parallel) in one sentence and how it applies.
   - Say whether this subtest counts toward the AFQT.
5. After two misses on the same skill, teach it in five lines with one worked example before continuing.
6. After the last question, give the review.
</task>

<constraints>
- Never state minimum AFQT scores, line score cut-offs or job requirements as fact; tell them to confirm with a recruiter or official branch sources.
- Never predict their AFQT score from the set.
- Keep a respectful, plain tone; many test-takers have been out of school for years.
</constraints>

<output_format>
During the set: the marking and explanation, then the next question, in one message.

At the end, under these headings:
## Score
x / {{questions}}.
## By subtest
A table: Subtest | Counts toward AFQT | Asked | Correct | Skill to work on.
## What counts for you
The AFQT subtests to prioritise and, if a goal was given, the line scores to ask the recruiter about for those jobs.
## Next set
The subtest and skill to drill next.
</output_format>

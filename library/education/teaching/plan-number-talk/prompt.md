---
schema: 1
id: plan-number-talk
kind: prompt
title: Plan a number talk
description: Plans a short number talk with a purposeful problem string, anticipated student strategies, how to record each one and questions that move mathematical thinking forward.
category: teaching
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
subject: [mathematics]
requires: [none]
inputs: [topic]
output: [plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [number-talks, problem-strings, mental-math, number-sense, math-discourse]
pairs_with:
  prompts: [design-formative-assessment, generate-discussion-questions]
  personas: [math-tutor]
args:
  - name: math_focus
    description: The strategy or relationship to develop, e.g. "adding 9 by compensating", "doubling and halving for multiplication", "subtraction as finding the difference", "equivalent fractions".
    type: string
    required: true
  - name: grade_level
    description: Grade, year or age, e.g. "Grade 2", "Year 5", "Grade 7".
    type: string
    required: true
  - name: minutes
    description: Length of the talk in minutes.
    type: number
    default: 15
output_contract:
  format: markdown
  sections: [Purpose, Routine, Problem string, Anticipated strategies and recording, Teacher moves, Closing and look-fors]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A number talk is a short daily routine where students solve problems mentally and explain their strategies while the teacher records their thinking for everyone to see. A problem string is a sequence of related problems chosen so a particular strategy or relationship becomes visible: early problems are easy and act as helpers, later ones invite students to use them. The teacher does not teach the strategy; the sequence and the recording draw it out. The planning that matters is anticipation: what students will probably do with each problem, which model will make each strategy visible (open number line, ratio table, array or area model, equations), and which questions push from one strategy to a more efficient or more general one.
</context>

<task>
Plan a {{minutes}}-minute number talk for **{{grade_level}}** that develops **{{math_focus}}**.

1. State the mathematical purpose in one sentence and the relationship students should notice by the end.
2. Describe the routine briefly: problems shown one at a time, solved mentally, a quiet thumb on the chest to signal a solution and extra fingers for more strategies, wait time, sharing answers before strategies, and all answers recorded without judgement.
3. Write a problem string of 4 to 6 problems that fits the time. For each, give its purpose (helper problem, the one that invites the strategy, a test of whether students use it, a stretch). Use numbers chosen so the target strategy is the efficient one for the later problems.
4. For each problem, anticipate 2 to 4 strategies students at this grade are likely to use, including at least one less efficient strategy and one common error. Name each strategy, show it as a student would explain it, and say exactly how to record it (draw the open number line jumps, the ratio table rows, or the equations as a chain).
5. Write teacher moves: questions to ask after each share (for example "Who can say what Maya did in their own words?", "Where is the 10 in her number line?", "Would this work for 38 + 9?", "How are problems 2 and 4 related?"), how to handle a wrong answer so the student reasons about it, and when to move on.
6. Close with a question that asks students to generalise or name the strategy in their own words, and list 2 or 3 look-fors that show who is using the target strategy.
</task>

<constraints>
- The talk is mental: no paper or calculators for students, except for written recording by the teacher.
- Every number in the string must be correct and suit {{grade_level}}. Check your own arithmetic.
- Do not script the target strategy as something the teacher tells students; it should emerge from the string and the questions.
- Keep the plan within {{minutes}} minutes; most of the time goes on student explanation, so fewer problems is better than rushed ones.
- If {{math_focus}} is too broad for one talk, narrow it and say how.
</constraints>

<output_format>
## Purpose
One sentence plus the relationship to notice.
## Routine
Short bullets, including the hand signal and norms.
## Problem string
Numbered list: problem, purpose, suggested minutes.
## Anticipated strategies and recording
For each problem: Strategy | How a student might say it | How to record it.
## Teacher moves
Questions and responses to errors.
## Closing and look-fors
The closing question and observable look-fors.
</output_format>

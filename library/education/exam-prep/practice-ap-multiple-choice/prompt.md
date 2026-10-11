---
schema: 1
id: practice-ap-multiple-choice
kind: prompt
title: Practise AP multiple choice
description: Sets original multiple-choice questions in the style of a named AP exam, stimulus-based where the course uses sources or data, timed, with explanations and a unit-by-unit weakness summary.
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
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [ap-exams, stimulus-based-questions, course-units, science-practices, historical-thinking, college-board]
pairs_with:
  prompts: [practice-ap-free-response, analyze-exam-mistakes, plan-exam-day-strategy]
args:
  - name: exam
    description: The AP exam, for example "AP Biology", "AP US History", "AP Calculus AB", "AP Psychology", "AP Chemistry".
    type: string
    required: true
  - name: units
    description: Optional. Units or topics to cover, for example "Units 3 and 4" or "cell respiration and photosynthesis". Without it, the set covers the whole course.
    type: string
  - name: questions
    description: Number of questions in the set.
    type: number
    default: 15
  - name: timed
    description: true asks the student to keep to the exam's average pace and report time; false is untimed.
    type: boolean
    default: true
output_contract:
  format: markdown
  sections: [Score, By unit and skill, Ideas to review, Next set]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
AP multiple-choice sections test the skills in each course's official course and exam description as much as content. In many courses questions come in sets around a stimulus: a primary or secondary source and its context in the history courses, an experiment or data table in the sciences, a graph or model in economics, a short scenario in psychology. Students lose points by answering from memory instead of from the stimulus, choosing an option that is true but does not answer the question asked, and running out of time. There is no penalty for wrong answers, so every question should be answered. Unit weightings and skills differ by course and are published in the official course description; students should check it and the current exam format.

Exam: {{exam}}
{{#units}}Units: {{units}}{{/units}}
Timed: {{timed}}.
</context>

<task>
Run {{questions}} original multiple-choice questions in the style of {{exam}}.

1. Write every item yourself; never reproduce released AP questions or prep-book items. Where the course uses stimuli, write sets of two to four questions around an original stimulus (an invented but realistic data table, a short source excerpt you write and label as written for practice, a graph described with axes). Use four options A to D. Cover the units given or the course broadly, and test skills as well as recall. Solve each privately.
2. Present one item or one stimulus set per message, labelled with question numbers out of {{questions}}. Ask for answers, and the time if timed.
3. After each answer or set:
   - Mark each and give the key.
   - Explain the reasoning, pointing to the stimulus where relevant.
   - Say why each wrong option is tempting and wrong.
   - Name the unit and the skill tested.
4. After two misses in the same unit, give a short review note before continuing.
5. After the last item, give the review.
</task>

<constraints>
- Do not present invented sources as real historical documents or quotations from real people; label them as written for practice, or use well-known short public-domain excerpts only if quoted accurately.
- Do not convert results to an AP score.
- Do not invent course unit names or numbers if unsure; describe the topic instead and tell the student to match it to their course description.
- If the student shows a key is wrong, concede and correct it.
</constraints>

<output_format>
During the set: verdict and explanation for the last answer, then the next item or set, in one message.

At the end, under these headings:
## Score
x / {{questions}}{{#timed}}, with time against pace{{/timed}}.
## By unit and skill
Table: Unit or topic | Skill | Asked | Correct | Error pattern.
## Ideas to review
One line each.
## Next set
Units to drill next, and one reminder to answer every question.
</output_format>

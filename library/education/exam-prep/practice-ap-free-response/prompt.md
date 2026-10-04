---
schema: 1
id: practice-ap-free-response
kind: prompt
title: Practise an AP free-response question
description: Sets an original free-response question in the style of an AP subject exam, times it, then scores the answer against an AP-style point rubric and shows what each point needed.
category: exam-prep
version: 1.0.0
status: incubating
stage: [verify, learn]
role: [student, teacher]
requires: [none]
inputs: [topic, text]
output: [quiz, report, table]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [ap-exams, free-response, point-rubric, scoring-guidelines, timed-writing, college-board]
pairs_with:
  prompts: [write-model-exam-answer, grade-practice-answers, analyze-exam-mistakes]
args:
  - name: subject
    description: The AP course, such as "Calculus AB", "Biology", "Chemistry", "Psychology", "US Government and Politics" or "Microeconomics".
    type: string
    required: true
  - name: question_type
    description: The free-response type to set, such as "long essay", "short answer", "experimental design", "graphing", "multi-part calculator question". any picks a common type for the subject.
    type: string
    default: any
  - name: timed
    description: true sets the recommended time for this question type and asks the student to stop at the limit; false is untimed.
    type: boolean
    default: true
output_contract:
  format: markdown
  sections: [Question, Score, Point by point, What the missing points needed, Next question]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
AP free-response questions are scored with analytic point rubrics: each point is earned for a specific, observable thing (a correct derivative with supporting work, a claim with a justification, a labelled axis, a defensible thesis, an explanation that links evidence to the claim), and points are not taken away for errors elsewhere unless the rubric says so. Students lose most points not from ignorance but from missing what the point requires: answering "describe" when the task said "explain", giving an answer without the required work or units, or making a claim without the reasoning step. The task verbs (identify, describe, explain, justify, calculate, compare, evaluate) each set a different bar.
</context>

<task>
Set and score one original free-response question for AP {{subject}}. Question type: {{question_type}}. Timed: {{timed}}.

1. If {{subject}} is not an AP course you recognise, say so and ask which course is meant. If question_type is "any", pick a type that appears on that exam.
2. Write the question yourself in the style and structure of the current exam's free-response section for this course: parts labelled (a), (b), (c), with task verbs, any stimulus (data table, graph described in words, short scenario, function definition) and units. Never reproduce a released question.
3. Privately, write an analytic rubric in the AP style: the number of points this question type usually carries, and for each point exactly what earns it, what does not, and any linked or dependent points. Describe the rubric logic in your own words; do not copy published scoring guidelines.
4. Present the question. If timed is true, give the recommended time for this type as you understand it, labelled "check the course description for the current timing", and ask the student to stop when time is up and paste what they have.
5. When the student sends the answer, score it point by point against your rubric. For each point: earned or not, the exact words or step in their answer that earned it, or what was missing. Be as strict as an AP reader: a correct idea without the required reasoning does not earn an "explain" point.
6. For every missed point, show what a minimal answer that earns it would look like. If this is practice, a full model response is fine; if the student says it is assessed homework, show the technique on a different example instead.
7. Offer a second question targeting the points they missed.
</task>

<constraints>
- Say plainly that your rubric is an AP-style approximation and that official scoring guidelines for released questions are on the College Board's site.
- Do not convert the score to a 1 to 5 AP score.
- Accept equivalent correct methods and wording, as AP readers do.
- If the answer has a calculation error, apply carry-forward credit for later parts where a real rubric typically would, and say so.
</constraints>

<output_format>
## Question
The question with labelled parts and any stimulus. Time limit line if timed.

After the student answers:
## Score
x / total, labelled "AP-style estimate".
## Point by point
Table: Part | Point | Earned? | Evidence from your answer or what was missing.
## What the missing points needed
For each missed point, the minimum that would earn it.
## Next question
One line offering a targeted follow-up.
</output_format>

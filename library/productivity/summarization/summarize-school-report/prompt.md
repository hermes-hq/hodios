---
schema: 1
id: summarize-school-report
kind: prompt
title: Make sense of your child's school report
description: Explains a child's school report - what the grades, levels or effort codes mean, strengths, concerns hidden in polite wording, changes since last time and questions for the teacher.
category: summarization
version: 1.0.0
status: incubating
stage: [review]
role: [parent]
requires: [none]
inputs: [document]
output: [summary, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [report-card, school-report, grades, parent-teacher-meeting, child-progress]
pairs_with:
  prompts: [summarize-photographed-pages, extract-deadlines, compare-documents]
args:
  - name: report
    description: The report text, including the key that explains grades, levels or codes. Add last year's or last term's report for comparison if you have it.
    type: text
    required: true
  - name: child
    description: Child's age or year group, the country or school system, and anything relevant you know (for example "has dyslexia support", "new to the school").
    type: text
    required: true
output_contract:
  format: markdown
  sections: [The report in brief, What the grades mean, Strengths, Things to watch, Changes since last report, Questions for the teacher, How to talk to your child about it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a parent read a school report. Reports use school-specific codes (working towards, at expected standard, 1 to 9, A to F, effort ratings) and polite teacher language in which "is beginning to" and "would benefit from" carry real meaning. Parents tend to focus on the lowest grade or skim the comments, missing a consistent message across subjects (organisation, confidence, homework), a gap between effort and attainment, attendance figures, or a drop since last term. Good reading uses the school's own key, compares across subjects and over time, and turns concerns into specific, friendly questions for the teacher rather than worries at home.

<report>
{{report}}
</report>

Child: {{child}}
</context>

<task>
1. Summarise the report in three or four sentences, including attendance if given.
2. Explain the grading system using the report's own key; if no key is given, say so and avoid guessing what levels mean.
3. List strengths, quoting teacher comments.
4. List things to watch, decoding polite wording (for example "is beginning to" means not yet secure), and themes repeated across subjects.
5. Compare with the previous report if supplied: up, down, steady, by subject.
6. Note any gap between effort and attainment and what it might suggest, as a question rather than a conclusion.
7. Draft specific questions for the teacher.
8. Suggest how to talk to the child about the report: start with strengths, focus on effort and next steps.
</task>

<constraints>
- Use only the report. Do not invent national standards, grade boundaries or what a level means in another system.
- Do not label the child (lazy, gifted) or suggest diagnoses; raise concerns as questions for the school.
- If comments seem generic or copy-pasted, say they may say little about this child and ask for specifics.
- Keep the tone calm and supportive.
</constraints>

<output_format>
## The report in brief
Three or four sentences.

## What the grades mean
Bullets using the school's key.

## Strengths
Bullets with quotes.

## Things to watch
Bullets with quotes and plain meaning.

## Changes since last report
Table: Subject | Before | Now | Direction (or "No previous report supplied")

## Questions for the teacher
Numbered.

## How to talk to your child about it
Three or four bullets.
</output_format>

---
schema: 1
id: plan-super-curricular-reading
kind: prompt
title: Plan super-curricular reading
description: Plans wider reading, lectures and podcasts beyond the syllabus for a student applying to a selective university course, with a reading log that captures ideas to discuss in a statement or interview.
category: studying
version: 1.0.0
status: incubating
stage: [plan, learn]
role: [student]
requires: [none]
inputs: [topic, text, preferences]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [wider-reading, personal-statement, admissions-interview, reading-log]
pairs_with:
  prompts: [plan-university-application, practice-admissions-interview, coach-personal-statement]
args:
  - name: subject
    description: The degree subject you plan to apply for, e.g. "Economics", "Medicine", "History and Politics".
    type: string
    required: true
  - name: interests
    description: Optional. What already interests you in or near the subject, what you have read or watched, your school subjects, and where you are applying if known.
    type: text
  - name: months
    description: Months until the application or interview.
    type: number
    default: 6
output_contract:
  format: markdown
  sections: [Your threads, Month-by-month plan, Where to find sources, Reading log, Turning it into talk, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A student aged about 15-18 wants to go beyond the school syllabus in {{subject}} before applying to selective universities, over {{months}} months. Admissions tutors are not impressed by long lists of famous books; they look for curiosity that goes somewhere: a student who followed one idea through several sources, can explain an argument, disagree with part of it, and connect it to what they study. Plans fail by being too broad, by choosing books too hard to finish, by reading without notes so nothing can be discussed later, and by treating it as a tick-box for the personal statement.
</context>

<task>
{{#interests}}
<interests>
{{interests}}
</interests>
{{/interests}}

1. Propose two or three threads: specific questions within {{subject}} that build on the student's interests (for example in economics "Why do some countries stay poor?" rather than "development"). Each thread should be followable at the student's level and connect to the school syllabus.
2. For each thread, plan a mix of formats: one accessible book, two or three long articles or essays, one or two lectures or podcasts, and one active task (a short essay competition entry, a small data project, a debate, a summer school or online course, a mini research question).
3. Lay out a month-by-month plan for {{months}} months at about two to three hours a week: go deep on one thread at a time, finish each source, and end with something the student makes (a 500-word reflection, a talk to a school society).
4. Where to find sources: university outreach and subject pages, subject associations and learned societies, public lecture series, reputable magazines and newspapers' long-form sections, library catalogues, and the reading lists that university departments publish.
5. Reading log template capturing: source, main argument in two sentences, one piece of evidence, one thing I question or disagree with, link to my syllabus, where it led me next, and a 60-second spoken summary.
6. Turning it into talk: how to use the log for a personal statement (reflect on one or two sources in depth rather than listing many) and for interviews (practise explaining an argument and defending a view, expect "what would you say to someone who disagrees?").
</task>

<constraints>
- Do not name a book, article, lecture or podcast unless you are confident it exists, with its correct author or host. Mark every named source "verify it exists and suits your level". Where unsure, describe the kind of source and where to look.
- Do not claim any university requires specific reading or prefers certain sources.
- Keep the weekly time realistic alongside school work; check the total.
- Do not write personal statement text for the student.
- Never supply a list of titles for the student to mention without reading them. If asked, explain briefly that interviewers often ask about anything listed and that depth beats breadth, then offer one realistic thread.
- Respect the student's own interests; widen them, do not replace them.
</constraints>

<output_format>
## Your threads
Two or three numbered threads: the question, why it suits this student, the syllabus link.

## Month-by-month plan
Table: Month | Thread | Sources (by format) | Active task | Hours a week.

## Where to find sources
Bullets by source type.

## Reading log
A table template with the columns from step 5, and one filled example row for an invented source clearly labelled as an example.

## Turning it into talk
Bullets for the statement and for interviews, with three practice questions.

## Questions
What to confirm with the student.
</output_format>

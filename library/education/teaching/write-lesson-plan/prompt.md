---
schema: 1
id: write-lesson-plan
kind: prompt
title: Write a lesson plan
description: Writes a lesson plan with measurable objectives, timed activities, checks for understanding, differentiation, materials and an exit ticket. Use when planning a single lesson.
category: teaching
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
requires: [none]
inputs: [topic, preferences]
output: [plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [lesson-design, exit-ticket, formative-assessment]
pairs_with:
  prompts: [differentiate-lesson, design-classroom-activity, create-rubric]
  personas: [instructional-coach]
args:
  - name: topic
    description: What the lesson teaches, e.g. "comparing fractions with unlike denominators".
    type: string
    required: true
  - name: grade_level
    description: Grade, age or course, e.g. "Grade 5", "Year 9", "first-year undergraduate".
    type: string
    required: true
  - name: duration_minutes
    description: Lesson length in minutes.
    type: number
    default: 50
  - name: objectives
    description: Optional objectives or curriculum standards the lesson must meet. Without them, objectives are drafted.
    type: text
output_contract:
  format: markdown
  sections: [Overview, Objectives and success criteria, Materials, Lesson sequence, Differentiation, Anticipated misconceptions, Exit ticket]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A lesson plan earns its keep in the classroom, not on paper. Teachers need timings that add up, the exact questions to ask at key moments, and a way to know by the end of the lesson who learned what. Strong lessons follow a recognisable arc: activate prior knowledge, model the new idea explicitly, practise with support, practise independently, and check. Checks for understanding happen throughout, not only at the end.
</context>

<task>
Write a {{duration_minutes}}-minute lesson on **{{topic}}** for **{{grade_level}}**.
{{#objectives}}
Objectives or standards to meet:
<objectives>
{{objectives}}
</objectives>
{{/objectives}}

1. Write 1 to 3 measurable objectives (an observable verb, not "understand" or "learn about") and turn each into student-facing success criteria ("I can…"). If objectives were given, keep their intent and make them measurable.
2. Name the prior knowledge the lesson assumes and a 3 to 5 minute opener that checks or activates it.
3. Sequence the lesson with timings that sum exactly to {{duration_minutes}} minutes:
   - Opener / do-now
   - Explicit teaching and modelling (I do), with a worked example written out
   - Guided practice (we do), with the questions the teacher asks
   - Independent or collaborative practice (you do)
   - Exit ticket and closure
   Adjust the proportions to the age group and topic, but keep the teacher talk in any single block to about 10 to 15 minutes.
4. Embed at least two checks for understanding during the lesson (mini whiteboards, hinge question, cold call, thumbs) and say what the teacher does if many students get it wrong.
5. Give differentiation for students who need support, students ready for stretch, and multilingual learners.
6. List the 2 or 3 misconceptions students are likely to bring, and how the lesson addresses them.
7. Write a 2 to 4 question exit ticket tied to the success criteria, with answers.
</task>

<constraints>
- Be concrete: write the actual example problems, prompts and key questions, not "the teacher gives examples".
- Keep the content accurate and age-appropriate. If the topic is contested or sensitive for this age, note how to handle it.
- If a fact you need is missing (the curriculum, the class's prior unit, available technology), make a reasonable assumption and list it under Overview rather than stopping to ask.
- Use only materials a typical classroom has, unless the teacher listed others.
</constraints>

<output_format>
## Overview
Topic, grade, duration, and any assumptions.
## Objectives and success criteria
Objectives, then "I can…" statements.
## Materials
Bullets.
## Lesson sequence
A table: Time (minutes) | Phase | Teacher does | Students do | Check for understanding. The time column adds to {{duration_minutes}}. Put the worked example and key questions below the table.
## Differentiation
Support · Stretch · Multilingual learners, a few bullets each.
## Anticipated misconceptions
Misconception → how the lesson addresses it.
## Exit ticket
Numbered questions with answers.
</output_format>

---
schema: 1
id: plan-first-week-of-school
kind: prompt
title: Plan the first week of school
description: Plans the first week of a school year day by day, with relationship-building, routines to teach and practise, co-created expectations, low-stakes diagnostics and a family welcome message.
category: teaching
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
requires: [none]
inputs: [preferences, notes]
output: [plan, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [back-to-school, classroom-routines, classroom-community, relationship-building, classroom-management]
pairs_with:
  prompts: [design-classroom-management-plan, write-classroom-newsletter, write-lesson-plan]
  personas: [instructional-coach]
args:
  - name: grade_level
    description: Grade, age or course, e.g. "Kindergarten", "Grade 4", "Year 9 English, five classes".
    type: string
    required: true
  - name: class_context
    description: Optional context, e.g. class size, new or returning students, multilingual learners, students with support plans, co-teachers, school values or policies.
    type: text
  - name: schedule
    description: Optional timetable for the week, e.g. "full days Mon-Fri, 5 hours with me" or "three 50-minute periods with each class this week".
    type: text
output_contract:
  format: markdown
  sections: [Priorities for the week, Routines to teach, Day-by-day plan, Expectations co-creation, Getting to know students, Family welcome message, End-of-week check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The first week sets the norms students will test for the rest of the year. Two things matter most: students feel known and safe, and the routines that will run the room (entering, getting attention, transitions, materials, asking for help, finishing early) are taught explicitly, practised and reinforced like content, not announced once. Teachers who spend the week on rules lectures, or who jump straight into heavy content, usually spend October re-teaching routines. A good first week also starts real learning early, at a level where everyone can succeed, and gives the teacher a light read on where students are.
</context>

<task>
Plan the first week for **{{grade_level}}**.
{{#class_context}}
<class_context>
{{class_context}}
</class_context>
{{/class_context}}
{{#schedule}}
<schedule>
{{schedule}}
</schedule>
{{/schedule}}

1. Set 3 or 4 priorities for the week, in order.
2. List the 6 to 10 routines that matter most for this age and setting. For each, write the steps as students will learn them, how the teacher models it, how students practise it (including practising it wrong and fixing it, for younger classes), and how it will be reinforced in week 2.
3. Plan each day, fitted to the schedule if given (otherwise assume a typical schedule for the age and say so). Each day includes a relationship-building activity, one or two routines introduced or practised, a short piece of real learning in the subject at an accessible level, and a closing reflection.
4. Plan the expectations co-creation: how students help shape 3 to 5 positively stated class expectations, how they are linked to school rules or values if given, and what each looks like and sounds like.
5. Getting to know students: an interest or learning-profile survey (age-appropriate questions), a low-stakes diagnostic of key prior skills that is not graded, and how to learn names quickly and pronounce them correctly.
6. Write a family welcome message: who the teacher is, what the class will learn this year in a few lines, how to get in touch and when to expect replies, one question inviting families to share something about their child.
7. End-of-week check: how the teacher will know the week worked (routines running with fewer reminders, every student known by name, diagnostic results grouped).
</task>

<constraints>
- Activities must be inclusive: no "what I did on my holiday" tasks that expose differences in family income, no activities that require sharing personal or family details students may not want to share, and options for students who are shy, new to the language or new to the school.
- Keep teacher talk short at a time for the age (roughly the age in years plus a few minutes for younger students) and include movement.
- Every routine is described as observable steps, not values ("hands empty, eyes on me, voices off within 5 seconds", not "be respectful").
- Use only materials a typical classroom has.
- For secondary teachers with several classes, plan the routines once and say how to adapt the pacing across classes.
- If the grade or setting is unusual (for example an alternative provision or adult class), say what you assumed.
</constraints>

<output_format>
## Priorities for the week
Numbered.
## Routines to teach
Table: Routine | Steps for students | How it is modelled and practised | Reinforce in week 2.
## Day-by-day plan
One subsection per day: a time-blocked list with activity, purpose and materials.
## Expectations co-creation
Process, then a draft set with "looks like / sounds like".
## Getting to know students
Survey questions, diagnostic outline, name strategy.
## Family welcome message
The message, under about 200 words, with [placeholders].
## End-of-week check
Bullets.
</output_format>

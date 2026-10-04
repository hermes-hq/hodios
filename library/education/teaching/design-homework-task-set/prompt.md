---
schema: 1
id: design-homework-task-set
kind: prompt
title: Design a homework task set
description: Designs several weeks of short homework for a class built on retrieval and preparation for the next lesson, with time estimates, access for every pupil and quick checking routines.
category: teaching
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
subject: [education-sector]
requires: [none]
inputs: [text, topic]
output: [plan, table, quiz]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [homework, retrieval-practice, spaced-practice, pre-learning, equity]
pairs_with:
  prompts: [write-retrieval-practice-starters, create-knowledge-organiser, design-unit-plan]
args:
  - name: subject_and_year
    description: Subject and year group or age, e.g. "Year 7 geography" or "Grade 5 maths".
    type: string
    required: true
  - name: unit_topics
    description: The topics or lessons coming up in order, and the topics already taught that pupils should keep revisiting.
    type: text
    required: true
  - name: minutes_per_task
    description: How long each homework should take a typical pupil, in minutes.
    type: number
    default: 20
  - name: weeks
    description: How many weeks of homework to plan (one task per week unless the school policy says otherwise).
    type: number
    default: 6
output_contract:
  format: markdown
  sections: [Overview, Weekly tasks, Access for every pupil, Checking routine, Note for families]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A teacher wants homework for {{subject_and_year}} that is worth doing. Homework has the most value when it is short practice of things already taught (retrieval, spaced over weeks) or focused preparation for the next lesson, and when the teacher can check it quickly and uses it. It goes wrong when it is open-ended projects that measure parents' time and printers, when it introduces new content pupils cannot do alone, and when it is set but never checked, so pupils learn it does not matter.

Plan {{weeks}} weeks, about {{minutes_per_task}} minutes per task.
</context>

<task>
<unit_topics>
{{unit_topics}}
</unit_topics>

1. Map the weeks: for each week, the lesson topics that week and the earlier topics to revisit, mixing roughly half recent and half older content from week 2 onwards.
2. Design one task per week from these types, varying them across the half term: a retrieval quiz with answers to self-check; a short practice set on a taught skill; pre-reading or a vocabulary task that prepares the next lesson, with three questions to bring; a "fix it" task correcting common errors; a brain dump on a topic then check against notes.
3. For each task, give the instructions in pupil-friendly words, what to hand in or bring, a realistic time estimate checked against {{minutes_per_task}} minutes for a typical pupil, and the content itself where it is short (questions with answers, vocabulary list).
4. Make it work for everyone: every task can be done on paper without a device or internet, without an adult's help, and without buying anything; say where printed copies and homework club fit, and give a shorter "core" version for pupils with heavy support needs.
5. Plan checking in under five minutes of lesson time: self-marking against answers at the start of the lesson, a hinge question based on the homework, or sampling five books. Say how the teacher uses what they find.
</task>

<constraints>
- Use only the topics given. If prior topics are not listed, ask for them and plan the first two weeks on current topics only.
- No new content that has not been or will not be taught first, apart from preparation tasks with support built in.
- No tasks that rely on parents' knowledge, money, printing at home or internet access. If the user asks for a home project (a model, a researched poster), explain briefly who it disadvantages and offer retrieval or preparation tasks on the same content instead.
- Check every answer you supply.
- Follow the school's homework policy if the user mentions one; if minutes per task seem too long for the age (for example an hour for pupils aged 5 to 7), say so and plan to a shorter time you name, marked as a suggestion to check against the policy.
</constraints>

<output_format>
## Overview
Table: Week | Lesson topics | Revisit topics | Task type.

## Weekly tasks
For each week: heading "Week N", then instructions, the task content, the answers, and the time estimate.

## Access for every pupil
Bullets.

## Checking routine
Bullets: how each task is checked in class and what the teacher does with the results.

## Note for families
A short message (under 120 words) on what homework is for and how to help without doing it.
</output_format>

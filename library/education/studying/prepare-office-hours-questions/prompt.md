---
schema: 1
id: prepare-office-hours-questions
kind: prompt
title: Prepare questions for office hours
description: Turns a student's confusion into precise, prioritised questions for a lecturer's office hours or tutor meeting, each stating what was tried and where it broke, sized to the slot.
category: studying
version: 1.0.0
status: incubating
stage: [plan]
role: [student]
requires: [none]
inputs: [text, notes]
output: [questions, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [office-hours, help-seeking, first-generation-students, tutor-meetings]
pairs_with:
  prompts: [understand-assignment-brief, explain-university-jargon, run-study-group-session]
  personas: [study-coach]
args:
  - name: what_im_stuck_on
    description: What you are confused about, in your own words. Include the course, what you tried, the problem or passage, and anything you already looked at. Messy is fine.
    type: text
    required: true
  - name: minutes
    description: How long the meeting or slot is.
    type: number
    default: 10
output_contract:
  format: markdown
  sections: [Before you go, Your questions, Opening line, What to bring, If time runs out]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Office hours and tutor meetings are for every student, not only for those who are failing, but many students, especially the first in their family at university, are unsure what to ask or worry about wasting the lecturer's time. Vague questions ("I don't get chapter 5") lead to a re-run of the lecture. Precise questions ("I followed the derivation up to equation 3, but I can't see why the second term disappears") get precise help. Short slots fill fast, so questions need an order.

Slot length: {{minutes}} minutes.
</context>

<task>
<stuck>
{{what_im_stuck_on}}
</stuck>

1. Separate the confusion into distinct questions. Sort each into:
   - Understanding: a concept, step or reading they cannot follow.
   - Expectations: what an assignment wants, how it is marked, what "critical" means on this course; only the lecturer can answer these.
   - Self-serve: answerable from the syllabus, course handbook, textbook or announcements; suggest checking there first and drop it from the list unless it is still unclear after checking.
2. For each question to ask, write: what I'm trying to do, what I tried, where it breaks (the exact step, line, page or sentence), my current guess, the question itself in one sentence.
3. Order by priority: what blocks the most later work first, then expectations questions with the nearest deadline. Plan roughly one question per 3 to 4 minutes; mark the rest "if time".
4. Write a two-sentence opening line: who they are (name, course, which seminar group) and what they want to cover.
5. List what to bring: the attempt, the page or slide references, the assignment brief.
6. Write a short plan for if time runs out: which question to send by email afterwards, with a 3 to 4 sentence email template that a busy lecturer can answer quickly.
</task>

<constraints>
- Do not answer the subject questions here; the point is to prepare for the meeting. If one item is a quick self-serve fact, say where to look.
- Keep the student's own words where possible so the questions sound like them.
- Do not invent what the student tried; where an attempt is missing, write "[what I tried: add this]" and suggest trying one specific thing first.
- If the confusion is too vague to turn into a question ("everything"), ask two or three questions to narrow it (which week, which task, which part of it) and stop.
- Polite and direct tone; no over-apologising.
</constraints>

<output_format>
## Before you go
2 or 3 bullets: self-serve items to check first and where.

## Your questions
Numbered in priority order. Each: **Trying to:** / **Tried:** / **Breaks at:** / **My guess:** / **Question:** lines. Mark lower ones "(if time)".

## Opening line
Two sentences.

## What to bring
Bullets.

## If time runs out
Which question to email, and the email template.
</output_format>

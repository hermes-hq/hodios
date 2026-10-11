---
schema: 1
id: turn-course-into-book
kind: prompt
title: Turn a course or workshop into a book
description: Plans how to turn a course, workshop or training programme into a nonfiction book, restructuring lessons into chapters with stories, replacing live interaction and listing what must be newly written.
category: nonfiction
version: 1.0.0
status: incubating
stage: [plan]
role: [writer, teacher, consultant]
requires: [none]
inputs: [document, notes]
output: [plan, outline]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [course-to-book, workshop-material, repurposing, prescriptive-books, restructuring]
pairs_with:
  prompts: [outline-nonfiction-book, design-signature-framework, write-chapter-exercises]
args:
  - name: course_material
    description: The course outline with modules or sessions, slide or handout notes, the exercises, common questions participants ask, and stories you tell when teaching.
    type: text
    required: true
  - name: reader
    description: Who the book is for, and whether they are the same people who take the course.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Course versus book, Book structure, Replacing the live parts, New writing needed, Relationship to the course]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help trainers and teachers turn courses into books. A course works because of things a book lacks: the teacher's presence, discussion, questions in the moment, practice with feedback, and pacing across weeks. Slides are fragments that rely on the speaker. Books built by pasting modules end-to-end read like handouts. A book needs an argument that runs through every chapter, prose that does the explaining the teacher did aloud, the stories told in the room written as scenes, participants' frequent questions answered in the text (often the best material), and exercises that work without a facilitator. Readers of the book may also be at a different level from course participants.

<course_material>
{{course_material}}
</course_material>
Reader: {{reader}}
</context>

<task>
1. Course versus book: what in the course carries over, what depended on live delivery, and whether the book reader differs from the course participant.
2. Book structure: a reader promise and a chapter outline. Map each chapter to the modules it draws on; merge, split or reorder modules where the reading journey needs it, and say why.
3. Replacing the live parts: for each live element (discussion, role play, feedback, Q&A), how the book replaces it (worked examples, self-check questions, common-mistakes sections, the FAQs turned into text).
4. New writing needed: per chapter, the explanations, stories and transitions to write from scratch, and an estimate of how much of the book is new versus adapted.
5. Relationship to the course: how the book and course can support each other without the book reading like an advert, and anything to check about who owns the course material if it was developed for an employer or client.
</task>

<constraints>
- Use only material in the input; do not invent stories, participant quotes or results.
- Do not keep slide bullet structure in the proposed chapters; plan prose.
- Do not give legal advice on ownership; flag it as something to check in the relevant agreement.
</constraints>

<output_format>
## Course versus book

## Book structure
Reader promise, then table: Chapter | Modules used | Change and why.

## Replacing the live parts
Table: Live element | Book replacement.

## New writing needed
Per chapter, plus the new-versus-adapted estimate.

## Relationship to the course
</output_format>

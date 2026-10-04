---
schema: 1
id: choose-note-taking-method
kind: prompt
title: Choose a note-taking method
description: Recommends a note-taking method for each course (Cornell, outline, mapping, charting, sentence or problem notes) from how it is taught and assessed, with templates and when to switch.
category: studying
version: 1.0.0
status: incubating
stage: [plan, learn]
role: [student]
requires: [none]
inputs: [text]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [cornell-notes, mind-mapping, lecture-notes, note-templates]
pairs_with:
  prompts: [convert-lecture-notes-to-cornell, review-notes-for-gaps, read-textbook-actively]
args:
  - name: courses
    description: Each course or subject, how it is taught (live lectures, recorded videos, slides shared in advance, textbook chapters, labs, seminars) and how it is assessed (multiple choice, essays, problem sets, practicals, oral exams).
    type: text
    required: true
  - name: delivery
    description: How you mostly take in content across your courses, if it is the same for all of them.
    type: enum
    enum: [lectures, textbook, slides, mixed]
    default: mixed
output_contract:
  format: markdown
  sections: [Recommendations, Templates, After class, When to switch, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A student starting new courses wants to know how to take notes in each. Most students use one method for everything, usually copying slides or transcribing the lecturer, which feels productive but produces notes that are long, passive and hard to revise from. The right method depends on two things: how the content arrives (structured or rambling, fast or slow, visual or verbal, already on slides or not) and how it will be assessed (recall of facts, comparing things, building an argument, solving problems). Main delivery mode: {{delivery}}.

The methods:
- Cornell: notes column, cue column for questions, summary at the bottom. Best for concept-heavy lectures that will be tested by recall, because the cue column becomes self-testing.
- Outline: indented headings and points. Best for well-structured lectures and textbooks with a clear hierarchy.
- Mapping: a central idea with linked branches. Best for content about relationships and causes, and for seeing how a topic fits together; weak for fast, detailed lectures.
- Charting: a table with a column per attribute. Best when many items are compared on the same features (periods, theories, organisms, drug classes, case law).
- Sentence: one numbered line per new point. Best for fast or unstructured lectures where the structure only appears later.
- Problem notes: worked example, method in words, why each step, a common mistake. Best for maths, physics, accounting, programming.
</context>

<task>
<courses>
{{courses}}
</courses>

1. For each course, note its delivery (structured or not, pace, slides in advance or not) and its main assessment type.
2. Recommend one main method per course and, where useful, a second for a specific part (for example charting for a comparison-heavy unit). Give the reason in one line tied to delivery and assessment.
3. If slides are shared in advance, recommend annotating them rather than copying them, and say what to add: examples, the lecturer's emphasis, questions, links.
4. For live lectures, recommend paraphrasing over verbatim transcription whether on paper or a laptop, and a shorthand list of five to ten symbols.
5. Give a ready-to-copy template for each method you recommend, as plain text or a markdown table.
6. Add an after-class routine: a review within 24 hours that fills gaps, writes cue questions and a three-line summary, and a weekly self-test from the cue questions.
7. Say what signals that a method is not working and what to switch to.
</task>

<constraints>
- Use only what the student said about each course. If the delivery or assessment of a course is unclear, give a provisional choice, mark it [check], and ask.
- Do not claim one method is proven best for everyone; the evidence favours notes that are paraphrased, organised and later used for self-testing over any particular layout.
- Keep each template short enough to fit on half a page.
- Do not recommend specific paid apps; describe features (handwriting, tagging, linking) instead.
</constraints>

<output_format>
## Recommendations
Table: Course | How it is taught | How it is assessed | Main method | Second method (optional) | Why.

## Templates
One short template per recommended method, under its own bold label.

## After class
A checklist for the 24-hour review and the weekly self-test.

## When to switch
Table: Warning sign | What it means | Switch to.

## Questions
Anything unclear, plus provisional choices to confirm.
</output_format>

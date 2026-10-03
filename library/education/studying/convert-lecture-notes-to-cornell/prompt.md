---
schema: 1
id: convert-lecture-notes-to-cornell
kind: prompt
title: Convert lecture notes to Cornell format
description: Converts raw lecture notes into Cornell format with cue questions, a summary and a list of gaps to check, then explains how to review them. For students who take notes but never revisit them.
category: studying
version: 1.0.0
status: incubating
stage: [learn, review]
role: [student]
requires: [none]
inputs: [notes, text]
output: [table, summary, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [cornell-method, retrieval-practice, lecture-notes, self-testing]
pairs_with:
  prompts: [make-flashcards, review-notes-for-gaps, make-study-guide]
  personas: [study-coach]
args:
  - name: notes
    description: The raw lecture notes, pasted as they are, with abbreviations, arrows and half-sentences. Typed or transcribed handwriting both work.
    type: text
    required: true
  - name: course
    description: Optional course and topic, for example "Year 1 Cell Biology, lecture 4 on membranes". Helps expand abbreviations and pitch the cue questions.
    type: string
output_contract:
  format: markdown
  sections: [Cornell notes, Summary, Gaps to check, How to review these notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The Cornell method splits a page into a notes column, a cue column of questions and keywords, and a summary at the bottom. The value is not the layout: it is that the cue column turns notes into a self-test, and the summary forces the student to say what the lecture was about. Most students' raw notes are a transcript of slides with gaps where the lecturer went fast. The job is to restructure what the student wrote, not to rewrite the lecture from general knowledge.
</context>

<task>
Convert these notes into Cornell format{{#course}} for {{course}}{{/course}}.

<notes>
{{notes}}
</notes>

1. Read all the notes first and split them into 3 to 8 sections, one per idea or subtopic the lecture covered, in the lecture's order.
2. For each section, write the notes column: the student's points cleaned up into short lines. Expand abbreviations only when the meaning is clear; keep the student's wording where it is accurate; keep any examples, numbers and diagrams they recorded (describe a diagram in one line).
3. For each section, write 1 to 3 cue questions. Each must be answerable from that section's notes and must ask for recall or understanding ("Why does X cause Y?", "What are the three stages of Z?"), not just name a keyword. Include at least one "why" or "how" question per lecture.
4. Write a summary of 3 to 5 sentences: the lecture's main idea, how the sections connect, and the one thing most likely to be examined.
5. List the gaps to check: places where a note stops mid-thought, a term is used but never defined, a step is missing, two notes contradict each other, or a statement looks wrong. Quote the note and say what to check and where (slides, textbook, lecturer).
6. Explain how to review these notes, adapted to this lecture.
</task>

<constraints>
- Do not add facts the student did not write. If something important seems missing, it goes in "Gaps to check", never silently into the notes column.
- If a note looks factually wrong, leave it in the notes column marked "(check)" and explain in "Gaps to check" what you believe is correct and why. Never fix an error silently: the student needs to know their notes were wrong.
- Cue questions must not contain their own answers.
- If the notes are too short or fragmentary to structure (a few words, a single line), say what you need and stop.
</constraints>

<output_format>
## Cornell notes
One table per section, headed with the section name:
| Cue | Notes |
Cue questions in the left column, aligned with the notes they test.
## Summary
3 to 5 sentences.
## Gaps to check
Numbered: the quoted note, what is missing or doubtful, where to check.
## How to review these notes
A short routine: within 24 hours, cover the notes column and answer the cue questions aloud, then check; mark the ones missed; repeat the missed ones after 2 to 3 days and again after a week; turn persistent misses into flashcards. Add one line on what to do with the gaps before the next lecture.
</output_format>

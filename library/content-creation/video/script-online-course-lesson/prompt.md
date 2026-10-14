---
schema: 1
id: script-online-course-lesson
kind: prompt
title: Script an online course lesson
description: Scripts a lesson video for an online course with one objective, short segments, on-screen cues, a worked example, a practice task and a recap, using only your source material.
category: video
version: 1.0.0
status: incubating
stage: [build]
role: [teacher, content-creator]
requires: [none]
inputs: [notes, document, topic]
output: [script, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [online-course, lesson-video, worked-example, learning-objective, on-screen-text]
pairs_with:
  prompts: [plan-paid-online-course, write-tutorial-video-script, adapt-script-for-teleprompter]
args:
  - name: lesson
    description: The lesson topic, where it sits in the course (what came before and after), and your source material - notes, slides, a chapter or an outline.
    type: text
    required: true
  - name: learners
    description: Who takes the course, what they already know and why they enrolled.
    type: text
  - name: length_minutes
    description: Target runtime in minutes.
    type: number
    default: 8
output_contract:
  format: markdown
  sections: [Objective, Lesson plan, Script, On-screen list, Practice and recap]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You script lesson videos for online courses, the kind a teacher, trainer or expert records to camera with slides, a whiteboard or screen. Learners watching course lessons have chosen to learn, but they still drift: long lessons lose them, and many watch on phones. Instructional designers keep each video short with one objective a learner could demonstrate, connect it to what the learner already knows, show a worked example before asking the learner to try, and finish with retrieval (a recap question or task) rather than a summary they passively hear. Slides should carry keywords, diagrams and examples; a presenter reading the full slide text aloud splits attention and slows learning. A lesson that tries to cover three ideas is usually three lessons.
</context>

<task>
<lesson>
{{lesson}}
</lesson>

<learners>
{{learners}}
</learners>

Runtime: about {{length_minutes}} minutes (about 140 spoken words a minute for teaching pace).

1. Write one learning objective in the form "By the end, you can ..." with an observable verb (calculate, identify, write, choose), not "understand". If the material covers more than fits the runtime, propose the split into lessons and script only the first.
2. Plan the lesson in segments of no more than about three minutes: opening (why this matters and a link to the previous lesson), concept, worked example, common mistake, practice prompt, recap.
3. Opening: start with a problem, question or example the learner cares about, not "Hi, welcome to lesson 4".
4. Concept: explain in plain language with one analogy or picture if it helps, using only the source material.
5. Worked example: walk through one example step by step, saying the reasoning out loud, with on-screen cues for what appears when.
6. Name the most common mistake learners make with this idea and how to spot it, if the source material supports it.
7. Practice and recap: one short task or question the learner does with the video paused, then the answer, then a three-point recap and a pointer to the next lesson.
</task>

<constraints>
- Use only facts, definitions and examples from the source material. If the material is thin or a needed example is missing, insert `[EXAMPLE: ...]` or `[CHECK: ...]` placeholders rather than inventing content, figures or citations.
- On-screen text is keywords, labels and examples, never paragraphs of the spoken script.
- Do not claim the course leads to a certificate, accreditation, job or result unless the input says so.
- Keep the vocabulary at the learners' level; define any term on first use.
</constraints>

<output_format>
## Objective
The objective, plus any proposed split.

## Lesson plan
Table: segment | minutes | purpose.

## Script
Blocks headed with approximate timestamps and segment names. Spoken lines as paragraphs; cues on their own lines as `[SLIDE: ...]`, `[ON SCREEN: ...]`, `[WHITEBOARD: ...]` or `[PAUSE THE VIDEO]`.

## On-screen list
Numbered list of every slide or graphic with its exact text or content.

## Practice and recap
The practice task with its answer, the three recap points, and every placeholder; then the word count and estimated runtime.
</output_format>

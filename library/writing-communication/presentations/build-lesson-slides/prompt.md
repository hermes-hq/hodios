---
schema: 1
id: build-lesson-slides
kind: prompt
title: Build slides for a school lesson
description: Builds slides for one school lesson with a retrieval starter, explanation in small chunks, worked examples, checks for understanding, independent practice and low text on every slide.
category: presentations
version: 1.0.0
status: incubating
stage: [plan, design]
role: [teacher]
requires: [none]
inputs: [topic, document, notes]
output: [outline, quiz]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [lesson-slides, cognitive-load, worked-examples, retrieval-practice, classroom]
pairs_with:
  prompts: [write-lesson-plan, write-retrieval-practice-starters, make-presentation-accessible]
args:
  - name: lesson
    description: Subject, topic and the learning objective for this lesson, for example "Year 8 science, the particle model of states of matter".
    type: text
    required: true
  - name: class_context
    description: Age or grade, prior learning, lesson length, and any needs to plan for, such as students learning the language of instruction or reading difficulties.
    type: text
    required: true
  - name: content
    description: Your lesson plan, scheme of work notes, textbook pages or key content the slides must teach. Optional but recommended.
    type: text
output_contract:
  format: markdown
  sections: [Lesson objective and success criteria, Lesson flow, Slide-by-slide plan, Checks for understanding with answers, Practice task, Teacher notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help teachers turn a lesson into slides that support teaching rather than replace it. Slide decks for lessons often fight learning: paragraphs of text that students read while the teacher talks (splitting attention), decorative images and animations, ten new ideas on one slide, and a single question at the end that only confident students answer. Classroom practice that works, drawing on cognitive load theory and Rosenshine's principles: start with a short low-stakes retrieval starter on earlier material; state the objective in student-friendly words; introduce new material in small steps; model with a worked example, then a partly completed one, then let students try (I do, we do, you do); check understanding of the whole class (mini whiteboards, hinge questions, cold call) before moving on; and end with independent practice and an exit check. Text on slides is minimal and placed next to the diagram it explains; the teacher's words carry the explanation.

Lesson: {{lesson}}
Class: {{class_context}}
{{#content}}
<content>
{{content}}
</content>
{{/content}}
</context>

<task>
1. Restate the objective in student-friendly words and write two or three success criteria students can check themselves against.
2. Plan the lesson flow with minutes that fit the lesson length: retrieval starter, objective, explanation in small steps, worked example, guided practice, check for understanding, independent practice, exit check.
3. Write the slide-by-slide plan. For each slide: title, what is on screen (minimal text, diagram or image description, example), and what the teacher says or does. Keep one idea per slide; split anything heavier.
4. Write the retrieval starter (4 to 5 quick questions on prior learning, with answers), the worked example with each step shown, a partly completed example for "we do", and a hinge question with plausible wrong answers that reveal specific misconceptions.
5. Write the independent practice task with increasing difficulty and an extension, and a two- or three-question exit check, all with answers.
6. Add teacher notes: common misconceptions for this topic, where students usually get stuck, and adaptations for the needs listed (key vocabulary with definitions, sentence starters, larger font, fewer items on a slide).
</task>

<constraints>
- Keep subject content accurate to the source provided; where you add standard content beyond the source, keep it to well-established facts for this level and flag anything that depends on the local curriculum or exam board.
- No more than about 20 words of body text on an explanation slide; no decorative images or effects.
- Every check for understanding gives answers and says what a wrong answer tells the teacher.
- Age-appropriate examples and language; do not include personal data about students.
- Fit the stated lesson length; if the content will not fit, say what to move to the next lesson.
</constraints>

<output_format>
## Lesson objective and success criteria
Objective and bullets.

## Lesson flow
Table: Phase | Minutes | What happens.

## Slide-by-slide plan
Table: # | Slide title | On screen | Teacher says or does.

## Checks for understanding with answers
Starter, hinge question, exit check, each with answers and misconception notes.

## Practice task
Questions in order of difficulty, extension, answers.

## Teacher notes
Misconceptions, sticking points, adaptations.
</output_format>

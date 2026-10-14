---
schema: 1
id: plan-novel-study-unit
kind: prompt
title: Plan a class novel study
description: Plans a whole-class novel study with a reading schedule by chapter, vocabulary, discussion questions, varied activities, comprehension check-ins and an end-of-unit task.
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
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
subject: [english, literature]
tags: [novel-study, class-reader, reading-schedule, literature-unit]
pairs_with:
  prompts: [design-unit-plan, generate-discussion-questions, plan-socratic-seminar, create-rubric]
args:
  - name: novel
    description: Title and author of the novel.
    type: string
    required: true
  - name: grade_level
    description: Grade, age or course.
    type: string
    required: true
  - name: weeks
    description: Number of weeks, and lessons per week, e.g. "5 weeks, 4 lessons a week".
    type: string
    required: true
  - name: chapter_list
    description: Optional chapter list or page counts from the edition you use, so the schedule is accurate.
    type: text
  - name: priorities
    description: Optional focus, e.g. "theme of belonging", "build stamina for weak readers", "ends with an essay".
    type: text
output_contract:
  format: markdown
  sections: [Unit overview, Reading schedule, Chapter guide, Activities and check-ins, End-of-unit task, Sensitive content and supports, Assumptions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Class novel studies go wrong in predictable ways: the reading load is uneven so some weeks are impossible, every lesson becomes chapter questions and recall quizzes, weaker readers fall behind and never catch up, and the end task is disconnected from what was discussed. Good studies have a clear thread (a theme or essential question) revisited as the book develops, a mix of reading modes (teacher read-aloud, independent, audio, partner), short regular comprehension check-ins rather than long quizzes, and activities that build toward the final task. They also prepare for sensitive content in the book before students meet it.
</context>

<task>
Plan a novel study of **{{novel}}** for **{{grade_level}}** over {{weeks}}.
{{#chapter_list}}
Chapters and lengths in our edition:
<chapter_list>
{{chapter_list}}
</chapter_list>
{{/chapter_list}}
{{#priorities}}
Priorities: {{priorities}}
{{/priorities}}

1. State what you know about the novel with confidence (main plot, themes, characters) and what you are unsure of. If you do not know the novel well, say so plainly, base the plan on the chapter list and the teacher's notes, and mark chapter-specific content for the teacher to fill.
2. Choose an essential question or thread for the unit and the 3 or 4 big ideas students should be able to discuss at the end.
3. Build a reading schedule that spreads pages evenly across lessons, says which reading mode each section uses, and leaves catch-up time each week. If the chapter list was not given, schedule by chapter ranges and tell the teacher to check page counts.
4. For each chapter or chapter group give: 4 to 6 vocabulary words worth teaching, 3 or 4 discussion questions (at least one tied to the essential question), and the key events to check comprehension on.
5. Plan varied activities across the unit (character tracking, quote analysis, debates, creative responses, context mini-lessons) and a short weekly comprehension check-in with a reteach plan.
6. Design the end-of-unit task tied to the essential question with success criteria, and show how earlier activities build toward it.
7. Flag sensitive content the teacher should prepare for (violence, racism, grief, language) and plan supports: audio versions, chapter summaries for catch-up, pre-teaching for multilingual learners, and stretch.
</task>

<constraints>
- Never invent plot details, characters, chapter contents or quotations. If unsure, leave a [teacher to confirm] placeholder rather than guessing.
- Do not reproduce long passages from the novel; refer to chapters and short phrases only.
- Reading load per lesson must be realistic for the grade; say the pages or chapters per lesson.
- Handle sensitive content factually and respectfully; recommend informing families where the school's policy expects it.
</constraints>

<output_format>
## Unit overview
Novel, grade, essential question, big ideas, what you are confident and unsure about.
## Reading schedule
A table: Week | Lesson | Chapters/pages | Reading mode | Focus.
## Chapter guide
Per chapter or group: vocabulary, discussion questions, key events.
## Activities and check-ins
Activities by week; check-in format and reteach plan.
## End-of-unit task
Task, success criteria, how the unit builds to it.
## Sensitive content and supports
Content flags, supports, stretch.
## Assumptions
Edition, pacing and class assumptions.
</output_format>

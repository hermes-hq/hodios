---
schema: 1
id: plan-task-based-language-lesson
kind: prompt
title: Plan a task-based language lesson
description: Plans a group language lesson in the task-based cycle, from pre-task and task to planning, report and a language focus drawn from what learners needed, with timings, monitoring notes and a fallback.
category: language-learning
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
requires: [none]
inputs: [notes, text]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [task-based-learning, tblt, lesson-plan, focus-on-form, monitoring, communicative-teaching]
pairs_with:
  prompts: [design-language-class-activity, analyse-target-language-for-lesson, reflect-on-taught-language-lesson]
  personas: [language-teacher-trainer]
args:
  - name: target_language
    description: The language being taught.
    type: string
    required: true
  - name: goal_and_learners
    description: What learners need to be able to do in real life, plus the class - size, ages, first languages, lesson length, room or online, and what they studied recently.
    type: text
    required: true
  - name: level
    description: The class's CEFR level.
    type: enum
    enum: [A1, A2, B1, B2, C1, C2]
    default: B1
output_contract:
  format: markdown
  sections: [Task and outcome, Lesson plan, Materials, Monitoring sheet, Language focus options, Fallback]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a {{target_language}} teacher run a task-based lesson for a group at CEFR {{level}}. In task-based learning the lesson is built around a task with a real outcome (a decision, a plan, a ranked list, a solved problem) and the language focus comes after the task, from what learners actually needed. Teachers new to it often slip back into "present, practise, produce" with a role-play at the end; set "tasks" that are exercises in disguise (no outcome, no gap); skip the planning stage, so the report is no better than the task; and run a language focus unrelated to what they heard.

<class>
{{goal_and_learners}}
</class>
</context>

<task>
1. Choose one task linked to the real-life goal. Check it has: a focus on meaning, a gap (information, reasoning or opinion), learners using their own language resources, and an outcome you can see. Name the task type (listing, ordering and sorting, comparing, problem-solving, sharing experiences, creative).
2. Plan the lesson (use the lesson length given; if none, 60 minutes) in these stages, with timings:
   - Pre-task: introduce the topic, activate words and chunks they will need (brainstorm, picture, short model of a similar task with a different topic so they cannot copy it), give clear task instructions and the outcome.
   - Task: pairs or small groups do the task; the teacher monitors and does not correct.
   - Planning: groups prepare to report to the class, drafting what they will say; the teacher now helps with language on request.
   - Report: groups present or compare outcomes; the class reacts with a real follow-up question or vote.
   - Language focus: analysis and practice of 2-3 items drawn from monitoring notes and the report, chosen at the end, not before.
3. For each stage give the purpose, the teacher's exact instructions in {{target_language}} at {{level}}, what learners do, the interaction pattern and the instruction-checking questions.
4. Write the materials in full: task cards or the input text, the model of a similar task, a planning frame.
5. Write a monitoring sheet the teacher uses during the task: columns for "useful language they used", "language they needed but lacked", "errors on structures they know", "good strategies".
6. Predict the language the task is likely to need and offer 3-4 candidate focus items with a short analysis and a practice activity each, labelled as options to choose from after monitoring, not a fixed plan.
7. Give a fallback: what to do if the task finishes in 5 minutes (extend with a constraint or a twist), and if groups stall (a hint card or a simpler version).
</task>

<constraints>
- The task comes before any explicit grammar presentation.
- The task must have an outcome that can be compared or judged; a "discuss X" task is not enough.
- Do not invent learner details; if the lesson length or class size is missing, state the assumption.
- At A1 and A2, allow more pre-task support (a model, chunks on the board) but keep the task outcome-based.
</constraints>

<output_format>
## Task and outcome
Task, type, outcome, why it fits the goal.
## Lesson plan
Table: Stage | Minutes | Purpose | Teacher says | Learners do | Interaction. Total on the last line.
## Materials
Each under its own ### heading.
## Monitoring sheet
The four-column grid, ready to print.
## Language focus options
3-4 items, each with analysis and a practice activity.
## Fallback
</output_format>

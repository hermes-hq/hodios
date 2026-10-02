---
schema: 1
id: plan-substitute-lesson
kind: prompt
title: Plan a lesson for a substitute teacher
description: Writes substitute-teacher plans a stranger can run, with schedule, routines, a self-contained lesson and materials, behaviour notes and an end-of-day report form. For teachers planning an absence.
category: teaching
version: 1.0.1
status: incubating
stage: [plan]
role: [teacher]
requires: [none]
inputs: [notes, text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [substitute-teacher, cover-lesson, sub-plans, classroom-routines]
pairs_with:
  prompts: [write-lesson-plan, design-classroom-activity, design-classroom-management-plan]
args:
  - name: class_details
    description: Grade or year, subject, class size, period times, room, where materials are, the usual routines, and a helpful colleague nearby. No student surnames or confidential details.
    type: text
    required: true
  - name: topic
    description: What the class should work on, ideally something that reviews or practises recent learning rather than new content.
    type: string
    required: true
  - name: duration
    description: Optional length, e.g. "one 50-minute period", "full day, 6 periods".
    type: string
  - name: special_notes
    description: Optional need-to-know notes, e.g. "one student has an allergy action plan in the red folder", "two students may leave early for music", "no devices this week".
    type: text
output_contract:
  format: markdown
  sections: [At a glance, Schedule, Routines, Lesson, Materials, Behaviour and support, If things go wrong, End-of-day report]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.1, note: "A multi-period day gets one lesson block per period, with other classes marked for confirmation."}
  - {version: 1.0.0, note: "First version."}
---
<context>
A substitute walks into an unfamiliar room, with unfamiliar students and systems, often with ten minutes to read the plans. Plans that work are scannable, self-contained and realistic: a lesson that reviews or practises what the class already knows, every material named and located, routines spelled out so the class keeps its normal shape, and a fallback when the technology or the timing fails. Students behave better when the day looks like a normal day.
</context>

<task>
Write substitute plans for this class{{#duration}} for {{duration}}{{/duration}}, on: {{topic}}.

<class_details>
{{class_details}}
</class_details>
{{#special_notes}}
<special_notes>
{{special_notes}}
</special_notes>
{{/special_notes}}

1. **At a glance:** half a page the substitute can read in two minutes: class, room, times, where everything is, the one most important thing to know, and who to contact for help.
2. **Schedule:** each period or block with times and what happens.
3. **Routines:** entry and starter, attendance, bathroom and leaving the room, devices, transitions, packing up and dismissal, written as the students already do them. Where the details do not say, write a simple, sensible routine and mark it "[confirm]".
4. **Lesson:** a self-contained lesson on {{topic}} that a non-specialist can run. Prefer review and practice of recent learning over new content. Give timings, exact instructions to read aloud, the task with answers or an answer key for anything the substitute must check, an early-finisher task, and how work is collected. Avoid anything that depends on the regular teacher's judgement, specialist equipment or unreliable technology. For a day of several periods, give each period its own lesson block; if the periods are different classes or subjects and only one topic was given, plan the topic for the class it fits and mark the others "[confirm topic]" with a sensible review task.
5. **Materials:** a checklist of everything needed, with where each item is and how many copies.
6. **Behaviour and support:** the class's usual expectations and positive routines, the response steps the school uses, and only the need-to-know support or health information from the notes (for example, where an allergy action plan is kept), in neutral language. Name student helpers by first name only if the teacher gave them.
7. **If things go wrong:** a no-tech backup activity, what to do if the lesson runs short or long, and who to call for behaviour, medical or safety issues (pointing to the school's emergency procedures).
8. **End-of-day report:** a form the substitute fills in.
</task>

<constraints>
- Do not include confidential information beyond what the substitute needs to keep students safe and run the day; no diagnoses, family details or behaviour histories.
- Do not invent school procedures, names or room numbers; use [placeholders] for anything not given.
- Instructions must be runnable by someone who does not know the subject well; if the topic needs specialist knowledge, adapt the task so it does not (answer keys, worked examples).
- If the topic or class details are too thin to plan from, list what is missing and give a sensible default for each, marked "[confirm]".
</constraints>

<output_format>
Use the section headings from the output contract. Keep "At a glance" to a short list. Schedule and Materials as tables or checklists. Lesson as numbered steps with times and quoted instructions. End-of-day report as a fill-in form: Attendance notes | What was completed | Students who helped | Issues and how they were handled | Notes for the teacher.
</output_format>

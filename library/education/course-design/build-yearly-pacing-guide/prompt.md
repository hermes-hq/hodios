---
schema: 1
id: build-yearly-pacing-guide
kind: prompt
title: Build a yearly pacing guide
description: Builds a one-year pacing guide from standards or a textbook, with real instructional days counted, dated units, assessments, buffer days, review weeks and rules for falling behind.
category: course-design
version: 1.0.0
status: incubating
stage: [plan, design]
role: [teacher]
subject: [education-sector]
requires: [none]
inputs: [text, document, preferences]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [pacing-guide, school-calendar, unit-planning, priority-standards, buffer-days, test-review]
pairs_with:
  prompts: [build-scope-and-sequence, design-unit-plan, align-lesson-to-standards]
args:
  - name: course
    description: Subject, grade or year group, and what the year must cover, for example "Grade 8 science, state standards" or "Year 10 maths, chapters 1 to 12 of our textbook".
    type: string
    required: true
  - name: calendar
    description: First and last teaching day, holidays and breaks, testing windows, school events, and how often the class meets.
    type: text
    required: true
  - name: content
    description: Optional. The standards, units or textbook chapters to pace, with any marked as priority, and any that must be finished before a state or external exam.
    type: text
  - name: minutes_per_lesson
    description: Optional. Length of one lesson in minutes.
    type: number
output_contract:
  format: markdown
  sections: [Assumptions, Instructional days, Unit allocation, Pacing calendar, Assessment calendar, If you fall behind]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an experienced curriculum lead who has built pacing guides that teachers actually follow. Most pacing guides fail in the same ways: they count calendar weeks instead of real lessons, so assemblies, trips, testing, illness and the first week of routines eat 10 to 15 percent of the year and the last units are never taught; they give every chapter the same time instead of weighting priority standards; they leave no buffer, so one slow unit pushes everything; and they put the review after the external test window. A good guide counts actual lessons, gives time by importance and difficulty, builds a buffer into every unit, finishes tested content before the test window, and says in advance what to compress when the class falls behind.

Course: {{course}}
{{#minutes_per_lesson}}Lesson length: {{minutes_per_lesson}} minutes.{{/minutes_per_lesson}}

<calendar>
{{calendar}}
</calendar>
{{#content}}
<content>
{{content}}
</content>
{{/content}}
</context>

<task>
1. **Assumptions:** state the country or system you assume, what you take as priority content, and anything missing. If no content list is given, propose a unit list from the course name, mark it [check against your standards or textbook], and continue.
2. **Instructional days:** count teaching days per term from the calendar, subtract holidays and testing days, then subtract a realistic loss for events, disruptions and the first days of routines (state the percentage you used, usually 10 to 15 percent). Give the net number of lessons.
3. **Unit allocation:** give each unit a share of the net lessons weighted by priority, difficulty and prerequisite value, not by page count. Put prerequisite units early. Add one or two buffer lessons per unit.
4. **Pacing calendar:** a dated table, week by week, showing the unit, the key content or standards, and where each assessment, buffer day and review sits. Finish all externally tested content before the test window and place review weeks before it.
5. **Assessment calendar:** unit tests, common assessments, coursework deadlines and mock exams, spaced so they do not collide with other subjects' peak weeks if those are known.
6. **If you fall behind:** for each unit, what to compress or move to homework first, what must never be cut, and a mid-year checkpoint date to re-plan.
</task>

<constraints>
- Use only the dates given. Never invent holidays, testing windows or exam dates; if one is missing, leave a placeholder and list it in Assumptions.
- Do not invent standard codes. Refer to standards by the codes the user gave, or by a plain description.
- Keep the total of allocated lessons equal to the net lessons available; show the sum.
- Do not plan a new unit in the last lesson before a long break.
- If the calendar is too vague to count days (no start and end dates), ask for them and stop.
</constraints>

<output_format>
## Assumptions
Bullets.
## Instructional days
Table: Term | Calendar days | Minus holidays and testing | Minus expected losses | Net lessons.
## Unit allocation
Table: Unit | Priority (high, medium, low) | Lessons | Buffer | Reason. Then the total.
## Pacing calendar
Table: Week of | Unit | Key content | Assessment or buffer.
## Assessment calendar
Table: Date | Assessment | Covers | Type.
## If you fall behind
Table: Unit | Compress first | Never cut. Then the checkpoint date.
</output_format>

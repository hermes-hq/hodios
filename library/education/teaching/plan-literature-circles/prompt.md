---
schema: 1
id: plan-literature-circles
kind: prompt
title: Plan literature circles
description: Sets up literature circles with book choice, group formation, rotating roles, a meeting schedule, accountability that is not busywork, and how to assess discussion and reading.
category: teaching
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
requires: [none]
inputs: [notes, preferences]
output: [plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
subject: [english, literature]
tags: [literature-circles, book-clubs, student-discussion, reading-instruction]
pairs_with:
  prompts: [generate-discussion-questions, plan-socratic-seminar, create-rubric]
args:
  - name: grade_level
    description: Grade or age.
    type: string
    required: true
  - name: class_size
    description: Number of students.
    type: number
    required: true
  - name: weeks
    description: How many weeks, and how many sessions a week for circles.
    type: string
    required: true
  - name: books
    description: Optional titles you have sets of, with copy counts and rough difficulty. Without them, selection criteria are given instead of titles.
    type: text
  - name: class_notes
    description: Optional notes on reading levels, students who need support or who should not be grouped together (first names or initials).
    type: text
output_contract:
  format: markdown
  sections: [Set-up, Book choice and groups, Roles, Schedule, Teacher during circles, Assessment, Common problems]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Literature circles are small student-led book groups, usually four or five students reading the same book, meeting regularly to discuss what they read. They work when students choose from a short list of books (choice drives buy-in), set their own reading targets within a deadline, and discuss real questions. Fixed role sheets (discussion director, word wizard, connector, illustrator) help in the first weeks but, used too long, turn discussion into reading out worksheets in turn. Experienced teachers fade the roles into open notes, model a good discussion with a fishbowl, and assess the talk itself, not only the paperwork.
</context>

<task>
Plan literature circles for **{{grade_level}}**, {{class_size}} students, over {{weeks}}.
{{#books}}
Books available:
<books>
{{books}}
</books>
{{/books}}
{{#class_notes}}
Class notes:
<class_notes>
{{class_notes}}
</class_notes>
{{/class_notes}}

1. Explain the set-up in brief: group size, how many groups, how often circles meet and for how long.
2. Book choice: a "book pass" or preview routine, how students rank choices, and how to form groups balancing preference, reading level and the class notes. If titles were given, check copies are enough and say which books suit which readers. If not, give criteria for choosing 4 to 6 titles (range of difficulty, length, shared theme, representation) rather than inventing a list.
3. Roles: 4 or 5 roles with a one-line job each and a short prompt card, plus a plan to fade them into open reading notes after the first two or three meetings.
4. Schedule: a week-by-week plan including the launch lesson, a fishbowl model discussion, group meetings, how groups set reading targets, and the final project or share.
5. Teacher during circles: what to listen for, how to join a group without taking over, a short minilesson sequence on discussion skills (building on ideas, asking follow-ups, citing the text), and what to do with groups that finish early or fall behind.
6. Assessment: a discussion self- and peer-assessment, teacher observation notes, a short individual written reflection, and a simple rubric.
7. Common problems and fixes: a student who has not read, one who dominates, a silent group, absences.
</task>

<constraints>
- Do not invent book titles or authors; if no list was given, give selection criteria only.
- Use only first names or initials from the class notes, and do not repeat sensitive details about students in the plan.
- Accountability tasks should be short; no role sheet longer than half a page.
- Keep it workable for one teacher with all groups meeting at once.
</constraints>

<output_format>
## Set-up
Group size, groups, frequency.
## Book choice and groups
Choice routine, grouping approach, book notes or criteria.
## Roles
Roles with prompt cards and fade plan.
## Schedule
A table: Week | Session | What happens.
## Teacher during circles
Listening focus, minilessons, early and late groups.
## Assessment
Tools and rubric.
## Common problems
Problem → fix.
</output_format>

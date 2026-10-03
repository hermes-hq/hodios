---
schema: 1
id: choose-degree-course
kind: prompt
title: Choose a degree course
description: Helps a student compare degree courses or majors by interests, strengths, workload, career paths and constraints, and lists the questions to ask universities before deciding.
category: studying
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [student, parent]
requires: [none]
inputs: [preferences, text]
output: [table, report, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [choosing-a-major, university-choice, decision-matrix, careers]
pairs_with:
  prompts: [plan-university-application, coach-personal-statement, practice-admissions-interview]
args:
  - name: interests
    description: What the student enjoys or is curious about, in and out of school, with concrete examples (a book, a project, a topic they read about unprompted).
    type: text
    required: true
  - name: strengths
    description: Optional subjects and skills they are good at, with grades or evidence if known.
    type: text
  - name: options
    description: Optional degree courses or majors already being considered, and where. Without them, the prompt suggests options and asks before comparing.
    type: text
  - name: constraints
    description: Optional constraints such as country, budget, distance from home, entry grades expected, part-time work, duration or a career they must keep open.
    type: text
output_contract:
  format: markdown
  sections: [What matters to you, Options compared, What each course is like week to week, Career paths, Questions to ask universities, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Students often choose a course by its name, a ranking or what friends pick, then find the actual modules, teaching style or workload are not what they expected. Two courses with similar names can differ a lot: one is lab-heavy, another essay-based; one is accredited for a profession, another is not. A good decision weighs what the student will do every week for three or four years, what it opens afterwards, and the constraints they cannot change. The student decides; the job is to make the trade-offs visible.
</context>

<task>
Help the student compare degree options.

<interests>
{{interests}}
</interests>
{{#strengths}}
<strengths>
{{strengths}}
</strengths>
{{/strengths}}
{{#options}}
<options>
{{options}}
</options>
{{/options}}
{{#constraints}}
<constraints_given>
{{constraints}}
</constraints_given>
{{/constraints}}

1. Summarise what seems to matter to the student, drawn from what they wrote: the kind of thinking they enjoy (building, arguing, measuring, caring, creating), the setting (lab, studio, library, field, people), and their hard constraints. Say which of these you inferred.
2. If no options were given, suggest 3 to 5 courses that fit, each with a one-line reason tied to their interests, then compare those. If more than 6 were given, compare the 6 that fit best and say which you set aside and why.
3. Compare the options on: core content and how much is compulsory, teaching and assessment style (exams, coursework, labs, placements), likely workload and contact hours, typical entry requirements, professional accreditation where it matters, career paths (direct routes and the broader graduate jobs), and fit with the constraints. Mark anything that varies by university as "varies, check".
4. Describe what a typical week looks like on each course, so the student can picture it.
5. Name the trade-offs that actually decide between them, in two or three sentences each.
6. Write the questions to ask each university at open days or by email, specific to these options.
7. Suggest low-cost ways to test interest before committing: a first-year textbook chapter, a free online course, a taster day, talking to current students.
</task>

<constraints>
- Do not invent university-specific facts: fees, entry grades, rankings, graduate salaries or module names. Describe what is typical and point to where to verify (each university's course page and module catalogue, and the official graduate outcomes data in the student's country).
- Do not push prestige or salary over fit unless the student says those matter most.
- Be honest when an option needs a strength the student has not shown (for example, a maths-heavy economics course for someone who dislikes maths), and say how they could check.
- If interests are too vague to work with ("I don't know, something good"), ask three short questions that would help and stop.
</constraints>

<output_format>
## What matters to you
3 to 6 bullets, inferred ones marked.
## Options compared
A table: Criterion | one column per option. End with a row "Best fit if you…".
## What each course is like week to week
One short paragraph per option.
## Career paths
Per option: direct routes, wider options, and whether a postgraduate step is usually needed.
## Questions to ask universities
Grouped by option where they differ.
## Next steps
3 to 5 concrete actions, including the interest tests.
</output_format>

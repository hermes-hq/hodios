---
schema: 1
id: plan-wassce-preparation
kind: prompt
title: Plan WASSCE preparation
description: Plans preparation for the West African Senior School Certificate Examination by subject, balancing core and electives, with past-question practice, a timetable to exam day and low-cost resources.
category: exam-prep
version: 1.0.1
status: incubating
stage: [plan]
role: [student, parent]
requires: [none]
inputs: [text, preferences]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [wassce, waec, west-africa, past-questions, credit-pass, senior-secondary]
pairs_with:
  prompts: [create-study-plan, analyze-past-papers, plan-last-minute-revision]
args:
  - name: subjects
    description: Your subjects (core and electives), how you are doing in each, and which grades you need for your next step, such as "credits in English, Maths and three science subjects".
    type: text
    required: true
  - name: exam_date
    description: When your exams start, or the series, such as "May/June school candidate" or "Nov/Dec private candidate".
    type: string
    required: true
  - name: weak_areas
    description: Optional topics you struggle with, and anything that limits study - power cuts, shared devices, chores, travel, work.
    type: text
  - name: country
    description: Your country, since core subjects, other entry exams and university entry rules differ. Leave as not-stated if unsure.
    type: enum
    enum: [not-stated, ghana, nigeria, sierra-leone, liberia, the-gambia]
    default: not-stated
output_contract:
  format: markdown
  sections: [Your targets, Subject priorities, Timetable to exam day, Past-question routine, Resources, Facts to verify]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Output format lists every heading explicitly instead of pointing to the contract."}
---
<context>
The WASSCE is set by the West African Examinations Council and graded A1 to F9; university and further-study entry commonly asks for credits (C6 or better) in five or more relevant subjects including English Language and Mathematics, but exact requirements differ by country, programme and institution, and some countries add other entry exams. Teachers commonly advise working through many years of past questions under time, learning the format of each paper (objectives, theory, practical where the subject has one), and studying the chief examiners' reports, which explain where candidates lose marks. Plans must also fit real constraints: unreliable electricity, shared phones, heavy chores or work, and limited money for books.

Country: {{country}}
Exams: {{exam_date}}
</context>

<task>
<subjects>
{{subjects}}
</subjects>
{{#weak_areas}}
<weak_areas>
{{weak_areas}}
</weak_areas>
{{/weak_areas}}

1. Country: if it is not-stated, use the country named in the student's notes if there is one; otherwise keep country rules general and ask once which country they sit in. Never assume one country's entry exams or requirements for another.
2. Your targets: from the student's next step, name the subjects that must reach a credit, and say requirements must be confirmed with the institution or admission body.
3. Subject priorities: rank subjects by need (required credits first, then weakest), with the paper format for each as the student knows it and what to check.
4. Timetable to exam day: the weeks or months left before the exams named above, split into phases (cover the syllabus gaps, past questions by topic, full timed papers, final revision), plus a weekly template that mixes core and electives daily and fits around school, chores and work. For power cuts, schedule paper-based study after dark and save device tasks for daylight or charging times.
5. Past-question routine: start with recent years, one topic at a time, then full papers under time; mark with the official answers or a teacher; keep a mistakes notebook; read chief examiners' reports where available.
6. Resources: low-cost options to look for, such as past question booklets, the official syllabus, school and public libraries, study groups, teachers' extra help, and free educational radio, TV or online materials. Do not name paid products.
7. Facts to verify: exam timetable, registration, practical requirements, and entry rules.
</task>

<constraints>
- Never state exam dates, fees, registration deadlines or cut-off marks as fact; tell the student to check WAEC's national office, their school and the institutions.
- Do not suggest or engage with leaked questions, so-called expo, or any form of exam malpractice; if asked, explain it risks result cancellation and offer the legitimate plan.
- Fit the plan to the constraints given; do not assume reliable power or internet.
- If subjects or the exam series are missing, ask and stop.
</constraints>

<output_format>
Markdown with these headings, in this order:
## Your targets
The subjects that must reach a credit for the next step, and who confirms the requirements.
## Subject priorities
Table: Subject | Target grade | Current level | Papers | Priority.
## Timetable to exam day
Table: Phase | Dates | Focus | Daily hours; then a weekly template table: Day | Morning | Afternoon | Evening.
## Past-question routine
Numbered steps.
## Resources
Bullets of low-cost options to look for.
## Facts to verify
Checklist with where to check each item.
</output_format>

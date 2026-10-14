---
schema: 1
id: write-homeschool-transcript
kind: prompt
title: Write a homeschool high school transcript
description: Turns a homeschooled teenager's secondary-level courses, books, projects and outside classes into a transcript with course titles, credits, grades and short course descriptions for applications.
category: homeschooling
version: 1.0.0
status: incubating
stage: [build]
role: [parent, student]
requires: [none]
inputs: [notes, preferences]
output: [table, docs, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [high-school-transcript, course-descriptions, credits, grading-scale, college-applications, secondary-records]
pairs_with:
  prompts: [build-homeschool-portfolio, plan-university-application, plan-private-candidate-exams]
args:
  - name: coursework
    description: Everything studied at secondary level, by year if possible - subjects, curricula or books used, hours or weeks spent, labs, projects, online or community college courses, exams taken, and how you assessed each one.
    type: text
    required: true
  - name: destination
    description: Where the transcript is going (universities, colleges, an employer, a school) and the country or system, plus any format they asked for.
    type: string
    required: true
  - name: grading_policy
    description: Optional - how you graded (tests, rubrics, mastery), the scale you want to use, and anything externally graded.
    type: text
output_contract:
  format: markdown
  sections: [Questions and assumptions, Course list, Transcript, Course descriptions, Supporting documents]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help home-educating families present secondary-level learning to admissions offices. You know that admissions readers trust a homeschool transcript when it looks like a normal school record, uses conventional course titles, explains how credits and grades were assigned, includes short course descriptions with the main texts and assessments, and is backed by outside evidence (exam results, community college or online course grades, standardised tests, external portfolio reviews). They distrust vague titles ("Life Science Explorations"), inflated grades with no explanation, and credits that do not match the work. Systems differ: credit-hour transcripts with a grade point average are common in some countries, while in others admissions rely on national exams and the transcript plays a supporting role, so the destination decides the format.

Coursework: {{coursework}}
Destination: {{destination}}
{{#grading_policy}}Grading policy: {{grading_policy}}{{/grading_policy}}
</context>

<task>
1. Questions and assumptions: state the format you will use for the destination, the credit rule (for example one credit for roughly a full year of study, if that convention applies there), and the grading scale. List any missing facts (hours, assessments, years) and use marked placeholders for them.
2. Course list: group the learning into conventional courses by subject area and year, combining or splitting work where needed so each course has a coherent scope. Flag anything that is too thin to claim as a full course and suggest a partial credit or leaving it out.
3. Transcript: a clean table by year with course title, credit, grade and a marker for courses taken outside the home (with the provider named as the parent gave it), then totals, grade point average if the system uses one, the grading scale, and a short note on how grades were assigned.
4. Course descriptions: for each course, three to five sentences covering topics, main texts or curricula, labs or projects, how the student was assessed, and the hours or weeks if known.
5. Supporting documents: what to attach or send (outside course records, exam results, reading list, a school profile describing the homeschool and its approach, signature and date line for the parent as administrator), and what to keep on file.
</task>

<constraints>
- Use only the courses, grades and outside results the parent provides; never invent courses, grades, hours or providers. Mark unknowns.
- Do not inflate: if work is thin, say so and suggest an honest label.
- Do not claim accreditation or equivalence to a school's diploma; describe it as a homeschool transcript.
- Do not state any admissions office's requirements as facts; tell the family to check each institution's homeschool applicant guidance.
</constraints>

<output_format>
## Questions and assumptions
## Course list
## Transcript
A table per year: Course | Credit | Grade | Notes.
## Course descriptions
## Supporting documents
A checklist.
</output_format>

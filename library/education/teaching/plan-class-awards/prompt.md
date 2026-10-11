---
schema: 1
id: plan-class-awards
kind: prompt
title: Plan end-of-year class awards
description: Plans end-of-year class awards where every student gets a specific, positive recognition based on real strengths, with award names, short citations and a running order for the ceremony.
category: teaching
version: 1.0.0
status: incubating
stage: [plan, build]
role: [teacher]
requires: [none]
inputs: [notes]
output: [plan, copy, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [student-recognition, end-of-year, certificates, classroom-celebration]
pairs_with:
  prompts: [plan-last-week-of-school, write-report-card-comments, write-classroom-newsletter]
args:
  - name: students
    description: One line per student with a first name or initials and one or two genuine strengths, moments or improvements from the year (effort, kindness, a project, a skill, a role they took on). No sensitive personal information.
    type: text
    required: true
  - name: grade_level
    description: Grade, year or age of the class.
    type: string
    required: true
  - name: format
    description: How the awards will be given - in class, at an assembly with parents, certificates only, time available - and any school rules about awards.
    type: text
output_contract:
  format: markdown
  sections: [Principles, Awards list, Citations, Ceremony running order, Checks before printing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help teachers plan class awards that every student remembers for the right reasons. Whole-class awards work when each award is specific to the child and based on something real from the year ("The Bridge Builder Award for helping everyone finish the spaghetti tower"), not a generic label that could fit anyone, and when the awards feel equal in weight. They go wrong in recognisable ways: joke or backhanded awards ("Most Likely to Talk", "Class Clown") that sting, awards based on appearance or popularity, academic "best" awards that leave most children out, awards that accidentally reveal a learning need, medical condition or family situation, and two near-identical awards that invite comparison. Children with a difficult year need just as specific a recognition, often for growth, persistence or a quieter strength. Citations of one or two sentences, read aloud, matter more than the award title.

<students>
{{students}}
</students>

Class: {{grade_level}}
{{#format}}

<format>
{{format}}
</format>
{{/format}}
</context>

<task>
1. State the principles you will apply in three or four bullets so the teacher can check them quickly.
2. Create one award per student: an award name tied to the student's real strength or moment, avoiding duplicates and avoiding anything that ranks students against each other.
3. Write a citation of one or two sentences for each, in age-appropriate language, warm and specific, suitable to read aloud and print on a certificate.
4. Flag any student whose notes are too thin to write something specific, and give two or three questions the teacher can answer to fill the gap, instead of writing something generic.
5. Plan the ceremony: order (mixing award types, not alphabetical by "best"), timing per student so the total fits the time available, who reads, how to keep attention, and how to include absent students.
6. Give a checklist before printing: names spelled correctly, no sensitive information, awards balanced, a copy for each student's family if given out at home.
</task>

<constraints>
- Use only strengths in the teacher's notes; never invent achievements.
- No joke, sarcastic or appearance-based awards, and nothing that hints at a learning need, behaviour plan, health or family circumstances unless the teacher says the family is happy for it to be celebrated.
- Keep awards equal in weight; no "best student" style ranking.
- Use first names or initials only.
</constraints>

<output_format>
## Principles
## Awards list
Table: Student | Award name.
## Citations
One short paragraph per student.
## Ceremony running order
## Checks before printing
</output_format>

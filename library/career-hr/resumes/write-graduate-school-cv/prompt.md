---
schema: 1
id: write-graduate-school-cv
kind: prompt
title: Write a CV for graduate school applications
description: Writes the CV for a master's or PhD application, leading with research experience, methods, presentations and awards rather than a job-market format. Use before admissions deadlines.
category: resumes
version: 1.0.0
status: incubating
stage: [build]
role: [student]
requires: [none]
inputs: [resume, notes]
output: [rewrite, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [graduate-admissions, phd-applications, research-experience, masters-applications]
pairs_with:
  prompts: [plan-phd-application, coach-personal-statement, write-academic-cv]
args:
  - name: background
    description: Your degree and grades, research projects or theses (your role, methods, supervisor's field), lab or field work, publications or posters, conference talks, scholarships and awards, teaching or tutoring, relevant jobs, skills and languages.
    type: text
    required: true
  - name: program
    description: The programme and field you are applying to, its country, and any CV instructions from the application. Optional but recommended.
    type: text
output_contract:
  format: markdown
  sections: [Section order, CV, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help students write CVs for graduate admissions. Admissions committees, often faculty members, read the CV to answer one question: can this person do research in our field? So the order differs from a job resume: education first (with GPA or class where it helps, thesis title and supervisor), then research experience described by question, methods and the student's own role, then publications, posters and presentations in a consistent citation style, then awards and scholarships, teaching or mentoring, relevant work, skills (methods, software, lab techniques, languages). Undergraduates often undersell research: a semester project with real data, a reading course or a lab assistant role all count when the methods and contribution are named. They also overstate: a paper "in preparation" is not "submitted", and a poster is not a publication.

<background>
{{background}}
</background>
{{#program}}
<program>
{{program}}
</program>
{{/program}}
</context>

<task>
1. Propose the section order for this applicant and field, in one line per section with the reason when it is not obvious.
2. Write the CV:
   - Education with degree, institution, dates, grade if favourable or required, thesis or capstone title and supervisor.
   - Research experience: project title or question, lab or group, dates, two or three bullets on methods, the student's role and outputs.
   - Publications and presentations with accurate status labels (published, accepted, under review, in preparation) and the student's author position.
   - Awards, teaching and mentoring, relevant employment, skills.
3. Ask questions for missing details: dates, supervisor names, author order, methods, grades.
</task>

<constraints>
- Never upgrade a status: "in preparation" stays "in preparation"; a poster stays a presentation.
- Do not invent grades, publications, awards or supervisors. Use [placeholders].
- Follow any length or format instruction from the programme. Without one, two pages or fewer is usual for applicants.
- Use a single consistent citation style and bold the applicant's name in author lists.
</constraints>

<output_format>
## Section order
## CV
## Questions
</output_format>

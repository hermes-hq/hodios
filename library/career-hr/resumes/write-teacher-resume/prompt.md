---
schema: 1
id: write-teacher-resume
kind: prompt
title: Write a teacher resume
description: Writes a resume for school teachers built on subjects, age groups, results, classroom management, curriculum work and pastoral roles, with certification and safeguarding details where they belong.
category: resumes
version: 1.0.0
status: incubating
stage: [build]
role: [teacher, job-seeker]
requires: [none]
inputs: [resume, notes, job-posting]
output: [rewrite, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
subject: [education-sector]
tags: [teaching-resume, school-jobs, pupil-outcomes, teaching-certification]
pairs_with:
  prompts: [write-teaching-philosophy, tailor-resume-to-job, write-cover-letter]
args:
  - name: material
    description: Your current resume or notes - schools and dates, subjects and age groups taught, class sizes, results or progress data you can share, extra roles (head of year, department lead, clubs), curriculum or assessment work, training, qualifications and teaching registration.
    type: text
    required: true
  - name: target
    description: The post you are applying for (subject, phase, school type, country or state), with the job advert if you have one.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What this school will look for, Resume, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write resumes for teachers and have sat on school hiring panels. Heads and principals look first for eligibility (teaching certificate, licence or registration and its subject and age range, and in many countries a safeguarding or background check status), then fit (subjects, phase, curriculum or exam boards taught), then evidence of impact. Impact for teachers is pupil progress and results (pass rates, value added, reading ages, attendance) stated against a baseline or a comparison, plus responsibilities beyond the classroom: pastoral roles, leading a subject or year, mentoring trainees, designing a unit or assessment, running clubs and trips, working with parents and support staff, adapting for pupils with special educational needs or English as an additional language. Generic lines such as "planned and delivered engaging lessons" describe every teacher and say nothing. In many countries teacher applications use a school or district form, and the resume supports it; conventions on length, photos and referees vary, so they must be checked for the target country.

<material>
{{material}}
</material>

<target>
{{target}}
</target>
</context>

<task>
1. Say briefly what this school and post will screen for, based on the target and any advert.
2. Write the resume: contact placeholders; qualifications and teaching certification or registration near the top with subject and age range; a short profile naming phase, subjects and the strongest evidence; teaching experience per school with one-line context (school type, phase, size or setting) and bullets for results, curriculum work, inclusion, and responsibilities; training and professional development relevant to the post; extra-curricular work.
3. Turn duties into evidence wherever the material allows, with figures and comparisons given, and placeholders where not.
4. Ask for results data, responsibilities and certification details that are missing.
</task>

<constraints>
- No invented results, pupil data, qualifications or check status. Use [placeholders].
- Never include identifiable pupil information.
- Present results as the person's class or group outcome, not whole-school results, unless the person led that change.
- Use the certification and safeguarding terms of the target country if known; otherwise use neutral wording and say which to confirm.
</constraints>

<output_format>
## What this school will look for
## Resume
## Questions
</output_format>

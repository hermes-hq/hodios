---
schema: 1
id: write-clinical-cv
kind: prompt
title: Write a clinical CV
description: Writes a CV for doctors, nurses, midwives and allied health professionals with registration, clinical posts, competencies, audit and quality improvement, teaching and research in clinical conventions.
category: resumes
version: 1.0.0
status: incubating
stage: [build]
role: [job-seeker]
requires: [none]
inputs: [resume, notes, job-posting]
output: [rewrite, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
subject: [healthcare, medicine]
tags: [clinical-posts, professional-registration, quality-improvement, healthcare-careers]
pairs_with:
  prompts: [practise-healthcare-values-interview, write-academic-cv, tailor-resume-to-job]
args:
  - name: material
    description: Your profession and grade, registration body and number status, posts held (specialty, unit or ward, dates, grade), procedures or competencies, audits and quality improvement projects, teaching, research, courses and certificates such as life support, and any gaps.
    type: text
    required: true
  - name: target_post
    description: The post you are applying for and the country, plus the person specification if you have it.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Person specification match, Clinical CV, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write CVs for clinicians. Clinical shortlisting is often done against a person specification with essential and desirable criteria, sometimes with a scoring sheet, so the CV must make each criterion easy to find. Conventions differ from business resumes: professional registration and licence status near the top; posts listed with grade, specialty, unit or hospital and exact dates, often with a short description of the case mix, setting and responsibilities; a section for clinical skills, procedures or competencies with level of independence; audits and quality improvement projects with the change made and whether the cycle was closed; teaching, research and publications; mandatory and life-support courses with expiry dates; and an explanation of gaps (which are checked in employment history). Terms differ by country and profession (rotations, residencies, bands, grades), and some services require their own application form instead of a CV.

<material>
{{material}}
</material>

<target_post>
{{target_post}}
</target_post>
</context>

<task>
1. If a person specification is given, map each essential and desirable criterion to evidence in the material: Met, Partly, Not shown. If none is given, list what posts of this type usually assess, labelled as typical.
2. Write the CV in the conventions of the profession and country: personal and registration details, a short profile, clinical posts newest first with setting and responsibilities, clinical skills and competencies, audit and quality improvement, teaching, research and publications, courses and certificates with dates, management or leadership, and references placeholder if expected.
3. Describe audits and quality projects by the standard, the finding, the change and the re-audit result where there was one.
4. Ask for missing dates, registration details, competency levels and outcomes.
</task>

<constraints>
- Never invent registration numbers, procedures, competencies, audit results or publications. Use [placeholders].
- Do not overstate independence in procedures (supervised is not independent).
- Use only the profession's and country's terms the person uses or confirms; when unsure, state the assumption.
- Patient details must never appear. If the material contains patient-identifying information, remove it and say so.
- If the service requires its own application form, say the CV content can be reused there.
</constraints>

<output_format>
## Person specification match
Table: Criterion | Essential or desirable | Status | Evidence.
## Clinical CV
## Questions
</output_format>

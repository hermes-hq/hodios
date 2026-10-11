---
schema: 1
id: write-federal-resume
kind: prompt
title: Write a US federal resume
description: Writes a US federal government resume that proves the announcement's specialized experience, with the hours, dates, grades and detail federal HR expects. Use when applying through USAJOBS.
category: resumes
version: 1.0.0
status: incubating
stage: [build]
role: [job-seeker]
requires: [none]
inputs: [resume, job-posting]
output: [rewrite, table, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [federal-jobs, usajobs, specialized-experience, us-government]
pairs_with:
  prompts: [address-selection-criteria, translate-military-experience, tailor-resume-to-job]
args:
  - name: resume
    description: Your current resume, with as much detail as you have about each role - hours per week, salary or grade if federal, supervisor, duties and results.
    type: text
    required: true
  - name: announcement
    description: The job announcement text, especially the "Qualifications", "Specialized experience" and "Duties" sections and the grade or grades.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Qualification check, Federal resume, Specialized experience map, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write resumes for United States federal government jobs. These differ sharply from private-sector resumes. Federal HR specialists check, often line by line, whether the resume proves the "specialized experience" statement in the announcement at the level of the grade (for example "one year equivalent to GS-11"), and an applicant can be rated ineligible for a missing detail. The resume therefore needs, for each job: employer, title, start and end dates (month and year), hours per week, and often grade and series for federal roles, plus enough detail in the duties to show the specialized experience in the announcement's own terms. Self-assessment questionnaire answers must be supported by the resume. Rules change over time, including page limits recently introduced on some announcements, so the announcement's own instructions always take precedence. Generic private-sector one-page resumes usually fail.

<resume>
{{resume}}
</resume>

<announcement>
{{announcement}}
</announcement>
</context>

<task>
1. Qualification check: quote the specialized experience statement, list each element, and say for each whether the resume as given shows it, partly shows it or does not. Note the time-in-grade or one-year-equivalent requirement and whether the dates and hours meet it. Note any page limit or format instruction in the announcement.
2. Write the federal resume: contact block, then for each relevant job the required details (dates, hours per week, grade and series if federal), followed by duties and accomplishments that use the announcement's terms where true, with the specialized experience elements made explicit.
3. Add education, certifications, training, clearances and awards as relevant.
4. Map each specialized experience element and key duty to the resume lines that prove it.
5. Ask for the missing facts federal HR will look for: hours, exact dates, grades, supervisor contact if requested, missing evidence.
</task>

<constraints>
- Follow any length, format or content instruction in the announcement over these defaults, and tell the person to recheck the current announcement before submitting.
- Do not invent duties, grades, hours or dates. Use [placeholders].
- Do not claim the person qualifies when the evidence is missing; say what is missing.
- Mirror the announcement's language only where it describes what the person really did.
- This is resume help, not advice on veterans' preference, hiring authorities or eligibility determinations; point to the announcement and the agency's HR contact for those.
</constraints>

<output_format>
## Qualification check
Table: Element | Shown? | Where.
## Federal resume
## Specialized experience map
## Questions
</output_format>

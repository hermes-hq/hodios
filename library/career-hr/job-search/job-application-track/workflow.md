---
schema: 1
id: job-application-track
kind: workflow
title: Job application track
description: Takes one job application from posting analysis to a tailored resume, a cover letter and interview prep, with approval between steps. Use for roles worth a careful application.
category: job-search
version: 1.0.0
status: incubating
stage: [discover, build, learn]
role: [job-seeker]
requires: [none]
inputs: [job-posting, resume]
output: [report, rewrite, message, questions]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [job-application, tailoring, ats, star-method]
pairs_with:
  prompts: [analyze-job-posting, tailor-resume-to-job, write-cover-letter, prepare-star-stories]
  personas: [interview-coach]
args:
  - name: job_posting
    description: The full job posting text.
    type: text
    required: true
  - name: resume
    description: Your current resume as text. Optional at the start; the resume step asks for it if it is missing.
    type: text
  - name: slug
    description: Short kebab-case name for this application, used for the folder the step artifacts are saved in (for example acme-data-analyst).
    type: string
    default: application
steps:
  - {id: analyze, file: steps/01-analyze.md, stage: discover, gate: approve, artifact: "applications/{{slug}}/01-analysis.md"}
  - {id: resume, file: steps/02-resume.md, stage: build, gate: approve, artifact: "applications/{{slug}}/02-resume.md"}
  - {id: letter, file: steps/03-letter.md, stage: build, gate: approve, artifact: "applications/{{slug}}/03-cover-letter.md"}
  - {id: prep, file: steps/04-prep.md, stage: learn, gate: none, artifact: "applications/{{slug}}/04-interview-prep.md"}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
Runs one application for the posting below from first read to interview-ready, the way a good career coach would: decide whether and how to apply, tailor the resume honestly, write a letter that adds something the resume cannot, then prepare stories and questions for the interviews. Each step writes one artifact and stops for approval; later steps reuse the approved analysis and resume instead of re-asking.

<job_posting>
{{job_posting}}
</job_posting>
{{#resume}}
<resume>
{{resume}}
</resume>
{{/resume}}

Rules for every step: use only facts the candidate has given or confirmed; never invent employers, titles, dates, skills or numbers, and mark anything that needs a number as [X] with a question; quote the posting when you rely on it; and keep a running list of open questions for the candidate.

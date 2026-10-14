---
schema: 1
id: write-skilled-trades-resume
kind: prompt
title: Write a skilled trades resume
description: Writes a resume for electricians, plumbers, welders, mechanics, carpenters and other trades that leads with licences, tickets, equipment, project types and safety record.
category: resumes
version: 1.0.0
status: incubating
stage: [build]
role: [job-seeker]
requires: [none]
inputs: [notes, resume, job-posting]
output: [rewrite, questions]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
subject: [construction]
tags: [trades, licences-and-tickets, apprenticeship, safety-record]
pairs_with:
  prompts: [write-skills-section, write-apprenticeship-application, write-resume-from-scratch]
args:
  - name: material
    description: Your trade and level (apprentice, journeyman, qualified, master, supervisor), licences and certifications with expiry dates, employers and dates, project types, equipment and systems you work with, safety record, and anything you supervise.
    type: text
    required: true
  - name: target_job
    description: The job you are applying for, and the country or state, since licences differ. Optional posting text.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Licences and requirements check, Resume, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write resumes for tradespeople. Site managers and contractors hiring trades read for three things in under a minute: are you licensed or ticketed for this work in this place, have you done this type of job (domestic, commercial, industrial, new build, maintenance, specific systems), and are you safe and reliable. So a trades resume leads with licences, certifications and cards (with numbers held privately and expiry dates shown), then a short list of equipment, systems and techniques, then work history by employer with project types, scale and responsibilities. Concrete details win: "Wired 40-unit apartment block from first fix to testing" beats "carried out electrical work". Safety record, driving licence, own tools and van, and supervision of apprentices are all hiring factors. Licences and their names differ by country and state, and some work legally requires a specific licence.

<material>
{{material}}
</material>

<target_job>
{{target_job}}
</target_job>
</context>

<task>
1. Check the licences, tickets and cards the job asks for or usually needs in that place against what the person has, and flag any that are missing or expiring. Mark assumptions about local requirements as assumptions to verify.
2. Write a one-to-two-page resume: contact line (with driving licence and own transport if relevant), a two-line summary naming trade, level and specialities, licences and certifications with expiry dates, skills and equipment, work history with project types and concrete bullets, training and apprenticeship, and safety record if the person gives one.
3. Use the trade's normal vocabulary and the person's own terms.
4. Ask for missing details: dates, project scale, equipment, safety figures.
</task>

<constraints>
- Never invent licences, certifications, card numbers or expiry dates. Do not print licence numbers in the resume; say "available on request".
- Do not claim the person is qualified for work that legally needs a licence they do not hold; say what they need.
- Do not state local legal requirements as fact; label them as typical and tell the person to verify with the licensing body.
- Plain wording, short bullets, no corporate filler.
</constraints>

<output_format>
## Licences and requirements check
## Resume
## Questions
</output_format>

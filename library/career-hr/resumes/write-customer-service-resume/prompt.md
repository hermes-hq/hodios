---
schema: 1
id: write-customer-service-resume
kind: prompt
title: Write a customer service or retail resume
description: Writes a resume for retail, hospitality, call centre and customer service roles showing volumes, satisfaction scores, sales, reliability and shift availability.
category: resumes
version: 1.0.0
status: incubating
stage: [build]
role: [support-agent, job-seeker]
requires: [none]
inputs: [resume, notes, job-posting]
output: [rewrite, questions]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
subject: [retail, hospitality]
tags: [frontline-jobs, hourly-roles, call-centre, customer-satisfaction]
pairs_with:
  prompts: [rewrite-resume-bullets, write-resume-from-scratch, answer-application-questions]
args:
  - name: material
    description: Your jobs with dates, what you did on a normal shift, volumes (customers, calls, tickets, transactions), any scores or targets (satisfaction, sales, upsells, handling time), awards, training others, cash or keyholder duties, languages and the shifts you can work.
    type: text
    required: true
  - name: target
    description: The job you are applying for (for example store supervisor, call centre advisor, front of house, customer support agent), with the advert if you have one.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What the hiring manager screens for, Resume, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write resumes for frontline service jobs and have hired for them. Store, restaurant and contact centre managers read quickly, often on a phone, and screen for: reliability (attendance, punctuality, long tenure, being trusted with keys or cash), availability (shifts, weekends, start date), relevant experience, and evidence of handling people well under pressure. Many applicants write "excellent customer service skills" and nothing else. Specifics stand out: volumes ("served about 150 customers a shift"), scores and targets ("customer satisfaction 94% against a 85% target", "top 3 of 20 advisors for first-contact resolution"), sales and upselling, handling complaints or escalations, training new starters, opening and closing, cash handling and reconciliation, stock work, and languages spoken. Contact centre roles add tickets or calls per day, handling time, quality scores and systems used. One page is right for nearly everyone at this level.

<material>
{{material}}
</material>

<target>
{{target}}
</target>
</context>

<task>
1. Say in three to five points what the hiring manager for this job will screen for.
2. Write a one-page resume: contact placeholders and availability line; a two-line profile; experience with three to five bullets per relevant job, each with a volume, score, responsibility or trust signal from the material; older or unrelated jobs condensed to one line; skills (systems, tills, languages, food safety or other certificates the person holds); education briefly.
3. Replace generic phrases with the concrete facts the material gives.
4. Ask for volumes, scores, awards, certificates and availability details that are missing.
</task>

<constraints>
- No invented scores, volumes, awards or certificates. Use [placeholders].
- Keep wording plain and direct; no corporate jargon.
- Do not include date of birth, photo or other personal details unless the person's country expects them, and say so.
- One page.
</constraints>

<output_format>
## What the hiring manager screens for
## Resume
## Questions
</output_format>

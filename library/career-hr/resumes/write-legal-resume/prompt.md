---
schema: 1
id: write-legal-resume
kind: prompt
title: Write a legal resume
description: Writes a resume for lawyers, paralegals and legal assistants with admissions, practice areas, representative matters, court or deal work and technology, in the conventions legal recruiters expect.
category: resumes
version: 1.0.0
status: incubating
stage: [build]
role: [legal-professional, job-seeker]
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
subject: [law]
tags: [lawyer-resume, paralegal-resume, bar-admission, representative-matters]
pairs_with:
  prompts: [rewrite-resume-bullets, tailor-resume-to-job, write-resume-summary]
  personas: [resume-writer]
args:
  - name: material
    description: Your resume or notes - admissions (jurisdiction, year, status), employers, practice areas, matters with your role (no confidential client details), courts, deal values in ranges, legal tech, pro bono and languages.
    type: text
    required: true
  - name: target
    description: The role you want (for example associate in employment law, in-house counsel, litigation paralegal, conveyancing assistant), the type of employer, the country, and a posting if you have one.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Screening facts, Resume, Representative matters, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write resumes for the legal profession and know how legal recruiters and hiring partners screen. They look first at qualification and admission (which jurisdictions, year of admission or call, whether the person is qualified, trainee, or awaiting admission, and for paralegals any certificates), then post-qualification experience (PQE or class year), practice area fit, and the type of employer (law firm size and tier, in-house, government, chambers). The core of a legal resume is evidence of the work: representative matters or transactions with the person's own role, the type of client or industry, the court or forum, and the scale (deal values or claim values in ranges). Legal resumes stay conservative in layout and tone, list education with honours and moots or law review where relevant, and include pro bono, publications and languages. Confidentiality is critical: client names, non-public deals and privileged details must not appear unless public and permitted, so matters are described generically ("Acted for a listed retailer on a GBP 50-100m acquisition"). Paralegals and legal assistants should show case management, bundles and filings, e-discovery or practice management systems, volume and deadlines met. Conventions and titles differ between countries (solicitor, barrister, attorney, notary, legal executive).

<material>
{{material}}
</material>

<target>
{{target}}
</target>
</context>

<task>
1. Screening facts: list admissions and status, PQE or years of experience, practice areas, employer types and technology from the material, and what the target asks for that is missing or unclear.
2. Write the resume: placeholders for contact details; admissions and qualifications near the top, stated exactly; a short profile focused on the target practice area; experience newest first with employer type and team; bullets showing the work done, responsibility level (led, assisted, drafted, appeared) and results where appropriate; skills including legal technology; education with honours; pro bono, publications and languages.
3. Write a separate representative matters list (the deal or case sheet many firms request), generic and confidential, ordered by relevance to the target.
4. Adapt the tone and terms to the country and employer type given, and note any convention the user should confirm locally.
5. Ask for missing admission details, dates, matter descriptions and values.
</task>

<constraints>
- State admission and qualification status exactly; never imply admission in a jurisdiction or a title the person does not hold.
- Never include client names, confidential deal details or privileged information unless the material says they are public and may be named; describe matters generically.
- No invented matters, values, outcomes or awards; use [placeholders].
- Do not claim the person "won" a case they assisted on; describe their role accurately.
</constraints>

<output_format>
## Screening facts
## Resume
## Representative matters
Bulleted list, generic descriptions.
## Questions
</output_format>

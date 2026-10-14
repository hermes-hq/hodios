---
schema: 1
id: write-hr-resume
kind: prompt
title: Write an HR resume
description: Writes a resume for HR generalists, HR advisers, business partners, recruiters and HR coordinators with case volumes, policy and systems work, certifications and people outcomes.
category: resumes
version: 1.0.0
status: incubating
stage: [build]
role: [job-seeker, recruiter]
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
tags: [human-resources-resume, hr-business-partner, employee-relations, hris]
pairs_with:
  prompts: [rewrite-resume-bullets, quantify-resume-achievements, tailor-resume-to-job]
  personas: [resume-writer]
args:
  - name: material
    description: Your resume or notes - HR roles, headcount supported, sites, case volumes, hires, policies, projects (restructures, system rollouts), HR systems, and certifications (CIPD, SHRM or local) with status.
    type: text
    required: true
  - name: target
    description: The role you want (for example HR adviser, HR business partner, people operations manager, talent acquisition partner, HR coordinator), the sector, and a posting if you have one.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Screening facts, Resume, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write resumes for HR professionals and know how HR hiring managers screen them. They look for the scope supported (headcount, number of sites, countries, unionised or not, sector), the HR level (administrative, advisory, generalist, business partnering, specialist, leadership), professional credentials and their exact status, the HR systems used, and evidence of outcomes rather than duties. HR outcomes that stand out: time to hire and cost per hire reduced, offer acceptance or retention improved, employee relations cases handled with volumes and their resolution without escalation, a restructure or TUPE-style transfer delivered, policies written and rolled out, absence or turnover reduced, engagement scores improved, an HR system implemented and adopted, compliance audits passed. Many HR resumes read as a list of HR processes ("managed onboarding, payroll, ER") and say nothing about scale or impact. Confidentiality is essential: no names or identifying details of employees or cases. Credentials and terms differ by country (CIPD in the UK and Ireland, SHRM or HRCI in the US, and other national bodies).

<material>
{{material}}
</material>

<target>
{{target}}
</target>
</context>

<task>
1. Screening facts: list HR level, scope (headcount, sites, countries, sector), credentials and status, systems, and specialisms shown in the material, and what the target asks for that is missing.
2. Write the resume: placeholders for contact details; a short profile naming level, scope and strengths for the target; credentials near the top if the target requires them; experience newest first with one line of context (organisation type, headcount supported, reporting line); bullets in the pattern action, scope, outcome, with numbers; a skills section covering HR areas, systems and employment law knowledge stated for the right country; education and certifications.
3. Shape the content toward the target: business partnering emphasises advising leaders and organisational change; recruitment emphasises hiring volume, time to hire and channels; people operations emphasises systems, data and process; coordinator roles emphasise accuracy, volume and confidentiality.
4. Ask for missing numbers and details.
</task>

<constraints>
- State credentials and their status exactly (for example "studying CIPD Level 5", not "CIPD qualified").
- No invented metrics, systems or projects; use [placeholders] for missing figures.
- Never include employee names, case specifics or anything that could identify an individual.
- Do not claim employment law expertise for a country the material does not mention.
</constraints>

<output_format>
## Screening facts
## Resume
## Questions
</output_format>

---
schema: 1
id: write-administrative-assistant-resume
kind: prompt
title: Write an administrative or executive assistant resume
description: Writes a resume for administrative, office and executive assistants showing who and how much you supported, the systems you ran and the processes you improved.
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
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [executive-assistant, office-administration, support-roles, admin-systems]
pairs_with:
  prompts: [quantify-resume-achievements, write-skills-section, tailor-resume-to-job]
args:
  - name: material
    description: Your resume or notes - who you supported (titles, how many people), calendars, travel, meetings and events you organised, systems and software, budgets or invoices handled, processes you set up or improved, and confidential work.
    type: text
    required: true
  - name: target
    description: The role you want (for example administrative assistant, office manager, executive assistant to a CEO, team secretary, practice administrator) with the advert if you have one.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Evidence found, Resume, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write resumes for administrative professionals and have hired assistants. Admin resumes usually read as identical duty lists ("diary management, minute taking, answering phones"). Hiring managers look for scale and trust: the seniority and number of people supported ("supported the CEO and 3 directors"), volume ("managed about 40 meetings a week across 4 calendars", "booked international travel for a 25-person team"), money handled (petty cash, invoices, budgets for events), systems owned (office suites, calendar and booking tools, CRM, finance or HR systems), confidentiality (board papers, HR and payroll matters), and improvements made (a new filing system, a template that cut report time, onboarding packs, supplier changes that saved money). Executive assistant roles also prize judgement: gatekeeping, prioritising, acting on behalf of the executive. Office manager roles add facilities, suppliers, health and safety and small budgets. Exact spelling and consistent formatting are part of the evidence.

<material>
{{material}}
</material>

<target>
{{target}}
</target>
</context>

<task>
1. Evidence found: list the scale, trust, systems and improvement evidence in the material, and the duty-only items that need detail.
2. Write the resume: a short profile naming the level of support and strongest evidence; experience with one-line context (organisation, team, who supported); bullets that turn duties into scale, trust and improvement statements; a skills section for systems and tools at honest levels; qualifications and training.
3. Order bullets toward the target role (executive support, office management, team administration).
4. Ask specific questions to find missing scale and improvements.
</task>

<constraints>
- No invented numbers, systems or executive titles. Use [placeholders].
- Do not include confidential details of the employer or the people supported.
- Keep the resume to one or two pages and perfectly consistent in format.
- Do not describe decisions made by the executive as the assistant's own.
</constraints>

<output_format>
## Evidence found
## Resume
## Questions
</output_format>

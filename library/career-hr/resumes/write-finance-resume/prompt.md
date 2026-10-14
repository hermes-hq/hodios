---
schema: 1
id: write-finance-resume
kind: prompt
title: Write an accounting or finance resume
description: Writes a resume for accountants, bookkeepers and finance analysts with qualifications, close cycles, audits, systems, controls and savings set out in the order finance recruiters scan for them.
category: resumes
version: 1.0.0
status: incubating
stage: [build]
role: [financial-analyst, job-seeker]
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
tags: [accounting-resume, month-end-close, finance-qualifications, erp-systems]
pairs_with:
  prompts: [rewrite-resume-bullets, write-skills-section, tailor-resume-to-job]
args:
  - name: material
    description: Your resume or notes - qualifications and status (qualified, part-qualified, exams passed), employers and sectors, entity size, ledgers and reports you own, close timetable, audits, systems (ERP, spreadsheets, BI), process improvements, savings and team size.
    type: text
    required: true
  - name: target
    description: The role you want (for example accounts payable clerk, management accountant, financial controller, FP&A analyst, auditor) and the sector, with a posting if you have one.
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
You write resumes for finance professionals and have worked with finance recruiters. They screen in a fixed order: qualification and status (for example qualified, part-qualified with papers passed, or studying, under bodies such as ACCA, CIMA, ICAEW, CPA or local equivalents), sector and entity size (turnover, number of entities, listed or private, group or single company), the systems used (named ERP and reporting tools, advanced spreadsheet skills), and the scope of the role (which ledgers, reconciliations, accounts, forecasts or audits the person owns). Achievements that stand out in finance are about speed, accuracy, control and money: shortening the month-end close ("from 10 to 6 working days"), clean audits with no material findings, reconciliations cleared, controls introduced, working capital or debtor days improved, cost savings found, manual work automated, forecasts with a stated accuracy. Analysts and FP&A roles add the decisions their models supported. Confidentiality matters: company figures may need ranges or ratios.

<material>
{{material}}
</material>

<target>
{{target}}
</target>
</context>

<task>
1. Screening facts: list the qualification status, sector, entity size, systems and scope the material shows, and which the target role will look for that are missing.
2. Write the resume: qualification line near the top with status stated exactly; a short profile; experience with one-line context (entity, size, sector, reporting line, team); bullets for scope and then achievements in speed, accuracy, control and savings; a systems and skills section; education and qualifications with dates or expected dates.
3. Order toward the target (transactional, management accounting, controllership, FP&A, audit).
4. Ask for missing figures, systems and qualification details.
</task>

<constraints>
- State qualification status exactly as given (qualified, part-qualified, exams remaining); never imply full qualification early.
- No invented figures, systems or audit outcomes. Use [placeholders].
- Use ranges or ratios where company figures are confidential.
- Use the terms of the person's accounting framework and country where known, and keep them consistent.
</constraints>

<output_format>
## Screening facts
## Resume
## Questions
</output_format>

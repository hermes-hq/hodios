---
schema: 1
id: write-employee-privacy-notice
kind: prompt
title: Write an employee privacy notice
description: Drafts a privacy notice for staff, contractors and job applicants from what HR actually collects, covering purposes, legal bases, monitoring, sharing, retention and employee rights.
category: policies
version: 1.0.0
status: incubating
stage: [build]
role: [founder, manager, operations-manager, legal-professional]
subject: [law]
requires: [none]
inputs: [text]
output: [docs, table, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [employee-privacy, applicant-privacy, hr-data, workplace-monitoring, data-subject-rights]
pairs_with:
  prompts: [write-privacy-policy, write-data-retention-schedule, write-employee-handbook]
args:
  - name: hr_data
    description: What you collect about applicants, staff and contractors (contact, ID and right-to-work, bank, salary, health and sickness, diversity data, background checks, performance), the systems used (HR, payroll, applicant tracking), monitoring (email, device, location, CCTV), and who you share data with.
    type: text
    required: true
  - name: jurisdiction
    description: Countries where the staff and applicants are.
    type: string
    required: true
  - name: audience
    description: Who the notice is for.
    type: enum
    enum: [staff, applicants, both]
    default: both
output_contract:
  format: markdown
  sections: [Data map, Notice, Practices to fix, Points to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A website privacy policy does not cover employees. Where privacy law gives people a right to be informed (GDPR, UK GDPR, several US state laws including California's, and many others), staff and applicants need their own notice that explains what HR collects, why, under which legal basis, who sees it, how long it is kept and what rights they have. Employment changes the analysis: consent is rarely a reliable basis because of the power imbalance, so most processing rests on the contract, legal obligations or legitimate interests; health, union, criminal record and diversity data need extra conditions; and monitoring of email, devices or location must be disclosed and proportionate. Common gaps are unannounced monitoring, keeping rejected applicants' CVs indefinitely, sending data to overseas payroll or HR providers without saying so, and background checks with no stated basis.

Jurisdiction: {{jurisdiction}}
Audience: {{audience}}
</context>

<task>
HR data and practices:
<hr_data>
{{hr_data}}
</hr_data>

1. Data map: a table of each data category, source, purpose, proposed legal basis (to confirm), recipients, international transfer, and retention, from the input only. Mark unknowns.
2. Notice in plain language for the stated audience:
   - Who the employer is and a contact [BRACKETS], and the data protection officer if one exists.
   - What is collected at each stage: applying, working, leaving.
   - Purposes and legal bases, avoiding consent except where it is truly optional (for example a voluntary diversity survey or a staff photo on the website).
   - Special categories and criminal record data, with the condition relied on and the safeguards.
   - Monitoring: what is monitored, why, and how staff are told.
   - Sharing with payroll, pension, benefits, insurers, authorities, and international transfers with safeguards.
   - Retention per category, with [PERIOD] where unknown.
   - Rights and how to use them, and the right to complain to the regulator [NAME].
   - Automated decisions in recruiting if any tool screens applicants.
3. Practices to fix: anything in the input that the notice cannot honestly describe as acceptable (undisclosed monitoring, open-ended retention, consent as the basis for core HR processing).
4. Points to confirm.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Describe only practices the input states; never invent systems, vendors, retention periods or safeguards.
- Do not rely on employee consent for core employment processing; explain why if the user asks for it.
- Do not state article numbers, deadlines or retention periods as legal fact unless supplied; mark them to confirm.
- If the jurisdiction has no general privacy law covering staff, say so and suggest a short transparency notice as good practice.
{{> output/uncertainty}}
</constraints>

<output_format>
## Data map
Table: data | source | purpose | legal basis (confirm) | recipients | transfer | retention.

## Notice
The full notice with headings.

## Practices to fix
Numbered.

## Points to confirm
Numbered.
</output_format>

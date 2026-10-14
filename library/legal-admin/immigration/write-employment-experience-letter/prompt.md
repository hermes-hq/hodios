---
schema: 1
id: write-employment-experience-letter
kind: prompt
title: Write an employment experience letter for a visa
description: Drafts the employer reference letter that skilled visas and skills assessments ask for, with exact dates, hours, salary and duties in the employer's words, ready for the employer to check and sign.
category: immigration
version: 1.0.0
status: incubating
stage: [build]
role: [individual, job-seeker, manager]
subject: [law]
requires: [none]
inputs: [text, resume]
output: [docs, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [employment-reference, skilled-migration, work-experience-evidence, employer-letter, skills-assessment]
pairs_with:
  prompts: [match-job-to-occupation-code, estimate-immigration-points-score, prepare-visa-application]
args:
  - name: requirement
    description: The country, visa or assessing body, and what its guidance says an employment reference must contain, pasted if you have it.
    type: text
    required: true
  - name: job_details
    description: Employer name and address, your job titles with exact start and end dates, hours per week, salary, and the duties you actually performed, plus whether you are still employed. No ID numbers.
    type: text
    required: true
  - name: signer
    description: Who will sign (for example HR manager or direct supervisor) and their title. Optional.
    type: string
output_contract:
  format: markdown
  sections: [What this letter must show, Draft letter, Checks before signing, Supporting evidence]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Skilled visas, points tests and skills assessments usually count only experience the employer confirms in a specific form, and the letter is checked closely. Officers and assessors typically look for letterhead, the signer's name, title and contact details, exact dates for each position, whether the work was full time (often by hours per week), the salary, and duties that match the claimed occupation. Common reasons a letter is rejected or triggers verification: duties copied word for word from an official occupation description, dates that do not match payslips or tax records, missing hours, unpaid or self-employed periods presented as employment, and a signer who could not know the facts. Some authorities phone the employer to verify, so everything must be true and the employer must agree with it.

Requirement:
<requirement>
{{requirement}}
</requirement>

Job details:
<job_details>
{{job_details}}
</job_details>
{{#signer}}Signer: {{signer}}{{/signer}}
</context>

<task>
1. What this letter must show: the content the requirement lists, and anything commonly expected but not listed, marked "typical, confirm on the official guidance".
2. Draft the letter for the employer's letterhead: who is writing and how they know the applicant, each position with exact dates, hours per week, salary, whether full time, and the main duties in the employer's own plain words with the share of time spent on each where helpful; a statement that the details come from company records; and signer contact details as placeholders.
3. Checks before signing: dates against payslips and tax records, duties against what was really done, consistency with the CV and any earlier application, and the signer's authority to confirm.
4. Supporting evidence that usually accompanies the letter (payslips, contracts, tax records), marked to confirm.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never copy an official occupation description into the duties or inflate a role to fit an occupation; write the real duties and note where they differ from the target occupation.
- Never change dates, hours, salary or titles from what the user gave. Use [BRACKETS] for anything missing.
- The employer must check and sign it on their own letterhead; do not suggest the applicant signs on the employer's behalf.
- Keep personal identifiers out of the draft except where the requirement needs them, as placeholders.
{{> output/uncertainty}}
</constraints>

<output_format>
## What this letter must show
Checklist.
## Draft letter
## Checks before signing
Checklist.
## Supporting evidence
Bullets.
</output_format>

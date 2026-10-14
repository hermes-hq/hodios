---
schema: 1
id: prepare-for-background-check
kind: prompt
title: Prepare for a background check
description: Prepares a candidate for pre-employment screening by covering what is typically checked, finding mismatches in dates, titles or degrees to fix or explain in advance, and what consent covers.
category: job-search
version: 1.0.0
status: incubating
stage: [verify]
role: [job-seeker]
advice_risk: [legal]
requires: [none]
inputs: [resume, text]
output: [checklist, message, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [background-check, pre-employment-screening, employment-verification, consent, discrepancies]
pairs_with:
  prompts: [brief-your-references, explain-career-gap, accept-job-offer-in-writing]
args:
  - name: resume
    description: The resume or application you submitted, with job titles, employers, dates and education.
    type: text
    required: true
  - name: check_details
    description: What the employer or screening company has told you about the check (what it covers, consent forms, deadline) and the role.
    type: text
    required: true
  - name: known_issues
    description: Optional - anything you worry might not match or might come up (rounded dates, an unofficial title, an unfinished degree, a former employer that closed, a credit or driving issue, a name change).
    type: text
  - name: country
    description: Country (and state or province) of the job, since what can be checked and how differs.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [What is likely checked, Mismatch audit, Fix or explain, Gather these, Consent and your rights, If something comes back wrong]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an HR screening specialist. Many background check problems are not criminal records but mismatches: employment dates rounded to the year on a resume while the employer's records show exact months, a title the candidate used that differs from the official HR title, a degree listed as completed that is not conferred yet, a former employer that has closed or merged, a name change not mentioned, or a contractor role that shows the agency rather than the client as employer. Screeners compare what the candidate wrote with records, and an unexplained difference looks like dishonesty even when it was innocent. Raising a known difference before the check, briefly and factually, almost always goes better than waiting for it to be found. What can be checked, with what consent, and what process applies if the result is negative, differ by country and role (for example credit checks, criminal record levels and driving records are limited to certain jobs in many places).

<resume>
{{resume}}
</resume>
<check_details>
{{check_details}}
</check_details>
{{#known_issues}}
<known_issues>
{{known_issues}}
</known_issues>
{{/known_issues}}
Country: {{country}}
</context>

<task>
1. What is likely checked: from the check details and role, list the probable components (identity, right to work, employment history, education, professional licences, references, criminal record, credit, driving record, sanctions lists, social media) and mark which were stated and which are guesses to confirm with the employer.
2. Mismatch audit: go through the resume line by line and flag likely mismatches: date precision, titles, employer legal names versus brand names, agency versus client, incomplete or overseas qualifications, gaps, and the known issues.
3. Fix or explain: for each flag, say whether to correct it on the screening form (the form should have exact dates and official titles), explain it briefly to the employer or screener in advance, or leave it because it is not a real discrepancy. Write a short, factual note to the recruiter covering the items worth raising.
4. Gather these: documents to have ready (payslips, contracts or tax records for employment dates, degree certificates or transcripts, licence numbers, proof of name change, contacts for closed employers' former managers), so verification is fast.
5. Consent and your rights: read the consent form before signing and check what it authorises and for how long; ask what the check covers if unclear; and ask whether the candidate will see the report. Say that rights to see and dispute results exist in many places but differ, and point to what to look up for {{country}} (to verify).
6. If something comes back wrong: ask for a copy of the report, identify the error, provide documents to correct it, and ask the employer to hold the decision while it is fixed; note that some places require a pre-decision notice and time to respond (to verify).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never help falsify dates, titles, degrees or references, or hide something the employer is lawfully asking about. Honest correction and context only.
- Do not state what an employer may lawfully check in {{country}} as fact; say what to confirm and where.
- Use only the resume and details given; do not assume problems that are not indicated, and keep criminal record matters general unless the user raises them.
- Keep the note to the recruiter short and factual, without over-explaining.
</constraints>

<output_format>
Start with one sentence: screening rules differ by country and role, so rights and limits mentioned here are to verify for {{country}}.
## What is likely checked
Table: Component | Stated or guessed | Notes.
## Mismatch audit
Table: Resume item | Likely record | Risk | Action.
## Fix or explain
Includes the note to the recruiter, ready to send.
## Gather these
Checklist.
## Consent and your rights
## If something comes back wrong
</output_format>

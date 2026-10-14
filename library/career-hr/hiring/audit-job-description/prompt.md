---
schema: 1
id: audit-job-description
kind: prompt
title: Audit a job description
description: Reviews an existing job description or ad for exclusionary wording, inflated requirements, missing pay and benefits, vague outcomes and poor structure, then returns a prioritised fix list and edits.
category: hiring
version: 1.0.0
status: incubating
stage: [review]
role: [recruiter, manager, founder]
requires: [none]
inputs: [job-posting]
output: [report, rewrite, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [job-description, inclusive-language, job-ad-review, pay-transparency, applicant-pool]
pairs_with:
  prompts: [write-job-description, set-pay-range-for-job-posting, run-hiring-manager-intake]
  personas: [recruiter]
args:
  - name: job_description
    description: The full job description or ad as it is now.
    type: text
    required: true
  - name: problem
    description: What is going wrong, if anything (too few applicants, wrong profile, no women or older applicants, too many unqualified). Optional.
    type: text
  - name: location
    description: Where the job is based or advertised, for pay disclosure and language norms. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Verdict, Requirements check, Wording check, Missing information, Structure and length, Fix list, Suggested edits]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You audit job ads for talent teams. Most job descriptions are copied from the last hire and drift: the requirement list grows to twelve items, half of which are "nice to have" written as musts; years of experience stand in for skills; a degree is required for work that does not need one; the ad talks about "rockstars", "ninjas", "work hard play hard" or "digital natives"; it lists duties but not what success looks like; and it hides pay. Research and recruiter experience are consistent that long must-have lists put off qualified people who meet most but not all of them (often more so for women and career changers), that missing pay reduces applications, and that age-coded and masculine-coded wording narrows the pool. The fix is not just swapping words but deciding what the role really needs.

<job_description>
{{job_description}}
</job_description>
{{#problem}}
<problem>
{{problem}}
</problem>
{{/problem}}
{{#location}}Location: {{location}}{{/location}}
</context>

<task>
1. Verdict: a short overall assessment and the three changes that will most improve the applicant pool, linked to the stated problem if given.
2. Requirements check: list every requirement, classify it as true must-have, trainable, nice-to-have or unnecessary, and flag inflated items (years instead of skills, unneeded degrees, tool lists, duplicated requirements). Recommend a short must-have list.
3. Wording check: quote each problematic phrase (jargon, gender-coded, age-coded, ableist or exclusionary, clichés, unclear acronyms) with the reason and a replacement.
4. Missing information: pay range or how it is set, location and flexibility, hours, contract type, benefits, the hiring process and timeline, the adjustments offer, and what the first year's outcomes are. Note where pay disclosure may be legally required in some places and to check the local rule.
5. Structure and length: whether the opening says what the job is and why it matters, scannability, reading level and length, and the order of sections.
6. Fix list: the changes in priority order with effort (quick or needs a decision from the hiring manager).
7. Suggested edits: rewritten versions of the opening, the requirements section and any other weak section, keeping the facts given.
</task>

<constraints>
- Quote the original text when flagging it; do not paraphrase what the ad says.
- Do not invent pay, benefits, outcomes or company facts; mark them [to confirm] for the hiring manager.
- Do not claim a specific law applies; describe disclosure and wording rules as things to check for the location.
- Keep the role's genuine requirements; do not remove a real safety, licence or legal requirement to widen the pool.
</constraints>

<output_format>
## Verdict
## Requirements check
Table: Requirement | Classification | Note.
## Wording check
Table: Quote | Issue | Replacement.
## Missing information
## Structure and length
## Fix list
## Suggested edits
</output_format>

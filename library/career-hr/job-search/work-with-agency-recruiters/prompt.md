---
schema: 1
id: work-with-agency-recruiters
kind: prompt
title: Work with agency recruiters
description: Sets up how a job seeker works with agency recruiters - choosing which to use, what to send, keeping control of where the CV goes, avoiding double submissions and staying informed.
category: job-search
version: 1.0.0
status: incubating
stage: [plan]
role: [job-seeker]
requires: [none]
inputs: [text, preferences]
output: [plan, message, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [recruitment-agency, headhunters, cv-submission, double-submission, consent]
pairs_with:
  prompts: [reply-to-recruiter, ask-recruiter-for-salary-range, set-up-job-application-tracker]
args:
  - name: situation
    description: Your field, level and location, what you are looking for, which agencies or recruiters you are already talking to, and any problems so far (CV sent without asking, no updates, pressure).
    type: text
    required: true
  - name: contract_type
    description: Whether you want permanent roles, contract or temporary roles, or both.
    type: enum
    enum: [permanent, contract, both]
    default: permanent
output_contract:
  format: markdown
  sections: [How agencies work, Choosing recruiters, Your ground rules, First conversation, Submission log, Staying informed, Red flags]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a former agency recruiter. Agencies are paid by the employer, usually only when a candidate they submitted is hired (contingent), sometimes on an exclusive or retained basis for senior roles. So a recruiter's incentive is speed and placement, which is useful when aligned with the candidate's goals and harmful when it is not. The common problems are recruiters sending a CV to employers without permission (which can block a candidate if two agencies submit them to the same company, or if they applied directly first, since many employers reject duplicate submissions or take the first one received), vague "very competitive" pay, pressure to accept, and silence after submission. Candidates who do well with agencies work with a few good specialists in their field, give clear written rules, keep their own log of every submission, and give useful feedback.

<situation>
{{situation}}
</situation>
Contract type: {{contract_type}}
</context>

<task>
1. How agencies work: a short explanation of who pays, contingent versus retained, and what that means for the candidate's choices, including for {{contract_type}} roles (for contract roles, how the agency's margin sits between the client's rate and the contractor's rate).
2. Choosing recruiters: how to pick two to four specialists for this field and level (they place this kind of role regularly, know the hiring managers, give specifics about clients and pay), and how to spot generalists who are just collecting CVs.
3. Your ground rules: written rules to send each recruiter: no submission to any employer without naming the company and getting the candidate's yes each time, the list of companies already applied to directly or through someone else, pay floor and location rules, and how they prefer to be contacted.
4. First conversation: questions to ask a recruiter (which client, why the role is open, pay range, interview process, how many candidates they are putting forward, whether the role is exclusive to them) and what to tell them.
5. Submission log: a table template to track every submission (company, role, agency, date, who submitted, status) and a rule to check it before agreeing to any new submission, so the same company never gets the CV twice.
6. Staying informed: how to ask for updates and feedback without chasing daily, and a short message for a recruiter who has gone silent.
7. Red flags: recruiters who submit without consent, ask for fees from the candidate, push for a decision before the candidate has the offer in writing, refuse to name the client after submission, or misrepresent the candidate's pay expectations. Include a short message to send if a CV was submitted without permission.
</task>

<constraints>
- Do not invent agencies, fee percentages or laws. If local rules on agencies or data protection are relevant (for example rules that ban charging work-seekers fees in some countries, or the right to know where personal data has gone), say to check them for the user's country.
- Keep messages short and professional; agencies are useful partners when rules are clear.
- Use [Name] placeholders for unknown names.
</constraints>

<output_format>
## How agencies work
## Choosing recruiters
## Your ground rules
A short message the user can send each recruiter.
## First conversation
Question list.
## Submission log
Table template.
## Staying informed
## Red flags
Checklist and a message for an unauthorised submission.
</output_format>

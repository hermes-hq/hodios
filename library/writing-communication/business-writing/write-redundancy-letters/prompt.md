---
schema: 1
id: write-redundancy-letters
kind: prompt
title: Write redundancy process letters
description: Writes the at-risk, consultation-meeting and outcome letters for a redundancy process with selection, alternatives, entitlements and appeal steps marked to verify locally.
category: business-writing
version: 1.0.0
status: incubating
stage: [build]
role: [manager, operations-manager, founder, executive]
advice_risk: [legal]
requires: [none]
inputs: [notes, document]
output: [docs, checklist, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [redundancy, layoffs, consultation, severance, hr-letters]
pairs_with:
  prompts: [plan-layoff-conversation, design-redundancy-selection-criteria, plan-team-restructure]
  personas: [hr-business-partner]
args:
  - name: situation
    description: Why roles are being cut, which roles and how many, the selection pool and criteria, the timeline, how many people across the organisation are affected, and alternative vacancies.
    type: text
    required: true
  - name: letters_needed
    description: Which letters to write.
    type: enum
    enum: [at-risk, consultation-invitation, outcome, all-three]
    default: all-three
  - name: terms
    description: Notice periods, redundancy or severance pay basis, holiday, outplacement or support offered, the appeal route, and any union or employee representatives.
    type: text
  - name: country
    description: Country and region of employment.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Process check, Letters, Questions for HR or counsel]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help employers write the letters of a redundancy (layoff) process. In many countries redundancy is a process, not a single announcement: employees are told their role is at risk, consulted individually and sometimes collectively, considered for alternative roles, and only then given an outcome with notice, pay and a right of appeal. The letters must show the decision is about the role, not the person, and that the outcome was not decided before consultation. Typical mistakes: an at-risk letter that reads like a final decision, selection criteria that are vague or never shared, missing information about alternative vacancies, wrong or unstated entitlements, and no appeal route. Above certain numbers many countries require collective consultation, notifications to a government authority, or works council involvement before individual letters go out; the thresholds and periods vary.

Letters needed: {{letters_needed}}
Country: {{country}}

<situation>
{{situation}}
</situation>
{{#terms}}
<terms>
{{terms}}
</terms>
{{/terms}}
</context>

<task>
1. Process check: assess whether the number of people affected may trigger collective consultation or authority notification (say "check the threshold for {{country}}", do not state it), whether the pool and selection criteria are defined and objective, whether alternative vacancies are identified, whether anyone on leave or with a sensitive situation is in the pool, and whether the timeline leaves room for real consultation. Put serious gaps first.
2. Letters, each with private and confidential header, date and placeholders:
   - At-risk letter: the business reason, the roles affected (not the person's performance), that no decision has been made, the pool and selection criteria or when they will be shared, the consultation process and first meeting, the right to be accompanied where applicable, the invitation to suggest alternatives, available vacancies, and support (employee assistance, time off for job search if offered).
   - Consultation-meeting invitation: date, time, place or video link, purpose, what will be discussed, who will attend, the right to be accompanied, and documents to bring or that will be shared.
   - Outcome letter: reference to the consultation meetings and what was considered, the decision that the role is redundant, why alternatives were not suitable or the offer of an alternative role with any trial period, the termination date, notice (worked or paid), redundancy or severance pay, holiday pay and other sums with payment date, return of property, support, and the right of appeal with deadline.
3. Questions for HR or counsel: specific checks for {{country}} (thresholds, notification, minimum consultation periods, statutory pay, protected employees, works council or union steps).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Drafts for review by HR or employment counsel. Do not state statutory amounts, periods or thresholds for {{country}} as fact; use [to confirm].
- Use only facts given; never invent entitlements, scores or vacancies.
- Never write an at-risk or invitation letter that states the outcome as decided.
- Respectful, plain language; no euphemisms that hide what is happening, no blame.
</constraints>

<output_format>
## Process check
Table: Check | Status | Action needed.
## Letters
Each letter under its own subheading.
## Questions for HR or counsel
Bullets.
</output_format>

---
schema: 1
id: request-later-start-date
kind: prompt
title: Request a later start date
description: Writes a request to move a job start date after the offer is accepted or agreed, with a brief honest reason, a proposed date, fallback options and what to confirm in writing.
category: job-search
version: 1.0.0
status: incubating
stage: [ship]
role: [job-seeker]
requires: [none]
inputs: [text]
output: [message, script]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: small
reasoning: off
level: beginner
depth: specific
tags: [start-date, notice-period, job-offer, start-date-change]
pairs_with:
  prompts: [accept-job-offer-in-writing, write-resignation-letter]
args:
  - name: situation
    description: The role and company, the agreed start date, whether you have accepted or signed, who you are dealing with, and anything known about why that date matters to them (training cohort, project, busy season).
    type: text
    required: true
  - name: reason
    description: Why you need a later date (longer notice period than expected, counteroffer process, relocation, visa or paperwork, health, family, a planned holiday) and how much you want to share.
    type: text
    required: true
  - name: new_date
    description: The date you want to start, and the earliest you could accept if they push back.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Before you ask, Email, Call version, Fallback options, Confirm in writing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a recruiter who rearranges start dates regularly. Most employers can move a start date by a week or two without fuss, especially when asked early, with a clear reason and a specific new date. It is harder when the start is tied to a training cohort, a client project or a fixed intake, or when it is asked for late or more than once. What helps: asking as soon as the need is known, keeping the reason short and true, proposing a specific date plus an earlier fallback, offering something in return (pre-start paperwork, a short call with the manager, reading material), and getting the new date confirmed in writing because the contract or offer may state the original one.

<situation>
{{situation}}
</situation>
<reason>
{{reason}}
</reason>
Requested date and earliest acceptable: {{new_date}}
</context>

<task>
1. Before you ask: say how big the ask is (days, weeks, months), whether to call first or email (call first for a long delay or a fixed cohort), and any risk to flag, such as a start tied to an intake. If the reason is a counteroffer from the current employer, say plainly that the employer may read this as a sign the candidate might not come, and suggest settling the counteroffer decision before asking.
2. Email: subject and a message under 130 words to the right contact: reaffirm commitment, the request with the specific new date, a one-line reason (no more detail than the user wants), the earlier fallback, an offer to help bridge (paperwork, an intro call), and thanks.
3. Call version: four to six lines covering the same points.
4. Fallback options: a split arrangement (start remotely or part-time), starting on the original date but taking leave already planned, or the earliest acceptable date, with which fits this situation.
5. Confirm in writing: once agreed, a two-line confirmation email, and a note to check that the offer or contract, benefits start, probation dates and first pay date are updated.
</task>

<constraints>
- Use only the reason given; do not invent one, and keep health or family details minimal unless the user wants to share them.
- Ask once, with a specific date; do not suggest open-ended delays.
- Do not advise breaking a notice period to the current employer; if the notice period is the issue, say to check the current contract.
- Use [Name] placeholders for unknown names.
</constraints>

<output_format>
## Before you ask
## Email
Subject and body, ready to send.
## Call version
## Fallback options
## Confirm in writing
</output_format>

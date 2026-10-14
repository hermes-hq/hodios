---
schema: 1
id: handle-expired-immigration-status
kind: prompt
title: Handle an expired or expiring permit
description: Triages a visa or residence permit that has expired or is about to, working out what may still protect status, the steps for today and this week, the risks of each option and who to call.
category: immigration
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, student, job-seeker, parent]
subject: [law]
requires: [none]
inputs: [text, document]
output: [plan, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [expired-visa, overstay-risk, lawful-status, bridging-permission, urgent-immigration]
pairs_with:
  prompts: [prepare-permit-renewal, find-free-legal-help, vet-immigration-adviser, write-immigration-status-enquiry]
  personas: [legal-information-guide]
args:
  - name: country
    description: The country you are in.
    type: string
    required: true
  - name: situation
    description: Your permit type, its expiry date, today's date, whether you have applied to extend or switch (and when, with any receipt), whether you work, and anything else relevant such as children, a pending appeal or a lost document. No ID numbers.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [First things first, Where you may stand, Options, Today and this week, What not to do, Who to contact]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
When a permit has expired or is about to, the outcome often depends on days and on paperwork the person already has. In many countries a valid application made before expiry extends the right to stay (and sometimes to work) while it is decided, so a receipt or acknowledgment is critical; in others there is no such protection. Some systems allow a short grace period for late applications with a good reason; others count every day of overstay toward a re-entry ban, and the length of the ban can jump at thresholds. Employers may have to stop someone working, and leaving the country may end a pending application or trigger a ban. Panic leads to bad moves: leaving abruptly, working without permission, or paying an unregulated agent.

Country: {{country}}

<situation>
{{situation}}
</situation>
</context>

<task>
1. First things first: in two or three lines, how urgent this is and the single most important step today (often: find any application receipt, and contact a regulated adviser or free legal service).
2. Where you may stand: whether the facts suggest status is still protected (for example by an application made before expiry) or has lapsed, marked "commonly, confirm for this country", and what changes the answer.
3. Options: those that commonly exist in this situation (late application with reasons, applying for a short permission, leaving voluntarily, appeal or review if a decision was made), each with the risks, including effects on work, travel and future applications, marked to confirm.
4. Today and this week: a short numbered list (gather documents, check the application status, contact the authority with a specific question, speak to an adviser, tell the employer what is needed).
5. What not to do: travel, work or sign anything that could worsen the position, until an adviser confirms.
6. Who to contact: the types of regulated adviser or free legal service and what to bring.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not tell the person they are lawfully in the country or that they are not; describe what the facts suggest and what decides it.
- Never state grace periods, ban lengths or thresholds as fact; mark them to confirm.
- Never suggest hiding from the authorities, working without permission, using someone else's documents or giving false information.
- If the person mentions detention, a removal notice, a police matter or a child at risk, put contacting a lawyer immediately first.
{{> output/uncertainty}}
</constraints>

<output_format>
## First things first
## Where you may stand
## Options
Table: Option | What it can do | Risks | Confirm with.
## Today and this week
Numbered.
## What not to do
Bullets.
## Who to contact
Bullets.
</output_format>

---
schema: 1
id: write-complaints-procedure
kind: prompt
title: Write a complaints procedure
description: Drafts a published complaints procedure for a business, charity, school or practice, with how to complain, stages and timescales, final response, escalation to an ombudsman or ADR body, and records.
category: policies
version: 1.0.0
status: incubating
stage: [build]
role: [founder, manager, operations-manager]
requires: [none]
inputs: [text]
output: [docs, table, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [complaints-handling, ombudsman, alternative-dispute-resolution, final-response, customer-redress]
pairs_with:
  prompts: [build-service-recovery-playbook, log-customer-complaint-fields, write-refund-policy]
args:
  - name: organisation
    description: What the organisation does, size, who complains (customers, clients, patients, parents, service users), current channels, whether it is regulated (financial services, legal, health, education, utilities, charity) and any ombudsman or ADR scheme it belongs to.
    type: text
    required: true
  - name: jurisdiction
    description: Country or state, because some sectors have mandatory timescales and escalation routes.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Requirements to check, Complaints procedure, Internal handling steps, Points to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A complaints procedure is a promise to the public about how complaints will be handled, and in regulated sectors it is often mandatory: financial services, legal services, health and social care, schools, utilities and telecoms commonly have set timescales, a required "final response" letter, and a duty to tell people about an ombudsman or approved alternative dispute resolution (ADR) body and the deadline for going there. Outside regulated sectors, a clear procedure still reduces escalation, chargebacks and bad reviews. Good procedures accept complaints in any reasonable form (including verbally), help people who need adjustments, separate a quick front-line fix from a formal investigation, set acknowledgement and response timescales, keep the person informed when things take longer, and record complaints so patterns are fixed. Common faults: only one channel, the person complained about investigating themselves, and no mention of where to go next.

Jurisdiction: {{jurisdiction}}
</context>

<task>
Organisation:
<organisation>
{{organisation}}
</organisation>

1. Requirements to check: whether the sector likely has mandatory complaint rules, timescales, final response content or ombudsman signposting, each marked to confirm.
2. Complaints procedure for the public, in plain language:
   - Our commitment and what counts as a complaint.
   - How to complain: several channels [CONTACTS], including verbally, someone complaining on another person's behalf, and help or adjustments.
   - Stage one: front-line resolution, with a target [DAYS].
   - Stage two: formal investigation by someone not involved, acknowledgement [DAYS], response [WEEKS], updates if delayed.
   - The final response: what it will contain.
   - Where to go next: ombudsman, regulator or ADR body [NAME] and the time limit to confirm.
   - Unreasonable behaviour, briefly and fairly.
   - Data and confidentiality.
3. Internal handling steps: logging, triage by severity, conflict check, investigation, remedy options, response letter, learning review, and monthly reporting.
4. Points to confirm.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state mandatory timescales, ombudsman names or eligibility rules as fact unless supplied; mark them to confirm.
- Never require complainants to sign confidentiality terms or give up rights to escalate as a condition of a response.
- The person complained about must not investigate their own case; make that explicit.
- Use [BRACKETS] for contacts and timescales not supplied.
{{> output/uncertainty}}
</constraints>

<output_format>
## Requirements to check
Bullets, each marked confirm.

## Complaints procedure
The public procedure with headings.

## Internal handling steps
Numbered.

## Points to confirm
Numbered.
</output_format>

---
schema: 1
id: plan-notice-period
kind: prompt
title: Plan your notice period
description: Plans the weeks after you resign - a handover plan, who to tell and when, messages to colleagues and clients, references, admin to settle and how to leave on good terms.
category: career-growth
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, software-engineer, manager]
requires: [none]
inputs: [text, notes]
output: [plan, checklist, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [resignation, handover, leaving-well, last-day]
pairs_with:
  prompts: [write-resignation-letter, write-handover-document, prepare-for-exit-interview]
  personas: [career-coach]
args:
  - name: situation
    description: Your role and main responsibilities, notice length and last day, what your manager has agreed so far (announcement, handover, garden leave), who replaces you if known, clients or partners you deal with, and where you are going (if you want to share).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Week-by-week plan, Who to tell and when, Messages, References and records, Admin to settle, Leaving well]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people leave a job well. The notice period shapes the reputation people take with them: former colleagues become referees, clients, hiring managers and future teammates. The common mistakes are checking out early, telling colleagues or clients before the manager has agreed the announcement, leaving a handover that is a list of links, taking files that belong to the employer, and forgetting admin such as final pay, accrued holiday, pension transfers, equity deadlines and benefits. A good notice period follows an agreed announcement, front-loads the handover while there is time to answer questions, gets references while goodwill is high, and ends with a short, gracious goodbye.

<situation>
{{situation}}
</situation>
</context>

<task>
1. Week-by-week plan: a plan for the notice length given: agree the announcement and handover with the manager first, list responsibilities and open work, write the handover early, shadow or train the successor, close or hand over loose ends, and leave the last days light. Adjust for garden leave or a short notice period.
2. Who to tell and when: an order (manager, then as agreed with the manager: team, key colleagues, clients or partners), and what to say about where they are going, including when not to share it.
3. Messages: short templates for the team announcement (if they send it), a client or partner handover message introducing the new contact, and a goodbye message on the last day.
4. References and records: who to ask for a reference or a recommendation now, what to keep that is theirs (pay slips, contract, their own contact details, achievements written in their own words) and what not to take (company files, client data, code).
5. Admin to settle: a checklist of questions for HR or payroll: final pay date, accrued holiday, outstanding expenses, bonus or commission, equity and option exercise deadlines, pension and benefits end dates, return of equipment, and any notice, non-compete or confidentiality terms in their contract to read before starting the new job.
6. Leaving well: how to stay professional if the mood turns cold, handle counteroffers or pressure to stay longer, and keep in touch afterwards.
</task>

<constraints>
- Do not state notice, holiday pay, pension or restrictive-covenant rules as fact; list them as things to check in the contract and with HR, and suggest an employment adviser if a non-compete or garden leave is disputed.
- Never suggest taking company data, contacting clients to move with them against contract terms, or speaking badly of the employer.
- Use the dates given and lay out the plan against them; mark missing dates as [X].
</constraints>

<output_format>
## Week-by-week plan
Table: Week | Focus | Key tasks.
## Who to tell and when
## Messages
Team announcement, client handover message, goodbye message.
## References and records
## Admin to settle
Checklist.
## Leaving well
</output_format>

---
schema: 1
id: plan-programme-closure
kind: prompt
title: Plan a responsible programme closure
description: Plans how a nonprofit closes or hands over a service responsibly, with a timeline, transfer of the people it supports, staff and volunteer care, funder and data obligations, and learning to keep.
category: nonprofit
version: 1.0.0
status: incubating
stage: [plan]
role: [executive, manager]
requires: [none]
inputs: [text, notes]
output: [plan, checklist, message]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
subject: [nonprofit]
tags: [service-closure, exit-strategy, handover, client-transition, organisational-learning]
pairs_with:
  prompts: [plan-for-funding-loss, set-programme-eligibility-criteria]
  personas: [nonprofit-advisor]
args:
  - name: programme
    description: The service being closed or handed over, why, the date, who uses it and how many, any vulnerable users, staff and volunteers involved, partners who could take it on, funders and contracts, assets and data held.
    type: text
    required: true
  - name: country
    description: Country and legal form. Optional; changes employment, data and reporting duties.
    type: string
output_contract:
  format: markdown
  sections: [Closure principles, Timeline, People who use the service, Staff and volunteers, Funders and contracts, "Data, assets and records", Communication, Capturing learning, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help nonprofit leaders end a service well. When funding ends or strategy changes, services are often closed in a rush: people who depend on them hear last, a waiting list is left unanswered, case files sit in an old drive, restricted funds are not reconciled, and staff leave without the knowledge being kept. Experienced leaders treat a closure as a project with its own plan. The people who use the service come first: individual transition plans for anyone at risk, warm handovers to other services with consent, and an honest explanation. Staff and volunteers are told early and supported. Funders are told before the public and asked about unspent funds. Records are kept, transferred or destroyed according to law and consent, and what the service learned is written down.

Programme: {{programme}}
{{#country}}Country and legal form: {{country}}{{/country}}
</context>

<task>
1. Closure principles: three to five, starting with the safety and dignity of the people the service supports.
2. Timeline: working back from the closure date, with phases (decide and plan, tell people, transition, close, after closure) and what happens in each. If the time is too short to close safely, say so and what to ask for (a funder extension, a partner taking over early).
3. People who use the service: how to identify anyone at risk if support stops and make individual transition plans; referrals and warm handovers to other providers with consent; what to do with the waiting list; how to handle people who cannot be placed.
4. Staff and volunteers: when and how to tell them, consultation and notice obligations to check, support (references, redeployment, outplacement), and thanking volunteers.
5. Funders and contracts: notice required, final reports, reconciling restricted funds and what to propose for any balance, assets bought with grant money.
6. Data, assets and records: what to keep, for how long, transfer with consent, secure deletion, closing accounts and access.
7. Communication: the order of audiences (board, funders, staff, volunteers, service users and families, partners, public) and draft key messages for service users.
8. Capturing learning: a short closure report covering outcomes achieved, what worked, what did not, and data worth keeping.
9. Open questions.
</task>

<constraints>
- Safeguarding first: if anyone would be at risk when support stops, they get an individual plan and the safeguarding lead is involved.
- Do not state legal notice periods, retention periods or consultation rules as fact; they differ by country and contract. Name assumptions and recommend checking with an employment adviser, the funder and data protection guidance.
- Never suggest transferring personal data to another organisation without a lawful basis or consent.
- Honest messages: no euphemism that hides the closure from the people affected.
</constraints>

<output_format>
## Closure principles
## Timeline
Table: Phase | Dates | Actions | Owner.
## People who use the service
## Staff and volunteers
## Funders and contracts
## Data, assets and records
Checklist.
## Communication
Table: Audience | When | Who tells them | Key message. Then the draft message to service users.
## Capturing learning
## Open questions
</output_format>

---
schema: 1
id: build-service-recovery-playbook
kind: prompt
title: Build a service recovery playbook
description: Builds a service recovery playbook for when things go wrong - failure types, severity levels, apology and remedy for each, who can compensate how much, scripts and follow-up.
category: customer-support
version: 1.0.0
status: incubating
stage: [design, operate]
role: [support-agent, operations-manager, manager, founder]
inputs: [notes, dataset, text]
output: [plan, table, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [service-recovery, compensation-matrix, apology, goodwill, complaint-handling, root-cause]
pairs_with:
  prompts: [write-support-reply, design-escalation-process, write-client-apology, respond-to-online-review]
args:
  - name: business
    description: The business, customers, average order or booking value, margins if you are comfortable sharing them, team roles, and how complaints are handled today.
    type: text
    required: true
  - name: common_failures
    description: The things that go wrong most often and how often, for example "late delivery (weekly), wrong item (monthly), rude staff (rare)". Leave empty to get a starter list for this type of business.
    type: text
output_contract:
  format: markdown
  sections: [Principles, Failure catalogue, Remedy matrix, Authority to compensate, Words to use, Follow-up and learning, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design service recovery for customer-facing businesses. When something goes wrong, the response matters more than the failure: a fast, sincere, proportionate fix can leave a customer more loyal than if nothing had happened, while a slow or grudging one turns a small problem into a lost customer and a public review. Recovery works when front-line staff can act on the spot within clear limits, the remedy matches what the customer lost (time, money, an occasion, trust), and every failure is logged so the cause gets fixed. Over-compensating by reflex is as costly as under-compensating.
</context>

<task>
Build a service recovery playbook.

<business>
{{business}}
</business>
{{#common_failures}}
<common_failures>
{{common_failures}}
</common_failures>
{{/common_failures}}

1. Principles: four to six rules for this business (for example, fix first then explain; one sincere apology, no excuses; the first person to hear about it owns it until handed over; remedies match the impact).
2. Failure catalogue: group failures by type (product, delivery or timing, staff behaviour, billing, booking, safety or hygiene). Use the given failures; if none, list the likely ones for this business and say they are a starter list.
3. Severity levels: define three or four levels by impact on the customer (inconvenience, lost time or money, ruined occasion or repeated failure, safety or legal), with examples from the catalogue.
4. Remedy matrix: for each level, the acknowledgement, the fix, and the remedy options in order (apology only, correction, partial refund or credit, full refund, gesture for a special occasion), with a value guide expressed relative to the order value.
5. Authority to compensate: what front-line staff can give without asking, what a supervisor can approve, and what the owner decides, as `[DEFINE: amount]` if the user gave no limits. Include a rule that compensation is never offered in exchange for a customer not reporting, reviewing or complaining.
6. Words to use: short scripts for in person or phone, chat or email, and a public review reply, each with acknowledgement, apology, fix and next step; plus phrases to avoid.
7. Follow-up and learning: a check-in after the fix, a recovery log (columns), a monthly review of repeat causes, and what triggers a process change.
</task>

<constraints>
- Do not set compensation amounts as fact. Suggest ranges relative to order value with the reasoning, and leave final limits to the owner.
- Safety, hygiene, allergy, injury, discrimination and data breach complaints are never settled with a voucher alone; they go to the owner or manager, are recorded, and may need legal or regulatory steps to check.
- Never script blaming the customer, a colleague or a supplier to the customer.
- Remedies must not create legal admissions the business has not considered; for serious incidents, advise getting advice before writing anything beyond an acknowledgement.
</constraints>

<output_format>
## Principles
## Failure catalogue
Table: Type | Failure | Frequency | Usual cause.
## Remedy matrix
Table: Level | Examples | Acknowledge | Fix | Remedy options | Value guide.
## Authority to compensate
Table: Role | Can give | Must escalate.
## Words to use
Scripts per channel, then phrases to avoid.
## Follow-up and learning
Log columns as a table header, then the review routine.
## Questions
At most three.
</output_format>

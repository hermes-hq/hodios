---
schema: 1
id: structure-paid-pilot
kind: prompt
title: Structure a paid pilot
description: Structures a paid pilot with an early business customer - scope, success criteria agreed upfront, price, timeline, a letter of intent outline and the path from pilot to full contract.
category: entrepreneurship
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, sales-rep]
advice_risk: [legal]
requires: [none]
inputs: [text, notes]
output: [plan, docs, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [paid-pilot, proof-of-concept, success-criteria, letter-of-intent, b2b-sales]
pairs_with:
  prompts: [find-first-customers, plan-customer-proof-of-concept, review-letter-of-intent, model-unit-economics]
  personas: [startup-mentor]
args:
  - name: product
    description: What your product or service does, its maturity, and what it would take to deliver it to this customer.
    type: text
    required: true
  - name: customer
    description: The prospective customer - type and size of organisation, the problem they want solved, who sponsors the pilot, who signs, what they have said about budget, timeline and decision process.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Pilot goal, Scope, Success criteria, Price and payment, Timeline and responsibilities, Letter of intent outline, Path to contract, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help founders turn an interested business prospect into a paid pilot that leads to a contract. Free or open-ended pilots often drift: no one defines success, the customer's team never makes time, and at the end there is no budget or decision-maker to convert. Good pilots are paid (even a modest amount signals commitment and gets procurement involved early), time-boxed, limited in scope, built around two to four success criteria the customer agrees before starting, and written down with what happens if the criteria are met - ideally the price and term of the full contract. The founder also needs a named sponsor, a named decision-maker, the customer's data and people available on time, and a clear limit on custom work.

<product>
{{product}}
</product>

<customer>
{{customer}}
</customer>
</context>

<task>
1. Pilot goal: one sentence on what the pilot proves for the customer and for the founder.
2. Scope: users, sites or teams included, features used, integrations, and what is explicitly excluded, especially custom development.
3. Success criteria: two to four measurable criteria with a baseline, a target and how they will be measured, to be agreed with the sponsor before kickoff.
4. Price and payment: a pilot fee approach with reasoning (cost to deliver, value to the customer, credit against a full contract if converted), and payment timing. Present the number as a proposal the founder must set, unless they gave figures.
5. Timeline and responsibilities: kickoff, check-ins, midpoint review, final review; what the customer must provide and by when (data, access, people's time), and what the founder delivers.
6. Letter of intent outline: the headings and key sentences for a short non-binding letter or pilot agreement - parties, scope, criteria, fee, duration, data and confidentiality, IP, what happens on success (target price and term of the full contract), and termination.
7. Path to contract: who signs, procurement or security reviews to start during the pilot, and the conversion conversation at the final review.
8. Risks: scope creep, low engagement, missing data, sponsor leaving, and how the structure guards against each.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not invent the customer's budget, prices or procurement rules. Mark assumptions and list what to ask the customer.
- The letter of intent outline is a starting point; recommend a lawyer review the pilot agreement, especially data, liability and IP terms.
- Warn against unpaid open-ended pilots and unbounded custom work, while allowing a free pilot if the founder gives a strategic reason, with conditions.
</constraints>

<output_format>
## Pilot goal
## Scope
In and out lists.
## Success criteria
Table: Criterion | Baseline | Target | How measured.
## Price and payment
## Timeline and responsibilities
Table: Week | Milestone | Customer does | We do.
## Letter of intent outline
## Path to contract
## Risks
Table: Risk | Guard.
</output_format>

---
schema: 1
id: review-subcontract-agreement
kind: prompt
title: Review a subcontract as the subcontractor
description: Reviews a subcontract from the subcontractor's side for flow-down terms, pay-when-paid, retention, variations, delay damages, set-off, insurance and indemnities, in construction, IT or services work.
category: contracts
version: 1.0.0
status: incubating
stage: [review]
role: [founder, consultant, operations-manager]
subject: [law, construction]
requires: [none]
inputs: [document]
output: [report, table, questions]
risk: read-only
advice_risk: [legal, financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [subcontracting, flow-down-clauses, pay-when-paid, retention, liquidated-damages]
pairs_with:
  prompts: [redline-contract, check-contract-insurance-requirements, explain-contract-clause]
  workflows: [contract-review-track]
args:
  - name: subcontract
    description: The subcontract text with clause numbers, and any main contract clauses it says apply to you ("flow-down"), if you have them.
    type: text
    required: true
  - name: job
    description: Your trade or service, the work package, value, programme, and how much of your capacity it takes.
    type: text
    required: true
  - name: country
    description: Country and state or region. Some places regulate payment terms, pay-when-paid clauses, retention and adjudication in construction; others do not.
    type: string
output_contract:
  format: markdown
  sections: [In brief, Clause check, Cash flow, Risk passed down to you, What to negotiate, Questions, Get advice if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Main contractors pass risk down the chain, and subcontractors often sign the subcontract without seeing the main contract it refers to. The clauses that sink small subcontractors: "flow-down" or "back-to-back" wording that binds them to main contract terms they have not read; pay-when-paid or pay-if-paid terms that make payment depend on the client paying the main contractor (banned or restricted for construction in some places, common elsewhere); long payment periods; retention withheld for months or years after completion; set-off rights letting the main contractor deduct claims from any other job; delay damages at a daily rate that can exceed the subcontract's profit; variations that must be instructed in writing, with work done on a verbal instruction going unpaid; short notice periods for claims, after which rights are lost; broad indemnities and insurance demands sized for the main contract; termination for convenience with no payment for lost profit; and design responsibility slipped into a build-only package. Statutory rights to payment notices, adjudication or suspension for non-payment exist in some countries and not others.
{{#country}}

Country: {{country}}
{{/country}}

<job>
{{job}}
</job>
</context>

<task>
<subcontract>
{{subcontract}}
</subcontract>

1. In brief: scope, value, payment basis, and the three biggest risks for the subcontractor.
2. Clause check, quoting each clause: scope and design responsibility, flow-down and incorporation of the main contract, programme and delay damages, variations and instructions, payment applications and timing, pay-when-paid or pay-if-paid, retention and release, set-off, notices and time bars for claims, defects period, insurance, indemnities and liability caps, termination, suspension rights, disputes.
3. Cash flow: from the payment terms, when money for a given month's work would actually arrive, and how much is held as retention until when. Use the person's figures or clearly labelled examples.
4. Risk passed down to you: list main contract obligations that apply through flow-down, and say which ones need the main contract document to assess.
5. What to negotiate: ranked asks with fallbacks (cap on delay damages, defined payment dates, retention cap and release dates, set-off limited to this subcontract, written variations both ways, notice periods that are workable).
6. Questions for the main contractor, including a request for the relevant main contract terms.
7. Get advice if: features of this subcontract or job that warrant a lawyer or trade association help.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Quote clause numbers; write "not stated" or "in the main contract, not supplied" as appropriate.
- Do not say whether pay-when-paid or any clause is lawful in the user's country; say it is restricted in some places and to check.
- Do not invent statutory payment rights or adjudication rules; name them as things to check.
- Warn plainly about time-bar clauses that can cancel claims if notices are late.
{{> output/uncertainty}}
</constraints>

<output_format>
## In brief
Four bullets.

## Clause check
Table: topic | clause and short quote | rating (fine / check / negotiate) | why.

## Cash flow
Worked timeline.

## Risk passed down to you
Bullets.

## What to negotiate
Numbered: ask - why - fallback.

## Questions
Numbered.

## Get advice if
Bullets.
</output_format>

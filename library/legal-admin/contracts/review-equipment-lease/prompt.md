---
schema: 1
id: review-equipment-lease
kind: prompt
title: Review an equipment or vehicle lease before signing
description: Reviews a business equipment or vehicle lease or hire-purchase agreement for true cost, term, end-of-lease options, maintenance, insurance, early exit and default terms before you sign.
category: contracts
version: 1.0.0
status: incubating
stage: [review]
role: [founder, operations-manager]
subject: [law]
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
tags: [equipment-finance, hire-purchase, vehicle-lease, balloon-payment, early-termination, asset-finance]
pairs_with:
  prompts: [compare-equipment-lease-vs-buy, review-car-purchase-contract, explain-contract-clause, prepare-leased-car-return]
args:
  - name: agreement
    description: The lease, rental, hire-purchase or finance agreement and the quote or schedule with payments, with clause numbers. Remove account and ID numbers.
    type: text
    required: true
  - name: situation
    description: What the equipment or vehicle is, how you will use it (hours, mileage), how long you expect to need it, and whether you want to own it at the end.
    type: text
    required: true
  - name: country
    description: Country and region, and whether you sign as a business or a consumer. Consumer credit protections often do not apply to business leases.
    type: string
output_contract:
  format: markdown
  sections: [In brief, True cost, Clause check, End of term and early exit, Questions to ask before signing, Get advice if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Equipment and vehicle finance is sold on the monthly payment, and the monthly payment hides most of the cost. What experienced finance brokers and fleet managers check: the total of all payments plus upfront fees, documentation and admin fees, and any final balloon or option-to-purchase fee; whether the agreement is a true lease (you never own it), hire-purchase or lease-purchase (you own it after the final payment) or a rental, since this changes who carries the residual value risk; usage limits (mileage, operating hours) and excess charges; fair wear and tear standards and return condition charges, which are where most end-of-lease disputes happen; who must maintain and insure the asset and to what level; automatic renewal or "secondary period" rent if you do not give notice at the end; early termination clauses that charge most or all of the remaining payments; default triggers that include missing a payment by a few days or a change in your business; and personal guarantees attached to business leases. Business lessees often get fewer statutory protections than consumers, so the contract text matters more.
{{#country}}

Country and status: {{country}}
{{/country}}

<situation>
{{situation}}
</situation>
</context>

<task>
<agreement>
{{agreement}}
</agreement>

1. In brief: what kind of agreement this is (lease, hire-purchase, rental or other, as far as the text shows), what it will cost in total, and the three most important issues for this use.
2. True cost: add up every payment and fee in the text and show the arithmetic; note anything that cannot be calculated from the text (variable rates, excess charges) and ask for it.
3. Clause check, quoting each clause: type and ownership, term and payments, interest or rate changes, fees, usage limits and excess charges, maintenance, insurance and loss or damage, return condition and wear and tear, end-of-term options, automatic renewal or secondary rent, early termination, default and repossession, guarantees, assignment, governing law.
4. End of term and early exit: what happens at the end under each option in the text, the notice needed, and what it would cost to exit early at a sample point (for example halfway) if the text allows that calculation.
5. Questions to ask before signing: ranked, each tied to a clause, with what to request in writing.
6. Get advice if: when to see a lawyer, accountant or independent finance adviser (tax treatment, guarantees, large sums).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Quote clause numbers; write "not stated" where a topic is missing. Never invent rates, fees or residual values.
- Do not give tax or accounting treatment as fact; flag it for an accountant.
- Do not say whether a fee or penalty is enforceable or whether consumer protections apply; state the assumption and what to check.
- Do not recommend whether to lease or buy; that is a separate comparison.
{{> output/uncertainty}}
</constraints>

<output_format>
## In brief
Three to five bullets.

## True cost
Table: item | amount | note; then the total with arithmetic.

## Clause check
Table: topic | clause and short quote | rating (fine / check / negotiate) | why.

## End of term and early exit
Short bullets per option.

## Questions to ask before signing
Numbered: question - clause - what to get in writing.

## Get advice if
Bullets.
</output_format>

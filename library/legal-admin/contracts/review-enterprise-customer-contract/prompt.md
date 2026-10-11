---
schema: 1
id: review-enterprise-customer-contract
kind: prompt
title: Review a large customer's contract as a small vendor
description: Reviews a big customer's MSA or purchase terms from a small vendor's side, flagging uncapped liability, long payment terms, audit and security demands, and drafting realistic pushback.
category: contracts
version: 1.0.0
status: incubating
stage: [review]
role: [founder, sales-rep, operations-manager, consultant]
subject: [law]
requires: [none]
inputs: [document]
output: [report, table, message]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [master-services-agreement, customer-paper, limitation-of-liability, indemnity, payment-terms, vendor-side]
pairs_with:
  prompts: [redline-contract, build-contract-obligations-register, explain-contract-clause, review-saas-agreement]
args:
  - name: contract
    description: The customer's master agreement, purchase terms, supplier code or onboarding pack, with clause numbers. Remove personal data.
    type: text
    required: true
  - name: deal
    description: What you sell them, annual contract value, your company size, how much you want the deal, and anything they have already said is non-negotiable.
    type: text
    required: true
  - name: country
    description: Your country, the customer's country and the governing law named in the contract.
    type: string
output_contract:
  format: markdown
  sections: [In brief, Clause check, Hidden obligations, What to push back on, Message to the customer, Get a lawyer if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
When a small vendor wins a large customer, the customer's procurement team usually sends its own paper, written for suppliers far bigger than the vendor. What experienced vendor-side negotiators know: big customers expect pushback on a few points and rarely on all of them, so the skill is choosing which. The clauses that sink small vendors are uncapped or very high liability and broad indemnities (often covering the customer's own losses, data breaches and third-party claims); payment terms of 60 to 120 days, sometimes only after an invoice is "approved" or entered in a supplier portal; unilateral termination for convenience with no payment for work in progress; most-favoured-customer pricing; audit rights over the vendor's books and premises; security, insurance and certification demands (specific cyber or liability cover amounts, external audits) that cost more than the deal earns; IP clauses that assign the vendor's pre-existing tools; liquidated damages or service credits with no cap; and policies incorporated by reference (supplier codes, security standards) that change without notice. The useful asks are usually proportionality: a cap tied to fees paid, mutual indemnities limited to what each side controls, carve-outs for pre-existing IP, and payment terms the vendor's cash flow can survive.
{{#country}}

Countries and law: {{country}}
{{/country}}

<deal>
{{deal}}
</deal>
</context>

<task>
<contract>
{{contract}}
</contract>

1. In brief: what the contract commits the vendor to, and the three biggest risks given the deal size and the vendor's size.
2. Clause check, quoting each clause: scope and order of precedence, payment terms and invoicing conditions, price controls (fixed prices, most-favoured pricing, benchmarking), liability caps and exclusions, indemnities, insurance requirements, IP ownership and licences, confidentiality and data protection, security and audit rights, service levels, credits or liquidated damages, termination (cause and convenience) and what is paid on exit, assignment and subcontracting, non-solicit or exclusivity, governing law and disputes.
3. Hidden obligations: documents, portals and policies incorporated by reference, reporting duties, and anything the vendor must do or buy (insurance, certifications) before or during the contract, with a rough note on what each costs in effort.
4. What to push back on: no more than six asks, ranked by exposure against deal value, each with the business reason a procurement team will accept and a fallback. Mark items that are usually accepted as standard and not worth spending goodwill on.
5. Message to the customer: a short, cooperative cover note for the contract or procurement contact, listing the asks and offering a call.
6. Get a lawyer if: features of this contract or deal that need one.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Quote clause numbers; write "not stated" where a topic is missing. Do not invent clauses, amounts or policies that are not in the text.
- Do not say whether a cap, indemnity or penalty is enforceable; say it depends on the governing law and what to check.
- Do not tell the vendor to accept or reject the deal; set out exposure against value and leave the decision to them.
- Keep asks realistic for a small vendor facing a large buyer; do not propose rewriting the whole contract.
- If the vendor cannot meet a stated requirement (insurance level, certification), say so plainly rather than suggesting they sign and hope.
{{> output/uncertainty}}
</constraints>

<output_format>
## In brief
Three to five bullets.

## Clause check
Table: topic | clause and short quote | rating (fine / check / push back) | why.

## Hidden obligations
Table: obligation | source | effort or cost note.

## What to push back on
Numbered: ask - reason for the customer - fallback.

## Message to the customer
The message.

## Get a lawyer if
Bullets.
</output_format>

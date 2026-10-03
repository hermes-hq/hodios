---
schema: 1
id: review-saas-agreement
kind: prompt
title: Review a SaaS or software licence agreement
description: Reviews a SaaS or software licence agreement for a business buyer, covering fees, renewal, data use, liability, service levels and exit, and ranks what to negotiate.
category: contracts
version: 1.0.0
status: incubating
stage: [review]
role: [founder, operations-manager, executive, manager]
subject: [law, saas]
requires: [none]
inputs: [document]
output: [summary, table, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [saas-contract, software-licence, auto-renewal, sla, data-ownership, vendor-lock-in]
pairs_with:
  prompts: [review-data-processing-agreement, redline-contract, compare-vendors, build-contract-obligations-register]
  workflows: [contract-review-track]
args:
  - name: contract_text
    description: The full agreement as offered, including the order form, master subscription or licence agreement, and any terms incorporated by link (SLA, acceptable use policy, data processing terms) that you can paste.
    type: text
    required: true
  - name: business_context
    description: Optional. Your business, what the software will do for you, the data it will hold (customer personal data, payment data, health data), annual spend, how critical it is, and your jurisdiction.
    type: text
output_contract:
  format: markdown
  sections: [In brief, Commercials, Term and renewal, Your data, Service levels and support, Liability and indemnities, Changes and suspension, Exit, Terms to look at closely, Not provided, Negotiation priorities]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You review software and SaaS contracts from the customer's side, as an experienced commercial contracts manager would before a small or mid-sized business signs. Vendor paper is written for the vendor, and the costly surprises cluster in predictable places: auto-renewal with a short notice window and an uncapped price increase on renewal; minimum commitments and true-ups; service credits as the only remedy for outages; liability capped at a few months' fees while the customer's data is what is at risk; broad rights for the vendor to use customer data, including for training models; terms that the vendor can change by updating a web page; suspension rights with no notice; and no clear right to export data in a usable format, or a deletion deadline, at the end. Which of these matter depends on how critical the tool is and what data it holds.

{{#business_context}}
<business_context>
{{business_context}}
</business_context>
{{/business_context}}
</context>

<task>
Agreement:

<contract>
{{contract_text}}
</contract>

1. Identify the documents that make up the contract and their order of precedence, the parties, and every document incorporated by reference (URLs, policies, DPA, SLA). List any that are referred to but not pasted, since they may hold key terms.
2. Commercials: fees, billing frequency, payment terms, usage limits and overage pricing, minimum commitments, taxes, and price increases during the term and at renewal.
3. Term and renewal: initial term, auto-renewal, notice period and method to stop renewal, and the latest date to give notice if a start date is given.
4. Your data: ownership, the vendor's licence to use it (including aggregated, anonymised or AI training use), confidentiality, security commitments, breach notification, data location, sub-processors, and whether a data processing agreement is included where personal data is involved.
5. Service levels and support: uptime commitment and how it is measured, exclusions, service credits and whether they are the sole remedy, support hours and response times, and maintenance windows.
6. Liability and indemnities: caps (amount and what it is measured against), carve-outs, excluded loss types, the vendor's IP infringement indemnity, and any indemnities the customer gives.
7. Changes and suspension: unilateral changes to the terms, the service or features, suspension rights and notice, and assignment on a change of control.
8. Exit: termination for convenience or for breach, refunds of prepaid fees, data export (format, time window, cost), deletion, and transition help.
9. Flag the terms most worth a closer look, most important first, quoting each with a one-line business scenario.
10. Rank negotiation priorities for this buyer, given the context: for each, the issue, why it matters here, a specific ask, and a realistic fallback.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Quote the contract's words with section numbers for every point you flag. Never summarise a term as more favourable or harsher than it reads.
- Do not invent terms. If something is not addressed, write "not addressed". If a key term sits in an unpasted linked document, say "in linked document, not reviewed".
- Mark any statement about data protection, consumer or industry rules as "to verify" for the buyer's jurisdiction and sector; do not state which regulations apply as fact.
- Scale the advice to the context: a low-cost, non-critical tool does not need a full negotiation. Say so when that is the case.
- For high-value, business-critical or regulated-data contracts, recommend review by a commercial lawyer and, where personal data is involved, the buyer's privacy lead.
{{> output/uncertainty}}
</constraints>

<output_format>
## In brief
Four lines: what is being bought and for how long, total committed spend, the biggest risk for this buyer, and the most important ask.

## Commercials
Table: item | term | section.

## Term and renewal
Bullets, including the notice deadline if it can be worked out.

## Your data
Bullets with section references.

## Service levels and support
Bullets.

## Liability and indemnities
Bullets.

## Changes and suspension
Bullets.

## Exit
Bullets.

## Terms to look at closely
Numbered: section - quoted text - business impact - ask.

## Not provided
Bullets: linked or referenced documents not reviewed.

## Negotiation priorities
Table: priority | issue | why it matters here | ask | fallback.
</output_format>

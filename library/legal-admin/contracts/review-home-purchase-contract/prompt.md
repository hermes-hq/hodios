---
schema: 1
id: review-home-purchase-contract
kind: prompt
title: Review a home purchase contract as the buyer
description: Reviews a home purchase agreement or offer contract for the buyer, covering conditions, deposits, deadlines, included items, defects, default and costs, with questions for your lawyer.
category: contracts
version: 1.0.0
status: incubating
stage: [review]
role: [individual]
subject: [law, real-estate]
requires: [none]
inputs: [document]
output: [report, table, checklist]
risk: read-only
advice_risk: [legal, financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [home-buying, purchase-agreement, deposit, conditions-of-sale, closing-date, property-purchase]
pairs_with:
  prompts: [plan-buyer-offer-strategy, estimate-home-buying-costs, explain-home-survey-report, explain-contract-clause]
args:
  - name: contract
    description: The purchase agreement, offer to purchase or sale contract and any addenda or special conditions, with clause numbers. Remove ID numbers and bank details.
    type: text
    required: true
  - name: situation
    description: The property, price, how you are paying (mortgage, cash, sale of your current home), any inspection or survey done, and your key dates.
    type: text
    required: true
  - name: country
    description: Country and state or region. Home buying works very differently between places (when the contract becomes binding, who holds the deposit, the role of lawyers, notaries or agents).
    type: string
    required: true
output_contract:
  format: markdown
  sections: [In brief, Key dates and deadlines, Clause check, Protections you have and lack, Questions for your lawyer or conveyancer, What to do next]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
For most people a home is the largest contract they ever sign, often on a short deadline set by the seller's agent. What experienced property lawyers check first: when the contract becomes binding and whether there is a cooling-off period (this varies widely by country and state); the deposit amount, who holds it, and when it becomes non-refundable; conditions or contingencies (mortgage approval, inspection or survey, sale of the buyer's home, title and searches) and their deadlines, since a missed notice deadline usually removes the protection; what is included and excluded (appliances, fixtures, furniture); the condition the property must be in at completion and the buyer's right to a final inspection; "as is" or seller disclosure terms limiting claims for defects; who pays which costs, taxes and adjustments; the completion or closing date and penalties for delay on either side; what happens if the buyer defaults (losing the deposit, damages) or the seller does; and special conditions an agent added that shift risk to the buyer. A missing condition cannot usually be added after signing.

Country and region: {{country}}

<situation>
{{situation}}
</situation>
</context>

<task>
<contract>
{{contract}}
</contract>

1. In brief: what the buyer is committing to, when it becomes binding, and the three biggest risks for this buyer's situation (for example, a mortgage not yet approved or a home still to sell).
2. Key dates and deadlines: every date and notice deadline in the contract as a timeline, with what the buyer must do by each and what is lost if missed.
3. Clause check, quoting each clause: parties and property description, price and deposit, deposit holder and refund conditions, conditions or contingencies and their deadlines, inspection or survey rights, title and searches, included and excluded items, condition at completion and final inspection, seller disclosures and "as is" terms, costs, taxes and adjustments, completion date and delay, default by either side, risk of damage before completion, special conditions, dispute terms.
4. Protections you have and lack: compare the conditions in the contract with the buyer's situation and list protections that seem to be missing (for example, no finance condition while relying on a mortgage).
5. Questions for your lawyer or conveyancer: ranked and specific, including local points to confirm (cooling-off, deposit protection, taxes).
6. What to do next: practical steps before the next deadline.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Quote clause numbers; write "not stated" where a topic is missing. Never invent dates, amounts or local rules.
- Do not state local legal rules (cooling-off periods, transfer taxes, deposit protection) as fact; list them as points to confirm with a local lawyer, conveyancer or notary.
- Do not advise whether to buy or what to offer; focus on the contract terms.
- Say plainly that a local lawyer, conveyancer or notary should review the contract before the buyer signs or before any condition deadline passes; this review prepares the questions, it does not replace that check.
- If a deadline is very close or has passed, say so first and urge the user to contact their lawyer immediately.
{{> output/uncertainty}}
</constraints>

<output_format>
## In brief
Three to five bullets.

## Key dates and deadlines
Table: date or deadline | what you must do | what happens if missed.

## Clause check
Table: topic | clause and short quote | rating (fine / check / ask your lawyer) | why.

## Protections you have and lack
Two short lists.

## Questions for your lawyer or conveyancer
Numbered.

## What to do next
Checklist.
</output_format>
